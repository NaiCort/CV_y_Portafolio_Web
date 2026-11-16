# Ficha de identidad · Rosales y Vértice (Taller mecánico, V4.5)

Guía de identidad y calidad visual v1.1 (Documento Maestro, Parte X). Versión 1: 16 de
noviembre de 2026. Dirección «Combinada» elegida por Ian a partir de tres maquetas (Orden,
Rótulo y Tablero): la estructura y el selector de testigos de Tablero, con la orden de
servicio en papel de Orden. Cada taller con sus propios colores (decisión de Ian).

Investigación previa: `docs/INVESTIGACION_TALLER.md` y `docs/REFERENCIAS_TALLER.md`.

## Concepto

**Dos talleres ficticios en Xalapa en una sola demo**, uno por tema, sobre la misma
estructura (como Cobalto y Distrito en Brío, pero aquí cada tema es otro negocio):

- **Mecánica Rosales** (tema predeterminado): taller familiar e independiente en la colonia
  Revolución, desde 1989. Un solo local. Mecánica general, diagnóstico con escáner, precios
  por servicio, revisión antes de comprar un usado y mecánico a domicilio en la colonia. Sin
  cuenta: el cliente consulta su auto con el folio de la orden y sus placas.
- **Vértice**: servicio automotriz multimarca con cuatro sucursales (Ánimas, Centro, Arco
  Sur y Sumidero), cada una con su especialidad: hojalatería con aseguradoras, mecánica
  general, híbridos, llantas y alineación. Recolección y entrega, fotos y video del
  diagnóstico, autorización por WhatsApp y una cuenta «Mi garaje».

Todo es ficticio: talleres, personas, folios, placas, precios y el número de contrato. Las
sucursales usan avenidas reales de Xalapa como referencia; ahí no hay ningún taller.

- **Idea propia del giro:** el **tablero del auto**. El cliente llega con una pregunta
  («se prendió esta luz») y el sitio la contesta: qué puede ser, si urge y cuánto cuesta
  revisarlo.
- **Objeto de confianza:** la **orden de servicio en papel** (la que exige la
  NOM-174-SCFI-2007), con partidas en semáforo, sello y firma. Es la promesa de la
  investigación hecha visible: nada se repara sin tu visto bueno.
- **Escena de uso:** desde el teléfono, con el auto prendido en un estacionamiento o ya en
  el taller esperando el presupuesto.
- **Fuera de alcance:** venta de refacciones (decisión de Ian), pagos, cuentas reales,
  diagnóstico real, conexión con el auto.

## Temas

Una estructura, dos paletas cambiadas con variables de CSS. El selector va en la esquina,
propio de esta demo (no se toca el `ThemeSwitcher` compartido). La elección se guarda en
el navegador (`taller-tema-v1`). Cambiar de tema cambia el negocio: nombre, textos,
precios y secciones propias.

### Rosales (predeterminado): papel y sello

| Rol | Nombre | Hex | Dónde se usa | Contraste |
|---|---|---|---|---|
| Neutro | Papel de estraza | `#F2EDE2` | Fondo general | — |
| Superficie | Papel | `#FBF8F1` | Testigos, lectura, campos, orden de servicio | — |
| Dominante | Tinta | `#1D222B` | Texto y títulos | 13.7:1 sobre fondo |
| Texto secundario | Lápiz | `#5E6370` | Detalles y metadatos | 5.2:1 sobre fondo |
| Línea | Renglón | `#D9D1BF` | Separadores de 1 px | — |
| Acento | Rojo de sello | `#B3261E` | Botón principal, testigo elegido, sello | 5.6:1 sobre fondo; blanco sobre rojo 6.5:1 |
| Testigo apagado | Grafito claro | `#8F8676` | Íconos de testigos sin elegir | 3.4:1 sobre papel |

### Vértice: tablero de noche

| Rol | Nombre | Hex | Dónde se usa | Contraste |
|---|---|---|---|---|
| Neutro | Tablero | `#0F1114` | Fondo general | — |
| Superficie | Consola | `#171A1F` | Testigos, lectura, sucursales, Mi garaje | — |
| Dominante | Lectura | `#ECEEF1` | Texto | 16.3:1 |
| Texto secundario | Aguja | `#9AA1AB` | Detalles | 7.3:1 sobre fondo |
| Línea | Junta | `#272B32` | Separadores | — |
| Acento | Ámbar de testigo | `#FFB000` | Botón principal, testigo encendido, barra de kilometraje | 10.3:1 sobre fondo; texto `#15130E` sobre ámbar 10.1:1 |
| Testigo apagado | Apagado | `#6B7380` | Íconos sin elegir | 3.6:1 sobre consola |
| Sello | Petróleo | `#0E5A73` | Sello de la orden (sobre papel) | 7.3:1 sobre papel |

