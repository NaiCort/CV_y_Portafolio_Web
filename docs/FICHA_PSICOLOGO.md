# Ficha de identidad · Psicólogo, tres temas (V4.10.2)

25 de noviembre de 2026. Ficha de la reconstrucción desde cero.
- **Fuentes:**
  - contenido y ley: `INVESTIGACION_PSICOLOGO_2.md`;
  - diseño visual: `INVESTIGACION_PSICOLOGO_DISENO.md`;
  - ampliación con Refero: `INVESTIGACION_PSICOLOGO_DISENO_2.md`.
- **Maquetas aprobadas por Ian** el 25/11/2026, con los cambios de la ampliación.
- La ficha de la demo anterior queda en `FICHA_PSICOLOGO_ANTERIOR.md`.

## Lo común a los tres temas

- **Una landing de una sola página** para Valeria Romero, psicóloga ficticia en Xalapa.
  - El contenido vive en un solo archivo (`src/giros/psicologo/data/consultorio.js`).
  - Cada tema decide el orden, la composición y la piel; las palabras, precios y datos son los mismos.
- **Se cambia de tema** con el selector flotante, como antes.
  - Se recuerda en el navegador.
  - Cada tema tiene su identificador para el cotizador: `psicologo-sala`, `psicologo-neblina` y `psicologo-cuaderno`.
- **Una sola acción principal:** «Agenda una llamada de 15 minutos». El color de acento solo va en ella.
- **Agenda simulada**, con los cinco estados:
  1. elegir llamada previa o primera sesión;
  2. modalidad, zona horaria si es en línea, horario y datos de contacto;
  3. procesamiento;
  4. resultado, con un recordatorio por WhatsApp simulado;
  5. salida.

  No pide motivo de consulta ni datos de salud.
- **Ayuda en crisis como pieza propia,** con un color distinto del acento:
  - va antes del contacto, en «Recursos» (junto a la nota de duelo) y en el pie;
  - tranquila, nunca un aviso rojo.
- **Lo legal, visible:**
  - cédula e institución en la portada y en el pie, con enlace al Registro Nacional de Profesionistas;
  - aviso de publicidad ante COFEPRIS;
  - aviso de privacidad para datos sensibles.

  El número de cédula y el de aviso son ficticios y lo dicen.
- **Sin testimonios:** en su lugar van formación, supervisión y un enlace a reseñas públicas simuladas (no se inventa ninguna reseña).
- **Sin autoevaluación clínica.** «Respira conmigo» sí va: un minuto de respiración que el visitante inicia y detiene.
- **Fotos y fuentes:**
  - fotos ilustrativas de Unsplash, servidas desde el sitio en WebP; el pie de la foto dice que la persona no es Valeria;
  - fuentes servidas desde `public/psicologo/fuentes/`, con fuentes de respaldo medidas (`size-adjust`).
- **Movimiento:**
  - entradas con fundido desde escala 0.95, de 240 ms con ease-out, una vez por sección;
  - con movimiento reducido, solo fundido;
  - nada se mueve solo: lo largo y lento solo existe en «Respira conmigo», a petición.
- **Llamada comercial real** al final (`ComercialCTA`), con un segundo enlace: «Cotiza un sitio como este», que lleva al cotizador con el identificador del tema.
- **Prohibido en los tres:**
  - Inter;
  - Title Case;
  - emojis como íconos;
  - estrellas o reseñas inventadas;
  - datos de salud en formularios;
  - etiquetas en mayúsculas sobre los títulos;
  - sombras en tarjetas;
  - parallax y desplazamiento secuestrado;
  - promesas de resultado («cura», «garantizado»).
- **No va el botón «Salir de esta página»:** Valeria no atiende violencia ni trauma (sección 7 de la investigación de diseño). Si un cliente real atiende esos temas, se agrega.

## Sala con luz

- **Idea:** un consultorio con luz de tarde. Cálido y editorial, como una revista literaria impresa en papel crema.
- **Paleta:**

  | Papel | Hex | Uso |
  | --- | --- | --- |
  | Lienzo | `#F7F4EE` | Fondo de la página |
  | Tarjeta | `#FFFFFF` | Superficies que se separan del lienzo |
  | Durazno | `#F8E4D6` | Una sola vez: el precio social |
  | Olivo profundo | `#2E3A2C` | Texto, y la banda de «Tu primera sesión» |
  | Olivo suave | `#55604F` | Texto secundario (6.0:1 sobre el lienzo) |
  | Arcilla (acento) | `#8F4A2B` | Solo el botón «Agenda una llamada» (6.6:1 con blanco) |
  | Pizarra (crisis) | `#33475B` | Bloque de ayuda en crisis |

  **Regla del acento:** la arcilla no se usa en enlaces, viñetas ni subrayados. Los enlaces van subrayados en el color del texto.
