# Estado de V4.4.2 · Brío, mapa y lista de sucursales

14 de noviembre de 2026. Base: V4.4.1 en la rama `claude/great-edison-k9xun2`. Responde a la revisión de Ian en PC.

## Corregido

- **Ficha encima del mapa.** En escritorio la ficha ocupaba buena parte del mapa y se encimaba con la sucursal elegida. Se quitó del mapa.
- **Lista de sucursales como acordeón.** Cada sucursal es un botón con nombre, rasgo y aforo; al elegirla se expande debajo con dirección, horario de hoy, aforo y estado, lo que tiene y el espacio público de referencia. Solo una está abierta a la vez (`aria-expanded` y región asociada).
- **El mapa se centra en la sucursal elegida** desde la lista (acercando a nivel 13.5 si estaba más lejos; sin animación con movimiento reducido). Al tocar una marca del mapa se abre su fila y, si la lista está desplazada, se lleva a la vista dentro de la lista sin mover la página.
- **Misma altura.** En escritorio el mapa y la lista ocupan la misma altura y la lista se desplaza por dentro. En el teléfono el mapa es cuadrado y la lista va debajo, completa, para no meter un desplazamiento dentro de otro.

## Qué revisar en la vista previa

1. En PC: el mapa y la lista miden lo mismo; elegir una sucursal en la lista la abre y centra el mapa en ella.
2. Tocar una marca en el mapa abre su fila en la lista.
3. En el teléfono: mapa arriba y lista completa debajo, sin desplazamiento interno.
