# V4.10.3 · 25 de noviembre de 2026 · Adopción del Digital Development Handbook

- El portafolio completo (CV, demos y cotizador) es la demo piloto de `Digital-Development-Handbook-Claude` 1.1.0, y adopta su contenido (`docs/HANDBOOK.md`).
- **Seguridad:**
  - encabezados en `vercel.json`: `nosniff`, `DENY`, `Referrer-Policy`, `Permissions-Policy`, HSTS y una política de contenido corta, aplicada; la política completa va «solo en reporte»;
  - la vista previa local aplica los mismos encabezados, y con `CSP_ESTRICTA=1` también la política completa;
  - las suites de navegador fallan ante cualquier aviso de esa política.
- **Aviso de privacidad del sitio** en `/privacidad`, enlazado desde el CV y desde el paso de envío del cotizador.
- **Rendimiento:**
  - el cotizador y el aviso se cargan aparte: el trozo principal baja de 113.8 a 83.2 KB comprimidos;
  - mientras cargan, el aviso de espera dice «Cargando…» en lugar de «Cargando demo…»;
  - presupuesto de rendimiento (`npm run audit:presupuesto`) en CI.
- **Dependencias:**
  - Tailwind pasa a desarrollo;
  - vite, vitest, undici y zod, actualizados;
  - producción sin vulnerabilidades, con auditoría en CI.
- **Documentos nuevos:** decisiones, trazabilidad, seguridad, rendimiento, despliegue, licencias e índice de `docs/`. Además, el registro de fotos de Psicólogo.

# V4.10.2 · 25 de noviembre de 2026 · Psicólogo desde cero, en tres temas

- Psicólogo se reconstruye desde cero como landing de una sola página para Valeria Romero, psicóloga ficticia en Xalapa, con el contenido de la investigación (`docs/INVESTIGACION_PSICOLOGO_2.md`) en un solo archivo de datos.
- Tres temas intercambiables con su propia estructura (ficha en `docs/FICHA_PSICOLOGO.md`):
  - **Sala con luz:** por bandas, foto en arco y una banda olivo para la primera sesión;
  - **Neblina:** portada de niebla, gafete con la cédula, honorarios en tabla y pausas fotográficas;
  - **Cuaderno:** notas al margen, polaroid con cinta, honorarios como lista de libreta y subrayado de marcatexto.
- Agenda simulada con los cinco estados: llamada previa o primera sesión, modalidad, zona horaria, horario y contacto, con recordatorio por WhatsApp de ejemplo. No pide datos de salud.
- «Respira conmigo»: un minuto de respiración que el visitante inicia y detiene.
- Ayuda en crisis con teléfonos reales; cédula verificable en la SEP; aviso de publicidad y aviso de privacidad con datos sensibles y derechos ARCO; reseñas públicas simuladas sin opiniones inventadas; instituciones y colegas; tres notas de recursos; preguntas frecuentes; contacto sin texto libre, con mapa.
- Fotos (WebP) y tipografías servidas desde el sitio, con fuentes de respaldo medidas para que el texto no salte.
- «Cotiza un sitio como este» lleva al cotizador con el identificador del tema (`psicologo-sala`, `psicologo-neblina` o `psicologo-cuaderno`).
- Se retiran los cuatro temas anteriores y los componentes que solo ellos usaban (reserva, formulario y aviso de privacidad genéricos).

# V4.10.1 · 25 de noviembre de 2026 · Investigación de Psicólogo

- Ficha a posteriori de los cuatro temas anteriores (`docs/FICHA_PSICOLOGO_ANTERIOR.md`).
- Investigación de contenido, ley, ética, crisis, lenguaje, precios y buscadores (`docs/INVESTIGACION_PSICOLOGO_2.md`).
- Investigación de diseño visual (`docs/INVESTIGACION_PSICOLOGO_DISENO.md`) y su ampliación con Refero Styles (`docs/INVESTIGACION_PSICOLOGO_DISENO_2.md`); Awwwards no se pudo abrir desde este entorno.
- Tres maquetas («Sala con luz», «Neblina» y «Cuaderno»), aprobadas por Ian.

# V4.9.5 · 25 de noviembre de 2026 · Sin etiquetas de nivel

- El sitio no dice «junior» ni «senior»: en el CV, «Datos Jr» pasa a «Analista de Datos», igual que en el PDF nuevo de Ian.
- Los precios de lista usan la tarifa intermedia (550 MXN, 40 USD y 38 EUR por hora; mínimo de 5,000 MXN, 400 USD o 380 EUR). El precio de lanzamiento del 30 % deja el precio efectivo en unos 385 MXN por hora; al terminar el lanzamiento, el precio sube solo.

# V4.9.4 · 25 de noviembre de 2026 · Precios con investigación

- Investigación de precios junior, intermedio y senior en México, el resto de América y Europa, por tipo de sitio, por función, IA, extras, mantenimiento y urgencia (`docs/INVESTIGACION_PRECIOS.md`).
- Niveles de tarifa en los datos. Se cotiza como junior (400 MXN, 30 USD y 28 EUR por hora); el intermedio queda listo para cuando haya tres proyectos reales con testimonio.
- Las funciones de IA ya tienen precio: asistente de WhatsApp, asistente de preguntas, documentos automáticos y lectura de facturas. Se añade el diagnóstico de automatización. Cada una dice qué costos de terceros van aparte.
- Ajustes según el mercado:
  - más horas en cuentas de usuario, cobro en línea, panel de administración y reservas;
  - redacción de textos por página;
  - entrega exprés del +60 % al +75 %.
- El precio «completo» de cada tipo ya no suma la IA ni los extras de contenido.

# V4.9.3 · 25 de noviembre de 2026 · Plan mensual y sugerencias de tipo

- Forma de pago a elegir:
  - pago único: 30 % al aceptar y 70 % al aprobar la entrega;
  - plan mensual: 40 % hoy y el saldo en 18 pagos sin intereses, junto con el mantenimiento (al menos el plan Básico).

  La nota muestra el pago de hoy, cada mensualidad y lo que se paga después. El código pasa al cliente al terminar o al liquidar el saldo.
- En Personalizado, cuando lo elegido ya es una landing, un sitio de varias páginas o una tienda, se sugiere ese tipo sin aplicarlo.
- En una función que no se puede quitar, «¿No la necesitas? Cambia a…» ofrece el tipo inmediatamente inferior.
- Títulos de cada tipo como frase («Tu proyecto personalizado», «Tu sitio de varias páginas»).

# V4.9.2 · 25 de noviembre de 2026 · Correcciones del cotizador

Tras la revisión de Ian:
- Al llegar al cotizador sin elegir nada, ninguna tarjeta está resaltada y la nota pide elegir un tipo o una demo. Las tarjetas se resaltan al pasar el cursor o al enfocarlas.
- Personalizado empieza sin nada marcado y se construye desde cero; en «Elige tipo», cada tarjeta parte de la base de su tipo.
- El primer mes del plan de mantenimiento entra en el desglose y en el total (sin descuento de lanzamiento); debajo se indica lo que se paga cada mes después. El anticipo se calcula sin el mantenimiento.
- El aviso distingue lo que se quita porque dependía de otra función de lo que se quita porque no puede ir junto con la elegida.
- El plazo dice «2 días hábiles» en lugar de «de 2 a 2 días hábiles».

# V4.9.1 · 25 de noviembre de 2026 · Vuelve al cotizador

- Botón flotante «Vuelve al cotizador» en la demo a la que se llegó desde el cotizador («Ver un ejemplo» o «Ver la demo»). Desde el CV o con un enlace directo no aparece.
- En escritorio dice «Vuelve al cotizador»; en el celular es un círculo de 36 px que, al tocarlo, pregunta «¿Volver al cotizador?». Tocar la pregunta regresa y tocar fuera la cierra.
- Regresa al cotizador en el mismo paso y a la misma altura, aunque se haya navegado dentro de la demo.
- Se puede arrastrar si estorba (con el teclado, con las flechas) y recuerda dónde se dejó.

