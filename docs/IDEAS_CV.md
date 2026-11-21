# Ideas para el CV web: ahora y después

21 de noviembre de 2026. Salen de `INVESTIGACION_CV.md`. Ian decidió que pueden entrar todas, pero no al mismo tiempo. Las que lucen solo con una trayectoria más larga se guardan aquí con sus requisitos, para retomarlas cuando se cumplan.

## Ahora (V4.8.3)

1. **Índice con la sección activa** (referencia: Brittany Chiang). Se lee en la columna pino: «Resumen · Proyectos · Experiencia · Educación · Certificaciones», con una línea que crece en la sección que se lee y se encoge en las demás. Va solo en escritorio y usa `IntersectionObserver` sobre la columna central. Al pasar sobre una demo, las demás se atenúan.
2. **Línea de tiempo a escala** (Visual Cinnamon). Va desde el primer dato del CV (Mecatrónica, 2018) hasta hoy, con estudios, trabajos y proyectos como barras con sus fechas reales. Lo que sigue en curso (maestría, Múltiples Demos) llega al borde de «hoy» con un final abierto, y el egreso esperado (agosto de 2028) va como texto, no como barra dibujada hacia el futuro. Se dibuja en SVG con los datos de `cv.js`, sin porcentajes ni cifras inventadas.
3. **Transición de la demo** (Dennis Snellenberg, con View Transitions como en la Revista). Al abrir una demo, su muestra de color se expande hasta llenar la pantalla y da paso a la portada de la demo. Con movimiento reducido, solo hay fundido.
4. **Cuadrícula que responde al cursor**. La cuadrícula de Esquema se marca bajo el cursor, en lugar de un resplandor. Solo en escritorio, con `pointermove` y una variable CSS; sin JavaScript en el celular.

## Después: requisitos para cada una

| Idea | Referencia | Requisitos para hacerla |
| --- | --- | --- |
| **Ver como consulta**: el CV como resultado de una consulta SQL sobre `cv.js` | Adham Dannaway | Contenido estable del CV (versión en inglés hecha, sin cambios grandes previstos) y **al menos un proyecto de datos propio y publicado** que la consulta pueda mostrar. Sin eso, el truco luce más que el contenido. |
| **Mapa de Xalapa con niebla**: lista y mapa de proyectos | OMA y Overworld | **Al menos 3 proyectos reales para clientes** con ubicación y permiso para publicarla. Con negocios ficticios el mapa dice poco. Además: el mapa propio (SVG con datos de OpenStreetMap y su atribución) y un presupuesto de carga (LCP por debajo de 2.5 s con el mapa). |
| **Niebla con shader WebGL** | Overworld | Que exista el mapa (la niebla es su capa) y que la página aguante el shader sin pasar de 2.5 s de LCP en el teléfono de prueba. |
| **Menú de comandos** (Ctrl o ⌘ + K y atajos) | Paco | Que el sitio tenga **10 o más destinos útiles**: CV, servicios, cotizador, demos y, si llega, un blog o notas. Con una sola página no hay a dónde saltar. |
| **Versiones anteriores del portafolio** (v1, v2…) | Brittany Chiang | **Que exista un segundo proyecto de CV y portafolio** (v2, con su propio código y repositorio). Este proyecto es la **v1** (decisión de Ian, 21/11/2026): al terminarlo solo se actualiza con experiencia y conocimientos nuevos. Cuando exista la v2, esta se publica tal cual en un sitio aparte (por ejemplo `v1.` con el dominio propio) y la v2 la enlaza. La portada «directorio» de agosto a noviembre de 2026 no cuenta como versión del CV: era el índice de demos (queda en git hasta el commit `b110501`). |
| **Letrero gigante en cinta** (nombre o «Xalapa» que corre al bajar) | Niccolò Miranda, Sonar y Dennis | Marca personal ya definida (nombre del sitio y dominio propios) y una portada con espacio para ello. Es un recurso muy visto: usarlo una sola vez. |
| **Sonido de interfaz** («entrar con sonido») | Sonar y Overworld | Que exista una pieza que lo justifique (el mapa o una escena) y la elección explícita del visitante al entrar. |
| **Escena 3D** | Active Theory y Overworld | La fase 3D del Sitio Profesional (sección 13): que Ian decida aprender modelado y animación 3D. |

## Descartado para el CV

- **Desplazamiento suavizado** (Lenis o Locomotive): choca con las columnas de desplazamiento propio y con la accesibilidad.
- **Pantalla de carga**: retrasa la carga y no aporta a un CV.
- **Partículas de fondo**: recurso muy visto, sin relación con el contenido.
