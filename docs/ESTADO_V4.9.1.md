# Estado de V4.9.1 · Vuelve al cotizador

25 de noviembre de 2026. Pedido de Ian al revisar V4.9.0: al ver una demo de ejemplo desde el cotizador, que no haya que dar varias veces a regresar ni volver al CV para retomar la cotización.

## Construido

- **`src/lib/origenCotizador.js`:**
  - los enlaces del cotizador a sus demos («Ver un ejemplo» y «Ver la demo») guardan en `sessionStorage` a qué cotizador volver, a qué altura y en qué demo;
  - la marca se borra en el CV, al volver al cotizador y al cargar la página desde un enlace directo o escribiendo la dirección (tipo de navegación `navigate`).
- **`src/components/shared/VolverCotizador.jsx`**, montado una vez en `App.jsx`, sin tocar las demos:
  - **Cuándo aparece:** solo dentro de la demo de origen, en cualquiera de sus páginas.
  - **Escritorio (640 px o más):** píldora «Vuelve al cotizador» en carbón translúcido con borde brasa.
  - **Celular:** círculo de 36 px con una flecha. Al tocarlo pregunta «¿Volver al cotizador?»; tocar la pregunta regresa, y tocar fuera o Escape la cierra.
  - **Arrastre:** se puede arrastrar con el dedo o el mouse (un arrastre no cuenta como toque) o mover con las flechas del teclado. Se queda dentro de la ventana, debajo del aviso de demo, y recuerda su lugar.
  - **Lugar inicial:** el borde izquierdo a media altura, donde las demos no tienen botones flotantes.
  - **Al regresar:** vuelve al mismo paso del cotizador y a la misma altura.
- **El cotizador** recupera la altura cuando se vuelve con el botón, además del botón de regresar del navegador (V4.9.0).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.9.1.md](VALIDACION_V4.9.1.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 81 a 87, 25/11/2026).

## Pendiente

Lo de V4.9.0:
- forma de pago con plan mensual;
- sugerencias de tipo de sitio en «Personalizado»;
- V4.10, el botón «Contratar un sitio como este» en cada demo.
