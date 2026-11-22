# Estado de V4.8.3 · Foto, índice, trayectoria y transición

22 de noviembre de 2026. Ian aprobó las cuatro ideas para ahora de [IDEAS_CV.md](IDEAS_CV.md) y entregó su foto provisional. Aclaró además que este proyecto es la v1 del CV y portafolio web.

## Construido en esta entrega

- **Foto:**
  - la foto de Ian sustituye la silueta;
  - se recortó a 4:5 y se sirve en WebP de 360, 640 y 1024 px desde `public/cv/`, con prioridad alta;
  - texto alternativo «Retrato de Ian Habid Aldana Martínez»;
  - en celular se ve cuadrada.
- **Índice con la sección activa** (solo escritorio):
  - seis enlaces en la columna pino;
  - `IntersectionObserver` sobre la columna central marca la sección que cruza el tercio superior con `aria-current`;
  - al elegir una sección, la columna central se desplaza a ella y el foco pasa a su título.
- **Trayectoria:**
  - sección nueva después del resumen, una línea de tiempo en HTML y CSS (no imagen) con las fechas de `cv.js` (`fechas` y `TRAYECTORIA`);
  - va de enero de 2018 a hoy, con ocho filas: tres estudios, tres trabajos y dos proyectos;
  - un año sin mes cubre el año completo, y nada se dibuja después de hoy;
  - lo que sigue en curso se desvanece en el borde;
  - la leyenda aclara el egreso esperado de la maestría (agosto de 2028);
  - cada fila lleva texto para lectores de pantalla con su tipo y periodo;
  - en celular, el nombre va encima de la barra y el eje muestra los años pares.
- **Transición de la demo:**
  - al abrir una demo con clic normal, su muestra de color crece hasta llenar la pantalla (300 ms) mientras se termina de precargar, y la demo entra con View Transitions;
  - con movimiento reducido o sin soporte, se navega directo;
  - Ctrl, ⌘ o clic central abren en pestaña nueva como siempre;
  - la carga de cada demo vive en `src/rutasDemo.js`, compartida con `App.jsx`, y se precarga al pasar el cursor o enfocar.
- **Demos atenuadas y cuadrícula:**
  - al pasar sobre una demo, las demás bajan al 55 %;
  - la cuadrícula del centro es una capa propia que se marca en un círculo alrededor del cursor, solo con puntero fino y en escritorio.
- **Documentos:** v1 del CV y línea de tiempo hasta hoy, en `IDEAS_CV.md`, `PLAN_V4.8.md` y `FICHA_CV.md`.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.3.md](VALIDACION_V4.8.3.md)).
- Desplegado en producción: no; queda en la rama hasta que Ian haga el merge.

## Pendiente

- Foto profesional y CV visual actualizado.
- V4.8.4:
  - PDF y buscadores (prerenderizado de `/`);
  - datos estructurados de persona.
- V4.8.5: pasada final, cierre y Documento Maestro.
- Después:
  - cotizador base;
  - demos (V4.8.10 en adelante);
  - versión en inglés;
  - las ideas «después» de `IDEAS_CV.md` cuando se cumplan sus requisitos.
