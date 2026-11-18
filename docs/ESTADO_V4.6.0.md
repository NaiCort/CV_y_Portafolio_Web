# Estado de V4.6.0 · Cotejo, primera entrega

Primera entrega del giro Despacho contable, 18 de noviembre de 2026. Base: V4.5.6 en `main` (`a9b13df`). Ficha: [FICHA_DESPACHO.md](FICHA_DESPACHO.md). Investigación: [INVESTIGACION_DESPACHO.md](INVESTIGACION_DESPACHO.md) y [REFERENCIAS_DESPACHO.md](REFERENCIAS_DESPACHO.md).

## Construido

- Ruta `/despacho/*` con carga diferida. El único archivo compartido que cambia es `src/App.jsx`.
- Dirección «Expediente», elegida por Ian entre Libro, Día 17 y Expediente. Un solo despacho, Cotejo, para personas físicas y empresas, con una contadora al frente (inventada). Sin fotos.
- Inicio:
  - Portada con «Cotizar en 24 horas», «Escribir por WhatsApp» y el **expediente de ejemplo**: semáforo de declaraciones, opinión de cumplimiento, previo del mes y buzón tributario, lo que el despacho pide con fecha y «Aprobar el previo de ejemplo», que pasa el previo de ámbar a verde y se puede deshacer.
  - **Elige tu régimen y ve el precio:** seis regímenes (sueldos, RESICO, plataformas, arrendamiento, actividad empresarial y persona moral); el recibo muestra el precio aproximado con IVA, para quién es y lo que incluye. «Cotizar mi caso» abre WhatsApp simulado con ese régimen.
  - Así trabajamos cada mes, con fechas (del 1 al 5, día 10, antes del 17 y al presentar).
  - Nueve servicios, cuatro herramientas (anunciadas para las siguientes entregas) y la contadora al frente con lo que nunca se pide (e.firma), secreto profesional y entrega del expediente.
- Llamada y WhatsApp simulados; barra de contacto en el teléfono; **menú para teléfono y tableta desde la primera entrega**.
- Fuentes Literata e Instrument Sans en `public/despacho` con sus licencias OFL; página de créditos.

## No incluido todavía

Precios y cotización, servicios, diagnóstico, calendario fiscal, calculadoras, regularización, Tu expediente y aviso de privacidad. La Bienvenida no enlaza todavía al despacho.

## Qué revisar en la vista previa

1. Abrir `/despacho` en el teléfono y aprobar el previo de ejemplo.
2. Cambiar de régimen y ver cómo cambia el recibo; cotizar.
3. Recorrer el menú.
