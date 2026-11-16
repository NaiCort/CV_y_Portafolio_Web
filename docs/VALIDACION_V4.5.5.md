# Validación de V4.5.5

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El taller pesa 106.8 kB de JavaScript (31.9 kB comprimido) y 34.4 kB de CSS (7.4 kB comprimido).
- **235 pruebas en 29 archivos.** Nueve nuevas en `tests/taller-vertice.test.jsx`: seguro o pago directo según el deducible; un bloque de batería bajo el mínimo; perfil de ejemplo y validación del kilometraje; garaje guardado dañado; calculadora de hojalatería (incluido el campo vacío) y su enlace a la cita; página de híbridos; cambio de taller desde Rosales; Mi garaje completo (contraseña equivocada, entrada, orden abierta, cita en el historial, kilometraje inválido y válido, «Ya toca servicio», segundo auto, recordatorio y salida); menú del teléfono.
- `npm run test:browser:taller`: **5 de 5 aprobados** de 320 a 1440 px, dos corridas seguidas. Ahora recorre las tres páginas en los dos talleres, Mi garaje con kilometraje, la calculadora y, por debajo de 900 px, el menú del teléfono, con axe y sin desbordamiento.
- Durante la revisión se corrigieron: un desbordamiento horizontal causado por una regla de leyendas que agrandaba los textos ocultos de la orden, el teléfono partido en tres líneas a 320 px y una prueba de altura que medía antes de cargar las fuentes tras recargar (el salto por cambio de tipografía ya está anotado para V4.8).
- Detector de impeccable: se añadió un h2 a las páginas de un solo taller abiertas desde el otro. Queda la etiqueta superior de la llamada comercial compartida (V4.8).

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals medidos; se harán al cerrar V4.5.
