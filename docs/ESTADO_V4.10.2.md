# Estado de V4.10.2 · Psicólogo desde cero, en tres temas

25 de noviembre de 2026. Primera demo de la etapa V4.10. Ian decidió reconstruir Psicólogo desde cero como landing de una sola página, con tres temas intercambiables, y aprobó las maquetas con los cambios de la ampliación de diseño.

## Antecedentes (V4.10.1)

- Ficha de los cuatro temas anteriores, que queda como registro (`FICHA_PSICOLOGO_ANTERIOR.md`).
- Investigación de contenido, ley y ética (`INVESTIGACION_PSICOLOGO_2.md`).
- Investigación de diseño visual (`INVESTIGACION_PSICOLOGO_DISENO.md`) y su ampliación con Refero (`INVESTIGACION_PSICOLOGO_DISENO_2.md`).
- Decisiones de Ian:
  - testimonios reemplazados por formación, supervisión y reseñas públicas simuladas;
  - sin autoevaluación clínica;
  - con «Instituciones y colegas» y «Recursos»;
  - tres temas.

## Construido

- **Ficha** (`FICHA_PSICOLOGO.md`): lo común, y la paleta, tipografías, radios, movimiento, estructura, anclas y patrones de cada tema.
- **Contenido único** (`src/giros/psicologo/data/consultorio.js`):
  - persona, cédula y aviso de publicidad ficticios;
  - motivos, enfoque, sobre mí, formación y reseñas públicas;
  - honorarios (650, 650 y 1,100 MXN; precio social de 400 MXN; llamada previa sin costo), formas de pago, factura y seguro, y cancelación;
  - primera sesión, confidencialidad y terapia en línea;
  - instituciones, recursos, preguntas, crisis y temas del contacto.
- **Agenda** (`components/Agenda.jsx` y `lib/agenda.js`):
  - llamada previa o primera sesión;
  - consultorio o en línea, con seis zonas horarias;
  - seis días sin domingos, con horarios ocupados estables;
  - nombre y contacto (WhatsApp, llamada o correo) validados, y el aviso de privacidad en breve;
  - procesamiento, resultado con recordatorio por WhatsApp simulado, y «Volver a la página» o «Agendar otra».
- **«Respira conmigo»** (`components/Respira.jsx`):
  - seis respiraciones de 4 y 6 segundos, que el visitante inicia y detiene;
  - cada tema la dibuja a su manera: círculo que se llena, anillos de bruma o una línea que sube y baja;
  - con movimiento reducido, solo el texto.
- **Contacto** (`components/Contacto.jsx`):
  - formulario sin texto libre: nombre, cómo responder y tema;
  - WhatsApp simulado, dirección y horario de ejemplo, y mapa de Xalapa con OpenFreeMap.
- **Piezas comunes** (`components/piezas.jsx` y `components/secciones.jsx`):
  - cabecera con menú para el celular;
  - ayuda en crisis (completa y breve);
  - cédula con enlace a la SEP;
  - preguntas, recursos, reseñas, aviso de privacidad, pie y sección con nota al margen.
- **Temas** (`temas/Sala.jsx`, `temas/Neblina.jsx`, `temas/Cuaderno.jsx` y `psicologo.css`): cada uno con su orden y composición. Los diálogos toman la piel del tema.
- **Recursos:**
  - fotos de Unsplash en WebP, en dos tamaños cada una (`public/psicologo/fotos/`);
  - tipografías con sus licencias (`public/psicologo/fuentes/`);
  - fuentes de respaldo con `size-adjust` medido.
- **Conexión con el cotizador:**
  - «Cotiza un sitio como este», nuevo en `ComercialCTA` (prop `cotizar`);
  - variantes `psicologo-sala`, `psicologo-neblina` y `psicologo-cuaderno` en `src/data/demos.js`;
  - el catálogo cuenta a Psicólogo en mapa, preguntas, notas y recordatorios.
- **Retirado:** los cuatro temas anteriores, `services.js`, `ReservationFlow`, `DemoContactForm`, `PrivacyModal`, `DemoConfirmation` y `useContactForm`, con sus pruebas y estilos. `ThemeSwitcher` recibe ahora la lista de temas.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.10.2.md](VALIDACION_V4.10.2.md)).
- Desplegado en producción: no; espera la revisión de Ian en la vista previa.

## Pendiente

- **Ian:**
  - revisar los tres temas en la vista previa de su teléfono y en Edge;
  - en particular, decir si alguno cambia de estructura o de tono.
- **Siguiente demo de V4.10:** Patio 12.
- **Pendientes de la lista que esta entrega resuelve para Psicólogo:**
  - fotos servidas desde el sitio;
  - Inter fuera;
  - consolidación de los temas;
  - ficha de identidad;
  - precarga de fuentes (con respaldos medidos).
