# Ficha de identidad · Patio 12 (Restaurante), a posteriori (V4.10.6)

Patio 12 se construyó entre V4.2 y V4.2.5 (octubre de 2026), antes de la Guía de identidad y calidad visual v1.1. Esta ficha hace dos cosas:
- describe la identidad que ya tiene;
- fija lo que cambia en su entrega de V4.10 (V4.10.6): pendientes 4 y 5 de `CLAUDE.md` y la lista fija de `PLAN_V4.8.md`.

## Concepto

**Cocina de barrio.** Una cadena ficticia de restaurantes con 16 locales simulados en México y Estados Unidos, todos sobre un parque o una plaza de referencia. Su lema es «Buen comer. Sin prisa.».

Se siente como el pizarrón de una fonda bien cuidada:
- amarillo de toldo;
- verde de pizarrón;
- papel crema;
- títulos gruesos con serifa cuadrada;
- un sello con el número 12.

## Paleta

Desde V4.10.6, cada color de la paleta es una variable en `:root` (`restaurante.css`). Van en `:root` porque los diálogos se abren fuera de `.restaurant-root`; el prefijo `--r-` es solo de esta demo.

| Papel | Variable | Valor | Uso |
| --- | --- | --- | --- |
| Dominante | `--r-amarillo` | `#edd068` | Barra de navegación y portada. Es superficie, no texto |
| Dominante claro | `--r-amarillo-claro` | `#fff4d1` | Avisos de espera |
| Tinta | `--r-tinta` | `#203b2e` | Texto, botones principales, franja verde y la llamada comercial |
| Tinta media | `--r-tinta-media` | `#315342` | Avisos de éxito y estados activos |
| Texto secundario | `--r-suave` | `#526155` | Párrafos de apoyo y etiquetas |
| Texto terciario | `--r-tenue` | `#85948a` | Notas pequeñas y conteos |
| Fondo | `--r-papel` | `#ffffff` | Base de la página y de las tarjetas |
| Fondo crema | `--r-crema` | `#fcfaf4` | Fondo de las páginas |
| Fondo arena | `--r-arena` | `#f4f3eb` | Franja del local y bloques de apoyo |
| Fondo salvia | `--r-salvia` | `#edf2ec` | Bloques destacados (Conócenos, plan de hoy) |
| Líneas | `--r-linea` | `#d1d8d2` | Filetes de 1 px |
| Líneas medias | `--r-linea-media` | `#c5cec6` | Separadores de listas |
| Líneas fuertes | `--r-linea-fuerte` | `#a7b6a9` | Bordes de campos y tarjetas |
| Acento | `--r-oxido` | `#9c3b26` | Solo en piezas chicas de atención (números de los locales en la lista, el destino en el mapa, errores) |
| Foco | `--r-foco` | `#1260bc` | Solo el anillo de foco del teclado |

**Regla del acento:** el amarillo es la marca y nunca va como texto sobre blanco; el óxido no se usa en superficies grandes ni en títulos.

**Lo que queda escrito en su regla:**
- los colores de una sola vez: el fondo de cada tarjeta de local, el recibo y los trazos del mapa;
- el contador flotante, con sus colores en `timer.css`, porque también se abre en una ventana aparte.

El cambio a variables se comprobó con 18 capturas (9 escenas a 390 y 1280 px, con diálogos): todas idénticas, píxel por píxel.

## Tipografía

- **Bitter** («Patio Bitter»), 600, para títulos:
  - interlineado de 1.15;
  - letras muy juntas en los grandes (−0.045 em);
  - los títulos grandes van en dos líneas, con punto final («Buen comer. / Sin prisa.»).
- **DM Sans** («Patio Sans»), 400 a 700, para texto e interfaz.
- Las dos se sirven desde `public/restaurante/` con licencia OFL.
- Desde V4.10.6 tienen **respaldo medido** (`size-adjust`), como Psicólogo y Cotejo, para que el texto no salte al llegar la fuente (pendiente 7).
- Precios con cifras tabulares.

## Fotografía

