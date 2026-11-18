# Estado de V4.6.3 · Tu expediente

Cuarta entrega de Cotejo, 18 de noviembre de 2026. Base: V4.6.2 en `main` (`a7f84dd`). Ficha: [FICHA_DESPACHO.md](FICHA_DESPACHO.md). Investigación del portal: sección 9 de [INVESTIGACION_DESPACHO.md](INVESTIGACION_DESPACHO.md).

## Construido

- **`/despacho/expediente`**, el portal ligero que recomendó la investigación:
  - **Se abre sin contraseña** («en un despacho real llega como enlace por WhatsApp»); la página dice que nunca se pide la e.firma ni la contraseña del SAT. Abre el perfil de ejemplo de Mariana (RESICO, diseño gráfico).
  - **Semáforo de cinco renglones** que cambia con lo que haces: declaraciones, opinión de cumplimiento, previo del mes, buzón tributario y lo que el despacho pide.
  - **Previo de noviembre** con el desglose de ISR (tasa de RESICO menos la retención) e IVA ($1,284 en total, coherente con la tabla del art. 113-E). Se aprueba o se manda una duda; Elena contesta (respuesta de ejemplo) y se aprueba. «Simular la presentación» deja la línea de captura de ejemplo y agrega el acuse a los documentos.
  - **Te pedimos:** dos solicitudes con fecha límite. «Subir archivo» abre el selector del teléfono o la computadora, pero el archivo no sale del navegador: solo se anota su nombre y tamaño. También «No lo tengo» y «Cambiar».
  - **Buzón tributario:** aviso con «Ya lo confirmé».
  - **Tus documentos:** acuses, opinión de cumplimiento y constancia, cada uno con una vista de ejemplo.
  - WhatsApp con Elena, «Reiniciar el ejemplo» y «Salir». Se guarda en este navegador (`cotejo-expediente-v1`).
- «Tu expediente» en la cabecera (como recomiendan los sitios mejor evaluados) y en el menú del teléfono; la portada y las herramientas enlazan a él.

## No incluido todavía

Servicios a detalle, «¿Te dejaron de presentar?» y aviso de privacidad con borrado (cierre de V4.6).

## Qué revisar en la vista previa

1. Abrir Tu expediente, mandar una duda sobre el previo y aprobarlo.
2. Subir cualquier archivo en una solicitud y confirmar el buzón: el semáforo debe quedar en verde.
3. Simular la presentación y abrir el acuse.
