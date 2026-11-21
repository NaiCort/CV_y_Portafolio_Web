# Estado de V4.7.17 · Revista digital: PDF accesibles, carga y tipografías

21 de noviembre de 2026. Primera parte del cierre técnico de Revista.

## Construido en esta entrega

- **PDF de Prisma accesibles:** los dos PDF se regeneran como documentos etiquetados (título, subtítulos, párrafos, listas, tabla, figuras, idioma español) y con índice navegable a partir de los encabezados (`tagged` y `outline` de Chromium en `npm run pdf:prisma`).
- **Tipografías de respaldo con medida:** cada fuente web (Bodoni Moda, Archivo, Newsreader, Space Grotesk) tiene dos respaldos locales (Times/Arial y Noto/DejaVu) con `size-adjust` medido en Chromium y altura (`ascent-override`, `descent-override`) tomada de la propia fuente; uno aparte para Space Grotesk en negrita. Mientras llega la fuente, el texto ocupa casi lo mismo y la página ya no salta.
- **Umbral:** la rejilla de las páginas ya no se ensancha cuando un título largo no cabe con la fuente de respaldo (era la causa del salto de «Otra perspectiva»); fotos de 1200 px intermedias; dentro de las letras del cartel, la foto de 800 px en celular; cada rebanada y el recorte piden el tamaño que realmente ocupan; el recorte del cartel con prioridad alta.
- **Rubor:** la entrada de la portada ya no parte de transparente (retrasaba la carga de la figura); la cabecera se revela de arriba abajo. La foto de la cuenta usa la versión ligera en celular.
- Se probó precargar las fuentes al abrir cada revista: empeoró la carga de la foto principal y se descartó.

## Pendiente

Pasada final de diseño (patrones, selección, foco, barras de desplazamiento, `impeccable` y `web-design-guidelines`), detector de textos encimados en todas las páginas, documentación de V4.7.5 a V4.7.11, Documento Maestro y revisión en teléfono.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.17.md](VALIDACION_V4.7.17.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
