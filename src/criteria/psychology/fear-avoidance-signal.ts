import type { Criterion } from '../types.js';

/**
 * Ver nota de docs/legal/gates-pendientes.md — criterio provisional,
 * pendiente de revisión por psicólogo licenciado.
 */
export const fearAvoidanceSignal: Criterion = {
  id: 'psychology-001',
  discipline: 'psychology',
  version: 1,
  ruleText:
    'El paciente expresa evitación del movimiento por miedo a re-lesión, ' +
    'o cataloga su dolor en términos catastróficos (ej. "nunca va a ' +
    'mejorar", "algo está muy mal"), de forma desproporcionada a los ' +
    'hallazgos objetivos documentados en la misma nota — consistente con ' +
    'el constructo de miedo-evitación/catastrofización evaluado por ' +
    'instrumentos como el Örebro Musculoskeletal Pain Screening ' +
    'Questionnaire.',
  source:
    'Constructo general de miedo-evitación/catastrofización (Örebro MSPQ ' +
    'y literatura de fear-avoidance model), no cita textual del ' +
    'instrumento — pendiente de validación con psicólogo.',
  writtenDate: '2026-09-04',
  reviewedBy: 'Mauricio Sobarzo, PT (fisioterapeuta, no psicólogo — ver nota arriba)',
  reviewDate: '2026-09-04',
  signalTypes: ['movement_avoidance_due_to_fear', 'pain_catastrophizing_language'],
};
