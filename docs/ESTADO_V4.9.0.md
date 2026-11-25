# Estado de V4.9.0 · Cotizador

25 de noviembre de 2026. Primera versión del cotizador (etapa V4.9), con la investigación en `INVESTIGACION_COTIZADOR.md`, la ficha en `FICHA_COTIZADOR.md` y las decisiones de Ian en `PLAN_V4.8.md`.

## Construido

- **Datos** (`src/data/catalogo.js`): fuente única con:
  - **parámetros:** 8 horas al día, 10 % de ficha y calidad, lanzamiento del 30 %, IVA del 16 %, vigencia de 15 días y anticipo del 30 %;
  - **monedas:** tarifa, mínimo y redondeo de cada una;
  - **urgencias y planes de mantenimiento;**
  - **cuatro categorías y siete grupos de funciones;**
  - **41 funciones**, cada una con horas, estado por categoría (núcleo, incluida u opcional), dependencias y exclusiones, y las demos donde aparece;
  - **los puntos de partida de las siete demos**, en versión esencial, recomendada y completa.
- **Cálculo** (`src/lib/cotizacion.js`), en funciones puras que después podrá usar el servidor:
  - núcleo y aviso de privacidad automáticos;
  - quitar con dependientes y poner con requisitos;
  - exclusiones;
  - categoría mínima donde cabe una función;
  - cambio de categoría conservando lo compatible;
  - cantidades;
  - precio (horas × tarifa, redondeado), ficha y calidad, mínimo del proyecto, urgencia, lanzamiento, IVA, plazo y anticipo;
  - «desde» (solo el núcleo) y «completo» de cada categoría;
  - moneda por idioma del navegador;
  - folio;
  - la configuración en la dirección.
- **Solicitud** (`src/lib/solicitud.js`): arma el mensaje con folio, detalle, datos del cliente y enlace a la configuración, y abre WhatsApp o el correo. Es el único punto que cambiará cuando exista el servidor.
- **Página** (`src/pages/Cotizador.jsx` y `cotizador.css`):
  - **Elige tipo:** cuatro tarjetas con «desde» y «completo», qué incluye y una demo de ejemplo; partir de una demo; lo que va en todo proyecto.
  - **Ajusta:**
    - funciones por grupo, cada una con el precio que suma;
    - las de núcleo, deshabilitadas y con la razón en texto;
    - las que no caben en el tipo actual piden confirmar el cambio;
    - aviso con «Deshacer»;
    - entrega y mantenimiento.
  - **Envía:** nombre, negocio, factura (no, persona física o empresa) y comentarios. Se valida el nombre; sale por WhatsApp o correo y muestra el resultado, con «Copiar el texto».
  - **Nota a la derecha:**
    - folio, moneda y una línea por función, con la quitada tachada;
    - desglose y total (con IVA en pesos, sin impuestos en dólares y euros), plazo, anticipo y mensualidad.

    El total se anuncia a los lectores de pantalla.
  - **Celular:** categorías en carrusel, barra fija con el total y detalle a pantalla completa.
- **Variantes:** `?demo=vertice`, `?demo=brio-distrito`, `?demo=rubor` y demás se cotizan como su demo, y el título dice la variante.
- **Herramientas:** el detector de textos encimados ya no cuenta el contenido de un `<details>` cerrado (daba falsos positivos).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.9.0.md](VALIDACION_V4.9.0.md)).
- Desplegado en producción: sí (integrado en main por Ian; pull requests 81 a 87, 25/11/2026).

## Pendiente

- **Ian:** revisar el cotizador en la vista previa de su teléfono.
- **Siguientes entregas de V4.9:**
  - modalidad de plan mensual (sección 23.1);
  - en Personalizado, sugerir una categoría cuando coincida con lo elegido;
  - sugerir la categoría inferior cuando el cliente quiera menos que el núcleo.
- **Después:**
  - **V4.10:** botón «Contratar un sitio como este» en cada demo, con su identificador (el cotizador ya lo recibe);
  - **V4.11:** ajuste final y animaciones propias.
- **Backend real** (sección 24), al terminar lo demás: registro, hoja de cálculo, correos y precio recalculado en el servidor; además, detección del país por IP y tipo de cambio oficial.
- Vista previa en vivo: v2 del cotizador.
- Decidir precios y horas reales, y el alojamiento antes de recibir solicitudes reales.
