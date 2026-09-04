#!/usr/bin/env tsx
/**
 * Eval manual de la Etapa A contra las notas sintéticas — NO es parte de
 * la suite de CI (ver docs/adr/0004): llama a la API real, cuesta
 * dinero, y el LLM no es determinístico. Correr a mano con:
 *
 *   ANTHROPIC_API_KEY=... npm run eval:extraction
 *
 * Esto es lo que responde la pregunta que el spike de la Fase 0 existe
 * para responder: ¿la extracción con cita es lo bastante buena como
 * para defender cada candidato ante otro clínico?
 */
import Anthropic from '@anthropic-ai/sdk';
import { allCriteria } from '../src/criteria/index.js';
import { extractSignals } from '../src/extraction/extractSignals.js';
import { evaluateCriteria } from '../src/rules/evaluateCriteria.js';
import { syntheticNotes } from '../data/synthetic/notes.js';

async function main(): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const hasApiKey = typeof apiKey === 'string' && apiKey.length > 0;
  if (!hasApiKey) {
    console.error('Falta ANTHROPIC_API_KEY. Copiar .env.example a .env y completar.');
    process.exitCode = 1;
    return;
  }

  const client = new Anthropic({ apiKey });

  for (const note of syntheticNotes) {
    console.log(`\n=== ${note.id} ===`);
    console.log(`Esperado: [${note.expectedRuleIds.join(', ') || 'ninguno'}]`);

    const verifiedSignals = await extractSignals(note.text, allCriteria, client);
    const candidates = evaluateCriteria(allCriteria, verifiedSignals);
    const gotRuleIds = candidates.map((c) => c.ruleId);

    console.log(`Obtenido:  [${gotRuleIds.join(', ') || 'ninguno'}]`);

    for (const candidate of candidates) {
      for (const evidence of candidate.evidence) {
        console.log(`  - [${candidate.ruleId}] cita: "${evidence.quote}"`);
      }
    }

    const matchesExpectation = arraysHaveSameElements(gotRuleIds, note.expectedRuleIds);
    const resultLabel = matchesExpectation ? 'OK' : 'REVISAR';
    console.log(`Resultado: ${resultLabel}`);
  }
}

function arraysHaveSameElements(a: readonly string[], b: readonly string[]): boolean {
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return JSON.stringify(sortedA) === JSON.stringify(sortedB);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
