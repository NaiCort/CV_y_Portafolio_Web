# Estado de V4.5.0 · Rosales y Vértice, primera entrega

Primera entrega del giro Taller mecánico, 16 de noviembre de 2026. Base: V4.4.8 en `main` (`ad84ee3`). Ficha de identidad: [FICHA_TALLER.md](FICHA_TALLER.md). Investigación: [INVESTIGACION_TALLER.md](INVESTIGACION_TALLER.md) y [REFERENCIAS_TALLER.md](REFERENCIAS_TALLER.md).

## Construido

- Ruta `/taller/*` con carga diferida. El único archivo compartido que cambia es `src/App.jsx`, para registrar la ruta. No se tocó ninguna demo cerrada.
- Dirección «Combinada», elegida por Ian entre las maquetas Orden, Rótulo y Tablero: estructura y testigos de Tablero, con la orden de servicio en papel de Orden.
- Dos talleres ficticios, uno por tema, sobre la misma estructura:
  - **Mecánica Rosales** (predeterminado): taller familiar de la colonia Revolución, papel y rojo de sello.
  - **Vértice**: multimarca con cuatro sucursales, tablero de noche con ámbar.
  - El selector propio de la esquina cambia de negocio (nombre, textos, precios y secciones) y guarda la elección en `taller-tema-v1`.
- Inicio:
  - Portada con título, «Agendar cita», «Escribir por WhatsApp» y foto a sangre.
  - «¿Qué luz se encendió?»: seis testigos del tablero. Al elegir uno se lee qué puede ser, qué hacer ahora, qué tan urgente es (detente, agenda pronto o puede esperar) y qué ofrece el taller del tema con su precio. «Agendar revisión» abre el WhatsApp simulado con el mensaje de ese testigo.
  - Orden de servicio de ejemplo en papel (NOM-174-SCFI-2007): folio, vehículo, placas, partidas en semáforo, sello y firma, con los puntos de cómo se lee el presupuesto.
  - Rosales: «Consulta tu auto» con folio y placas, sin cuenta. Encuentra la orden de ejemplo y muestra sus cinco etapas; si los datos no coinciden lo dice y ofrece la orden de ejemplo.
  - Vértice: tarjeta «Mi garaje» de un perfil de ejemplo con el kilometraje hacia el siguiente servicio, y las cuatro sucursales con su especialidad.
  - Precios desde, con tarifa de mano de obra, garantía y precios con IVA.
- En el teléfono, barra fija con «Llamar», «WhatsApp» y «Agendar». La llamada es simulada: ningún enlace `tel:` marca a un número de ejemplo.
- Fuentes Saira, Figtree e IBM Plex Mono en `public/taller` con sus licencias OFL. Dos fotos de Wikimedia Commons (CC BY-SA 4.0 y CC BY 3.0) en WebP de 1280 y 640 px, una con la matrícula difuminada, con huellas en `public/taller/medios-origen.json` y página `/taller/creditos`.
- Banner de demo con guía «Cómo funciona», llamada comercial real con los colores del taller y marca de agua.

## No incluido todavía

Agendar cita con servicio, auto, día y hora (por ahora abre el WhatsApp simulado), presupuesto por partida con visto bueno, página de precios completa, revisión de usados y mecánico a domicilio (Rosales), hojalatería con aseguradoras, híbridos y Mi garaje con inicio de sesión (Vértice), y aviso de privacidad.

**La Bienvenida no enlaza todavía al taller**: se revisa en `/taller` en la vista previa y se habilitará en el directorio al cerrar V4.5, como se hizo con Brío.

## Qué revisar en la vista previa

1. Abrir `/taller` en el teléfono: título, texto y botones en la primera pantalla, y la barra de contacto abajo.
2. Tocar varios testigos y leer cómo cambia la lectura; probar «Agendar revisión».
3. En «Consulta tu auto», usar la orden de ejemplo y ver las etapas.
4. Cambiar a Vértice con los círculos de la esquina; recargar y comprobar que se conserva.
5. Revisar que precios, folios y personas se leen como ficticios.
