# Adopción del Digital Development Handbook (V4.10.3)

25 de noviembre de 2026. Pedido de Ian: complementar los dos repositorios.
- **El portafolio completo es la demo piloto del handbook.** Eso incluye el CV, las siete demos y el cotizador.
- **El portafolio aplica el contenido del handbook:** reglas, plantillas y puertas de calidad.

## Versión adoptada

- **Repositorio:** `NaiCort/Digital-Development-Handbook-Claude`, versión **1.1.0**.
- **Origen de esa versión:** la 1.0.0 se importó del zip que Ian subió, idéntico al repositorio `-GPT`. La 1.1.0 incorpora lo aprendido aquí.
  - El piloto del handbook está en `examples/cv-y-portafolio-web/` de ese repositorio.
  - Mientras no se integre, la 1.1.0 vive en su rama `claude/great-edison-k9xun2`.
- **El repositorio `Digital-Development-Handbook-GPT` no se toca** (decisión de Ian, 25/11/2026).

**Qué manda si hay contradicción:**
1. Lo que Ian diga en la conversación.
2. `CLAUDE.md` y la Guía de identidad v1.1 (más específicos).
3. El handbook.

Así lo pide el propio handbook: respetar las convenciones del proyecto existente.

## Perfiles (`core/PROJECT-PROFILES.md`)

| Pieza | Perfil | Añadidos que aplican |
| --- | --- | --- |
| CV y portafolio (`/`) | Sitio profesional / portafolio | Privacidad, buscadores, contacto |
| Psicólogo | Landing / sitio informativo | Privacidad y avisos legales del giro |
| Patio 12, Ladera, Brío, Rosales y Vértice, Cotejo, Revista | Sitio informativo con flujos simulados (carrito, reservas, área de cliente) | Sin servidor: los requisitos de backend son N/A mientras sean demos |
| Cotizador (`/cotizador`) | Sitio profesional con datos personales reales | Hoy, sin servidor. En V4.11, perfil SaaS (requisitos y diseño técnico, arquitectura, API, modelo de datos y amenazas) antes de escribir el backend |

## Equivalencias de documentos

| Plantilla del handbook | En este proyecto |
| --- | --- |
| PRD, SRS | Documento Maestro (fuera del repositorio) y su resumen en `CLAUDE.md`; requisitos con identificador en `TRAZABILIDAD.md` |
| CREATIVE-BRIEF, DESIGN, MOTION | `FICHA_*.md`, una por demo o tema, con la Guía de identidad v1.1 |
| APP-FLOW | Las fichas y los `ESTADO_V*.md` de cada demo (flujos de cinco estados) |
| IMPLEMENTATION-PLAN | `PLAN_V4.8.md` |
| DECISION-LOG, ADR | `DECISIONES.md` (nuevo en V4.10.3) |
| TRACEABILITY, TEST-PLAN | `TRAZABILIDAD.md` (nuevo) y las pruebas en `tests/` y `scripts/verify-*.mjs` |
| QA-REPORT | `VALIDACION_V*.md`; desde V4.10.3 terminan con la tabla de puertas G0 a G7 |
| SECURITY-ACCESSIBILITY | `SEGURIDAD.md` (nuevo) |
| DEPLOYMENT | `DESPLIEGUE.md` (nuevo) |
| AGENTS | `CLAUDE.md` |
| TASK-BRIEF | El pedido de Ian en la conversación, con su modo (ver abajo) |
| Presupuesto de rendimiento (regla GEN-011) | `RENDIMIENTO.md` (nuevo) y `npm run audit:presupuesto` |
| Inventario de licencias (regla GEN-013) | `LICENCIAS.md` (nuevo) |

## Reglas generales en este proyecto

Estado de cada regla de `core/RULES.md` al 25/11/2026:
- **Cumple:** hay evidencia.
- **Parcial:** falta algo, y se dice qué.
- **N/A:** no aplica, con su motivo.

| Regla | Estado | Evidencia o motivo |
| --- | --- | --- |
| GEN-001 Separar hechos, propuestas y decisiones | Cumple | `DECISIONES.md` marca cada decisión como aceptada, propuesta o pendiente |
| GEN-002 Respetar alcance | Cumple | Las demos cerradas no se tocan fuera de su entrega (`CLAUDE.md`) |
| GEN-003 No afirmar lo no comprobado | Cumple | Sección «No comprobado» en cada `VALIDACION_V*.md` |
| GEN-004 Trazabilidad | Parcial | `TRAZABILIDAD.md` cubre lo transversal, el cotizador y Psicólogo; las demás demos se completan en su entrega de V4.10 |
| GEN-005 Solución simple | Cumple | Sin servidor ni dependencias nuevas en V4.10.3 |
| GEN-006 Validar en el servidor | N/A hoy | No hay servidor. Aplica en V4.11 (`SEGURIDAD.md`) |
| GEN-007 Sin secretos ni datos reales | Cumple | Sin claves en el repositorio; las demos usan datos ficticios |
| GEN-008 Tratamiento de datos personales | Parcial | Aviso de privacidad en `/privacidad` (V4.10.3); Ian confirma el domicilio y la revisión legal (`DECISIONES.md`, DEC-024). Patio 12 no tiene aviso de ejemplo: va en su entrega |
| GEN-009 Accesibilidad de flujos esenciales | Cumple | axe en todas las suites de navegador; revisión manual pendiente (`SEGURIDAD.md`) |
| GEN-010 WCAG 2.2 AA | Parcial | axe con etiquetas `wcag22aa`; faltan TalkBack y teclado completo en el teléfono |
| GEN-011 Presupuesto de rendimiento | Cumple | `RENDIMIENTO.md` y paso en CI |
| GEN-012 Proteger acciones críticas | N/A hoy | No hay acciones con efecto real; el envío lo hace el visitante desde su propio WhatsApp o correo |
| GEN-013 Licencias | Cumple | `LICENCIAS.md` y registros `medios-origen.json` |
| GEN-014 Reutilizar componentes | Parcial | Motor del mapa repetido en cuatro demos; se unifica en V4.10 |
| GEN-015 Alternativa al movimiento | Cumple | `MotionConfig reducedMotion="user"` y suites con movimiento reducido |
| GEN-016 Versionar | Cumple | `package.json`, `CHANGELOG.md` y commits «V4.x.y:» |
| GEN-017 Verificar antes de entregar | Cumple | Lint, formato, pruebas, compilación, presupuesto y suites de navegador |
| GEN-018 Recuperación | Cumple | `DESPLIEGUE.md`: volver a la publicación anterior en Vercel |
| GEN-019 No publicar sin autorización | Cumple | Ian hace los pull requests y la integración |
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
