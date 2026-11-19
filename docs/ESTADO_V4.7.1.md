# Estado de V4.7.1 · Revista digital, volver a elegir y nada encimado

Corrección sobre V4.7.0, 19 de noviembre de 2026, a partir de las capturas de Ian en PC (unos 1980 × 870) y en celular.

## Construido en esta entrega

- **Botón «← Revistas»** en la cabecera de Rubor y de Prisma: regresa a la elección entre las dos revistas. En celular queda solo la flecha, con nombre accesible «Volver a elegir revista».
- **Portada de Rubor en flujo:** cabecera RUBOR, línea del número y fecha, titulares y pie (código de barras, «Baja para hojear» y crédito de la foto) van uno debajo de otro en vez de colocarse por coordenadas. Ya no se encima «N.º 24 · Noviembre» sobre el titular de Valeria, la cabecera sobre «Alfombra roja», ni el código de barras sobre el pie de foto en celular. El tamaño de la cabecera y de los titulares toma en cuenta la altura de la ventana (pantallas anchas y bajas).
- **Prisma, «En tendencia»:** la rejilla se acomoda sola al ancho; a 1024 px ya no se pisaban las tarjetas.
- **Marca de agua de la demo:** espacio al final de la portada para que no tape el código de barras.

## Pendiente para las siguientes entregas

Sin cambios respecto a [ESTADO_V4.7.0.md](ESTADO_V4.7.0.md): lectura completa y PDF de Prisma, publicar, explorar por área, comentarios del artículo; suscripción, secciones y «Detrás de cámaras» en Rubor; música de fondo, créditos y aviso de privacidad en ambas.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.1.md](VALIDACION_V4.7.1.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