# V4.9.0 · 25 de noviembre de 2026 · Cotizador

- El cotizador sustituye a la página provisional en `/cotizador` y es también la página de servicios: «Elige tipo → Ajusta → Envía», en tres columnas como el CV.
- Cuatro tipos de sitio (Personalizado, Landing, Varias páginas y Tienda o sistema) con su precio «desde» y «completo», qué incluye y una demo de ejemplo.
- Desde una demo (`?demo=<id>`, también sus variantes) se parte de su versión esencial, recomendada o completa.
- Catálogo de 41 funciones con sus reglas: lo que no se puede quitar dice por qué; lo que depende de otra función se va con ella y se avisa con «Deshacer»; lo que no cabe en un tipo pide confirmar el cambio.
- Nota a la derecha con folio, una línea por función, la que se quita tachada, ficha y pasada de calidad, mínimo, urgencia, precio de lanzamiento e IVA; total con IVA en pesos y sin impuestos en dólares y euros; plazo en días hábiles (8 horas al día), anticipo y mensualidad aparte. En el celular, barra fija con el total y detalle a pantalla completa.
- Entrega prioritaria o exprés y planes de mantenimiento.
- La solicitud sale por WhatsApp o correo con el folio, el detalle y la configuración en un enlace; pregunta si se necesita factura y para quién. El sitio no guarda datos.
- Precios propuestos del Sitio Profesional, en `src/data/catalogo.js`; se deciden al terminar el cotizador.
- Corrección tras la revisión de Ian: regresar con el botón del navegador desde una demo de ejemplo vuelve a «Elige tipo» a la misma altura (antes saltaba a «Ajusta» como si ya se hubiera elegido). Cada paso es una entrada del historial.

# V4.8.7 · 25 de noviembre de 2026 · Pasada final y cierre del CV

- Con el teclado, la portada empieza en «Saltar al CV»: antes el foco caía en la columna central y se saltaba el PDF, el índice y el contacto. Al navegar dentro del sitio, el foco sigue llevándose al contenido.
- Sin palabras solas en la última línea de los párrafos y viñetas del CV.
- Se quitó la tipografía monoespaciada, que ya no se usaba.
- PDF del CV con el enlace al dominio nuevo.
- Ficha del CV al día (dos tipografías, sin línea de tiempo) y numeración de las etapas que siguen: V4.9 cotizador, V4.10 demos y V4.11 ajuste final del cotizador.
- Documento Maestro V4.8.7 (revisión documental 8, PARTE XVII).

# V4.8.6 · 25 de noviembre de 2026 · Buscadores y nombre nuevo

- La portada llega con el CV ya escrito en el HTML: los buscadores la leen sin ejecutar JavaScript y carga más rápido (1.12 s en teléfono con red lenta, antes 1.87 s).
- Datos estructurados de persona, URL canónica, imagen para redes, `robots.txt` y `sitemap.xml`.
- Las demos siguen llegando vacías y se dibujan al cargar; React reutiliza el HTML de la portada sin volver a dibujarlo.
- Nombre nuevo del proyecto (`CV_y_Portafolio_Web`) y dominio `cv-y-portafolio-web.vercel.app`; README nuevo.

# V4.8.5 · 22 de noviembre de 2026 · Correcciones del CV

- Experiencia completa, con el texto del CV de noviembre y lo que solo traía el CV visual.
- Orden final (decisión de Ian, 23/11/2026): «Proyectos» con este sitio, y «Experiencia» con Rincón de Imágenes (sitio para un negocio local en funcionamiento, hecho como proyecto escolar), Servicio Social, Prácticas y Freelance.
- PDF del CV actualizado por Ian (segunda versión), con Proyectos y Experiencia en el mismo orden. El sitio usa sus mismas etiquetas: Rincón de Imágenes como proyecto independiente, y Prácticas sin «Full-Stack Jr».
- Rincón de Imágenes con su descripción completa (revisión del repositorio del sitio): catálogo automático de 26 obras, conversión de fotografías a WebP (de 75.5 MB a 1.96 MB), contacto, SEO, dominio y despliegue en Cloudflare. Cuarta versión del PDF, con el mismo texto y la fecha desde mayo de 2026.
- Se quitaron del CV dos notas innecesarias: «CV actualizado…» y la aclaración bajo «Demos».
- «Múltiples Demos» pasa a llamarse «CV y portafolio web» en el CV: es el sitio que se está viendo, y su enlace lleva a la misma página.
- Se quitó «Ver las 7 demos»: las demos ya están a la vista.
- Cada certificación abre su PDF.
- Se quitó la línea de tiempo: repetía lo que ya dicen las entradas y no tenía los meses para ser exacta.
- El índice marca «Certificaciones» al llegar al final, y la sección elegida mientras dura el desplazamiento.
- Sin franja blanca a la derecha en escritorio: el CV ya no reserva el canal de la barra de desplazamiento de la página.

# V4.8.4 · 22 de noviembre de 2026 · Dirección «Brasa»

- Nuevo diseño del CV con la paleta de la foto de Ian: fondo carbón, texto arena y acento brasa. Toma la estructura de la referencia que eligió Ian y conserva las tres columnas.
- Botones transparentes: el contorno aparece al pasar el cursor. En pantallas táctiles queda un contorno tenue.
- Tarjetas del CV que se iluminan bajo el cursor y atenúan a las demás; etiquetas de tecnología en píldoras; flechas en los enlaces.
- Las demos se muestran con una miniatura real de su portada.
- Reflector cálido que sigue al mouse, enlace «Saltar al CV» y títulos de sección fijos en el celular.

# V4.8.3 · 22 de noviembre de 2026 · Foto, índice, trayectoria y transición

- Foto de Ian en el CV (provisional, elegida por él), servida desde el sitio en tres tamaños.
- Índice en la columna izquierda que marca la sección que se está leyendo.
- Nueva sección «Trayectoria»: línea de tiempo a escala de 2018 a hoy, con estudios, trabajo y proyectos.
- Al abrir una demo, su color crece hasta llenar la pantalla y la demo entra con un fundido. La demo se precarga al pasar el cursor.
- Al pasar sobre una demo, las demás se atenúan. La cuadrícula del CV se marca alrededor del cursor.

# V4.8.2 · 21 de noviembre de 2026 · CV web y portafolio

- La portada es ahora el CV web y portafolio:
  - **Escritorio:** identidad y contacto a la izquierda, el CV al centro y las demos a la derecha, cada columna con su propio desplazamiento.
  - **Celular:** una sola lectura, con cabecera propia; las demos se abren desde el botón «Demos» y no se repiten al final.
- Botón «CV en texto (PDF)» con el CV de noviembre; el CV visual aparece como «pronto».
- Cotizador provisional en `/cotizador`: reconoce la demo de origen (`?demo=<id>`) y, mientras se construye, ofrece la cotización por WhatsApp o correo.
- Tipografías servidas desde el sitio, con respaldos medidos: la página no salta al cargar (CLS 0.000).

# V4.8.1 · 21 de noviembre de 2026 · Ficha y maquetas del CV

- Tres maquetas (Esquema, Neblina y Prensa). Ian aprobó la distribución y eligió combinar Neblina con Esquema como diseño visual inicial.
- Ficha de identidad en `docs/FICHA_CV.md`.

# V4.8.0 · 21 de noviembre de 2026 · Preparación de la fase de ajustes

- Plan de V4.8 en `docs/PLAN_V4.8.md`: CV web y portafolio, cotizador base, demos en orden y ajuste final del cotizador.
- Catálogo de demos como datos (`src/data/demos.js`), con identificadores estables, estados, variantes y funciones; la portada ya lo usa.
- Datos del CV (`src/data/cv.js`) que unen el CV de noviembre y el CV visual, y el PDF de noviembre en `/cv/`.
- El contador del restaurante solo aparece dentro de `/restaurante`; la visita se conserva fuera.
- La llamada comercial de todas las demos ya no lleva etiqueta sobre el título ni tarjeta centrada, y su título es h2.
- La marca de agua deja de tapar el texto: ahora cierra cada página y lleva al portafolio. El banner y la autoría son regiones con nombre.
- Herramientas de la pasada final en el repositorio: `npm run audit:encimados` y `npm run audit:cwv`.

