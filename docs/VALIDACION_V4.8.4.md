# Validación de V4.8.4

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`. 22 de noviembre de 2026.

- **Revisiones automáticas:**
  - ESLint, Prettier y compilación sin errores.
  - **338 pruebas unitarias.** La prueba de la lista de demos ahora comprueba la miniatura de cada una en lugar del identificador visible.
- **`npm run test:browser:cv`:** 5 de 5 escenarios (320 a 1440 px). Axe no encuentra problemas de contraste ni de otro tipo con la paleta oscura, tampoco con el desplegable abierto ni en el cotizador. El índice, la transición a Ladera y el regreso funcionan.
- **`npm run audit:encimados -- /,/cotizador`:** 7 tamaños, sin casos.
- **`npm run audit:cwv -- /`:** LCP 1.87 s (la foto) y CLS 0.000.
- **Capturas:**
  - escritorio con el reflector, la tarjeta iluminada y las hermanas atenuadas;
  - demo bajo el cursor con las demás atenuadas;
  - el botón del PDF con su contorno al pasar el cursor;
  - celular con portada, títulos fijos, desplegable de demos y cabecera;
  - cotizador.
  - Se corrigió:
    - la cuadrícula de escritorio, rota por una regla general que fijaba la posición de todos los hijos;
    - los botones de la cabecera del celular, que no tenían estilo;
    - el título de la primera demo, que se partía.

## No comprobado

- Teléfono de Ian: queda a su revisión en la vista previa.
