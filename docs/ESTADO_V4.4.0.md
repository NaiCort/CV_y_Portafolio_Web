# Estado de V4.4.0 · Brío, primera entrega

Primera entrega del giro Gimnasio, 14 de noviembre de 2026. Base: V4.3.6 en `main` (`02676b7`). Ficha de identidad: [FICHA_GIMNASIO.md](FICHA_GIMNASIO.md). Investigación: documento «Gimnasios: cómo funcionan sus sitios y apps» (Claude Docs).

## Construido

- Ruta `/gimnasio/*` con carga diferida. El único archivo compartido que cambia es `src/App.jsx`, para registrar la ruta. No se tocó ninguna demo cerrada ni el `ThemeSwitcher` de Psicólogo.
- Datos de ejemplo en `src/giros/gimnasio/data`: cinco sucursales con horario y rasgo propio, cinco disciplinas, horario semanal de 52 clases, seis coaches, tres planes y el perfil de ejemplo de Andrea.
- Inicio con la dirección «Combinada»:
  - Portada con el disco de 20 kg que gira al desplazarse (quieto con movimiento reducido). Las cifras de sucursales y clases salen de los datos.
  - «Ahora mismo»: aforo simulado de cada sucursal según la hora y el día, con estado (tranquilo, normal, lleno a medias, lleno, cerrada). Se actualiza cada minuto.
  - Franja oscura con el mapa dibujado de la ciudad ficticia; la lista elige la sucursal y la ficha muestra dirección, horario de hoy, aforo y lo que tiene.
  - Próximas clases de Combate, Fuerza y Ciclo según el horario y la hora actual, con lugares libres simulados y fotos en blanco y negro.
  - Vista previa del área de socio: teléfono con el pase QR real que cambia cada 30 s, la próxima clase, la semana de actividad y un pedido de la tienda.
  - Tabla de planes Acceso, Club y Total con precios con IVA y lo que incluye cada uno en palabras; cancelación en un paso y aviso antes de renovar.
- Dos temas, Cobalto y Distrito, con variables de CSS sobre la misma estructura. El selector propio está en la esquina inferior derecha y guarda la elección en `brio-tema-v1`.
- Fuentes Anybody y Public Sans en `public/gimnasio` con sus licencias OFL; cuatro fotos de Wikimedia Commons (tres de dominio público y una CC BY-SA 4.0) en WebP de 1280 y 640 px, con huellas en `public/gimnasio/medios-origen.json` y página `/gimnasio/creditos`.
- Banner de demo con guía «Cómo funciona», llamada comercial real con los colores del tema y marca de agua.

## No incluido todavía

Videos en lugar de fotos (Wikimedia Commons limitó las descargas; se procesan en la siguiente entrega), páginas de Sucursales, Clases con reserva y lista de espera, alta en pasos, área de socio con inicio de sesión, coaches y tienda. Mientras tanto, la navegación lleva a las secciones de Inicio y «Entrar» muestra un aviso de que el área de socio llega después, en lugar de no hacer nada.

**La Bienvenida no enlaza todavía a Gimnasio**: Brío se revisa en `/gimnasio` en la vista previa y se habilitará en el directorio al cerrar V4.4.

## Qué revisar en la vista previa

1. Abrir `/gimnasio` en el teléfono: título, texto y botones en la primera pantalla; el disco abajo, cortado por el borde.
2. Desplazarse y ver girar el disco. Con movimiento reducido debe quedar quieto.
3. Cambiar de tema con los dos círculos de la esquina; recargar y comprobar que se conserva.
4. Elegir sucursales en la lista y ver cambiar el pin y la ficha del mapa.
5. Ver el QR cambiar al llegar a 0:00 en la cuenta del pase.
6. Revisar que los datos se leen como ficticios y que los precios dicen «IVA incluido».