# V4.7.21 · 21 de noviembre de 2026 · Umbral, márgenes de página

- Espacio bajo la cabecera corrida en todas las páginas de Umbral (el acento de «COLOFÓN» tocaba la línea): el reinicio de márgenes ya no anula los de cada clase.

# V4.7.20 · 21 de noviembre de 2026 · Carga de Prisma y Umbral

- Prisma carga en 2.4 s (antes 3.0): fondo del número con prioridad alta y portaditas del tamaño que ocupan.
- Umbral: el fondo tenue del cartel pide una versión chica.

# V4.7.19 · 21 de noviembre de 2026 · Umbral, sumario en celular

- En celular, el texto y el botón de cada entrada del sumario pasan debajo del título y la miniatura; el título se ajusta al ancho sin partir palabras.

# V4.7.18 · 21 de noviembre de 2026 · Pasada final de diseño

- Sin textos encimados en las 27 páginas de Revista (páginas de Rubor bajo la cabecera, cursivas y cierre de Umbral).
- Menos patrones vigilados: sin etiquetas sobre los títulos de las páginas nuevas, sin franja de color en el manuscrito; contraste de textos de ejemplo y símbolos.
- Barras de desplazamiento con el tono de cada revista.
- Documentos de V4.7.5 a V4.7.11 completados.

# V4.7.17 · 21 de noviembre de 2026 · PDF accesibles, carga y tipografías

- PDF de Prisma etiquetados, en español y con índice navegable.
- Tipografías de respaldo con medida (ancho y altura) para las cuatro fuentes: el CLS bajó a 0.000–0.043 en las páginas medidas.
- Umbral y Rubor cargan más rápido: fotos del tamaño que ocupan, prioridad para la figura principal y entrada de la portada sin transparencia.

# V4.7.16 · 21 de noviembre de 2026 · Opcionales y movimiento

- Umbral suena con la Gymnopédie n.º 1 (Satie, por Kevin MacLeod).
- «Agua» (N.º 06) como dossier completo, con gota de texto envolvente y dos fotos nuevas.
- Barra de avance de lectura, páginas que entran al bajar, entrada de la portada de Rubor y transiciones entre páginas.
- Franja legal de privacidad y créditos con el tono de cada revista.

# V4.7.15 · 21 de noviembre de 2026 · Rubor y Prisma, todas las páginas

- Rubor: cupón de suscripción recortable y carnet de lectora; índice por sección en pliego; «Detrás de cámaras» como hoja de contactos con lápiz graso, hoja de llamado y equipo.
- Prisma: manuscrito para publicar con guía, recorrido animado de cada envío, áreas como tabla periódica, sostenimiento con reparto del gasto y preguntas; preimpresión con diseño de ficha. Sin la fila de enlaces bajo la cabecera.
- Créditos dentro de cada revista, con hoja de contactos, muestras de tipografía y música.

# V4.7.14 · 21 de noviembre de 2026 · Umbral desde cero

- Umbral rehecho como revista de carteles: motor de carteles por capas con cuatro variantes («Entre líneas» con letras como ventana y persona recortada encima en 2.5D; «Otra perspectiva» con rebanadas diagonales que se deslizan al bajar; «Agua» con palabra vertical y reflejos en WebGL; «Crear» con tiras, serif detrás de la persona y sombra de ventana).
- Despiece 3D y proceso: el cartel se separa en capas y cada capa se apaga y enciende.
- Cada sección es un pliego de una o dos páginas, con cabecera corrida, folio y lomo; nada suelto entre pliegos (créditos en el colofón y en los pies de foto).
- Cuatro números de archivo simulados con su lámina; diez fotos propias de Pexels con recortes; caligráfica Mrs Saint Delafield escrita como trazo; favicon y llamada comercial propios.
- Ficha nueva `docs/FICHA_UMBRAL.md`. Pruebas de despiece, capas y láminas.

# V4.7.13 · 21 de noviembre de 2026 · Bocina y música por revista

- Bocina transparente abajo a la derecha, en silencio al llegar; volumen vertical que aparece al pasar el cursor con la música encendida. Se quitó la barra de música de arriba.
- Una pista por revista (Kevin MacLeod, CC BY 3.0): Rubor «Night on the Docks (Sax)», Prisma «Clean Soul», Umbral «Dreamer». Créditos y registro de procedencia.

# V4.7.12 · 21 de noviembre de 2026 · Revista digital, correcciones

- Contraste de la cita y del pie de foto en el interior de «Entre líneas» (el recorrido de navegador fallaba en `main`).
- El título que recibe el foco al cambiar de página ya no muestra un recuadro.
- CHANGELOG ordenado: V4.7.3 a V4.7.11 con su fecha y en su lugar.

# V4.7.11 · 20 de noviembre de 2026 · Sumario de Umbral

- Dos entradas a sangre con recortes específicos, filtro de disciplina y guardado desde el sumario.

# V4.7.10 · 20 de noviembre de 2026 · Entre líneas, del espacio al detalle

- Apertura en díptico a ancho de escritorio, título con Archivo local y tres pliegos con encuadres de calle, gesto y cámara.

# V4.7.9 · 20 de noviembre de 2026 · Otra perspectiva en tres pliegos

- Escena completa, díptico de encuadres y hoja de contactos interactiva con variantes para móvil.

# V4.7.8 · 20 de noviembre de 2026 · Música ambiental de Revista

- Audio local opcional con volumen, preferencia de reproducción, créditos y borrado desde privacidad.

# V4.7.7 · 20 de noviembre de 2026 · Prisma: publicación simulada y exploración por área

- Perfil con seguimiento de envíos, preimpresiones locales, filtros de las 14 áreas y explicación del acceso abierto.

# V4.7.6 · 20 de noviembre de 2026 · Rubor: suscripción, secciones y sesión editorial

- Cuenta local con renovación simulada, cancelación y acceso a 22 notas de archivo. Cuatro secciones y detrás de cámaras del número actual.

# V4.7.5 · 20 de noviembre de 2026 · Apertura de Entre líneas

- Composición horizontal y vertical con fotografía dentro del título y figura en primer plano.

# V4.7.4 · 19 de noviembre de 2026 · Carteles y proceso creativo de Umbral

- Dos portadas editoriales en el índice y los dossiers. Comparación de original, encuadre y composición final.

# V4.7.3 · 19 de noviembre de 2026 · Umbral y base compartida de Revista

- Tercera publicación, Umbral: portada editorial, dos dossiers, proceso creativo, creador de ejemplo, filtros y guardados.
- Entrada con tres publicaciones; créditos y privacidad con borrado exclusivo de Revista.
- Marcadores por elemento: migración sin pérdida de v1 y sincronización entre pestañas.
- Búsqueda de Prisma sin truncamiento y foco al navegar entre lecturas.
- Pruebas ampliadas de regresión, accesibilidad y recorridos de las tres revistas.
- Primera entrega de la ampliación: siguen pendientes suscripción de Rubor, publicación y áreas de Prisma, música y refinamiento editorial.

# V4.7.2 · 19 de noviembre de 2026 · Prisma, lectura completa y PDF

- Lectura completa de los N.º 24 y 23 de Prisma: índice, hoja clara con resumen, secciones, tabla, dos figuras con sus datos, referencias, cómo citar (con copiar) y texto grande.
- Comentarios de la comunidad en cada investigación.
- PDF real de los dos números, generado desde la página con la hoja de impresión (`npm run pdf:prisma`).
- Iniciales de los avatares de comentarios corregidas. Dos pruebas nuevas y dos páginas más en el recorrido de navegador.

