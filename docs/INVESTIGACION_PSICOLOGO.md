# Investigación para la demo de Psicólogo

25 de noviembre de 2026. Análisis del sitio de una psicóloga real que compartió Ian (Laura Merlo) e investigación del giro, hechos en la conversación sin modificar el repositorio. Se guarda aquí para aplicarla en **V4.10.10**. Decisión de Ian del 25/11/2026: Psicólogo se queda como **landing de una sola página**.

## 1. El sitio de Laura Merlo frente a nuestra demo

### ¿Es una landing page?

Sí. Es un sitio de **una sola página** con secciones a las que se salta desde el menú (`#inicio`, `#sobre-mi`, `#contacto`…), y toda la acción ocurre fuera: Calendly para agendar y WhatsApp para escribir. Es una landing larga y bien surtida, pero entra en la categoría «Landing» del cotizador del Sitio Profesional («sitio de una sola página»), no en «varias páginas». Nuestra demo de Psicólogo también es, en el fondo, una landing por tema.

### Dónde es mejor que nuestra demo

- **Posicionamiento claro:** dice su enfoque (conductual contextual, terapias basadas en evidencia), a quién atiende (adolescentes y adultos) y cómo trabaja («No es solo hablar»). Nuestra demo es más genérica.
- **Más servicios y más concretos:** psicoterapia, certificados de aptitud, psicodiagnóstico, examen psicotécnico y evaluación psiconeurológica. Además tiene una sección para **colegas y empresas** (supervisión, tesis, talleres). Nosotros tenemos tres servicios.
- **Persona real:** tres fotos suyas en consulta. Nuestra demo usa fotos de banco de imágenes, y las guías del sector coinciden en que eso resta credibilidad.
- **Datos prácticos:** sesiones de 45 minutos, sesiones en línea por Meet o Zoom, presencial en Mendoza o en línea para todo el mundo.
- **Varios mensajes de WhatsApp ya escritos**, según el punto de la página desde donde escribes.
- **Metadatos completos:** Open Graph con imagen y URL canónica.

### Dónde es peor que nuestra demo

- **No dice nada sobre crisis o emergencias.** Un sitio de salud mental debería decir que no atiende urgencias y a dónde llamar.
- **Matrícula sin número:** dice «Matrícula Profesional Provincial y Nacional» pero no la muestra, así que no se puede verificar. Nuestra demo sí muestra la cédula, aunque es de ejemplo.
- **Sin aviso de privacidad,** aunque manda a la gente a Calendly y a WhatsApp. Nuestra demo sí tiene uno.
- **Todo depende de servicios externos:** agendar es salir del sitio. Nuestra demo tiene su propio flujo de reserva (servicio → modalidad → horario → confirmación), simulado pero completo.
- **No muestra precios.**
- **No tiene preguntas frecuentes:** solo tres datos clave.
- **Errores de código:**
  - un recuadro translúcido vacío encima de la foto de «Sobre mí»;
  - un botón flotante de WhatsApp duplicado: un bloque con texto emergente pero sin enlace, y luego el botón real;
  - un `<div>` dentro de un `<p>`;
  - títulos que saltan de h2 a h4.
- **Rendimiento:** carga Google Fonts y Material Symbols en tiempo real, con `display=block`, así que los íconos pueden mostrarse un momento como texto («event_available»).
- **Aspecto de plantilla generada:** la estructura (`surface-container`, `on-surface-variant`…) es la de una plantilla de Material Design, y acumula los patrones que nuestra guía de identidad vigila:
  - etiqueta sobre cada título;
  - ícono en cada tarjeta y tarjetas iguales;
  - numeración «Pilar 01–04» y pasos 1-2-3;
  - una fila de cifras con «100 % Confidencial y Ético», que no es una cifra real;
  - degradados, vidrio en la cabecera y un punto que parpadea;
  - Title Case en todo.

  Funciona, pero se ve genérico.

**En resumen:** en contenido y en enfoque de negocio nos gana. En oficio (accesibilidad, privacidad, flujo propio, honestidad de los datos) le ganamos. La demo nueva debería juntar las dos cosas.

## 2. Investigación para mejorar la demo

### 1. Lo que buscan los pacientes

- **Encajar con la persona:** quieren adivinar su personalidad y su estilo de trabajo. En una encuesta informal, el 78 % se quejó de no poder hacerlo.
- **Saber cómo funciona el proceso:** muchos nunca han ido a terapia.
- **Los datos de siempre:** especialidades claras, ubicación, si hay lugar disponible y los honorarios.
- **No esconder información:** las guías del sector señalan como error frecuente ocultar ubicación, especialidades o precios, así como no tener reserva en línea.

