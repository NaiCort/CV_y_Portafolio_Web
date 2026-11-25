# Plan de la fase V4.8 y de las etapas V4.9 a V4.11

Acordado con Ian el 21 de noviembre de 2026, con el Sitio Profesional Integral V1.4, el CV de noviembre de 2026 y el CV visual V2 como fuentes. Este archivo sirve para no perder el plan entre sesiones. Si algo cambia, se corrige aquí y en `CLAUDE.md`.

## Orden

Cada etapa lleva su propia versión menor (decisión de Ian del 25/11/2026): V4.8 cierra con el CV y portafolio web en V4.8.7; el cotizador base es V4.9; los ajustes de las demos son V4.10, y el ajuste final del cotizador es V4.11. Hasta el 25/11/2026 este plan numeraba las demos como V4.8.10 a V4.8.60; los documentos de V4.8.0 a V4.8.6 conservan esa numeración anterior.

1. **V4.8.0, preparación:**
   - catálogo de demos y datos del CV como archivos;
   - componentes compartidos y contador del restaurante;
   - herramientas de medición.
2. **V4.8.1 a V4.8.7, CV web y portafolio en `/`:**
   1. ficha de identidad y maquetas (2 o 3 direcciones, escritorio y celular) para que Ian elija (hecho);
   2. escritorio y celular, construidos juntos porque comparten el mismo código (hecho);
   3. detalle visual: las cuatro ideas «ahora» de `docs/IDEAS_CV.md` (índice con sección activa, línea de tiempo a escala, transición de la demo y cuadrícula que responde al cursor); las demás quedan ahí con sus requisitos;
   4. dirección «Brasa» (Ian cambió el diseño el 22/11/2026, ver `FICHA_CV.md`);
   5. correcciones del CV (experiencia completa, certificados, sin línea de tiempo);
   6. buscadores (hecho en V4.8.6); el PDF lo mantiene Ian en Canva y se sirve tal cual;
   7. pasada final, cierre y Documento Maestro.
3. **V4.9, cotizador, primera versión** (cerrada en V4.9.5 el 25/11/2026; Documento Maestro V4.9.5, PARTE XVIII). Va antes de las demos para que cada una se conecte «desde ya». Tiene página propia.

   Decisiones de Ian (25/11/2026), sobre las secciones 7 a 9 y 18 a 26 del Sitio Profesional V1.4:
   - **Ruta:** se queda `/cotizador`.
   - **Servicios y cotizador, una sola página:** quien ve lo que ofrece Ian va calculando su precio al mismo tiempo. «Personalizado» muestra todo el catálogo para elegir; solo se bloquean las funciones que se excluyen entre sí, con aviso.
   - **Sin servidor en V4.9:** todo se calcula en el navegador y la solicitud sale por WhatsApp o correo con folio y el detalle completo. El envío pasa por una sola función para que después la sustituya el backend real (registro, hoja de cálculo, correos y precio recalculado en el servidor), que se construye al terminar lo demás y no como prueba.
   - **Precios:** los propuestos en la sección 22, en un archivo de datos. Se deciden cuando el cotizador esté terminado.
   - **Alojamiento:** el plan gratuito de Vercel es solo para uso no comercial. Antes de recibir solicitudes reales se decide entre Vercel Pro (20 USD al mes) y Cloudflare Pages. El dominio propio funciona en cualquiera de los dos y se paga aparte.
   - **Calendario:** el de la sección 26 es orientativo.
