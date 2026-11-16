# Estado de V4.5.5 · Hojalatería, híbridos y Mi garaje

Sexta entrega del giro Taller mecánico, 16 de noviembre de 2026. Base: V4.5.4 en `main` (`effaca6`). Ficha: [FICHA_TALLER.md](FICHA_TALLER.md).

## Construido

- **`/taller/hojalateria` (Vértice):** cómo se trabaja con seguro (reporte, valuación con fotos, solo deducible, seguimiento) y sin seguro (valoración sin costo, presupuesto por pieza, garantía de pintura). Calculadora «¿Uso el seguro o pago directo?» con valor del auto, costo de la reparación y deducible de 5, 10 o 20 %. Tres trabajos de ejemplo en lista. «Agendar valoración» lleva a la cita en Ánimas. No se nombran aseguradoras reales.
- **`/taller/hibridos` (Vértice):** qué se atiende (batería de alto voltaje, inversor, enfriamiento, frenos regenerativos, cargador), seguridad, precio de la revisión y un **reporte de batería de ejemplo** con el voltaje de catorce bloques y uno bajo el mínimo. Tres preguntas frecuentes desplegables. «Agendar en Arco Sur» lleva a la cita.
- **`/taller/garaje` (Vértice):** entrada con el perfil de ejemplo de Mariana (los datos se muestran en pantalla; con otros, lo dice). Dos autos con kilometraje, avance hacia el siguiente servicio y aviso cuando ya toca; actualizar kilometraje con validación (no baja ni salta más de 50,000 km); recordatorio simulado por WhatsApp; la orden abierta con su etapa real y enlace a ella; las citas agendadas en la demo dentro del historial; agendar el siguiente servicio; salir. Se guarda en este navegador (`taller-garaje-v1`).
- **Menú para teléfono y tableta** (hasta 900 px): botón «Menú» con las páginas del taller, Consulta tu auto y Agendar cita; se cierra al elegir. Antes, en esos anchos solo se llegaba a las páginas por enlaces de la portada.
- Menú de escritorio de Vértice: Precios, Hojalatería y seguros, Híbridos, Sucursales y Mi garaje. A 380 px o menos, el teléfono de la cabecera se oculta (está en la barra de abajo).
- Abiertas desde Rosales, las tres páginas dicen que son de Vértice y ofrecen cambiar.

## No incluido todavía

Aviso de privacidad con «borrar mis datos», pasada final y enlace desde la Bienvenida (V4.5.6).

## Qué revisar en la vista previa

1. En el teléfono, abrir «Menú» y recorrer las páginas.
2. Hojalatería: cambiar el costo de la reparación y el deducible.
3. Mi garaje: entrar con el perfil de ejemplo, actualizar el kilometraje del Mazda a 69,600 y ver «Ya toca servicio».
