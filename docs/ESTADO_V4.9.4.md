# Estado de V4.9.4 · Precios con investigación

25 de noviembre de 2026. Pedido de Ian: investigar a fondo los precios (junior y senior) de cada servicio del cotizador, incluidos los que estaban «en la propuesta», y ajustar los precios actuales. La investigación está en [INVESTIGACION_PRECIOS.md](INVESTIGACION_PRECIOS.md).

## Cambios en el catálogo (`src/data/catalogo.js`)

- **`NIVELES` y `NIVEL_ACTUAL`:**
  - junior (actual): 400 MXN, 30 USD y 28 EUR por hora; mínimo de 3,500 MXN, 300 USD o 280 EUR;
  - intermedio: 550 MXN, 40 USD y 38 EUR; para cuando haya 3 a 5 proyectos reales con testimonio;
  - senior: 1,000 MXN, 75 USD y 70 EUR, solo como referencia.

  `MONEDAS` toma la tarifa y el mínimo del nivel actual. Subir de nivel es cambiar una línea.
- **IA con precio (antes «en la propuesta»):**
  - asistente de WhatsApp: 20–30 h;
  - asistente de preguntas: 12–20 h;
  - documentos automáticos: 12–20 h;
  - lectura de facturas: 16–24 h;
  - nuevo, diagnóstico de automatización: 3–5 h (estaba en la sección 20.1 del Sitio Profesional, pero no en el catálogo).
- **Costos de terceros a la vista (`aparteNota`):** el uso de la IA, los mensajes de WhatsApp, la lectura por documento y la comisión de la pasarela de pago. Se muestran en cada función, en la nota y en el mensaje de la solicitud.
- **Funciones por debajo del mercado:**
  - cuentas de usuario: de 16–24 a 20–30 h;
  - cobro en línea: de 10–16 a 12–20 h;
  - panel de administración: de 20–30 a 30–45 h;
  - reservas: de 10–14 a 12–18 h;
  - redacción de textos: por página (2–4 h cada una), en vez de 4–8 h por todo el sitio.
- **Urgencia:** exprés del +60 % al +75 %. La prioritaria (+30 %) se queda.
- **Sin cambio, porque están en rango:** tarifa junior, mantenimiento, logotipo, imágenes y dos idiomas.
- **Precio «completo» de cada tipo:** sin IA ni extras de contenido, que son servicios aparte.

## Cifras resultantes (MXN, con lanzamiento e IVA)

| | Desde | Completo |
| --- | --- | --- |
| Personalizado | 2,842 | — |
| Landing | 4,304 | 51,562 |
| Varias páginas | 6,821 | 86,803 |
| Tienda o sistema | 25,334 (antes 20,868) | 137,309 |

| Demo (esencial · recomendada · completa) | Antes | Ahora |
| --- | --- | --- |
| Psicólogo | 8,607 · 13,236 · 26,065 | igual |
| Patio 12 | 13,398 · 22,168 · 30,044 | 13,398 · 23,223 · 31,100 |
| Brío | 27,852 · 40,356 · 53,592 | 34,104 · 47,664 · 60,900 |
| Las demás | — | igual |

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.9.4.md](VALIDACION_V4.9.4.md)).
- Desplegado en producción: no; queda en la rama hasta que Ian revise la vista previa y haga el merge.

## Pendiente (decisiones de Ian)

- **Descuento de lanzamiento del 30 %:** es lo que más mueve el precio final. Con él, el precio efectivo es de 280 MXN por hora, en la parte baja del rango junior.
- **Subir a intermedio:** cuando haya tres proyectos reales con testimonio, `NIVEL_ACTUAL = "intermedio"`.
- **Precios definitivos:** al terminar el cotizador (V4.11).
