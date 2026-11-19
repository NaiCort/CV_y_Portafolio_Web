# Validación de V4.7.1 · Revista digital, volver a elegir y nada encimado

Entorno: Node 22, Chromium de Playwright; compilación de producción servida con `vite preview`. 19 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores.
- **304 pruebas en 36 archivos**; una nueva: las dos revistas tienen el enlace para volver a elegir y lleva a `/revista`.
- `npm run test:browser:revista`: **5 de 5 aprobados** de 320 a 1440 px, con axe (WCAG 2.2 AA) y sin desbordamiento.
- **Detector de textos encimados** (script de la sesión, no incluido en el repositorio): compara los rectángulos de todos los textos y controles visibles de la cabecera y el contenido. Se corrió en la entrada, las portadas de los N.º 24, 23 y 12, marcadores de Rubor, inicio, ficha, autor y marcadores de Prisma, en 11 tamaños (320 × 640, 360 × 780, 390 × 844, 430 × 932, 768 × 1024, 1024 × 768, 1280 × 720, 1440 × 900, 1600 × 760, 1980 × 870 y 2560 × 1080): **0 casos** con textos encimados o desbordamiento. Antes: portada de Rubor encimada en ventanas anchas y bajas y en celular, y tarjetas de tendencia de Prisma a 1024 px.
- **Marca de agua de la demo:** 0 choques con textos o con el código de barras en los mismos tamaños.

## No comprobado

- Teléfono físico y Safari: quedan a la revisión de Ian en la vista previa.