Casi todo esto viene de blogs de mercadotecnia para terapeutas, no de estudios formales. Tómalo como tendencia, no como dato duro.

### 2. Ética y ley en México

Esto es lo que más cambiaría la demo.

- **Testimonios:** el código ético de la APA (norma 5.05) prohíbe pedir testimonios a pacientes actuales. Un estudio canadiense encontró que el 39 % de los testimonios en sitios de psicólogos contenía datos que podían identificar al paciente. Nuestra sección «Reseñas» simula justo eso. Es mejor reemplazarla por un enlace a reseñas públicas (Google o Doctoralia) o quitarla. El Código Ético del Psicólogo de la Sociedad Mexicana de Psicología regula las declaraciones públicas, pero no pude confirmar en línea su artículo exacto sobre testimonios.
- **Datos de salud:** desde el 20 de marzo de 2025 rige la nueva Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Los datos de salud son sensibles y requieren consentimiento **expreso y por escrito**, no basta una casilla. Para la demo, el formulario no debería pedir el motivo de consulta en detalle; basta un mensaje general. El aviso de privacidad debe señalar los datos sensibles. Esto conviene confirmarlo con un abogado.
- **Crisis:** hace falta un bloque visible: «Este sitio no atiende emergencias. Si estás en riesgo, llama al 911 o a la Línea de la Vida, 800 911 2000 (gratuita, confidencial, 24 horas)».
- **Cédula verificable:** mostrar el número con un enlace al Registro Nacional de Profesionistas de la SEP (cedulaprofesional.sep.gob.mx), que es la forma oficial y gratuita de comprobarla. En la demo sería un número ficticio, marcado como tal.
- **Terapia en línea:** las guías de la APA piden consentimiento informado específico, un plan de emergencia y confirmar en cada sesión dónde está el paciente. En la demo puede ser una sección «Cómo es la terapia en línea»: lugar privado, conexión y qué pasa si se corta.
- **Factura:** los honorarios de psicología son deducibles en la declaración anual si se pagan por un medio trazable (transferencia o tarjeta) y la factura la emite alguien con título registrado. Si cobran IVA hay fuentes que se contradicen, así que en la demo pondría solo «factura deducible» sin hablar de IVA.

### 3. Precios de referencia

- **En Doctoralia (Ciudad de México):** las consultas en línea van de 250 a 1,500 pesos, y muchas están entre 500 y 850.
- **Promedio:** un sitio de comparación estima 900 pesos por sesión presencial.
- **Para la demo:** una sesión ficticia de 650 a 800 pesos sería realista, más un precio social o escalonado, que es común y transmite cercanía.

### 4. Funciones que valdría la pena añadir

- **Primera sesión:** qué esperar, duración, política de cancelación (por ejemplo, 24 horas) y límites de la confidencialidad.
- **Preguntas frecuentes:** ¿cuántas sesiones?, ¿en línea funciona igual?, ¿atiendes adolescentes?, ¿das factura?
- **Motivos de consulta:** ansiedad, duelo, autoestima, pareja, cada uno en dos líneas.
- **Reserva más completa,** a partir de la que ya tenemos:
  - elegir presencial o en línea;
  - zona horaria para la modalidad en línea;
  - confirmación con recordatorio simulado por WhatsApp;
  - nada de datos de salud.
- **Autoevaluación orientativa** (PHQ-9 de ánimo o GAD-7 de ansiedad). Sería la función más llamativa, pero también la más delicada. Requiere:
  - aclarar que no es un diagnóstico;
  - no guardar nada;
  - mostrar la línea de crisis junto a la pregunta sobre autolesión;
  - citar las bandas de gravedad.

  Las guías coinciden en ese patrón, aunque no hay una norma oficial que lo regule.
- **Instituciones y colegas** (idea de Laura Merlo): una sección corta de supervisión o talleres.
- **Recursos:** dos o tres artículos breves de psicoeducación. Dan detalle y ayudan a los buscadores.
- **SEO local:** datos estructurados de tipo `Psychologist` / `MedicalBusiness` con la ubicación en Xalapa.

### 5. Lo que ya teníamos pendiente

- Fotos servidas desde el sitio y no desde Unsplash.
- Quitar Inter en el tema Cálido.
- Consolidar los cuatro temas: unas 1,000 líneas cada uno con mucho código duplicado.
- Hacer las fichas de identidad que faltan.

## Decisión tomada (25/11/2026)

Casi todas las demás demos son sitios de varias páginas. Ian decidió que Psicólogo **se queda como landing**: una sola página, más completa, con lo de arriba. Así el cotizador tiene una demo de referencia para la categoría «Landing», la más barata y la que más pedirán los profesionales independientes. Los cuatro temas siguen mostrando que una misma landing puede verse muy distinta.

