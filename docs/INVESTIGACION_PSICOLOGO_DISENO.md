# Investigación: diseño visual del sitio de un psicólogo (V4.10.1)

25 de noviembre de 2026. Pedido de Ian antes de las maquetas: qué diseño visual puede o debe llevar el sitio de un psicólogo (color, tipografía, fotografía, adornos y animaciones). Completa `INVESTIGACION_PSICOLOGO_2.md` (contenido, ley y ética). Decisión de Ian: **las tres direcciones de la sección 9 se construyen como temas intercambiables**, aunque tengan estructura distinta.

**Sobre las fuentes:**
- Casi todo viene de agencias y plataformas para terapeutas, y de guías de accesibilidad.
- Lo único con estudios revisados por pares es el efecto de las imágenes de naturaleza.
- Las páginas de Awwwards (los sitios premiados de terapia) están bloqueadas en la red de esta sesión: de ellas solo hay nombre, premio y fecha.

## 1. Principio: diseño para alguien que puede llegar con estrés

La guía de diseño informado por el trauma es la base, y conviene a todos los visitantes:
- **Calma:** paleta contenida, tipografía legible, espacio y nada que compita por la atención.
- **Predictibilidad:**
  - estructura clara y sin sorpresas;
  - la navegación siempre en el mismo lugar;
  - nada que aparezca de golpe (ni ventanas emergentes, ni chat que se abre solo, ni sonido).
- **Control en manos del visitante:**
  - el movimiento lo inicia él;
  - cualquier cosa que se mueva sola se puede pausar;
  - se puede salir de un flujo en cualquier paso.
- **Una sola acción principal,** con un botón de alto contraste repetido al final de las secciones clave, y sin presión: nada de contadores, urgencias («quedan 2 lugares») ni descuentos que caducan.

## 2. Color

- **Lo que coincide entre fuentes:**
  - tonos apagados, de baja saturación (salvia, azul suave, neutros cálidos), sobre un **blanco roto cálido**, no blanco puro;
  - el rojo intenso, el amarillo brillante y el blanco puro sobreestimulan.
- **Evidencia real** (Michels y colegas, 2021, con 81 personas ante una prueba de estrés): **lo que calma es el contenido de naturaleza**, no el verde por sí solo; el verde sin naturaleza no bastó. Una revisión encontró que los paisajes con agua o costa se perciben aún más restauradores que los verdes. Por eso es mejor **mostrar naturaleza** (ventana, plantas, agua, niebla) que pintar todo de verde.
- **Mitos a no usar:** «el turquesa para la ansiedad» o «el gris para la depresión» no tienen respaldo.
- **Tendencias 2026:** Warm Eucalyptus (Valspar) y Cloud Dancer, el blanco del año de Pantone. Encajan con la dirección de neutros tranquilos.
- **Regla:** el contraste AA no se negocia por la calma (texto de 4.5:1 como mínimo); los tonos suaves van en fondos y adornos, no en el texto.

## 3. Tipografía

- **Cuerpo de texto:** 18 px (un punto medio cómodo entre 16 y 20 px) e interlineado de 1.5 a 1.7.
- **Ancho de línea:** de 45 a 75 caracteres; 66 caracteres como punto de partida.
- **Serif o sans en el texto largo:** la serif da más pistas de la forma de las palabras para leer de corrido; la sans necesita algo más de interlineado. Cualquiera sirve si se respeta lo anterior.
- **Pesos:** sin pesos muy delgados en texto, que bajan el contraste.
- **Sin Inter** (patrón vigilado).
- **Títulos con voz propia,** pero sin la cursiva como acento (patrón vigilado).

## 4. Fotografía

- **Real antes que de banco:** la foto de banco en la biografía es la falla de confianza que más se repite. Para un cliente real, recomendamos sesión de fotos de la psicóloga y del consultorio, con luz natural y fondo sencillo, donde la cara y la expresión manden. En la demo, las fotos son ilustrativas y lo dicen.
- **Naturaleza como contenido** (sección 2): la ventana del consultorio, plantas, la niebla de Xalapa. Calma y además da sentido de lugar.
- **Clichés que se evitan:**
  - flores de loto, árboles y personas abstractas abrazándose como íconos;
  - manos con pañuelos o cabezas entre las manos;
  - cualquier imagen que refuerce el estigma.
- **Lo que sí funciona:** imágenes que hablen del tipo de trabajo. Por ejemplo, una banca a la sombra o una mesa con dos tazas para la terapia de pareja, en vez de una oficina genérica.

## 5. Adornos

