# Estado de V4.7.14 · Umbral desde cero

21 de noviembre de 2026. Decisiones de Ian del mismo día: rehacer Umbral desde cero con las técnicas de sus cuatro referencias de carteles, conservar los dos dossiers y simular más números, fondo alternado, caligráfica permitida, llegar tan profundo como se pueda, y que cada sección sea una o dos páginas de revista sin nada suelto entre pliegos. Ficha nueva: [FICHA_UMBRAL.md](FICHA_UMBRAL.md).

## Construido en esta entrega

- **Motor de carteles por capas** (`components/umbral/Cartel.jsx`): cada cartel es una pila de capas en un contenedor con proporción fija y medidas en unidades del contenedor. Cuatro variantes:
  - **Entre líneas** (oscuro): «Entre las líneas» con la calle dentro de las letras y la persona recortada encima, alineada al pixel; 2.5D con el puntero o la inclinación del teléfono; anotaciones con palabras en ámbar y «Sigue cambiando» que se escribe sola.
  - **Otra perspectiva** (papel con grano): cuatro rebanadas diagonales de cuatro tomas en blanco y negro que se deslizan al bajar (animaciones ligadas al desplazamiento), el perfil recortado que sale de su rebanada, «Mirar más allá del *ruido*», nota de papel inclinada, mira, registro y código de barras.
  - **Agua** (archivo, oscuro): palabra vertical del color del papel que muerde la foto y reflejos de agua en WebGL (shader propio), con respaldo fijo en CSS.
  - **Crear** (archivo, papel): tres tiras de la misma foto, «CREAR» en serif que cambia de color sobre las tiras y pasa detrás de la persona, sombra real de ventana, «Crea algo bello» manuscrito.
- **Despiece 3D** y **proceso**: en «Ver proceso» el cartel se separa en capas en profundidad, cada capa se apaga y enciende, y un botón junta o separa las capas. Las láminas de archivo también se pueden separar.
- **Pliegos de revista**: cada sección es una o dos páginas con cabecera corrida, folio y lomo. Inicio: portada | sumario; «Del archivo» con dos láminas; números anteriores | colofón (créditos y música en el colofón). Dossier: apertura; tres pliegos de lectura (texto con capitular | toma completa; texto que rodea la silueta recortada con `shape-outside` | cita; tres recortes y texto en tres columnas); cierre con el otro dossier. Ya no hay avisos ni créditos sueltos entre pliegos.
- **Archivo simulado**: N.º 06 «Agua», N.º 05 «Crear», N.º 04 «Lo que queda de la noche» y N.º 03 «Cruces», con su lámina en `/revista/umbral/lamina/:id`.
- **Fotos propias de Umbral** (Pexels, 10 tomas, servidas desde el sitio, recortes con rembg) en lugar de las de Rubor; registro en `medios-origen.json`; créditos con enlace a cada página.
- **Caligráfica**: Mrs Saint Delafield (OFL), convertida a trazos SVG con fontTools para escribirse sola.
- Favicon propio, llamada comercial y pie de Umbral.

## Pendiente

- Detalle al mismo nivel en las páginas de Rubor y Prisma (Cuenta, Secciones, «Detrás de cámaras», Publicar, Áreas, Perfil, Sostenimiento).
- Cierre de Revista (PDF accesibles, Core Web Vitals, pruebas integrales, teléfono físico, Documento Maestro).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.14.md](VALIDACION_V4.7.14.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
