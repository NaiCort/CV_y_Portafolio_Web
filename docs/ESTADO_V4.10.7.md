# Estado de V4.10.7 · Un solo handbook

28 de noviembre de 2026. Pedido de Ian: el Digital Development Handbook es uno solo, `NaiCort/Digital-Development-Handbook`, y la edición Claude se integra en él y deja de usarse (DEC-033). No cambia nada visible en el sitio.

## Construido

- **Handbook único** (repositorio `NaiCort/Digital-Development-Handbook`, versión 1.3.0, rama `claude/dreamy-dirac-f4eyij`):
  - trae de la edición Claude el ejemplo de este piloto (`examples/cv-y-portafolio-web/`), la plantilla CLAUDE, la configuración de Claude, el formato de habilidades y las lecciones en las disciplinas;
  - actualiza los «Límites del piloto»: la política de contenido completa va aplicada desde V4.10.4;
  - agrega a `LESSONS.md` las lecciones de V4.10.4 a V4.10.6 (LES-019 a LES-030) y las lleva a sus disciplinas como recomendaciones.

  Su validador y sus pruebas pasan (ver [VALIDACION_V4.10.7.md](VALIDACION_V4.10.7.md)).
- **Decisiones** (`DECISIONES.md`): DEC-033 aceptada; DEC-017 queda sustituida.
- **Documentos que apuntaban a la edición Claude 1.1.0:**
  - `CLAUDE.md` (sección «Metodología: Digital Development Handbook»);
  - `docs/HANDBOOK.md`: versión adoptada, perfiles (las demos pasan al perfil «Portafolio con demos de negocio»), equivalencias revisadas contra las 68 plantillas de la 1.3.0 y estado de las 22 reglas GEN, que no cambiaron;
  - `docs/README.md` y `docs/PLAN_V4.8.md` (Ladera pasa a V4.10.8).
- **Prueba:** `tests/v4107-handbook.test.js` (3 pruebas): DEC-033 aceptada y DEC-017 sustituida; los tres documentos nombran el handbook único y su versión; ninguno dice que la edición Claude sea la adoptada.
- **V4.10.6 marcada como desplegada** (pull request #93).

Los documentos de versiones anteriores (`ESTADO_V*.md`, `VALIDACION_V*.md` y el `CHANGELOG.md` de V4.10.3) se quedan como estaban: son historial.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.10.7.md](VALIDACION_V4.10.7.md)).
- Desplegado en producción: no; espera la revisión de Ian.

## Pendiente

- **Ian:**
  - revisar la vista previa (no debe cambiar nada visible) e integrar;
  - integrar la versión 1.3.0 del handbook único (rama `claude/dreamy-dirac-f4eyij` de `NaiCort/Digital-Development-Handbook`);
  - archivar o borrar `NaiCort/Digital-Development-Handbook-Claude` en GitHub.
- **Siguiente entrega:** Ladera (V4.10.8).
