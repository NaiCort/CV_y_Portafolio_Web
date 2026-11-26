# Estado de V4.10.5 · Psicólogo: cambio de tema, «Respira conmigo» y animaciones

26 de noviembre de 2026. Pedido de Ian, después de revisar en InPrivate la consola del sitio publicado:
- **Cambio de tema** (DEC-025): al cambiar de tema dentro de una demo, la página debe irse arriba, con una transición de por medio, para que no se disparen solas las animaciones de más abajo. Aplica donde cambia la estructura (Psicólogo y Taller), no en Brío, donde solo cambia la paleta.
- **«Respira conmigo»** (DEC-026): la figura de al lado se quedaba inerte. Debe ser invisible y diminuta antes de empezar, crecer al inhalar, encogerse hasta casi desaparecer al exhalar, y apagarse del todo al terminar o detener.
- **Animaciones** (DEC-027): más y mejores en las demos, empezando por Psicólogo.
- **Mapa** (DEC-028): las advertencias amarillas que vio Ian vienen del estilo de OpenFreeMap. No son de seguridad ni de la política de contenido.

Además, al medir la carga de cada tema por separado apareció un problema que venía de V4.10.2: la portada de Neblina tardaba 3.9 s en un teléfono (meta: 2.5 s). Se corrigió en esta misma entrega.

## Construido

- **Cambio de tema** (`PsicologoApp.jsx`, `useCambioDeTema`):
  - un velo con el color y el nombre del tema nuevo cubre la página (260 ms);
  - con la página cubierta, vuelve arriba y cambia el tema;
  - el velo se retira (300 ms).

  El selector marca el tema nuevo desde el primer momento, y pulsar el tema activo no hace nada. Con movimiento reducido no hay velo: el tema cambia y la página sube de inmediato.
- **«Respira conmigo»** (`components/Respira.jsx` y `psicologo.css`):
  - un anillo fijo y un disco que respira: crece al inhalar en 4 s, se encoge al exhalar en 6 s y se apaga en 0.9 s;
  - el conteo grande va en el centro;
  - cada tema le da su color y su forma: arcilla en Sala con luz, bruma azul lago en Neblina, marcatexto ocre de borde irregular en Cuaderno;
  - con movimiento reducido, el disco se aclara y se oscurece sin cambiar de tamaño.
- **Animaciones nuevas**, todas con versión de solo fundido para movimiento reducido:
  - **portada:** botones, nota y cédula entran escalonados, y la foto hace el gesto de su tema. La carga de la portada no funde el título, el párrafo de entrada ni la foto, para no retrasarla (en Cuaderno, un primer intento que fundía el título y el párrafo pasaba de 2.5 s en la mitad de las corridas):
    - Sala con luz: el arco se asienta;
    - Neblina: la niebla se despeja;
    - Cuaderno: la polaroid se acomoda;
  - **preguntas y notas de «Recursos»:** se abren con suavidad, con una flecha propia que gira (Chrome y Edge 131 o posterior; los demás navegadores abren sin transición);
  - **agenda:** transición entre pasos;
  - **Cuaderno:** las notas al margen se escriben de izquierda a derecha al aparecer su sección;
  - **botones:** ceden un poco al presionarlos.
- **Mapa sin advertencias** (`src/lib/estiloMapa.js`, nuevo y compartido):
  - las capas de escudos de carretera piden un número con respaldo, sin cambiar lo que se dibuja;
  - si el estilo pide una imagen que no existe, recibe una transparente.

  El motor del mapa de Psicólogo lo aplica antes de cargar el estilo.
- **Portada de Neblina a tiempo** (`docs/RENDIMIENTO.md`):
  - versión de 1200 px de la foto del bosque (97 KB en lugar de 233 KB), del mismo original y con el mismo proceso, registrada con su huella;
  - al entrar directo con Neblina, la foto se pide desde el principio (`src/giros/psicologo/portadas.js` y `precargarPortada` en `src/rutasDemo.js`);
  - `Foto` acepta cualquier número de tamaños, y la precarga y los temas leen la foto de portada del mismo lugar.

  Resultado: de 3.9 a 2.2 s. En Sala con luz y Cuaderno la precarga empeoraba la carga, así que no se usa.
- **Pruebas:**
  - `tests/v4105-psicologo.test.jsx` (8 pruebas):
    - vuelta arriba al cambiar de tema;
    - fases y apagado de la figura;
    - corrección del estilo del mapa e imagen faltante;
    - procedencia y huella de cada foto;
    - tamaños de la portada de Neblina;
    - la precarga pide la misma foto que dibuja el tema, y solo con Neblina;
  - en `scripts/verify-psicologo.mjs`, el cambio de tema exige volver arriba;
  - escenario nuevo con movimiento: velo, figura que nace, crece y se apaga, y mapa sin advertencias.
- **Documentos:**
  - `FICHA_PSICOLOGO.md` (movimiento);
  - `DECISIONES.md` (DEC-025 a DEC-028);
  - `PLAN_V4.8.md` (V4.10.5, y en la lista de cada entrega: animaciones, transición de tema, estilo del mapa y medición de cada tema);
  - `TRAZABILIDAD.md` (RF-P08, RF-P09, RNF-P01 y RNF-P02);
  - `RENDIMIENTO.md` (mediciones por tema y cambios de V4.10.5);
  - `CLAUDE.md` (pendientes 9 y 10).
- **V4.10.4 marcada como desplegada** (pull request #90).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.10.5.md](VALIDACION_V4.10.5.md)).
- Desplegado en producción: no; espera la revisión de Ian.

## Pendiente

- **Ian:**
  - en la vista previa, cambiar de tema desde abajo de la página;
  - probar «Respira conmigo» en los tres temas;
  - abrir algunas preguntas.
- **En la entrega de cada demo (lista de `PLAN_V4.8.md`):**
  - más animaciones (todas);
  - transición de tema (Taller);
  - estilo de mapa corregido (Patio 12, Brío y Taller).
- **Handbook:** en su siguiente versión, actualizar los límites del piloto y anotar tres lecciones:
  - transición al cambiar de tema cuando cambia la estructura;
  - corregir el estilo de mapas de terceros para dejar la consola limpia;
  - medir la carga en cada tema o variante, precargar la foto principal solo donde es lo que más tarda y no fundir lo que puede ser el elemento principal.
- **Siguiente entrega:** Patio 12 (V4.10.6).
