# Estado de V4.7.3 · Umbral y base compartida de Revista

Primera entrega de la ampliación autorizada por Ian el 19/11/2026, sobre `main` V4.7.2
(`2db37ce`). Ian aprobó el nombre Umbral y comenzar modificaciones. Ficha actualizada
antes de implementar: [FICHA_REVISTA.md](FICHA_REVISTA.md).

## Implementado

- Umbral en `/revista/umbral`: fotografía, diseño y cultura visual, con portada tipográfica,
  dos dossiers completos, vista de historia/proceso, perfil ficticio Nicolás Vera,
  filtro de disciplina y guardados. Fotos locales existentes, identificadas como ilustrativas.
- Entrada de Revista con tres publicaciones. Rubor y Prisma mantienen sus rutas y funciones.
- Persistencia por marcador, con bajas y migración del formato antiguo: distintas pestañas
  no sobrescriben listas completas. Eventos `storage` actualizan contadores.
- Búsqueda de Prisma muestra todos los resultados anunciados y estado sin coincidencias.
- Gestión de foco en cambios de ruta y enlaces profundos; fragmentos mal formados tolerados.
- Privacidad para las tres revistas: borra el ámbito `revista-`, reinicia componentes y comunica
  el borrado a otras pestañas. Conserva los datos de otras demos. No se envían datos.
- Créditos en `/revista/:sitio/creditos`, licencias locales y registro de fotos deduplicado.
  La procedencia desconocida no se presenta como verificada.

## Alcance pendiente

Revista no está cerrada. No se han implementado suscripción ni secciones/detrás de cámaras
de Rubor, envío de investigaciones ni exploración de áreas y sostenimiento de Prisma, música,
ni remediación del etiquetado de los PDF. El ajuste editorial completo continúa por entregas.
No hay backend, cuentas o pagos reales. Las otras demos permanecen sin cambios.

## Verificación y publicación

Consultar [VALIDACION_V4.7.3.md](VALIDACION_V4.7.3.md). La rama se publicó en GitHub y el
[PR #48](https://github.com/NaiCort/Multiples_Demos/pull/48) está abierto para revisión.
