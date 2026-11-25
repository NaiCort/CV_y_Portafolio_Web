# Estado de V4.8.5 · Correcciones del CV

22 de noviembre de 2026. Observaciones de Ian sobre V4.8.4.

## Construido en esta entrega

- **Sin repeticiones:** se quitó «Ver las 7 demos», porque las demos están a la derecha (en el celular, en «Demos»). Ya no queda otro enlace del CV que lleve a algo que ya se está viendo.
- **El proyecto propio cambia de nombre:**
  - antes era «Múltiples Demos»; ahora es **«CV y portafolio web»**, tipo «Proyecto independiente · el sitio que estás viendo»;
  - la descripción aclara que es esta misma página y que las demos se abren desde la sección «Demos»;
  - sigue siendo un enlace (con flecha) y lleva a la misma página, sin abrir otra pestaña;
  - el identificador interno (`multiples-demos`) no cambia.
- **Proyectos y experiencia** (decisión final de Ian, 23/11/2026):
  - primero se juntaron las cinco entradas en «Experiencia», como en el CV de noviembre;
  - después de revisar qué recomiendan las guías (separar lo propio del trabajo para otros y poner los proyectos arriba en perfiles junior), quedó así:
    - **Proyectos:** «CV y portafolio web»;
    - **Experiencia:** Rincón de Imágenes (sitio para un negocio local en funcionamiento, hecho como proyecto escolar), Servicio Social, Prácticas y Freelance;
  - el índice queda en Resumen, Proyectos, Experiencia, Educación y Certificaciones;
  - Ian actualizó el PDF del CV con el mismo orden y la experiencia completa (23/11/2026, segunda versión); se sirve en la misma ruta, `/cv/cv-ian-aldana-noviembre-2026.pdf`;
  - donde el PDF y el sitio chocan, manda el PDF: Rincón de Imágenes es «Proyecto independiente (Astro)» y Prácticas va sin «Full-Stack Jr». El sitio conserva detalles que suman, como «tablas, búsqueda y carga» y «control de calidad básico»;
  - el PDF no aclara que el proyecto es este sitio (se entrega fuera del sitio); el sitio sí.
- **Rincón de Imágenes ampliado** (24/11/2026):
  - se clonó `NaiCort/rincon-de-imagenes` (solo lectura) y se revisó su código;
  - el texto nuevo describe lo que de verdad tiene el sitio:
    - catálogo generado desde carpetas (26 obras, 3 categorías);
    - script `sharp` de TIFF a WebP (8 fotos, de 75.5 MB a 1.96 MB, medido en el repositorio);
    - WhatsApp con mensajes prellenados, redes y mapa;
    - SEO y Open Graph;
    - dominio y despliegue en Cloudflare (los hizo Ian);
    - fotografía del local y del escultor (las de las piezas las dio el dueño);
  - Ian lo puso en el PDF (cuarta versión, con la fecha «Mayo 2026 — Actualidad», según el historial del repositorio) y el sitio usa el mismo texto y la misma fecha;
  - no se publican cifras de Lighthouse: varían en cada medición y caducan con cada cambio.
- **Notas innecesarias quitadas del CV** (Ian, 23/11/2026):
  - «CV actualizado en noviembre de 2026. Los datos coinciden con el PDF y con LinkedIn.»;
  - la nota bajo «Demos» («Sitios de ejemplo… todo lo que se puede tocar funciona»).

  En las demos, los avisos que pide el principio rector (aviso de demo, autoría y «datos de ejemplo») se quedan; las aclaraciones repetidas o no pedidas se revisan página por página al rehacer cada demo (V4.8.10 en adelante).
- **Experiencia completa:**
  - el texto del CV de noviembre en cada punto, sin resumir, más lo que solo traía el CV visual (vistas, módulos web y conexión con la base de datos, tablas, búsqueda y carga, versionado y documentación técnica, entregables remotos y control de calidad básico);
  - los puestos usan los nombres del CV de noviembre (Servicio Social · Analista de Datos / Desarrollo Web);
  - las prácticas conservan «Full-Stack Jr» del CV visual.
- **Certificaciones como enlaces:** cada una abre su PDF en otra pestaña (`public/cv/certificados/`), con el mismo diseño de tarjeta y flecha que los proyectos. Los PDF incluyen nombre, calificación, folio y liga de verificación de la Fundación Carlos Slim.
- **Sin línea de tiempo:**
  - repetía las fechas;
  - no tenía meses exactos (dibujaba Mecatrónica hasta finales de 2022, como si llegara a 2023);
  - con 8 filas no aportaba más que la lista.

  El motivo queda en `IDEAS_CV.md` y el código, en git.
- **Índice:**
  - al llegar al final de la columna central se marca «Certificaciones», que antes se quedaba en «Educación» porque la última sección nunca llega a la franja superior;
  - además, la sección elegida en el índice queda marcada mientras dura el desplazamiento.
- **Franja blanca a la derecha en escritorio** (tercera observación de Ian):
  - la causa era `scrollbar-gutter: stable` en `html` (`src/index.css`), que reserva el canal de la barra de la página para que las demos no salten; en el CV la página no se desplaza, así que el canal quedaba vacío y con el fondo blanco por defecto;
  - `cv.css` lo desactiva solo donde hay `.cv-root` (CV y cotizador), con `html:has(.cv-root)`, y pinta el fondo de la página en carbón;
  - además, en escritorio (900 px o más), `html` y `body` no se desplazan en el CV, porque este ocupa exactamente la ventana; así no puede aparecer ninguna barra de página;
  - la captura de Ian del 21/11/2026 era de producción (`main`), donde esta corrección todavía no está;
  - las demos conservan el canal.
- **Plan:**
  - PDF y buscadores pasan a V4.8.6, y el cierre a V4.8.7;
  - la cuadrícula tipo Excel de V4.8.3 queda anotada para Cotejo (V4.8.60).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.5.md](VALIDACION_V4.8.5.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 65 a 75, del 21 al 24/11/2026).

## Pendiente

- **Ian:**
  - cambiar el nombre del proyecto en el PDF del CV y en LinkedIn, para que coincidan (Sitio Profesional, 5.2);
  - decidir si se renombra el repositorio.
- V4.8.6: buscadores y PDF.
- V4.8.7: cierre y Documento Maestro.