# V4.7.1 · 19 de noviembre de 2026 · Revista digital, volver a elegir y nada encimado

- Botón «← Revistas» en la cabecera de Rubor y Prisma para regresar a la elección entre las dos.
- Portada de Rubor reacomodada en flujo: ya no se enciman la fecha y el titular, la cabecera y «Alfombra roja», ni el código de barras y el pie de foto, en PC ni en celular.
- Prisma: «En tendencia» se acomoda al ancho y ya no se pisa a 1024 px.
- La marca de agua de la demo ya no tapa el código de barras. Una prueba nueva.

# V4.7.0 · 19 de noviembre de 2026 · Revista digital, base de Rubor y Prisma

- Añadir `/revista`: una demo con dos sitios, Rubor (moda y celebridades) y Prisma (ciencia y tecnología), con entrada para elegir revista.
- Rubor: la portada es siempre el número más reciente (N.º 24) y se hojea bajando: sumario, carta de la editora, entrevista, anuncio ficticio, reportaje y comentarios. Cabecera semitransparente fija con el menú de los 24 números por fecha; cada número tiene su propia paleta. N.º 24 (rojo) y N.º 23 (azul y dorado) completos; los demás, portada y aviso de archivo.
- Prisma: estante de 24 números; al elegir uno, su portada crece con resumen, estado, autores enlazados a su perfil y los botones Guardar, Leer y Descargar PDF; cada número con su color e imagen desvanecida. En tendencia, populares por semana, mes o siempre, últimas publicaciones, selección del editor, búsqueda con Ctrl K, ficha de investigación y perfil de autor.
- Cuenta de ejemplo y marcadores en los dos sitios; comentarios con publicación simulada.
- Tipografías (Bodoni Moda, Archivo, Newsreader, Space Grotesk) y 112 fotos servidas desde el sitio, con procedencia en `public/revista/medios-origen.json`.
- La Bienvenida enlaza la revista. 16 pruebas nuevas y `npm run test:browser:revista`.

# V4.6.8 · 18 de noviembre de 2026 · Despacho contable, toda la demo en libro mayor

- El estilo de la portada en toda la demo, según la maqueta aprobada por Ian: encabezado con título grande y renglones del libro mayor en las nueve páginas interiores; listas y tablas como libro; papel blanco solo para los objetos; paneles oscuros con foto y frase en ocre; pie oscuro con la frase de la portada.
- La tarjeta del expediente ya no tapa texto ni foto: va en la columna del texto, debajo del párrafo.
- Inicio: regímenes como renglones con el recibo al lado, días del mes en grande, panel «Nada se presenta sin tu visto bueno», servicios en índice, especialidades con foto de Xalapa, contadora con su cita y opiniones con una destacada.
- Tu expediente: semáforo como carpeta, previo y solicitudes como libro y recordatorio por WhatsApp en banda oscura con el Cofre de Perote.
- Tres fotos nuevas: dos de Xalapa (Koffermejia, Wikimedia Commons, CC BY-SA 4.0) y una ilustrativa de Unsplash; los créditos se generan de los datos de las fotos.
- Tipografías de respaldo con medidas ajustadas: CLS de 0.000 a 0.040 en las diez páginas.
- Ámbar de texto más oscuro (`#8A5F05`) para el contraste sobre el fondo.

# V4.6.7 · 18 de noviembre de 2026 · Despacho contable, portada editorial

- Nueva portada de Cotejo, mezcla de las maquetas «Libro mayor» y «Consulta» que eligió Ian: libro mayor que se palomea solo con título enorme, panel con la foto real de los techos de Xalapa (Wikimedia Commons, CC0) que se aleja al desplazarse y la consulta con el expediente de ejemplo encima.
- Créditos con las cuatro fotos; procedencia de las nuevas en `public/despacho/medios-origen.json`.
- Dos pruebas nuevas; la portada en los recorridos de navegador. La espera de animaciones antes de axe ignora las ligadas al desplazamiento.

# V4.6.6 · 18 de noviembre de 2026 · Despacho contable, confianza

- Dos fotos ilustrativas de Unsplash servidas desde el sitio: retrato en «Con una contadora al frente» (el pie dice que la persona no es Elena) y la sala de juntas; procedencia en `public/despacho/medios-origen.json` y créditos.
- Portada: «Con quién trabajamos más», guías cortas y tres opiniones declaradas como inventadas.
- Añadir `/despacho/guias`: RESICO, cartas del SAT y primera declaración anual.
- Precios: «Antes de contratarnos», con quién encajamos y con quién no.
- Tu expediente: recordatorio por WhatsApp simulado, con elección de avisos.
- Ocho pruebas nuevas; guías, fotos y recordatorio en los recorridos de navegador.

# V4.6.5 · 18 de noviembre de 2026 · cierre de Despacho contable

- La Bienvenida enlaza Despacho contable (Cotejo).
- Pasada final con impeccable en las nueve páginas; Core Web Vitals de laboratorio de 1.76 a 2.04 s de LCP.
- Recorridos de navegador sobre la compilación de producción (5 de 5) y una prueba nueva.

# V4.6.4 · 18 de noviembre de 2026 · Despacho contable, servicios y regularización

- Añadir `/despacho/servicios`: los nueve servicios con qué incluyen, qué se pide y precio.
- Añadir `/despacho/regularizacion`: cómo revisar y corregir declaraciones atrasadas antes de que el SAT las pida, con el costo de ponerse al día.
- Aviso de privacidad con la ley de 2025 y borrado del expediente.
- Seis pruebas nuevas y las páginas en los recorridos de navegador.

# V4.6.3 · 18 de noviembre de 2026 · Despacho contable, Tu expediente

- Añadir `/despacho/expediente`: perfil de ejemplo sin contraseña con semáforo, previo para aprobar o preguntar, presentación simulada, solicitudes con fecha límite (el archivo no sale del navegador) y documentos.
- «Tu expediente» en la cabecera y el menú; la portada y las herramientas enlazan a él.
- Siete pruebas nuevas y el expediente en los recorridos de navegador.

# V4.6.2 · 18 de noviembre de 2026 · Despacho contable, herramientas

- Añadir `/despacho/diagnostico`: cinco preguntas, régimen probable, riesgos y plan sugerido.
- Añadir `/despacho/calendario`: obligaciones del mes por régimen, con o sin empleados.
- Añadir `/despacho/calculadoras`: ISR de RESICO, aguinaldo y finiquito con la UMA 2026.
- Menú con las herramientas; la portada enlaza a cada una.
- Diez pruebas nuevas y las tres páginas en los recorridos de navegador.

# V4.6.1 · 18 de noviembre de 2026 · Despacho contable, precios y cotización

- Añadir `/despacho/precios`: precios por régimen y lo que se cobra aparte.
- Cotización con estimación al momento según facturas y empleados, y confirmación simulada con folio.
- Los botones «Cotizar» llevan a la cotización, con el régimen elegido.
- Seis pruebas nuevas y la cotización en los recorridos de navegador.

# V4.6.0 · 18 de noviembre de 2026 · Despacho contable, primera entrega

- Investigación de despachos contables (incluido si hace falta un portal de cliente) y referencias revisadas en navegador.
- Tres maquetas de portada; dirección «Expediente» y nombre Cotejo elegidos por Ian. Ficha de identidad.
- Añadir `/despacho`: expediente de ejemplo con semáforo y previo para aprobar, precio por régimen, cómo trabajamos, servicios, herramientas y contadora al frente.
- WhatsApp y llamada simulados, barra de contacto y menú para teléfono.
- Añadir `npm run test:browser:despacho` (5 de 5) y siete pruebas nuevas.

# V4.5.6 · 16 de noviembre de 2026 · cierre de Taller mecánico

