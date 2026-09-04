import type { Criterion } from './types.js';
import { unintentionalWeightLoss } from './nutrition/unintentional-weight-loss.js';
import { delayedHealingDietFlag } from './nutrition/delayed-healing-diet-flag.js';
import { fearAvoidanceSignal } from './psychology/fear-avoidance-signal.js';
import { lowMoodAdherenceRisk } from './psychology/low-mood-adherence-risk.js';

export const allCriteria: readonly Criterion[] = [
  unintentionalWeightLoss,
  delayedHealingDietFlag,
  fearAvoidanceSignal,
  lowMoodAdherenceRisk,
];

export {
  unintentionalWeightLoss,
  delayedHealingDietFlag,
  fearAvoidanceSignal,
  lowMoodAdherenceRisk,
};
