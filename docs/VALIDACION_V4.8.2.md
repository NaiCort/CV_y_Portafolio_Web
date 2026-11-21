# Validación de V4.8.1 y V4.8.2

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`. 21 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **334 pruebas unitarias**, 6 nuevas en `tests/v48-cv.test.jsx`:
    - un solo h1 con el nombre y las secciones en orden;
    - cada demo enlazada una sola vez y con su identificador;
    - PDF de noviembre y CV visual como «pronto»;
    - el botón «Demos» abre y cierra;
    - el cotizador reconoce la variante `vertice`;
    - un identificador desconocido no muestra demo de origen.
  - La prueba de ruta desconocida ahora espera volver al CV.
- **`npm run test:browser:cv`:** 5 de 5 escenarios (320, 390, 768, 1024 y 1440 px), con axe sin hallazgos en el CV, en el desplegable abierto y en el cotizador. Además comprueba:
  - una sola lista de demos;
  - en escritorio la página no se desplaza entera, cada columna sí;
  - en celular, Esc cierra el desplegable, «Ver las 7 demos» lo abre y elegir una demo navega y lo cierra;
  - el PDF responde como `application/pdf`.
- **`npm run test:browser:cafe` y `test:browser:gimnasio`:** 5 de 5 escenarios cada una. Ambas visitan `/` y encuentran un solo enlace a su demo.
- **`npm run audit:encimados` en `/` y `/cotizador`:** 7 tamaños, sin casos.
- **`npm run audit:cwv`** (teléfono, CPU 4× y red lenta):
  - `/`: LCP 1.92 s y CLS 0.000;
  - `/cotizador`: LCP 1.62 s y CLS 0.013.
  - Referencia: la portada anterior medía LCP 1.60 s y CLS 0.009.
- **Respaldos de tipografía medidos a 100 px:**
  - Bricolage: 99.6 % contra Liberation Sans y 85.1 % contra DejaVu Sans;
  - Source Serif 4: 98.9 % y 78.1 %;
  - JetBrains Mono: 100 % y 99.7 %.
- **Capturas** a 1440, 1024 y 390 px: columnas, desplegable abierto, final del celular y cotizador con demo de origen.

## No comprobado

- Teléfono de Ian: queda a su revisión en la vista previa.
