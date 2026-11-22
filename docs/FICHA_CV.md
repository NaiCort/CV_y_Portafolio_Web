# Ficha de identidad · CV web y portafolio

V4.8.1, 21 de noviembre de 2026. Ficha de la **v1 del CV y portafolio web** (después de terminarla, solo se actualiza el contenido). Es la dirección inicial: una combinación de las maquetas «Neblina» y «Esquema» elegida por Ian. Es provisional en lo visual, porque Ian dará referencias para enriquecerla. La estructura sí está aprobada.

## Idea

El CV de un ingeniero de datos de Xalapa.
- **De Neblina:** el verde pino y el gris niebla de la ciudad, y una serif de lectura para el relato.
- **De Esquema:** los datos se leen como datos. Hay una tabla de contacto con nombres de campo, una línea de tiempo con nodos cuadrados y el identificador real de cada demo, el mismo que usará el cotizador.

Debe distinguirse de todas las demos y no recurrir a negro con dorado (Sitio Profesional, sección 30.1).

## Paleta

| Papel | Color | Uso |
| --- | --- | --- |
| Dominante oscuro: pino | `#213A33` | Columna de identidad, cabecera del celular, recuadro del cotizador |
| Fondo: niebla | `#E9ECE8` | Fondo general; columna central con cuadrícula de 24 px al 4 % |
| Superficie | `#DFE4DF` | Columna de demos |
| Tinta | `#1D2A25` | Texto |
| Texto secundario | `#4E5C56` | Fechas, notas |
| Filete | `#C4CCC6` | Líneas y bordes |
| Acento: barro | `#A94A22` | **Solo** la acción principal (PDF del CV, Cotizar) y el nodo de la entrada actual |
| Liquen | `#D8C25A` | Rótulos de campo **sobre pino**; nunca sobre fondo claro |

Cada demo tiene además su propio tono (`color` en `src/data/demos.js`). Ese tono solo aparece en la muestra de la lista de demos.

## Tipografía

- **Bricolage Grotesque** (variable, 400–800): nombre, títulos de sección y nombres de demos.
- **Source Serif 4** (variable): el relato del CV (resumen, puntos de experiencia y descripciones).
- **JetBrains Mono** (variable): **solo datos verdaderos**, como fechas, nombres de campo, identificadores y stack. No se usa como adorno.

Las tres se sirven desde `public/cv/fuentes/` con sus licencias OFL. Cada una tiene respaldo local con medida (`size-adjust` y métricas verticales), según el modelo de la Revista.

## Forma

- **Radios:** 0. Las piezas son tablas y filetes; solo los botones de la cabecera del celular llevan 2 px.
- **Sombras:** ninguna. La separación se logra con color de fondo y filetes.
- **Densidad:** media. El CV se lee como documento, con unos 62 caracteres por línea al centro.

## Movimiento

- **Al cargar:** cada sección del centro aparece desde escala 0.97 y opacidad 0, en 260 ms con ease-out y 40 ms de escalón entre secciones. Motivo: el CV «se arma» como una consulta que devuelve filas.
- **Desplegable de demos en el celular:** escala 0.97 a 1 en 220 ms.
- **Fila de demo al pasar o enfocar:** la muestra de color se ensancha de 6 a 12 px.
- **Movimiento reducido:** solo fundido, sin escala.

## Anclas visuales

1. La tabla de contacto en la columna pino: rótulo de campo en mono liquen y valor en blanco.
2. La línea de tiempo: filete vertical con nodo cuadrado por entrada. La fecha va en mono a la izquierda y el relato en serif a la derecha.
3. La lista de demos: muestra de color de cada demo, nombre, giro, temas, estado e identificador.

## Piezas de V4.8.3

- **Foto:** la que Ian dio el 22/11/2026, provisional mientras consigue una más profesional. Va recortada a 4:5 en escritorio y a 1:1 en celular. Su fondo naranja dialoga con el barro.
- **Índice:** líneas de 22 px en la columna pino; la sección activa crece a 56 px en liquen.
- **Línea de tiempo:** estudios en pino, trabajo en gris verdoso (`#7D8C84`) y proyectos en rayado de tinta con contorno. Lo que sigue en curso se desvanece en el borde de «hoy».
- **Transición de la demo:** la muestra de color crece con `clip-path` en 300 ms y la demo entra con View Transitions.
- **Cuadrícula:** capa detrás de la columna central; la cuadrícula se marca en un círculo de 170 px alrededor del cursor, solo con puntero fino.

## Prohibido aquí

- Etiquetas sobre los títulos y numeración decorativa.
- Degradados, brillos y vidrio.
- Tarjetas con sombra y tarjetas dentro de tarjetas.
- Todo centrado e íconos de Lucide repetidos.
- Emojis y Title Case.
- Inter, morado e índigo.
- Mono como adorno.

## Estructura (aprobada)

- **Escritorio (900 px o más):** tres columnas, cada una con desplazamiento propio.
  - Identidad: foto, nombre, título, PDF, contacto, idiomas y habilidades.
  - CV: resumen, proyectos, experiencia, educación y certificaciones.
  - Demos y cotizador.
- **Celular:** cabecera fija con «Demos» (desplegable) y «Cotizar». La lectura sigue este orden:
  1. foto, nombre, título y PDF;
  2. resumen;
  3. proyectos, experiencia, educación y certificaciones;
  4. contacto, idiomas y habilidades.

  La lista de demos existe una sola vez: en escritorio es la columna derecha y en el celular, el desplegable. No se repite al final (decisión de Ian).
