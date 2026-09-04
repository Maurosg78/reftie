/**
 * Notas SOAP sintéticas, escritas como texto continuo (no campos
 * separados) — así es como llegan de la mayoría de los EMR en la
 * práctica, según lo confirmado en el análisis previo al spike. Ningún
 * paciente real, ningún dato real. Ver docs/legal/gates-pendientes.md.
 */

export interface SyntheticNote {
  readonly id: string;
  readonly text: string;
  /** Qué se espera que dispare esta nota, para uso en tests/eval. */
  readonly expectedRuleIds: readonly string[];
}

export const syntheticNotes: readonly SyntheticNote[] = [
  {
    id: 'note-nutrition-positive-001',
    text:
      'Pt presents for follow-up post ACL reconstruction, week 6. Reports ' +
      'knee ROM improving slowly, still stiff in the morning. Mentions ' +
      "she's lost about 8 lbs over the past month without trying and " +
      'says her appetite has been poor since the surgery, "I just don\'t ' +
      'feel like eating most days." Denies fever or GI symptoms. Gait ' +
      'analysis shows mild antalgic pattern, improving from last visit. ' +
      'Objective: quad activation 4/5, ROM 0-110 flexion. Plan: continue ' +
      'strengthening progression, advance to closed chain exercises next ' +
      'session.',
    expectedRuleIds: ['nutrition-001'],
  },
  {
    id: 'note-nutrition-negative-001',
    text:
      'Pt presents for routine follow-up, low back pain, week 3 of ' +
      'treatment. Reports significant improvement in pain with ' +
      'lumbar flexion exercises. Sleep improved, mood good, eating well ' +
      'per report. No new complaints. Objective: SLR negative bilaterally, ' +
      'lumbar flexion improved 15 degrees from baseline. Plan: progress ' +
      'to phase 2 strengthening.',
    expectedRuleIds: [],
  },
  {
    id: 'note-psychology-positive-001',
    text:
      'Pt seen for chronic low back pain, session 8. States she is ' +
      'avoiding bending or lifting anything at home "because I\'m scared ' +
      'I\'ll re-injure it and it will never get better." Objective exam ' +
      'shows full lumbar ROM with no signs of nerve tension, strength ' +
      '5/5 throughout. Discrepancy noted between functional presentation ' +
      'and reported avoidance behavior. Plan: graded exposure to feared ' +
      'movements next session, continue current HEP.',
    expectedRuleIds: ['psychology-001'],
  },
  {
    id: 'note-psychology-negative-001',
    text:
      'Pt seen for shoulder impingement, session 4. Reports pain reduced ' +
      'from 6/10 to 3/10 with overhead activities. Compliant with home ' +
      'exercise program, doing exercises daily. Objective: shoulder ' +
      'flexion improved to 150 degrees, impingement signs less ' +
      'pronounced. Pt in good spirits, motivated to continue progressing.',
    expectedRuleIds: [],
  },
];
