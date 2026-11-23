# Validación de V4.8.5

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`. 22 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **340 pruebas unitarias**. Nuevas o cambiadas:
    - el índice tiene cinco secciones;
    - «Proyectos» muestra 1 entrada (este sitio);
    - «Experiencia» muestra 4 entradas, con Rincón de Imágenes.
    - cada certificación enlaza a su PDF;
    - el proyecto propio lleva a `/` sin pestaña nueva, sin «Ver las N demos» y sin línea de tiempo;
    - la experiencia contiene las frases que venían solo del CV visual.
- **`npm run test:browser:cv`:** 5 de 5 escenarios con axe. En escritorio, elegir «Certificaciones», luego «Educación» y otra vez «Certificaciones» deja marcada cada vez la sección elegida, y al volver arriba se marca «Resumen». El celular abre las demos desde el botón de la cabecera.
- **Otras comprobaciones:**
  - `finder.pdf` responde con 200 y `application/pdf`;
  - `npm run audit:encimados -- /`: sin casos.
- **Ancho sin franja:** el CV mide 1440 de 1440 px y 1999 de 1999 px, y el fondo de `html` es `rgb(21, 17, 15)`. En `/cafe`, `scrollbar-gutter` sigue en `stable`. Con el bloqueo de escritorio, a 1000, 1440 y 1999 px el alto del documento es igual al de la ventana y `overflow` está en `hidden`. En el celular la página sigue desplazándose, y el cotizador también.
- **Capturas:** Proyectos con el nombre nuevo, y Certificaciones con la tarjeta iluminada y el índice en «Certificaciones».

## No comprobado

- Teléfono de Ian: queda a su revisión en la vista previa.
