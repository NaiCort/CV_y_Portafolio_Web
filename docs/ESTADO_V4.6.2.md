# Estado de V4.6.2 · Diagnóstico, calendario y calculadoras

Tercera entrega de Cotejo, 18 de noviembre de 2026. Base: V4.6.1 en `main` (`8893b72`). Ficha: [FICHA_DESPACHO.md](FICHA_DESPACHO.md).

## Construido

- **`/despacho/diagnostico`:** cinco preguntas, una a la vez, con barra de avance y «Atrás» (cómo ganas tu dinero, cuánto al año, empleados, si estás al corriente y si tienes buzón tributario). Procesamiento simulado y resultado: régimen probable, riesgos en semáforo (RESICO rebasado, declaraciones pendientes, opinión de cumplimiento por revisar, buzón sin activar, nómina e IMSS), plan sugerido con precio y «Cotizar este plan» con ese régimen. Nada se guarda.
- **`/despacho/calendario`:** el mes en curso con los días que vencen marcados y la lista de obligaciones según el régimen (ISR e IVA el 17, contabilidad electrónica el 3 o el 5, DIOT el último día, anuales en marzo y abril, PTU en mayo) y, con empleados, retenciones e IMSS y el retiro e INFONAVIT de cada bimestre. Las fechas en fin de semana pasan al lunes; los festivos no se marcan y la página lo dice. Navegación entre meses.
- **`/despacho/calculadoras`:** ISR de RESICO (tabla del art. 113-E menos la retención de 1.25 % de personas morales), aguinaldo (proporcional y parte exenta de 30 UMA con la UMA 2026 de $117.31) y finiquito bruto (aguinaldo proporcional, vacaciones pendientes según la LFT de 2023 y prima vacacional de 25 %; avisa que no incluye indemnización ni prima de antigüedad). Recalculan al escribir.
- Menú de escritorio: Precios, Diagnóstico, Calendario, Calculadoras y Servicios; el del teléfono suma Cómo trabajamos y Quiénes somos. Las herramientas de la portada enlazan a su página; «Tu expediente» dice que llega en la siguiente entrega.

## Qué revisar en la vista previa

1. Hacer el diagnóstico respondiendo «Debo declaraciones» y «No» al buzón.
2. En el calendario, elegir «Persona moral», marcar «Tengo empleados» y avanzar un mes.
3. Probar las tres calculadoras.
