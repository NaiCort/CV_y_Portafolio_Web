# Estado de V4.8.6 · Buscadores y nombre nuevo

25 de noviembre de 2026. Ian renombró el repositorio a `NaiCort/CV_y_Portafolio_Web` y el proyecto de Vercel a `cv-y-portafolio-web`. También agregó el dominio `cv-y-portafolio-web.vercel.app`; `multiples-demos.vercel.app` redirige a él.

## Construido en esta entrega

- **Portada prerenderizada** (Sitio Profesional, sección 11):
  - `npm run build` compila la aplicación y luego `scripts/prerender.mjs`;
  - el script compila `src/entry-server.jsx` para Node, renderiza la portada con `renderToString` y la escribe en `dist/index.html`;
  - el HTML vacío de la aplicación se guarda como `dist/app.html`.
- **Rutas:**
  - `vercel.json` manda toda ruta distinta de `/` a `app.html`, y el servidor de vista previa (`vite.config.js`) hace lo mismo;
  - así, las demos no muestran el CV ni un instante.
- **Hidratación:**
  - `src/main.jsx` usa `hydrateRoot` cuando la raíz ya trae HTML (la portada) y `createRoot` cuando llega vacía (las demás rutas);
  - el render del servidor replica el `Suspense` de `App.jsx`;
  - la precarga de la foto que React 19 antepone al HTML se mueve a la cabecera.

  Resultado: sin errores de hidratación y sin repetir la animación de entrada.
- **Metadatos de la portada:**
  - URL canónica, `og:url` y `og:image` (la foto de 1024 px);
  - datos estructurados `Person` de schema.org, construidos con los mismos datos de `cv.js`: nombre, puesto, foto, correo, teléfono, Xalapa, LinkedIn, GitHub, IVES, idiomas y habilidades.
- **Buscadores:** `public/robots.txt` y `public/sitemap.xml`, con la portada, las siete demos, los tres sitios de la Revista y el cotizador.
- **Nombre nuevo:**
  - `package.json` (`cv-y-portafolio-web`), título e introducción de `CLAUDE.md`;
  - README nuevo para todo el proyecto (el anterior, de Patio 12 en V4.2.5, pasa a `docs/README_PATIO12_V4.2.5.md`);
  - enlace al repositorio en los créditos de Patio 12.
- **PDF:** queda decidido que el CV en PDF lo mantiene Ian (Canva) y el sitio lo sirve tal cual. No se genera desde los datos.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.6.md](VALIDACION_V4.8.6.md)).
- Desplegado en producción: sí (pull requests 76 a 78, integrados por Ian el 25/11/2026).

## Pendiente

- ~~**Ian:** cambiar la descripción del repositorio en GitHub~~ (hecho el 25/11/2026: «CV y Portafolio Web con demos interactivas»).
- ~~**Ian:** el enlace del proyecto en el PDF del CV~~ (hecho el 25/11/2026: el PDF nuevo enlaza a `cv-y-portafolio-web.vercel.app` y ya se sirve en `public/cv/`).
- Revisar en Google Search Console que la portada se indexe, cuando Ian quiera darla de alta.
- V4.8.7: pasada final, cierre y Documento Maestro.
- Después:
  - cotizador base (V4.9);
  - demos (V4.10);
  - versión en inglés;
  - LinkedIn.
