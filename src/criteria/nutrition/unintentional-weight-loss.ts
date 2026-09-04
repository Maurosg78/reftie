import type { Criterion } from '../types.js';

/**
 * Criterio provisional, redactado por un fisioterapeuta (ver reviewedBy)
 * — NO por un nutricionista licenciado. Marcado explícitamente en
 * docs/legal/gates-pendientes.md como pendiente de revisión por el
 * profesional de la disciplina correspondiente antes de usarse con un
 * paciente real. Sirve para el spike de Fase 0, no como criterio final.
 */
export const unintentionalWeightLoss: Criterion = {
  id: 'nutrition-001',
  discipline: 'nutrition',
  version: 1,
  ruleText:
    'El paciente reporta pérdida de peso no intencional y/o apetito ' +
    'reducido, en un contexto de recuperación musculoesquelética donde ' +
    'la ingesta insuficiente puede retrasar la cicatrización/recuperación ' +
    '— screening de dos ítems consistente con el enfoque del Malnutrition ' +
    'Screening Tool (MST): pérdida de peso reciente + apetito reducido.',
  source:
    'Concepto general de screening nutricional en dos ítems (MST), no cita ' +
    'textual del instrumento — pendiente de validación con nutricionista.',
  writtenDate: '2026-09-04',
  reviewedBy: 'Mauricio Sobarzo, PT (fisioterapeuta, no nutricionista — ver nota arriba)',
  reviewDate: '2026-09-04',
  signalTypes: ['unintentional_weight_loss_reported', 'reduced_appetite_reported'],
};
