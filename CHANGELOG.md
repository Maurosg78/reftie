# Changelog

Registro de cambios relevantes en el motor de reglas y los criterios
clínicos — no de cada commit. Base de trazabilidad para cualquier
revisión o auditoría futura (ver docs/adr/0003).

## [0.1.0] — 2026-09-04

- **Primer eval de extracción en verde: 4/4.** Corrido vía GitHub
  Actions (`eval-extraction.yml`, workflow_dispatch, secret
  `ANTHROPIC_REFTIE`). Los 2 casos positivos dispararon el criterio
  correcto con cita verbatim verificada; los 2 negativos no dispararon
  nada. Responde, en esta muestra mínima (n=4, 2 disciplinas), la
  pregunta central del spike: la extracción con cita es defendible.
  **No es una validación robusta** — falta variedad de redacción real,
  más disciplinas, y notas de clínicas de verdad.
- Bug real encontrado y corregido en el camino: `parseCandidates`
  asumía que el texto de la respuesta del modelo estaba en
  `content[0]`. Con razonamiento extendido activo, el modelo devuelve
  `[thinking, text]` en ese orden — los 2 casos positivos (más
  complejos) siempre devolvían 0 candidatos por esto, no por un
  problema de los criterios ni del prompt. Corregido buscando el
  primer bloque `type: 'text'` en toda la respuesta.
- Bug menor corregido: el `.env` documentado en el README nunca se
  cargaba en `runExtractionEval.ts`.

## [0.0.0] — 2026-09-04

- Fase 0: spike de extracción. Repo inicializado.
- 4 criterios clínicos v1, provisionales, pendientes de revisión por
  el profesional de la disciplina correspondiente (ver nota en cada
  archivo de `src/criteria/`):
  - `nutrition-001` — pérdida de peso no intencional / apetito reducido.
  - `nutrition-002` — recuperación más lenta de lo esperado + bandera
    de dieta restrictiva.
  - `psychology-001` — evitación por miedo / catastrofización.
  - `psychology-002` — ánimo bajo sostenido + baja adherencia al HEP.
- Etapa A (extracción con cita verbatim verificada) y Etapa B (motor
  de reglas determinístico) implementadas y separadas, ver ADR-0001.
- 4 notas SOAP sintéticas (2 disciplinas × caso positivo/negativo).