- **Formas orgánicas:** máscaras curvas entre secciones, esquinas suaves y fotos descentradas. Las agencias las recomiendan para bienestar y las desaconsejan para sectores médicos formales. En un tema sobrio conviene usarlas poco.
- **Elementos a mano** (trazos, subrayados, pequeñas ilustraciones de línea) en lugar de íconos de catálogo. Un solo estilo de ilustración por tema.
- **Textura de papel muy tenue:** da calidez sin ruido. Nunca detrás de texto pequeño.
- **Límite:** la regla de conteo del proyecto (uno o dos patrones vigilados por pantalla). Nada detrás del texto que baje el contraste, y nada de manchas de luz flotando.

## 6. Animación

- **Riesgos:**
  - el movimiento grande o inesperado causa mareo y náusea a personas con trastornos vestibulares;
  - el **parallax** es el detonante más citado;
  - el desplazamiento secuestrado (scroll-jacking) también se evita.
- **Movimiento reducido:**
  - con `prefers-reduced-motion`, los desplazamientos, acercamientos y parallax pasan a fundidos;
  - también hay que revisar lo que mueve JavaScript (con `matchMedia`);
  - quitar todo hace que la interfaz se sienta rota, así que se dejan transiciones cortas de opacidad y color.
- **Pausa:** lo que se mueve solo más de 5 segundos debe poder pausarse o detenerse (WCAG 2.2.2).
- **Ritmo:**
  - las entradas y respuestas de la interfaz siguen la regla del proyecto: de salida suave, 200 a 300 ms y desde escala 0.95;
  - lo lento y largo (Headspace usa exhalaciones de 6 segundos) solo cabe en algo que el visitante **pide**, como un ejercicio de respiración.
- **Idea con sentido: «Respira conmigo».**
  - un ejercicio corto (por ejemplo, 4 segundos para inhalar y 6 para exhalar) que el visitante inicia y detiene;
  - con movimiento reducido, solo texto y conteo;
  - aclara que no sustituye la terapia;
  - es psicoeducación, no diagnóstico, así que no entra en la decisión de no hacer autoevaluaciones;
  - da algo útil en la primera visita y muestra el enfoque de la psicóloga.
- **Microinteracciones:** botones y enlaces que responden con calidez (un cambio de tono, nunca un salto), foco visible y temático, y una confirmación clara al enviar.

## 7. Seguridad y privacidad visibles

- **Botón «Salir de esta página»:**
  - es habitual en sitios sobre violencia familiar: lleva a un sitio neutro y queda fijo en todas las pantallas, aunque no borra el historial;
  - se recomienda no llamarlo «rápido», sino «Salir de esta página»;
  - en un consultorio general es opcional; tiene sentido si la psicóloga atiende violencia o trauma.

  **Para la demo:** se incluye en el tema que trate trauma, con su nota de que no borra el historial.
- **Qué pasa con los datos,** dicho junto al formulario y sin letra pequeña.
- **La ayuda en crisis** como pieza de diseño propia, tranquila pero imposible de perder; nunca un aviso rojo alarmante.

## 8. Ejemplos de referencia

- **Premiados en Awwwards:** Maxima Therapy (Sitio del Día, 7 de abril de 2026), Twofold Therapy (Mención Honorífica, 2 de agosto de 2026) y Therapy in London (Mención Honorífica, 10 de enero de 2025). No se pudieron revisar en esta sesión, porque la red bloquea Awwwards. Ian puede abrirlos si quiere compararlos con las maquetas.
- **Lo que repiten las reseñas de sitios de terapeutas** (SimplePractice, Bigapple, Cyberoptik): una navegación limpia con un botón de alto contraste, un mismo color en logotipo, cabecera y fondos, versión móvil impecable y un primer paso de poco compromiso.

## 9. Tres direcciones para las maquetas

Ian decidió construir las tres como temas intercambiables:

| Dirección | Idea | Paleta | Tipografía | Adornos y movimiento |
| --- | --- | --- | --- | --- |
| **Sala con luz** | Cálida y editorial: un consultorio con luz de tarde. | Blanco roto cálido, arcilla como acento, olivo profundo en el texto | Serif de títulos con carácter (sin cursiva de acento) + sans humanista | Papel tenue, fotos con esquinas orgánicas, «Respira conmigo» como un círculo que se llena |
| **Neblina** | Serena y local: la niebla de Xalapa. | Gris azulado claro, tinta azul profunda, un acento azul lago apagado | Sans de líneas limpias + serif de lectura | Fotos de paisaje en niebla, líneas de contorno muy finas, fundidos lentos solo a petición |
| **Cuaderno** | Cercana y a mano: la libreta del terapeuta. | Papel crema, grafito, un acento ocre | Serif de texto + letra a mano solo en anotaciones | Subrayados y ilustraciones de línea a mano, notas al margen; movimiento casi nulo |

