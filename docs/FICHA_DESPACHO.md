# Ficha de identidad · Cotejo (Despacho contable, V4.6)

Guía de identidad y calidad visual v1.1 (Documento Maestro, Parte X). Versión 1: 18 de noviembre de 2026. Dirección «Expediente», elegida por Ian entre tres maquetas (Libro, Día 17 y Expediente). Nombre aprobado por Ian. **Versión 2 (V4.6.7):** portada editorial, mezcla de las maquetas «Libro mayor» y «Consulta» que eligió Ian a partir de dos referencias suyas (un despacho de Xalapa con foto grande en la portada y un sitio editorial de logística con título enorme y fotos que acompañan el desplazamiento). **Versión 3 (V4.6.8):** el mismo lenguaje en toda la demo, a partir de la maqueta que Ian aprobó («Así se ve bien»).

Investigación previa: [INVESTIGACION_DESPACHO.md](INVESTIGACION_DESPACHO.md) y [REFERENCIAS_DESPACHO.md](REFERENCIAS_DESPACHO.md).

## Concepto

**Cotejo, contadores y asesores:** despacho contable ficticio en Xalapa, uno solo, para personas físicas y para pymes y personas morales. Una contadora al frente, la C.P.C. Elena Murrieta (inventada), con un equipo pequeño. Todo es ficticio: personas, clientes, cédula, precios, folios y cifras.

- **Idea propia:** **cotejar** es comparar para confirmar que todo cuadra. El sitio responde la pregunta que más angustia al cliente, «¿cómo voy con el SAT?», sin que tenga que preguntarla.
- **Objeto de firma:** el **expediente con semáforo**: declaraciones, opinión de cumplimiento (32-D), buzón tributario y previo del mes, cada uno en verde, ámbar o rojo con una frase. Va en la portada como ejemplo y es la base de «Tu expediente».
- **Segundo objeto:** el **recibo por régimen**: eliges tu situación y el precio aproximado cambia con lo que incluye.
- **Escena de uso:** desde el teléfono, la semana del 17, o la primera vez que alguien se pregunta si su contador sí presentó.
- **Tu expediente, ligero (decisión del 18/11):** se abre con un perfil de ejemplo, sin contraseña, y hace solo tres cosas: aprobar el previo, subir lo que se pide con fecha límite y ver el semáforo. WhatsApp sigue como canal principal. Nunca pide e.firma ni la contraseña del SAT, y lo dice.
- **Fuera de alcance:** conexión con el SAT, cálculo real de impuestos, firma electrónica, pagos, cuentas reales, archivos que salgan del navegador.

## Paleta

Un solo tema, claro.

| Rol | Nombre | Hex | Dónde se usa | Contraste |
|---|---|---|---|---|
| Neutro | Archivo | `#EEF1F0` | Fondo general | — |
| Superficie | Hoja | `#FFFFFF` | Expediente, recibo, herramientas, formularios | — |
| Dominante | Tinta | `#10232A` | Texto, títulos, régimen elegido | 14.3:1 sobre fondo |
| Texto secundario | Grafito | `#55646A` | Detalles y metadatos | 5.4:1 sobre fondo |
| Línea | Separador | `#D3DBDA` | Bordes de 1 px | — |
| Acento | Petróleo | `#0F5C6E` | Acción principal, enlaces, lo elegido | Blanco sobre petróleo 7.6:1; 6.7:1 sobre fondo |
| Aviso | Papel ámbar | `#FBF4E4` | «Te pedimos…» y fechas límite | Tinta 14.8:1 |

**Semáforo** (función, siempre con texto al lado; nunca como adorno): al día `#2F7D4F` (5.0:1 sobre blanco), atención `#8A5F05` para texto y `#C98A0C` para el punto, urgente `#B6362B` (5.9:1).

Regla del acento: un solo petróleo por pantalla para la acción principal; el semáforo solo marca estado. Sin degradados.

## Tipografía

