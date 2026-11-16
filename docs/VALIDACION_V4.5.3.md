# Validación de V4.5.3

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El taller pesa 74.3 kB de JavaScript (22.8 kB comprimido) y 26.9 kB de CSS (6.2 kB comprimido).
- **218 pruebas en 27 archivos.** Once nuevas en `tests/taller-consulta.test.jsx`: refacción más mano de obra igual al precio en cada partida y hallazgo; solo diagnóstico si no se autoriza nada; total con IVA incluido y diagnóstico descontado; aumento del hallazgo; transiciones permitidas (sin firma, sin decidir o con una decisión inválida no avanza); piezas devueltas y recicladas; garantía de 90 días y seis meses; orden guardada por taller y descarte de la dañada; dirección sin orden válida; recorrido completo en Rosales con hallazgo y reinicio; Vértice sin autorizar nada; la orden de un taller no abre en el otro. En `tests/taller.test.jsx`, la consulta de la portada ahora lleva a la orden.
- `npm run test:browser:taller`: **5 de 5 aprobados** de 320 a 1440 px, dos corridas seguidas. Ahora recorre `/taller/consulta` en los dos talleres y, desde la portada, el visto bueno con el error de partidas sin decidir, la reparación con hallazgo, la entrega con total de $1,630 y el reinicio, con axe y sin desbordamiento. Las auditorías esperan a que terminen los fundidos, que daban un falso contraste bajo a mitad de la animación.
- Detector de impeccable en la orden: la etiqueta superior de la llamada comercial y la marca de agua fija sobre el texto, ambas compartidas y anotadas para V4.8.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals medidos; se harán al cerrar V4.5.
