# Validación de V4.10.7

**Entorno:** Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`, que aplica los encabezados de `vercel.json` (política de contenido aplicada). 28 de noviembre de 2026. Cada comando se comprobó con su propio código de salida, sin tuberías que lo oculten.

## Comandos y resultados

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Código 0 |
| `npm run format:check` | Código 0 |
| `npm test` | Código 0: 422 pruebas en 48 archivos; las 3 de `tests/v4107-handbook.test.js` son nuevas |
| `npm run build` | Código 0 |
| `npm run audit:presupuesto` | Código 0: JavaScript inicial de 83.9 KB en la portada y 76.2 KB en las demás rutas; CSS de 8.9 y 5.4 KB; ruta más pesada de 61.0 KB. Igual que en V4.10.6 |

## Navegador

- **CV y cotizador:** 5 de 5 escenarios (320, 390, 768, 1024 y 1440 px), cada uno con axe, desbordes, ningún envío real y ningún aviso de la política de contenido.
- **Las demás suites no se corrieron:** esta versión no cambia el código del sitio, solo documentos, la versión de `package.json` y una prueba unitaria. El presupuesto da las mismas cifras que en V4.10.6.

## Handbook único

En `NaiCort/Digital-Development-Handbook`, rama `claude/dreamy-dirac-f4eyij` (versión 1.3.0):

| Comando | Resultado |
| --- | --- |
| `python3 scripts/validate_handbook.py` | Código 0: «Markdown: 1366 \| reglas: 22 \| lecciones: 30 \| disciplinas: 35 \| plantillas: 68 \| errores: 0» |
| `python3 -m unittest discover -s tests -v` | Código 0: 12 pruebas |
| `python3 labs/retrieval/evaluate.py --check` | Código 0, con el historial de `main` descargado |

## Puertas del handbook (G0 a G7)

| Puerta | Estado | Evidencia |
| --- | --- | --- |
| G0 Producto | Aprobado | DEC-033, decisión de Ian del 28/11/2026 |
| G1 Arquitectura | No aplica | Sin cambios de código, rutas ni datos |
| G2 Diseño | No aplica | Sin cambios visibles |
| G3 Implementación | Aprobado | Lint, formato, 422 pruebas, compilación y presupuesto |
| G4 Seguridad | Aprobado | Política aplicada sin avisos en la suite del CV; sin cambios en `vercel.json` ni en dependencias |
| G5 Accesibilidad automatizada | Aprobado | axe en los 5 escenarios del CV |
| G5 Accesibilidad manual | No ejecutado | TalkBack y teclado en el teléfono de Ian |
| G6 Rendimiento | Aprobado | Presupuesto con las mismas cifras que V4.10.6 |
| G7 Publicación | No ejecutado | Ian integra. Después, consola del sitio publicado en InPrivate (`DESPLIEGUE.md`) |

## No comprobado

- **Dispositivos de Ian:** su teléfono Android (Chrome o Edge) y Edge en su PC.
- **Suites de navegador de las demos:** no se corrieron (ver «Navegador»).
- **Handbook 1.3.0 en `main`:** vive en su rama hasta que Ian la integre.
