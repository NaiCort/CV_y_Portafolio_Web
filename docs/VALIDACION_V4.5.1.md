# Validación de V4.5.1

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite con red a OpenFreeMap. Revisión del 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El taller pesa 37.7 kB de JavaScript (12.5 kB comprimido) y 18.2 kB de CSS (4.6 kB comprimido); el motor del mapa va en un archivo aparte que se pide solo al acercarse a la sección.
- **197 pruebas en 25 archivos** (cuatro nuevas): ubicaciones dentro de Xalapa, con referencia de OpenStreetMap y horario de siete días, y el local de Rosales a más de 2 km de cualquier sucursal de Vértice; «abierto ahora» y «abre mañana o el lunes»; horario agrupado por días; cada tema muestra solo sus locales y la lista de Vértice abre una sucursal a la vez y agenda en ella.
- `npm run test:browser:taller`: **5 de 5 aprobados**, tres corridas seguidas. Se añadió: en Rosales, un solo punto en el mapa y la ficha con la colonia; en Vértice, cuatro puntos, y tocar «Arco Sur» en el mapa abre su ficha en la lista, con axe y sin desbordamiento. Las pruebas esperan a que termine la transición de color al cambiar de taller.
- Durante la revisión se corrigió un nombre de clase de las marcas del mapa que coincidía con el del logotipo de la cabecera.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals medidos; se harán al cerrar V4.5.
