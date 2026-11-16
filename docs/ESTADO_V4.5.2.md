# Estado de V4.5.2 · Agendar cita

Tercera entrega del giro Taller mecánico, 16 de noviembre de 2026. Base: V4.5.1. Ficha: [FICHA_TALLER.md](FICHA_TALLER.md).

## Construido

- Página `/taller/cita` en los dos talleres, con cinco pasos en la misma página: qué necesitas, tu auto, dónde y cuándo, tus datos, y revisa y confirma. Cada paso valida antes de seguir, marca el campo con error y lleva el foco a él.
- **Rosales:** se elige llevar el auto al taller o que vaya el mecánico (solo para diagnóstico y para el servicio a domicilio). A domicilio pide colonia y calle; si la colonia queda fuera de los 3 km, lo dice y sugiere llevar el auto.
- **Vértice:** se elige sucursal; las especialidades se agendan solo en la suya (hojalatería en Ánimas, híbridos en Arco Sur, alineación en Lázaro Cárdenas) y queda elegida sola. «Pasen por mi auto» pide la dirección de recolección.
- Días y horas según el horario de cada local, con dos horas de anticipación y lugares ocupados simulados (tachados).
- **Desde un testigo:** «Agendar revisión» llega con el servicio sugerido y el aviso de qué hacer. Si no conviene manejar (aceite, temperatura, frenos), Rosales propone el mecánico a domicilio cuando se puede y Vértice marca la recolección.
- «Agendar aquí» de cada sucursal llega con esa sucursal elegida. «Agendar cita» está en la cabecera, en la portada y en la barra del teléfono.
- Confirmación simulada («Apartando tu lugar…») con folio, resumen, qué sigue (presupuesto antes de reparar; si no se acepta, solo se paga el diagnóstico), «Agregar a mi calendario» (.ics con aviso una hora antes), «Agendar otra cita» y «Volver al inicio».
- «Tus citas» de cada taller, guardadas en este navegador (`taller-citas-v1`), con cancelación de dos pasos y calendario. Cada taller ve solo las suyas.
- WhatsApp sigue como conversación simulada.

## No incluido todavía

Presupuesto con visto bueno por partida (V4.5.3), páginas propias de cada taller y aviso de privacidad con «borrar mis datos» (V4.5.6).

## Qué revisar en la vista previa

1. Tocar el testigo de aceite y «Agendar revisión»: debe proponer el mecánico a domicilio.
2. Agendar en Vértice «Revisión de híbridos»: solo ofrece Arco Sur.
3. Probar una colonia fuera de alcance y un teléfono incompleto.
4. Confirmar, agregar al calendario, volver y cancelar la cita desde «Tus citas».
