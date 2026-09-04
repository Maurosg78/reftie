import type { Criterion } from '../criteria/types.js';
import type { VerifiedSignal } from '../extraction/types.js';
import type { Candidate } from './types.js';

/**
 * Etapa B. Determinística, sin LLM — consume señales ya verificadas
 * (Etapa A + verifyAndAttachOffsets) y decide si un criterio se dispara.
 *
 * Regla de umbral de este spike: alcanza con UNA señal verificada cuyo
 * signalType esté en la lista del criterio y cuyo ruleIdSuggested
 * coincida con el id del criterio. Es una simplificación deliberada —
 * ver docs/adr/0001 sobre por qué no se combina con lógica AND/OR más
 * fina todavía, y qué haría falta para eso.
 */
export function evaluateCriteria(
  criteria: readonly Criterion[],
  signals: readonly VerifiedSignal[],
): Candidate[] {
  const candidates: Candidate[] = [];
  for (const criterion of criteria) {
    const matchingSignals = findMatchingSignals(criterion, signals);
    const hasEnoughEvidence = matchingSignals.length > 0;
    if (hasEnoughEvidence) {
      candidates.push({
        ruleId: criterion.id,
        discipline: criterion.discipline,
        evidence: matchingSignals,
        status: 'pending',
      });
    }
  }
  return candidates;
}

function findMatchingSignals(
  criterion: Criterion,
  signals: readonly VerifiedSignal[],
): VerifiedSignal[] {
  return signals.filter((signal) => {
    const ruleIdMatches = signal.ruleIdSuggested === criterion.id;
    const signalTypeIsKnown = criterion.signalTypes.includes(signal.signalType);
    return ruleIdMatches && signalTypeIsKnown;
  });
}
