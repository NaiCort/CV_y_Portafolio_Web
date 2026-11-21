# Estado de V4.7.7 · Prisma: publicación simulada y exploración por área

20 de noviembre de 2026. Hecho por Codex (PR #54); documento completado por Claude el 21 de noviembre de 2026 a partir de los commits, porque la versión original tenía de una a tres líneas.

## Construido en esta entrega

- Publicar una investigación: formulario con título, área, resumen, autores y PDF; solo se guarda el nombre del archivo, en el navegador (`lib/envios.js`).
- Perfil «Mis envíos» con tres estados simulados (enviado, en revisión, preimpresión publicada) y lectura de la preimpresión.
- Catálogo por área con filtros de estado y orden, que incluye las preimpresiones propias.
- Página «Cómo se sostiene Prisma».
- Privacidad borra también los envíos.

## Qué pasó después

Rediseñado en V4.7.15: manuscrito en papel, recorrido animado por envío, tabla periódica de áreas y sostenimiento con reparto del gasto. La lógica de envíos se conserva.

## Implementado, verificado y desplegado

- Implementado: sí.
- Verificado en pruebas: ver [VALIDACION_V4.7.7.md](VALIDACION_V4.7.7.md).
- Desplegado en producción: sí, al fusionarse en `main`; revisión de Ian en teléfono no registrada.
