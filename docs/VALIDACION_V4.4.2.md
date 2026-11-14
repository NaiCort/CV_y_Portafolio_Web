# Validación de V4.4.2

Entorno: Node 22, Chromium de Playwright, compilación de producción con `vite preview` y mosaicos de OpenFreeMap. 14 de noviembre de 2026. El visto bueno de Ian sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. **133 pruebas en 18 archivos**; la de elección de sucursal se reescribió: la primera sucursal empieza abierta, elegir otra la abre con sus datos y cierra la anterior.
- Medido en Chromium a 1440 px, a 1024 px y en un iPhone 13 emulado:
  - altura del mapa y de la lista iguales en escritorio (508 y 508 px a 1440; 377 y 377 px a 1024); en el teléfono la lista va completa debajo;
  - al elegir Natura en la lista, su marca queda en el centro del mapa (desfase de 0 a 1 px);
  - al elegir Macuiltépetl desde su marca, su fila queda abierta y visible dentro de la lista, y la página no se mueve.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA) en Inicio con el mapa cargado y en Créditos, a 1440 y 390 px, en los dos temas: **sin infracciones**.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals.
