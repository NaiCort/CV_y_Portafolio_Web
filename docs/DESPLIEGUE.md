# Despliegue

Plantilla DEPLOYMENT del Digital Development Handbook (puerta G7 y regla GEN-018; adopción en `HANDBOOK.md`). Actualizado el 25/11/2026, en V4.10.3.

## Flujo y autorización

1. El trabajo va en una rama: hoy, `claude/great-edison-k9xun2`.
2. Antes de subir: `npm run lint`, `npm run format:check`, `npm test`, `npm run build` y `npm run audit:presupuesto`. Al cerrar una versión, además, las suites de navegador con `DEMO_START_PREVIEW=1`.
3. Ian abre el pull request. La revisión automática de GitHub (`.github/workflows/ci.yml`) repite las comprobaciones y audita las dependencias de producción.
4. Vercel publica una vista previa del pull request, que Ian revisa en su teléfono Android (Chrome o Edge).
5. Ian integra en `main` y Vercel publica en producción: https://cv-y-portafolio-web.vercel.app.

Nadie más publica (regla GEN-019).

## Precondiciones

- Sin secretos: el sitio no los necesita.
- Sin migraciones: no hay base de datos.
- La configuración de Vercel vive en `vercel.json`:
  - redirección de rutas a `app.html`;
  - encabezados de seguridad;
  - caché de un año para `/assets`.

  La vista previa local (`vite.config.js`) lee el mismo archivo, así que lo que se prueba aquí es lo que publica Vercel.

## Volver atrás

Si algo se rompe en producción:
1. **Inmediato:** en el panel de Vercel, en Deployments, se promueve la publicación anterior a producción (Instant Rollback). No toca el repositorio.
2. **Definitivo:** se revierte el pull request en GitHub (`git revert` del merge) y se integra la reversión. Vercel vuelve a publicar.
3. Se anota lo ocurrido en el `ESTADO_V*.md` de la versión.

## Comprobación después de publicar

En la vista previa y, después del merge, en producción:
- **Rutas:** la portada carga con la foto y la lista de demos.
- **Demos:** cada demo abre y su primera acción responde.
- **Cotizador:** «Enviar por WhatsApp» abre la conversación con el folio.
- **Aviso de privacidad:** `/privacidad` abre desde el enlace del CV.
- **Encabezados:** se revisan desde una computadora con acceso al sitio:

```bash
curl -sI https://cv-y-portafolio-web.vercel.app/ | grep -iE "content-security|x-frame|x-content|referrer|permissions|strict-transport"
```

- **Política de contenido:** en la consola del navegador no aparecen avisos de «Content Security Policy». Hasta aplicarla completa (DEC-020) solo informa, no bloquea.

**Automatizar esta comprobación** contra la vista previa en cada pull request es DEC-022. Queda propuesta porque necesita el enlace de la vista previa dentro de GitHub y no se puede probar desde este entorno.

## Decisiones abiertas

- DEC-009: alojamiento comercial (Vercel Pro o Cloudflare Pages) antes de recibir solicitudes reales.
- DEC-020: aplicar la política de contenido completa.
- DEC-022: prueba de humo automática en cada pull request.
