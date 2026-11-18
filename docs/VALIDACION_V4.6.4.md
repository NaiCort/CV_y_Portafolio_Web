# Validación de V4.6.4

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 18 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 65.7 kB de JavaScript (18.7 kB comprimido) y 20.8 kB de CSS (4.8 kB comprimido).
- **274 pruebas en 34 archivos**, seis nuevas en `tests/despacho-servicios.test.jsx`: datos de cada servicio (sin pedir la e.firma); página con índice y enlaces a cotizar; portada enlazada al detalle; regularización con la corrección del art. 73, la multa y el cálculo con tope de 60 meses; cotización con atrasadas marcada; aviso de privacidad (sin INAI) con «No borrar» y borrado.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px; recorre las dos páginas nuevas, la regularización hasta la cotización, el aviso de privacidad con borrado y el índice de servicios, con axe y sin desbordamiento.
- Detector de impeccable: se corrigió una palabra sola al final de las definiciones. Quedan hallazgos de componentes compartidos (V4.8).
- Se cambió un borde de color en un lado (patrón vigilado) por un punto de semáforo en la comparación de la regularización.