- Aviso de privacidad con «Borrar mis datos de esta demo».
- La Bienvenida enlaza Taller mecánico (Rosales y Vértice).
- Foto de portada de Rosales más ligera: LCP de laboratorio de 3.87 s a 2.85 s.
- Pasada final con impeccable en las nueve páginas y los dos talleres; Core Web Vitals de laboratorio.
- Dos pruebas nuevas; recorridos de navegador con el aviso de privacidad, también sobre la compilación de producción.

# V4.5.5 · 16 de noviembre de 2026 · Taller mecánico, páginas de Vértice

- Añadir `/taller/hojalateria`: con o sin seguro, calculadora de deducible y trabajos de ejemplo.
- Añadir `/taller/hibridos`: qué se atiende, seguridad, reporte de batería de ejemplo y preguntas.
- Añadir `/taller/garaje`: perfil de ejemplo con dos autos, kilometraje, recordatorio, orden abierta e historial.
- Menú para teléfono y tableta.
- Nueve pruebas nuevas y las tres páginas en los recorridos de navegador.

# V4.5.4 · 16 de noviembre de 2026 · Taller mecánico, precios y revisión de usados

- Añadir `/taller/precios` en los dos talleres: lista completa por categoría, suma aproximada, reglas de cobro de Profeco y formas de pago.
- Añadir `/taller/usados` (Rosales): precio fijo, qué se revisa y un reporte de ejemplo desplegable.
- Las páginas de un solo taller ofrecen cambiar de taller si se abren desde el otro.
- Menú con páginas propias de cada taller.
- Ocho pruebas nuevas y las dos páginas en los recorridos de navegador.

# V4.5.3 · 16 de noviembre de 2026 · Taller mecánico, presupuesto con visto bueno

- Añadir `/taller/consulta`: presupuesto por partida con medida, desglose y «Autorizar» o «No por ahora».
- Firma con el nombre; si no se autoriza nada, se paga solo el diagnóstico.
- Reparación con un hallazgo que pide autorización (regla de Profeco del 20 %).
- Entrega con comprobante desglosado, piezas devueltas o recicladas y garantía con fecha.
- «Consulta tu auto» en el menú de los dos talleres.
- Once pruebas nuevas y el presupuesto completo en los recorridos de navegador.

# V4.5.2 · 16 de noviembre de 2026 · Taller mecánico, agendar cita

- Añadir `/taller/cita`: servicio, auto, dónde y cuándo, datos y confirmación con folio.
- Rosales: mecánico a domicilio dentro de 3 km. Vértice: sucursal por especialidad y recolección.
- Horas según el horario de cada local, con ocupaciones simuladas.
- Desde un testigo llega el servicio sugerido; si no conviene manejar, propone domicilio o recolección.
- «Tus citas» con cancelación y «Agregar a mi calendario».
- Diez pruebas nuevas y la cita completa en los recorridos de navegador.

# V4.5.1 · 16 de noviembre de 2026 · Taller mecánico, mapa de ubicaciones

- Mapa real de Xalapa en Inicio; cada taller muestra solo sus locales, en zonas distintas.
- Rosales: un local en la colonia Revolución con ficha fija (abierto ahora, horario, cómo llegar, estacionamiento y accesibilidad).
- Vértice: cuatro sucursales con lista desplazable junto al mapa; elegir una abre su ficha y «Agendar aquí».
- La sucursal Sumidero pasa a llamarse Lázaro Cárdenas.
- Cuatro pruebas nuevas y recorridos de navegador con el mapa.

# V4.5.0 · 16 de noviembre de 2026 · Taller mecánico, primera entrega

- Investigación de talleres y referencias revisadas en navegador; tres maquetas de portada (Orden, Rótulo y Tablero) y dirección «Combinada» elegida por Ian.
- Ficha de identidad con dos talleres ficticios, uno por tema: Mecánica Rosales (familiar) y Vértice (multimarca, cuatro sucursales).
- Añadir `/taller`: portada, «¿Qué luz se encendió?» con seis testigos del tablero, orden de servicio de ejemplo con partidas en semáforo, precios desde, «Consulta tu auto» (Rosales) y Mi garaje y sucursales (Vértice).
- Llamada y WhatsApp simulados; barra de contacto en el teléfono.
- Fuentes y fotos servidas desde el sitio, con créditos en `/taller/creditos`.
- Añadir `npm run test:browser:taller` (5 de 5 aprobados) y catorce pruebas nuevas.

# V4.4.8 · 16 de noviembre de 2026 · Brío, lo que pedía la investigación

- Portada con «Clase de prueba gratis» como botón principal.
- Nivel, intensidad y qué traer en cada disciplina, con filtro por nivel y una guía «¿Cuál elijo?» en Clases.
- Añadir `/gimnasio/primera-visita`: llegada, qué traer, un primer entrenamiento y las horas tranquilas de cada sucursal.
- Aforo de hoy por hora, accesibilidad y estacionamiento en la ficha de cada sucursal.
- Planes: «Lo que no cobramos», cuatro preguntas de Profeco y opiniones de socios de ejemplo declaradas como inventadas; mantenimiento anual $0 en el alta.
- «Agregar a mi calendario» (archivo .ics) en reservas y evaluación.
- Corregir el botón principal de los diálogos, que perdía el fondo al pasar el ratón.
- Corregir Planes en el tema Distrito: el contenido se iba a la izquierda, el fondo claro no llegaba a la orilla la página se recorría al cambiar de tema y, de Distrito a Cobalto, la franja de planes destellaba en negro.
- Última revisión: Movilidad y Ritmo sin la foto de box en Clases, sin la promesa de reservar 48 h antes en el plan Total y tramos de horas sin cortes.
- Ocho pruebas nuevas y dos ampliadas.

# V4.4.7 · 15 de noviembre de 2026 · cierre de Gimnasio

- La Bienvenida enlaza Gimnasio (Brío).
- Pasada final con web-design-guidelines e impeccable: estados al pasar el ratón en botones y filtros, horas ocupadas tachadas, tema Distrito con esquema oscuro, margen al saltar a secciones, nombres en los campos, texto sin palabras sueltas y h2 en la tienda.
- Corregir el selector de tema que tapaba «Aviso de privacidad» a 1024 px y el menú del teléfono que no se cerraba al elegir la página actual.
- Añadir `npm run test:browser:gimnasio`: cinco recorridos de 320 a 1440 px, 5 de 5 aprobados.
- Core Web Vitals de laboratorio en diez páginas: LCP de 1.83 a 2.26 s y CLS de 0.000 a 0.071.

# V4.4.6 · 15 de noviembre de 2026 · Brío, coaches y tienda

- Añadir `/gimnasio/coaches`: seis coaches de ejemplo con su forma de trabajar, formación, clases y sucursales; filtro por objetivo y enlace a su horario.
- Evaluación gratuita con coach, sucursal, día y hora, una por persona, sin datos de salud; se puede cancelar.
- Paquetes de sesiones personales (1, 4 y 8) con precio por sesión y precio de socio, en el mismo carrito de la tienda.
- Añadir `/gimnasio/tienda`: diez productos con dibujo propio, ficha con variante, cantidad y piezas por sucursal, carrito con IVA desglosado y precio de socio, y pedido para recoger en sucursal sin cobro. «Tus pedidos» con cancelación.
- Encabezado con Coaches, Tienda y carrito; menú para teléfono, que faltaba en pantallas de 900 px o menos.
- El aviso de privacidad incluye y borra carrito, pedidos y evaluación.
- Quince pruebas nuevas.

# V4.4.5 · 15 de noviembre de 2026 · Brío, área de socio

