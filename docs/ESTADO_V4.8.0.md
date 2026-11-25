# Estado de V4.8.0 · Preparación de la fase de ajustes

21 de noviembre de 2026. Primera entrega de V4.8. Ian aprobó el plan con cuatro respuestas: foto provisional, solo el PDF de noviembre, ninguna demo próxima por ahora y cotizador antes, durante y después de las demos.

## Construido en esta entrega

- **Plan:** `docs/PLAN_V4.8.md` recoge el orden, la estructura del CV web y portafolio y las decisiones de Ian. `CLAUDE.md` lo cita.
- **Catálogo de demos** (`src/data/demos.js`):
  - siete demos con identificador estable, giro, nombre, ruta, estado, versión de cierre, resumen, variantes o temas con su propio identificador, y funciones demostradas;
  - es la base del cotizador;
  - incluye los cuatro estados de la sección 27.1 del Sitio Profesional;
  - la portada actual ya lo usa, así que la Revista aparece con Umbral.
- **Datos del CV** (`src/data/cv.js`):
  - persona, contacto, documentos, resumen, habilidades, idiomas, proyectos, experiencia, educación y certificaciones;
  - la base es el CV de noviembre, con los roles por puesto, los cursos de Mecatrónica y el seguimiento de entregables tomados del CV visual;
  - el PDF de noviembre se sirve en `/cv/cv-ian-aldana-noviembre-2026.pdf`;
  - el CV visual queda marcado como no disponible hasta que Ian lo actualice.
- **Contador del restaurante** (pendiente 1): solo se muestra dentro de `/restaurante`. Fuera de esa ruta no aparece, pero la visita sigue guardada y el contador vuelve al regresar.
- **Componentes compartidos** (pendiente 6):
  - `ComercialCTA`:
    - sin etiqueta en mayúsculas;
    - sin tarjeta centrada: ahora es una franja con filete superior, texto a la izquierda y botón;
    - título h2;
    - entrada desde escala 0.97 en 260 ms.
  - El banner de demo es un `aside` con nombre, lo que resuelve la alerta `region` de axe.
  - La marca de agua fija se sustituye por una franja de autoría al final de cada página, que enlaza al portafolio, así que ya no tapa el texto.
- **Herramientas:** `scripts/encimados.mjs` (textos encimados y desbordes en 7 tamaños) y `scripts/cwv.mjs` (LCP y CLS con teléfono y red lenta), con sus comandos `npm run audit:*`.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.0.md](VALIDACION_V4.8.0.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 65 a 75, del 21 al 24/11/2026).

## Pendiente

- V4.8.1: ficha de identidad del CV y maquetas (escritorio y celular) para que Ian elija.
- Después, en orden: construcción del CV, cotizador base, demos (V4.8.10 en adelante) y ajuste final del cotizador.
