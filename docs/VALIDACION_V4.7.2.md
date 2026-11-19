# Validación de V4.7.2 · Prisma, lectura completa y PDF

Entorno: Node 22, Chromium de Playwright; compilación de producción servida con `vite preview`. 19 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores.
- **306 pruebas en 36 archivos**; dos nuevas y una cambiada: lectura completa del N.º 24 (cada entrada del índice lleva a su sección, dos figuras con su tabla de datos, cita APA con tres autores, texto grande, iniciales de los comentarios), número de archivo sin hoja y con aviso del PDF, y el enlace del PDF existe y descarga.
- `npm run test:browser:revista`: **5 de 5 aprobados** de 320 a 1440 px con axe (WCAG 2.2 AA), ahora en once páginas (se sumaron las fichas del N.º 23 y de un número de archivo). Axe pidió que la tabla con desplazamiento horizontal se pudiera enfocar con teclado: corregido.
- **Detector de textos encimados** en 12 páginas y 11 tamaños: 0 casos (encontró el nombre largo de un comentario encimado con «hace 5 horas» en celular; corregido). Marca de agua: 0 choques.
- **PDF:** revisados visualmente los dos archivos (5 páginas carta cada uno, unos 360 kB): hoja clara, figuras sin cortarse entre páginas y pie con número de página.

## No comprobado

- Descarga del PDF en teléfono físico y Safari: queda a la revisión de Ian.