- Añadir `/gimnasio/socio`: entrada simulada con el perfil de ejemplo (Andrea) y su panel: pase QR con «Simular entrada», semana de actividad, reloj «conectado» de forma simulada, pases de invitado según el plan, historial de composición corporal con gráfica y tabla, sus reservas, y la membresía.
- Congelar uno o dos meses, reactivar y cancelar en un paso, sin penalización; aviso de renovación cinco días antes, como pide Profeco.
- Aviso de privacidad propio de Brío, con botón para borrar todos los datos de la demo guardados en el navegador. La demo no pide datos de salud al visitante: los que se ven son inventados.
- La cabecera lleva «Entrar» o «Mi perfil», y la vista previa de Inicio enlaza al área de socio.
- Videos de Combate y Ciclo, de Wikimedia Commons (dominio público y CC BY 3.0), con créditos. Movilidad y Ritmo siguen sin medio.
- Tras la revisión de Ian: las tarjetas de clase de Inicio son el enlace para reservar, sin botón aparte. En reposo son una imagen fija en blanco y negro; al pasar el ratón, enfocarlas o tocarlas recuperan el color y corre su video (con el dedo, el segundo toque reserva). Los videos pasan a color: Combate y Ciclo como montajes de 9 a 10 s, Fuerza como una toma continua de 7.7 s centrada en la tarjeta. Planes en Inicio se titula «Tres niveles de experiencia», sin la nota de abajo. Se quita el botón «Pausar videos».
- Siete pruebas nuevas y dos ajustadas.

# V4.4.4 · 14 de noviembre de 2026 · Brío, Planes y alta

- Añadir `/gimnasio/planes`: comparador de las tres membresías con botón «Elegir» por plan, clase de prueba gratis y preguntas frecuentes.
- Añadir `/gimnasio/alta`: alta simulada en cinco pasos (plan y sucursal base, cuenta, salud, reglamento con firma, pago) con validación, procesamiento y resultado. El paso de salud solo explica el cuestionario; la demo no pide datos de salud. Nada se guarda ni se envía.
- Clase de prueba gratis desde Planes: una por persona, marcada en «Mis reservas».
- Primer video: Fuerza, un bucle de ida y vuelta de 3.4 s (77 kB) recortado de un video CC BY 3.0 de FitnessScape, con créditos y cambios declarados.
- Cuatro pruebas nuevas.

# V4.4.3 · 14 de noviembre de 2026 · Brío, página de Clases

- Añadir `/gimnasio/clases`: horario de los próximos siete días con filtros por día, disciplina, sucursal y coach.
- Reservar eligiendo bici, rack, costal o tapete; nombre para la recepción; procesamiento y confirmación con código. En una clase llena, lista de espera que avanza un lugar cada 12 s y avisa cuando se libera un lugar.
- «Mis reservas»: cancelar con la regla de 2 horas, simular el final de la clase y ver un resumen con minutos, calorías estimadas y minutos por zona, y calificar la clase y al coach.
- Las tarjetas de Inicio llevan «Reservar», que abre esa sesión en Clases. Componente de video con pausa global listo; los clips siguen pendientes porque Wikimedia Commons bloqueó las descargas.
- Ocho pruebas nuevas.

# V4.4.2 · 14 de noviembre de 2026 · Brío, mapa y lista de sucursales

- Quitar la ficha que flotaba sobre el mapa y tapaba la sucursal elegida.
- La lista de sucursales pasa a ser un acordeón: al elegir una se expande con dirección, horario de hoy, aforo, lo que tiene y su referencia, y el mapa se centra en ella. Elegir una marca del mapa abre su fila y la lleva a la vista dentro de la lista.
- En escritorio, mapa y lista tienen la misma altura y la lista se desplaza por dentro; en el teléfono la lista crece con su contenido.
- Una prueba reescrita para el acordeón.

# V4.4.1 · 14 de noviembre de 2026 · Brío, correcciones de la primera revisión

- Disco de la portada: gira mientras cruza la pantalla, en lugar de detenerse a los 1600 px; el giro se compone en una capa propia para que no se trabe en el teléfono. En pantallas de hasta 900 px va debajo de los botones.
- Planes en el teléfono: una tarjeta por plan que se apila al desplazarse, en lugar de la tabla ancha.
- Mapa real de Xalapa (MapLibre con el estilo oscuro de OpenFreeMap, como en Patio 12) en lugar del mapa dibujado. Las sucursales pasan a Centro, Los Lagos, Macuiltépetl, Tecajetes y Natura, junto a parques y paseos públicos de referencia.
- Una prueba nueva y dos ajustadas.

# V4.4.0 · 14 de noviembre de 2026 · Brío, primera entrega del gimnasio

- Añadir el giro Gimnasio con **Brío**, club ficticio de cinco sucursales, en `/gimnasio` (todavía sin enlace en la Bienvenida).
- Inicio con la dirección «Combinada»: disco de pesas que gira al desplazarse, aforo simulado por sucursal, mapa dibujado de las sucursales, próximas clases del horario, vista previa del área de socio con pase QR que cambia cada 30 s, y tabla de planes con precios con IVA.
- Dos temas de color, Cobalto y Distrito, sobre la misma estructura, guardados en el navegador.
- Fuentes Anybody y Public Sans servidas desde el sitio; cuatro fotos de Wikimedia Commons con su página de Créditos.
- Dieciséis pruebas nuevas.

# V4.3.6 · 14 de noviembre de 2026 · cierre de Café

- Añadir aviso de privacidad propio de Ladera con opción de borrar los datos guardados.
- Añadir alérgenos de ejemplo por producto, que cambian con la leche elegida.
- Indicar precios con IVA incluido y tamaño en ml o g en toda la carta.
- Añadir «Cómo llegar» con un botón de mapas simulado, la política de mascotas y «Dominio público» en Créditos.
- Cinco pruebas nuevas; pruebas de navegador ampliadas.

# V4.3.5 · 13 de noviembre de 2026 · Ladera «Tueste»

- Rediseñar Ladera con la dirección «Tueste»: paleta cálida, títulos en serif, fotografía real y relieve coloreado con la escala de tueste.
- Añadir once fotografías de Wikimedia Commons con autor y licencia, y la página de Créditos.
- Inicio: estado del local, cinta del día con pausa, «Lo que más se pide» y «Un lugar para quedarse».
- Fotos de encabezado en Carta, Origen, Prepara y Visítanos. Cuatro pruebas nuevas; pruebas de navegador ampliadas.

# V4.3.4 · 12 de noviembre de 2026 · cierre de Café

- Añadir Visítanos: horario, tarjeta de visitas con sellos por pedido recogido y reserva simulada de la cata de los sábados.
- Habilitar Café (Ladera) en la Bienvenida.
- Pasada final: deshacer al quitar líneas del pedido, confirmación al cancelar la cata, nombres en los campos y `touch-action`.
- Añadir pruebas de navegador de Ladera (`npm run test:browser:cafe`) y cinco pruebas unitarias. Medir Core Web Vitals de laboratorio.
- Cerrar Ladera sin fotografías de producto; quedan como mejora opcional para V4.8.

# V4.3.3 · 12 de noviembre de 2026

- Añadir Prepara en casa: recetas de gotero V60, Chemex, prensa francesa y moka, escaladas por tazas, con un temporizador real que marca cada vertido.
- Ofrecer el café del lote de la semana molido para el método elegido.
- Reorganizar el encabezado de Ladera para que quepa en el teléfono. Cuatro pruebas nuevas.

# V4.3.2 · 12 de noviembre de 2026

- Añadir Origen: perfil de altitud de los cuatro lotes, una ficha por lote con curvas de nivel y una guía para leer la ficha.
- Añadir café en grano: bolsas de 250 g o 1 kg con molienda según método, desde la carta o desde cada ficha.
- Abrir el gotero V60 con el lote de la ficha ya elegido; enlazar los lotes de Inicio con sus fichas.
- Dibujar las curvas de nivel al entrar en pantalla. Cinco pruebas nuevas.

# V4.3.1 · 12 de noviembre de 2026

- Añadir La carta de Ladera: 16 productos en cinco secciones por método, con personalización de leche, shots, azúcar, lote y cantidad.
- Añadir el pedido para recoger: hora calculada con el horario del local, nombre para el vaso, envío simulado y seguimiento acelerado en tres etapas, con vapor al estar listo.
- Conservar carrito y pedido al recargar. Seis pruebas nuevas.
- Fotografías de la carta pendientes de una fuente con licencia accesible desde el entorno.

