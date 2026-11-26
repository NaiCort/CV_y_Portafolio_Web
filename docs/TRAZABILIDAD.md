# Trazabilidad: requisito, implementación y prueba

Plantilla TRACEABILITY del Digital Development Handbook (regla GEN-004; adopción en `HANDBOOK.md`). Actualizado el 26/11/2026, en V4.10.6.

**Qué cubre:**
- los requisitos transversales;
- el cotizador;
- Psicólogo y Patio 12, las dos primeras demos de V4.10.

Las demás demos ya tienen pruebas (`tests/` y `scripts/verify-*.mjs`). Su matriz se escribe en su entrega de V4.10, junto con sus cambios.

**Estados:**
- **Aprobado:** la prueba corrió y pasó en la versión indicada.
- **No ejecutado:** la prueba existe pero no se corrió en esa versión.
- **Pendiente:** falta la prueba.

## Transversales

| ID | Requisito | Implementación | Prueba | Estado (V4.10.3) |
| --- | --- | --- | --- | --- |
| RF-001 | Toda simulación lo declara (principio rector) | `DemoBanner` en cada demo; textos «simulado» o «de ejemplo» en cada flujo | Suites de navegador: ninguna demo envía peticiones reales (`scripts/restaurant-browser.mjs`, `submissions`) | Aprobado |
| RF-002 | Hay un contacto real con Ian, separado de las acciones del negocio | `ComercialCTA` («Hablemos») y el banner, presentes en cada demo | Patio 12: `tests/v4106-patio.test.jsx` («Hablemos» lleva a WhatsApp). Demás demos: en su entrega de V4.10 | Parcial |
| RF-003 | Cada demo lleva a cotizar «un sitio como este» con su identificador | Prop `cotizar` de `ComercialCTA` | Psicólogo: `themes-routes.test.jsx` y `verify-psicologo.mjs`. Patio 12: `v4106-patio.test.jsx` y `verify-restaurante.mjs`. Demás demos: en su entrega | Parcial |
| RNF-001 | Un solo h1 y metadatos propios por ruta | `usePageMetadata` | Suites de navegador (cuentan los h1) | Aprobado |
| RNF-002 | Accesibilidad automatizada sin fallos (WCAG 2.0 a 2.2 A y AA) | Componentes y fichas | axe en `audit()` de todas las suites | Aprobado |
| RNF-003 | Sin desborde horizontal de 320 a 1440 px | CSS de cada demo | `bounds()` en todas las suites | Aprobado |
| RNF-004 | Movimiento reducido respetado | `MotionConfig reducedMotion="user"` y CSS | Suites con `reducedMotion: "reduce"` en cuatro de cinco anchos | Aprobado |
| RNF-005 | Presupuesto de rendimiento | Carga diferida por ruta; desde V4.10.6, el paquete común sin el estado de Patio 12 ni el código del CV | `npm run audit:presupuesto` (CI), que mide la portada y las demás rutas por separado | Aprobado |
| RNF-006 | Encabezados de seguridad y política de contenido, aplicada desde V4.10.4 | `vercel.json` y su copia en la vista previa (`vite.config.js`) | `tests/v4103-handbook.test.jsx`; las ocho suites con la política aplicada | Aprobado |
| RNF-007 | El sitio real tiene aviso de privacidad | `src/pages/Privacidad.jsx`, enlazado desde el CV y el cotizador | `v4103-handbook.test.jsx`; `verify-cv.mjs` | Aprobado |
| RNF-008 | Sin vulnerabilidades altas en dependencias de producción | `package.json` | `npm audit --omit=dev --audit-level=high` (CI) | Aprobado |

## Cotizador

