# Validación de V4.8.7

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción (`npm run build`, que incluye el prerenderizado) servida por `vite preview`. 25 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **344 pruebas unitarias** en 42 archivos; 2 nuevas en `tests/v487-cierre.test.jsx`:
    - en la página de entrada (historial sin clave), `useRouteFocus` no mueve el foco;
    - al navegar dentro del sitio (historial con clave), lleva el foco a `#contenido`.
- **Orden del teclado** (recorrido con Tab a 1440 px):
  - antes: el foco empezaba en `main` y el primer Tab caía en «CV y portafolio web»;
  - después: el foco empieza en el documento y el primer Tab cae en «Saltar al CV»; luego vienen el PDF, el índice, el contacto, el CV y las demos.
- **impeccable** (`detect` sobre `/` y `/cotizador` compilados): sin hallazgos. Sus 12 notas de palabras solas desaparecieron con `text-wrap: pretty`.
- **Textos encimados** (`npm run audit:encimados -- /,/cotizador`): 0 casos.
- **Core Web Vitals** (`npm run audit:cwv`, teléfono, CPU 4× y red lenta):
  - `/`: LCP 1.14 s y CLS 0.000;
  - `/cotizador`: LCP 1.65 s y CLS 0.006.
- **Capturas** a 1440 y 390 px: selección brasa, foco con contorno brasa y barras finas con el tono del filete.
- **Pruebas de navegador con axe** (`DEMO_START_PREVIEW=1`), todas porque el cambio de foco toca un gancho compartido:
  - CV: 5 de 5.
  - Patio 12: 12 de 12.
  - Ladera, Brío y Taller: 5 de 5 cada una.
  - Cotejo, Revista y Psicólogo: en curso.

## No comprobado

- Teléfono de Ian (vista previa del PR).