En las tres:
- la ayuda en crisis como pieza propia;
- el contenido de `INVESTIGACION_PSICOLOGO_2.md`;
- una acción principal («Agenda una llamada de 15 minutos»);
- máximo uno o dos patrones vigilados.

## Fuentes

- [High Five Design: paletas para sitios de terapia](https://www.highfivedesign.co/blog/captivating-color-palettes-for-therapy-websites)
- [Psyche Creative: 12 paletas para terapeutas](https://www.psychecreative.co.uk/blog/best-colours-for-therapist-websites)
- [Wellness by Dezign: colores 2026](https://www.wellnessbydezign.com/blog-2/spp8fwxfzsamxnm7p48arbgbpzflr5)
- [Coloracci: color en clínicas de salud mental](https://coloracci.ai/blog/mental-health-clinic-color-psychology-design)
- [Pabau: tabla de colores (con advertencias)](https://pabau.com/templates/mental-health-color-chart/)
- [Michels y colegas: color frente a contenido de naturaleza (FAO Agris)](https://agris.fao.org/search/en/records/65df48b263b8185d9cac0cd3)
- [Frontiers: imágenes de naturaleza y restauración](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2014.00548/full)
- [PMC: entornos azules y restauración](https://pmc.ncbi.nlm.nih.gov/articles/PMC7500282)
- [UXPin: largo de línea óptimo](https://www.uxpin.com/studio/blog/optimal-line-length-for-readability/)
- [Web Style Guide: legibilidad](https://www.webstyleguide.com/wsg3/8-typography/3-legibility.html)
- [Calvin University: lectura sobre tipografía](https://cs.calvin.edu/courses/cs/300hci/24fa/assets/readings/typography/)
- [Nopio: diseño de sitios de salud mental](https://www.nopio.com/blog/mental-health-website-design/)
- [Gapsy Studio: buenas prácticas en salud mental](https://gapsystudio.com/blog/mental-health-website-design/)
- [Bethany Works: diseño para terapeutas de trauma](https://bethanyworks.com/trauma-therapist-website-design/)
- [A Mindful Web: diseño informado por el trauma (ResearchGate)](https://www.researchgate.net/publication/380818232_A_Mindful_Web_An_Education_on_Trauma-Informed_Design_for_Web_Designers)
- [Smply Studio: tendencias 2026 para bienestar](https://smply.studio/2026-web-design-trends-wellness/)
- [Lemon and the Sea: predicciones 2026](https://www.lemonandthesea.com/elevate-your-practice/my-healthcare-website-predictions-for-2026)
- [Wellness Web Design: tendencias](https://wellnesswebdesign.co.uk/modern-website-design-trends-uk/)
- [A11yPath: movimiento accesible](https://a11ypath.com/guides/motion-and-animation/)
- [AllyWay: trastornos vestibulares](https://allyway.io/reducing-motion-designing-for-vestibular-disorders-2)
- [WebKit: diseño responsivo para el movimiento](https://webkit.org/blog/7551/responsive-design-for-motion/)
- [Curso ESDC: animación y movimiento](https://bati-itao.github.io/learning/esdc-self-paced-web-accessibility-course/module9/animation-motion.html)
- [Estudio de diseño de Headspace](https://blakecrosley.com/guides/design/headspace)
- [DEV: app interactiva de respiración](https://dev.to/learncomputer/calm-in-code-building-an-interactive-breathing-exercise-web-app-4433)
- [Welldoing: la foto del terapeuta](https://welldoing.org/article/promoting-yourself-therapist-your-photo-matters)
- [SimplePractice: marca auténtica de terapia](https://simplepractice.com/blog/authentic-therapy-branding)
- [Beacon: fotos reales frente a fotos de banco](https://www.beaconmm.com/real-staff-photos-vs-stock-behavioral-health/)
- [High Five Design: fotos para terapeutas](https://highfivedesignco.squarespace.com/blog/therapist-website-photos)
- [Medium: el botón «Salir de esta página»](https://medium.com/the-trauma-informed-design-blog/a-deep-dive-in-the-exit-this-page-button-39f991553930)
- [TechSafety: salir del sitio](https://techsafety.org/exit-from-this-website-quickly)
- [SafeLives: seguridad del sitio](https://safelives.org.uk/all-policies/website-safety)
- [Awwwards: Maxima Therapy](https://www.awwwards.com/sites/maxima-therapy)
- [Awwwards: Twofold Therapy](https://www.awwwards.com/sites/twofold-therapy)
- [Awwwards: Therapy in London](https://www.awwwards.com/sites/therapy-in-london)
- [SimplePractice: mejores sitios de terapeutas](https://www.simplepractice.com/blog/top-therapist-websites/)
