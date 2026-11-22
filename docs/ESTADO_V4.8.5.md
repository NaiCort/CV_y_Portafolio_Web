# Estado de V4.8.5 · Correcciones del CV

22 de noviembre de 2026. Observaciones de Ian sobre V4.8.4.

## Construido en esta entrega

- **Sin repeticiones:** se quitó «Ver las 7 demos», porque las demos están a la derecha (en el celular, en «Demos»). Ya no queda otro enlace del CV que lleve a algo que ya se está viendo.
- **El proyecto propio cambia de nombre:**
  - antes era «Múltiples Demos»; ahora es **«CV y portafolio web»**, tipo «Proyecto independiente · el sitio que estás viendo»;
  - la descripción aclara que es esta misma página y que las demos se abren desde la sección «Demos»;
  - sigue siendo un enlace (con flecha) y lleva a la misma página, sin abrir otra pestaña;
  - el identificador interno (`multiples-demos`) no cambia.
- **Experiencia completa:**
  - el texto del CV de noviembre en cada punto, sin resumir, más lo que solo traía el CV visual (vistas, módulos web y conexión con la base de datos, tablas, búsqueda y carga, versionado y documentación técnica, entregables remotos y control de calidad básico);
  - los puestos usan los nombres del CV de noviembre (Servicio Social · Analista de Datos / Desarrollo Web);
  - las prácticas conservan «Full-Stack Jr» del CV visual.
- **Certificaciones como enlaces:** cada una abre su PDF en otra pestaña (`public/cv/certificados/`), con el mismo diseño de tarjeta y flecha que los proyectos. Los PDF incluyen nombre, calificación, folio y liga de verificación de la Fundación Carlos Slim.
- **Sin línea de tiempo:**
  - repetía las fechas;
  - no tenía meses exactos (dibujaba Mecatrónica hasta finales de 2022, como si llegara a 2023);
  - con 8 filas no aportaba más que la lista.

  El motivo queda en `IDEAS_CV.md` y el código, en git.
- **Índice:**
  - al llegar al final de la columna central se marca «Certificaciones», que antes se quedaba en «Educación» porque la última sección nunca llega a la franja superior;
  - además, la sección elegida en el índice queda marcada mientras dura el desplazamiento.
- **Plan:**
  - PDF y buscadores pasan a V4.8.6, y el cierre a V4.8.7;
  - la cuadrícula tipo Excel de V4.8.3 queda anotada para Cotejo (V4.8.60).

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.5.md](VALIDACION_V4.8.5.md)).
- Desplegado en producción: no; queda en la rama hasta que Ian haga el merge.

## Pendiente

- **Ian:**
  - cambiar el nombre del proyecto en el PDF del CV y en LinkedIn, para que coincidan (Sitio Profesional, 5.2);
  - decidir si se renombra el repositorio.
- V4.8.6: buscadores y PDF.
- V4.8.7: cierre y Documento Maestro.
