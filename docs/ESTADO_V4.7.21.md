# Estado de V4.7.21 · Umbral: márgenes de página

21 de noviembre de 2026. Observación de Ian en su teléfono: en el colofón, el acento de «COLOFÓN» tocaba la línea de la cabecera corrida.

## Construido en esta entrega

- La causa era de especificidad: el reinicio de márgenes de Umbral (`.um-root :is(p, h1, …)`) ganaba a las clases propias, así que la cabecera corrida perdía sus 40 px de margen inferior. El reinicio ahora usa `:where()` (especificidad cero) y los márgenes previstos se aplican en todas las páginas: espacio bajo la cabecera corrida, lema, firma y el crédito de portada al pie de la página del dossier.
- `CLAUDE.md` vuelve a citar el Documento Maestro V4.6.8 como vigente: la versión V4.7 se hace al cerrar Revista, antes de V4.8 (decisión de Ian).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.21.md](VALIDACION_V4.7.21.md)).
- Desplegado en producción: sí (pull request 64; comprobado en multiples-demos.vercel.app).

## Cierre de Revista

Ian dio el visto bueno el 21 de noviembre de 2026 («Ya puedes continuar», después de revisar en su teléfono). V4.7.21 está en `main` (pull request 64) y en producción (comprobado en multiples-demos.vercel.app). Revista queda cerrada y con ella las siete demos. Se generó el Documento Maestro V4.7.21 (revisión documental 7, PARTE XVI, secciones 101 a 112) y `CLAUDE.md` lo cita como vigente. Sigue la fase de ajustes V4.8.
