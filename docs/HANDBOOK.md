# Adopción del Digital Development Handbook (V4.10.7)

Adoptado el 25 de noviembre de 2026, en V4.10.3. Pedido de Ian: complementar el portafolio y el handbook.
- **El portafolio completo es la demo piloto del handbook.** Eso incluye el CV, las siete demos y el cotizador.
- **El portafolio aplica el contenido del handbook:** reglas, plantillas y puertas de calidad.

Revisado el 28 de noviembre de 2026, en V4.10.7: el handbook es uno solo (DEC-033).

## Versión adoptada

- **Repositorio:** `NaiCort/Digital-Development-Handbook`, el único handbook. Ahí se junta todo el conocimiento.
- **Versión:** **1.3.0** («un solo Handbook», 28/11/2026). Integra la edición Claude y trae este piloto.
  - El piloto está en `examples/cv-y-portafolio-web/` de ese repositorio, con sus lecciones en `LESSONS.md` (LES-001 a LES-030).
  - Mientras Ian no la integre, la 1.3.0 vive en la rama `claude/dreamy-dirac-f4eyij` de ese repositorio. En `main` sigue la 1.2.0 («edición interdisciplinaria», 27/11/2026).
- **Edición Claude** (`NaiCort/Digital-Development-Handbook-Claude`, 1.1.0): se integró en la 1.3.0 y deja de usarse (DEC-033, que sustituye a DEC-017). Ian decide si archivarla o borrarla en GitHub.

**Qué manda si hay contradicción:**
1. Lo que Ian diga en la conversación.
2. `CLAUDE.md` y la Guía de identidad v1.1 (más específicos).
3. El handbook.

Así lo pide el propio handbook: respetar las convenciones del proyecto existente.

## Perfiles (`core/PROJECT-PROFILES.md`)

| Pieza | Perfil | Añadidos que aplican |
| --- | --- | --- |
| CV y portafolio (`/`) | Sitio profesional / portafolio | Privacidad, buscadores, contacto |
| Psicólogo | Portafolio con demos de negocio; además, landing / sitio informativo | Privacidad y avisos legales del giro |
| Patio 12, Ladera, Brío, Rosales y Vértice, Cotejo, Revista | Portafolio con demos de negocio: ficha de identidad por demo, avisos de simulación, flujos de cinco estados y contacto real separado | Sin servidor: los requisitos de backend son N/A mientras sean demos |
| Cotizador (`/cotizador`) | Sitio profesional con datos personales reales | Hoy, sin servidor. En V4.11, perfil SaaS (requisitos y diseño técnico, arquitectura, API, modelo de datos y amenazas) antes de escribir el backend |

## Equivalencias de documentos

Revisadas contra las 68 plantillas de la versión 1.3.0. Solo se listan las que tienen un documento en este proyecto o un «no aplica» que conviene dejar dicho.

| Plantilla del handbook | En este proyecto |
| --- | --- |
| PRD, SRS | Documento Maestro (fuera del repositorio) y su resumen en `CLAUDE.md`; requisitos con identificador en `TRAZABILIDAD.md` |
| CREATIVE-BRIEF, DESIGN, MOTION | `FICHA_*.md`, una por demo o tema, con la Guía de identidad v1.1 |
| APP-FLOW | Las fichas y los `ESTADO_V*.md` de cada demo (flujos de cinco estados) |
| IMPLEMENTATION-PLAN | `PLAN_V4.8.md` |
| DECISION-LOG, ADR | `DECISIONES.md` |
| TRACEABILITY, TEST-PLAN | `TRAZABILIDAD.md` y las pruebas en `tests/` y `scripts/verify-*.mjs` |
| QA-REPORT | `VALIDACION_V*.md`; desde V4.10.3 terminan con la tabla de puertas G0 a G7 |
| SECURITY-ACCESSIBILITY | `SEGURIDAD.md` |
| THREAT-MODEL | Hoy, los riesgos de `SEGURIDAD.md`. El modelo de amenazas completo se hace en V4.11, antes del backend del cotizador |
| REGULATORY-ASSESSMENT | `INVESTIGACION_PSICOLOGO_2.md` (salud y datos personales en México) y el aviso de privacidad (`SEGURIDAD.md`); la revisión legal queda para el final (DEC-024) |
| DEPLOYMENT | `DESPLIEGUE.md` |
| PERFORMANCE-BUDGET, OPTIMIZATION-PLAN | `RENDIMIENTO.md` (presupuesto, mediciones por tema y cambios de cada versión), `npm run audit:presupuesto` y `npm run audit:cwv` |
| ASSET-PIPELINE | `LICENCIAS.md` y los registros de origen con huella de cada conjunto de fotos (por ejemplo, `public/restaurante/fotos-origen-v4.10.6.json`) |
| COMPATIBILITY-MATRIX | DEC-003 (teléfono Android de Ian, Chrome o Edge) y los cinco anchos de las suites de navegador, de 320 a 1440 px |
| INDUSTRY-PROFILE, MARKET-RESEARCH | `INVESTIGACION_*.md` de cada giro; `INVESTIGACION_PRECIOS.md` e `INVESTIGACION_COTIZADOR.md` para el cotizador |
| BUSINESS-MODEL | `FICHA_COTIZADOR.md` y DEC-029 a DEC-032 (hospedaje, dominio, plan de mantenimiento y desplegables del cotizador) |
| PAYMENT-INTEGRATION, OBSERVABILITY-PLAN | N/A hoy: no hay pagos ni servidor. Se revisan en V4.11 |
| AGENTS, CLAUDE | `CLAUDE.md` (no hay `AGENTS.md`: el proyecto se trabaja con Claude) |
| TASK-BRIEF | El pedido de Ian en la conversación, con su modo (ver abajo) |
| Inventario de licencias (regla GEN-013) | `LICENCIAS.md` |

