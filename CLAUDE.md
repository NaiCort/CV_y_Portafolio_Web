# CV_y_Portafolio_Web: reglas para Claude

CV web y portafolio de Ian Habid Aldana Martínez, con siete demos interactivas (una por giro de
negocio) y un cotizador. Repositorio renombrado de `Multiples_Demos` a
`CV_y_Portafolio_Web` el 24/11/2026; sitio en https://cv-y-portafolio-web.vercel.app (el dominio
anterior, multiples-demos.vercel.app, redirige).
La fuente de planificación es el **Documento Maestro** (fuera del repositorio, versión
vigente: V4.9.5, revisión documental 9 del 25/11/2026; la PARTE XVIII tiene el estado actual). Este archivo resume lo que hace falta para trabajar
en el código sin tenerlo a la mano. Si algo aquí contradice una petición de Ian en la
conversación, manda lo que Ian diga y luego se actualiza este archivo.

## Metodología: Digital Development Handbook

Desde V4.10.3, el proyecto adopta el **Digital Development Handbook** (repositorio
`NaiCort/Digital-Development-Handbook-Claude`, versión 1.1.0), y el portafolio completo es su
**demo piloto** (`examples/cv-y-portafolio-web/` en ese repositorio). El repositorio
`Digital-Development-Handbook-GPT` no se toca. Leer `docs/HANDBOOK.md` (adopción, perfiles,
equivalencias de plantillas y estado de cada regla GEN) y `docs/README.md` (índice de `docs/`).
- **Modo de cada pedido:** investigar, proponer, implementar o revisar. En los modos investigar
  y revisar no se cambia nada.
- **Decisiones** en `docs/DECISIONES.md` (DEC-…), con fecha, estado y fuente.
- **Requisitos y pruebas** en `docs/TRAZABILIDAD.md`.
- **Documentos de operación:** `docs/SEGURIDAD.md`, `docs/RENDIMIENTO.md`,
  `docs/DESPLIEGUE.md` y `docs/LICENCIAS.md`.
- **Cada `VALIDACION_V*.md`** termina con la tabla de puertas G0 a G7 (aprobado, fallido,
  bloqueado, no ejecutado o no aplica, con evidencia).
- **Si el handbook contradice este archivo**, manda este archivo; y sobre ambos, lo que Ian
  diga en la conversación.

## Principio rector

"Funcionalidad simulada no significa funcionalidad falsa." Todo control visible responde;
toda simulación declara que lo es; todo flujo pasa por cinco estados (inicial, selección,
procesamiento, resultado, salida); siempre hay un contacto real con Ian separado de las
acciones ficticias del negocio.

## Estado y orden de trabajo

- Se trabaja **una demo a la vez**, en este orden: Psicólogo (cerrada) → Restaurante
  (cerrada en V4.2.5 con **Patio 12**) → Café (cerrada en V4.3.6 con **Ladera**) →
  Gimnasio (cerrada en V4.4.8 con **Brío**) → Taller mecánico (cerrada en V4.5.6 con
  **Rosales y Vértice**) → Despacho contable (cerrada en V4.6.8 con **Cotejo**) →
  **Revista digital (cerrada en V4.7.21 con Rubor, Prisma y Umbral)**. Las siete demos están
  terminadas; sigue la **fase de ajustes V4.8 a V4.11**, cuyo plan está en `docs/PLAN_V4.8.md`
  (leerlo antes de trabajar): V4.8.0 preparación (hecha) → V4.8.1–V4.8.7 CV web y portafolio (cerrado en V4.8.7; la portada
  se prerenderiza al compilar con `scripts/prerender.mjs`; las demás rutas usan `dist/app.html`)
  en `/` → **V4.9** cotizador base (cerrado en V4.9.5) → **V4.10** demos en orden (Psicólogo, que se reconstruye desde cero como landing de una página, Patio 12, Ladera,
  Brío, Taller y Cotejo), con subversiones consecutivas V4.10.1, V4.10.2…, cada una conectada al cotizador →
  **V4.11** ajuste final del cotizador (cada etapa con su versión menor, decisión de Ian del 25/11/2026). Catálogo de demos en `src/data/demos.js` y datos del CV en
  `src/data/cv.js`. El CV vive en `src/pages/Bienvenida.jsx` y `src/pages/cv.css`, con
  su ficha en `docs/FICHA_CV.md` (dirección «Brasa»; leerla antes de tocarlo) y pruebas de navegador en
  `npm run test:browser:cv`; el cotizador (V4.9.0) está en `src/pages/Cotizador.jsx`, con su catálogo en `src/data/catalogo.js`, el cálculo en `src/lib/cotizacion.js` y el envío en `src/lib/solicitud.js` (ficha en `docs/FICHA_COTIZADOR.md`).
