import type { Criterion } from '../types.js';

/**
 * Ver nota de docs/legal/gates-pendientes.md — criterio provisional,
 * pendiente de revisión por psicólogo licenciado.
 */
export const lowMoodAdherenceRisk: Criterion = {
  id: 'psychology-002',
  discipline: 'psychology',
  version: 1,
  ruleText:
    'El paciente reporta ánimo bajo, desmotivación, o desesperanza sobre ' +
    'su recuperación de forma sostenida (no un comentario aislado en una ' +
    'sola sesión), Y el clínico documenta baja adherencia al plan de ' +
    'ejercicio en casa — combinación consistente con riesgo de ánimo bajo ' +
    'afectando la adherencia, no un simple "mal día".',
  source:
    'Inferencia clínica del autor sobre ánimo/adherencia — no cita una ' +
    'escala específica (ej. PHQ-2) por evitar reproducir texto de un ' +
    'instrumento con derechos reservados. Pendiente de validación con ' +
    'psicólogo antes de uso real.',
  writtenDate: '2026-09-04',
  reviewedBy: 'Mauricio Sobarzo, PT (fisioterapeuta, no psicólogo — ver nota arriba)',
  reviewDate: '2026-09-04',
  signalTypes: ['sustained_low_mood_reported', 'poor_home_exercise_adherence_documented'],
};
