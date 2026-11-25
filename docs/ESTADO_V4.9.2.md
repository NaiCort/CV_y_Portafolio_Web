# Estado de V4.9.2 · Correcciones del cotizador

25 de noviembre de 2026. Observaciones de Ian al revisar V4.9.1 en producción, más dos que se vieron en sus capturas.

## Corregido

- **Nada elegido al llegar:** con `/cotizador` a secas, ninguna tarjeta tiene el borde de brasa. La nota solo muestra el folio, la moneda y «Elige un tipo de sitio o parte de una demo…», y la barra del celular no aparece hasta elegir. Las tarjetas se resaltan al pasar el cursor o al enfocarlas.
- **Personalizado desde cero:**
  - «Una sola página» pasa de incluida a opcional en Personalizado, así que no viene nada marcado y el precio es el del proyecto mínimo;
  - en «Elige tipo», cada tarjeta parte de la base de su tipo, en vez de heredar lo que había;
  - si ya se había elegido otro tipo, se avisa y se puede deshacer;
  - en «Ajusta», cambiar de tipo en la columna izquierda sigue conservando lo compatible.
- **Mantenimiento en el precio:**
  - el primer mes del plan elegido es una línea del desglose y entra en el total y en el IVA, sin descuento de lanzamiento;
  - debajo dice «Después, mantenimiento X: … al mes con IVA»;
  - el anticipo del 30 % se calcula sobre el pago único, sin el mantenimiento, y lo indica;
  - el mensaje de WhatsApp o correo lleva lo mismo.
- **Texto del aviso:** al elegir una estructura que choca con otra, dice «Se quitó …, que no puede ir junto con ella», en lugar de «que dependía de ello».
- **Plazo:** «2 días hábiles» en lugar de «de 2 a 2 días hábiles», también en la barra del celular y en el mensaje.
- La línea «Ficha de identidad y pasada de calidad» no aparece cuando vale cero.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.9.2.md](VALIDACION_V4.9.2.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 81 a 87, 25/11/2026).

## Pendiente

Lo de V4.9.0:
- forma de pago con plan mensual;
- sugerencias de tipo de sitio en «Personalizado»;
- V4.10, el botón «Contratar un sitio como este» en cada demo.
