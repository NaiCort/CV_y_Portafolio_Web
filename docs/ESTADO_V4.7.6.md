# Estado de V4.7.6 · Rubor: suscripción, secciones y detrás de cámaras

20 de noviembre de 2026. Hecho por Codex (PR #53); documento completado por Claude el 21 de noviembre de 2026 a partir de los commits, porque la versión original tenía de una a tres líneas.

## Construido en esta entrega

- Cuenta de ejemplo con planes mensual (79 MXN) y anual (790 MXN) simulados, renovación visible y cancelación inmediata (`lib/suscripcion.js`).
- Notas de la editora para los 22 números de archivo (`data/notasRubor.js`): con suscripción se leen en cada número de archivo; sin ella, el número invita a suscribirse.
- Página de secciones (Moda, Belleza, Celebridades y Alfombra roja) y «Detrás de cámaras» del número actual.
- Privacidad también borra la suscripción simulada.

## Qué pasó después

Rediseñado en V4.7.15: cupón recortable y carnet de lectora, índice por sección en pliego y hoja de contactos con fotos propias de Rubor. La lógica de suscripción y las notas se conservan.

## Implementado, verificado y desplegado

- Implementado: sí.
- Verificado en pruebas: ver [VALIDACION_V4.7.6.md](VALIDACION_V4.7.6.md).
- Desplegado en producción: sí, al fusionarse en `main`; revisión de Ian en teléfono no registrada.
