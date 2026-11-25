# Estado de V4.8.7 · Pasada final y cierre del CV

25 de noviembre de 2026. Última entrega de la etapa del CV web y portafolio (V4.8.1 a V4.8.7). Ian pidió hacer la pasada final y cerrar. También decidió que cada etapa lleva su propia versión menor: V4.9 cotizador base, V4.10 demos y V4.11 ajuste final del cotizador.

## Pasada final

- **Conteo de patrones vigilados:** uno, el reflector que sigue al cursor, aceptado en la ficha porque forma parte de la referencia que eligió Ian. Los rótulos en mayúsculas pequeñas («Demos», «Certificaciones») son el título de su sección, no etiquetas sobre un título.
- **Selección, foco, barras de desplazamiento y subrayado:** ya estaban con los tonos del CV (selección brasa, foco con contorno brasa, barras finas con el filete y subrayado brasa). Se comprobaron en capturas a 1440 y 390 px.
- **Orden del teclado (corregido):**
  - `useRouteFocus`, un gancho compartido, llevaba el foco al contenido principal también en la primera carga;
  - en el CV, el primer Tab caía en «CV y portafolio web» y se saltaba «Saltar al CV», el PDF, el índice y el contacto;
  - ahora la página de entrada no mueve el foco. Al navegar dentro del sitio, sí lo lleva al contenido; se distingue por la clave que React Router guarda en el historial;
  - afecta también a Psicólogo, al cotizador y a la página no encontrada, que usan el mismo gancho. Es la excepción de `CLAUDE.md` para errores en componentes compartidos.
- **impeccable** (`detect` sobre `/` y `/cotizador` ya compilados): sin hallazgos. Sus 12 notas eran palabras solas en la última línea; se resolvieron con `text-wrap: pretty` en párrafos, viñetas y definiciones del CV.
- **Limpieza:** se quitó JetBrains Mono (`@font-face`, respaldos, variable, archivo y licencia), que la dirección «Brasa» ya no usa.
- **Documentos:**
  - `docs/FICHA_CV.md` al día: dos tipografías, el acento sin la línea de tiempo y la estructura sin «Trayectoria»;
  - comentario de cabecera de `cv.css` con la dirección vigente;
  - `package-lock.json` con el nombre y la versión del proyecto (seguía en «multiples-demos» 4.7.11).
- **PDF del CV:** la versión nueva de Ian, con el enlace a `cv-y-portafolio-web.vercel.app`.

## Decisiones de Ian (25/11/2026)

- El CV visual queda en pausa; el sitio lo sigue mostrando como «pronto». No es requisito para cerrar.
- Psicólogo se queda como landing de una sola página.
- Numeración de etapas: V4.9 cotizador base, V4.10 demos (Psicólogo V4.10.10 a Cotejo V4.10.60) y V4.11 ajuste final del cotizador.

## Documento Maestro

Se generó la versión V4.8.7 (revisión documental 8), con la PARTE XVII (secciones 113 a 124) sobre la etapa del CV web y portafolio. Se entrega a Ian como archivo; no vive en el repositorio. `CLAUDE.md` la cita como vigente.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.8.7.md](VALIDACION_V4.8.7.md)).
- Desplegado en producción: no; queda en la rama hasta que Ian revise la vista previa y haga el merge.

## Pendiente

- **Ian:** revisar la vista previa en su teléfono y dar el visto bueno para cerrar la etapa.
- Revisar en Google Search Console que la portada se indexe, cuando Ian quiera darla de alta.
- CV visual: publicarlo cuando Ian lo termine.
- Siguiente etapa: **V4.9, cotizador base**.
- Después:
  - V4.10, demos (Psicólogo primero, como landing);
  - V4.11, ajuste final del cotizador;
  - versión en inglés;
  - LinkedIn;
  - `npm audit` (vitest y minimatch vía eslint).
