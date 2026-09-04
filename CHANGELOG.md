# Changelog

Registro de cambios relevantes en el motor de reglas y los criterios
clínicos — no de cada commit. Base de trazabilidad para cualquier
revisión o auditoría futura (ver docs/adr/0003).

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
