# Investigación: portafolios de referencia para el CV web

21 de noviembre de 2026. Ian propuso 13 sitios. Se revisaron con Chromium y Playwright desde el entorno, después de abrir esos dominios con su permiso. Se consultaron:
- librerías cargadas;
- marcadores del framework;
- fuentes, lienzos WebGL y recursos;
- capturas.

Además se leyó el código abierto de Brittany Chiang v1 a v4, Paco y Tania Rascia. Nada de esto se copia: se toma la técnica y se adapta a «Neblina y Esquema» (`FICHA_CV.md`).

## Qué usa cada sitio

| Sitio | Base | Librerías vistas | Idea principal |
| --- | --- | --- | --- |
| Niccolò Miranda («The Paper Portfolio») | Webflow | GSAP 3.7, Locomotive Scroll 4, butter-slider, WebGL (2 lienzos) | Carrusel de trabajos que se arrastra de lado, nombre gigante que corre, papel y tinta |
| Sonar Music | Webflow | GSAP 3.12, ScrollTrigger, Lenis, SplitType, Lottie, Howler (sonido) | Fotos que se inclinan al bajar, letreros gigantes en cinta, tarjetas con borde punteado y numeración real por categoría, sonidos de interfaz |
| Dennis Snellenberg | Sitio propio | GSAP 3.9, ScrollTrigger, Barba.js, Locomotive Scroll | Transiciones entre páginas (Barba), 23 elementos «magnéticos» que siguen al cursor, apellido gigante en cinta |
| Overworld Audio | Nuxt | WebGL2 propio, Howler | Entrada «con sonido o sin sonido»; un paisaje 3D con niebla donde cada proyecto es una luz; se arrastra para navegar |
| Active Theory | Motor propio (Hydra) | No se pudo ver: responde «Not Supported» al navegador automatizado | Todo es una escena 3D |
| OMA | Aplicación propia (Vite) | Mapbox GL (mapa en WebGL), lazySizes | Proyectos con filtros (estado, programa) y cambio entre lista y mapa en la URL (`?view=map`) |
| Brittany Chiang (actual) | Next.js | Inter; nada de animación externa | Columna izquierda fija con índice que marca la sección activa; resplandor `radial-gradient(600px at x y, …)` que sigue al cursor; experiencia con fecha a la izquierda y etiquetas de tecnología |
| Brittany Chiang v1 a v4 | jQuery, Jekyll, Jekyll y Gatsby | v4: anime.js (logotipo que se dibuja), ScrollReveal (20 px, 500 ms), pestañas con flechas del teclado | Cada versión vive en su subdominio y el sitio nuevo las enlaza |
| Adham Dannaway | WordPress | jQuery 1.6 | Cara mitad «designer», mitad «coder»: con el cursor, una mitad crece y la otra se encoge, suavizado con `xp += (x - xp) / 12` |
| Visual Cinnamon | Hugo | D3 v4 y canvas | Visualización propia en la portada (hexágono de datos) |
| Tania Rascia | Gatsby 5 | Fuentes propias (Outfit, Google Sans Code) | Sobriedad: lista de notas, tema oscuro y búsqueda local |
| Paco | Next.js | cmdk (menú de comandos), tinykeys, next-themes | Ctrl o ⌘ + K y atajos «g p», «g b»… para navegar; «t» cambia el tema |
| Matt Farley | HTML propio | Font Awesome, Typekit | Ilustración de sí mismo y de su espacio de trabajo |
| Diogo Correia | HTML propio | tsParticles (constelaciones) | Fondo de partículas que se unen con líneas |

## Qué se adapta al CV (propuesta)

1. **Índice con sección activa** (Brittany): en la columna pino, una línea que crece en la sección que se lee. Al pasar sobre una demo, las demás se atenúan.
2. **Mapa de Xalapa con niebla** (OMA y Overworld): todas las demos ocurren en Xalapa. Una vista «Mapa» con:
   - los negocios ficticios (sucursales de Brío y Vértice, Cotejo, Ladera, Patio 12);
   - los lugares reales de Ian (CECyTEV, IVES, ITSX).

   Sería un SVG propio con datos de OpenStreetMap, sin Mapbox. En escritorio podría llevar una capa de niebla con un shader ligero (como las cáusticas de Umbral), y la lista y el mapa se cambiarían desde la URL.
3. **«Ver como consulta»** (Adham, en clave de datos): el CV como resultado de una consulta SQL sobre los mismos datos (`cv.js`). La transición entre «página» y «tabla» se suavizaría igual que la cara de Adham.
4. **Transiciones conectadas** (Dennis, con View Transitions en lugar de Barba): la muestra de color de la demo se expande hasta llenar la pantalla. Botones con un leve efecto magnético y `prefers-reduced-motion` respetado.
5. **Línea de tiempo a escala** (Visual Cinnamon): de 2018 a 2028, con fechas reales y sin porcentajes inventados.
6. **Menú de comandos** (Paco): Ctrl o ⌘ + K para ir a una demo, una sección, el PDF o el contacto.
7. **Versiones anteriores** (Brittany): conservar la portada de agosto de 2026 como «v1» y enlazarla desde el pie.
8. **Cuadrícula que responde al cursor** en vez del resplandor de Brittany, porque las manchas de luz están vigiladas.
9. **Letrero gigante en cinta** (Niccolò, Sonar y Dennis): el nombre o «Xalapa» corriendo al bajar. Usarlo con medida, porque es un recurso muy visto.

## Descartado o aplazado

- **Desplazamiento suavizado** (Lenis o Locomotive): choca con las tres columnas de desplazamiento propio y con la accesibilidad.
- **Pantalla de carga** (Brittany v4, Overworld): empeora la carga y no aporta a un CV.
- **Sonido de interfaz** (Sonar y Overworld): la Revista ya lo trabaja. En el CV solo tendría sentido con la elección explícita de «entrar con sonido».
- **Escena 3D completa** (Active Theory, Overworld): aplazada según la sección 13 del Sitio Profesional. Solo cabe la versión ligera del punto 2.
- **Partículas** (Diogo): recurso muy visto, sin relación con el contenido.