## Reglas generales en este proyecto

`core/RULES.md` no cambió de la 1.1.0 a la 1.3.0: siguen las mismas 22 reglas. Estado de cada una al 28/11/2026:
- **Cumple:** hay evidencia.
- **Parcial:** falta algo, y se dice qué.
- **N/A:** no aplica, con su motivo.

| Regla | Estado | Evidencia o motivo |
| --- | --- | --- |
| GEN-001 Separar hechos, propuestas y decisiones | Cumple | `DECISIONES.md` marca cada decisión como aceptada, propuesta, pendiente, descartada o sustituida |
| GEN-002 Respetar alcance | Cumple | Las demos cerradas no se tocan fuera de su entrega (`CLAUDE.md`) |
| GEN-003 No afirmar lo no comprobado | Cumple | Sección «No comprobado» en cada `VALIDACION_V*.md` |
| GEN-004 Trazabilidad | Parcial | `TRAZABILIDAD.md` cubre lo transversal, el cotizador, Psicólogo y Patio 12; las demás demos se completan en su entrega de V4.10 |
| GEN-005 Solución simple | Cumple | Sin servidor; V4.10.3 y V4.10.7 no agregaron dependencias |
| GEN-006 Validar en el servidor | N/A hoy | No hay servidor. Aplica en V4.11 (`SEGURIDAD.md`) |
| GEN-007 Sin secretos ni datos reales | Cumple | Sin claves en el repositorio; las demos usan datos ficticios |
| GEN-008 Tratamiento de datos personales | Parcial | Aviso de privacidad en `/privacidad` (V4.10.3); Ian confirma el domicilio y la revisión legal al final de todo (DEC-024). Patio 12 tiene aviso de ejemplo desde V4.10.6 |
| GEN-009 Accesibilidad de flujos esenciales | Cumple | axe en todas las suites de navegador; revisión manual pendiente (`SEGURIDAD.md`) |
| GEN-010 WCAG 2.2 AA | Parcial | axe con etiquetas `wcag22aa`; faltan TalkBack y teclado completo en el teléfono |
| GEN-011 Presupuesto de rendimiento | Cumple | `RENDIMIENTO.md` y paso en CI; desde V4.10.6 mide la portada y las demás rutas por separado |
| GEN-012 Proteger acciones críticas | N/A hoy | No hay acciones con efecto real; el envío lo hace el visitante desde su propio WhatsApp o correo |
| GEN-013 Licencias | Cumple | `LICENCIAS.md` y registros de origen con huella |
| GEN-014 Reutilizar componentes | Parcial | Mapa base compartido desde V4.10.6 (`src/lib/mapaBase.js`), que ya usan Patio 12 y Psicólogo; Brío y Taller lo adoptan en su entrega |
| GEN-015 Alternativa al movimiento | Cumple | `MotionConfig reducedMotion="user"` y suites con movimiento reducido |
| GEN-016 Versionar | Cumple | `package.json`, `CHANGELOG.md` y commits «V4.x.y:» |
| GEN-017 Verificar antes de entregar | Cumple | Lint, formato, pruebas, compilación, presupuesto y suites de navegador |
| GEN-018 Recuperación | Cumple | `DESPLIEGUE.md`: volver a la publicación anterior en Vercel |
| GEN-019 No publicar sin autorización | Cumple | Ian revisa la vista previa e integra |
| GEN-020 Decisiones difíciles de revertir | Cumple | `DECISIONES.md` |
| GEN-021 Documentación proporcional | Cumple | Entregas pequeñas con `ESTADO` y `VALIDACION` breves |
| GEN-022 Señalar límites | Cumple | «No comprobado» y «Pendiente» en cada entrega |

## Cómo se trabaja desde V4.10.3

- **Modo de cada pedido:** investigar, proponer, implementar o revisar. Si Ian no lo dice, se deduce del pedido. En los modos investigar y revisar no se cambia nada.
- **Al cerrar una versión:** `VALIDACION_V*.md` termina con la tabla de puertas G0 a G7 (`core/QUALITY-GATES.md`). Cada puerta lleva uno de estos estados, siempre con evidencia o motivo:
  - aprobado;
  - fallido;
  - bloqueado;
  - no ejecutado;
  - no aplica.
- **Cada entrega de V4.10:** usa la lista fija de `PLAN_V4.8.md` (aviso de privacidad, botón al cotizador, fuentes de respaldo, mapa compartido, variables de estilo y metadatos por ruta) y actualiza `TRAZABILIDAD.md` con su demo.
- **Decisiones nuevas:** se registran en `DECISIONES.md`, con fecha y fuente.
- **Lo que el piloto enseña** se anota en el `LESSONS.md` del piloto, en el handbook, y pasa a sus disciplinas como recomendación.
