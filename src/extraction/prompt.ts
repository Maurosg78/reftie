import type { Criterion } from '../criteria/types.js';

/**
 * Arma el prompt de la Etapa A. Deliberadamente NO le pide al modelo
 * decidir si el criterio "se cumple" — solo que identifique señales
 * puntuales con cita textual. La decisión de disparar un candidato es
 * de la Etapa B (evaluateCriteria.ts), determinística, sin LLM.
 */
export function buildExtractionPrompt(noteText: string, criteria: readonly Criterion[]): string {
  const criteriaDescriptions = criteria
    .map((criterion) => describeCriterionForPrompt(criterion))
    .join('\n\n');

  return [
    'You are reading a physiotherapy clinical note (SOAP format, written as',
    'continuous free text — there are no section delimiters to rely on).',
    '',
    'Your only job: find short verbatim quotes from the note that match one',
    'of the signal types listed below. Do not decide whether a referral is',
    'warranted — that decision happens elsewhere. Do not paraphrase — every',
    'quote must be copied exactly as it appears in the note, character for',
    'character, because it will be verified against the note text and',
    'discarded if it does not match exactly.',
    '',
    'If you find no matching signal, return an empty array. Do not invent a',
    'signal to have something to report.',
    '',
    'Signal types to look for:',
    criteriaDescriptions,
    '',
    'Note text:',
    '"""',
    noteText,
    '"""',
    '',
    'Respond with a JSON array only, no prose, no markdown fences. Each',
    'element: {"signalType": string, "quote": string, "disciplineSuggested":',
    'string, "ruleIdSuggested": string}.',
  ].join('\n');
}

function describeCriterionForPrompt(criterion: Criterion): string {
  const signalTypesList = criterion.signalTypes.join(', ');
  return `- ruleId "${criterion.id}" (${criterion.discipline}): signal types [${signalTypesList}] — ${criterion.ruleText}`;
}
