# Validación de V4.7.15

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores; **321 pruebas unitarias** aprobadas (la de créditos ahora cuenta las 4 tipografías de Umbral, que son las suyas).
- `npm run test:browser:revista`: **5 de 5 escenarios aprobados** (320, 390, 768, 1024 y 1440 px). El recorrido sumó 10 páginas: cuenta, secciones, detrás de cámaras y créditos de Rubor; publicar, mis envíos, áreas, sostenimiento y créditos de Prisma. Incluye axe (WCAG 2.2 AA), límites horizontales, suscripción y cancelación en Rubor, y el envío completo en Prisma (publicar, revisión, preimpresión, áreas y borrado).
- Axe encontró y se corrigió: etiqueta sobre rojo en Secciones, conteo de la casilla elegida en la tabla de áreas, y la navegación de Prisma, que una regla nueva mostraba en celular encima del buscador.
- Capturas revisadas a 1440 y 390 px de las páginas nuevas; en celular se reacomodó el cupón (precio debajo del plan).

## No comprobado

- Teléfono físico, Safari y Firefox.
