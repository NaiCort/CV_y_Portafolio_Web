# Estado de V4.5.3 · Presupuesto con visto bueno

Cuarta entrega del giro Taller mecánico, 16 de noviembre de 2026. Base: V4.5.2 en `main` (`a828068`). Ficha: [FICHA_TALLER.md](FICHA_TALLER.md).

## Construido

- Página `/taller/consulta` en los dos talleres. Con el folio y las placas (o desde la portada) abre la orden de ejemplo; si la dirección no trae una orden válida, o es la del otro taller, pide los datos.
- **Lo que encontramos:** cada partida con su semáforo, por qué importa, una medida (grosor de balata, prueba de rebote, profundidad de la banda, kilómetros desde el último servicio), el desglose de refacción y mano de obra, y la decisión «Autorizar» o «No por ahora». Lo que está bien se muestra sin costo.
- **Tu visto bueno:** resumen de lo autorizado con IVA incluido y entrega estimada; firma escribiendo el nombre. Si falta decidir una partida o la firma, lo dice. Envío simulado («Enviando tu visto bueno…»).
- **Si no se autoriza nada**, se paga solo el diagnóstico y el auto sale como llegó, con el diagnóstico por escrito.
- **En reparación:** solo lo autorizado. «Avanzar la simulación» muestra un hallazgo (disco bajo el grosor mínimo en Rosales; bujes agrietados en Vértice) con cuánto sube el total y la regla de Profeco: autorización por escrito cuando sube más de 20 %. No se puede terminar sin decidirlo.
- **Listo para entregar:** comprobante desglosado con IVA incluido y el diagnóstico descontado, piezas cambiadas (las que se devuelven y las que se reciclan, como llantas y aceite usado), garantía con fecha (90 días en Rosales, seis meses en Vértice) y el aviso de recoger en 48 horas.
- La orden se guarda en este navegador (`taller-orden-v1`) por taller; «Reiniciar la orden de ejemplo» vuelve al principio.
- «Consulta tu auto» en el menú de los dos talleres. En Rosales, la consulta de la portada lleva a la orden; en Vértice, «Autorizar el presupuesto de ejemplo» junto a Mi garaje.

## No incluido todavía

Páginas propias de cada taller (V4.5.4 y V4.5.5) y aviso de privacidad con «borrar mis datos» (V4.5.6).

## Qué revisar en la vista previa

1. En Rosales, consultar la orden de ejemplo, autorizar las balatas y no el amortiguador, firmar y enviar.
2. Avanzar la reparación, decidir el hallazgo y revisar el comprobante.
3. Reiniciar y no autorizar nada: debe cobrar solo el diagnóstico.
4. Repetir en Vértice desde «Autorizar el presupuesto de ejemplo».
