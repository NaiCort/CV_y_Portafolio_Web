# Validación de V4.7.3

## Comprobaciones

- `npm test`: 318 pruebas aprobadas en 37 archivos.
- `npm run lint`: aprobado.
- `npm run format:check`: aprobado.
- `npm run build`: compilación de producción aprobada.
- `npm run test:browser:revista`: 5 escenarios aprobados sobre la compilación local,
  con 17 rutas en 320, 390, 768, 1024 y 1440 px. Incluye axe, límites horizontales,
  navegación, búsqueda completa, foco por teclado, Umbral, guardados entre pestañas y borrado.
- Inspección visual de la portada de Umbral en capturas de escritorio y móvil.
- `impeccable detect` sobre los dos archivos nuevos de presentación: sin hallazgos de regex.
  Este análisis de fuente no ejecuta sus reglas de contraste ni de elementos renderizados;
  no se presenta como una auditoría visual completa.

El recorrido automatizado recibió dos correcciones de sincronización y selección: nombre
accesible explícito del botón de guardar y espera de la lista tras navegar a guardados.

## Publicación

Rama publicada en GitHub. [PR #48](https://github.com/NaiCort/Multiples_Demos/pull/48) abierto para revisión.

## Límites

Sin revisión en teléfono físico, Safari o lector de pantalla. No se afirma conformidad WCAG
completa por pasar axe. Los PDF de Prisma no fueron regenerados: su etiquetado sigue pendiente.
Las cifras de rendimiento de versiones anteriores no se atribuyen a esta entrega. No se han
medido Core Web Vitals de campo ni se da Revista por cerrada.
