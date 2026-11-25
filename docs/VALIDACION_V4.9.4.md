# Validación de V4.9.4

Entorno: Node 22 y Chromium de Playwright, compilación de producción con `vite preview`. 25 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores.
- **396 pruebas unitarias.** Cambios:
  - la prueba de «IA sin número» pasa a «IA con precio y costos de terceros a la vista»: el asistente de WhatsApp cuesta 10,000 MXN antes de calidad, lanzamiento e IVA, y el diagnóstico existe;
  - nueva prueba de los niveles de tarifa (junior actual, intermedio y senior mayores);
  - siguen pasando las de catálogo coherente, versiones crecientes por demo, mínimo, plazo, urgencia, plan mensual y sugerencias.
- **Navegador con axe** (`DEMO_START_PREVIEW=1 npm run test:browser:cv`): 5 de 5, de 320 a 1440 px.
- **Cifras revisadas a mano** contra los rangos de la investigación (tabla en `ESTADO_V4.9.4.md`).

## No comprobado

- Teléfono de Ian.
- Las fuentes de precios son en su mayoría comerciales; los rangos son orientativos.
