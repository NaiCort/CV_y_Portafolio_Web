# Investigación ampliada: diseño visual y estructura (V4.10.1)

25 de noviembre de 2026. Pedido de Ian después de ver las tres maquetas: ampliar la investigación de diseño visual y de estructura con colecciones de diseños profesionales, en particular Refero Styles y Awwwards. Completa `INVESTIGACION_PSICOLOGO_DISENO.md`; las tres direcciones (Sala con luz, Neblina y Cuaderno) siguen siendo las mismas.

## Qué se pudo revisar

- **Refero Styles** (styles.refero.design): solo por sus páginas públicas:
  - tres colecciones: sitios editoriales, sitios minimalistas y pares tipográficos;
  - dieciséis fichas de estilo (paleta con hex, escala tipográfica, espaciado, radios, y qué hacer y qué no).

  Las fichas describen sitios de producto, no de terapeutas. Sirven por su oficio (lectura, ritmo, contención), no por el giro.
- **Awwwards:** no se pudo abrir.
  - Desde la terminal, la conexión se corta.
  - Desde la herramienta de lectura de páginas, el dominio no resuelve.

  Siguen sin revisar los tres sitios de terapia premiados citados en la sección 8 de la primera investigación. Si Ian los abre en su navegador, se pueden comparar con las maquetas.
- **Fichas estudiadas:**
  - editoriales cálidas: Fable, Medium, ElevenLabs, Anthropic, Midday, Steep y General Intelligence Company;
  - minimalistas: Apple, shadcn/ui, Seline y Telescope;
  - de cuaderno o libro ilustrado: Notion, Family y Lpalo;
  - de impresión: Monocle;
  - un par tipográfico de serif retro: OLIPOP.

## 1. Lo que repiten los diseños bien resueltos

1. **El fondo nunca es blanco puro.**
   - Casi todas las fichas cálidas usan un blanco roto como lienzo: Medium `#F7F4ED`, Fable `#F7F4EE`, Anthropic `#F0EEE6`, Notion `#F6F5F4` y Family `#FBFAF9`.
   - El blanco se reserva para las tarjetas que se separan del lienzo.
   - Esto confirma la dirección de Sala con luz y Cuaderno.
2. **La profundidad sale del tono, no de la sombra.**
   - Superficies escalonadas (lienzo, tarjeta y superficie destacada) y filetes de 1 px.
   - Medium, Anthropic, Midday, Telescope, Monocle y Lpalo prohíben las sombras. Notion y Seline las dejan para un solo elemento por página.
3. **Títulos en serif de peso normal, con interletra cerrada y poco interlineado.**
   - Medium: 120 px, peso 400, −0.055 em, interlineado 0.83.
   - Fable: 80 px, peso 400, interlineado 0.86–0.94.
   - Steep y General Intelligence: nunca pasar de 400.

   El carácter lo dan la forma de la letra y el tamaño, no la negrita. Es la lección más clara para Fraunces, Newsreader y Literata.
4. **Un acento, un trabajo.**
   - Anthropic usa su arcilla `#D97757` solo en la acción más importante de la página.
   - Telescope usa el lima en un único botón.
   - Apple prohíbe su azul en textos y adornos.
   - Steep usa su durazno una vez por página.

   Coincide con la regla del acento de la Guía v1.1. Se aplica tal cual: el acento de cada tema va solo en «Agenda una llamada de 15 minutos».
5. **Dos radios y nada más:**
   - Steep: píldora en botones y 24 px en tarjetas.
   - Apple: píldora y 8 px.
   - Medium: píldora en botones y esquinas rectas en todo lo demás.
6. **Enlaces siempre subrayados en el texto** (Anthropic: la convención de imprenta, no subrayar solo al pasar el cursor). Ayuda también a quien llega con estrés: lo que se toca se ve.
7. **Movimiento corto y casi siempre igual** (Notion: 200 ms con ease-out en todo; lo elástico, solo en la marca o en una pieza de la portada).

## 2. Estructura y ritmo

