# Estado de V4.4.3 · Brío, página de Clases

14 de noviembre de 2026. Base: V4.4.2 en la rama `claude/great-edison-k9xun2`.

## Construido

- **Página `/gimnasio/clases`** con su propio `h1` y título. El encabezado y «Reservar clase» del sitio llevan a ella.
- **Horario de siete días** a partir de hoy, con filtros por día, disciplina (con chips), sucursal y coach. Las clases que ya empezaron se muestran sin botón; si un filtro deja el día vacío, se ofrece quitar los filtros.
- **Reserva en cinco estados**:
  1. Inicial: el horario.
  2. Selección: el lugar (bici en Ciclo, rack en Fuerza, costal en Combate, tapete en Movilidad; en Ritmo no hay lugar asignado), con los lugares ocupados tachados.
  3. Procesamiento: 0.8 s.
  4. Resultado: código `BR-#####`.
  5. Salida: ver mis reservas o cerrar.

  La regla de cancelación se muestra antes de confirmar. Si falta el lugar o el nombre, se explica qué hace falta.
- **Lista de espera**: en una clase llena se entra en el lugar 2; avanza un lugar cada 12 s y al llegar al primero se asigna el lugar que quedó libre, con un aviso. El ritmo acelerado se declara en el panel y en la guía.
- **Mis reservas**: cancelar con confirmación (sin consecuencia hasta 2 h antes; después «cuenta como clase tomada»), salir de la lista de espera y «Simular que ya terminó». El resumen muestra minutos, calorías estimadas (MET de referencia y 70 kg, declarado) y minutos por zona de esfuerzo, más calificación de la clase y del coach.
- Todo se guarda en este navegador (`brio-reservas-v1`). El panel de reserva usa el diálogo compartido con colores propios en los dos temas.
- **Inicio**: cada tarjeta de próxima clase tiene «Reservar» o «Lista de espera», que abre esa sesión directamente en Clases.
- **Video**: el componente `Clip` reproduce solo el video visible, tiene un botón global «Pausar videos» que se recuerda, y con movimiento reducido o ahorro de datos muestra la foto.

## Pendiente: los videos

Wikimedia Commons rechazó con error 429 («robot policy») las descargas de los clips de box, ciclo y cuatro alternativas de gimnasio. Solo bajaron dos: uno de peso muerto con un letrero que cambia de lugar y saltos de toma, y uno de kettlebell en una montaña, no en un gimnasio. Ninguno sirve. El componente está listo: basta con agregar la ruta del clip en `data/medios.js`.

## Qué revisar en la vista previa

1. «Reservar clase» en el encabezado: horario de hoy, chips de días y filtros.
2. Reservar una clase eligiendo lugar; ver la confirmación y la reserva en «Mis reservas».
3. Buscar una clase «Llena», unirse a la lista y esperar unos 25 s al aviso de lugar liberado.
4. «Simular que ya terminó» y calificar con estrellas.
5. Desde Inicio, «Reservar» en una tarjeta abre esa sesión.
