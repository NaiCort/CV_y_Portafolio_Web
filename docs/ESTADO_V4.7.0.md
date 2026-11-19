# Estado de V4.7.0 · Revista digital, base de Rubor y Prisma

Primera entrega de Revista digital, la última de las siete demos, 19 de noviembre de 2026. Base: rama con V4.6.8 (`main`, `768b9d1`) más la investigación, la ficha y las maquetas aprobadas por Ian («Sí, así está bien. Puedes comenzar»). Ficha: [FICHA_REVISTA.md](FICHA_REVISTA.md).

## Construido en esta entrega

- **Entrada `/revista`:** dos puertas, Rubor y Prisma.
- **Rubor (`/revista/rubor`):**
  - la portada es siempre el N.º 24; se hojea bajando: sumario con enlaces, carta de la editora, entrevista a doble página con palabra gigante, anuncio ficticio de página completa, reportaje con mosaico, comentarios y números anteriores;
  - cabecera semitransparente fija; «Números» abre el archivo de los 24 números por fecha (translúcido, con desplazamiento);
  - cada número cambia la paleta de todo el sitio; N.º 24 (rojo) y N.º 23 (azul y dorado) completos; los demás muestran su portada y lo dicen;
  - marcadores y cuenta de ejemplo (Ana Ruiz); comentarios con publicación simulada, borrar y reportar.
- **Prisma (`/revista/prisma`):**
  - estante de 24 números; al elegir uno, su portada crece con resumen, estado (revisado o preimpresión), autores enlazados a su perfil y los botones Guardar, Leer en el sitio y Descargar PDF;
  - cada número con su color e imagen desvanecida; detrás del elegido, su imagen grande desvanecida;
  - En tendencia, Populares (semana, mes, siempre), Últimas publicaciones y Selección del editor;
  - búsqueda por título, área o autor (botón o Ctrl K), ficha de investigación con resumen, perfil de autor y marcadores (cuenta de ejemplo Diego Robles).

## Pendiente para las siguientes entregas

- Prisma: lectura completa de los N.º 24 y 23, PDF descargable real, publicar una investigación, explorar por área, comentarios del artículo.
- Rubor: suscripción (cobro recurrente visible y cancelación en un paso), secciones, «Detrás de cámaras».
- Ambas: música de fondo, créditos y aviso de privacidad con borrado.

Mientras tanto, «Descargar PDF» y la ficha de lectura dicen que llegan en la siguiente entrega.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.0.md](VALIDACION_V4.7.0.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