- Fotos de Unsplash servidas desde el sitio, con su registro (`fotos-origen-v4.2.*.json` y `RECURSOS_RESTAURANTE.md`).
- En la carta, en marco cuadrado con `object-fit: contain`, sin recortar el plato.
- Desde V4.10.6, las fotos pesadas tienen varios tamaños (`srcset`), y la principal de cada página no se funde al cargar.

## Forma, sombras y densidad

- Radios de 4 px (`--r-radio`) y 3 px (`--r-radio-chico`) en botones, tarjetas y campos; círculos solo en el sello y los contadores.
- Casi sin sombras: filetes de 1 px. Solo flotan el contador y los avisos.
- Densidad cómoda: títulos grandes, mucho aire alrededor y la carta en dos columnas en escritorio.

## Movimiento (V4.10.6)

**Motivo: servir la mesa.** Las cosas se asientan, como un plato puesto en la mesa; no suben desde abajo ni saltan. Todo con ease-out, de 200 a 300 ms y desde escala 0.95.
- **Portada:**
  - el sello «12» se estampa (gira un poco y baja a su tamaño);
  - la foto se asienta sin cambiar de opacidad;
  - botones y datos de la portada entran escalonados.

  El título y el párrafo de entrada están quietos desde el primer cuadro (ver `RENDIMIENTO.md`, lecciones de V4.10.5).
- **Secciones** que entran a la pantalla: fundido desde escala 0.95, una sola vez. Solo esperan las que empiezan fuera de la pantalla, así nada parpadea al cargar. Sustituye a la subida de los destacados y de las páginas, que dejan de moverse al cambiar de página.
- **Platos destacados y tarjetas de la carta:** al pasar el cursor, la foto se acerca un poco al plato (escala 1.03). Solo con ratón: en el teléfono, el toque la dejaría acercada.
- **«Agregar al pedido»:** el diálogo se cierra y el aviso de éxito, con su palomita, se asienta; el contador del pedido da un salto (V4.2.4).
- **Plegables** (nutrientes, recibos, QR): se abren con suavidad en Chrome y Edge 131 o posterior.
- **Botones:** ceden un poco al presionarlos.
- **Modo reducido:** solo fundidos o nada; el contador del pedido y los avisos cambian sin animación.

No hay animaciones continuas ni que arranquen solas (regla de V4.2.4).

## Anclas

1. La barra amarilla con el logotipo «patio 12 / cocina de barrio».
2. El sello «12» sobre la foto de la portada.
3. Los títulos de Bitter, apretados y con punto final.
4. La franja verde con frases cortas separadas por «✳».

## Patrones vigilados

Antes de V4.10.6 había hasta tres patrones vigilados en una misma pantalla. Lo que cambia:

| Patrón | Dónde estaba | V4.10.6 |
| --- | --- | --- |
| Etiqueta en mayúsculas sobre el título | Casi todas las páginas y secciones | Se quita en todas (pendiente 4 ampliado) |
| Numeración decorativa («patio 12 / 01») | Tarjetas de locales de Inicio | Se quita; la tarjeta dice país y estado |
| Tres tarjetas iguales con ícono arriba | «¿Cómo vienes hoy?» | Pasan a renglones de carta: ícono a la izquierda, nombre, descripción y flecha |
| Los mismos íconos de Lucide en cada tarjeta | Pin en cada tarjeta de local | Se quita el pin de la cabecera de la tarjeta |
| La misma aparición hacia arriba | Páginas y destacados | Entradas desde escala 0.95 |

**Permitido con motivo:** «✳» (no es ✨) como separador de frases, solo en la franja verde.

## Prohibido aquí

- Degradados, vidrio, brillos y manchas de luz.
- Etiquetas en mayúsculas sobre los títulos y numeración decorativa.
- Fundir al cargar el título o la foto principal.
- Fotos que cambian al quitar ingredientes: la foto no representa cada personalización.
- Precios sin «MXN» en el recibo o con cifras proporcionales.
- Aclaraciones repetidas (DEC-005): el aviso de demo, los datos de ejemplo y el aviso de privacidad bastan; no se repite «simulado» en cada renglón.

## Páginas

Inicio, La carta, Locales, ficha de cada local, Conócenos, Tu pedido y Seguimiento, más los diálogos de modalidad, local, personalización, reserva, perfil de ejemplo, WhatsApp de ejemplo y privacidad.
