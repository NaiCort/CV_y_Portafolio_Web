# Validación de V4.8.0

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`. 21 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **328 pruebas unitarias** (6 nuevas en `tests/v48-preparacion.test.jsx`):
    - catálogo con identificadores únicos;
    - la portada lista todas las demos;
    - llamada comercial con h2 y sin etiqueta;
    - banner y autoría como regiones con nombre;
    - contador visible dentro del restaurante y oculto fuera de él, con la visita conservada.
- **Pruebas de navegador con axe** (`DEMO_START_PREVIEW=1`):
  - Psicólogo: 16 combinaciones y 2 recorridos.
  - Patio 12: 12 escenarios. El escenario del contador se actualizó: al volver al portafolio el contador desaparece, la visita sigue guardada y el contador regresa con la ruta del restaurante.
  - Ladera, Brío, Rosales y Vértice, y Cotejo: 5 de 5 escenarios cada una.
  - Revista: en curso al escribir este documento. Se anota el resultado al terminar.
- **Capturas a 390 y 1280 px del final de las 10 rutas de demo:**
  - la franja de autoría cierra la página sin tapar el texto;
  - la llamada comercial se ve en todas;
  - sin desborde horizontal.
- **Herramientas nuevas:**
  - `scripts/encimados.mjs` sobre `/cafe` y `/`: sin casos, después de descartar los elementos sin texto;
  - `scripts/cwv.mjs` sobre `/` (portada actual): LCP 1.60 s y CLS 0.009, como referencia para el CV nuevo.

## No comprobado

- Teléfono de Ian: queda a su revisión en la vista previa.
