# Validación de V4.10.4

**Entorno:** Node 22 y Chromium de Playwright, compilación de producción con `vite preview`, que aplica los encabezados de `vercel.json`. 25 de noviembre de 2026. Cada comando se comprobó con su propio código de salida, sin tuberías que lo oculten.

## Comandos y resultados

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Código 0 |
| `npm run format:check` | Código 0 |
| `npm test` | Código 0: 401 pruebas en 45 archivos; la nueva comprueba que la política completa va aplicada y que no queda versión «solo en reporte» |
| `npm run build` | Código 0 |
| `npm run audit:presupuesto` | Código 0 (sin cambios: JavaScript inicial de 100.0 KB, CSS de 8.8 KB, ruta más pesada de 61.0 KB) |

- **Encabezado en la vista previa:** `curl -sI /cotizador` devuelve una sola `Content-Security-Policy` con la política completa, y ninguna «solo en reporte».
- **Recorrido de 23 rutas con la política aplicada:** CV, cotizador, cada demo y sus páginas principales, y una ruta inexistente, bajando hasta el final de cada una. Resultado: 0 avisos de la política y 0 errores de página. Los mapas cargan en Psicólogo, Brío y Taller.
- **Suites de navegador con la política aplicada:**

  | Suite | Resultado |
  | --- | --- |
  | CV y cotizador | 5 de 5 |
  | Psicólogo, Patio 12, Ladera, Brío, Taller, Cotejo y Revista | En curso |

## Puertas del handbook (G0 a G7)

| Puerta | Estado | Evidencia |
| --- | --- | --- |
| G0 Producto | Aprobado | DEC-020, aprobada por Ian tras revisar la consola del sitio publicado |
| G1 Arquitectura | Aprobado | Sin cambios de datos ni de rutas; solo el encabezado |
| G2 Diseño | No aplica | Sin cambios visuales |
| G3 Implementación | Aprobado | Lint, formato, 401 pruebas, compilación y presupuesto |
| G4 Seguridad | Aprobado en la vista previa local; no ejecutado en producción | Política aplicada sin avisos en 23 rutas y en las suites ya terminadas |
| G5 Accesibilidad automatizada | En curso | axe en las suites |
| G5 Accesibilidad manual | No ejecutado | TalkBack y teclado en el teléfono de Ian |
| G6 Rendimiento | Aprobado | Presupuesto sin cambios; la política no añade descargas |
| G7 Publicación | No ejecutado | Ian integra. Después, consola del sitio publicado en InPrivate (`DESPLIEGUE.md`) |

## No comprobado

- **Sitio publicado** con la política aplicada (se revisa después de integrar).
- **Teléfono de Ian.**
