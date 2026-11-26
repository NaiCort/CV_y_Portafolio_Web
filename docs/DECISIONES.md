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
- **DESCARTADA:** Ian decidió no hacerla, al menos por ahora; puede volver a proponerse.
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
| DEC-009 | 25/11/2026 | El portafolio se queda en Vercel (Ian, 26/11/2026). Antes de recibir solicitudes reales pasa a Vercel Pro, porque el plan gratuito es solo para uso no comercial. El hospedaje de los clientes es DEC-029 | ACEPTADA | Conversación con Ian | `DESPLIEGUE.md` |
| DEC-010 | 25/11/2026 | Precios de lista a tarifa intermedia con lanzamiento del 30 %; el nivel se cambia a mano en `catalogo.js` | ACEPTADA | `ESTADO_V4.9.5.md` | Cotizador |
| DEC-011 | 25/11/2026 | El sitio no dice «junior» ni «senior» («Analista de Datos») | ACEPTADA | `ESTADO_V4.9.5.md` | CV y PDF |
| DEC-012 | 25/11/2026 | Psicólogo se queda como landing de una página y se reconstruye desde cero | ACEPTADA | `PLAN_V4.8.md` | V4.10.2 |
| DEC-013 | 25/11/2026 | Psicólogo con tres temas intercambiables («Sala con luz», «Neblina» y «Cuaderno»), cada uno con su estructura | ACEPTADA | `PLAN_V4.8.md` | `FICHA_PSICOLOGO.md` |
| DEC-014 | 25/11/2026 | Sin testimonios en Psicólogo: formación, supervisión y reseñas públicas simuladas | ACEPTADA | `PLAN_V4.8.md` | `TRAZABILIDAD.md` (RF-P05) |
| DEC-015 | 25/11/2026 | Sin autoevaluación clínica (PHQ-9 ni GAD-7) | ACEPTADA | `PLAN_V4.8.md` | Psicólogo |
| DEC-016 | 25/11/2026 | Psicólogo con «Instituciones y colegas» y «Recursos» | ACEPTADA | `PLAN_V4.8.md` | Psicólogo |
| DEC-017 | 25/11/2026 | `Digital-Development-Handbook-GPT` se queda intacto; `Digital-Development-Handbook-Claude` se llena con el zip de la versión 1.0 | ACEPTADA | Conversación con Ian | Repositorios del handbook |
| DEC-018 | 25/11/2026 | El portafolio completo es la demo piloto del handbook y adopta su contenido | ACEPTADA | Conversación con Ian | `HANDBOOK.md`; V4.10.3 |
| DEC-019 | 25/11/2026 | Cada entrega toma el siguiente número consecutivo: V4.10.3 (handbook), V4.10.4 (política de contenido) y V4.10.5 (animaciones de Psicólogo); Patio 12 empieza en V4.10.6. Ian la aprobó el 26/11/2026 | ACEPTADA | Conversación con Ian | Numeración |
| DEC-020 | 25/11/2026 | Aplicar de verdad la política de contenido completa, que en V4.10.3 iba «solo en reporte». Ian revisó la consola del sitio publicado sin avisos de la política y aprobó: «si eso no causa problemas de seguridad entonces adelante» | ACEPTADA | Conversación con Ian; V4.10.4 | `vercel.json` |
| DEC-021 | 25/11/2026 | Aligerar la carga de todas las demos (Ian, 26/11/2026). En la entrega de Patio 12, el paquete común que descargan todas las rutas: sacar su estado y su contador (`RestaurantProvider` y `FloatingTimer`), mover a su demo lo que solo usa una, y bajar el presupuesto. En la entrega de cada demo: medir cada tema o variante, fotos al tamaño justo, precarga solo donde ayude y tipografías de respaldo con medida | ACEPTADA | Conversación con Ian; `RENDIMIENTO.md` | Paquete común; lista fija de `PLAN_V4.8.md` |
| DEC-022 | 25/11/2026 | Prueba de humo automática contra la vista previa de Vercel en cada pull request (puerta G7). Ian prefiere revisar él la vista previa y avisar si hay problemas (26/11/2026) | DESCARTADA | Conversación con Ian | Sin cambios en CI |
| DEC-023 | 25/11/2026 | Avisos automáticos de dependencias (Dependabot), agrupados una vez al mes. No por ahora: se sigue como hasta ahora (Ian, 26/11/2026) | DESCARTADA | Conversación con Ian | Dependencias se revisan en cada entrega |
| DEC-024 | 25/11/2026 | Domicilio completo del responsable y revisión legal del aviso de privacidad antes de recibir solicitudes reales. Ian lo deja para el final de todo, después de V4.11 (26/11/2026) | PENDIENTE | Conversación con Ian; `SEGURIDAD.md` | `/privacidad` |
| DEC-025 | 26/11/2026 | Al cambiar de tema en una demo cuyos temas cambian la estructura (Psicólogo, Taller), la página vuelve arriba con una transición, para que no se disparen solas las animaciones de más abajo. No aplica a Brío, donde solo cambia la paleta | ACEPTADA | Conversación con Ian | Psicólogo en V4.10.5; Taller en su entrega |
| DEC-026 | 26/11/2026 | La figura de «Respira conmigo» acompaña el conteo: invisible y diminuta antes de empezar, crece al inhalar, casi desaparece al exhalar y se apaga del todo al terminar o detener | ACEPTADA | Conversación con Ian | Psicólogo, V4.10.5 |
| DEC-027 | 26/11/2026 | Más y mejores animaciones en las demos, empezando por Psicólogo; cada demo las recibe en su entrega de V4.10, dentro de la Guía de identidad (ease-out de 200 a 300 ms, escala 0.95, fundido con movimiento reducido) | ACEPTADA | Conversación con Ian | Lista fija de `PLAN_V4.8.md` |
| DEC-028 | 26/11/2026 | El estilo de los mapas de OpenFreeMap se corrige antes de aplicarse (`src/lib/estiloMapa.js`), para que la consola quede sin advertencias. Psicólogo ya lo usa; Patio 12, Brío y Taller lo adoptan con el motor compartido en su entrega | ACEPTADA | Revisión de la consola por Ian; V4.10.5 | Mapas |
| DEC-029 | 26/11/2026 | A cada cliente se le ofrece hospedaje en Vercel, en Cloudflare Pages o en un hospedaje tradicional (u otro igual de bueno o mejor), explicado con lo que le importa al cliente: costo, velocidad, correo y quién lo administra. Los precios se confirman antes de ponerlos en el cotizador | ACEPTADA | Conversación con Ian | Cotizador, V4.11 |
| DEC-030 | 26/11/2026 | El dominio siempre es del cliente, aunque Ian lo pague o lo administre | ACEPTADA | Conversación con Ian | Cotizador y contratos |
| DEC-031 | 26/11/2026 | El hospedaje lo paga el cliente directamente o va incluido en el precio. Se ofrece un plan de mantenimiento web (administración del sitio: hospedaje y renovación del dominio, revisión, cambios pequeños, respaldo y contacto directo) para que el cliente no se preocupe por nada técnico. El correo con dominio propio es una opción aparte, solo si el negocio lo necesita | ACEPTADA | Conversación con Ian | Cotizador, V4.11 |
| DEC-032 | 26/11/2026 | En «Ajuste» del cotizador, cada opción lleva un desplegable en lenguaje sencillo: qué es, qué gana su negocio, un ejemplo en una demo, qué no incluye y «¿lo necesito?». El precio se ve sin abrirlo. Antes de construir, una maqueta con dos o tres desplegables para que Ian apruebe el tono | ACEPTADA | Idea de Ian | Cotizador, V4.11 |

## Excepciones a reglas del handbook

Ninguna. Las reglas que hoy no aplican (GEN-006 y GEN-012, por no haber servidor) están en `HANDBOOK.md` como «N/A» con su motivo, no como excepción.
