# Estado de V4.7.18 · Revista digital: pasada final de diseño y documentación

21 de noviembre de 2026. Segunda parte del cierre técnico de Revista.

## Construido en esta entrega

- **Textos encimados:** detector de la sesión en las 27 páginas de las tres revistas y 7 tamaños (de 320 × 568 a 1980 × 870). Se corrigió que las páginas nuevas de Rubor (cuenta, secciones, detrás de cámaras y créditos) empezaran debajo de la cabecera flotante en celular y tableta; la cursiva de Bodoni que tocaba la línea de arriba o de abajo, y el título con enlace del cierre de Umbral. Quedan solo avisos falsos conocidos (enlaces partidos en dos renglones, párrafos de columnas y desplegables cerrados).
- **`impeccable detect`** en seis páginas nuevas: se quitaron la etiqueta sobre el título en Cuenta, «Detrás de cámaras», los dossiers y las láminas de Umbral (la cabecera corrida ya dice la sección); la franja de color del manuscrito de Prisma; el espaciado ancho de un pie de foto; y se dio contraste a los textos de ejemplo del manuscrito y al símbolo de área.
- **Barras de desplazamiento** con el tono de cada revista y de la entrada; selección y foco ya estaban temáticos por revista.
- **Documentos de V4.7.5 a V4.7.11** completados: qué se hizo, qué pasó después (qué lo sustituyó) y su validación, con la nota de que el recorrido completo fallaba en `main` antes de V4.7.12.

## Patrones vigilados que quedan a propósito

- La cabecera corrida de cada página de Umbral («Umbral · N.º 07 · Noviembre 2026»): es la convención de revista, no una etiqueta decorativa.
- Títulos en serif cursiva de Rubor y resplandores de Prisma: pedidos por Ian con sus referencias (V4.7.0).
- La llamada comercial compartida (etiqueta sobre el título y h3 que salta de nivel) y la marca de agua: anotados en los pendientes de V4.8 (componentes compartidos).

## Pendiente

- Actualizar el Documento Maestro a V4.7 y marcar Revista como cerrada en `CLAUDE.md` cuando Ian dé el visto bueno en el teléfono.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.18.md](VALIDACION_V4.7.18.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