- **Títulos y cifras grandes:** Literata (variable), de 600, con interletrado −0.02 em. Sus números de estilo antiguo se cambian a tabulares en precios y cifras.
- **Texto, navegación, botones y datos:** Instrument Sans (variable).
- Sin monoespaciada: folios y RFC en Instrument Sans con cifras tabulares.
- Las dos con licencia OFL, servidas desde el sitio.

## Fotografía e ilustración

**Cuatro fotos, el resto dibujado** (cambio de V4.6.6 y V4.6.7, a pedido de Ian). Cotejo se apoya en documentos dibujados con HTML (expediente, recibo, previo, calendario). La investigación extra ([INVESTIGACION_DESPACHO_2.md](INVESTIGACION_DESPACHO_2.md), sección 4) mostró que la foto del dueño da más confianza que no tener imagen, e Ian pidió una foto del local y de la contadora con imágenes de uso libre, como en Psicología. Reglas:

- Cuatro: Xalapa (real, de Wikimedia Commons, CC0) en el panel de la portada; la consulta bajo el expediente; el retrato de «Con una contadora al frente» y la sala de juntas. Nada de fotos de equipos sonriendo ni apretones de manos.
- Las ilustrativas con licencia de Unsplash; todas servidas desde el sitio en WebP, con procedencia y huella en `public/despacho/medios-origen.json`.
- Cada foto con personas dice en su pie que es ilustrativa; el retrato dice que **la persona no es Elena** ni trabaja en Cotejo, y la consulta, que no son clientas ni personal. La de Xalapa lleva su autor y licencia. Así no se presenta a una persona real como la contadora inventada.
- Recorte que deja fuera lo que delate otra ciudad (la sala tenía un cuadro reconocible de otra ciudad).
- Ninguna en la primera pantalla (`loading="lazy"`), para no mover el LCP.

## Forma, sombras y densidad

- Radios: botones y campos de 10 px; tarjetas y expediente de 18 px; chips de régimen en píldora.
- Una sola sombra suave para los documentos que flotan (expediente y recibo). Lo demás, superficies y líneas.
- Portada con aire; precios, calendario y expediente densos.

## Portada editorial (V4.6.7)

1. **Libro mayor:** fondo de papel con renglones y columnas de un libro contable que se palomean solos, en orden de lectura (ocre para lo que pide atención). Título enorme en Literata, «Que todo cuadre antes del 17.», con la segunda mitad en gris. Es decorativo (`aria-hidden`), se dibuja en un canvas y se desvanece hacia abajo para no competir con el título.
2. **Panel de Xalapa:** foto real de los techos de Xalapa a todo lo ancho, oscurecida, con una frase de contexto y la frase principal en ocre `#E7C27D`. La foto se aleja al desplazarse (animación ligada al desplazamiento, solo sin movimiento reducido).
3. **Consulta:** texto a la izquierda con tres datos de confianza y, a la derecha, la foto de una consulta con el expediente de ejemplo encima, que se puede aprobar ahí mismo.

En el teléfono, la portada llena la pantalla para que la foto de Xalapa cargue en diferido (LCP de texto) y sus botones quedan por encima de la barra de contacto.

## Sistema «libro mayor» en toda la demo (V4.6.8)

- **Encabezado de página:** ruta, título grande en Literata 500 con la segunda parte en gris en su propio renglón, bajada, y renglones del libro mayor con palomas a la derecha (SVG en mosaico, no degradado).
- **Listas y tablas:** línea gruesa arriba (2 px tinta), renglones con línea fina y cifras en Literata alineadas a la derecha. Así se ven regímenes y precios, servicios, especialidades, herramientas, guías, el previo, lo que te pedimos, documentos, resultados de calculadoras y «Antes de contratarnos».
- **Papel blanco solo para objetos:** expediente, recibo, formulario de cotización, diagnóstico y calendario. Siempre al lado del texto, nunca encima. El semáforo del expediente completo es una carpeta.
- **Paneles oscuros con foto y frase en ocre:** Xalapa en la portada, la lista palomeada («Nada se presenta sin tu visto bueno») y el Cofre de Perote en el recordatorio por WhatsApp.
- **Contadora:** retrato grande con su cita en Literata. **Opiniones:** una grande y dos chicas.
- **Pie oscuro** en todas las páginas con «Que todo cuadre antes del 17.» y los dos botones.
- **Tipografías de respaldo medidas:** Times o Liberation Serif al 117.6 % y Noto o DejaVu Serif al 91.4 % para Literata; Arial para Instrument Sans (mismo ancho). Mientras llegan las tipografías, el texto ocupa casi lo mismo y la página no salta.
- **Ámbar para texto:** `#8A5F05` (antes `#9A6A06`), porque ahora va sobre el fondo y no sobre blanco: 5.0:1.

