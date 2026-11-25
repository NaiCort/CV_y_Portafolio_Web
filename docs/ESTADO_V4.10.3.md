# Estado de V4.10.3 · Adopción del Digital Development Handbook

25 de noviembre de 2026. Pedido de Ian: complementar los dos repositorios.
- **El portafolio completo es la demo piloto** de `Digital-Development-Handbook-Claude`. Eso incluye el CV, las demos y el cotizador.
- **El portafolio aplica el contenido del handbook.**

El análisis previo, que no cambió nada, encontró los huecos que esta versión cierra. El número de versión es la propuesta DEC-019.

## Construido

### Seguridad (puerta G4)

**`vercel.json` envía en todas las rutas:**
- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: DENY`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy`: sin cámara, micrófono, pagos, USB ni temas publicitarios; ubicación solo propia, para el «local más cercano» de Patio 12;
- HSTS de dos años;
- una política de contenido corta, aplicada: `frame-ancestors`, `base-uri`, `object-src` y `form-action`.

La política de contenido completa (scripts y estilos propios, imágenes y mapas de OpenFreeMap) va «solo en reporte» hasta revisarla en la vista previa de Vercel (DEC-020).

**La vista previa local (`vite.config.js`):**
- lee los encabezados del mismo `vercel.json`;
- con `CSP_ESTRICTA=1`, aplica también la política completa.

**Pruebas:**
- las suites de navegador fallan ante cualquier aviso de la política de contenido;
- axe se inyecta por el canal de depuración del navegador, para que la política siga activa al probar.

**Dependencias:**
- Tailwind pasa a `devDependencies`;
- vite 8.3.8, vitest 5.1.2, undici 8.13.1 y zod 4.6.7 (dentro de los rangos permitidos).

Resultado: producción, sin avisos. Desarrollo: 3 moderados de `minimatch` dentro de ESLint, sin versión compatible.

**CI:** audita las dependencias de producción (`npm audit --omit=dev --audit-level=high`).

### Privacidad (regla GEN-008)

- **Página `/privacidad`**, con la paleta del CV. Dice:
  - quién es responsable;
  - qué datos recibe Ian (cotizador y contacto del CV) y para qué;
  - con quién se comparten y cuánto tiempo se conservan;
  - cómo ejercer los derechos ARCO;
  - qué queda en el navegador;
  - qué terceros reciben peticiones (Vercel y OpenFreeMap).

  Solo afirma lo que hace el código.
- **Enlaces:** desde la columna de contacto del CV y desde el paso «Revisa y envía» del cotizador, que además resume el uso de los datos.
- **Falta (DEC-024):** que Ian confirme el domicilio completo y una revisión legal antes de recibir solicitudes reales.

### Rendimiento (regla GEN-011)

- El cotizador y el aviso se cargan aparte (`src/rutasDemo.js`). El CV los precarga al pasar el cursor o enfocar su enlace. Mientras cargan, el aviso de espera dice «Cargando…» (antes, «Cargando demo…»).
- El trozo principal bajó de 113.8 a 83.2 KB comprimidos.
- **Nuevo `npm run audit:presupuesto`** (`scripts/presupuesto.mjs`), que mide sobre la compilación:
  - el JavaScript inicial, en 100.0 KB de 110;
  - el CSS inicial, en 8.8 KB de 12;
  - el trozo de ruta más pesado, en 61.0 KB de 70.

  Falla si se pasa del presupuesto, y corre en CI.

### Documentación del handbook

- **Documentos nuevos en `docs/`:**
  - `HANDBOOK.md`: adopción, perfiles, equivalencias y estado de cada regla GEN;
  - `README.md`: índice de `docs/`;
  - `DECISIONES.md`: DEC-001 a DEC-024;
  - `TRAZABILIDAD.md`: transversal, cotizador y Psicólogo;
  - `SEGURIDAD.md`: datos, SEC-001 a SEC-012, accesibilidad y riesgos;
  - `RENDIMIENTO.md`;
  - `DESPLIEGUE.md`;
  - `LICENCIAS.md`.
- **Psicólogo:** nuevo registro de fotos con su huella (`public/psicologo/medios-origen.json`), como las demás demos.
- **`PLAN_V4.8.md`:** V4.10.3 y la lista fija de cada entrega de V4.10. Patio 12 empieza en V4.10.4.
- **`CLAUDE.md`:** sección de metodología, comprobaciones con presupuesto y pendiente 8 actualizado.
- **`README.md`:** datos viejos corregidos (cuatro temas, cotizador provisional, Node 22.12 y puerto 5173) y ruta `/privacidad`.
- **`sitemap.xml`:** con `/privacidad`.

### En el handbook (repositorio aparte, versión 1.1.0)

Va en la rama `claude/great-edison-k9xun2` del repositorio `Digital-Development-Handbook-Claude`:
- **Piloto** `examples/cv-y-portafolio-web/`, con su README (equivalencias, puertas y forma de trabajo) y `LESSONS.md` (18 lecciones);
- **lecciones** incorporadas como recomendaciones en ocho disciplinas;
- **perfil nuevo** «Portafolio con demos de negocio»;
- **edición para Claude:** `AI-WORKFLOW`, `CLAUDE.md`, la plantilla CLAUDE y las habilidades;
- **validador** actualizado.

El ejemplo anterior de Psicólogo queda como historial (SUPERSEDED).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.10.3.md](VALIDACION_V4.10.3.md)).
- Desplegado en producción: sí. Ian lo integró en `main` (pull request #89, 25/11/2026). Luego revisó la consola del sitio publicado: sin avisos de la política de contenido. El único error venía de una extensión del navegador y desapareció en una ventana InPrivate.

## Pendiente

- **Ian:**
  - revisar la vista previa (CV, cotizador, `/privacidad` y las demos);
  - decidir DEC-019 (número de versión) y las propuestas DEC-020 a DEC-023;
  - aportar lo de DEC-024 (domicilio y revisión legal del aviso);
  - integrar los dos repositorios cuando le parezca.
- **Siguiente entrega:** Patio 12 (V4.10.4), con la lista fija de `PLAN_V4.8.md`.
