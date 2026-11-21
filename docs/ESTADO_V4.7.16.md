# Estado de V4.7.16 · Revista digital: opcionales y movimiento

21 de noviembre de 2026. Pedido de Ian: hacer también lo opcional y agregar mejoras y animaciones.

## Construido en esta entrega

- **Gymnopédie n.º 1** (Satie, por Kevin MacLeod, CC BY 3.0) ya suena en Umbral: esta vez Wikimedia permitió la descarga (huella SHA-1 verificada). Sustituye a «Dreamer».
- **«Agua» como dossier completo** (N.º 06 de archivo): apertura con su cartel, tres pliegos de lectura («La línea del agua», «Cáusticas», «Tres maneras de mojarse»), proceso con cuatro capas (se agregó el rostro recortado como capa del cartel), cierre. En vez de la silueta, una gota redonda que el texto rodea en círculo y cambia de forma despacio. Dos fotos nuevas de Pexels (luz de color y arcoíris). Se puede guardar; aparece en guardados y en el perfil del creador; su lámina y «Del archivo» llevan al dossier.
- **Movimiento en las tres revistas:**
  - barra de avance de lectura bajo el aviso de demo, del color de cada revista, ligada al desplazamiento;
  - páginas y pliegos que entran al bajar (escala y posición, sin transparencia);
  - portada de Rubor con entrada: la cabecera se cierra desde muy espaciada, el disco crece y la figura sube;
  - transiciones suaves entre páginas (View Transitions) al abrir un número, una investigación o un cartel.
- **Franja de privacidad y créditos** al pie: línea legal con el tono de cada revista.

Con movimiento reducido, nada de esto se mueve.

## Pendiente

Ver la lista en el mensaje de entrega: cierre técnico (PDF accesibles, Core Web Vitals, precarga de fuentes, pasada de diseño, detector de textos encimados), documentación (V4.7.5 a V4.7.11 y Documento Maestro) y revisión en teléfono.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.16.md](VALIDACION_V4.7.16.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
