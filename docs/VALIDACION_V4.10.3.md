# Validación de V4.10.3

**Entorno:** Node 22 y Chromium de Playwright, compilación de producción con `vite preview`, 25 de noviembre de 2026. Es la primera validación con la tabla de puertas del Digital Development Handbook (`docs/HANDBOOK.md`).

## Comandos y resultados

- **`npm run lint` y `npm run format:check`:** sin errores.
- **`npm test`:** 400 pruebas en 45 archivos, todas aprobadas. Incluye `tests/v4103-handbook.test.jsx`, nueva, con cinco pruebas:
  - encabezados de seguridad;
  - política de contenido sin scripts en línea ni `eval`, con OpenFreeMap como único origen externo;
  - caché de `/assets`;
  - contenido del aviso de privacidad;
  - enlace al aviso desde el CV.
- **`npm run build`:** sin errores.
- **`npm run audit:presupuesto`:** aprobado.

  | Medida | Valor | Presupuesto |
  | --- | --- | --- |
  | JavaScript inicial | 100.0 KB | 110 KB |
  | CSS inicial | 8.8 KB | 12 KB |
  | Trozo de ruta más pesado (Revista) | 61.0 KB | 70 KB |

- **`npm audit --omit=dev --audit-level=high`:** 0 vulnerabilidades.

  El `npm audit` completo deja 3 moderadas de `minimatch` (dentro de ESLint), sin versión compatible.

  `npm audit fix` falló con un error interno de npm («Cannot read properties of null (reading 'edgesOut')»). Por eso se actualizaron a mano, dentro de sus rangos: vite 8.3.8, vitest 5.1.2, undici 8.13.1 y zod 4.6.7.
- **Encabezados en la vista previa:** `curl -sI` a `/psicologo` y a un archivo de `/assets` devolvió los siete encabezados y la caché de un año.
- **Política de contenido aplicada en la vista previa** (`CSP_ESTRICTA=1`):
  - un recorrido por 23 rutas (CV, cotizador, cada demo y sus páginas principales, y una ruta inexistente), bajando hasta el final de cada una, dio 0 avisos;
  - los mapas cargaron en Psicólogo, Brío y Taller.
- **Ocho suites de navegador, con la política completa aplicada:**

  | Suite | Resultado |
  | --- | --- |
  | CV y cotizador, con `/privacidad` | 5 de 5 |
  | Psicólogo | 16 de 16 |
  | Patio 12 | 12 de 12 |
  | Ladera | 5 de 5 |
  | Brío | 5 de 5 |
  | Rosales y Vértice | 5 de 5 |
  | Cotejo | 5 de 5 |
  | Revista | PENDIENTE |

  - **Qué comprueba cada suite:** axe, desbordes, ningún envío real y ningún aviso de la política.
  - **Primera corrida:** las ocho fallaron porque axe se inyectaba como script en línea, y la política, con razón, lo bloqueó. Se corrigió en las pruebas (`page.evaluate`); el sitio no cambió.

## Puertas del handbook (G0 a G7)

| Puerta | Estado | Evidencia |
| --- | --- | --- |
| G0 Producto | Aprobado | Pedido de Ian (DEC-018); decisiones y propuestas separadas en `DECISIONES.md` |
| G1 Arquitectura | Aprobado | Sitio estático: datos (solo en el navegador), terceros y permisos inventariados en `SEGURIDAD.md`. Autorización en servidor: no aplica hasta V4.11 |
| G2 Diseño | Aprobado | La única pantalla nueva (`/privacidad`) usa la ficha del CV; axe y sin desbordes de 320 a 1440 px |
| G3 Implementación | Aprobado | Lint, formato, 400 pruebas, compilación y presupuesto |
| G4 Seguridad | Aprobado en la vista previa local; no ejecutado en producción | Encabezados y política probados con las suites; 0 vulnerabilidades en producción. No se pudo consultar el sitio publicado: la red de este entorno no permite el dominio |
| G5 Accesibilidad automatizada | Aprobado | axe (WCAG 2.0 a 2.2, A y AA) en todas las suites |
| G5 Accesibilidad manual | No ejecutado | TalkBack y teclado completo en el teléfono de Ian |
| G6 Rendimiento | PENDIENTE | Presupuesto aprobado; Core Web Vitals en `RENDIMIENTO.md` |
| G7 Publicación | No ejecutado | Ian integra; comprobación posterior en `DESPLIEGUE.md` |

## No comprobado

- **Sitio publicado:** encabezados y política (red bloqueada en este entorno).
- **Teléfono de Ian:** vista previa, TalkBack y teclado.
- **CI en GitHub:** los pasos nuevos (auditoría y presupuesto) corrieron aquí con los mismos comandos, no en GitHub Actions.
