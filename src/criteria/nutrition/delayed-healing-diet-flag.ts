import type { Criterion } from '../types.js';

/**
 * Ver nota de docs/legal/gates-pendientes.md — criterio provisional,
 * pendiente de revisión por nutricionista licenciado.
 */
export const delayedHealingDietFlag: Criterion = {
  id: 'nutrition-002',
  discipline: 'nutrition',
  version: 1,
  ruleText:
    'El clínico documenta explícitamente una progresión de recuperación ' +
    'más lenta de lo esperado para la lesión/cirugía, Y en la misma nota ' +
    'o una previa hay mención de dieta restrictiva, ingesta proteica baja, ' +
    'o preocupación del paciente sobre su alimentación — combinación que ' +
    'sugiere que la nutrición podría ser un factor no evaluado.',
  source:
    'Inferencia clínica del autor (19 años MSK) sobre proteína/recuperación ' +
    'tisular — no cita una guía específica. Pendiente de validación con ' +
    'nutricionista antes de uso real.',
  writtenDate: '2026-09-04',
  reviewedBy: 'Mauricio Sobarzo, PT (fisioterapeuta, no nutricionista — ver nota arriba)',
  reviewDate: '2026-09-04',
  signalTypes: ['slower_than_expected_recovery_documented', 'restrictive_diet_or_low_protein_mentioned'],
};
