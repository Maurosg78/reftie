/**
 * Salida cruda de la Etapa A (extracción). El LLM propone; no decide.
 * `quote` DEBE ser una subcadena literal de la nota — se verifica en
 * código, no se confía en que el modelo la copió bien (ver
 * verifyQuoteInNote en extractSignals.ts).
 */
export interface ExtractedSignalCandidate {
  readonly signalType: string;
  readonly quote: string;
  readonly disciplineSuggested: string;
  readonly ruleIdSuggested: string;
}

/**
 * Señal ya verificada contra la nota (offset calculado por código, no
 * por el modelo). Es lo único que la Etapa B tiene permitido consumir —
 * nunca una ExtractedSignalCandidate sin verificar.
 */
export interface VerifiedSignal extends ExtractedSignalCandidate {
  readonly noteOffset: number;
}
