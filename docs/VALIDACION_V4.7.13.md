# Validación de V4.7.13

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

- `scripts/revista-musica.mjs` (dentro de `npm run test:browser:revista`, en los 5 anchos): la entrada no tiene bocina; la bocina está a menos de 90 px de la esquina inferior derecha; empieza en silencio con la pista de Rubor; sin música, pasar el cursor no muestra el volumen; al activarla y pasar el cursor aparece; el volumen cambia el audio; al quitar el cursor se oculta; al volver a la entrada y abrir Prisma sigue sonando con la pista de Prisma; al recargar empieza en silencio y recuerda el volumen; Privacidad la apaga y restablece.
- Las tres pistas comparadas por huella SHA-1 con la de Wikimedia Commons antes de recodificarlas.
- Capturas de la bocina en reposo y con el volumen abierto en Rubor, Umbral y Prisma (escritorio y 390 px).

## No comprobado

- Reproducción en teléfono físico (iOS exige un toque; la bocina lo es).
