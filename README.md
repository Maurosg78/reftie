# Reftie

Una capa de auditoría que lee las notas clínicas que una clínica de
fisioterapia multidisciplinaria **ya escribe**, y señala pacientes
activos cuyo propio registro documenta criterio clínico objetivo para
otro servicio interno de la misma clínica (nutrición, psicología,
terapia ocupacional, pelvic health, masaje, quiropraxia).

Salida: una tarjeta por candidato, con la evidencia citada del propio
registro y la decisión siempre en manos del clínico.

## Qué NO es, explícitamente

- **No es una EMR.** Se monta encima de la que la clínica ya usa
  (Jane, WebPT, Prompt, Noterro, Juvonno).
- **No es un ambient scribe.** No graba sesiones. Lee texto ya escrito.
- **No deriva.** Señala. No contacta al paciente, no agenda, no envía
  nada.
- **No ve tarifas, metas de ingreso, ni volumen de facturación.** El
  criterio es clínico o no existe — ver docs/adr/0001 y el tipo
  `Candidate` en `src/rules/types.ts`.

## Estado actual: Fase 0 — spike de extracción

Sin PHI real, sin infraestructura de producción. Un script que:

1. Lee una nota SOAP sintética (texto continuo, no campos separados).
2. Etapa A: un LLM propone señales clínicas con cita textual verbatim
   (`src/extraction/`).
3. Cada cita se verifica contra la nota — si no aparece literal, se
   descarta (`verifyAndAttachOffsets`).
4. Etapa B: un motor de reglas determinístico, sin LLM, decide si las
   señales verificadas alcanzan para disparar un candidato
   (`src/rules/evaluateCriteria.ts`).

Ver `docs/adr/0001-separar-extraccion-de-decision.md` para el porqué de
esta separación.

## Gates legales abiertos — leer antes de tocar un dato real

**No se procesa una sola nota real de paciente hasta que estén
cerrados.** Ver `docs/legal/gates-pendientes.md` para el detalle:
contrato PHIPA/agente-HINP, disclosure de auto-referral del CPO, y
confirmación de región de procesamiento del LLM en producción.

## Uso

```bash
npm install
cp .env.example .env   # completar ANTHROPIC_API_KEY para el eval

npm run lint
npm run build
npm test                  # Etapa B + guardrail de citas, sin LLM, corre en CI
npm run eval:extraction   # Etapa A contra notas sintéticas, requiere API key, no corre en CI (ver ADR-0004)
```

## Estructura

```
docs/
  adr/     — decisiones de diseño, contexto + alternativas descartadas
  prd/     — PRDs (todavía ninguno, ver docs/prd/README.md)
  legal/   — checklist de gates legales, nunca contenido legal real
src/
  extraction/  — Etapa A: LLM lee la nota, saca señales + cita
  rules/       — Etapa B: motor de reglas determinístico
  criteria/    — criterios clínicos por disciplina, versionados
data/
  synthetic/   — notas de prueba — nunca nada real
scripts/
  hooks/       — pre-commit anti-PHI (instalar con `git config core.hooksPath scripts/hooks`)
  runExtractionEval.ts — eval manual de la Etapa A
tests/
  rules/, extraction/ — suites determinísticas, corren en CI
```

## Instalar el pre-commit hook anti-PHI

Una vez por clon:

```bash
git config core.hooksPath scripts/hooks
```

Es una última red contra commitear datos reales por error — no
sustituye la disciplina de nunca poner nada fuera de `data/synthetic/`.