- **Restaurante = solo Patio 12.** No se construyen las sub-categorías (fonda, comida
  rápida, lujo) ni el panel de empleados y precios: ambas ideas quedaron descartadas.
- **Café = Ladera**, una sola identidad y un solo local, sin gestión de empleados. Su
  ficha está en `docs/FICHA_CAFE.md`; leerla antes de tocar `src/giros/cafe/`.
- Idea a futuro, sin fecha: una demo de empresa con gestión de empleados.
- **No se modifican demos ya cerradas** mientras se construyen las demás. Mejoras y
  correcciones a demos existentes se anotan en "Pendientes para las demos" (abajo)
  y se hacen en V4.10, dentro de la entrega de cada demo. Excepción: un error real en un componente
  compartido que rompa algo se corrige de inmediato.
- Fuera de alcance en todas las demos: backend, cuentas reales, pagos, inventario real.

## Versionado y commits

- Versión `V4.x.#` según la demo que originó el cambio, no según los archivos tocados.
- Mensajes de commit sin acentos ni guion largo, empezando por la versión
  (`V4.3: ...`). Commits pequeños; formato, herramientas y código del sitio van separados.
- Cada entrega actualiza `package.json` (versión), `CHANGELOG.md`, `docs/ESTADO_V*.md`
  y `docs/VALIDACION_V*.md`. Separar siempre: implementado, verificado en pruebas,
  desplegado en producción.
- Flujo: rama → pull request → vista previa de Vercel revisada por Ian en su teléfono →
  merge a `main` → producción.

## Comprobaciones antes de subir

```bash
npm run lint
npm run format:check
npm test
npm run build
npm run audit:presupuesto
```

Las pruebas de navegador (`npm run test:browser:*`) se corren al cerrar una versión, con
`DEMO_START_PREVIEW=1` (levantan su propio `vite preview`). La vista previa aplica los mismos
encabezados que Vercel (`vercel.json`). Con `CSP_ESTRICTA=1`, la política de contenido que en
producción va «solo en reporte» se aplica de verdad, y cualquier aviso de esa política hace fallar
la suite. Herramientas de la pasada final:
`npm run audit:encimados -- /ruta1,/ruta2` y `npm run audit:cwv -- /ruta` (contra
`vite preview` en 4173). Chromium y Playwright ya están instalados en el entorno de nube.

## Diseño: Guía de identidad y calidad visual v1.1

Cada demo nueva empieza por su **ficha de identidad** en `docs/` antes de escribir código:
paleta (dominante, acento, neutro con hex y regla del acento), dos tipografías, radios y
sombras, movimiento y su motivo, densidad, 2–3 anclas visuales, patrones prohibidos.
Prohibir no basta: la ficha da una dirección propia.

Regla de conteo: máximo uno o dos patrones vigilados por pantalla. Vigilados: Inter para
todo; morado/índigo; degradados y texto con degradado; brillos, auroras y manchas de luz;
vidrio en todo; etiqueta (eyebrow) sobre el título; serif cursiva como acento en un
título; tres tarjetas iguales con ícono arriba; tarjetas dentro de tarjetas; borde de
color en un lado; pasos 1-2-3 y numeración 01/02/03 decorativa; filas de cifras;
todo centrado; monoespaciada como adorno; verde esmeralda de respaldo; los mismos íconos
de Lucide en cada tarjeta; muro de logos; emojis como íconos; la misma aparición hacia
arriba en todo; Title Case; el glifo ✨.

Reglas de oficio: fuentes e imágenes servidas desde el propio sitio (no Unsplash ni
Google Fonts en tiempo de ejecución); cifras tabulares en precios; un solo h1 y
metadatos propios por ruta; sin `href="#"`; movimiento con ease-out, 200–300 ms, entradas
desde escala 0.95, y fundido cuando se pide movimiento reducido. Pasada final: contar
patrones, temáticar selección, foco, barras de desplazamiento y subrayado, correr
`/impeccable audit` y `web-design-guidelines`, medir Core Web Vitals y probar en móvil.

Herramientas instaladas en `.claude/` (ver `.claude/README.md`): frontend-design,
impeccable, web-design-guidelines y web-quality-skills.

## Estado de Psicólogo