- **El ritmo viene de la densidad, no del número de secciones.** La colección editorial de Refero lo dice así: unas partes son calladas y otras cargan una imagen fuerte, una cita o una transición.
  - Para la landing, eso significa alternar dos tipos de secciones:
    - de lectura: servicios, primera sesión y preguntas;
    - de pausa: una foto, «Respira conmigo» y el aviso de crisis.
  - En vez de catorce bloques del mismo peso.
- **Bandas de color de lado a lado como separador** (Fable):
  - cada banda presenta una sola idea, con título, un párrafo, un botón y una imagen a un lado;
  - el color de fondo divide, en lugar de filetes o más espacio.
- **Minimalista no es vacío** (colección minimalista): una página callada debe seguir respondiendo las preguntas reales. Para la psicóloga son:
  - cédula verificable;
  - precios;
  - modalidad;
  - qué pasa en la primera sesión;
  - qué hacer en una crisis.

  Se quita ruido visual, no información.
- **Fotos como piezas de la composición** (Telescope y General Intelligence):
  - la imagen no va metida en una tarjeta;
  - se coloca junto al título o de lado a lado como pausa entre secciones;
  - las escenas atmosféricas hacen el trabajo emocional y la interfaz queda limpia entre ellas.
- **Retícula de impresión** (Monocle):
  - en escritorio, tres columnas: texto principal, secundario y una columna lateral;
  - en celular, una sola columna;
  - columnas separadas por filetes, no solo por espacio.

  Es la base natural de las notas al margen de Cuaderno.
- **Medidas que se repiten:**
  - ancho máximo de 1200 a 1280 px;
  - 80 a 120 px entre secciones;
  - 24 a 32 px de relleno en tarjetas;
  - texto de 16 a 18 px con interlineado de 1.5.

## 3. Lo que no se toma

- **Inter para todo** (Fable, Family, Seline): es un patrón vigilado y la reconstrucción no la usa.
- **Etiquetas en mayúsculas sobre cada título** (Monocle): patrón vigilado. La taxonomía se marca con el título y la retícula.
- **Monocromo sin colores de estado** (Medium): el aviso de crisis necesita destacar, así que cada tema conserva un color propio para él, distinto del acento de acción.
- **Mascotas, confeti y lápices de colores** (Family y Lpalo): demasiado infantiles para un consultorio. De ellos solo se toma la ilustración de línea, esparcida sin cuadrícula y una por sección.
- **Títulos gigantes de 120 px:** en un sitio para alguien con ansiedad, el título grande debe sentirse sereno, no estridente. Se queda entre 56 y 80 px en escritorio.

## 4. Qué cambia en cada maqueta

### Sala con luz (referencias: Fable, Medium, Anthropic y Steep)

- **Lienzo y superficies:**
  - lienzo `#F7F4EE` y tarjetas blancas;
  - una sola superficie destacada, durazno muy claro (como el `#FBE1D1` de Steep), para el precio social, una vez en la página.
- **Fraunces:**
  - peso 400 en todos los títulos;
  - interletra de −0.03 em e interlineado de 0.95 en el título principal;
  - nada de negrita.
- **Banda olivo oscuro de lado a lado** para «Cómo es la primera sesión», con la foto de la sala a un lado y el botón en blanco. Es la pausa que corta el ritmo, al modo de Fable.
- **Botones en píldora y tarjetas de 24 px;** sin sombras, con filete de 1 px.
- **Arcilla solo en el botón principal.** Hoy también la llevan los subrayados de los enlaces: pasan al color del texto.

### Neblina (referencias: Apple, shadcn/ui, Telescope y General Intelligence)

- **Lienzo y superficies:**
  - lienzo gris azulado muy claro (en la línea del `#F5F5F7` de Apple) y tarjetas blancas;
  - sin contenedores de tarjeta dentro de una sección: la separación la hacen el tamaño y el espacio.
- **Fotos de niebla de lado a lado como pausas:**
  - dos en la página, entre secciones, sin marco;
  - es la escena atmosférica de General Intelligence llevada a Xalapa.
- **Tipografía:**
  - Instrument Sans en los títulos, con la interletra que se cierra al crecer;
  - subtítulos en peso ligero, la «voz en voz baja» de Apple, cuidando que el gris siga pasando el contraste;
  - Newsreader para leer.
