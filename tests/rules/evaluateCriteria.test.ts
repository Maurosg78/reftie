import { describe, expect, it } from 'vitest';
import { evaluateCriteria } from '../../src/rules/evaluateCriteria.js';
import { allCriteria } from '../../src/criteria/index.js';
import type { VerifiedSignal } from '../../src/extraction/types.js';

/**
 * Suite de regresión clínica de la Etapa B — determinística, sin LLM.
 * Cada criterio tiene al menos un caso SÍ y un caso NO, con la razón
 * documentada en el nombre del test. Cuando se versione un criterio
 * más adelante, estos tests dicen si algo que antes funcionaba se
 * rompió.
 */

function buildSignal(overrides: Partial<VerifiedSignal>): VerifiedSignal {
  return {
    signalType: 'placeholder',
    quote: 'placeholder',
    disciplineSuggested: 'nutrition',
    ruleIdSuggested: 'nutrition-001',
    noteOffset: 0,
    ...overrides,
  };
}

describe('evaluateCriteria — nutrition-001 (unintentional weight loss)', () => {
  it('SÍ dispara: hay una señal verificada de peso/apetito con el ruleId correcto', () => {
    const signal = buildSignal({
      signalType: 'unintentional_weight_loss_reported',
      quote: "lost about 8 lbs over the past month without trying",
      ruleIdSuggested: 'nutrition-001',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    const nutritionCandidate = candidates.find((c) => c.ruleId === 'nutrition-001');
    expect(nutritionCandidate).toBeDefined();
    expect(nutritionCandidate?.evidence).toHaveLength(1);
    expect(nutritionCandidate?.status).toBe('pending');
  });

  it('NO dispara: la señal existe pero apunta a otro ruleId (no confunde criterios distintos)', () => {
    const signal = buildSignal({
      signalType: 'unintentional_weight_loss_reported',
      quote: 'lost weight',
      ruleIdSuggested: 'psychology-001',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    const nutritionCandidate = candidates.find((c) => c.ruleId === 'nutrition-001');
    expect(nutritionCandidate).toBeUndefined();
  });

  it('NO dispara: no hay ninguna señal', () => {
    const candidates = evaluateCriteria(allCriteria, []);
    expect(candidates).toHaveLength(0);
  });
});

describe('evaluateCriteria — nutrition-002 (delayed healing + diet flag)', () => {
  it('SÍ dispara: signalType conocido del criterio, ruleId correcto', () => {
    const signal = buildSignal({
      signalType: 'restrictive_diet_or_low_protein_mentioned',
      quote: 'following a very restrictive diet',
      ruleIdSuggested: 'nutrition-002',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    expect(candidates.some((c) => c.ruleId === 'nutrition-002')).toBe(true);
  });

  it('NO dispara: signalType no está en la lista de este criterio', () => {
    const signal = buildSignal({
      signalType: 'unrelated_signal_type',
      quote: 'algo no relacionado',
      ruleIdSuggested: 'nutrition-002',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    expect(candidates.some((c) => c.ruleId === 'nutrition-002')).toBe(false);
  });
});

describe('evaluateCriteria — psychology-001 (fear-avoidance)', () => {
  it('SÍ dispara: lenguaje de evitación por miedo, ruleId correcto', () => {
    const signal = buildSignal({
      signalType: 'movement_avoidance_due_to_fear',
      quote: "scared I'll re-injure it",
      disciplineSuggested: 'psychology',
      ruleIdSuggested: 'psychology-001',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    const psychCandidate = candidates.find((c) => c.ruleId === 'psychology-001');
    expect(psychCandidate).toBeDefined();
    expect(psychCandidate?.discipline).toBe('psychology');
  });

  it('NO dispara: nota sin señales de evitación no genera candidato psychology-001', () => {
    const candidates = evaluateCriteria(allCriteria, []);
    expect(candidates.some((c) => c.ruleId === 'psychology-001')).toBe(false);
  });
});

describe('evaluateCriteria — psychology-002 (ánimo bajo + baja adherencia)', () => {
  it('SÍ dispara: una sola señal ya alcanza en este spike (umbral simplificado, ver ADR-0001)', () => {
    const signal = buildSignal({
      signalType: 'sustained_low_mood_reported',
      quote: 'feeling hopeless about getting better',
      disciplineSuggested: 'psychology',
      ruleIdSuggested: 'psychology-002',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    expect(candidates.some((c) => c.ruleId === 'psychology-002')).toBe(true);
  });

  it('NO dispara: señal de otra disciplina no cruza a psychology-002', () => {
    const signal = buildSignal({
      signalType: 'sustained_low_mood_reported',
      quote: 'feeling hopeless',
      ruleIdSuggested: 'nutrition-001',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    expect(candidates.some((c) => c.ruleId === 'psychology-002')).toBe(false);
  });
});

describe('evaluateCriteria — invariante general', () => {
  it('todo candidato disparado tiene al menos una evidencia — nunca queda vacía', () => {
    const signal = buildSignal({
      signalType: 'unintentional_weight_loss_reported',
      quote: 'lost weight',
      ruleIdSuggested: 'nutrition-001',
    });

    const candidates = evaluateCriteria(allCriteria, [signal]);

    for (const candidate of candidates) {
      expect(candidate.evidence.length).toBeGreaterThan(0);
    }
  });
});
