# Gates legales pendientes

Este archivo documenta que estos gates existen y que nada de producción
arranca sin marcarlos como cerrados. **No contiene, y nunca debe
contener, contenido legal real** (ni borradores de contrato, ni
opiniones legales, ni nombres de pacientes) — solo el checklist vivo.

## Checklist

- [ ] **(a) Contrato PHIPA / modelo "agente"-HINP**, revisado por un
      abogado de privacidad de salud en Ontario. Determina bajo qué
      base legal Reftie puede procesar notas clínicas por instrucción
      de la clínica custodia, y si el procesamiento fuera de Canadá es
      viable bajo ese modelo (probablemente sí, condicionado a
      disclosure honesto — ver nota abajo).
- [ ] **(b) Texto de disclosure de auto-referral del College of
      Physiotherapists of Ontario (CPO)**, revisado antes de que
      cualquier alerta se muestre a un clínico real.
- [ ] **(c) Confirmación de la región de procesamiento del LLM que se
      use en producción** (no en el spike de la Fase 0, que usa
      únicamente datos sintéticos). Cualquier afirmación sobre dónde se
      procesa el texto debe ser literalmente cierta en el código, sin
      excepción — precedente conocido de un texto de consentimiento
      afirmando "servidores canadienses" cuando el procesamiento real
      ocurría en EEUU.

## Nota de encuadre (no reemplaza al abogado)

El requisito de PHIPA no es necesariamente "procesar 100% dentro de
Canadá" — el modelo de agente/proveedor de servicios bajo instrucción
del custodio permite procesamiento fuera de Canadá con el contrato y el
disclosure correctos. Esto no cierra el gate (a) — solo evita que se
sobre-construya infraestructura de residencia de datos asumiendo que es
la única vía posible, cuando el bloqueante real es el contrato, no el
código.

## Regla dura mientras esto no esté cerrado

**No se recibe, procesa, ni almacena una sola nota clínica real hasta
que (a) y (b) estén marcados como cerrados.** El gate (c) aplica
específicamente antes de escribir cualquier texto de consentimiento que
mencione dónde se procesan los datos.
