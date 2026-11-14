# Estado de V4.4.4 · Brío, Planes y alta

14 de noviembre de 2026. Base: V4.4.3 en la rama `claude/great-edison-k9xun2`.

## Construido

- **Página `/gimnasio/planes`.** El comparador se extrajo a un componente propio (`TablaPlanes`), compartido con Inicio: tabla en pantallas anchas, una tarjeta por plan en el teléfono, y un botón «Elegir» por plan que abre el alta con ese plan marcado. También tiene una sección para apartar la clase de prueba gratis y cinco preguntas frecuentes (inscripción, cancelación, cambio de plan, congelar, sucursal base). El menú «Planes» lleva aquí.
- **Alta simulada `/gimnasio/alta` en cinco pasos.** Una barra indica el paso actual («Paso 2 de 5»), y se puede volver atrás sin perder lo escrito.
  1. Plan y sucursal base.
  2. Cuenta: nombre, correo y teléfono de 10 dígitos, validados; el foco va al primer error.
  3. Salud: explica con palabras propias qué pregunta un cuestionario de preparación física y por qué la ley pide consentimiento expreso. **No pide ningún dato** (decisión de Ian del 14/11).
  4. Reglamento: casilla de aceptación y firma escribiendo el nombre; se compara sin mayúsculas ni tildes.
  5. Pago: en recepción o «cargo mensual a tarjeta» simulado, que no pide ningún número. Desglose con inscripción $0, total con IVA, fecha de renovación, aviso cinco días antes y cancelación en un paso.

  Después viene el procesamiento y el resultado, con un número `BRIO-######` y las opciones «Reservar mi primera clase» y «Volver al inicio». Los datos del alta solo viven mientras la página está abierta.
- **Clase de prueba gratis.** «Elegir mi clase de prueba» abre Clases en modo prueba. La reserva se marca como prueba, el panel lo dice, y «Mis reservas» la etiqueta. Si ya hay una, el modo lo indica: es una por persona.
- **Video de Fuerza.** Es un tramo limpio de 1.7 s del video «Half rack resistance exercise workout» (FitnessScape, CC BY 3.0, Wikimedia Commons), recortado para dejar fuera los letreros, en blanco y negro, en bucle de ida y vuelta: 3.4 s y 77 kB. Créditos con autor, licencia y cambios. La foto anterior de Fuerza se retiró porque ya no se usaba.

## Sigue pendiente

Videos de Combate, Ciclo, Movilidad y Ritmo: el reintento lento en Wikimedia Commons sigue recibiendo error 429. Área de socio (V4.4.5), coaches y tienda (V4.4.6) y cierre (V4.4.7).

## Qué revisar en la vista previa

1. «Planes» en el menú: tabla en PC, tarjetas en el teléfono; «Elegir Club» abre el alta con Club marcado.
2. Recorrer el alta dejando campos vacíos y una firma distinta para ver los mensajes; terminar el alta.
3. «Elegir mi clase de prueba»: reservar y ver la etiqueta en «Mis reservas»; volver a intentarlo muestra que ya hay una.
4. En Inicio, la tarjeta de Fuerza en video; «Pausar videos» la detiene.
