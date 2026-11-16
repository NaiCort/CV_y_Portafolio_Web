# Validación de V4.5.4

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El taller pesa 87.4 kB de JavaScript (26.7 kB comprimido) y 30.3 kB de CSS (6.7 kB comprimido).
- **226 pruebas en 28 archivos.** Ocho nuevas en `tests/taller-precios.test.jsx`: la lista completa contiene los precios de la portada y no repite nombres; la suma marca, desmarca y se limpia, y lo que no tiene costo no se suma; cada taller muestra su lista y formas de pago; la portada enlaza a la lista; el reporte de ejemplo cubre los cinco grupos y suma $7,600; la página de usados en Rosales (precio, enlace a la cita, grupos y reporte desplegable); en Vértice ofrece cambiar a Rosales; la cita llega con la revisión de usados elegida.
- `npm run test:browser:taller`: **5 de 5 aprobados** de 320 a 1440 px, dos corridas seguidas. Ahora recorre `/taller/precios` y `/taller/usados` en los dos talleres, la suma, el reporte desplegable, el paso a la cita y, en pantallas anchas, el menú hacia una sección y hacia una página (marcada como actual), con axe y sin desbordamiento.
- Detector de impeccable: se corrigió una palabra sola al final de las listas. Quedan la etiqueta superior de la llamada comercial y la marca de agua fija, compartidas y anotadas para V4.8.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals medidos; se harán al cerrar V4.5.
