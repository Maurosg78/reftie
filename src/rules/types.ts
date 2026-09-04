import type { VerifiedSignal } from '../extraction/types.js';

export type CandidateStatus = 'pending' | 'accepted' | 'dismissed' | 'silenced';

/**
 * Un candidato disparado por la Etapa B. `evidence` nunca queda vacío —
 * es la garantía de que ningún candidato existe sin al menos una señal
 * verificada (cita + offset) que lo sostenga.
 */
export interface Candidate {
  readonly ruleId: string;
  readonly discipline: string;
  readonly evidence: readonly VerifiedSignal[];
  readonly status: CandidateStatus;
  /**
   * Nunca revenue/fee/billing — ver docs/legal/gates-pendientes.md y
   * docs/adr/0001. Este campo es intencionalmente el único dato
   * "extra" en Candidate, para que agregar un campo económico algún
   * día sea un cambio visible en la revisión, no un descuido.
   */
  readonly dismissReason?: string;
}
