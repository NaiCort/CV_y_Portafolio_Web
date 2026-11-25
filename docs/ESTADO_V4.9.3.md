# Estado de V4.9.3 · Plan mensual y sugerencias de tipo

25 de noviembre de 2026. Con el visto bueno de Ian a V4.9.2, se completa lo que quedaba de la primera versión del cotizador (secciones 18.2, 18.5 y 23.1 del Sitio Profesional).

## Construido

- **Plan mensual (sección 23.1):**
  - `PARAMETROS.mensual` fija el 40 % inicial, 18 meses y el plan mínimo Básico, porque la mensualidad incluye hospedaje y mantenimiento;
  - `FORMAS_DE_PAGO` describe las dos formas y quién se queda con el código;
  - el cálculo da el pago inicial, el saldo, la cuota del saldo (sin intereses), la cuota total con mantenimiento y lo que se paga al terminar;
  - en el plan mensual, el mantenimiento no se suma como «primer mes», porque se paga cada mes;
  - en «Ajusta», el grupo «Forma de pago» va antes de «Entrega»; con el plan mensual, los planes por debajo de Básico quedan deshabilitados, con su razón;
  - la nota, la barra del celular, el anuncio para lectores de pantalla y el mensaje de WhatsApp o correo muestran el plan mensual;
  - viaja en la dirección (`pago=mensual`).
- **Sugerencia de tipo en Personalizado (sección 18.5):** si lo elegido cumple el núcleo de un tipo y todo cabe en él, se sugiere el más pequeño, sin aplicarlo y con un botón para cambiar.
- **Tipo inferior (sección 18.2):** en cada función de núcleo, «¿No la necesitas? Cambia a…» lleva al tipo inmediatamente inferior: de tienda a varias páginas, de varias páginas a landing y de landing a Personalizado. Se conserva lo compatible.
- **Textos:** títulos como frase («Tu proyecto personalizado»…) y Personalizado explica que ahí no viene nada marcado.
- **Contraste:** las opciones deshabilitadas ya no se atenúan con opacidad, sino con el color secundario (antes 4.1:1).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.9.3.md](VALIDACION_V4.9.3.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 81 a 87, 25/11/2026).

## Pendiente

- **Ian:** revisar el plan mensual (40 %, 18 meses, sin intereses, al menos el plan Básico): son propuestas de la sección 23.1 y se deciden con los precios.
- **V4.10:** el botón «Contratar un sitio como este» en cada demo.
- **V4.11:** ajuste final del cotizador y animaciones propias.
- **Más adelante:** backend real, vista previa en vivo, precios y alojamiento.
