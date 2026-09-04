# ADR-0001 — Separar extracción (LLM) de decisión (motor de reglas)

**Fecha:** 2026-09-04
**Estado:** Aceptado

## Contexto

Reftie necesita leer notas clínicas de texto libre y señalar candidatos
de derivación interna. Un LLM puede, en un solo paso, leer la nota y
"decidir" si corresponde sugerir una disciplina. Es la opción más
simple de implementar.

## Decisión

Se separa el proceso en dos etapas independientes:

- **Etapa A (extracción):** el LLM lee la nota y propone señales
  puntuales, cada una con una cita textual verbatim. No decide nada.
- **Etapa B (decisión):** un motor de reglas determinístico, sin LLM,
  consume las señales ya verificadas contra la nota (la cita debe ser
  subcadena literal, ver `verifyAndAttachOffsets`) y decide si un
  criterio se dispara.

## Alternativas descartadas

- **LLM decide directamente (un solo paso):** más simple de construir,
  pero no defendible ante un colegio profesional — "el modelo lo
  sugirió" no es una respuesta aceptable cuando se cuestiona un
  candidato. Descartada.
- **Reglas puramente léxicas (regex), sin LLM en ningún paso:** máxima
  defensibilidad y cero riesgo de alucinación, pero la variabilidad de
  redacción clínica real hace que la cobertura sea pobre. Se deja como
  opción de repliegue si la Etapa A no resulta lo bastante confiable en
  el eval de la Fase 0.

## Consecuencias

- El umbral de disparo de la Etapa B en este spike es deliberadamente
  simple (una señal verificada alcanza, ver `evaluateCriteria.ts`). No
  combina múltiples señales con lógica AND/OR todavía — eso requeriría
  definir, criterio por criterio, qué combinación es clínicamente
  suficiente, que es trabajo de curación, no de arquitectura, y queda
  fuera del alcance de este spike.
- Toda cita que el LLM proponga y no aparezca literal en la nota se
  descarta enteramente — no se corrige, no se aproxima. Esto puede
  descartar señales reales si el modelo parafrasea en vez de citar
  exacto; se acepta ese costo a cambio de nunca aceptar una cita
  fabricada.
