# Validación de V4.4.5

Entorno: Node 22, Chromium de Playwright, compilación de producción con `vite preview`. 15 de noviembre de 2026. El visto bueno de Ian sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. El código de Brío pasa a 82.6 kB de JavaScript (24.5 kB comprimido) y 31.7 kB de CSS (7.3 kB comprimido).
- **151 pruebas en 21 archivos.** Nuevas, en `tests/gimnasio-socio.test.jsx`:
  - fecha de renovación, congelar por meses completos, reactivar y borrar;
  - invitados contados por mes y datos guardados dañados;
  - entrada rechazada con otros datos, entrada con el perfil, aviso de renovación y salir;
  - entrada simulada, reloj conectado y pases de invitado hasta el límite de Club;
  - congelar, reactivar, cancelar y que se recuerde al volver;
  - borrar todo desde el aviso de privacidad.

  La prueba de Inicio que esperaba el aviso «siguiente entrega» ahora comprueba los enlaces al área de socio.
- Recorrido en Chromium a 1440 px y en un iPhone 13 emulado: error de entrada, entrada, «Mi perfil» en la cabecera, entrada simulada, reloj, pase de invitado, congelar, reactivar, cancelar, recarga y borrado. Sin desbordamiento ni errores de consola.
- Foco: tras conectar el reloj queda en «Tu reloj» y tras congelar en «Tu membresía».
- Videos: en Inicio los tres clips cargan y avanzan con su póster; «Pausar videos» los detiene; con movimiento reducido no hay video.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA), en los dos temas a 1440 y 390 px:
  - entrada, entrada con error, panel, diálogo del reloj, pase de invitado con error, congelar, membresía congelada, confirmación de cancelación, aviso de privacidad y Créditos;
  - Inicio y Clases otra vez.

  **Sin infracciones.**

## Tras la revisión de Ian

- 152 pruebas en 21 archivos. Nueva: la tarjeta es un enlace, no hay botón de reserva ni «Pausar videos», el primer toque la activa y el segundo abre Clases.
- En Chromium a 1440 px: en reposo las tres tarjetas en blanco y negro y sin video descargado; al pasar el ratón por Fuerza, color y video corriendo; al salir, pausa y blanco y negro; con Tab y foco en Combate, color y video; Enter abre Clases.
- En un iPhone 13 emulado: el primer toque activa Combate sin salir de Inicio; tocar Ciclo apaga Combate y enciende Ciclo; el segundo toque abre Clases. Sin errores de consola.
- Con movimiento reducido: color al pasar el ratón, sin video.
- axe-core sin infracciones en Inicio, Clases, área de socio y Créditos, en los dos temas.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals.