- **Tipografías:**
  - Fraunces 400 en títulos: −0.03 em e interlineado de 0.98 en el h1; nada de negrita;
  - Figtree en el texto, a 18 px con interlineado de 1.65.
- **Radios y sombras:**
  - píldora en botones;
  - 24 px en tarjetas;
  - la foto de la portada en arco (260 px arriba, 24 px abajo);
  - sin sombras; filete de 1 px `#2E3A2C1F`.
- **Movimiento:**
  - entradas con fundido desde escala 0.95;
  - en «Respira conmigo», un círculo que se llena al inhalar (4 s) y se vacía al exhalar (6 s).
- **Densidad:** media y aireada (96 px entre secciones en escritorio, 64 px en celular).
- **Estructura:** por bandas.
  - **Primero, la portada:** título, texto, acciones y cédula a la izquierda, y el arco a la derecha.
  - **Lista de dos columnas,** con filetes: «¿Te suena esto?», «Cómo trabajo» y «Sobre mí».
  - **Tarjetas blancas** en honorarios.
  - **Banda olivo a todo el ancho:** «Tu primera sesión» y «Terapia en línea».
  - **Después:**
    - «Respira conmigo»;
    - instituciones;
    - recursos;
    - preguntas;
    - crisis;
    - contacto;
    - pie.
- **Anclas:**
  - la foto en arco;
  - la banda olivo;
  - el círculo de respiración.
- **Patrones vigilados:** ninguno a propósito. Riesgo: «todo centrado». Todo va alineado a la izquierda.

## Neblina

- **Idea:** la niebla de Xalapa. Sereno, local y casi monocromo. La foto hace el trabajo emocional y la interfaz queda limpia entre las fotos.
- **Paleta:**

  | Papel | Hex | Uso |
  | --- | --- | --- |
  | Lienzo | `#EEF2F3` | Fondo |
  | Blanco niebla | `#F9FBFB` | Gafete, tablas y formulario |
  | Tinta | `#1C2A36` | Texto, y la franja de crisis |
  | Tinta suave | `#4A5A66` | Texto secundario (6.3:1) |
  | Lago (acento) | `#2F5F6E` | Solo el botón «Agenda una llamada» (7.0:1 con blanco) |

  **Regla del acento:** junto al botón lago va un botón secundario con filete, nunca dos rellenos. La crisis usa la tinta de lado a lado.
- **Tipografías:**
  - Instrument Sans 500 en títulos, con −0.03 em en el h1;
  - Newsreader en el texto, a 19 px con interlineado de 1.7.
- **Radios y sombras:**
  - 8 px en fotos, gafete y tablas;
  - píldora en botones;
  - sin sombras;
  - líneas de contorno de 1 px como único adorno.
- **Movimiento:**
  - cada sección «se despeja» al entrar: fundido y desenfoque de 6 px a 0, en 280 ms;
  - con movimiento reducido, solo fundido;
  - en «Respira conmigo», anillos de bruma que se abren y se cierran.
- **Densidad:** baja (amplios márgenes, honorarios en tabla, nada de tarjetas dentro de secciones).
- **Estructura:** por pausas fotográficas.
  - **Portada a todo el ancho** con la foto de niebla y un velo plano (sin degradado).
  - **Presentación** en tres columnas: retrato, texto y gafete con la cédula.
  - **«Lo que solemos trabajar»** sobre líneas de contorno, y después «Cómo trabajo».
  - **Pausa fotográfica 1** (bosque con niebla) con una frase.
  - **Honorarios en tabla,** y después la primera sesión y la terapia en línea en dos columnas.
  - **Pausa fotográfica 2** con «Respira conmigo».
  - **Después:**
    - instituciones;
    - recursos;
    - preguntas;
    - franja de crisis;
    - contacto;
    - pie.
- **Anclas:**
  - la portada de niebla;
  - el gafete;
  - las líneas de contorno.
