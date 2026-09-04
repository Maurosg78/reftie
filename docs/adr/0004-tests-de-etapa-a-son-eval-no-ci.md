# ADR-0004 — Los tests de la Etapa A son un eval manual, no parte de CI

**Fecha:** 2026-09-04
**Estado:** Aceptado

## Contexto

El prompt de este spike pedía que cada criterio tuviera al menos un
caso SÍ y un caso NO como "primera suite de regresión clínica". Al
implementar, aparece una distinción que no estaba explícita en el
pedido original: la Etapa A llama a un LLM real (no determinístico,
cuesta dinero por llamada), y la Etapa B es una función pura.

## Decisión

- Los tests de la **Etapa B** (`evaluateCriteria`) y del guardrail de
  citas (`verifyAndAttachOffsets`) son tests unitarios normales, corren
  en CI en cada push, con fixtures fijas, sin llamar a ningún LLM.
- El comportamiento de la **Etapa A** contra las notas sintéticas se
  valida con `scripts/runExtractionEval.ts`, corrido a mano con una API
  key real. No es parte de la suite de CI.

## Por qué

Meter una llamada real a un LLM en CI significaría: (a) cada push cuesta
dinero, (b) los tests pueden fallar por variabilidad del modelo sin que
el código haya cambiado, (c) hace falta una API key en el entorno de CI,
con el riesgo de manejo de secreto que eso implica para un fundador
solo. Nada de eso es necesario todavía — separar ambas cosas mantiene
CI rápido, gratis y determinístico, y deja el eval de calidad de
extracción como lo que realmente es: una pregunta de producto ("¿esto
es lo bastante bueno?"), no una prueba de regresión de código.

## Consecuencias

- La pregunta central del spike de la Fase 0 ("¿la extracción es
  defendible?") se responde corriendo `npm run eval:extraction` a mano,
  leyendo la salida, no viendo un check verde en GitHub Actions.
- Si en el futuro se quiere automatizar esto (ej. alertar si la
  extracción empeora entre versiones de prompt), eso es un eval
  pipeline aparte, con su propio presupuesto y cadencia — no CI.
