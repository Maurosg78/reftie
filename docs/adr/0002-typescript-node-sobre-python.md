# ADR-0002 — TypeScript/Node para este repo, no Python

**Fecha:** 2026-09-04
**Estado:** Aceptado

## Contexto

El autor tiene experiencia reciente con dos stacks distintos: Python
puro (stdlib, sin dependencias) en un proyecto de auditoría de
facturación no relacionado, y React 18/TypeScript/Vite/Firebase en su
producto clínico principal. El brief de contexto de Reftie ya declara
ese segundo stack como el conocido/familiar para la fase de producto
(dashboard, Firestore, Vertex AI).

## Decisión

Este spike, y el repo en general, usan TypeScript/Node desde el día
uno — no Python, aunque el otro proyecto del autor use Python.

## Alternativas descartadas

- **Python (mismo patrón que el otro proyecto):** válido para un spike
  aislado, pero Reftie va a crecer hacia un dashboard web + Firestore +
  llamadas a un LLM — si la Fase 0 se escribe en Python, la Fase 2/3
  implica reescribir el motor de reglas y los criterios en otro
  lenguaje, o mantener dos lenguajes en el mismo repo sin necesidad.
- **Empezar en Python "porque es más simple para un script" y decidir
  después:** descartada por la misma razón — la decisión de lenguaje es
  barata de tomar ahora y cara de revertir una vez que haya criterios
  versionados y tests escritos.

## Consecuencias

- Los tipos de dominio (`Criterion`, `VerifiedSignal`, `Candidate`)
  quedan expresados como tipos de TypeScript desde la Fase 0, reusables
  sin traducción cuando se construya el dashboard.
- No hay ninguna dependencia de código ni de datos con el proyecto en
  Python del autor — son repos separados, sin import cruzado, por
  diseño (ver la restricción de aislamiento del brief de contexto).