- **Patrones vigilados:** ninguno. El velo de la portada es un color plano, no un degradado.

## Cuaderno

- **Idea:** la libreta de la terapeuta. Cercano y hecho a mano. Se lee como una publicación con notas al margen.
- **Paleta:**

  | Papel | Hex | Uso |
  | --- | --- | --- |
  | Papel | `#F6F5F4` | Fondo |
  | Papel hundido | `#EFEDEA` | Tarjetas, con filete interior de 1 px (sin sombra) |
  | Renglón | `#DEDAD2` | Renglones y filetes |
  | Grafito | `#2F2F33` | Texto (12.2:1) |
  | Grafito suave | `#55555B` | Texto secundario (6.8:1) |
  | Ocre (acento) | `#D9A441` | Solo el relleno del botón principal, con texto grafito (5.9:1) |
  | Ocre tinta | `#6E5212` | Anotaciones a mano (6.7:1) |
  | Tinta azul (crisis) | `#2B4A6F` | Recuadro de ayuda en crisis (8.3:1) |
- **Tipografías:**
  - Literata en títulos (600) y texto (400, de 18 a 19 px, con interlineado de 1.75);
  - Caveat solo en las anotaciones al margen y en la nota adhesiva.
- **Radios y sombras:**
  - esquinas irregulares de 4 a 12 px en botones (como recortadas);
  - polaroid con cinta en la portada;
  - sin sombras en tarjetas; la polaroid y la nota adhesiva llevan una sombra mínima porque son papel encima del papel.
- **Movimiento:**
  - casi nulo;
  - el subrayado de marcatexto se traza al entrar, en 300 ms;
  - con movimiento reducido no se traza;
  - en «Respira conmigo», una línea que sube y baja como un renglón.
- **Densidad:** alta y de lectura: retícula de impresión.
- **Estructura:**
  - **Retícula en escritorio:** columna de notas al margen (170 px), filete, columna principal y una tercera columna para la polaroid o la nota.
  - **En celular:** una columna, y las notas pasan debajo del párrafo que comentan.
  - **Orden:**
    - portada en renglones;
    - «¿Te suena esto?» con guiones a mano;
    - cómo trabajo;
    - sobre mí, con la formación como nota al margen;
    - honorarios como lista de libreta, con puntos guía hasta el precio;
    - primera sesión, con la nota adhesiva de confidencialidad;
    - terapia en línea;
    - «Respira conmigo»;
    - instituciones;
    - recursos como fichas;
    - preguntas;
    - crisis;
    - contacto;
    - pie.
- **Anclas:**
  - las notas al margen;
  - la polaroid con cinta;
  - el subrayado de marcatexto, como mucho uno por título.
- **Patrones vigilados:** uno a propósito, la letra a mano. No es de la lista, pero se raciona igual: solo en anotaciones.

## Contenido común (resumen)

| Pieza | Contenido |
| --- | --- |
| Persona | Valeria Romero: licenciada en Psicología por la Universidad Veracruzana y maestra en Psicoterapia Cognitivo-Conductual. Cédula 0000000, ficticia. Ocho años de práctica |
| Enfoque | Terapia cognitivo-conductual y de aceptación y compromiso, explicada sin jerga |
| Motivos | Ansiedad, duelo, autoestima y exigencia, pareja, estrés laboral, cambios de vida |
| Honorarios | Individual 650 MXN (50 min); adolescentes 650 MXN (50 min); pareja 1,100 MXN (75 min); en línea, igual que presencial; precio social 400 MXN con cupo limitado; llamada previa de 15 minutos sin costo |
| Políticas | Cancelación con 24 horas; factura deducible pagando con tarjeta o transferencia; reembolso de seguro con factura e informe |
| Instituciones y colegas | Talleres para escuelas, charlas para empresas, supervisión e intervisión para colegas, y canalización |
| Recursos | Tres notas breves: cuando la ansiedad sube de golpe; el duelo no tiene calendario; cuándo buscar terapia |
| Preguntas | ¿Cuántas sesiones? ¿En línea funciona igual? ¿Atiendes adolescentes? ¿Das factura? ¿Lo cubre mi seguro? ¿Qué pasa si falto? ¿Lo que digo es confidencial? |
| Contacto | Formulario corto (nombre, cómo contactarte y tema general, sin texto libre), WhatsApp simulado, dirección de ejemplo con mapa y horario |
