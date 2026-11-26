# Validación de V4.10.6

**Entorno:** Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`, que aplica los encabezados de `vercel.json` (política de contenido aplicada). 26 de noviembre de 2026. Cada comando se comprobó con su propio código de salida, sin tuberías que lo oculten.

## Comandos y resultados

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Código 0 |
| `npm run format:check` | Código 0 |
| `npm test` | Código 0: 419 pruebas en 47 archivos; las 10 de `tests/v4106-patio.test.jsx` son nuevas |
| `npm run build` | Código 0 |
| `npm run audit:presupuesto` | Código 0: JavaScript inicial de 83.9 KB en la portada y 76.2 KB en las demás rutas (antes, 100.4 en ambas); CSS de 8.9 y 5.4 KB (antes, 8.8); ruta más pesada de 61.0 KB |

## Navegador

- **Suites**, todas con la versión final de la ayuda de auditoría:

  | Suite | Resultado |
  | --- | --- |
  | Patio 12, principal | 13 de 13, con el escenario nuevo de V4.10.6 |
  | Patio 12, V4.2.3 | 14 de 14 |
  | Patio 12, V4.2.4 | 7 de 7 |
  | Patio 12, V4.2.5 | 9 de 9 |
  | Psicólogo | 17 de 17 |
  | CV y cotizador | 5 de 5 |
  | Ladera | 5 de 5 |
  | Brío | 5 de 5 |
  | Rosales y Vértice | 5 de 5 |
  | Cotejo | 5 de 5 |
  | Revista | 5 de 5 |

  En total, 90 de 90. Cada escenario pasa axe y la revisión de desbordes, sin envíos reales ni avisos de la política de contenido.
- **Recorrido de humo de 11 rutas** (CV, cotizador, aviso, las siete demos y una ruta inexistente): un solo h1, sin errores de página y sin avisos de la política ni de precarga.
- **CV cargado aparte:**
  - estilo desde el primer cuadro (la tipografía del CV ya aplica);
  - hidratación sin avisos;
  - ida y vuelta al cotizador sin recargar.
- **Colores como variables:** 18 capturas (9 escenas con diálogos, a 390 y 1280 px), idénticas píxel por píxel antes y después.
- **Respaldos de tipografía:** 16 de las 18 capturas, idénticas. En las otras 2, solo cambia el texto de un `<select>` cerrado. Chromium lo dibuja con el respaldo aunque la fuente ya cargó, como antes; ahora el respaldo mide como DM Sans (138.9 px contra 140.7 px; el genérico medía 136.1 px).
- **Mapas:**
  - el directorio, la ficha de Xalapa y Psicólogo cargan con sus marcas y sin advertencias del estilo;
  - el estilo de color de Patio 12 tiene los tres filtros que las causaban.
- **Movimiento** (teléfono de 390 px):
  - el título se ve desde el primer cuadro, el sello se estampa y la foto se asienta;
  - las 6 secciones de más abajo esperan, y al bajar ninguna queda oculta;
  - con movimiento reducido, solo fundidos;
  - un plegable se abre de forma gradual (65, 215 y 273 px).
- **Textos encimados:** 0 casos en 6 páginas de Patio 12 a 7 tamaños. En V4.10.5, Psicólogo dio 0 por tema.
- **Fotos de la carta:** recorrerla entera en un teléfono de pantalla 3x baja 887 KB, contra 2.8 MB con las fotos originales.
- **Carga** (`npm run audit:cwv`: teléfono de 390 px, 4G lenta y CPU 4 veces más lenta):

  | Página | V4.10.5 | V4.10.6 |
  | --- | --- | --- |
  | `/` (CV) | 1.24 a 1.28 s | 1.19 a 1.27 s |
  | `/restaurante` | 1.96 s | 2.18 a 2.20 s |
  | `/restaurante/carta` | 2.01 s | 1.87 a 1.97 s |
  | `/restaurante/locales` | 1.96 s | 1.80 a 1.85 s |
  | `/restaurante/locales/xalapa` | 1.85 s | 1.80 a 1.91 s |
  | `/restaurante/conocenos` | 4.39 s | 2.24 a 2.32 s |
  | `/restaurante/pedido` | 1.84 s | 1.71 a 1.73 s |
  | `/psicologo` (Sala con luz) | 2.04 a 2.06 s | 1.90 s |
  | `/cotizador` | 1.47 a 1.49 s | 1.44 s |

  CLS de 0.000 a 0.019. El detalle está en `RENDIMIENTO.md`.

## Incidencias durante la entrega

- **CV:** con las precargas nuevas delante, su foto llegaba más tarde (1.47 s). La precarga de la foto pasó al principio de la cabecera y volvió a 1.2 s.
- **Inicio de Patio 12:** sin la etiqueta, la portada quedó más corta y la foto pasó a ser el elemento principal (2.88 s). Con su precarga, 2.2 s.
- **Conócenos:** 4.39 s por una foto de 432 KB. Con los tamaños nuevos, 2.80 s; con la precarga, 2.2 a 2.3 s.
- **Axe a medio movimiento:** en Patio 12, axe midió textos a medio aparecer. La ayuda de auditoría ahora espera las animaciones de la portada y de las secciones de Patio 12.
  - Un primer intento esperaba todas las animaciones de la página y se quedaba sin tiempo en Ladera, Cotejo y Revista, que tienen animaciones largas.
  - Se volvió a esperar solo los elementos con nombre, y las 11 suites se corrieron de nuevo con esa versión.
- **Suite de V4.2.4:** esperaba los nombres de las animaciones viejas (entrada de página, resultados y avisos), que se cambiaron a propósito. Se actualizó a las nuevas.
- **Prueba de rutas:** con toda la suite corriendo, el título de la pestaña llegaba un momento después del CV. La prueba ahora espera los dos.

## Puertas del handbook (G0 a G7)

| Puerta | Estado | Evidencia |
| --- | --- | --- |
| G0 Producto | Aprobado | Decisiones de Ian del 26/11/2026 y lista fija de `PLAN_V4.8.md` |
| G1 Arquitectura | Aprobado | Ruta del restaurante con su estado; CV cargado aparte, con su código precargado según el manifiesto; mapa base compartido. Sin rutas nuevas |
| G2 Diseño | Aprobado en pruebas; falta la revisión de Ian | Ficha a posteriori, patrones vigilados reducidos y movimiento con su versión reducida |
| G3 Implementación | Aprobado | Lint, formato, 419 pruebas, compilación y presupuesto |
| G4 Seguridad | Aprobado | Política aplicada sin avisos en las 11 suites y las 11 rutas. Aviso de privacidad de ejemplo con borrado. El manifiesto de la compilación no se publica |
| G5 Accesibilidad automatizada | Aprobado | axe en los 90 escenarios |
| G5 Accesibilidad manual | No ejecutado | TalkBack y teclado en el teléfono de Ian |
| G6 Rendimiento | Aprobado | Presupuesto más bajo; Patio 12 entre 1.71 y 2.32 s; CV en 1.2 s. Taller (2.77 s, sin medición anterior) va en su entrega |
| G7 Publicación | No ejecutado | Ian integra. Después, consola del sitio publicado en InPrivate (`DESPLIEGUE.md`) |

## No comprobado

- **Dispositivos de Ian:** su teléfono Android (Chrome o Edge) y Edge en su PC.
- **Consola del sitio publicado:** se revisa después de integrar.
- **Respaldos de tipografía en Android:** no tiene Times New Roman ni Arial, así que ahí sigue el respaldo genérico, como antes.
- **Medición con visitantes reales:** el sitio no tiene analítica, a propósito.
