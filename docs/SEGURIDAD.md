# Seguridad, privacidad y accesibilidad

Plantilla SECURITY-ACCESSIBILITY del Digital Development Handbook (puertas G4 y G5; adopción en `HANDBOOK.md`). Actualizado el 25/11/2026, en V4.10.3.

**Estados de cada control:**
- **Aprobado:** verificado aquí.
- **Parcial:** falta algo, y se dice qué.
- **No ejecutado:** no se pudo comprobar.
- **Pendiente:** depende de una decisión.

## Datos, activos y límites de confianza

- **Sitio estático en Vercel:** sin servidor propio, sin cuentas y sin base de datos.
- **Datos reales: solo dos vías.**
  - **Cotizador:** arma un mensaje (nombre, negocio opcional, factura, comentarios y configuración) que el visitante envía desde su propio WhatsApp o correo. El sitio no lo guarda ni lo transmite (`src/lib/solicitud.js`).
  - **Contacto del CV:** enlaces a WhatsApp, correo y LinkedIn.
- **Datos de las demos:** son ficticios y se guardan solo en el navegador del visitante. Ninguno sale del navegador:

  | Demo | Claves de almacenamiento local |
  | --- | --- |
  | Psicólogo | `demo-psicologo-theme` |
  | Patio 12 | `patio12-demo-v1` |
  | Ladera | `ladera-pedido-v1`, `ladera-cata-v1` |
  | Brío | `brio-tema-v1`, `brio-socio-v1`, `brio-reservas-v1`, `brio-evaluacion-v1`, `brio-tienda-v1` |
  | Rosales y Vértice | `taller-tema-v1`, `taller-citas-v1`, `taller-orden-v1`, `taller-garaje-v1` |
  | Cotejo | `cotejo-expediente-v1` |
  | Revista | `revista-marcadores-v1`, `revista-comentarios-v1` |

- **Terceros que reciben peticiones:**
  - Vercel (alojamiento);
  - OpenFreeMap (mapas de Psicólogo, Patio 12, Brío y Taller).

  Nada más: no hay analítica, fuentes de Google ni imágenes de otros dominios. Lo confirman las ocho suites de navegador con la política de contenido aplicada.
- **Permisos del navegador que se usan:**
  - ubicación, solo en Patio 12 («local más cercano», a petición);
  - portapapeles para copiar textos;
  - ventana flotante del seguimiento de Patio 12.

## Controles

| Control | Riesgo | Verificación | Estado | Evidencia |
| --- | --- | --- | --- | --- |
| SEC-001 | El sitio se carga dentro de otra página para engañar al visitante (clickjacking) | `frame-ancestors 'none'` y `X-Frame-Options: DENY` en `vercel.json` | Aprobado en configuración y en la vista previa; no ejecutado en producción | `tests/v4103-handbook.test.jsx`; vista previa local |
| SEC-002 | El navegador interpreta un archivo como otro tipo | `X-Content-Type-Options: nosniff` | Aprobado en configuración | Ídem |
| SEC-003 | Inyección de scripts | React escapa el texto; no hay `dangerouslySetInnerHTML` ni `eval`. Los únicos `innerHTML` son cadenas fijas en los marcadores de los mapas. Política de contenido completa (`script-src 'self'`, sin `unsafe-eval`), aplicada desde V4.10.4 | Aprobado en la vista previa local; en producción se aplica al integrar V4.10.4 | Las ocho suites y el recorrido de 23 rutas pasan con la política aplicada (`VALIDACION_V4.10.4.md`) |
| SEC-004 | La dirección de la página se filtra a otros sitios | `Referrer-Policy: strict-origin-when-cross-origin` | Aprobado en configuración | `v4103-handbook.test.jsx` |
| SEC-005 | Permisos del navegador que el sitio no usa | `Permissions-Policy`: sin cámara, micrófono, pagos, USB ni temas publicitarios; ubicación solo propia | Aprobado en configuración | Ídem; la ubicación de Patio 12 sigue funcionando (suite de Patio 12) |
| SEC-006 | Conexión sin cifrar | `Strict-Transport-Security` de dos años | Aprobado en configuración; no ejecutado en producción | `vercel.json` |
| SEC-007 | Dependencias vulnerables en lo publicado | `npm audit --omit=dev --audit-level=high` en CI | Aprobado | 0 vulnerabilidades en producción (25/11/2026) |
| SEC-008 | Dependencias vulnerables de desarrollo | `npm audit` completo | Parcial | Quedan 3 moderadas de `minimatch` dentro de ESLint, sin versión compatible; no llegan al sitio publicado (pendiente 8 de `CLAUDE.md`) |
| SEC-009 | Una pestaña abierta por un enlace manipula a la página de origen | `rel="noopener"` o `noreferrer` en los enlaces con `target="_blank"`; `window.open` con `noopener` | Aprobado | Revisión del código (V4.10.3) |
| SEC-010 | Datos personales sin aviso | `/privacidad`, enlazado desde el CV y el cotizador | Parcial | DEC-024: falta que Ian confirme el domicilio completo y la revisión legal |
| SEC-011 | Datos sensibles en formularios | Los formularios de las demos no piden datos de salud; el cotizador pide no incluirlos | Aprobado en Psicólogo y en el cotizador | `TRAZABILIDAD.md` (RF-P02 y RF-C07) |
| SEC-012 | Secretos en el repositorio | Sin claves ni archivos `.env` | Aprobado | Revisión del repositorio |

