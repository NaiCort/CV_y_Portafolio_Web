# Validación de V4.7.12

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

- Antes del cambio, `npm run test:browser:revista` fallaba en `main` (V4.7.11) por contraste: cita del interior de «Entre líneas» a 1.3:1 y su pie de foto a 2:1.
- Después: **5 de 5 escenarios aprobados** de 320 a 1440 px, con axe (WCAG 2.2 AA).
- ESLint, Prettier, pruebas unitarias y compilación: ver el resultado del commit.

## No comprobado

- Teléfono físico y Safari.