- **El azul lago solo en el botón principal.** Al lado va un botón secundario con filete, nunca dos rellenos (Apple).
- **Radios:** 8 px en fotos y tarjetas, píldora en botones.

### Cuaderno (referencias: Notion, Anthropic, Monocle, Family y Lpalo)

- **Lienzo:** papel `#F6F5F4` con tarjetas «hundidas en el papel», con filete interior y sin sombra (Family).
- **Texto:** Literata también en el cuerpo, entre 18 y 20 px. Es la idea de Anthropic de llevar la serif al texto para que se lea como publicación.
- **Retícula de impresión:**
  - columna principal y columna de notas al margen en escritorio, separadas por un filete;
  - en celular, las notas pasan debajo del párrafo que comentan.
- **Ilustraciones de línea:**
  - una por sección, giradas y fuera de la cuadrícula (Lpalo);
  - nunca en filas ni animadas (Seline: la pieza con personalidad aparece una vez por sección).
- **Un subrayado de marcatexto por título** como mucho, en la palabra clave (es la versión de cuaderno de la palabra resaltada de Seline).
- **Caveat solo en las anotaciones;** el ocre, solo en el botón principal.
- **Movimiento:** casi nulo. El único gesto es el trazo del subrayado al entrar, y con movimiento reducido no hay trazo.

## 5. Lo que queda igual en los tres

- El contenido y el orden de `INVESTIGACION_PSICOLOGO_2.md`.
- La ayuda en crisis como pieza propia, con su color.
- «Respira conmigo».
- La cédula verificable.
- El cambio de tema como en la demo actual.
- Un máximo de uno o dos patrones vigilados por tema.

Cada tema puede reordenar las secciones según su estructura (bandas, pausas de foto o retícula con notas), siempre que el contenido sea el mismo.

## Fuentes

- [Refero Styles: colección de sitios editoriales](https://styles.refero.design/collections/design-styles/editorial-websites)
- [Refero Styles: colección de sitios minimalistas](https://styles.refero.design/collections/design-styles/minimal-websites)
- [Refero Styles: pares tipográficos](https://styles.refero.design/collections/design-styles/website-font-pairings)
- [Refero: Fable](https://styles.refero.design/style/ab650279-aa18-43e5-a998-34190d7bedc7)
- [Refero: Medium](https://styles.refero.design/style/9c92c3d1-a2fe-4a27-a324-826b19501774)
- [Refero: ElevenLabs](https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26)
- [Refero: Notion](https://styles.refero.design/style/2bf4c61f-de10-4614-ba1b-20c0453bd2a9)
- [Refero: Family](https://styles.refero.design/style/1bcae895-2245-4d33-aa43-1c1e80719554)
- [Refero: Lpalo](https://styles.refero.design/style/79b4ebc4-30f6-45b6-b2d2-922e28e05ca9)
- [Refero: Anthropic](https://styles.refero.design/style/d469cba4-c448-4a43-a033-883f8bfcdc42)
- [Refero: Apple](https://styles.refero.design/style/aecac5da-f397-4ddf-b71f-de1efc434cb8)
- [Refero: shadcn/ui](https://styles.refero.design/style/0fd67ec5-7e9c-4ca9-b368-5d9c7388477a)
- [Refero: OLIPOP](https://styles.refero.design/style/c6ec55c7-0bd9-47c5-a4d2-669b7790c9cc)
- [Refero: Midday](https://styles.refero.design/style/3f2b79c1-d980-4380-a903-29856975fc37)
- [Refero: Monocle](https://styles.refero.design/style/9165ecb1-f068-4093-8783-1f3c98898b8a)
- [Refero: Steep](https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e)
- [Refero: General Intelligence Company](https://styles.refero.design/style/34baa524-5d5b-4165-bbab-d01f05e6d6b9)
- [Refero: Telescope](https://styles.refero.design/style/e6fb72b4-877d-46ab-8f94-590b971d4dc1)
- [Refero: Seline](https://styles.refero.design/style/7967c6d9-e50c-42b5-b4d1-74003ba41781)
