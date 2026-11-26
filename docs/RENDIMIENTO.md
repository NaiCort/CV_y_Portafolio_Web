# Rendimiento: presupuesto y mediciones

Regla GEN-011 y puerta G6 del Digital Development Handbook (adopción en `HANDBOOK.md`). Actualizado el 26/11/2026, en V4.10.6.

## Presupuesto

### Compilación

`npm run audit:presupuesto` mide sobre `dist/`, con gzip, lo que descarga el navegador. Corre en CI después de compilar y falla si algo se pasa.

Desde V4.10.6 la portada y las demás rutas se miden aparte. El CV se carga aparte y solo la portada lo precarga.

| Medida | Qué incluye | Presupuesto | V4.10.5 | V4.10.6 |
| --- | --- | --- | --- | --- |
| JavaScript inicial, portada | El script de entrada, sus precargas y el código del CV que precarga `dist/index.html` | 94 KB | 100.4 KB | 83.9 KB |
| JavaScript inicial, demás rutas | El script de entrada y sus precargas (`dist/app.html`), antes del código propio de cada demo | 86 KB | 100.4 KB | 76.2 KB |
| CSS inicial, portada | Hojas que enlaza `dist/index.html`, con la del CV | 12 KB | 8.8 KB | 8.9 KB |
| CSS inicial, demás rutas | Hojas que enlaza `dist/app.html` | 8 KB | 8.8 KB | 5.4 KB |
| Trozo de ruta más pesado | El código propio de una demo o del cotizador, sin el motor del mapa (MapLibre), que solo baja al acercarse a un mapa | 70 KB | 61.0 KB (Revista) | 61.0 KB (Revista) |

**Por qué estas cifras:** son lo medido con unos 10 KB de margen en JavaScript y unos 3 KB en CSS. Así, cualquier crecimiento se nota y se decide a propósito. En V4.10.6 bajaron con el paquete común (DEC-021).

### Laboratorio

`npm run audit:cwv -- /ruta`, sobre `vite preview`, simula un teléfono de 390 px con red 4G lenta y CPU 4 veces más lenta.

Para medir un tema o variante, se fija antes de cargar con `DEMO_STORAGE="clave=valor"`. Por ejemplo:

```bash
DEMO_STORAGE=demo-psicologo-theme=neblina npm run audit:cwv -- /psicologo
```

| Medida | Meta |
| --- | --- |
| LCP (carga del elemento principal) | 2.5 s o menos |
| CLS (desplazamiento de contenido) | 0.1 o menos |

Es una medición de laboratorio, no de visitantes reales. Para datos de campo haría falta analítica, que hoy el sitio no tiene a propósito (`/privacidad`).

## Mediciones de V4.10.6

| Página | V4.10.5 | V4.10.6 | CLS | Elemento principal en V4.10.6 |
| --- | --- | --- | --- | --- |
| `/` (CV) | 1.24 a 1.28 s | 1.19 a 1.27 s | 0.000 | Foto del CV |
| `/restaurante` | 1.96 s | 2.18 a 2.20 s | 0.000 | Foto de la pasta |
| `/restaurante/carta` | 2.01 s | 1.87 a 1.97 s | 0.000 | Título |
| `/restaurante/locales` | 1.96 s | 1.80 a 1.85 s | 0.000 | Título |
| `/restaurante/locales/xalapa` | 1.85 s | 1.80 a 1.91 s | 0.001 | Párrafo de entrada |
| `/restaurante/conocenos` | 4.39 s | 2.24 a 2.32 s | 0.000 | Foto del local |
| `/restaurante/pedido` | 1.84 s | 1.71 a 1.73 s | 0.000 | Título |

Todo cumple las metas. **Inicio** subió porque la portada quedó más corta, sin la etiqueta ni la nota: en el teléfono la foto asoma en la primera pantalla y pasó a ser el elemento principal. Sin precarga tardaba 2.9 s; con ella, 2.2 s.

