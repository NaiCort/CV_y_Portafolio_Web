# Validación de V4.4.4

Entorno: Node 22, Chromium de Playwright, compilación de producción con `vite preview`. 14 de noviembre de 2026. El visto bueno de Ian sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. El código de Brío pasa a 60.3 kB de JavaScript (19.2 kB comprimido) y 28.4 kB de CSS (6.7 kB comprimido).
- **145 pruebas en 20 archivos.** Nuevas, en `tests/gimnasio-planes.test.jsx`:
  - Planes con dos botones por plan hacia el alta, preguntas y clase de prueba;
  - alta completa con plan de la dirección, tres errores y foco al primero, correo inválido, firma distinta y firma sin tildes válida, total, procesamiento y número;
  - nada del alta en `localStorage`;
  - volver atrás sin perder datos;
  - clase de prueba marcada y una sola por persona.
- Recorrido en Chromium a 1440 px y en un iPhone 13 emulado: Planes, alta completa con errores y clase de prueba, sin desbordamiento ni errores de consola.
- Video: en Inicio avanza solo, se detiene con «Pausar videos», y con movimiento reducido no hay video ni botón.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA), en los dos temas a 1440 y 390 px:
  - Planes; los cinco pasos del alta, con errores visibles; la confirmación; el modo prueba;
  - Clases, Inicio con mapa y Créditos.

  **Sin infracciones.** Se corrigió el contraste del texto introductorio de Planes en Distrito.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals.
