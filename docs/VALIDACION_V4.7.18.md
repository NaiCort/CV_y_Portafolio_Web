# Validación de V4.7.18

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores; **322 pruebas unitarias** aprobadas.
- `npm run test:browser:revista`: **5 de 5 escenarios aprobados** (320 a 1440 px) con axe (WCAG 2.2 AA), 29 páginas, límites horizontales y flujos (suscripción, envío en Prisma, música, guardados entre pestañas, privacidad). Axe pidió contraste para el símbolo de área del manuscrito; corregido.
- **Detector de textos encimados:** 27 páginas en 7 tamaños, sin casos reales tras las correcciones (los avisos que quedan son falsos conocidos: cajas de enlaces partidos en dos renglones, párrafos repartidos en columnas y contenido de desplegables cerrados).
- **`impeccable detect`** en cuenta y detrás de cámaras de Rubor, publicar y áreas de Prisma, inicio y «Agua» de Umbral: corregidos los hallazgos propios de estas páginas; los de la llamada comercial compartida y la marca de agua siguen anotados para V4.8.

## No comprobado

- Teléfono físico, Safari y Firefox.
