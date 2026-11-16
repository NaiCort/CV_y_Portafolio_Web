# Validación de V4.5.2

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El taller pesa 59.4 kB de JavaScript (18.6 kB comprimido) y 23.7 kB de CSS (5.6 kB comprimido).
- **207 pruebas en 26 archivos.** Diez nuevas en `tests/taller-cita.test.jsx`, con la fecha fija en un martes a las 10:00: servicios agendables y especialidades por sucursal; testigo convertido en servicio y aviso de no manejar; horas con dos de anticipación, sin domingos cerrados en Rosales y con domingo en Lázaro Cárdenas; teléfono y citas guardadas dañadas; texto del lugar y archivo de calendario con líneas de 75 bytes; cita completa en Rosales a domicilio (errores de marca, año, colonia fuera de alcance y teléfono; procesamiento; folio; guardado); cita en Vértice de híbridos con recolección; sucursal pedida por la dirección y citas separadas por taller; cancelación con confirmación. En `tests/taller.test.jsx` se ajustaron los enlaces a la cita y se añadió que WhatsApp sigue simulado.
- `npm run test:browser:taller`: **5 de 5 aprobados** de 320 a 1440 px. Ahora recorre también `/taller/cita` en los dos talleres y una cita completa desde el testigo de temperatura (mecánico a domicilio elegido, día y hora libres, confirmación, descarga del .ics y regreso al inicio), con axe y sin desbordamiento en cada paso.
- Detector de impeccable en `/taller/cita`: solo la etiqueta superior de la llamada comercial compartida, ya anotada para V4.8.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals medidos; se harán al cerrar V4.5.
