# Validación de V4.10.5

**Entorno:** Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`, que aplica los encabezados de `vercel.json` (política de contenido aplicada). 26 de noviembre de 2026. Cada comando se comprobó con su propio código de salida, sin tuberías que lo oculten.

## Comandos y resultados

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Código 0 |
| `npm run format:check` | Código 0 |
| `npm test` | Código 0: 409 pruebas en 46 archivos; las 8 de `tests/v4105-psicologo.test.jsx` son nuevas |
| `npm run build` | Código 0 |
| `npm run audit:presupuesto` | Código 0: JavaScript inicial de 100.4 KB (antes 100.0), CSS de 8.8 KB, ruta más pesada de 61.0 KB |

## Navegador

- **Suites:**

  | Suite | Resultado |
  | --- | --- |
  | Psicólogo | 17 de 17: los tres temas en cinco anchos, «Cambio de tema y recuerdo» y el escenario nuevo «Velo, respiración y mapa» |
  | CV y cotizador | 5 de 5 |

  Cada escenario pasa axe y la revisión de desbordes, sin envíos reales ni avisos de la política de contenido.

  Las demás suites no se corrieron: sus demos no cambiaron. Las piezas compartidas que sí cambiaron (`main.jsx` y `rutasDemo.js`) se probaron con el recorrido de humo.
- **Recorrido de humo de 11 rutas** (CV, cotizador, aviso, las siete demos y una ruta inexistente): cada una con un solo h1, sin errores de página y sin avisos de la política ni de precarga.
- **Cambio de tema:**
  - el velo aparece con el nombre del tema nuevo, la página vuelve arriba (de 7685 px a 0) y el velo se retira;
  - con movimiento reducido, no hay velo.
- **«Respira conmigo»:**
  - antes de empezar, el disco está en escala 0.04 y opacidad 0;
  - a los 2 s de inhalar, en 0.51 y 0.49;
  - al detener, vuelve a 0.04 y 0;
  - en marcha, la palabra y el número no se enciman y quedan dentro del anillo, en los tres temas, a 320, 390 y 1440 px.
- **Mapa:** sin advertencias del estilo. Solo quedan mensajes del controlador gráfico del navegador sin pantalla que usan las pruebas; no aparecen en un navegador normal.
- **Preguntas y notas:** la altura se anima al abrir (de 95 a 145 px).
- **Textos encimados** (`npm run audit:encimados`, siete tamaños de 320 a 1980 px): 0 casos en cada tema, fijado con `DEMO_STORAGE`.
- **Carga** (`npm run audit:cwv`: teléfono de 390 px, 4G lenta y CPU 4 veces más lenta):

  | Tema o ruta | LCP | CLS |
  | --- | --- | --- |
  | Psicólogo, Sala con luz | 2.04 a 2.06 s | 0.000 |
  | Psicólogo, Neblina | 2.21 a 2.22 s (antes, 3.9 s) | 0.053 |
  | Psicólogo, Cuaderno | 1.89 a 2.00 s, en 8 corridas | 0.035 |
  | `/` | 1.26 s | 0.000 |
  | `/cotizador` | 1.47 s | 0.019 |
  | `/privacidad` | 1.41 s | 0.091 |

  El detalle y la comparación con V4.10.4 están en `RENDIMIENTO.md`.
- **Foto de 1200 px de Neblina:** comparada a tamaño real (pantalla 3x) con la de 2000 px, bajo el velo oscuro de la portada no se distingue.

## Incidencias durante la entrega

- **Neblina tardaba 3.9 s desde V4.10.2.** Apareció al medir cada tema por separado. Se corrigió en esta entrega con el tamaño intermedio de la foto y la precarga.
- **La precarga empeoraba Sala con luz y Cuaderno** (2.4 y 2.7 s), así que solo se usa en Neblina.
- **Carga de la portada:** el primer diseño fundía también el título y el párrafo de entrada, y dejaba a Cuaderno por encima de 2.5 s en 3 de 6 corridas. Se cambió para que solo se escalonen botones, nota y cédula.

## Puertas del handbook (G0 a G7)

| Puerta | Estado | Evidencia |
| --- | --- | --- |
| G0 Producto | Aprobado | Pedido de Ian del 26/11/2026; DEC-025 a DEC-028 |
| G1 Arquitectura | Aprobado | Sin rutas ni datos nuevos. `estiloMapa.js` y `portadas.js` son piezas pequeñas, con pruebas. La precarga solo actúa en `/psicologo` con Neblina |
| G2 Diseño | Aprobado en pruebas; falta la revisión de Ian | Movimiento dentro de la Guía (ease-out de 200 a 300 ms, escala 0.95), salvo «Respira conmigo», que sigue el ritmo de la respiración a pedido de Ian. Versión de movimiento reducido; ficha actualizada |
| G3 Implementación | Aprobado | Lint, formato, 409 pruebas, compilación y presupuesto |
| G4 Seguridad | Aprobado | Política aplicada sin avisos en las suites y en las 11 rutas. La foto nueva y la precarga vienen del propio sitio |
| G5 Accesibilidad automatizada | Aprobado | axe en los 22 escenarios. Con movimiento reducido, sin velo y sin cambios de tamaño |
| G5 Accesibilidad manual | No ejecutado | TalkBack y teclado en el teléfono de Ian |
| G6 Rendimiento | Aprobado | Presupuesto. Los tres temas de Psicólogo y las rutas principales cargan en 2.5 s o menos |
| G7 Publicación | No ejecutado | Ian integra. Después, consola del sitio publicado en InPrivate (`DESPLIEGUE.md`) |

## No comprobado

- **Dispositivos de Ian:** su teléfono Android (Chrome o Edge) y Edge en su PC.
- **Consola del sitio publicado:** se revisa después de integrar.
- **Navegadores sin `::details-content`:** abren las preguntas sin transición (Firefox y Safari no son pendientes, DEC-003).
- **Medición con visitantes reales:** el sitio no tiene analítica, a propósito.
