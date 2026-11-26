# Estado de V4.10.4 · Política de contenido aplicada

25 de noviembre de 2026. Cierra la propuesta DEC-020 de V4.10.3.

**Cómo se llegó aquí:**
1. Ian revisó la consola del sitio publicado con la política «solo en reporte» y no apareció ningún aviso de la política.
2. El único error («Unchecked runtime.lastError») venía de una extensión del navegador: desapareció en una ventana InPrivate.
3. Ian aprobó activarla: «si eso no causa problemas de seguridad entonces adelante».

Activarla no abre ningún problema de seguridad. Al contrario, el navegador deja de cargar scripts y recursos que no vengan del sitio, salvo los mapas de OpenFreeMap. El riesgo era de funcionamiento (bloquear algo legítimo), y se descartó con las pruebas.

## Construido

- **`vercel.json`:** una sola política aplicada.
  - **Recursos permitidos:** scripts, estilos, fuentes, audio y video del propio sitio; imágenes y mapas de OpenFreeMap; trabajadores propios.
  - **Bloqueados:** objetos incrustados y marcos.
  - **Además:** `frame-ancestors 'none'`, `base-uri 'self'` y `form-action 'self'`.
  - Desaparecen la política corta y la de «solo en reporte».
- **`vite.config.js`:** la vista previa sigue copiando `vercel.json`. `CSP_ESTRICTA=1` queda para probar cambios futuros de la política antes de activarlos.
- **Pruebas:** `tests/v4103-handbook.test.jsx` comprueba que la política completa va aplicada y que ya no hay versión «solo en reporte».
- **Documentos:**
  - `SEGURIDAD.md` (SEC-003, cómo se activó y qué hacer si algo deja de cargar);
  - `DESPLIEGUE.md` (comprobación posterior y extensiones del navegador);
  - `DECISIONES.md` (DEC-020 aceptada; DEC-019 con Patio 12 en V4.10.5);
  - `TRAZABILIDAD.md`, `PLAN_V4.8.md`, `CLAUDE.md` y `README.md`.
- **V4.10.3 marcada como desplegada** (pull request #89).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.10.4.md](VALIDACION_V4.10.4.md)).
- Desplegado en producción: sí. Ian lo integró en `main` (pull request #90, 25/11/2026). Luego revisó en InPrivate la consola del sitio publicado en el CV, el cotizador, Psicólogo, Brío y Taller: ningún aviso de la política de contenido. Quedaban advertencias del estilo de los mapas, que se corrigen en V4.10.5.

## Pendiente

- **Ian:**
  - revisar la vista previa y, después de integrar, la consola del sitio publicado en InPrivate;
  - decidir DEC-019 (numeración) y las propuestas DEC-021 a DEC-023;
  - aportar lo de DEC-024 (domicilio y revisión legal del aviso de privacidad).
- **Handbook:** en su siguiente versión, actualizar la sección «Límites del piloto» de `examples/cv-y-portafolio-web/README.md`, que aún dice que la política va «solo en reporte».
- **Siguiente entrega:** Patio 12 (V4.10.5).
