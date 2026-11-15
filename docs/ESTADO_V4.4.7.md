# Estado de V4.4.7 · cierre de Gimnasio

Última entrega del giro Gimnasio (Brío), 15 de noviembre de 2026. Base: V4.4.6 en `main` (`d4a5a5c`). Pasada final de calidad sin cambiar el diseño aprobado.

## Cambios

- **Bienvenida:** Gimnasio pasa a disponible y enlaza `/gimnasio` («Brío: cinco sucursales, clases con reserva, área de socio y tienda»). Es el único cambio fuera de `src/giros/gimnasio/`, igual que en el cierre de Café.
- **Revisión con web-design-guidelines:**
  - Los botones no tenían estado al pasar el ratón: ahora se tiñen; el principal se oscurece. Las fichas de filtro marcan su borde.
  - Las horas ocupadas de la evaluación se veían igual que las libres: ahora llevan borde punteado y texto tachado.
  - Tema Distrito con `color-scheme: dark`, para que barras de desplazamiento y listas nativas salgan oscuras.
  - Margen al saltar a una sección (`scroll-margin-top`), `touch-action: manipulation` en controles, `name` en todos los campos de texto y `translate="no"` en el logotipo.
- **Revisión con impeccable (detector en las diez páginas):**
  - Texto del cuerpo con `text-wrap: pretty` (sin una palabra sola en la última línea) y líneas de 64 caracteres como máximo en Coaches.
  - La tienda saltaba de h1 a h3: ahora tiene un h2 «Productos» para lectores de pantalla.
- **Errores encontrados por las pruebas de navegador:**
  - A 1024 px, el selector de tema fijo tapaba «Aviso de privacidad» en el pie y no se podía pulsar. El pie deja espacio libre debajo.
  - El menú del teléfono no se cerraba al elegir la página en la que ya estabas.
- **Pruebas de navegador** `npm run test:browser:gimnasio` (`scripts/verify-gimnasio.mjs`), con el mismo arnés que Café.

## Lo que el detector señala y no se cambia aquí

- La llamada comercial compartida (`ComercialCTA`): etiqueta en mayúsculas sobre el título y un h3 que, en páginas sin h2 (alta, carrito vacío), salta un nivel. Ya estaba anotada para V4.8; se añade el salto de nivel.
- La marca de agua fija (compartida) se superpone al texto al desplazarse. Se anota para V4.8.
- El relleno ajustado de la atribución del mapa es de MapLibre.
- La «ilustración hecha de formas» es el disco de pesas, objeto propio de la marca definido en la ficha.

## Qué revisar en la vista previa

1. La Bienvenida: Gimnasio aparece disponible y abre Brío.
2. Pasar el ratón por los botones y las fichas de filtro (PC).
3. Coaches → Evaluación: las horas ocupadas se ven tachadas.
4. Tema Distrito en el teléfono: listas desplegables oscuras.

Con el visto bueno de Ian, Gimnasio queda cerrado y sigue Taller mecánico (V4.5).