**La orden de servicio es papel en los dos temas** (`#FBF8F1`, tinta `#1D222B`): un objeto
físico que se ve igual sobre el papel de Rosales y sobre el negro de Vértice.

**Semáforo de partidas** (función, igual en los dos temas, siempre con texto al lado):
urgente `#C2341F`, puede esperar `#D99A0B`, en buen estado `#3E8E4E`.

Regla del acento, en ambos temas: un solo acento por pantalla; marca la acción principal y
lo elegido. Nunca degradados con él. El semáforo no es acento: solo aparece en partidas.

## Tipografía

- **Títulos, cifras y precios:** Saira (variable, ejes de peso y ancho 50–125 %). Títulos al
  92–95 % de ancho, marca al 108 %, cifras de kilometraje al 85 %.
- **Texto, navegación y botones:** Figtree (variable).
- **Datos de la orden** (folio, placas, número de contrato): IBM Plex Mono 500. Solo para
  datos que en papel irían a máquina; nunca como adorno.
- Cifras tabulares en precios, kilometraje, folios y horarios. Las tres OFL, servidas desde
  el sitio.

## Fotografía

- Wikimedia Commons, solo dominio público, CC0, CC BY y CC BY-SA, con autor, licencia y
  huella en `public/taller/medios-origen.json` y créditos en su página.
- Rosales: taller pequeño, cálido, con herramienta a la vista. Vértice: bahías limpias con
  elevadores. Se recortan matrículas y letreros legibles.
- Las fotos ilustran el ambiente: no son Rosales, Vértice ni su personal.
- Vértice oscurece la foto (`saturate(.7) brightness(.85)`) para que el tablero mande.

## Forma, sombras y densidad

- Botones en píldora; testigos y paneles de 14 px; Mi garaje de 18 px; campos de 10 px.
- La orden de servicio tiene esquinas casi rectas (3 px), girada −1.2° en escritorio y
  recta en teléfono, con la única sombra fuerte de la página (es un objeto sobre la mesa).
- Portada con aire; precios y sucursales densos, en filas.

## Movimiento

- **Momento propio:** al elegir un testigo, su ícono se enciende (color y un destello corto
  del borde, 240 ms) y la lectura de abajo cambia con un fundido. Con movimiento reducido
  solo cambia el color.
- Al cambiar de tema, los colores pasan en 200 ms; la estructura no se mueve (lección de
  Brío: misma altura y sin destellos).
- Interfaz: 200–300 ms, ease-out, entradas desde 0.95, fundido con movimiento reducido.

## Anclas

- Christian Brothers Automotive: tono de vecino, cita y presupuesto como acciones
  principales.
- Grupo Automotriz MAEE: proceso, casos y precios visibles; WhatsApp como canal.
- Pro-Tek Auto: tarifa por hora, costo del diagnóstico y precios publicados.
- Firestone y Honest-1: «Mi garaje» con autos, historial y siguiente servicio.

## Patrones vigilados permitidos con motivo

Fondo oscuro en todo el tema Vértice (es el tablero de noche) y monoespaciada solo en los
datos de la orden. Seis testigos iguales con ícono: son los botones de un tablero, cada uno
con su propio dibujo y su texto, no tarjetas decorativas.

## Patrones prohibidos

Amarillo y negro de franjas de peligro, llamas y cromo, autos deportivos de banco de
imágenes, llaves cruzadas como logotipo, cupones con cuenta regresiva, urgencia falsa,
etiqueta sobre el título, numeración 01–05 decorativa, tres tarjetas iguales con ícono
arriba, degradados, brillos, emojis, imágenes generadas con IA.

## Páginas previstas

| Página | Ruta | Contenido | Taller |
|---|---|---|---|
| Inicio | `/taller` | Portada, testigos, orden de ejemplo, precios, sucursales o consulta | Ambos |
| Agendar | `/taller/cita` | Servicio, auto, día y hora, recolección (Vértice) o domicilio (Rosales) | Ambos |
| Consulta tu auto | `/taller/consulta` | Folio y placas, etapas, presupuesto por partida con visto bueno | Ambos |
| Precios | `/taller/precios` | Lista completa, mano de obra, garantía, contrato Profeco | Ambos |
| Revisión de usados | `/taller/usados` | Qué se revisa, precio fijo, reporte de ejemplo | Rosales |
| Hojalatería y seguros | `/taller/hojalateria` | Aseguradoras, antes y después, deducible | Vértice |
| Híbridos | `/taller/hibridos` | Qué se atiende, sucursal especializada | Vértice |
| Mi garaje | `/taller/garaje` | Perfil de ejemplo, autos, historial, siguiente servicio | Vértice |
| Créditos | `/taller/creditos` | Fotos y tipografías con autor y licencia | Ambos |

Las páginas de un solo taller se ofrecen solo en su tema; si se abren desde el otro,
explican de quién son y ofrecen cambiar.
