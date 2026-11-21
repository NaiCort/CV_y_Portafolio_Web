# Validación de V4.7.21

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores; **322 pruebas unitarias**; `npm run test:browser:revista`: **5 de 5 escenarios aprobados** (320 a 1440 px) con axe.
- Detector de textos encimados en las 8 páginas de Umbral y 7 tamaños: sin casos reales (solo los avisos falsos conocidos de enlaces partidos y columnas).
- Capturas: colofón a 390 px con espacio bajo la cabecera corrida; inicio y «Entre líneas» a 1440 px con el crédito de portada al pie de la página.

## No comprobado

- Teléfono de Ian: queda a su revisión en la vista previa.
