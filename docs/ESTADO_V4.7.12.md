# Estado de V4.7.12 · Revista digital, correcciones

21 de noviembre de 2026. Base: `main` en V4.7.11 (`1afa7f4`).

## Construido en esta entrega

- Contraste de la cita (`blockquote`) y del pie de foto del interior de «Entre líneas»: una regla de Umbral les ponía verde y gris sobre fondo oscuro (1.3:1 y 2:1). Con esto el recorrido de navegador vuelve a pasar en `main`.
- El título que recibe el foco al cambiar de página (para lectores de pantalla) ya no muestra recuadro: no es un control.
- CHANGELOG ordenado: V4.7.3 a V4.7.11 con su fecha, en orden y sin mezclarse con V4.7.2.
- `CLAUDE.md` actualizado con las decisiones de Ian del 21/11/2026 (Umbral desde cero, nivel de detalle en todas las páginas, música por revista con bocina).

## Siguiente

V4.7.13: bocina flotante y una pista por revista. Después, Umbral desde cero; luego el detalle de las páginas de Rubor y Prisma; al final, el cierre.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.12.md](VALIDACION_V4.7.12.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
