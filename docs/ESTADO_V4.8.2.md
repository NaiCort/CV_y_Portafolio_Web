# Estado de V4.8.2 · CV web y portafolio

21 de noviembre de 2026. La portada `/` deja de ser el directorio de demos y pasa a ser el CV web y portafolio, con la dirección inicial «Neblina y Esquema».

## Construido en esta entrega

- **Escritorio (900 px o más):** tres columnas que llenan la pantalla, cada una con su propio desplazamiento.
  - **Izquierda, verde pino:**
    - foto provisional;
    - nombre, título y enfoque;
    - botón del CV en PDF (noviembre) y el CV visual como «pronto»;
    - contacto como tabla con nombres de campo;
    - idiomas;
    - habilidades por grupo.
  - **Centro, niebla con cuadrícula fina:**
    - resumen;
    - proyectos, con enlaces a los sitios y «Ver las 7 demos»;
    - experiencia, educación y certificaciones, como línea de tiempo con nodos (el actual en barro);
    - nota de actualización.
  - **Derecha:** las siete demos desde el catálogo, cada una con:
    - muestra de su color, nombre, giro y resumen;
    - temas o sitios;
    - estado e identificador.

    Debajo va el recuadro «¿Quieres un sitio así?» con el botón al cotizador.
- **Celular:** cabecera fija con «Ian Aldana», «Demos» y «Cotizar». La lectura sigue este orden:
  1. foto, nombre y PDF;
  2. resumen;
  3. proyectos, experiencia, educación y certificaciones;
  4. contacto, idiomas y habilidades.

  La lista de demos existe una sola vez en la página. En celular se abre como desplegable desde la cabecera o desde «Ver las 7 demos», y se cierra con Esc, con el velo o al elegir una demo.
- **Cotizador provisional** (`/cotizador`):
  - lee `?demo=<id>` (también variantes, como `brio-distrito`) y muestra de qué demo partiría;
  - el mensaje de WhatsApp lleva el identificador;
  - mientras se construye el cotizador, ofrece la cotización por WhatsApp o correo.
- **Tipografías y metadatos:**
  - Bricolage Grotesque, Source Serif 4 y JetBrains Mono, servidas desde `public/cv/fuentes/` con sus licencias;
  - respaldos medidos para Liberation (escritorio) y DejaVu/Noto (Android);
  - título y descripción nuevos, también en `index.html`.
- **Movimiento:** las secciones del CV entran desde escala 0.97 en 260 ms, con 40 ms de escalón. El desplegable entra en 220 ms. Con movimiento reducido, solo hay fundido.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.2.md](VALIDACION_V4.8.2.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 65 a 75, del 21 al 24/11/2026).

## Pendiente

- Foto real de Ian.
- CV visual actualizado.
- Detalle visual con los ejemplos que dé Ian.
- V4.8.4:
  - PDF generado desde los datos (decidir si conviene);
  - prerenderizado de `/` para buscadores;
  - datos estructurados de persona.
- V4.8.5: pasada final, cierre y Documento Maestro.
- Después:
  - cotizador base;
  - demos (V4.8.10 en adelante);
  - versión en inglés.
