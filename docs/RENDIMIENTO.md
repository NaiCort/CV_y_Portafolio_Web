# Rendimiento: presupuesto y mediciones

Regla GEN-011 y puerta G6 del Digital Development Handbook (adopción en `HANDBOOK.md`). Actualizado el 25/11/2026, en V4.10.3.

## Presupuesto

### Compilación

`npm run audit:presupuesto` mide sobre `dist/`, con gzip, lo que descarga el navegador. Corre en CI después de compilar y falla si algo se pasa.

| Medida | Qué incluye | Presupuesto | V4.10.3 |
| --- | --- | --- | --- |
| JavaScript inicial | El script de entrada y sus precargas, para la portada o para cualquier otra ruta, antes del código propio de cada demo | 110 KB | 100.0 KB |
| CSS inicial | Hojas que enlaza el HTML de entrada | 12 KB | 8.8 KB |
| Trozo de ruta más pesado | El código propio de una demo o del cotizador, sin el motor del mapa (MapLibre), que solo baja al acercarse a un mapa | 70 KB | 61.0 KB (Revista) |

**Por qué estas cifras:** son lo medido en V4.10.3 con unos 10 KB de margen. Así, cualquier crecimiento se nota y se decide a propósito. Al bajar el paquete principal (DEC-021), el presupuesto se ajusta hacia abajo.

### Laboratorio

`npm run audit:cwv -- /ruta`, sobre `vite preview`, simula un teléfono de 390 px con red 4G lenta y CPU 4 veces más lenta.

| Medida | Meta |
| --- | --- |
| LCP (carga del elemento principal) | 2.5 s o menos |
| CLS (desplazamiento de contenido) | 0.1 o menos |

Es una medición de laboratorio, no de visitantes reales. Para datos de campo haría falta analítica, que hoy el sitio no tiene a propósito (`/privacidad`).

## Mediciones de V4.10.3

| Ruta | LCP | CLS | Elemento principal |
| --- | --- | --- | --- |
| `/` | PENDIENTE | | |
| `/cotizador` | PENDIENTE | | |
| `/psicologo` | PENDIENTE | | |
| `/privacidad` | PENDIENTE | | |

## Cambios de esta versión

- **El cotizador y el aviso de privacidad se cargan aparte** (`src/rutasDemo.js`). El trozo principal bajó de 113.8 a 83.2 KB comprimidos (gzip estándar, mismo método en las dos medidas).
- **Precarga:** el CV precarga el cotizador al pasar el cursor por su enlace o al enfocarlo, así que el clic no espera.

## Lo que sigue en el paquete principal

**El estado de Patio 12** (`RestaurantProvider`) y su contador flotante viven en `App.jsx` porque el contador acompaña al pedido entre páginas. Sacarlos a la ruta del restaurante va en la entrega de Patio 12 (DEC-021).

**Otros trozos compartidos:** framer-motion y los íconos se reparten entre las demos. El presupuesto vigila que no crezcan.