**Fuera de Patio 12** (medido una vez, sin cifra anterior): `/gimnasio` 2.17 s y `/taller` 2.77 s. Taller pasa de la meta. Se corrige en su entrega (punto 13 de la lista de cada entrega). Con el paquete común más ligero, ninguna demo puede haber empeorado.

## Mediciones de V4.10.5

Por primera vez, cada tema de Psicólogo por separado. El tema se fija antes de cargar, con dos corridas por tema como mínimo (ocho en Cuaderno). La columna V4.10.4 se midió en la misma máquina, el mismo día, sobre una compilación de `main`.

| Tema de `/psicologo` | V4.10.4 | V4.10.5 | CLS | Elemento principal |
| --- | --- | --- | --- | --- |
| Sala con luz | 2.08 a 2.20 s | 2.04 a 2.06 s | 0.000 | Retrato |
| Neblina | 3.88 a 3.93 s | 2.21 a 2.22 s | 0.053 | Foto del bosque |
| Cuaderno | 2.04 s | 1.89 a 2.00 s | 0.035 | Párrafo de entrada (mide casi lo mismo que la polaroid) |

| Ruta | LCP | CLS | Elemento principal |
| --- | --- | --- | --- |
| `/` | 1.26 s | 0.000 | Foto del CV |
| `/cotizador` | 1.47 a 1.49 s | 0.019 | Párrafo de entrada |
| `/privacidad` | 1.38 a 1.41 s | 0.091 | Lista del aviso |

Todo cumple las metas. Neblina no las cumplía desde V4.10.2, y no se había visto porque solo se medía el tema por defecto.

## Mediciones de V4.10.3

| Ruta | LCP | CLS | Elemento principal |
| --- | --- | --- | --- |
| `/` | 1.24 s | 0.000 | Foto del CV |
| `/cotizador` | 1.59 s | 0.019 | Párrafo de entrada |
| `/psicologo` | 2.08 s | 0.000 | Foto de la portada |
| `/privacidad` | 1.43 s | 0.091 | Lista del aviso |

Las cuatro rutas cumplen las metas.

**`/privacidad` queda cerca del límite de CLS:** al llegar la tipografía Source Serif 4, algunos párrafos cambian de renglón; es una página de puro texto. Mejora posible: precargar esa fuente en esta ruta o aplicar el pendiente 7 de `CLAUDE.md`.

## Cambios de V4.10.6

- **Paquete común (DEC-021).** Todas las rutas descargaban el estado de Patio 12, su contador flotante y el código del CV. Ahora:
  - el restaurante trae su estado y su contador (`src/giros/restaurante/RestauranteRuta.jsx`);
  - el CV se carga aparte (`src/rutasDemo.js`). La portada llega prerenderizada, enlaza su CSS y precarga su código. Los nombres de los archivos salen del manifiesto de la compilación, que se borra al terminar (`scripts/prerender.mjs`).

  Las demos bajan de 100.4 a 76.2 KB de JavaScript y de 8.8 a 5.4 KB de CSS.
- **La foto del CV, primero.** Con las precargas nuevas delante, la foto llegaba 0.2 s más tarde (1.47 s). Su precarga va ahora al principio de la cabecera, y la portada volvió a 1.2 s. Sin precargar el código del CV ganaba 0.05 s más, pero la hidratación llegaba después: se dejó la precarga.
- **Precarga de la foto principal por página:**
  - Inicio y Conócenos de Patio 12 se suman a Psicólogo (Neblina);
  - la precarga va por ruta exacta, porque en las demás páginas el elemento principal es el título;
  - la foto y la página leen el archivo del mismo lugar (`portada.js`).
- **Fotos de Patio 12 en el tamaño justo:**
  - 46 fotos con versión de 480 px;
  - la del local en tres tamaños (`docs/RECURSOS_RESTAURANTE.md`);
  - recorrer toda la carta en el teléfono baja 887 KB de fotos en lugar de 2.8 MB.
