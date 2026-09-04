# ADR-0003 — Certificación formal: decisión pospuesta

**Fecha:** 2026-09-04
**Estado:** Aceptado (revisar cuando cambie la señal descrita abajo)

## Contexto

Reftie maneja datos clínicos y toma decisiones que afectan directamente
la atención de un paciente (qué candidato de derivación se sugiere).
Existen marcos de certificación formal aplicables a software clínico
(ej. ISO 13485 si en algún momento se tratara como dispositivo médico,
o procesos de auditoría de seguridad exigidos por clientes grandes o
inversores).

## Decisión

No se persigue ninguna certificación formal en esta fase. El spike y
las fases inmediatamente siguientes (Fases 0-4 del roadmap acordado)
se construyen con disciplina de ingeniería (lint, CI, tests,
versionado de criterios, ADRs) pero sin proceso de certificación.

## Por qué

Perseguir una certificación formal ahora sería desproporcionado: no hay
negocio validado, no hay clínicas pagando, no hay datos reales
todavía. El costo de tiempo de un fundador solo en ese proceso no se
justifica contra la incertidumbre real del proyecto en esta etapa.

## Señal que reabriría esta decisión

Cualquiera de estas condiciones amerita retomar la conversación:

- Un número concreto de clínicas pagando que haga que el riesgo
  reputacional/legal de un incidente supere el costo de certificar.
- Un ingreso anual que sostenga el tiempo de un proceso de
  certificación sin comprometer el resto del negocio.
- Un cliente grande o un inversor que lo exija explícitamente como
  condición.

## Lo que sí se hace ahora, porque es gratis y es la base de certificar después

- Lint y formateo automático desde el primer commit.
- CI que corre lint + tests en cada push.
- `CHANGELOG.md` de cambios relevantes en el motor de reglas y los
  criterios.
- Criterios versionados con `reviewedBy`/`reviewDate` desde el día uno.
- ADRs para cada decisión de diseño no trivial.

Nada de esto es certificación — es la trazabilidad que hace posible
certificar más adelante sin tener que reconstruir el historial desde
cero.
