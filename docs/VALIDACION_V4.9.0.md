# Validación de V4.9.0

Entorno: Node 22 y Chromium de Playwright, con la compilación de producción servida por `vite preview`. 25 de noviembre de 2026.

- **Revisiones automáticas:** ESLint, Prettier y compilación sin errores.
- **378 pruebas unitarias** en 44 archivos. Nuevas:
  - **`tests/v49-cotizador-calculo.test.js` (26):**
    - catálogo coherente (identificadores únicos, reglas que apuntan a funciones existentes, todo cabe en Personalizado);
    - un punto de partida por demo y versiones crecientes;
    - núcleo y aviso de privacidad;
    - dependientes, requisitos y exclusiones;
    - categoría mínima y cambio de categoría;
    - «carrito o cuentas» en Tienda;
    - cantidades;
    - IVA en pesos y sin impuestos en dólares y euros;
    - mínimo del proyecto;
    - plazo a 8 horas por día hábil;
    - urgencia, y exprés solo en proyectos pequeños;
    - IA sin número y dos idiomas al 30 %;
    - «desde» menor que «completo»;
    - moneda por idioma, folio y configuración en la dirección;
    - variantes.
  - **`tests/v49-cotizador.test.jsx` (8):**
    - los cuatro tipos con precios y un solo h1;
    - precarga de una demo y cambio de versión;
    - núcleo deshabilitado con su razón;
    - quitar con aviso, línea tachada y «Deshacer»;
    - confirmación al cambiar de tipo, que avisa lo retirado;
    - IVA según la moneda;
    - el envío exige el nombre y abre WhatsApp con folio, total con IVA, nombre y enlace;
    - aviso de retenciones para empresas.
  - **`tests/v48-cv.test.jsx`:** las dos pruebas del cotizador provisional se actualizaron. Siguen comprobando que reconoce la demo de origen, ahora con su variante.
- **Pruebas de navegador con axe** (`DEMO_START_PREVIEW=1 npm run test:browser:cv`): 5 de 5, de 320 a 1440 px. En el cotizador:
  - axe en los tres pasos y en el detalle del celular;
  - sin desbordes;
  - la barra del total solo en el celular;
  - quitar cambia el total y «Deshacer» lo devuelve;
  - el envío por WhatsApp lleva el folio (se captura la dirección porque la red del entorno no llega a WhatsApp).
- **Textos encimados** (`npm run audit:encimados`, cuatro estados del cotizador y la portada): 0 casos. Antes marcaba 7, todos por contenido de `<details>` cerrados; se corrigió el detector.
- **impeccable** (`detect` sobre los tres pasos): sin hallazgos. Antes marcaba el contraste de la opción «Exprés» deshabilitada (3.8:1), que subió a más de 4.5:1.
- **Core Web Vitals** (`npm run audit:cwv`, teléfono, CPU 4× y red lenta):
  - `/cotizador`: LCP 1.38 s y CLS 0.020;
  - `/cotizador?demo=psicologo`: LCP 1.42 s y CLS 0.022.

## Corrección tras la revisión de Ian (25/11/2026)

- **Problema:** al entrar a «Ver un ejemplo» y regresar con el botón del navegador, el cotizador abría «Ajusta» como si ya se hubiera elegido el tipo.
- **Causa:** en «Elige tipo» la dirección ya llevaba el tipo y las funciones, y el paso se deducía de ellas.
- **Además,** el sitio lleva al inicio de la página en cada cambio de ruta.
- **Corrección:**
  - el paso va en la dirección y cada paso es una entrada del historial;
  - en «Elige tipo» la dirección queda limpia;
  - el cotizador recuerda su posición al salir y la recupera al volver con el botón de regresar.
- **Comprobado** en `npm run test:browser:cv` (5 de 5):
  - regresar desde la demo de ejemplo vuelve a «Elige tipo» a la misma altura;
  - «atrás» desde «Ajusta» vuelve a «Elige tipo».

## No comprobado

- Teléfono de Ian (vista previa del PR).
- WhatsApp y el correo reales: el entorno no tiene red hacia ellos. Se comprobó la dirección que se abre.
