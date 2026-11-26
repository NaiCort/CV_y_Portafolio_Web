# Ficha de identidad · Cotizador (V4.9)

25 de noviembre de 2026. El cotizador es parte del CV y portafolio, así que **hereda la dirección «Brasa»** (`FICHA_CV.md`): paleta, tipografías, radios, botones transparentes y movimiento. Esta ficha solo dice lo que cambia o se añade. Investigación en `INVESTIGACION_COTIZADOR.md`.

## Elección de Ian

De tres maquetas («Mostrador», «Recibo» y «Tres columnas»), Ian eligió **«Tres columnas»** con el resumen funcionando **como en «Recibo»**:
- una línea por función;
- la que se quita queda tachada;
- folio arriba y total abajo.

Todo con el mismo diseño oscuro de «Tres columnas», no como papel.

## Estructura

- **Escritorio (900 px o más):** tres columnas con desplazamiento propio, como el CV.
  - **Izquierda:**
    - flujo «Elige tipo → Ajusta → Envía»;
    - las cuatro categorías como tarjetas apiladas (nombre, para quién, «desde» y «completo»);
    - índice de grupos con la línea que crece.
  - **Centro:**
    - título;
    - versiones esencial, recomendada y completa, si se llega desde una demo;
    - aviso con «Deshacer»;
    - funciones por grupo;
    - en el último paso, los datos de contacto y el envío.
  - **Derecha, la nota:**
    - folio y moneda;
    - una línea por función con su precio (tachada si se acaba de quitar);
    - ficha y pasada de calidad, mínimo del proyecto, lanzamiento, urgencia e IVA;
    - total, plazo, mensualidad aparte y botón para continuar.
- **Celular:**
  - una sola columna;
  - las categorías en carrusel horizontal;
  - la nota se abre desde una barra fija abajo con el total, el plazo y «Ver detalle».

## Piezas propias

- **Casilla de función:**
  - caja de 18 px con radio de 5 px;
  - marcada, en brasa con el borde interior del fondo;
  - de núcleo, en arena apagada y deshabilitada, con la razón en texto («Incluido siempre en una landing»).
- **Precio de la función:** a la derecha, en cifras tabulares:
  - «+1,600» si se puede añadir o quitar;
  - el importe con «incluido» debajo si es de núcleo;
  - «se cotiza en la propuesta» si no tiene número.
- **Nota:**
  - renglones con filete punteado del tono `--filete`;
  - el total en Bricolage de 30 px;
  - la línea quitada se tacha y se apaga hasta el siguiente cambio.
- **Aviso con «Deshacer»:** borde de brasa al 33 %, región `status`. «Deshacer» es un botón real.

## Movimiento

Lo de «Brasa», más:
- el total cambia con un conteo corto (250 ms, de salida suave);
- la línea nueva de la nota entra con un fundido.

Con movimiento reducido, todo cambia sin animación. Las animaciones propias del cotizador se deciden en su fase final (V4.11).

## Decidido para V4.11

- **Desplegable en cada opción de «Ajuste»** (DEC-032), en lenguaje sencillo y siempre con el mismo orden:
  1. qué es;
  2. qué gana su negocio;
  3. un ejemplo en una demo, con enlace;
  4. qué no incluye;
  5. «¿lo necesito?».

  El precio queda a la vista sin abrirlo. Antes de construir, una maqueta con dos o tres desplegables escritos para que Ian apruebe el tono.
- **Hospedaje** (DEC-029): una pregunta con las opciones (Vercel, Cloudflare Pages u hospedaje tradicional), explicadas por lo que le importa al cliente: costo, velocidad, correo y quién lo administra. Los precios se confirman antes de ponerlos.
- **Dominio** (DEC-030): siempre a nombre del cliente.
- **Plan de mantenimiento web y correo con dominio propio** (DEC-031): opciones aparte; el correo, solo si el negocio lo necesita.

## Patrones vigilados

Ninguno nuevo. El reflector del CV no se usa aquí: en una herramienta de trabajo, la luz siguiendo al cursor distrae.

## Prohibido aquí

- Tabla de precios de plantilla con «Más popular».
- Numeración grande de pasos.
- Precios ocultos hasta el final.
- Retirar funciones en silencio.
- Mostrar en México un total sin IVA.