**Cómo se activó la política de contenido (dos pasos):**
1. **V4.10.3:** se publicó «solo en reporte», porque aplicarla sin verla funcionar en Vercel podía dejar el sitio en blanco.
2. **25/11/2026:** Ian revisó la consola del sitio publicado y no hubo avisos de la política. El único error venía de una extensión del navegador, y en una ventana InPrivate desapareció.
3. **V4.10.4:** se aplica de verdad (DEC-020).

**Si algo deja de cargar:** la consola del navegador dice qué se bloqueó y qué directiva lo hizo («Refused to load…»).
1. Se agrega ese origen a la directiva, en `vercel.json`.
2. Se prueba con las suites de navegador.
3. Si urge, se vuelve a la publicación anterior (`DESPLIEGUE.md`).

Para probar antes un cambio de la política, se publica primero «solo en reporte» y se prueba localmente con `CSP_ESTRICTA=1`.

La barra de comentarios de Vercel en las vistas previas carga scripts de `vercel.live`, y la política la bloquea. El sitio no se ve afectado, y Ian revisa las vistas previas en el teléfono, sin esa barra.

## Accesibilidad

- **Objetivo:** WCAG 2.2 AA (regla GEN-010).
- **Automatizado (aprobado):** axe con las etiquetas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` y `wcag22aa` en todas las suites, de 320 a 1440 px, y con movimiento reducido en cuatro de cinco anchos.
- **Manual (no ejecutado):**
  - TalkBack en el teléfono Android de Ian;
  - recorrido completo con teclado;
  - comprobar que los elementos fijos no tapen el foco (aviso de demo, selector de temas, «Vuelve al cotizador»; WCAG 2.4.11);
  - tamaño mínimo de lo que se toca (2.5.8).

  Axe no lo cubre todo, como advierte el handbook.

## Cuando exista el servidor (V4.11)

Antes de escribir código (perfil SaaS del handbook), se escribe:
- el documento de requisitos técnicos y la arquitectura;
- el contrato de la API;
- el análisis de amenazas, con los controles de OWASP ASVS nivel 1 como base.

**Controles mínimos ya previstos:**
- validar en el servidor (regla GEN-006);
- recalcular el precio en el servidor;
- límite de envíos y protección contra spam;
- secretos en variables de entorno;
- registro sin datos personales de más;
- plazo de conservación;
- aviso de privacidad actualizado con los nuevos encargados (hoja de cálculo y correo).

## Riesgos residuales

- **Encabezados en producción:** no se pudieron comprobar desde este entorno, porque la red no permite el dominio del sitio. Se verifican en la vista previa (ver `DESPLIEGUE.md`).
- **El aviso de privacidad** espera los datos de DEC-024, que Ian deja para el final de todo, después de V4.11.
