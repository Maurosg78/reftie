import Anthropic from '@anthropic-ai/sdk';
import type { Criterion } from '../criteria/types.js';
import type { ExtractedSignalCandidate, VerifiedSignal } from './types.js';
import { buildExtractionPrompt } from './prompt.js';

// Verificar contra la documentación vigente de Anthropic antes de usar en
// producción — los IDs de modelo cambian y no hay que asumirlos de memoria.
const EXTRACTION_MODEL = process.env.REFTIE_EXTRACTION_MODEL ?? 'claude-sonnet-5';

/**
 * Etapa A. Llama al LLM, verifica cada cita contra la nota, y descarta
 * cualquier señal cuya cita no sea una subcadena literal exacta — el
 * modelo puede alucinar o parafrasear, el código no confía en eso.
 */
export async function extractSignals(
  noteText: string,
  criteria: readonly Criterion[],
  client: Anthropic,
): Promise<VerifiedSignal[]> {
  const prompt = buildExtractionPrompt(noteText, criteria);
  const response = await client.messages.create({
    model: EXTRACTION_MODEL,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const candidates = parseCandidates(response);
  const verifiedSignals = verifyAndAttachOffsets(candidates, noteText);
  logDebugIfEnabled(response, candidates, verifiedSignals);
  return verifiedSignals;
}

/**
 * Diagnóstico opt-in (REFTIE_DEBUG=1) — separa dos causas de "no disparó
 * nada" que el log normal del eval no distingue: el LLM no propuso
 * ninguna señal, vs. propuso algo que el guardrail de citas descartó
 * por no ser subcadena literal (paráfrasis o alucinación).
 */
function logDebugIfEnabled(
  response: Anthropic.Message,
  candidates: readonly ExtractedSignalCandidate[],
  verifiedSignals: readonly VerifiedSignal[],
): void {
  const debugEnabled = process.env.REFTIE_DEBUG === '1';
  if (!debugEnabled) {
    return;
  }
  const blockTypes = response.content.map((block) => block.type);
  console.warn(`  [debug] stop_reason=${response.stop_reason} bloques=[${blockTypes.join(', ')}]`);
  const firstBlock = response.content[0];
  const isTextBlock = firstBlock?.type === 'text';
  const rawText = isTextBlock ? firstBlock.text : '(sin bloque de texto en la respuesta)';
  console.warn(`  [debug] respuesta cruda del modelo: ${rawText}`);
  console.warn(`  [debug] candidatos parseados: ${candidates.length}, verificados: ${verifiedSignals.length}`);
  for (const candidate of candidates) {
    const wasVerified = verifiedSignals.some((v) => v.quote === candidate.quote);
    const verifiedLabel = wasVerified ? 'verificada' : 'DESCARTADA (no es subcadena literal de la nota)';
    console.warn(`  [debug] candidato: signalType=${candidate.signalType} ruleId=${candidate.ruleIdSuggested} quote="${candidate.quote}" -> ${verifiedLabel}`);
  }
}

function parseCandidates(response: Anthropic.Message): ExtractedSignalCandidate[] {
  const firstBlock = response.content[0];
  const isTextBlock = firstBlock?.type === 'text';
  if (!isTextBlock) {
    return [];
  }
  const rawText = firstBlock.text.trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) {
    return [];
  }
  return parsed.filter(isExtractedSignalCandidateShape);
}

function isExtractedSignalCandidateShape(value: unknown): value is ExtractedSignalCandidate {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  const hasSignalType = typeof candidate.signalType === 'string';
  const hasQuote = typeof candidate.quote === 'string';
  const hasDiscipline = typeof candidate.disciplineSuggested === 'string';
  const hasRuleId = typeof candidate.ruleIdSuggested === 'string';
  return hasSignalType && hasQuote && hasDiscipline && hasRuleId;
}

/**
 * El guardrail real: si la cita no aparece literal en la nota, la señal
 * se descarta entera. Esta función es pura y determinística — se testea
 * sin llamar al LLM (ver tests/extraction/citationGuard.test.ts).
 */
export function verifyAndAttachOffsets(
  candidates: readonly ExtractedSignalCandidate[],
  noteText: string,
): VerifiedSignal[] {
  const verifiedSignals: VerifiedSignal[] = [];
  for (const candidate of candidates) {
    const noteOffset = noteText.indexOf(candidate.quote);
    const quoteFoundInNote = noteOffset !== -1;
    if (quoteFoundInNote) {
      verifiedSignals.push({ ...candidate, noteOffset });
    }
  }
  return verifiedSignals;
}
