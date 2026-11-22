# Ficha de identidad · CV web y portafolio (v1)

Ficha de la **v1 del CV y portafolio web**: al terminarla, solo se actualiza el contenido.
- **V4.8.1 (21/11/2026):** primera dirección, «Neblina y Esquema».
- **V4.8.4 (22/11/2026):** Ian la cambió por **«Brasa»**. Tomó como referencia principal el sitio de Brittany Chiang (estructura y comportamiento) y pidió que se conservaran las tres columnas, una paleta acorde a su foto, menos aspecto «cuadrado» y botones transparentes con contorno solo al pasar el cursor.

## Idea

Un CV oscuro y cálido que sale de la foto de Ian: el carbón de su playera como fondo, la arena de la piel como texto y el naranja del fondo de la foto como brasa. Debe leerse con calma y responder a la mano: las tarjetas se iluminan bajo el cursor, las demás se atenúan y un reflector tenue sigue al puntero.

## Paleta

| Papel | Color | Uso |
| --- | --- | --- |
| Fondo: carbón | `#15110F` | Toda la página; las columnas se separan con filetes, no con fondos |
| Fondo de tarjeta | `#1F1916` | Tarjeta bajo el cursor |
| Texto principal: arena | `#EFE6DD` | Nombre, títulos y valores |
| Texto de lectura | `#BCAEA2` | Relato del CV |
| Texto secundario | `#A29385` | Fechas, rótulos y notas |
| Filete | `#352B25` | Separación de columnas, contornos tenues |
| Acento: brasa | `#F2803F` | Acción principal (PDF, Cotizar), sección activa del índice, «hoy» de la línea de tiempo y proyectos en la línea de tiempo |
| Brasa clara | `#FFB37F` | Texto de etiquetas y estado; acción principal al pasar el cursor |

**Regla del acento:** la brasa marca lo que se puede hacer o lo que está activo; nunca se usa como fondo de bloques grandes. Las etiquetas usan la brasa al 12 % de fondo con texto en brasa clara.

## Tipografía

Se conservan las tres de la primera dirección, servidas desde `public/cv/fuentes/` con respaldos medidos:
- **Bricolage Grotesque:** nombre, títulos, botones, rótulos y etiquetas.
- **Source Serif 4:** el relato.
- **JetBrains Mono:** queda disponible, pero ya no se usa en la página.

Los rótulos de sección van en mayúsculas pequeñas con espaciado de 0.12 em.

## Forma

- **Radios:**
  - píldora (999 px) en botones, etiquetas y estados;
  - 14 px en tarjetas;
  - 18 px en foto y recuadro del cotizador;
  - 8 px en miniaturas.
- **Botones:** figura **totalmente transparente**; el contorno aparece al pasar el cursor o enfocar.
  - Sobre fondo oscuro, el contorno es claro (arena al 55 %). La acción principal toma la brasa clara.
  - En pantallas táctiles (sin «pasar encima») hay un contorno tenue permanente para que se reconozcan como botones.
- **Sombras:** solo un brillo interior de 1 px en la tarjeta activa.
- **Densidad:** media, con 44 rem de ancho de lectura al centro.

## Movimiento

- **Reflector:** brasa al 9 % en un círculo de 600 px que sigue al mouse. Va detrás del contenido y no existe en pantallas táctiles.
- **Tarjeta bajo el cursor:** fondo más claro en 240 ms; las hermanas bajan al 50 %.
- **Flechas de enlace:** se mueven 2 px en diagonal al pasar el cursor.
- **Índice:** la línea crece de 32 a 64 px; la activa es brasa.
- **Entrada de secciones:** desde escala 0.97 en 260 ms, con 40 ms de escalón.
- **Transición a una demo:** su color crece desde la miniatura en 300 ms y la demo entra con View Transitions.
- **Movimiento reducido:** solo fundidos.

## Anclas visuales

1. La foto de Ian, con esquinas redondeadas, arriba de la columna izquierda (portada en el celular).
2. Las tarjetas del CV (fecha a la izquierda, relato a la derecha) que se iluminan y atenúan a sus hermanas.
3. La lista de demos con su miniatura real (capturas en `public/cv/demos/`).

## Patrones vigilados en uso

Reflector que sigue al cursor (una mancha de luz tenue). Es el único que se acepta en esta pantalla, porque es parte de la referencia que pidió Ian.

## Prohibido aquí

- Etiquetas sobre los títulos y numeración decorativa.
- Degradados de color y vidrio.
- Tarjetas con sombra y tarjetas dentro de tarjetas.
- Botones rellenos de color.
- Emojis, Title Case, Inter, morado e índigo.

## Estructura (aprobada)

- **Escritorio (900 px o más):** tres columnas con desplazamiento propio.
  - Identidad: foto, nombre, título, enfoque, PDF, índice, contacto, idiomas y habilidades.
  - CV: resumen, trayectoria, proyectos, experiencia, educación y certificaciones.
  - Demos y cotizador.
- **Celular:** cabecera fija con «Demos» (desplegable) y «Cotizar». La lectura sigue este orden:
  1. foto, nombre y PDF;
  2. CV, con los títulos de sección fijos al bajar;
  3. contacto, idiomas y habilidades.

  La lista de demos existe una sola vez.
