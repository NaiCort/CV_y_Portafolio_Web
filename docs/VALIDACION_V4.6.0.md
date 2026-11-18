# Validación de V4.6.0

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 18 de noviembre de 2026. El visto bueno de Ian sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación de producción sin errores. Cotejo pesa 16.6 kB de JavaScript (5.7 kB comprimido) y 9.0 kB de CSS (2.7 kB comprimido).
- **244 pruebas en 30 archivos**, siete nuevas en `tests/despacho.test.jsx`: datos de los regímenes; Inicio con un h1 y sin `href="#"` ni `tel:`; el recibo cambia con el régimen; cotizar con el régimen elegido; aprobar y deshacer el previo; llamada simulada y menú; créditos y rutas desconocidas.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px, con axe (WCAG 2.2 AA) y sin desbordamiento en Inicio, Créditos, el recibo, el expediente, el WhatsApp simulado y el menú.
- Contrastes de la paleta calculados y anotados en la ficha.
- Detector de impeccable: solo la etiqueta superior de la llamada comercial compartida (V4.8).

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals; al cerrar V4.6.
