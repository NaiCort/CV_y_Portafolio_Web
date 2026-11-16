# Estado de V4.4.8 · Brío, lo que pedía la investigación

16 de noviembre de 2026. Base: V4.4.7 en `main` (`5cc970e`). Ian pidió agregar las ocho propuestas de `docs/INVESTIGACION_GIMNASIO.md`, una por una. Cada una tiene su commit y sus pruebas.

## Construido

1. **Clase de prueba gratis en la portada.** Es ahora el botón principal (antes «Reservar una clase», que sigue en el encabezado), con «Comparar planes» al lado y la nota «Sin membresía y sin tarjeta».
2. **Nivel, intensidad y qué traer.** Cada disciplina dice si es para empezar o para todos los niveles, su intensidad (suave, media o alta, con tres marcas) y qué traer. En Clases: un desplegable «¿Cuál elijo? Las cinco disciplinas», el nivel e intensidad en cada clase del horario y un filtro «Nivel». La confirmación de la reserva dice qué traer.
3. **«Tu primera visita»** (`/gimnasio/primera-visita`): qué pasa al llegar (recorrido de 15 minutos con un coach de piso), qué traer, un primer entrenamiento de 20 minutos propuesto por Leo, qué hacer si te da pena preguntar, y una tabla con las horas tranquilas de cada sucursal entre semana y en fin de semana, calculadas de la curva de aforo (tramos de dos horas o más bajo un tercio del aforo, dentro del horario). Si una sucursal no baja de un tercio, dice cuál es su hora menos llena. Enlaces desde la portada, Planes y el pie.
4. **Aforo de hoy por hora** en la ficha de cada sucursal: una barra por hora, de 5:00 a 23:00, con la hora actual resaltada y un resumen escrito (hora más llena y más tranquila). Los lectores de pantalla reciben la lista completa.
5. **Planes sin sorpresas.** Debajo del comparador: «Lo que no cobramos: inscripción, mantenimiento anual, anualidades ni penalización por cancelar». Cuatro preguntas nuevas, tomadas de lo que Profeco pide revisar: mantenimiento anual, qué pasa si cierra una sucursal, seguro y atención médica, y el contrato. El desglose del alta muestra «Mantenimiento anual $0».
6. **Accesibilidad y estacionamiento** en la ficha de cada sucursal.
7. **Opiniones de socios de ejemplo** en Planes, con el aviso «las personas y lo que dicen son inventados para esta demo». Cuatro citas con logros concretos (aprender a usar las máquinas, congelar sin cobro, la lista de espera, la primera clase de box), sin estrellas, kilos ni antes y después. La primera va grande y las demás en columna, no tres tarjetas iguales.
8. **Agregar al calendario.** «Agregar a mi calendario» en la confirmación de la reserva, en cada reserva confirmada de «Mis reservas» y en la confirmación de la evaluación. Descarga un archivo `.ics` estándar (Google Calendar, Apple Calendar y Outlook) con hora, duración, sucursal, qué traer y un aviso una hora antes. Se genera en el navegador; no se envía nada.

## Ajustes encontrados al construir

- La primera versión de las horas tranquilas alargaba los tramos hasta las 22:00 aunque la sucursal cerrara a las 20:00 el sábado. Se corrigió antes de publicar, con una prueba.
- En el teléfono, la tabla de horas tranquilas se desplazaba de lado y no se alcanzaba con el teclado (axe). Ahora se acomoda al ancho sin desplazarse.
- «Lo que no cobramos» empezó como una lista tachada: se leía mal y en el tema Distrito quedaba oscuro sobre oscuro. Quedó como una frase.

## Última revisión antes de Taller (16/11)

- En Clases, filtrar Movilidad o Ritmo mostraba la foto de box en el encabezado, porque esas dos disciplinas no tienen medio propio. Ahora muestran un panel con su nombre y su descripción en el color de acento, hasta que tengan video.
- El plan Total prometía «reserva 48 h antes», algo que el horario no aplica (todos ven los mismos siete días). Ahora dice «Ilimitadas, con reserva».
- En la tabla de horas tranquilas, cada tramo («10:00 a 17:00») ya no se parte en dos líneas en el teléfono.
- En el tema Distrito, las marcas apagadas de intensidad se ven mejor.

- **Planes en el tema Distrito (encontrado por Ian en su PC):** en la página Planes el contenido se iba a la izquierda y el fondo claro no llegaba a la orilla derecha; en la portada, la franja quedaba más angosta y el título se partía. La franja clara se hacía con márgenes calculados con `100vw`, que solo funcionan dentro de un contenedor centrado y además cuentan la barra de desplazamiento de Windows. Ahora el fondo se pinta con `border-image` hacia los lados y el contenido queda en el mismo lugar que en Cobalto. El recorrido de navegador ahora revisa Planes y la portada con Distrito activo y barras de desplazamiento visibles.

- **El contenido se recorría al cambiar de tema (Ian, 16/11):** en Distrito la franja de planes llevaba 100 px más de espacio arriba (52 px en la página Planes) y la franja oscura de la portada una línea de 1 px. Ahora Distrito usa los mismos espacios que Cobalto: el fondo claro sube 72 px (40 px en teléfono) sobre el relleno de la sección anterior sin ocupar lugar, y la línea es una sombra interior. Medido en las once páginas a 1440 y 390 px: misma altura en los dos temas.

- **Destello al pasar de Distrito a Cobalto (Ian, 16/11):** la página anima el cambio de colores en 240 ms. En Cobalto la franja de planes era transparente, así que durante esa animación dejaba ver el fondo todavía oscuro y el título heredaba el color todavía claro: por un instante, fondo negro con letras blancas. Ahora la franja tiene su propio fondo claro y texto oscuro en los dos temas (en Cobalto, del mismo color que la página), con la misma forma; solo en Distrito sube sobre la sección oscura anterior. Medido cuadro por cuadro durante la animación, en los dos sentidos: la franja nunca baja de una luminosidad de 232 y el título nunca pasa de 23.

Revisado sin cambios: textos de todas las páginas contra lo que hace el sitio, rutas y títulos, aviso de privacidad y borrado, créditos, temas, teclado y movimiento reducido.

## Qué revisar en la vista previa

1. Portada: el botón «Clase de prueba gratis» y el enlace «Así es tu primera visita».
2. «Tu primera visita» completa, sobre todo la tabla de horas tranquilas.
3. Clases: «¿Cuál elijo?», el filtro «Para empezar» y el nivel de cada clase.
4. Sucursales en la portada: abrir una y ver la gráfica de hoy, accesibilidad y estacionamiento.
5. Planes: «Lo que no cobramos», las opiniones y las preguntas nuevas.
6. Reservar una clase y tocar «Agregar a mi calendario» en el teléfono.