## Movimiento

- **Momento propio:** al elegir un régimen, el precio del recibo cambia con un fundido corto y la lista de lo que incluye se recompone (220 ms). Con movimiento reducido, cambio inmediato.
- En el expediente, al aprobar el previo, su punto pasa de ámbar a verde (240 ms).
- Portada: las palomas del libro mayor aparecen una cada 18 ms al cargar (dibujo completo con movimiento reducido); la foto de Xalapa pasa de escala 1.25 a 1 mientras entra en pantalla.
- Interfaz: 200–300 ms, ease-out, entradas desde 0.95, fundido con movimiento reducido.

## Anclas

- Siempre Contable: contadora titulada al frente, ejemplo de reporte mensual y cédula verificable.
- RDC Contadores: «gira tu régimen, el recibo cambia».
- ARG Contadores: el proceso con fechas («día 25: recibes el previo»).
- Heru: menú por régimen y por problema; calculadoras como entrada.
- Referencias de Ian para la versión 2: la foto grande y los datos de contacto arriba de un despacho real de Xalapa, y el título enorme con panel fotográfico de un sitio editorial de logística. Se toma la técnica, no el texto ni el dibujo.

## Patrones vigilados permitidos con motivo

Ninguno de forma estructural. El semáforo de tres colores es función, no adorno, y siempre lleva texto.

## Patrones prohibidos

Más fotos de banco que las tres ilustrativas, fotos de equipos, apretones de manos, gráficas de barras decorativas que suben, calculadoras y lupas como ilustración, muros de logotipos de clientes, contadores de «clientes satisfechos», menú numerado 01–04, etiqueta sobre el título, tarjetas iguales con ícono arriba, morado e índigo, degradados, emojis, urgencia falsa.

## Páginas previstas

| Página | Ruta | Contenido |
|---|---|---|
| Inicio | `/despacho` | Expediente de ejemplo, recibo por régimen, cómo trabajamos, servicios, con quién trabajamos más (V4.6.6), herramientas, guías (V4.6.6), contadora con foto y sala (V4.6.6), opiniones de ejemplo (V4.6.6) |
| Precios y cotización (V4.6.1) | `/despacho/precios` | Precios aproximados por régimen y extras; «Antes de contratarnos» (V4.6.6); cotizar con un formulario corto |
| Servicios (V4.6.4) | `/despacho/servicios` | Cada servicio con qué incluye y qué te pedimos |
| Diagnóstico (V4.6.2) | `/despacho/diagnostico` | Cinco preguntas: régimen sugerido, riesgos y plan |
| Calendario fiscal (V4.6.2) | `/despacho/calendario` | Lo que vence este mes según el régimen |
| Calculadoras (V4.6.2) | `/despacho/calculadoras` | RESICO, aguinaldo y finiquito, orientativas |
| ¿Te dejaron de presentar? (V4.6.4) | `/despacho/regularizacion` | Revisar acuses, autocorrección y cómo te ayudamos |
| Tu expediente (V4.6.3) | `/despacho/expediente` | Perfil de ejemplo: semáforo, previo para aprobar, solicitudes con fecha límite; recordatorio por WhatsApp (V4.6.6) |
| Guías cortas (V4.6.6) | `/despacho/guias` | RESICO, cartas del SAT y primera declaración anual |
| Créditos y privacidad | `/despacho/creditos` | Fotos y tipografías; aviso de privacidad con la ley de 2025 y borrado |
