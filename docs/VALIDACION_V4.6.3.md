# Validación de V4.6.3

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 18 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 54.5 kB de JavaScript (15.9 kB comprimido) y 18.1 kB de CSS (4.3 kB comprimido).
- **268 pruebas en 33 archivos**, siete nuevas en `tests/despacho-expediente.test.jsx`: el previo cuadra con la tabla de RESICO; transiciones válidas del previo; semáforo según buzón, previo y solicitudes; expediente guardado dañado; recorrido completo (entrada sin contraseña, duda, aprobación, presentación simulada, acuse y su vista); archivo que solo se anota, «No lo tengo», buzón, reinicio y salida; enlaces de la cabecera y la portada.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px; recorre el expediente completo con un archivo real elegido en el selector, con axe y sin desbordamiento.
- Detector de impeccable en Tu expediente: sin hallazgos propios.
