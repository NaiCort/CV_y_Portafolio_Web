# Validación de V4.4.3

Entorno: Node 22, Chromium de Playwright, compilación de producción con `vite preview`. 14 de noviembre de 2026. El visto bueno de Ian sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. El código de Brío pasa a 47.3 kB de JavaScript (15.4 kB comprimido) y 24.8 kB de CSS (6 kB comprimido).
- **141 pruebas en 19 archivos.** Nuevas, en `tests/gimnasio-clases.test.jsx`:
  - lugares ocupados estables y en el número correcto;
  - una sola reserva por sesión;
  - lista de espera de la posición 2 a confirmada, con lugar asignado;
  - regla de cancelación libre, tardía y pasada;
  - calorías con MET y minutos por zona que suman la duración en las cinco disciplinas;
  - filtro por disciplina;
  - reserva completa con validación, procesamiento, código, guardado y resumen;
  - apertura directa desde Inicio.

  La prueba de las zonas encontró un error de redondeo (46 minutos en una clase de 45) que se corrigió repartiendo por residuo mayor.
- Recorrido completo en Chromium a 1440 px y en un iPhone 13 emulado:
  - aviso al reservar sin lugar;
  - reserva con lugar y nombre;
  - lista de espera hasta «Se liberó un lugar», con aviso;
  - resumen (50 min, 175 kcal estimadas en Movilidad);
  - calificación y cancelación.

  Sin desbordamiento ni errores de consola.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA), en los dos temas a 1440 y 390 px: Clases, el panel con error, la confirmación y el resumen; también Inicio con mapa y Créditos. **Sin infracciones.** Se corrigieron:
  - el contraste de las clases ya empezadas, que usaban opacidad;
  - la nota del resumen en Distrito;
  - el botón «Reservar» de las tarjetas de Inicio, que quedaba blanco sobre blanco;
  - el borde del campo de nombre, para 3:1.

## No comprobado todavía

Videos (pendientes de fuente), teléfono físico, Safari, lector de pantalla y Core Web Vitals.
