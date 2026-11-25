# Estado de V4.8.4 · Dirección «Brasa»

22 de noviembre de 2026. Ian compartió el código de la referencia que tenía en mente (el sitio de Brittany Chiang) y pidió:
- algo así, conservando las tres columnas;
- una paleta acorde a su foto;
- menos aspecto «cuadrado»;
- botones en figuras transparentes cuyo contorno solo aparezca al pasar el cursor, claro sobre fondo oscuro y oscuro sobre fondo claro.

## Construido en esta entrega

- **Paleta «Brasa»**, tomada de la foto:
  - fondo carbón `#15110F`, texto arena `#EFE6DD` y relato `#BCAEA2`;
  - acento brasa `#F2803F` y brasa clara `#FFB37F`.
  - Ficha reescrita en [FICHA_CV.md](FICHA_CV.md).
- **Estructura de la referencia, en tres columnas:**
  - columna izquierda con foto redondeada, nombre, título, enfoque en píldoras, PDF, índice (línea que crece; la activa en brasa), contacto, idiomas y habilidades en píldoras;
  - columna central con rótulos de sección en mayúsculas pequeñas y tarjetas (fecha a la izquierda, relato a la derecha);
  - columna derecha con las demos.
- **Tarjetas:**
  - al pasar el cursor, la tarjeta se ilumina (`#1F1916` y brillo interior de 1 px) y las hermanas bajan al 50 %;
  - si la tarjeta tiene enlace, toda ella lo es (`::after`) y su flecha se mueve en diagonal;
  - las tecnologías van en píldoras.
- **Botones:**
  - transparentes y en forma de píldora;
  - al pasar el cursor o enfocar, aparece un contorno claro (arena al 55 %); la acción principal es brasa y pasa a brasa clara;
  - en pantallas táctiles, sin «pasar encima», hay un contorno tenue permanente para que se reconozcan;
  - todo el sitio queda oscuro, así que el contorno es siempre claro.
- **Demos:**
  - cada una con una miniatura real de su portada (`public/cv/demos/`, capturas a 1280 px reducidas a 480 × 270);
  - nombre, estado en píldora, giro y temas;
  - la transición crece desde la miniatura;
  - se quitó el identificador visible: sigue en los datos para el cotizador.
- **Accesibilidad y otros:**
  - enlace «Saltar al CV»;
  - reflector cálido que sigue al mouse (solo con mouse, detrás del contenido);
  - títulos de sección fijos bajo la cabecera en el celular;
  - el cotizador provisional usa la misma dirección.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.4.md](VALIDACION_V4.8.4.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 65 a 75, del 21 al 24/11/2026).

## Pendiente

- Revisión de Ian en su teléfono.
- Foto profesional y CV visual actualizado.
- V4.8.5: PDF y buscadores (prerenderizado de `/` y datos estructurados de persona).
- V4.8.6: pasada final, cierre y Documento Maestro.
- Después:
  - cotizador base;
  - demos (V4.8.10 en adelante);
  - versión en inglés.
