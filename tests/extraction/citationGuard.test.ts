import { describe, expect, it } from 'vitest';
import { verifyAndAttachOffsets } from '../../src/extraction/extractSignals.js';
import type { ExtractedSignalCandidate } from '../../src/extraction/types.js';

/**
 * El guardrail más importante del spike: si el LLM alucina o parafrasea
 * una cita, se descarta — nunca se acepta una señal sin cita verbatim
 * verificable en la nota. Esta suite no llama a ningún LLM.
 */

describe('verifyAndAttachOffsets', () => {
  const noteText =
    'Patient reports losing weight without trying and poor appetite since surgery.';

  it('conserva una señal cuya cita es subcadena literal exacta de la nota', () => {
    const candidates: ExtractedSignalCandidate[] = [
      {
        signalType: 'unintentional_weight_loss_reported',
        quote: 'losing weight without trying',
        disciplineSuggested: 'nutrition',
        ruleIdSuggested: 'nutrition-001',
      },
    ];

    const verified = verifyAndAttachOffsets(candidates, noteText);

    expect(verified).toHaveLength(1);
    expect(verified[0]?.noteOffset).toBe(noteText.indexOf('losing weight without trying'));
  });

  it('descarta una señal cuya cita fue parafraseada (no es subcadena literal)', () => {
    const candidates: ExtractedSignalCandidate[] = [
      {
        signalType: 'unintentional_weight_loss_reported',
        // Paráfrasis plausible, pero no aparece literal en la nota.
        quote: 'patient has been losing weight unintentionally',
        disciplineSuggested: 'nutrition',
        ruleIdSuggested: 'nutrition-001',
      },
    ];

    const verified = verifyAndAttachOffsets(candidates, noteText);

    expect(verified).toHaveLength(0);
  });

  it('descarta una señal alucinada, ausente por completo de la nota', () => {
    const candidates: ExtractedSignalCandidate[] = [
      {
        signalType: 'movement_avoidance_due_to_fear',
        quote: "scared I'll re-injure it",
        disciplineSuggested: 'psychology',
        ruleIdSuggested: 'psychology-001',
      },
    ];

    const verified = verifyAndAttachOffsets(candidates, noteText);

    expect(verified).toHaveLength(0);
  });

  it('procesa una lista mixta conservando solo las citas verificables', () => {
    const candidates: ExtractedSignalCandidate[] = [
      {
        signalType: 'unintentional_weight_loss_reported',
        quote: 'poor appetite since surgery',
        disciplineSuggested: 'nutrition',
        ruleIdSuggested: 'nutrition-001',
      },
      {
        signalType: 'movement_avoidance_due_to_fear',
        quote: 'this quote does not exist in the note',
        disciplineSuggested: 'psychology',
        ruleIdSuggested: 'psychology-001',
      },
    ];

    const verified = verifyAndAttachOffsets(candidates, noteText);

    expect(verified).toHaveLength(1);
    expect(verified[0]?.signalType).toBe('unintentional_weight_loss_reported');
  });

  it('nota vacía nunca produce señales verificadas', () => {
    const candidates: ExtractedSignalCandidate[] = [
      {
        signalType: 'unintentional_weight_loss_reported',
        quote: 'cualquier cosa',
        disciplineSuggested: 'nutrition',
        ruleIdSuggested: 'nutrition-001',
      },
    ];

    const verified = verifyAndAttachOffsets(candidates, '');

    expect(verified).toHaveLength(0);
  });
});