**Psicólogo = Valeria Romero**, reconstruida desde cero en V4.10.2 como landing de una sola página
con tres temas intercambiables que comparten el contenido de `src/giros/psicologo/data/consultorio.js`:
«Sala con luz» (bandas y foto en arco), «Neblina» (portada de niebla, gafete y pausas fotográficas) y
«Cuaderno» (notas al margen, polaroid y lista de libreta). Agenda simulada (llamada previa o primera
sesión, zona horaria y recordatorio por WhatsApp de ejemplo), «Respira conmigo», ayuda en crisis con
teléfonos reales, cédula verificable, sin testimonios ni autoevaluaciones ni datos de salud en
formularios. Cada tema se cotiza con su identificador (`psicologo-sala`, `psicologo-neblina`,
`psicologo-cuaderno`). Leer `docs/FICHA_PSICOLOGO.md` antes de tocar `src/giros/psicologo/`. Pruebas
de navegador en `npm run test:browser`. Pendiente del visto bueno de Ian en la vista previa.

## Estado de Café

Café (Ladera) cerrado en V4.3.6 con la dirección «Tueste» (ficha v2 en
`docs/FICHA_CAFE.md`): V4.3.5 rediseño y V4.3.6 privacidad, alérgenos, IVA, tamaños y
cómo llegar. Pendiente del visto bueno de Ian en la vista previa. Pruebas de
navegador en `npm run test:browser:cafe`. Idea guardada: los bloques de color de la
maqueta «Fachadas» para una demo futura.

## Estado de Gimnasio

**Gimnasio = Brío**, cerrado en V4.4.7 y ampliado en V4.4.8 con las propuestas de
`docs/INVESTIGACION_GIMNASIO.md`: club ficticio de cinco sucursales en Xalapa con clases
y reservas, planes y alta, área de socio con un perfil de ejemplo, coaches con evaluación
gratuita, tienda corta y «Tu primera visita». Dirección «Combinada» con dos temas (Cobalto y
Distrito); las tarjetas de clase son el enlace y su video en color solo corre al
activarlas. Cerrado con el visto bueno de Ian el 16/11/2026. Pruebas de navegador en
`npm run test:browser:gimnasio`. Leer `docs/FICHA_GIMNASIO.md` antes de tocar
`src/giros/gimnasio/`. Sin medio propio todavía: Movilidad y Ritmo.

## Estado de Taller mecánico

**Taller = Mecánica Rosales y Vértice**, cerrado en V4.5.6 con el visto bueno de Ian
(17/11/2026): dos talleres ficticios en Xalapa, uno por tema, sobre la misma estructura
(dirección «Combinada»: testigos del tablero y orden de servicio en papel). Rosales es familiar,
de un solo local, sin cuenta y con revisión de usados; Vértice es multimarca con cuatro
sucursales, hojalatería con calculadora de deducible, híbridos y «Mi garaje» con un perfil de
ejemplo. Ambos: mapa, cita, presupuesto con visto bueno por partida, lista de precios y aviso
de privacidad. Sin venta de refacciones. Leer `docs/FICHA_TALLER.md` antes de tocar
`src/giros/taller/`. Pruebas de navegador en `npm run test:browser:taller`.

## Estado de Despacho contable

**Despacho = Cotejo**, cerrado en V4.6.5, ampliado en V4.6.6 con la investigación extra
(`docs/INVESTIGACION_DESPACHO_2.md`) y rediseñado en V4.6.7 y V4.6.8, con el visto bueno de Ian (18/11/2026): un solo despacho ficticio en Xalapa para
personas físicas y empresas, con una contadora al frente (inventada) y dos fotos ilustrativas de Unsplash
(retrato y sala; el pie dice que la persona no es Elena). Dirección
«Expediente»: semáforo de cumplimiento y recibo por régimen; desde V4.6.7, portada editorial (mezcla de
«Libro mayor» y «Consulta» elegida por Ian): libro mayor animado, panel con foto real de Xalapa y el
expediente sobre una foto de consulta; desde V4.6.8, el mismo sistema «libro mayor» en todas las páginas. Precios aproximados y
cotización; todos los servicios y herramientas (diagnóstico, calendario, calculadoras). El
portal de cliente es un «expediente» ligero sin contraseña (ver la sección 9 de
`docs/INVESTIGACION_DESPACHO.md`). Páginas: inicio, precios y cotización, diagnóstico,
calendario, calculadoras, Tu expediente (con recordatorio por WhatsApp), servicios, regularización, guías
cortas y aviso de privacidad; en la portada, especialidades y opiniones de ejemplo; en Precios, «Antes de
contratarnos». Leer `docs/FICHA_DESPACHO.md` antes de tocar
`src/giros/despacho/`. Pruebas de navegador en `npm run test:browser:despacho`.

