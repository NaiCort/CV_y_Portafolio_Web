# Validación de V4.6.1

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 18 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 25.0 kB de JavaScript (8.1 kB comprimido) y 11.6 kB de CSS (3.2 kB comprimido).
- **251 pruebas en 31 archivos.** Seis nuevas en `tests/despacho-precios.test.jsx` (estimación por régimen, facturas extra y nómina; régimen anual sin cargos extra; precios de todos los extras; listas y un h1; régimen pedido por la dirección y estimación al momento; validación, envío simulado, folio y reinicio; enlaces a cotizar) y una ajustada en `tests/despacho.test.jsx`.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px; recorre también `/despacho/precios` y la cotización completa desde el recibo, con axe y sin desbordamiento.
- Detector de impeccable en Precios: solo la etiqueta superior de la llamada comercial y la marca de agua fija, compartidas (V4.8).
