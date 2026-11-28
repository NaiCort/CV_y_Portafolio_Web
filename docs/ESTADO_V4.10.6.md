# Estado de V4.10.6 · Patio 12 y una carga más ligera para todas las demos

26 de noviembre de 2026. Primera entrega de V4.10 después de Psicólogo, con la lista fija de `PLAN_V4.8.md`. Antes de empezar, Ian respondió las decisiones abiertas (ver «Decisiones»).

## Decisiones de Ian

Registradas en `DECISIONES.md`:
- **DEC-019:** numeración consecutiva, aceptada.
- **DEC-021:** aligerar la carga de todas las demos, aceptada y ampliada.
- **DEC-022 y DEC-023:** descartadas por ahora. Ian revisa la vista previa, y las dependencias se revisan en cada entrega.
- **DEC-024:** domicilio y revisión legal del aviso, al final de todo (después de V4.11).
- **DEC-009:** el portafolio se queda en Vercel y pasa a Vercel Pro antes de recibir solicitudes reales.
- **Nuevas, para V4.11:**
  - DEC-029: hospedaje de los clientes, explicado para ellos;
  - DEC-030: el dominio siempre es del cliente;
  - DEC-031: plan de mantenimiento web y correo como opciones;
  - DEC-032: un desplegable en lenguaje sencillo en cada opción de «Ajuste» del cotizador.

  También quedaron en `PLAN_V4.8.md` y `FICHA_COTIZADOR.md`.

## Construido

### Carga más ligera para todas las demos (DEC-021)

- **El estado de Patio 12 y su contador** llegan con su ruta (`RestauranteRuta.jsx`), no con el paquete común. La visita no se pierde al salir y volver: se guarda en el navegador, y sus relojes usan la hora de término.
- **El código del CV se carga aparte:**
  - la portada llega prerenderizada, enlaza el CSS del CV y precarga su código;
  - los nombres salen del manifiesto de la compilación, que `scripts/prerender.mjs` borra al terminar;
  - la precarga de la foto del CV va al principio de la cabecera, para que no la retrasen las demás.
- **Resultado:**
  - las demos bajan de 100.4 a 76.2 KB de JavaScript inicial y de 8.8 a 5.4 KB de CSS (gzip);
  - el CV conserva su carga de 1.2 s.
- **Presupuesto:** `npm run audit:presupuesto` mide la portada y las demás rutas por separado, con límites más bajos (`RENDIMIENTO.md`).

### Mapa base compartido (DEC-028)

`src/lib/mapaBase.js` reúne lo que repetía cada motor de mapa:
- MapLibre sin clave;
- controles en español y gestos cooperativos;
- atribución;
- el estilo corregido;
- el ajuste de tamaño.

Patio 12 lo usa y, con él, el estilo corregido: su estilo de color tenía los mismos tres filtros que causaban las advertencias. Psicólogo también lo usa, sin cambio visible. Brío y Taller lo adoptan en su entrega.

### Patio 12

- **Ficha a posteriori** (`docs/FICHA_RESTAURANTE.md`): paleta, tipografía, forma, movimiento, anclas y patrones vigilados.
- **Patrones:**
  - sin etiquetas en mayúsculas sobre los títulos, en todas las páginas (pendiente 4, ampliado);
  - sin numeración decorativa ni el mismo ícono de ubicación en cada tarjeta de local;
  - las modalidades de Inicio, como renglones de carta.
- **Menos aclaraciones repetidas (DEC-005):**
  - se quedan el aviso de demo, la franja del local simulado, los alérgenos y nutrientes, el alcohol, el equipo ficticio y «no existe un Patio 12 en este lugar»;
  - salen las notas repetidas de la portada, de los conteos y de los horarios.
- **Aviso de privacidad de ejemplo**, con la forma del de Taller:
  - lo que guarda;
  - el mapa y la ubicación;
  - lo que pediría un restaurante real;
  - «Borrar mis datos de esta demo».

  Sale el texto viejo que decía que la portada y Psicólogo usaban Google Fonts y Unsplash.
- **«Cotiza un sitio como este»** con `patio-12`, y una descripción propia en cada página.
- **Guía «Cómo funciona»:** ya no promete otras identidades del restaurante (se descartaron).
- **Colores, radios y tipografías como variables.** Se comprobó con 18 capturas de páginas y diálogos: idénticas, píxel por píxel.
- **Respaldos medidos** de Bitter (114.1 %) y DM Sans (102.1 %), pendiente 7.
- **Fotos en el tamaño justo:**
  - 46 fotos con versión de 480 px;
  - la del local en tres tamaños, desde el original de Unsplash;
  - registro con huella en `public/restaurante/fotos-origen-v4.10.6.json`.

  Recorrer la carta en el teléfono baja 887 KB de fotos en lugar de 2.8 MB.
- **Carga por página:** precarga de la foto principal al entrar directo a Inicio y a Conócenos. Conócenos bajó de 4.4 a 2.2 o 2.3 s, e Inicio queda en 2.2 s (sin la etiqueta, su foto pasó a ser el elemento principal).
- **Movimiento «servir la mesa»:**
  - el sello «12» se estampa y la foto de portada se asienta, sin fundirse;
  - botones y datos de la portada llegan después del título;
  - las secciones de más abajo se asientan al aparecer;
  - las fotos se acercan al pasar el ratón;
  - los botones ceden y los plegables se abren con suavidad;
  - con movimiento reducido, solo fundidos.

### Pruebas

- **`tests/v4106-patio.test.jsx`** (10 pruebas):
  - la ruta con su propio estado;
  - el armazón sin el restaurante ni el CV;
  - la portada que precarga el CV;
  - el aviso de privacidad y su borrado;
  - «Hablemos» y «Cotiza un sitio como este»;
  - descripciones por página;
  - sin etiquetas ni numeración;
  - fotos con 480 px, registro y huella;
  - precargas por página;
  - respaldos de las tipografías.
- **`verify-restaurante.mjs`:** escenario nuevo con movimiento, en teléfono. Revisa el título que no se funde, el sello, las secciones que esperan y se revelan, el aviso, el enlace al cotizador y el mapa sin advertencias.
- **`verify-restaurante-v424.mjs`:** las páginas ya no tienen animación de entrada, por decisión de la ficha; la prueba se actualizó a ese comportamiento.
- **`themes-routes.test.jsx`:** espera al CV, que ahora llega en su propio trozo, y a su título.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.10.6.md](VALIDACION_V4.10.6.md)).
- Desplegado en producción: sí. Ian lo integró en `main` (pull request #93, 26/11/2026).

## Pendiente

- **Ian:**
  - revisar Patio 12 en la vista previa;
  - revisar el CV y una demo cualquiera, para confirmar que la carga más ligera no cambió nada visible.
- **Taller:** su portada midió 2.77 s en el laboratorio (pendiente 11 de `CLAUDE.md`); va en su entrega.
- **Brío y Taller:** su motor de mapa pasa al mapa base compartido en su entrega.
- **Handbook:** en su siguiente versión, actualizar los límites del piloto y anotar las lecciones de V4.10.4 a V4.10.6.
- **Siguiente entrega:** Ladera (V4.10.7).