## Fuentes

- [Código ético de la APA (texto de 2002, enmendado en 2016)](https://www.apa.org/pubs/books/supplemental/Essential-Ethics-Psychologists/ethicalrelate.pdf)
- [APA: consideraciones profesionales con medios](https://www.apa.org/research-practice/working-with-media/professional-considerations)
- [Estudio canadiense sobre sitios de psicólogos y testimonios](https://unbscholar.dspace.lib.unb.ca/server/api/core/bitstreams/554c47b2-a7ac-42af-bcb9-5ef88558a9f3/content)
- [Código ético (posgrado de Psicología, UNAM)](https://psicologia.posgrado.unam.mx/wp-content/uploads/2025/08/CODIGO-ETICO.pdf)
- [LFPDPPP 2025 (Cámara de Diputados)](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- [KPMG: nueva LFPDPPP](https://kpmg.com/mx/es/tendencias/2025/04/flash-nueva-ley-federal-de-proteccion-de-datos-personales-en-posesion-de-los-particulares.html)
- [Usercentrics: LFPDPPP](https://usercentrics.com/es/knowledge-hub/lfpdppp-mexico/)
- [Justia: aviso de privacidad](https://mexico.justia.com/derecho-corporativo/aviso-de-privacidad/preguntas-y-respuestas-sobre-aviso-de-privacidad)
- [La Línea de la Vida (Criterio Hidalgo)](https://criteriohidalgo.com/noticias/mexico/la-linea-de-la-vida-que-es-como-llamar-y-que-apoyo-ofrece)
- [ReachLink: cómo pedir ayuda en salud mental en México](https://www.reachlink.com/mx/consejos-mx/como-hacer-mx/como-pedir-ayuda-en-salud-mental-guia-para-mexico/)
- [Expansión: verificar cédula profesional](https://expansion.mx/ciencia-y-salud/2024/11/08/verificar-cedula-profesional)
- [Guía 2026 para consultar el RNP](https://news.culturacolectiva.com/noticias/mexico/consultar-cedula-profesional-rnp-sep-guia-2026/)
- [APA: lista de verificación de telepsicología](https://www.apa.org/topics/disasters-response/telepsychological-services-checklist)
- [Guías de telepsicología de la APA 2024](https://telehealth.org/news/the-apas-2024-telepsychology-guidelines-what-clinicians-need-to-know/)
- [Lo que buscan los pacientes: perspectiva de quien busca terapia](https://lavender-carrot-rtxk.squarespace.com/blog-list/pov-the-therapy-seeker-what-therapists-need-to-know-about-the-therapy-search-process)
- [Therapist Site Toolbox: qué quieren ver los clientes](https://therapist-site-toolbox.squarespace.com/blog/what-therapy-clients-want-website)
- [eSEOspace: cómo eligen terapeuta los clientes](https://eseospace.com/blog/how-clients-choose-a-therapist-online/)
- [10 errores en sitios de terapeutas](https://poodle-emu-jhah.squarespace.com/web-design-for-therapists-blog/10-website-traps-therapists-should-avoid-and-how-to-fix-them)
- [Fotos de personas en sitios de terapia](https://highfivedesignco.squarespace.com/blog/photos-of-people)
- [Cómo un sitio de psicólogo genera confianza sin verse genérico](https://dev.to/elliemiguel/how-a-psychologists-website-builds-trust-without-looking-generic-ne8)
- [Doctoralia: psicólogos en la Ciudad de México](https://www.doctoralia.com.mx/psicologo/ciudad-de-mexico)
- [Cuánto cuesta un psicólogo privado](https://cuantomecuesta.com/mx/psicologo-privado/)
- [Praxium: los psicólogos cobran IVA](https://praxiumconsultores.com/blog/psicologos-cobran-iva-la-exencion-medica-no-los-incluye)
- [IDConline: servicios de psicólogo exentos de IVA](https://idconline.mx/fiscal-contable/2020/12/07/exentos-de-iva-los-servicios-de-un-psicologo)
- [Expansión: deducción de gastos médicos](https://expansion.mx/finanzas-personales/2026/02/05/no-podras-deducir-tus-gastos-medicos-si-cometes-este-error)
- [NC State: evaluación GAD-7](https://counseling.dasa.ncsu.edu/?p=42311)
- [Apple: evaluaciones de salud mental](https://support.apple.com/en-mide/105070)
- [Guía de datos estructurados para salud](https://schemaapp.com/wp-content/uploads/2024/03/Definitive-Guide-to-Healthcare-Structured-Data-in-SEO.pdf)