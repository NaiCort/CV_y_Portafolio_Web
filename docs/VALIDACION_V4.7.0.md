# Validación de V4.7.0 · Revista digital, base

Entorno: Node 22, Chromium de Playwright; compilación de producción servida con `vite preview`. 19 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. La revista pesa 53.5 kB de JavaScript (17.3 kB comprimido) y 31.7 kB de CSS (7.4 kB comprimido).
- **303 pruebas en 36 archivos**; 16 nuevas en `tests/revista.test.jsx`: datos de los dos sitios (24 números y 24 investigaciones, fotos presentes y con huella), marcadores y comentarios guardados, entrada y Bienvenida, portada del número actual, menú de números y cambio de paleta, número de archivo, marcadores de Rubor, comentario con espera, panel de Prisma, guardar, aviso del PDF, populares, búsqueda con Ctrl K, perfil y ficha.
- `npm run test:browser:revista`: **5 de 5 aprobados** de 320 a 1440 px, con axe (WCAG 2.2 AA) y sin desbordamiento en nueve páginas y los flujos. Axe encontró contrastes que se corrigieron: el botón principal de Rubor (una regla de enlaces lo sobrescribía), el botón del número ciruela (texto oscuro), etiquetas de área y avatares de Prisma (colores más oscuros), cajas translúcidas sobre la imagen del número (más opacas) y el botón de la llamada comercial.
- **Detector de impeccable:** se corrigieron texto de 11 px, palabras sueltas al final de párrafo, renglones largos y un titular tapado por el código de barras, y se agregó un velo para leer el texto sobre las portadas de archivo. Quedan, a propósito: la cursiva serif en títulos de Rubor y los resplandores y brillos de Prisma (pedidos por Ian con sus referencias; máximo dos por pantalla) y el h1 enorme de la cabecera, que es la portada misma.
- **Core Web Vitals de laboratorio** (390 px, CPU 4× más lenta, 4G lenta): Rubor N.º 24 LCP 2.28 s, N.º 23 2.24 s, Prisma 2.64 s, entrada 2.49 s; CLS de 0.001 a 0.017. El elemento más grande es la foto de portada; se recomprimió y se agregó un tamaño intermedio (antes 3.65 s en el N.º 23).

## No comprobado

- Autor de las fotos de Unsplash: el sitio bloquea consultas automáticas desde este entorno; la licencia no exige atribución.
- Teléfono físico, Safari y lector de pantalla: quedan a la revisión de Ian.