# V4.3.0 · 12 de noviembre de 2026

- Iniciar el giro Café con **Ladera, café de altura**: una sola identidad y un solo local en Xalapa, según `docs/FICHA_CAFE.md`.
- Añadir la ruta `/cafe` con Inicio: horario y ubicación en la primera pantalla, curvas de nivel del lote de la semana, ficha técnica del lote, lista de lotes y horario de ejemplo.
- Servir Archivo y Source Serif 4 desde el sitio, con sus licencias.
- Añadir seis pruebas de Ladera. La Bienvenida no enlaza todavía a Café; se habilitará al cerrar V4.3.4.

# V4.2.5 · 16 de octubre de 2026

- Añadir navegación lateral de categorías a Carta y de países/estados a Locales, con selectores para móvil.
- Ampliar carta a 43 productos definidos: 27 comunes y 16 regionales; 28 visibles por local. Conservar precios e identificadores anteriores.
- Añadir una especialidad diferente por local, búsquedas y preferencias combinables, grupos y conteos. Mantener compatibilidad con `categoria=Platos`.
- Incorporar Oaxaca, Chiapas, Querétaro y Guanajuato; Austin/San Antonio en Texas y Los Angeles/San Francisco en California. Conservar CDMX–Chapultepec como selección inicial.
- Sincronizar filtros de país, estado y ciudad entre mapa/lista, con URL, recarga e historial. Mantener separados exploración y local del pedido.
- Conservar carrito al cambiar de local y bloquear confirmación de especialidades de otro local, con recuperación explícita y comprobación en el estado.
- Añadir 31 fotografías optimizadas con procedencia, licencia y créditos públicos; conservar las galerías anteriores.
- Ampliar comprobaciones de región, directorio, pedidos, QR, mapa, accesibilidad y tamaños; incluir actualización incremental desde la V4.2.4 publicada.

# Historial de cambios

## V4.2.4 · 2026-10-15

Base: V4.2.3 publicada (`672a7739f0c11a947a96b0b11a93c6f9eb077e2c`). Candidata para revisión; no publica ni cierra otras identidades de Restaurante.

- Sustituir seis fotografías por recursos locales de Pexels con autor, ficha pública, licencia y huella registrados. Ensalada y hamburguesa muestran dos tomas de una misma presentación. Retirar la segunda pasta que mostraba otra receta; conservar la toma con pesto.
- Mostrar queso realmente horneado y café negro. Ajustar la lista de verduras de ensalada y queso para acompañar las fotos; mantener sus precios e identificadores previos. Retirar la imagen de plato completo usada incorrectamente como extra de queso.
- Añadir transiciones breves de entrada de páginas, resultados de filtros y fotografías con dirección según el control o deslizamiento. Precargar las segundas vistas al aproximarse a la pantalla. Mantener marcos y encuadres completos.
- Confirmar añadir/editar mediante aviso con icono, texto y un pulso único del contador del carrito. Anunciar también acciones repetidas, conservar el foco de los controles y devolverlo al buscador tras recuperar resultados vacíos.
- Respetar movimiento reducido, incluso al activarlo durante la visita. Mantener visita, filtros, local, carrito, reserva y fechas de los temporizadores al navegar.
- Ampliar comprobaciones de teclado, tacto, fotografías, persistencia y movimiento reducido. Mantener portada temporal, Psicólogo y funcionalidades simuladas.

## V4.2.3 · 2026-10-15

Base: V4.2.2 publicada (`72a4c56da2a240fd572a2fc0a84bbb51645a8560`). Candidata para revisión de Ian, sin publicación automática.

- Separar Inicio, Carta, Locales, Conócenos, Pedido y Seguimiento en rutas propias; añadir fichas individuales para ocho locales simulados.
- Inicio presenta la marca, tres platos destacados, modalidades, reserva y ejemplos de locales. Se permite explorar sin ventana de entrada automática.
- Reunir la carta completa, categorías y filtros en su página; conservar búsqueda y filtros en la URL y al volver desde carrito/edición.
- Mostrar mapa general encima de las fichas, filtrar por ciudad y explorar marcadores sin cambiar el local del pedido. Conservar carga bajo demanda, geolocalización opcional y recuperación manual.
- Usar CDMX–Chapultepec como selección nueva para todas las modalidades, respetando sesiones y recibos anteriores. Identificar el local en barra, pedido, reserva y recibo.
- Conservar carrito al cambiar de local; reiniciar espera/asignación de mesa cuando corresponde. Un pedido confirmado mantiene su local. La reserva futura puede elegir otro independientemente.
- Mantener el contador entre páginas y giros, con retorno a Seguimiento; evitar duplicarlo mientras se muestra esa página.
- Extraer QR y selección de local en componentes propios, retirar el explorador modal sustituido y admitir enlaces antiguos de seguimiento y mesa.
- Ampliar pruebas de estado, rutas, móvil, teclado, mapas, QR y regresiones. Conservar carta común sin inventarios ficticios por local, Psicólogo aprobado y portada temporal.

## V4.2.2 · 2026-10-15

Base: V4.2.1 publicada (`53118a2d698327c30d8e5b6e4ed398e5358668ec`). Candidata para revisión de Ian; no se publica automáticamente ni se cierra el giro completo.

- Identidad de Patio 12 con sello propio, carta numerada, contador de fotos y entrada con ajustes secundarios desplegables.
- Porciones, proteína y guarnición según receta; tamaños de bebidas, temperatura de café, dulzor/hielo y combos de entrada pequeña más bebida con suplementos. Precio, clasificación, nutrientes y alérgenos consideran la configuración completa.
- Ocho puntos de demostración en siete ciudades mexicanas: referencias geográficas reales, sin presentarlas como sucursales. Selector compacto en teléfono y lista en escritorio.
- Mapa MapLibre/OpenFreeMap bajo demanda, worker local, atribuciones visibles, cobertura y trazos ficticios preparados, y recuperación ante fallos de red o WebGL.
- Geolocalización opcional bajo acción explícita, referencia más cercana en línea recta, sin persistir la coordenada.
- Pedido vinculado al punto al confirmar; preparación, ruta y total separados; avance del marcador según el mismo reloj y botón Avanzar simulación. Rechazo de entregas fuera de cobertura también en el modelo.
- Enlaces y QR descargables para puntos y mesas 1–25; QR de mesa ya ocupada separado de la espera normal, recuperación de enlaces inválidos y protección de la visita activa.
- Fechas, horas y recibos con huso del punto; migración del almacenamiento anterior sin perder su visita o perfil.
- Pruebas de integración y navegador para controles, mapa, QR, cobertura, precios, recuperación y accesibilidad. Se conserva Psicólogo y la portada temporal.

## V4.2.1 · 2026-10-08

Base: V4.2.0 publicada (`4cf4dc8b50e849aaaa7a23187fb89902b35332dc`), con source-map-js 1.2.2. Candidata para revisión de Ian; amplía Patio 12 y no cierra todavía todo el giro Restaurante.

