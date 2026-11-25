# Registro de decisiones

Plantilla DECISION-LOG del Digital Development Handbook (V4.10.3; adopción en `HANDBOOK.md`).

**Qué registra:**
- las decisiones de Ian que siguen vigentes en la fase V4.8 a V4.11;
- las propuestas abiertas.

Las decisiones de las demos ya cerradas siguen en sus `ESTADO_V*.md` y en su ficha. Aquí solo se citan cuando cambian el trabajo actual.

**Estados:**
- **ACEPTADA:** Ian la decidió.
- **PROPUESTA:** espera la decisión de Ian.
- **PENDIENTE:** Ian debe aportar un dato.
- **SUSTITUIDA:** la reemplazó otra decisión.

Las decisiones nuevas se agregan al final con el siguiente número; los números no se reutilizan.

## Decisiones

| ID | Fecha | Decisión | Estado | Fuente | Impacto |
| --- | --- | --- | --- | --- | --- |
| DEC-001 | 21/11/2026 | Este proyecto es la versión 1 del CV y portafolio web; un rediseño futuro sería otro repositorio | ACEPTADA | `PLAN_V4.8.md` | Al cerrarlo solo se actualiza contenido |
| DEC-002 | 21/11/2026 | El cotizador existe antes, durante y después de las demos | ACEPTADA | `PLAN_V4.8.md` | Cada demo se conecta al cotizador |
| DEC-003 | 21/11/2026 | La revisión se hace en el teléfono Android de Ian (Chrome o Edge); Safari, Firefox e iOS no son pendientes | ACEPTADA | `CLAUDE.md` | Matriz de navegadores |
| DEC-004 | 22/11/2026 | Dirección visual «Brasa» para el CV | ACEPTADA | `FICHA_CV.md` | Paleta y tipografías del CV y de `/privacidad` |
| DEC-005 | 23/11/2026 | En cada demo se quitan las aclaraciones repetidas o no pedidas, conservando los avisos de simulación | ACEPTADA | `PLAN_V4.8.md` | Lista de cada entrega de V4.10 |
| DEC-006 | 25/11/2026 | Cada etapa con su versión menor: V4.8 CV, V4.9 cotizador, V4.10 demos y V4.11 cotizador final; subversiones consecutivas en V4.10 | ACEPTADA | `PLAN_V4.8.md` | Numeración de versiones |
| DEC-007 | 25/11/2026 | El cotizador vive en `/cotizador`, y servicios y cotizador son una sola página | ACEPTADA | `PLAN_V4.8.md` | Rutas |
| DEC-008 | 25/11/2026 | Sin servidor en V4.9: la solicitud sale por WhatsApp o correo desde una sola función, que después sustituirá el backend | ACEPTADA | `PLAN_V4.8.md` | `src/lib/solicitud.js`; perfil del cotizador en `HANDBOOK.md` |
| DEC-009 | 25/11/2026 | Antes de recibir solicitudes reales se elige entre Vercel Pro y Cloudflare Pages (el plan gratuito de Vercel es solo para uso no comercial) | PENDIENTE | `PLAN_V4.8.md` | `DESPLIEGUE.md` |
| DEC-010 | 25/11/2026 | Precios de lista a tarifa intermedia con lanzamiento del 30 %; el nivel se cambia a mano en `catalogo.js` | ACEPTADA | `ESTADO_V4.9.5.md` | Cotizador |
| DEC-011 | 25/11/2026 | El sitio no dice «junior» ni «senior» («Analista de Datos») | ACEPTADA | `ESTADO_V4.9.5.md` | CV y PDF |
| DEC-012 | 25/11/2026 | Psicólogo se queda como landing de una página y se reconstruye desde cero | ACEPTADA | `PLAN_V4.8.md` | V4.10.2 |
| DEC-013 | 25/11/2026 | Psicólogo con tres temas intercambiables («Sala con luz», «Neblina» y «Cuaderno»), cada uno con su estructura | ACEPTADA | `PLAN_V4.8.md` | `FICHA_PSICOLOGO.md` |
| DEC-014 | 25/11/2026 | Sin testimonios en Psicólogo: formación, supervisión y reseñas públicas simuladas | ACEPTADA | `PLAN_V4.8.md` | `TRAZABILIDAD.md` (RF-P05) |
| DEC-015 | 25/11/2026 | Sin autoevaluación clínica (PHQ-9 ni GAD-7) | ACEPTADA | `PLAN_V4.8.md` | Psicólogo |
| DEC-016 | 25/11/2026 | Psicólogo con «Instituciones y colegas» y «Recursos» | ACEPTADA | `PLAN_V4.8.md` | Psicólogo |
| DEC-017 | 25/11/2026 | `Digital-Development-Handbook-GPT` se queda intacto; `Digital-Development-Handbook-Claude` se llena con el zip de la versión 1.0 | ACEPTADA | Conversación con Ian | Repositorios del handbook |
| DEC-018 | 25/11/2026 | El portafolio completo es la demo piloto del handbook y adopta su contenido | ACEPTADA | Conversación con Ian | `HANDBOOK.md`; V4.10.3 |
| DEC-019 | 25/11/2026 | La adopción del handbook toma el siguiente número consecutivo (V4.10.3); Patio 12 empieza en V4.10.4 | PROPUESTA | Esta entrega | Numeración; se corrige si Ian prefiere otra |
| DEC-020 | 25/11/2026 | Aplicar de verdad la política de contenido completa (hoy va «solo en reporte») cuando la vista previa de Vercel no muestre avisos | PROPUESTA | `SEGURIDAD.md` | `vercel.json` |
| DEC-021 | 25/11/2026 | Sacar el estado de Patio 12 (`RestaurantProvider` y `FloatingTimer`) del paquete principal en la entrega de Patio 12 | PROPUESTA | `RENDIMIENTO.md` | Portada más ligera |
| DEC-022 | 25/11/2026 | Prueba de humo automática contra la vista previa de Vercel en cada pull request (puerta G7) | PROPUESTA | `DESPLIEGUE.md` | CI |
| DEC-023 | 25/11/2026 | Avisos automáticos de dependencias (Dependabot), agrupados una vez al mes | PROPUESTA | `SEGURIDAD.md` | Abre pull requests solo; por eso no se activó sin Ian |
| DEC-024 | 25/11/2026 | Domicilio completo del responsable y revisión legal del aviso de privacidad antes de recibir solicitudes reales | PENDIENTE | `SEGURIDAD.md` | `/privacidad` |

## Excepciones a reglas del handbook

Ninguna. Las reglas que hoy no aplican (GEN-006 y GEN-012, por no haber servidor) están en `HANDBOOK.md` como «N/A» con su motivo, no como excepción.
