# Plan de la fase V4.8

Acordado con Ian el 21 de noviembre de 2026, con el Sitio Profesional Integral V1.4, el CV de noviembre de 2026 y el CV visual V2 como fuentes. Este archivo sirve para no perder el plan entre sesiones. Si algo cambia, se corrige aquí y en `CLAUDE.md`.

## Orden

1. **V4.8.0, preparación:**
   - catálogo de demos y datos del CV como archivos;
   - componentes compartidos y contador del restaurante;
   - herramientas de medición.
2. **V4.8.1 a V4.8.5, CV web y portafolio en `/`:**
   1. ficha de identidad y maquetas (2 o 3 direcciones, escritorio y celular) para que Ian elija (hecho);
   2. escritorio y celular, construidos juntos porque comparten el mismo código (hecho);
   3. detalle visual con las referencias que dé Ian;
   4. PDF y buscadores;
   5. pasada final, cierre y Documento Maestro.
3. **Cotizador, primera versión.** Va antes de las demos para que cada una se conecte «desde ya». Tiene página propia.
4. **Demos en orden de creación**, cada una con sus subversiones:
   - Psicólogo (V4.8.10);
   - Patio 12 (V4.8.20);
   - Ladera (V4.8.30);
   - Brío (V4.8.40);
   - Rosales y Vértice (V4.8.50);
   - Cotejo (V4.8.60).

   Cada demo recibe su botón «Contratar un sitio como este» con su identificador estable, y el cotizador se ajusta con ella.
5. **Cotizador, ajuste final:** revisión de conjunto y lo que se considere pertinente al terminar las demos.

La versión en inglés (Sitio Profesional, sección 25) va después del CV en español. Su número se decide al llegar.

## CV web y portafolio

**Escritorio, en tres columnas:**
- **Izquierda, fija:**
  - foto en la esquina superior;
  - nombre y título;
  - contacto, enlaces e idiomas;
  - habilidades;
  - botones de los PDF.
- **Centro, desplazable:**
  - resumen profesional;
  - proyectos (Múltiples Demos y Rincón de Imágenes);
  - experiencia;
  - educación;
  - certificaciones.

  Une los dos CV sin duplicados. Si difieren, manda el de noviembre.
- **Derecha, lista con desplazamiento propio:**
  - las demos del catálogo: las disponibles llevan a su sitio y las próximas se marcan;
  - el botón al cotizador.

**Celular:** una sola lectura vertical, al estilo de la portada de Rubor.
- Arriba, foto, nombre, título y lo que hace.
- Después, el resumen y las acciones principales.
- Luego, proyectos, experiencia, educación, habilidades e idiomas.
- Cabecera exclusiva de celular con la lista de demos desplegable y el botón al cotizador.

**Decisiones de Ian (21/11/2026):**
- Foto: por ahora una imagen provisional. Ian dará la suya.
- PDF: solo el CV de noviembre (`public/cv/`). El visual se publica cuando Ian lo actualice.
- Demos próximas: ninguna por ahora. El catálogo ya admite el estado para el futuro.
- Cotizador: antes, durante y después de las demos.
- Maquetas (21/11/2026): Ian aprobó la distribución.
  - En celular, la lista de demos aparece **solo** en el desplegable de la cabecera, nunca repetida al final.
  - El acabado visual se ve simple: se enriquece al trabajar los detalles.
- Dirección visual inicial (21/11/2026): combinación de Neblina y Esquema (`docs/FICHA_CV.md`). Ian dará más adelante ejemplos visuales para imitarlos o crear una versión propia.

## Fuentes de datos

- `src/data/demos.js`: catálogo con identificadores estables, estados, variantes y funciones. Lo usan el portafolio, el futuro cotizador y las pruebas.
- `src/data/cv.js`: contenido del CV. El CV web, el PDF y LinkedIn deben coincidir (Sitio Profesional, 5.2).

## Cada entrega

1. Ficha y maqueta antes de construir.
2. Pruebas unitarias y de navegador con axe.
3. `npm run audit:encimados` y `npm run audit:cwv`.
4. Documentos `ESTADO` y `VALIDACION`.
5. Revisión de Ian en su teléfono Android (Chrome o Edge).
6. Documento Maestro solo al cerrar cada etapa.

Al terminar cada proceso se informa lo hecho y lo pendiente.