- Se añade la elección inicial de comer aquí, para llevar o a domicilio y se conserva la reserva futura independiente.
- La espera de mesa dura un minuto, permite explorar y saltar la demostración, asigna una mesa del 1 al 25 una sola vez y habilita el pedido al terminar.
- Los doce productos tienen fotos locales, nombre y descripción a su lado. Tres productos tienen galería manual y deslizamiento táctil.
- Se añaden filtros de receta base, ingredientes, nutrientes y alérgenos ficticios, modificaciones de cantidades, retiro, extras ilustrados y sustituciones. El carrito conserva y permite editar cada configuración.
- El pedido distingue mesa, turno o entrega por zona ficticia, informa tarifa y tiempos y avanza por preparación, recogida/ruta y cierre simulados.
- El perfil opcional de ejemplo incorpora beneficios, visitas y recibos locales; pago digital ficticio disponible también para invitados, con vista de correo y explicación de factura sin emitir documentos fiscales.
- La visita y pedido se recuperan al recargar, con contadores basados en fechas de finalización, caducidad de seis horas y recuperación ante almacenamiento bloqueado.
- Contador rectangular semitransparente, arrastre táctil/ratón, esquinas, minimización, posición guardada y retorno a la misma visita desde otras rutas.
- Ventana externa opcional mediante Document Picture-in-Picture, con retorno y recuperación visible cuando el navegador rechaza la apertura. Termina junto con su pestaña.
- Se amplían las pruebas y la documentación de calidad, estado y procedencia de recursos. Se conserva la corrección de dependencias de la base.
- La portada temporal, los cuatro temas de Psicólogo y las identidades futuras mantienen el alcance acordado.

## V4.2.0 · 2026-10-05

Base: V4.1.3 (`d3c393cbc06eac8685f00911b7b3f17f6f606bd8`). Psicólogo aprobado por Ian el 2 de octubre. Primera entrega de Restaurante, pendiente de revisión.

- Se añade `/restaurante` con carga diferida y se habilita su entrada en el directorio temporal.
- Patio 12 tiene identidad, contenido, tipografía y composición propios de un restaurante de barrio.
- Carta con categorías, búsqueda, estado vacío y 12 productos con precios e ingredientes de ejemplo.
- Carrito en memoria con extras, cantidades, límite de nueve unidades por combinación, retiro de productos, recogida y entrega simuladas, totales y recibo.
- Reserva de mesa con fechas futuras, cierre de lunes, disponibilidad por tamaño de grupo e invalidación del horario al corregir la selección.
- WhatsApp adaptado al restaurante; ubicación ficticia, privacidad, ayuda y contacto comercial real.
- Fotografías WebP y fuentes WOFF2 locales con licencias; nombres de fuente aislados de otros giros.
- Navegación compartida admite IDs por giro y DemoBanner admite una guía propia. Los valores predeterminados de Psicólogo se conservan.
- Se añaden seis pruebas unitarias y recorridos de navegador de Restaurante. Los resultados y límites están en docs/VALIDACION_V4.2.md.
- Las otras identidades de Restaurante y la gestión de empleados continúan como entregas posteriores; no se cierra el giro completo.

## V4.1.3 · 2026-10-02

Base: V4.1.2 (`f08237f26916b619929b3f3b6230caac17032696`). Candidata al cierre de Psicólogo, pendiente del visto bueno de Ian.

- “Agendar” abre la reserva simulada; las acciones identificadas como WhatsApp conservan la conversación de demostración. Se armonizan el menú de Cálido y los iconos de reserva.
- Los diálogos mantienen el recorrido circular de Tab y Shift+Tab, Escape, aislamiento del fondo y devolución de foco.
- Al elegir una sección del menú, el foco continúa desde su encabezado. El indicador activo considera la altura del encabezado fijo.
- El retrato de Cálido se adapta a pantallas estrechas. La sala mantiene la solución 4:3 aprobada en V4.1.2.
- Se mejora el contraste de textos secundarios, números y pie de página. La llamada a reservar de Minimalista también se ve sin hover.
- Se amplían a 44 px los controles de menú, carrusel y privacidad y se añade espacio de desplazamiento para el foco.
- La clase de botones respeta las utilidades responsive: el menú móvil se oculta en escritorio.
- El selector retira el oscurecimiento al confirmar un tema y distingue ratón de uso táctil. El hover respeta movimiento reducido.
- La cédula de Minimalista se identifica como ejemplo. Su encabezado animado conserva espacios reales entre palabras.
- Se actualiza brace-expansion para corregir el aviso de seguridad detectado.
- Se añaden recorridos reproducibles de navegador con Playwright y axe-core como herramientas de desarrollo.
- Se conservan la portada temporal, los canales comerciales y el alcance de los giros futuros.

## V4.1.2 · 2026-09-09

Base: V4.1.1.

- La fotografía de la sala conserva su proporción original 4:3 en Cálido, Minimalista, Clínico y Naturaleza. El ancho es adaptable y la altura se calcula automáticamente.
- Se eliminan las alturas fijas y el recorte por `object-cover` de esa imagen. Sus dimensiones HTML reservan el espacio antes de que termine de cargar.
- La máscara ovalada de la sala en Naturaleza se sustituye por esquinas suaves para conservar el encuadre completo.
- La tarjeta de experiencia de Cálido pasa debajo de la fotografía para no cubrirla ni sobresalir hacia el borde de la pantalla.
- El archivo de dependencias incorpora la actualización de Browserslist y baseline-browser-mapping comprobada después de V4.1.1.
- Se mantiene el resto del alcance y las correcciones de V4.1.1.

## V4.1.1 · 2026-09-08

Base: V4.1 (`a39c869b4cbaff136aee282f434eae53a8818144`).

### Correcciones funcionales

- Todos los accesos al WhatsApp del negocio ficticio abren la conversación simulada. Se eliminan los enlaces al número de ejemplo.
- Las reservas invalidan modalidad y horario al cambiar de servicio. La orientación psicológica solo admite Online.
- La reserva permite cambiar servicio desde una preselección y después de reiniciar.
- Los controles se bloquean durante el procesamiento y los temporizadores se cancelan al cerrar o desmontar.
- Cada apertura del chat comienza con estado propio; desaparecen las carreras entre cierre, respuesta y reapertura.
- Los formularios comparten validación, etiquetas, errores asociados, estado de procesamiento y recuperación de foco.
- Se añade relleno con datos ficticios y se evita solicitar detalles de salud para probar el formulario.
- La navegación detecta la posición al montar un tema y vuelve a marcar Inicio cuando corresponde.
- Se añade una página 404, un estado visible de carga y recuperación ante fallos de carga de la aplicación.
- Las preferencias de tema inválidas o el almacenamiento bloqueado utilizan un tema válido de respaldo.

### Accesibilidad y presentación

- Diálogos nativos con nombre accesible, Escape, aislamiento del fondo, bloqueo del desplazamiento y devolución de foco.
- Menú móvil con el mismo mecanismo de diálogo y navegación de escritorio reservada a pantallas suficientemente anchas.
- Objetivos de 44 px en el selector y botones de icono; nombres y selección comunicados a tecnologías de asistencia.
- Indicador de foco, enlaces para saltar al contenido y regiones principales.
- Contraste mejorado en textos secundarios, formularios, acciones y diálogos oscuros.
- Se respeta la preferencia de movimiento reducido, incluidos desenfoques, desplazamientos y animaciones repetidas.
- La guía deja de aparecer automáticamente y pasa al botón “Cómo funciona”.
- Se ajusta el espacio inferior para el selector y la marca de agua.

### Coherencia del contenido

- Servicios, duración y modalidades comparten reglas entre temas.
- Se identifica el perfil, las credenciales y las reseñas como ejemplos ficticios.
- Se sustituye el título “Dra.” y se armoniza el enfoque del perfil de ejemplo.
- Las cifras de pacientes/satisfacción se sustituyen por información sobre servicios, duración y modalidades.
- La imagen etiquetada como consultorio se sustituye por una sala de referencia.
- Se elimina “Ver el caso de estudio”, que llevaba al formulario ficticio.
- El aviso de la demo describe el almacenamiento opcional y las solicitudes a proveedores externos.
- Se actualizan título y descripción al cambiar de ruta.

### Mantenimiento

- Versión del paquete 4.1.1, README propio, documentación de estado y validación.
- 21 pruebas de regresión e integración con Vitest, React y JSDOM.
- Dependencias de producción conservadas; herramientas de prueba añadidas con versión fijada.
- Se conserva la portada temporal y las cuatro identidades visuales. No se añaden giros, configurador comercial ni CV.

## V4.1 · 2026-08-26

Migración a carpetas por giro y carga diferida del código de psicología.
