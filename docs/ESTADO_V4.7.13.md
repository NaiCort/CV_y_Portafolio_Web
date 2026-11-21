# Estado de V4.7.13 · Revista digital, bocina y música por revista

21 de noviembre de 2026. Pedido de Ian: quitar la barra de música de arriba (solo deben quedar el aviso de demo y la cabecera de cada revista) y usar una bocina.

## Construido en esta entrega

- **Bocina transparente** fija abajo a la derecha en Rubor, Prisma y Umbral (no en la entrada). Empieza tachada, en silencio. Al pulsarla suena la pista de esa revista y cambia el símbolo (ondas que laten suave). Al pulsarla otra vez, silencio.
- **Volumen vertical** que se despliega hacia arriba, también transparente, solo con la música encendida y solo mientras el cursor está encima; se oculta al salir (con una pausa corta para poder subir del botón a la barra). Con teclado aparece al enfocar la bocina; en pantallas táctiles, al tocarla, hasta tocar fuera. Escape lo cierra.
- **Una pista por revista** (Kevin MacLeod, CC BY 3.0, desde Wikimedia Commons, servidas desde el sitio): Rubor, «Night on the Docks (Sax)», saxofón nocturno; Prisma, «Clean Soul», piano eléctrico tranquilo; Umbral, «Dreamer», sintetizadores espaciosos. Créditos en cada página de créditos, en `public/revista/audio/LICENCIA.txt` y en `medios-origen.json`.
- Al pasar de una revista a otra con la música encendida, sigue sonando con la pista nueva. Al recargar, vuelve a empezar en silencio; el volumen sí se recuerda. Privacidad lo apaga y restablece.
- Se quitó la pieza sintetizada anterior («Lectura», 24 s).
- Revisada la rama `codex/revista-bocina`: tenía la idea correcta pero una sola pista, sin transición y también en la entrada; se rehízo con lo descrito por Ian.

## Pendiente

Gymnopédie n.º 1 (propuesta para Umbral) no se pudo descargar: Wikimedia limitó las descargas desde este entorno (error 429). «Dreamer» la sustituye.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.7.13.md](VALIDACION_V4.7.13.md)).
- Desplegado en producción: no; pendiente de pull request, vista previa y visto bueno de Ian.
