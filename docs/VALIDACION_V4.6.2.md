# Validación de V4.6.2

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 18 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 41.6 kB de JavaScript (12.7 kB comprimido) y 15.3 kB de CSS (3.8 kB comprimido).
- **261 pruebas en 32 archivos**, diez nuevas en `tests/despacho-herramientas.test.jsx`: régimen sugerido por respuesta; riesgos y caso sin riesgos; diagnóstico completo con «Atrás», procesamiento, plan ($4,440 para persona moral con tres empleados), enlace a cotizar y reinicio; fecha en sábado que pasa al lunes; obligaciones por régimen, anuales y bimestre del IMSS; calendario con hoy marcado, cambio de mes y de régimen; ISR de RESICO por tramo y retención; aguinaldo con exento de 30 UMA; días de vacaciones por antigüedad y finiquito; cambio de calculadora y fechas inválidas.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px; recorre las tres páginas nuevas en todos los anchos, el diagnóstico completo, el calendario con otro régimen y mes y las tres calculadoras, con axe y sin desbordamiento.
- Detector de impeccable: se convirtió en h2 el contador de preguntas del diagnóstico. Quedan la etiqueta de la llamada comercial y la marca de agua fija, compartidas (V4.8).
- Fuente de la UMA 2026: [INEGI](https://www.inegi.org.mx/temas/uma/).
