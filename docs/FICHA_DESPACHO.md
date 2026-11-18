# Ficha de identidad · Cotejo (Despacho contable, V4.6)

Guía de identidad y calidad visual v1.1 (Documento Maestro, Parte X). Versión 1: 18 de noviembre de 2026. Dirección «Expediente», elegida por Ian entre tres maquetas (Libro, Día 17 y Expediente). Nombre aprobado por Ian.

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

**Semáforo** (función, siempre con texto al lado; nunca como adorno): al día `#2F7D4F` (5.0:1 sobre blanco), atención `#9A6A06` para texto y `#C98A0C` para el punto, urgente `#B6362B` (5.9:1).

Regla del acento: un solo petróleo por pantalla para la acción principal; el semáforo solo marca estado. Sin degradados.

## Tipografía

- **Títulos y cifras grandes:** Literata (variable), de 600, con interletrado −0.02 em. Sus números de estilo antiguo se cambian a tabulares en precios y cifras.
- **Texto, navegación, botones y datos:** Instrument Sans (variable).
- Sin monoespaciada: folios y RFC en Instrument Sans con cifras tabulares.
- Las dos con licencia OFL, servidas desde el sitio.

## Fotografía e ilustración

**Sin fotos.** Los sitios de despachos abusan de fotos de banco de oficinas y equipos sonriendo; Cotejo se apoya en documentos dibujados con HTML (expediente, recibo, previo, calendario). La contadora se presenta con monograma y datos, no con foto, para no presentar a una persona real como ella.

## Forma, sombras y densidad

- Radios: botones y campos de 10 px; tarjetas y expediente de 18 px; chips de régimen en píldora.
- Una sola sombra suave para los documentos que flotan (expediente y recibo). Lo demás, superficies y líneas.
- Portada con aire; precios, calendario y expediente densos.

## Movimiento

- **Momento propio:** al elegir un régimen, el precio del recibo cambia con un fundido corto y la lista de lo que incluye se recompone (220 ms). Con movimiento reducido, cambio inmediato.
- En el expediente, al aprobar el previo, su punto pasa de ámbar a verde (240 ms).
- Interfaz: 200–300 ms, ease-out, entradas desde 0.95, fundido con movimiento reducido.

## Anclas

- Siempre Contable: contadora titulada al frente, ejemplo de reporte mensual y cédula verificable.
- RDC Contadores: «gira tu régimen, el recibo cambia».
- ARG Contadores: el proceso con fechas («día 25: recibes el previo»).
- Heru: menú por régimen y por problema; calculadoras como entrada.

## Patrones vigilados permitidos con motivo

Ninguno de forma estructural. El semáforo de tres colores es función, no adorno, y siempre lleva texto.

## Patrones prohibidos

Fotos de banco de oficina o de equipos, apretones de manos, gráficas de barras decorativas que suben, calculadoras y lupas como ilustración, muros de logotipos de clientes, contadores de «clientes satisfechos», menú numerado 01–04, etiqueta sobre el título, tarjetas iguales con ícono arriba, morado e índigo, degradados, emojis, urgencia falsa.

## Páginas previstas

| Página | Ruta | Contenido |
|---|---|---|
| Inicio | `/despacho` | Expediente de ejemplo, recibo por régimen, cómo trabajamos, servicios, herramientas, contadora al frente |
| Precios y cotización (V4.6.1) | `/despacho/precios` | Precios aproximados por régimen y extras; cotizar con un formulario corto |
| Servicios | `/despacho/servicios` | Cada servicio con qué incluye y qué te pedimos |
| Diagnóstico (V4.6.2) | `/despacho/diagnostico` | Cinco preguntas: régimen sugerido, riesgos y plan |
| Calendario fiscal (V4.6.2) | `/despacho/calendario` | Lo que vence este mes según el régimen |
| Calculadoras (V4.6.2) | `/despacho/calculadoras` | RESICO, aguinaldo y finiquito, orientativas |
| ¿Te dejaron de presentar? | `/despacho/regularizacion` | Revisar acuses, autocorrección y cómo te ayudamos |
| Tu expediente | `/despacho/expediente` | Perfil de ejemplo: semáforo, previo para aprobar, solicitudes con fecha límite |
| Créditos y privacidad | `/despacho/creditos` | Tipografías; aviso de privacidad con la ley de 2025 y borrado |
