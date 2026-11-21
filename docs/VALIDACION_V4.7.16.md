# Validación de V4.7.16

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores; **322 pruebas unitarias** (una nueva: «Agua» se lee completo con tres pliegos, gota, guardado y cuatro capas de proceso).
- `npm run test:browser:revista`: **5 de 5 escenarios aprobados** (320 a 1440 px), ahora también con el dossier «Agua» y la lámina de «Crear». La espera antes de axe usa `document.getAnimations()` para incluir las transiciones entre páginas, y después del borrado de datos espera la reaparición de la llamada comercial compartida (framer-motion, que no aparece en esa lista).
- Gymnopédie n.º 1: huella SHA-1 igual a la de Wikimedia Commons antes de recodificar; registrada en `medios-origen.json`.
- Capturas: portada de Rubor tras la entrada animada y la barra de avance a media página.

## No comprobado

- Teléfono físico, Safari y Firefox (Firefox no tiene animaciones ligadas al desplazamiento: no hay barra de avance ni entradas al bajar; el resto funciona igual).
