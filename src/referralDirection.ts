import type { Discipline, Jurisdiction } from './criteria/types.js';

/**
 * Habilita/deshabilita una dirección de derivación (de una disciplina a
 * otra) por jurisdicción. Existe desde el día uno aunque el MVP solo
 * opere en Ontario — el caso concreto que lo justifica es NY, donde
 * PBH §238-a prohíbe auto-referral hacia fisioterapia específicamente,
 * pero no hacia nutrición/psicología/quiropraxia/masaje. El riesgo es
 * direccional, no simétrico: cualquier disciplina → PT es alto riesgo en
 * NY; PT → cualquier otra no está en la lista cerrada de esa ley.
 *
 * Este archivo NO decide política legal — solo define la forma del dato.
 * El contenido real (qué está habilitado en cada jurisdicción) se llena
 * cuando el gate legal correspondiente esté cerrado, ver
 * docs/legal/gates-pendientes.md.
 */
export interface ReferralDirection {
  readonly fromDiscipline: Discipline;
  readonly toDiscipline: Discipline;
  readonly enabledByJurisdiction: Readonly<Record<Jurisdiction, boolean>>;
}

/**
 * Placeholder deliberado: todo deshabilitado en todas las jurisdicciones
 * hasta que el gate legal (a) y (b) de docs/legal/gates-pendientes.md
 * estén cerrados. No es una lista de reglas de negocio todavía — es la
 * forma del dato, lista para llenarse.
 */
export const NO_DIRECTIONS_ENABLED_YET: Readonly<Record<Jurisdiction, boolean>> = {
  ON: false,
  NY: false,
  MA: false,
};
