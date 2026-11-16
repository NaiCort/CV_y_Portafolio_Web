# Validación de V4.5.6 · cierre de Taller mecánico

Entorno: Node 22, Chromium de Playwright; servidor de desarrollo de Vite y compilación de producción servida con `vite preview`. Revisión del 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El taller pesa 109.9 kB de JavaScript (32.7 kB comprimido) y 35.4 kB de CSS (7.6 kB comprimido); el motor del mapa va aparte y se pide al acercarse a la sección.
- **237 pruebas en 29 archivos**, dos nuevas: el aviso de privacidad (no borrar, borrar todo, aviso y regreso a Rosales) y el enlace de la Bienvenida.
- `npm run test:browser:taller`: **5 de 5 aprobados** de 320 a 1440 px, dos corridas en el servidor de desarrollo y una sobre la compilación de producción. Recorren las nueve páginas en los dos talleres con axe (WCAG 2 A/AA, 2.1 AA y 2.2 AA) y sin desbordamiento, más la cita completa, el presupuesto con hallazgo, la suma de precios, el reporte de usados, Mi garaje, la calculadora de deducible, el menú del teléfono, el mapa y el aviso de privacidad con borrado.
- **Detector de impeccable en las nueve páginas y los dos talleres:** se corrigió un h2 faltante en la consulta sin orden. Quedan solo hallazgos de componentes compartidos ya anotados para V4.8: la etiqueta superior de la llamada comercial y la marca de agua fija que tapa texto al desplazarse.
- **Conteo de patrones vigilados:** fondo oscuro en todo Vértice y monoespaciada solo en datos de la orden, permitidos con motivo en la ficha; los seis testigos son botones de tablero con dibujo y texto propios. Sin degradados, brillos, etiquetas sobre títulos propias, numeración decorativa ni emojis.
- **Core Web Vitals de laboratorio** (390 px, CPU 4× más lenta, 4G lenta: 150 ms de latencia y 1.6 Mb/s), compilación de producción:

| Página | Taller | LCP | CLS |
|---|---|---|---|
| Inicio | Rosales | 2.85 s (3.87 s antes de aligerar la foto) | 0.051 |
| Inicio | Vértice | 2.94 s | 0.002 |
| Agendar cita | Rosales | 2.07 s | 0.021 |
| Consulta tu auto | Rosales | 1.96 s | 0.024 |
| Precios | Rosales | 2.01 s | 0.006 |
| Revisión de usados | Rosales | 2.08 s | 0.004 |
| Hojalatería | Vértice | 1.97 s | 0.021 |
| Híbridos | Vértice | 1.90 s | 0.002 |
| Mi garaje | Vértice | 1.84 s | 0.002 |

  El LCP de Inicio es la foto de portada, que se descubre cuando carga la aplicación; en estas condiciones queda arriba de 2.5 s. La precarga de fuentes y del primer recurso de cada demo ya está anotada para V4.8.

## No comprobado

Teléfono físico, Safari y lector de pantalla: quedan a la revisión de Ian en la vista previa.
