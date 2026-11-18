# Validación de V4.6.8 · Despacho contable, toda la demo en libro mayor

Entorno: Node 22, Chromium de Playwright; compilación de producción servida con `vite preview`. Revisión del 18 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 89.6 kB de JavaScript (26.0 kB comprimido) y 35.7 kB de CSS (7.7 kB comprimido). Fotos nuevas, todas con carga diferida: lista 16 o 36 kB, calle 25 o 111 kB y Cofre 25 o 74 kB (640/800 o 1280/1600 px).
- **287 pruebas en 35 archivos**; nuevas: cada página interior con un solo h1, título con parte gris y ruta al inicio; crédito de la foto del recordatorio; los créditos enlazan todas las fotos.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px sobre la compilación de producción, con axe (WCAG 2.2 AA) y sin desbordamiento en las diez páginas y todos los flujos. Axe encontró un contraste de 4.16:1 en el ámbar de las fechas límite, que ahora va sobre el fondo y no sobre blanco; se oscureció a `#8A5F05` (5.0:1).
- **Detector de impeccable** en las diez páginas: sin hallazgos propios. Se corrigieron los que dio en la primera pasada: renglones con degradado repetido (ahora SVG en mosaico), un título de 41 caracteres en Diagnóstico y enlaces del índice con fondo de píldora. Quedan los de componentes compartidos anotados para V4.8.
- **Patrones vigilados:** tarjetas dentro de tarjetas eliminadas (el semáforo del expediente ya no son recuadros); sin etiquetas sobre títulos, degradados visibles ni numeración decorativa (los días del mes son fechas reales).
- **Core Web Vitals de laboratorio** (390 px, CPU 4× más lenta, 4G lenta), en las diez páginas: LCP de 1.72 a 2.02 s y CLS de 0.000 a 0.040. Antes de las tipografías de respaldo, Precios daba 0.155, Calculadoras 0.142 y Diagnóstico 0.241 (el título cambiaba de dos a tres renglones al llegar Literata); la parte gris del título va ahora en su propio renglón.

## No comprobado

- Las tipografías de respaldo se midieron contra Liberation Serif y DejaVu Serif, que son las que hay en el entorno; en Georgia o Noto Serif reales el ajuste puede variar un poco.
- Teléfono físico, Safari y lector de pantalla: quedan a la revisión de Ian.
