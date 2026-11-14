# Validación de V4.4.1

Entorno: Node 22, Chromium de Playwright, compilación de producción servida con `vite preview`, con acceso a `tiles.openfreemap.org`. 14 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. MapLibre queda en su propio bloque diferido, compartido con Patio 12; el código propio del mapa de Brío pesa 2 kB.
- **133 pruebas en 18 archivos.** Nueva: las cinco sucursales están dentro de Xalapa, con referencia de OpenStreetMap y sin coordenadas repetidas. Ajustadas: elección de sucursal (la lista marca su botón) e Inicio (tarjetas de planes para el teléfono y botón para cargar el mapa cuando no hay `IntersectionObserver`).
- **Giro del disco** medido en un iPhone 13 emulado, de 100 en 100 px de desplazamiento: el ángulo cambia en cada paso mientras el disco está a la vista y se detiene al salir.
- **Mapa** a 1440 px y en el iPhone 13 emulado: mosaicos cargados, cinco marcas visibles y fuera de la ficha; elegir Tecajetes desde la marca actualiza la ficha y la lista. Se corrigió un lienzo de altura cero (la hoja de MapLibre imponía `position: relative`) y una franja sin dibujar (ahora el mapa se redimensiona con su caja).
- Sin desbordamiento horizontal a 390 px.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA) en Inicio, con el mapa cargado, y en Créditos, a 1440 y 390 px en los dos temas: **sin infracciones**. Se corrigieron el contraste de la etiqueta de una marca sobre la ficha (ahora cada etiqueta tiene fondo propio) y el lema del plan destacado en Distrito.

## No comprobado todavía

Teléfono físico (pendiente de Ian), Safari, lector de pantalla y Core Web Vitals medidos.
