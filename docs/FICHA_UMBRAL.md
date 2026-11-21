# Ficha de identidad · Umbral (V4.7.14, desde cero)

Tercera publicación de `/revista`: fotografía, diseño y cultura visual. Decisiones de Ian del
21/11/2026: rehacer Umbral desde cero con las técnicas de sus cuatro referencias de carteles
(«Water», «Between the lines», «See beyond the noise» y «Create»); conservar los dos dossiers
(«Entre líneas» y «Otra perspectiva») y simular más números sin completarlos; fondo alternado
oscuro y claro; caligráfica permitida; llegar tan profundo como se pueda (hasta WebGL). Cada
sección es una o dos páginas de revista: nada suelto entre pliegos.

## Dirección: «Carteles»

Umbral se lee como una revista de carteles. Cada pliego es una lámina con proporción fija o a
sangre, armada por capas como en Photoshop: fondo, letras, persona recortada, luz y anotaciones.

- **Motor de capas.** Un cartel se describe con datos (capas de abajo hacia arriba) y un solo
  componente lo dibuja en un contenedor con `container-type: size`; el texto se mide en `cqw`,
  así que el cartel escala entero. Los mismos datos dan la vista «despiece» (capas separadas en
  3D) y la de proceso (capas que se encienden una a una).
- **Técnicas por cartel:**
  - *Entre líneas* (oscuro): letras como ventanas con la calle dentro (`background-clip: text`) y
    la persona recortada encima; 2.5D al mover el puntero o inclinar el teléfono (la calle se
    mueve más que la persona).
  - *Otra perspectiva* (papel): rebanadas diagonales con `clip-path`, que se deslizan al bajar
    (animaciones ligadas al scroll); palabra caligráfica que se escribe sola.
  - *Agua* (simulado, oscuro): palabra vertical (`writing-mode`) del color del papel que muerde la
    foto; reflejos de agua en WebGL (con respaldo SVG y quietud con movimiento reducido).
  - *Crear* (simulado, papel): tiras verticales de la misma foto, serif que pasa detrás de la
    persona y sombra de ventana.
- **Anotaciones** de cartel (textos pequeños espaciados, marcas de registro, código de barras):
  decorativas y con `aria-hidden`; el texto que importa es HTML real.

## Paleta

| Papel `#EFEBE3` | Tinta `#141414` | Noche `#0D0D0E` | Ámbar `#D9A35B` | Óxido `#8C3B22` |
|---|---|---|---|---|

Regla del acento: el ámbar solo marca palabras clave en anotaciones y la caligráfica sobre fondo
oscuro; el óxido es su equivalente sobre papel. Nunca en párrafos de lectura.

## Tipografía

- **Archivo** (variable, local): condensada y negra (`wdth` 62, 800–900) para las palabras de
  cartel; ancha (`wdth` 112–125) y espaciada para anotaciones y controles.
- **Bodoni Moda** (local): serif de alto contraste para «Crear» y títulos de lectura.
- **Newsreader** (local): párrafos de lectura.
- **Mrs Saint Delafield** (local, OFL): una sola palabra caligráfica por pliego como máximo.

## Movimiento

Ease-out de 200–300 ms; entradas desde escala 0.95; animaciones ligadas al scroll solo con
`transform` y opacidad; WebGL solo en pantalla y con soporte. Con movimiento reducido: todo
quieto (sin 2.5D, sin reflejos animados, sin deslizamientos).

## Patrones vigilados (excepciones documentadas)

Letras con imagen dentro, monoespaciada como adorno (no se usa: las anotaciones son Archivo
ancha), códigos de barras y caligráfica son parte del lenguaje de cartel: **una técnica
protagonista por pliego**. Prohibidos: tarjetas, cuadros con borde de color, íconos de Lucide,
avisos o créditos entre pliegos (van en el pie de foto o en el colofón).

## Fotografía

Pexels (licencia de Pexels: uso libre, sin atribución obligatoria; se acredita igual), servidas
desde `public/revista/umbral/`. Recortes con rembg (`u2net_human_seg`). Las personas no son el
creador ni personajes reales. Créditos en `/revista/umbral/creditos`.
