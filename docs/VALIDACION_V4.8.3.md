# Validación de V4.8.3

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`. 22 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **338 pruebas unitarias**, 4 nuevas en `tests/v48-cv.test.jsx`:
    - foto con texto alternativo y `srcset`;
    - el índice enlaza seis secciones y marca la primera;
    - la línea de tiempo tiene 8 filas, ninguna barra pasa de hoy ni empieza antes de 2018, las dos en curso son la maestría y Múltiples Demos, y la leyenda nombra agosto de 2028;
    - abrir una demo navega a su ruta.
- **`npm run test:browser:cv`:** 5 de 5 escenarios (320 a 1440 px) con axe sin hallazgos. Además:
  - en escritorio, el índice marca «Trayectoria» al elegirla;
  - abrir Ladera llega a `/cafe`, con la transición animada a 1440 px y directa con movimiento reducido;
  - volver regresa al CV.
- **`npm run audit:encimados -- /`:** 7 tamaños, sin casos.
- **`npm run audit:cwv -- /`:** LCP 1.96 s (la foto, en celular con red lenta) y CLS 0.000.
- **Capturas:**
  - escritorio con la cuadrícula marcada bajo el cursor;
  - índice en «Resumen» y en «Trayectoria»;
  - línea de tiempo;
  - transición a media animación (color de Ladera creciendo);
  - celular con la foto cuadrada y la línea de tiempo apilada.

## No comprobado

- Teléfono de Ian: queda a su revisión en la vista previa.
