# Estado de V4.6.1 · Precios y cotización

Segunda entrega de Cotejo, 18 de noviembre de 2026. Base: V4.6.0 en `main` (`b5e91ff`). Ficha: [FICHA_DESPACHO.md](FICHA_DESPACHO.md).

## Construido

- **`/despacho/precios`:** precios aproximados con IVA por régimen (para quién es y lo que incluye) y **lo que se cobra aparte**: facturas extra, nómina por empleado, declaración anual sola, declaraciones atrasadas por mes, constitución de una sociedad, respuesta a un requerimiento del SAT y dictamen fiscal.
- **Cotiza tu caso:** situación, facturas al mes y empleados dan una **estimación al momento** (rango con IVA; las facturas solo cuentan donde el plan las limita y la nómina solo en planes mensuales). Casilla para declaraciones atrasadas. Nombre y WhatsApp con validación y foco en el primer error; envío simulado («Enviando…»); confirmación con folio, estimación, qué sigue y «Cotizar otro caso». Nada se guarda.
- «Cotizar» de la cabecera, la portada y la barra del teléfono lleva a la cotización; «Cotizar mi caso» del recibo llega con el régimen elegido. «Precios» en el menú marca la página actual.

## Qué revisar en la vista previa

1. En la portada, elegir «Persona moral» y «Cotizar mi caso».
2. Escribir 5 empleados y ver cómo cambia la estimación; pedir la cotización.
