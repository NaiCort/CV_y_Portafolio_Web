# Estado de V4.5.4 · Lista de precios y revisión de usados

Quinta entrega del giro Taller mecánico, 16 de noviembre de 2026. Base: V4.5.3 en `main` (`f9b8966`). Ficha: [FICHA_TALLER.md](FICHA_TALLER.md).

## Construido

- **`/taller/precios`, en los dos talleres:** la lista completa por categoría (la que la NOM-174 pide a la vista), con precios desde e IVA incluido, tarifa de mano de obra y garantía. Cada servicio con precio se puede marcar para una **suma aproximada** que se puede limpiar; lo que no tiene costo no se suma. Abajo, «Cómo cobramos» con las reglas del contrato tipo de Profeco (presupuesto por escrito, solo diagnóstico si no se acepta, autorización si sube más de 20 %, refacciones nuevas, piezas devueltas, comprobante, cancelación en cinco días hábiles y depósito después de 48 horas), las formas de pago de cada taller y el número de contrato de ejemplo.
- **`/taller/usados`, solo en Rosales:** precio fijo ($600, unos 90 minutos), independencia (no vende autos ni cobra comisión al vendedor), cómo funciona, qué se revisa en cinco grupos (papeles con consulta al REPUVE, motor y transmisión, frenos y llantas, carrocería con medidor de pintura y señales de inundación, eléctrico e interior) y un **reporte de ejemplo** de un auto inventado: veredicto, resumen y cada grupo desplegable con sus hallazgos y lo que costaría ponerlo al día. «Agendar la revisión» lleva a la cita con ese servicio elegido.
- **Páginas de un solo taller:** abierta desde Vértice, la revisión de usados dice que es de Mecánica Rosales y ofrece cambiar de taller.
- Menú: Rosales lleva Precios, Revisión de usados, Consulta tu auto y Cómo llegar; Vértice, Precios, Sucursales y Consulta tu auto. La portada enlaza a la lista completa.

## No incluido todavía

Páginas propias de Vértice (V4.5.5) y aviso de privacidad con «borrar mis datos» y cierre (V4.5.6).

## Qué revisar en la vista previa

1. Abrir Precios en cada taller y marcar servicios: la suma cambia.
2. En Rosales, abrir Revisión de usados, desplegar grupos del reporte y agendar la revisión.
3. Cambiar a Vértice estando en Revisión de usados: debe decir que es de Rosales.
