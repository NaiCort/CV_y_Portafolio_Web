# Estado de V4.5.1 · Rosales y Vértice en el mapa

Segunda entrega del giro Taller mecánico, 16 de noviembre de 2026, a pedido de Ian. Base: V4.5.0. Ficha: [FICHA_TALLER.md](FICHA_TALLER.md).

## Construido

- Mapa real de Xalapa en Inicio (MapLibre y OpenFreeMap, como Brío), con carga diferida cuando la sección se acerca a la pantalla y aviso con «Reintentar» si no carga.
- **Cada tema muestra solo sus locales, en zonas distintas:**
  - **Rosales («Cómo llegar»)**: un solo local en la colonia Revolución, al norte, sobre el estilo claro del mapa. A un lado, una ficha fija con «abierto ahora», horario de la semana con el día de hoy marcado, cómo llegar, estacionamiento, accesibilidad, lo que ofrece, «Llamar al taller» (simulado) y la calle de referencia en OpenStreetMap.
  - **Vértice («Cuatro sucursales»)**: Ánimas, Centro, Arco Sur y Lázaro Cárdenas, en el oriente, el sur y el centro, sobre el estilo oscuro. Junto al mapa, una lista que se desplaza por dentro; elegir una sucursal en el mapa o en la lista la marca y abre su ficha con dirección, horario, «abierto ahora», servicios, «Agendar aquí» (WhatsApp simulado con esa sucursal) y su referencia.
- La sucursal «Sumidero» pasa a llamarse «Lázaro Cárdenas», para que el nombre coincida con su ubicación.
- Horarios por día de cada local, con el estado «abierto hasta», «abre hoy», «abre mañana» o «abre el lunes».
- «Cómo llegar» en el menú de Rosales; la guía «Cómo funciona» explica el mapa y los puntos de ejemplo.

## Qué revisar en la vista previa

1. En Rosales, bajar a «Cómo llegar»: un solo punto al norte y la ficha al lado.
2. Cambiar a Vértice: cuatro puntos en otras zonas, ninguno el de Rosales.
3. Tocar sucursales en el mapa y en la lista; la lista se desplaza sin estirar la página.
