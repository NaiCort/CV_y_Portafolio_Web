# Estado de V4.4.6 · Brío, coaches y tienda

15 de noviembre de 2026. Base: V4.4.5 en la rama `claude/great-edison-k9xun2`.

## Construido

- **Página `/gimnasio/coaches`.**
  - Seis coaches inventados, sin fotos (nadie de los videos se presenta como coach de Brío). Cada ficha lleva nombre en grande, especialidad, años de experiencia, clases a la semana y sucursales (calculadas del horario), su forma de trabajar y su formación.
  - Filtro «¿Qué buscas?» por objetivo: ganar fuerza, más resistencia, aprender a boxear, moverme mejor, empezar desde cero.
  - «Ver sus clases» abre Clases filtrado por ese coach (`/gimnasio/clases?coach=…`).
  - **Evaluación gratuita** de 45 minutos: coach, sucursal (solo donde da clase), día de lunes a sábado, hora libre, objetivo opcional y nombre. Valida, procesa y da un código `EVA-#####`. Es una por persona: si ya hay una, el panel avisa que la reemplaza. Se ve arriba de la página y se cancela con confirmación. **No pide datos de salud**; el resultado dice que en el club se llenaría el cuestionario antes de empezar.
  - **Sesiones personales:** sesión suelta ($390), paquete de 4 ($1,440) y de 8 ($2,640), con precio por sesión, vigencia y precio de socio. Se agregan al mismo carrito que la tienda. El texto recuerda que Club ya incluye dos al mes y Total cuatro.
- **Tienda `/gimnasio/tienda`.**
  - Diez productos de ejemplo sin marca real, en tres categorías (equipo, nutrición, ropa y accesorios). Cada uno tiene un dibujo de línea propio: no hay fotos de producto con licencia libre.
  - Precio con IVA y precio de socio (10 % menos) a la vista. Si se entró con el perfil de ejemplo, el precio de socio pasa a ser el principal.
  - **Ficha** `/gimnasio/tienda/:id` con título propio: descripción, puntos clave, variante (talla, sabor, color o tamaño), cantidad de 1 a 5, «Agregar al carrito» con confirmación y enlace al carrito, y piezas por sucursal (existencias de ejemplo, fijas).
  - **Carrito** `/gimnasio/carrito`: cambiar cantidades, quitar, subtotal, descuento de socio, total e IVA desglosado. Recoger en una sucursal, con aviso de cuándo estaría listo (dos horas, dentro del horario de entregas de 9:00 a 20:00) o de qué pieza falta y cuándo llega (dos días). Nombre para recoger, pago en sucursal, sin cargos extra. Procesamiento y resultado con código `PED-#####`. Con solo paquetes, el carrito pide dónde pagar en lugar de dónde recoger.
  - **Tus pedidos** en la tienda, con cancelación confirmada.
- **Encabezado.** Menú con Coaches y Tienda. Botón «Carrito» con la cuenta de artículos cuando hay algo; en el teléfono solo el ícono. **Menú del teléfono:** hasta ahora, en pantallas de 900 px o menos el menú desaparecía y no había forma de llegar a Planes o Clases salvo desde Inicio. Ahora un botón «Menú» abre las secciones y se cierra al cambiar de página. «Reservar clase» pasa al menú en pantallas de hasta 640 px.
- **Privacidad:** el aviso enumera carrito, pedidos y evaluación, y «Borrar mis datos de esta demo» también los borra (`brio-tienda-v1`, `brio-evaluacion-v1`).
- La guía «Cómo funciona» explica coaches y tienda.

## Sigue pendiente

V4.4.7, cierre de Gimnasio: revisión con impeccable y web-design-guidelines, script de pruebas de navegador, Core Web Vitals, enlace desde la Bienvenida, `CLAUDE.md` y Documento Maestro. Medios de Movilidad y Ritmo.

## Qué revisar en la vista previa

1. En el teléfono, «Menú» en el encabezado: abre las secciones y se cierra al elegir una.
2. Coaches: filtrar por «Aprender a boxear», «Ver sus clases» de Rafa, y agendar una evaluación; luego cancelarla.
3. Agregar un paquete de sesiones y ver el carrito en el encabezado.
4. Tienda: abrir Guantes, elegir 14 oz y dos piezas, agregar, ir al carrito, cambiar de sucursal para ver cuándo estaría listo, y apartar.
5. Entrar con el perfil de ejemplo y volver a la tienda: el precio de socio pasa al frente y el carrito descuenta 10 %.