- **Respaldos medidos** de Bitter (114.1 %) y DM Sans (102.1 %). El CLS ya era casi cero en laboratorio; el respaldo cuida el salto en redes lentas reales.
- **Movimiento sin costo de carga:** el título, el párrafo de entrada y las fotos principales no se funden. La foto de portada y el sello se mueven sin cambiar de opacidad.
- **Lecciones:**
  - al quitar algo de una portada, volver a medir: el elemento principal puede cambiar;
  - una precarga nueva delante de la foto principal la retrasa: la de la foto va primero.

## Cambios de V4.10.5

- **Por qué Neblina tardaba:**
  - su portada es una foto a todo lo ancho;
  - en un teléfono de 390 px con pantalla 3x, el navegador necesita unos 1170 px de ancho, y solo había versiones de 1000 y 2000 px, así que bajaba la de 2000 (233 KB);
  - además, la foto se pedía solo cuando ya había llegado el código de la demo (1.6 s).
- **Tamaño intermedio:** `bosque-niebla-1200.webp` (97 KB).
  - Sale del mismo original de Unsplash, con el mismo proceso: Pillow LANCZOS y WebP calidad 72.
  - Queda registrada con su huella en `public/psicologo/medios-origen.json`.
  - Comparada a tamaño real bajo el velo oscuro de la portada, no se distingue de la de 2000 px.

  Con este cambio, 2.9 s.
- **Precarga al entrar directo:** `main.jsx` pide la foto de Neblina desde el principio, mediante `precargarPortada` de `src/rutasDemo.js` y `src/giros/psicologo/portadas.js`. La precarga y el tema leen los mismos tamaños del mismo lugar, para que el navegador no baje la foto dos veces. Con este cambio, unos 2.2 s.
- **Solo en Neblina:** se probó también en Sala con luz y en Cuaderno, y empeoró (2.4 y 2.7 s). Su retrato pesa 43 KB y no era lo que tardaba; pedirlo antes le quitaba ancho de banda al código de la demo, y la portada se dibujaba más tarde.
- **La carga de la portada no funde el título ni el párrafo de entrada:**
  - en Cuaderno, el párrafo de entrada mide casi lo mismo que la polaroid (unos 53 000 px²) y compite con ella por ser el elemento principal;
  - el navegador no da por pintado un elemento que se funde hasta que termina de aparecer: con el fundido, 3 de 6 corridas pasaban de 2.5 s (máximo 2.56 s), y sin él, 6 de 6 quedaban en 2.03 s o menos;
  - por eso solo se escalonan botones, nota y cédula, y las fotos hacen su gesto sin cambiar de opacidad.

  Con eso, ninguna animación nueva retrasa la carga.
- **JavaScript inicial:** de 100.0 a 100.4 KB, por la precarga y los tamaños de las portadas.
- **Lecciones:**
  - medir cada tema o variante, no solo la de entrada (punto 13 de la lista de cada entrega en `PLAN_V4.8.md`; `DEMO_STORAGE` fija el tema);
  - no fundir al cargar lo que puede ser el elemento principal, sea foto o texto.

## Cambios de V4.10.3

- **El cotizador y el aviso de privacidad se cargan aparte** (`src/rutasDemo.js`). El trozo principal bajó de 113.8 a 83.2 KB comprimidos (gzip estándar, mismo método en las dos medidas).
- **Precarga:** el CV precarga el cotizador al pasar el cursor por su enlace o al enfocarlo, así que el clic no espera.

## Lo que queda en el paquete común

Medido en V4.10.6 con los mapas de fuente de la compilación (gzip, demás rutas: 76.2 KB):
- **React y su motor de dibujo** (`react-dom`), unos 55 KB comprimidos, y **React Router**, unos 13 KB: no se pueden quitar.
- **Lo demás**, unos 12 KB sin comprimir (alrededor de 4 KB comprimidos):
  - el armazón (`App.jsx`, rutas, aviso de error y página no encontrada);
  - «Vuelve al cotizador»;
  - las precargas de las fotos principales;
  - lo mínimo de framer-motion (`MotionConfig`).

Sacar más ya no cambia la carga de forma notable. El presupuesto vigila que no crezca.