| ID | Requisito | Implementación | Prueba | Estado |
| --- | --- | --- | --- | --- |
| RF-C01 | El precio sale del catálogo: funciones, mínimo, calidad, lanzamiento, IVA, plazo y anticipo | `src/lib/cotizacion.js` | `tests/v49-cotizador-calculo.test.js` | Aprobado |
| RF-C02 | Reglas entre funciones: núcleo, dependencias, exclusiones y cambio de tipo | `cotizacion.js` | `v49-cotizador-calculo.test.js` («reglas entre funciones»); `v49-cotizador.test.jsx` | Aprobado |
| RF-C03 | Desde una demo o su tema, parte de su versión recomendada | `deParametros` y `PUNTOS_DE_PARTIDA` | `v49-cotizador.test.jsx`; `v49-cotizador-calculo.test.js` (`demo=psicologo-sala`) | Aprobado |
| RF-C04 | Cada paso es una entrada del historial y «Atrás» vuelve a donde estaba | `Cotizador.jsx` | `verify-cv.mjs` | Aprobado |
| RF-C05 | El envío pide el nombre y abre WhatsApp o el correo; el sitio no guarda nada | `src/lib/solicitud.js` | `v49-cotizador.test.jsx` («el envío pide el nombre…»); `verify-cv.mjs` | Aprobado |
| RF-C06 | «Vuelve al cotizador» solo aparece si se llegó desde el cotizador | `VolverCotizador.jsx` | `tests/v491-volver-cotizador.test.jsx`; `verify-cv.mjs` | Aprobado |
| RF-C07 | Aviso de privacidad junto al envío | `Cotizador.jsx` (paso «Revisa y envía») | `verify-cv.mjs` visita `/privacidad` | Aprobado |
| RF-C08 | En V4.11, el servidor recalcula el precio y valida los datos | Pendiente (V4.11) | Pendiente | Pendiente |

## Psicólogo (V4.10.2)

| ID | Requisito | Implementación | Prueba | Estado |
| --- | --- | --- | --- | --- |
| RF-P01 | Agenda con los cinco estados, zona horaria y recordatorio simulado | `components/Agenda.jsx` y `lib/agenda.js` | `verify-psicologo.mjs`; `tests/v4102-agenda.test.js` | Aprobado |
| RF-P02 | Ningún formulario pide datos de salud ni texto libre | `Agenda.jsx` y `Contacto.jsx` | `themes-routes.test.jsx` (sin `textarea` en el contacto) | Aprobado |
| RF-P03 | Ayuda en crisis con teléfonos reales | `piezas.jsx` (`Crisis`) | `themes-routes.test.jsx`; `verify-psicologo.mjs` | Aprobado |
| RF-P04 | Cédula visible y verificable | `piezas.jsx` (`Cedula`) | `themes-routes.test.jsx` | Aprobado |
| RF-P05 | Sin testimonios ni reseñas inventadas (DEC-014) | `piezas.jsx` (`Resenas`) | `verify-psicologo.mjs` («no muestra opiniones inventadas») | Aprobado |
| RF-P06 | Tres temas intercambiables que se recuerdan | `PsicologoApp.jsx` y `themeStorage.js` | `verify-psicologo.mjs` («Cambio de tema y recuerdo»); `themes-routes.test.jsx`; `storage.test.js` | Aprobado |
| RF-P07 | Fotos y tipografías servidas desde el sitio | `public/psicologo/` | `themes-routes.test.jsx`; `verify-psicologo.mjs` | Aprobado |
| RF-P08 | «Respira conmigo» solo corre cuando el visitante lo pide, y su figura nace, crece, se encoge y se apaga con el conteo (DEC-026) | `components/Respira.jsx` | `verify-psicologo.mjs` («Velo, respiración y mapa»); `tests/v4105-psicologo.test.jsx` | Aprobado |
| RF-P09 | Al cambiar de tema, la página vuelve arriba; con movimiento, a través de un velo con el nombre del tema (DEC-025) | `PsicologoApp.jsx` (`useCambioDeTema`) | `verify-psicologo.mjs` («Cambio de tema y recuerdo» y «Velo, respiración y mapa»); `v4105-psicologo.test.jsx` | Aprobado |
| RNF-P01 | El mapa del consultorio no deja advertencias en la consola (DEC-028) | `src/lib/estiloMapa.js` y `components/mapaMotor.js` | `verify-psicologo.mjs`; `v4105-psicologo.test.jsx` | Aprobado |
| RNF-P02 | La portada de cada tema carga en 2.5 s o menos (laboratorio de `RENDIMIENTO.md`) | `portadas.js` (tamaños de la foto y precarga de Neblina); `psicologo.css` (título y párrafo de entrada sin fundido) | `npm run audit:cwv` por tema (V4.10.5); `v4105-psicologo.test.jsx` (la precarga pide la misma foto que dibuja el tema) | Aprobado |

