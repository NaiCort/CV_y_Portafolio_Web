# Estado de V4.7.21 · Umbral: márgenes de página

21 de noviembre de 2026. Observación de Ian en su teléfono: en el colofón, el acento de «COLOFÓN» tocaba la línea de la cabecera corrida.

## Construido en esta entrega

- La causa era de especificidad: el reinicio de márgenes de Umbral (`.um-root :is(p, h1, …)`) ganaba a las clases propias, así que la cabecera corrida perdía sus 40 px de margen inferior. El reinicio ahora usa `:where()` (especificidad cero) y los márgenes previstos se aplican en todas las páginas: espacio bajo la cabecera corrida, lema, firma y el crédito de portada al pie de la página del dossier.
- `CLAUDE.md` vuelve a citar el Documento Maestro V4.6.8 como vigente: la versión V4.7 se hace al cerrar Revista, antes de V4.8 (decisión de Ian).

## Pendiente

- Visto bueno de Ian para cerrar Revista; después, el Documento Maestro V4.7 y la marca de cierre en `CLAUDE.md`.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.21.md](VALIDACION_V4.7.21.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