4. **V4.10, demos en orden de creación**, con subversiones consecutivas (V4.10.1, V4.10.2…):
   - Psicólogo, desde V4.10.1. Las subversiones de V4.10 van en orden (V4.10.1, V4.10.2…), sin bloques de diez por demo (corrección de Ian, 25/11/2026); cada demo sigue donde terminó la anterior. Se queda como **landing de una sola página** y **se reconstruye desde cero** (decisión de Ian, 25/11/2026):
     - V4.10.1: ficha a posteriori de los cuatro temas anteriores (`docs/FICHA_PSICOLOGO_ANTERIOR.md`) e investigación de cómo debe ser el sitio de un psicólogo (`docs/INVESTIGACION_PSICOLOGO_2.md`);
     - investigación de diseño visual (`docs/INVESTIGACION_PSICOLOGO_DISENO.md`);
     - ampliación de la investigación de diseño con Refero (`docs/INVESTIGACION_PSICOLOGO_DISENO_2.md`);
     - V4.10.2: ficha nueva (`docs/FICHA_PSICOLOGO.md`) y reconstrucción con los tres temas.

     Decisión de Ian (25/11/2026): **tres temas («Sala con luz», «Neblina» y «Cuaderno»), cada uno con su propia estructura si hace falta, intercambiables desde la demo** como los temas actuales (antes había dicho dos).

     Decisiones de Ian (25/11/2026):
     - los testimonios se reemplazan por formación, supervisión y un enlace a reseñas públicas simuladas;
     - no hay autoevaluación (PHQ-9 ni GAD-7);
     - se agregan «Instituciones y colegas» y «Recursos»;
   - V4.10.3, adopción del Digital Development Handbook (pedido de Ian del 25/11/2026; `docs/HANDBOOK.md`). El portafolio completo es la demo piloto del handbook y adopta su contenido:
     - encabezados de seguridad;
     - aviso de privacidad del sitio;
     - presupuesto de rendimiento;
     - dependencias al día;
     - registro de decisiones, trazabilidad, seguridad, despliegue y licencias.

     El número es la propuesta DEC-019 de `docs/DECISIONES.md`.
   - Patio 12, desde V4.10.4;
   - Ladera;
   - Brío;
   - Rosales y Vértice;
   - Cotejo. Idea de Ian (22/11/2026): llevar a Cotejo el fondo de cuadrícula que tuvo el CV en V4.8.3 (parecido a una hoja de Excel), que encaja con la contabilidad.

   En cada demo se quitan las aclaraciones repetidas o no pedidas (decisión de Ian del 23/11/2026), conservando los avisos de simulación que pide el principio rector. Cada demo recibe su botón «Contratar un sitio como este» con su identificador estable, y el cotizador se ajusta con ella.

   **Lista fija de cada entrega de V4.10** (desde V4.10.3, con el handbook):
   1. Ficha de identidad (a posteriori si falta), con referencias de Refero cuando ayuden (`docs/INVESTIGACION_PSICOLOGO_DISENO_2.md`).
   2. Aviso de privacidad de ejemplo, si la demo pide datos.
   3. «Cotiza un sitio como este» con el identificador de la demo o del tema (`ComercialCTA`, prop `cotizar`), con pruebas del contacto real y del enlace (`docs/TRAZABILIDAD.md`, RF-002 y RF-003).
   4. Fuentes de respaldo medidas (pendiente 7), con Psicólogo como modelo.
   5. Si tiene mapa, el motor compartido en lugar de su copia.
   6. Colores, espacios y radios como variables.
   7. Metadatos propios por ruta.
   8. Sin aclaraciones repetidas (DEC-005).
   9. Su matriz en `docs/TRAZABILIDAD.md` y, en `VALIDACION`, la tabla de puertas G0 a G7.

   Patio 12, además:
   - sacar su estado del paquete principal (DEC-021);
   - quitar la etiqueta en mayúsculas sobre el título (pendiente 4);
   - escribir su ficha (pendiente 5).
5. **V4.11, cotizador, ajuste final:** revisión de conjunto y lo que se considere pertinente al terminar las demos.

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
- Este proyecto es la **versión 1 del CV y portafolio web**. Al terminarlo solo se actualiza para añadir experiencia y conocimientos. Un CV o portafolio futuro sería la v2, con su propio código y repositorio, y este quedaría como la v1.
- Foto: por ahora una imagen provisional. Ian dará la suya.
- PDF: solo el CV de noviembre (`public/cv/`). El visual se publica cuando Ian lo actualice; queda en pausa por decisión suya (25/11/2026) y no es requisito para cerrar el CV.
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
3. `npm run audit:encimados`, `npm run audit:cwv` y `npm run audit:presupuesto`.
4. Documentos `ESTADO` y `VALIDACION`; la validación termina con la tabla de puertas G0 a G7 (`docs/HANDBOOK.md`).
5. Revisión de Ian en su teléfono Android (Chrome o Edge).
6. Documento Maestro solo al cerrar cada etapa.

Al terminar cada proceso se informa lo hecho y lo pendiente.