## Patio 12 (V4.10.6)

| ID | Requisito | Implementación | Prueba | Estado |
| --- | --- | --- | --- | --- |
| RF-R01 | Carta con personalización, carrito y pedido simulado | `pages/Carta.jsx`, `components/ItemPicker.jsx`, `components/OrderFlow.jsx` | `tests/restaurant*.test.jsx`; `verify-restaurante.mjs` y `verify-restaurante-v424.mjs` | Aprobado |
| RF-R02 | Locales con mapa bajo demanda, filtros por país y estado, y ficha de cada local | `pages/Locales.jsx`, `pages/LocalDetalle.jsx`, `components/DemoMap.jsx` | `restaurant-v425.test.jsx`; `verify-restaurante-v425.mjs` | Aprobado |
| RF-R03 | Espera de mesa, seguimiento y contador que conservan la visita al salir y volver | `RestauranteRuta.jsx`, `state/`, `components/FloatingTimer.jsx` | `restaurant-v422.test.jsx` y `restaurant-v423.test.jsx`; `verify-restaurante.mjs` y `verify-restaurante-v423.mjs` | Aprobado |
| RF-R04 | Aviso de privacidad de ejemplo: qué guarda, qué pediría un restaurante real y borrado | `components/Privacidad.jsx` | `v4106-patio.test.jsx`; `verify-restaurante.mjs` (escenario V4.10.6) | Aprobado |
| RF-R05 | Sin etiquetas en mayúsculas sobre los títulos ni numeración decorativa (pendiente 4, Guía v1.1) | Páginas y `components/LocationCard.jsx` | `v4106-patio.test.jsx`; `verify-restaurante.mjs` | Aprobado |
| RNF-R01 | El estado de Patio 12 y su contador no se descargan en las demás rutas (DEC-021) | `RestauranteRuta.jsx` | `v4106-patio.test.jsx`; `npm run audit:presupuesto` | Aprobado |
| RNF-R02 | Mapas sin advertencias en la consola (DEC-028) | `src/lib/mapaBase.js` y `components/mapEngine.js` | `verify-restaurante.mjs` (escenario V4.10.6) | Aprobado |
| RNF-R03 | Fotos en el tamaño justo, cada archivo con su registro y su huella | `data/fotos.js`; `public/restaurante/fotos-origen-v4.10.6.json` | `v4106-patio.test.jsx` | Aprobado |
| RNF-R04 | Cada página carga en 2.5 s o menos (laboratorio de `RENDIMIENTO.md`) | `portada.js` (precargas), `data/fotos.js` | `npm run audit:cwv` por página (V4.10.6); `v4106-patio.test.jsx` (precargas) | Aprobado |
| RNF-R05 | Metadatos propios por página | `RestauranteApp.jsx` (`usePageMetadata`) | `v4106-patio.test.jsx` | Aprobado |
| RNF-R06 | Movimiento con su versión reducida; el título y la foto principal no se funden al cargar | `restaurante.css` (movimiento de V4.10.6) y `useEntradas` | `verify-restaurante.mjs` (escenario V4.10.6 y anchos con movimiento reducido) | Aprobado |

## Discrepancias y pendientes

- **RF-002:** falta la prueba del contacto real en Ladera, Brío, Taller, Cotejo y Revista; va en sus entregas.
- **RF-003:** cuatro demos sin el enlace al cotizador: Ladera, Brío, Taller y Cotejo lo reciben en su entrega de V4.10. Revista no está en la lista de V4.10, así que queda a decisión de Ian.
- **Revisión manual de accesibilidad:** TalkBack y teclado completo, sin prueba automatizable (`SEGURIDAD.md`).
