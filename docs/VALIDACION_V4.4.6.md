# Validación de V4.4.6

Entorno: Node 22, Chromium de Playwright, compilación de producción con `vite preview`. 15 de noviembre de 2026. El visto bueno de Ian sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. El código de Brío pasa a 120.3 kB de JavaScript (34.7 kB comprimido) y 40.4 kB de CSS (9.0 kB comprimido).
- **167 pruebas en 22 archivos.** Nuevas, en `tests/gimnasio-tienda.test.jsx` (15):
  - datos completos de coaches, productos y paquetes;
  - precio de socio, IVA desglosado, piezas que se juntan con máximo de 5 y quitar en cero;
  - apartar y cancelar un pedido; horario de entregas (antes de abrir, a media tarde, de noche y con piezas faltantes); existencias fijas;
  - datos guardados dañados o de productos que ya no existen;
  - días de evaluación sin domingo y sin horas pasadas;
  - recorrido de la tienda hasta el pedido apartado, precio de socio con el perfil de ejemplo y producto inexistente;
  - filtro de coaches y enlace al horario filtrado; evaluación con sus dos errores, resultado y cancelación; paquete al carrito;
  - menú del teléfono y borrado de carrito, pedidos y evaluación desde el aviso de privacidad.
- Recorrido en Chromium a 1440 px y en un iPhone 13 emulado: evaluación, paquete, ficha de producto, carrito con error, cambio de sucursal, pedido apartado, «Tus pedidos» y menú del teléfono. Sin desbordamiento ni errores de consola.
- Encabezado medido en iPhone SE (320 px), iPhone 13 (390 px) y Pixel 5 (393 px): todos los botones caben.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA), en los dos temas a 1440 y 390 px:
  - Coaches; evaluación con error, resultado y evaluación vigente; tienda; ficha con producto agregado; carrito con error; pedido apartado; «Tus pedidos»; carrito vacío; menú del teléfono;
  - y de nuevo Inicio, Clases, Planes, alta, área de socio y Créditos.

  **Sin infracciones.**

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals.
