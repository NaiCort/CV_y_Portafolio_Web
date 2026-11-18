# Estado de V4.6.8 · Despacho contable, toda la demo en libro mayor

Novena entrega de Despacho contable, 18 de noviembre de 2026. Base: V4.6.7 en `main` (`95704ea`). Ian señaló que el rediseño debía cubrir toda la demo, no solo la portada, y que la tarjeta del expediente estorbaba encima del texto. Se hizo primero una maqueta del resto de la demo (inicio, Precios, Tu expediente, Calculadoras y Guías); Ian respondió «Así se ve bien». Ficha: [FICHA_DESPACHO.md](FICHA_DESPACHO.md), versión 3.

## Construido en esta entrega

- **Encabezado de página** (`components/Cabeza.jsx`) en las nueve páginas interiores: ruta, título grande con la segunda parte en gris, bajada y renglones del libro mayor.
- **Inicio:** la consulta con el expediente en la columna del texto (ya no flota sobre la foto); regímenes como renglones con su precio y el recibo de papel al lado; «Así trabajamos» con los días 1, 10, 16 y 17 en grande; panel oscuro «Nada se presenta sin tu visto bueno»; servicios como índice en dos columnas; especialidades con una calle de Xalapa; herramientas en cuatro columnas; contadora con retrato grande y su cita; opiniones con una destacada.
- **Páginas interiores:** precios y extras como libro; «Antes de contratarnos» en renglones; cotización con el formulario de papel al lado del título; diagnóstico con opciones en renglones; calculadoras con pestañas subrayadas, campos grandes y resultado como libro; Tu expediente con el semáforo como carpeta, previo, solicitudes y documentos como libro y el recordatorio en banda oscura; servicios y regularización sin tarjetas.
- **Pie oscuro** en todas las páginas con «Que todo cuadre antes del 17.».
- **Fotos nuevas:** calle de Xalapa con el Cofre de Perote y el Cofre desde Xalapa (Koffermejia, Wikimedia Commons, CC BY-SA 4.0) y una lista palomeada (Unsplash, ilustrativa). Créditos generados de `data/medios.js`.
- **Tipografías de respaldo medidas** para que el texto no salte mientras llegan Literata e Instrument Sans.

Las funciones no cambian.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.6.8.md](VALIDACION_V4.6.8.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.

## Qué revisar en la vista previa

1. Recorrer las diez páginas en el teléfono.
2. La consulta del inicio: el expediente ya no tapa nada.
3. Tu expediente: el recordatorio en la banda oscura.
