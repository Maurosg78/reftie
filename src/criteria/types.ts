export type Discipline =
  | 'nutrition'
  | 'psychology'
  | 'occupational-therapy'
  | 'pelvic-health'
  | 'massage'
  | 'chiropractic';

export type Jurisdiction = 'ON' | 'NY' | 'MA';

/**
 * Un criterio clínico curado, tratado como activo versionado — nunca se
 * edita in place. Un cambio de contenido es una nueva versión, no un
 * overwrite, para que el historial de "por qué decía esto antes" quede
 * trazable. Ver docs/adr/0003 sobre por qué esto importa incluso sin
 * certificación formal todavía.
 */
export interface Criterion {
  readonly id: string;
  readonly discipline: Discipline;
  readonly version: number;
  /** Texto claro de la regla, tal como se lo explicarías a otro clínico. */
  readonly ruleText: string;
  /** Guía clínica, escala o bandera roja en la que se basa. */
  readonly source: string;
  readonly writtenDate: string;
  readonly reviewedBy: string;
  readonly reviewDate: string;
  /**
   * Tipos de señal que, si aparecen en la nota con cita verificable,
   * pueden satisfacer este criterio. La extracción (Etapa A) propone
   * señales de estos tipos; el motor de reglas (Etapa B) decide si
   * alcanzan para disparar un candidato.
   */
  readonly signalTypes: readonly string[];
}
