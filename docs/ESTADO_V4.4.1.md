# Estado de V4.4.1 · Brío, correcciones de la primera revisión

14 de noviembre de 2026. Base: V4.4.0 en la rama `claude/great-edison-k9xun2`. Responde a la revisión de Ian en su teléfono.

## Corregido

- **Disco que se trababa en el teléfono.** El giro estaba ligado a los primeros 1600 px de la página: en el teléfono el disco seguía a la vista más abajo, y por eso se detenía y volvía a girar al subir. Ahora el giro va de la entrada a la salida del disco en pantalla (`useScroll` con el propio disco como objetivo). Además se aplica a una capa HTML con `will-change: transform`, para que el teléfono no vuelva a dibujar el SVG en cada cuadro.
- **Disco sobre los botones** (corregido antes, en V4.4.0): hasta 900 px va debajo de los botones, en el flujo.
- **Planes demasiado grandes en el teléfono.** La tabla de cuatro columnas obligaba a desplazarse de lado. En pantallas de hasta 640 px se muestra una tarjeta por plan que se apila sobre la anterior al bajar (posición `sticky`), con el plan destacado en el color de acento. El título baja de tamaño y de ancho. En escritorio sigue la tabla.
- **Mapa dibujado torcido.** Se sustituye por un mapa real de Xalapa con MapLibre GL 6.14.0 (ya era dependencia por Patio 12) y el estilo oscuro de OpenFreeMap, sin clave. Se carga en diferido cuando la sección se acerca a la pantalla, con gestos cooperativos para no secuestrar el desplazamiento, controles en español, atribución visible (plegada en teléfono) y reintento si falla. Las marcas son botones con nombre que eligen la sucursal, igual que la lista.

## Sucursales en Xalapa

Consulta manual a OpenStreetMap/Nominatim del 14 de noviembre de 2026. Son espacios públicos de referencia, no gimnasios.

| Sucursal | Referencia | Coordenadas (longitud, latitud) | Elemento OSM |
| --- | --- | --- | --- |
| Centro | Parque Juárez | -96.9237455, 19.5265862 | [way/691364227](https://www.openstreetmap.org/way/691364227) |
| Los Lagos | Paseo de los Lagos | -96.9217696, 19.5205437 | [way/438542416](https://www.openstreetmap.org/way/438542416) |
| Macuiltépetl | Parque Ecológico Macuiltépetl | -96.9201254, 19.5474682 | [way/1236749185](https://www.openstreetmap.org/way/1236749185) |
| Tecajetes | Parque de los Tecajetes | -96.9306243, 19.5317825 | [way/301356896](https://www.openstreetmap.org/way/301356896) |
| Natura | Parque Natura El Tejar Garnica | -96.8923417, 19.514269 | [way/1236753020](https://www.openstreetmap.org/way/1236753020) |

## Sigue pendiente

Videos, páginas de Sucursales y Clases con reserva, alta, área de socio, coaches y tienda. La Bienvenida aún no enlaza a Brío.

## Qué revisar en la vista previa

1. En el teléfono, bajar y subir por la portada: el disco gira sin detenerse mientras se ve.
2. Bajar a los planes: tres tarjetas que se apilan, sin desplazamiento lateral.
3. Ver el mapa de Xalapa con las cinco sucursales; tocar una marca o la lista cambia la ficha. Arrastrar con un dedo debe desplazar la página, no el mapa (con dos dedos se mueve el mapa).