## Estado de Revista digital

**Revista = Rubor, Prisma y Umbral**, cerrada en V4.7.21 con el visto bueno de Ian (21/11/2026) y en producción: una demo con tres sitios en `/revista`.
- **Rubor**, moda y celebridades: un solo editor; la portada es siempre el número más reciente y se
  hojea bajando; cabecera semitransparente fija con menú de números; cada número con su paleta.
  Cupón de suscripción y carnet de lectora, índice por sección y «Detrás de cámaras» como hoja de
  contactos (V4.7.15).
- **Prisma**, ciencia y tecnología en acceso abierto: varios autores con perfil, estante de números,
  lectura completa y PDF etiquetados de los N.º 24 y 23, manuscrito para publicar, recorrido de envíos,
  áreas como tabla periódica y sostenimiento (V4.7.15 y V4.7.17).
- **Umbral**, fotografía y diseño: rehecho desde cero en V4.7.14 como revista de carteles
  (ficha en `docs/FICHA_UMBRAL.md`): motor de carteles por capas con despiece 3D, dos dossiers
  completos («Entre líneas» y «Otra perspectiva»), «Agua» (N.º 06) completo y tres láminas de archivo;
  fotos de Pexels con recortes (rembg) en `public/revista/umbral/`.
- **Reglas de Ian para toda la revista:** cada sección representa una o dos páginas de revista; nada
  interrumpe esa lógica (sin avisos o créditos sueltos entre pliegos: van en el pie de foto o
  en el colofón). **Todas** las páginas con el mismo nivel de detalle que la portada (también
  se aplicará después a las demás demos). Música: una pista por revista, con una bocina
  transparente abajo a la derecha (silenciada al inicio) y volumen vertical al pasar el cursor;
  nada de barras extra arriba: solo el aviso de demo y la cabecera de cada revista. Pistas: Rubor
  «Night on the Docks», Prisma «Clean Soul», Umbral «Gymnopédie n.º 1» (Kevin MacLeod, CC BY 3.0).
- **Navegadores:** Ian no tiene dispositivos Apple ni usa Safari o Firefox por ahora (21/11/2026); la
  revisión es en su teléfono Android (Chrome o Edge). Safari, Firefox e iOS no son pendientes.
- **Oficio ya resuelto:** tipografías de respaldo con medida (ancho y altura) en `revista.css`;
  créditos dentro de cada sitio; detector de textos encimados y `impeccable` sin hallazgos propios.
Leer `docs/FICHA_REVISTA.md` antes de tocar `src/giros/revista/`. Pruebas de navegador en
`npm run test:browser:revista`.

## Pendientes para las demos (V4.10)

Se resuelven dentro de la entrega de cada demo (ver `docs/PLAN_V4.8.md`).

1. ~~FloatingTimer solo dentro de `/restaurante/*`~~ (hecho en V4.8.0).
2. ~~**Bienvenida:** bajar patrones y pasar el catálogo a datos~~ (hecho en V4.8: la portada es el CV
   web, con un solo patrón vigilado, y el catálogo vive en `src/data/demos.js`). LinkedIn va al final.
3. ~~**Psicólogo:** fotos desde el sitio, Inter y consolidación de los temas~~ (hecho en V4.10.2: se
   reconstruyó desde cero con tres temas sobre un solo contenido).
4. **Patio 12:** quitar la etiqueta en mayúsculas sobre el título en Inicio y Carta.
5. Ficha de identidad a posteriori de Patio 12 (la de Psicólogo se hizo en V4.10.1 y la nueva está en `docs/FICHA_PSICOLOGO.md`).
6. ~~Componentes compartidos (llamada comercial, banner, marca de agua)~~ (hecho en V4.8.0:
   `ComercialCTA` con h2 y sin etiqueta ni tarjeta; banner y autoría como `aside` con nombre;
   la marca de agua pasó a cerrar la página en vez de flotar).
7. **Precarga de fuentes en `index.html`** (todas las demos; Psicólogo ya tiene respaldos medidos desde V4.10.2): en red lenta, el cambio de
   tipografía mueve el texto (CLS 0.146 medido en Créditos de Ladera). Modelo ya probado en
   Cotejo (V4.6.8): tipografías de respaldo con `size-adjust` medido, que bajaron el CLS a 0.002.
8. Dependencias: en V4.10.3 se actualizaron vite, vitest, undici y zod, y Tailwind pasó a
   `devDependencies`; producción queda sin avisos. Quedan 3 moderados de `minimatch` dentro de
   ESLint, sin versión compatible: actualizar cuando la haya.
