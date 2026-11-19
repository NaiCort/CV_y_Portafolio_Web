# Estado de V4.7.2 · Prisma, lectura completa y PDF

Segunda pieza de Revista digital, 19 de noviembre de 2026.

## Construido en esta entrega

- **Lectura completa de los N.º 24 («Lo que la luz de Andrómeda no dice») y 23 («El ADN que no codifica también habla»):** «En breve» con tres puntos, índice fijo a un lado (en celular, como píldoras arriba), hoja clara con resumen, palabras clave y fechas de recepción y aceptación, cinco secciones, una tabla, dos figuras dibujadas con sus datos (cada una con su tabla para quien no ve la gráfica), datos y financiamiento, referencias y «Cómo citar» con botón para copiar.
- **Texto normal o grande** para leer, y cifras de lecturas, descargas y citas.
- **Comentarios de la comunidad** en cada investigación (los de ejemplo incluyen la respuesta de una autora); el tuyo se publica con la cuenta de ejemplo y se puede borrar.
- **PDF real** de los dos números (`public/revista/prisma/pdf/`), generado desde la página con la hoja de impresión (`npm run pdf:prisma`); dice en el encabezado y en cada pie de página que es contenido ficticio de una demo. Los números de archivo siguen avisando que solo el 24 y el 23 tienen PDF.
- Imprimir desde el navegador da la misma hoja limpia, sin cabecera, botones ni comentarios.
- Avatares de comentarios con dos iniciales de las palabras con mayúscula («Club de Astronomía Cerro Azul» → CA).

## Pendiente para las siguientes entregas

- Prisma: publicar una investigación (envío simulado) y explorar por área.
- Rubor: suscripción (cobro recurrente visible y cancelación en un paso), secciones, «Detrás de cámaras».
- Ambas: música de fondo, créditos y aviso de privacidad con borrado.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.2.md](VALIDACION_V4.7.2.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
