# Validación de V4.8.5

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`. 22 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **340 pruebas unitarias**. Nuevas o cambiadas:
    - el índice tiene cuatro secciones;
    - «Experiencia» muestra 5 entradas;
    - cada certificación enlaza a su PDF;
    - el proyecto propio lleva a `/` sin pestaña nueva, sin «Ver las N demos» y sin línea de tiempo;
    - la experiencia contiene las frases que venían solo del CV visual.
- **`npm run test:browser:cv`:** 5 de 5 escenarios con axe. En escritorio, elegir «Certificaciones», luego «Educación» y otra vez «Certificaciones» deja marcada cada vez la sección elegida, y al volver arriba se marca «Resumen». El celular abre las demos desde el botón de la cabecera.
- **Otras comprobaciones:**
  - `finder.pdf` responde con 200 y `application/pdf`;
  - `npm run audit:encimados -- /`: sin casos.
- **Capturas:** Proyectos con el nombre nuevo, y Certificaciones con la tarjeta iluminada y el índice en «Certificaciones».

## No comprobado

- Teléfono de Ian: queda a su revisión en la vista previa.
