# Investigación para el cotizador (V4.9)

25 de noviembre de 2026. Parte de las secciones 7 a 11 y 18 a 29 del Sitio Profesional Integral V1.4, de las decisiones de Ian del mismo día (ver `PLAN_V4.8.md`) y de una revisión de cómo contratan Fiverr y los configuradores de precio, qué pide la ley mexicana al mostrar precios y qué hace accesible un configurador. Termina con un primer catálogo de funciones, tomado de lo que las siete demos ya hacen.

## 1. Lo que ya está decidido

- **Una sola página en `/cotizador`** que es a la vez la página de servicios: quien la visita ve lo que ofrece Ian y va calculando su precio.
- **Cuatro categorías lado a lado:**
  - Personalizado (todo el catálogo; solo se bloquean las funciones que se excluyen entre sí, con aviso);
  - Landing;
  - Sitio de varias páginas;
  - Sitio con tienda o sistema.

  Cada una tiene un **núcleo** que no se puede retirar. Todas comparten el **núcleo técnico global**: diseño adaptable, HTTPS y dominio, metadatos, accesibilidad básica, un contacto real y aviso de privacidad si se recogen datos.
- **Flujo por acciones:** «Elige tipo → Ajusta funciones → Envía», sin números grandes.
- **Desde una demo:** el botón «Contratar un sitio como este» entra al segundo paso con la demo precargada, en versión esencial, recomendada o completa.
- **Estados de una función:**
  - núcleo («incluido siempre»);
  - incluida y retirable;
  - opcional.
- **Reglas entre funciones:**
  - aditiva;
  - tipo de sitio;
  - dependencia;
  - exclusión.

  Nada se retira en silencio: se avisa y se ofrece «Deshacer». Si una función cambia la categoría, se pide confirmación.
- **Sin servidor en V4.9:** el precio se calcula en el navegador y la solicitud sale por WhatsApp o correo con folio y el detalle. El envío pasa por una sola función para que después la sustituya el backend real.
- **Precios propuestos** (sección 22), en un archivo de datos y sin decidir todavía:
  - 400 MXN/h, 30 USD/h y 28 EUR/h;
  - mínimo de 3,500 MXN, 300 USD o 280 EUR;
  - lanzamiento con 30 % de descuento;
  - entrega prioritaria con +30 % y exprés con +60 %;
  - cuatro planes de mantenimiento.

## 2. Fiverr: qué conviene copiar y qué no

Lo que hace Fiverr con sus paquetes:
- Muestra los tres paquetes (básico, estándar y prémium) **al mismo tiempo**, y el comprador los compara antes de decidir.
- En algunas categorías obliga a un **alcance mínimo** por paquete para que se puedan comparar.
- Cada paquete fija alcance, revisiones, tiempo y extras; la **entrega urgente** es un extra.
- Las guías de vendedores repiten dos ideas:
  - **el paquete básico debe cumplir lo que promete el título** del servicio;
  - la proporción de precios suele rondar 1 : 2 : 3.5.

Qué tomamos:
- La comparación lado a lado. Ya está decidida para las cuatro categorías.
- **Esencial, recomendada y completa** al llegar desde una demo. Es el mismo patrón de tres niveles, pero sobre una demo real.
- La urgencia como extra (prioritaria y exprés).
- La regla de que lo esencial cumpla lo que promete el nombre: la versión esencial de una demo debe seguir pareciéndose a la demo.

En qué nos distinguimos:
- El cliente no queda atado a tres paquetes fijos: puede retirar y añadir funciones una por una, viendo el efecto en precio y tiempo.
- No hay tabla de precios de plantilla ni etiqueta «Más popular» (sección 30.1).
- No se cobra comisión de plataforma.

## 3. Configuradores de precio: lo que funciona

- **El total siempre a la vista.** En configuradores largos, el total se queda fuera de la pantalla al bajar (Baymard, guía 3105). Hace falta un resumen fijo en escritorio y una barra inferior en el celular.
- **Precio de cada opción junto a la opción.** Si se ocultan los precios de cada opción y extra, el usuario no puede comparar (Baymard, guía 3108). Cada función muestra lo que suma («+1,200») y, si viene incluida, lo que ahorraría al quitarla.
- **Precio desde el principio.** Si el precio aparece solo al final, sorprende. Por eso cada categoría muestra su «desde» y su «completo» antes de entrar.
- **Explicar la cifra, no solo darla.** El resumen desglosa:
  - funciones con sus horas;
  - mínimo del proyecto;
  - descuento de lanzamiento;
  - urgencia;
  - impuestos;
  - mensualidad aparte.
- **Rangos donde no hay exactitud.** El tiempo se da en días hábiles como rango. Lo que necesita evaluación manual (por ejemplo, migrar contenido o integrar un sistema del cliente) se marca «se cotiza en la propuesta» y no suma un número inventado.
- **Decir los supuestos:**
  - el plazo cuenta desde el anticipo y los materiales;
  - el precio es orientativo y vale 15 días;
  - no se cobra nada al enviar.

## 4. Accesibilidad del configurador

- **Grupos:** cada grupo de funciones (Estructura, Contenido, Interacción, Ventas y Servicio) va en un `fieldset` con su `legend`.
- **Controles:**
  - las funciones son casillas;
  - la categoría y la moneda son botones de opción;
  - las funciones de núcleo se muestran marcadas y deshabilitadas, con la razón en texto («incluido siempre en una landing»), no solo en el color.
- **Total anunciado:** una región `aria-live="polite"` con `aria-atomic="true"` lee la frase completa («Total: 9,800 MXN, de 8 a 11 días hábiles»), no solo el número. Hay informes de que VoiceOver en iOS a veces no anuncia el cambio; Ian no usa iOS, pero la frase debe quedar también en el resumen visible.
- **Retiros automáticos:**
  - cuando una regla retira otra función (por ejemplo, quitar el carrito retira el seguimiento), el aviso va en la misma región e incluye «Deshacer» como botón real, alcanzable con el teclado;
  - el aviso no desaparece solo mientras tiene el foco.
- **Confirmar un cambio de categoría:** con el diálogo accesible que ya existe (`Modal`), con el foco atrapado y regreso al control que lo abrió.
- **Movimiento:** el total cambia con un conteo corto (200 a 300 ms, de salida suave) y, con movimiento reducido, solo se reemplaza.

## 5. Precios y ley en México

- **Monto total visible (LFPC, artículo 7 Bis):** el proveedor debe informar de forma notoria el **monto total a pagar**, con impuestos, y las multas pueden llegar a unos 2.3 millones de pesos (artículo 127). Para clientes en México, el cotizador debe mostrar el **total con IVA** y el desglose (subtotal e IVA). Mostrar solo «más IVA» no basta para un consumidor.
- **Presupuesto por escrito (LFPC, artículo 59, en servicios):** la propuesta confirmada que Ian envía después debe describir el servicio y su costo. El cotizador es una estimación que lo antecede, no el presupuesto mismo; por eso el aviso «Esto no genera ningún cobro. Revisaré tu solicitud y te enviaré una propuesta confirmada».
- **Retenciones a empresas:** si Ian factura como persona física en RESICO y el cliente es una persona moral, esta le retiene 1.25 % de ISR sobre el subtotal. Varias fuentes añaden la retención de dos terceras partes del IVA. No cambia el precio de la cotización, pero sí lo que Ian recibe. Basta una nota en la propuesta, no en el cotizador.
- **Fuera de México:** «precio sin impuestos; se confirman en la propuesta», hasta revisarlo con un contador (sección 22.2).

**Pendiente para Ian y un contador:** régimen fiscal con el que facturará, si cobrará IVA (en RESICO sí se traslada) y si los precios regionales se publican antes o después de impuestos. Mientras tanto, el cotizador calcula el IVA del 16 % sobre los precios de México y lo muestra aparte.

## 6. Primer catálogo de funciones

Tomado de lo que las demos hacen. Las **horas son una primera estimación** y se sustituirán por tiempos medidos (sección 20). El precio de cada función es horas × tarifa, redondeado. Las funciones de demos que hoy están **simuladas** (cuentas, pagos) se ofrecen en su versión real dentro de «Sitio con tienda o sistema», porque requieren servidor.

**Columnas de las tablas:**
- **L:** Landing.
- **V:** Sitio de varias páginas.
- **T:** Sitio con tienda o sistema.

**Estados:**
- **N:** núcleo.
- **I:** incluida y retirable.
- **O:** opcional.
- **—:** no disponible.

### Estructura

| Función | Qué es | Demo | Horas | L | V | T |
| --- | --- | --- | --- | --- | --- | --- |
| `una-pagina` | Sitio de una sola página con secciones | Psicólogo | 10–14 | N | — | — |
| `paginas` | Páginas independientes con menú entre ellas y página de «no encontrado» (incluye 4) | Todas las demás | 16–22 | — | N | N |
| `pagina-extra` | Cada página adicional | Todas | 3–5 c/u | — | O | O |
| `temas` | Varias apariencias que el visitante puede alternar | Psicólogo, Brío, Taller | 8–12 c/u | O | O | O |
| `sucursales` | Varias sucursales con su página y horario (excluye «una sola sucursal») | Patio 12, Brío, Vértice | 8–12 | — | O | I |
| `dos-idiomas` | Sitio en español e inglés | (sección 25) | +30 % | O | O | O |

### Contenido

| Función | Qué es | Demo | Horas | L | V | T |
| --- | --- | --- | --- | --- | --- | --- |
| `carta` | Carta o lista de productos y servicios con precios y filtros | Patio 12, Ladera, Taller | 6–10 | O | I | I |
| `galeria` | Galería de fotos con ampliación táctil | Patio 12, Umbral | 4–6 | O | I | I |
| `mapa` | Ubicación con mapa y cómo llegar | Ladera, Taller, Brío | 3–5 | I | I | I |
| `equipo` | Perfiles del equipo (coaches, autores, contadora) | Brío, Prisma, Cotejo | 4–6 | O | I | I |
| `preguntas` | Preguntas frecuentes | Cotejo, Brío | 2–4 | O | I | I |
| `opiniones` | Opiniones de clientes (con permiso de publicarlas) | Cotejo | 2–3 | O | O | O |
| `articulos` | Notas o artículos con lectura cómoda | Revista | 10–16 | — | O | O |
| `guias-pdf` | Documentos descargables (PDF accesibles) | Prisma, Cotejo | 3–6 | O | O | O |

### Interacción

| Función | Qué es | Demo | Horas | L | V | T |
| --- | --- | --- | --- | --- | --- | --- |
| `whatsapp` | Botón de WhatsApp con mensaje ya escrito | Todas | 1–2 | I | I | I |
| `formulario` | Formulario de contacto con validación | Psicólogo | 3–5 | I | I | I |
| `citas` | Agenda de citas paso a paso, con confirmación | Psicólogo, Taller | 8–12 | O | I | I |
| `reservas` | Reserva de mesa o de clase con disponibilidad | Patio 12, Brío | 10–14 | O | O | I |
| `calculadora` | Calculadora o herramienta propia del giro | Taller, Cotejo | 6–10 c/u | O | O | O |
| `diagnostico` | Cuestionario que orienta al cliente | Cotejo | 6–8 | O | O | O |
| `busqueda` | Búsqueda dentro del sitio | Prisma | 4–6 | — | O | O |
| `guardados` | Marcadores y guardados del visitante | Revista | 4–6 | — | O | O |
| `comentarios` | Comentarios en notas | Revista | 6–8 (con servidor) | — | O | O |
| `musica` | Música de ambiente con control de volumen | Revista | 2–4 | O | O | O |

### Ventas

| Función | Qué es | Demo | Horas | L | V | T |
| --- | --- | --- | --- | --- | --- | --- |
| `carrito` | Carrito con precio en tiempo real | Patio 12, Ladera, Brío | 10–14 | — | O | N* |
| `pedidos` | Pedido para recoger o a domicilio (requiere carrito) | Patio 12, Ladera | 8–12 | — | O | I |
| `seguimiento` | Seguimiento del pedido (requiere pedidos) | Patio 12 | 6–8 | — | O | I |
| `pago-en-linea` | Cobro real con pasarela (requiere carrito y servidor) | — | 10–16 | — | — | O |
| `planes` | Planes y alta en línea | Brío, Rubor | 8–12 | — | O | I |
| `cotizacion` | Presupuesto con visto bueno por partida | Taller, Cotejo | 8–12 | — | O | I |

\* En «Sitio con tienda o sistema», el núcleo es **carrito** *o* **cuentas de usuario** (sección 18.1): el cliente elige al menos uno.

### Servicio

| Función | Qué es | Demo | Horas | L | V | T |
| --- | --- | --- | --- | --- | --- | --- |
| `privacidad` | Aviso de privacidad propio del sitio | Ladera, Taller, Cotejo | 2–3 | N** | N** | N |
| `cuentas` | Cuentas de usuario con roles y permisos (servidor) | (simulado en Brío, Taller, Rubor) | 16–24 | — | — | N* |
| `area-cliente` | Área del cliente: historial, pases, expediente | Brío, Vértice, Cotejo | 10–16 | — | O | I |
| `panel` | Panel de administración y base de datos | — | 20–30 | — | — | N |
| `recordatorios` | Recordatorios por WhatsApp o correo | Cotejo | 4–8 | O | O | O |

\*\* Solo si el sitio recoge datos personales (formulario, citas, pedidos). Si no, desaparece.

### IA y automatización (sección 20.1)

Asistente de WhatsApp, asistente de preguntas frecuentes, generación de documentos, extracción de datos y diagnóstico de automatización. Se ofrecen en cualquier categoría con horas pendientes de medir; por eso, en V4.9, van como **«se cotiza en la propuesta»**, sin número.

### Contenido del cliente y extras (sección 23.3)

Redacción de textos, fotografías o imágenes con IA, y diseño de logotipo: extras con su precio cuando el cliente no los entrega. Más la entrega prioritaria y exprés, y la mensualidad (cuatro planes).

### Puntos de partida por demo

| Demo | Categoría | Esencial | Recomendada | Completa |
| --- | --- | --- | --- | --- |
| Psicólogo | Landing | núcleo, WhatsApp, formulario, mapa | + citas, preguntas | + temas, recordatorios |
| Patio 12 | Varias páginas | carta, galería, mapa, WhatsApp | + reservas, sucursales | + carrito, pedidos, seguimiento |
| Ladera | Varias páginas | carta, mapa, privacidad | + galería, preguntas | + carrito, pedidos |
| Brío | Tienda o sistema | carrito o cuentas, planes | + reservas, área de cliente, sucursales | + temas, equipo, tienda completa |
| Rosales y Vértice | Varias páginas | carta de precios, citas, mapa | + cotización, calculadora | + área de cliente, temas, sucursales |
| Cotejo | Varias páginas | servicios, preguntas, formulario | + cotización, calculadora, diagnóstico | + área de cliente, recordatorios, guías |
| Revista | Varias páginas | artículos, galería | + búsqueda, guardados, equipo | + planes, comentarios, música |

## 7. Qué sale de aquí para V4.9

1. **Datos:**
   - `src/data/catalogo.js` como fuente única (funciones, categorías, reglas, precios por región, puntos de partida por demo y versión del catálogo);
   - un módulo de cálculo puro (precio, tiempo y reglas) probado con Vitest, que después reutilizará el servidor.
2. **Interfaz en `/cotizador`** con la dirección del CV («Brasa»), por lo que basta una ficha corta: la página es parte del mismo sitio.
3. **Moneda:**
   - por idioma y región del navegador;
   - selector siempre visible y elección recordada;
   - por ahora sin detección por IP, porque no hay servidor.
4. **Folio local:** fecha más un código corto, en el mensaje de WhatsApp o correo, con la configuración en la URL para poder recuperarla.
5. **Sin vista previa:** es la v2 del cotizador (sección 26).

## 8. Respuestas de Ian (25/11/2026)

- **Horas y plazo:** las horas estimadas se usan así mientras no haya tiempos medidos. El plazo se calcula con un máximo de **8 horas al día, solo días hábiles** (parámetro editable en los datos; la sección 21.2 proponía 25 horas facturables a la semana).
- **Impuestos:**
  - el cotizador queda listo desde el principio para personas y para empresas, aunque se empiece con negocios pequeños;
  - siempre se muestra el total con IVA y su desglose;
  - el último paso pregunta si se necesita factura y si el cliente es persona física o empresa, para que la propuesta incluya las retenciones que correspondan;
  - el RFC no se pide en el cotizador;
  - el régimen fiscal lo decide Ian con un contador;
  - la propuesta anotará las condiciones que suelen pedir las empresas grandes (contrato, alta como proveedor, pago a 30 días o más).
- **Diseño:** el cotizador usa la dirección «Brasa» del CV. Las animaciones propias se ven en la fase final del cotizador.

## Fuentes

- [Fiverr: Creating and managing Gig packages](https://help.fiverr.com/hc/en-us/articles/360010559138-Creating-and-managing-Gig-packages)
- [Fiverr Gig Pricing Strategy (2026)](https://eduearnhub.com/fiverr-gig-pricing-strategy/?amp=1)
- [Baymard 3108: Price Transparency of Configuration Options](https://baymard.com/guidelines/3108-price-transparency-of-configuration-options)
- [Baymard 3105: Price Visibility in Complex Configurations](https://baymard.com/guidelines/3105-price-visibility-in-complex-configurations)
- [Shopify: Product configurator](https://www.shopify.com/blog/product-configurator)
- [Insivia: Interactive Pricing Calculators](https://www.insivia.com/interactive-digital-experiences/guide/experience-types/interactive-pricing-calculators/)
- [Dock: What is a pricing calculator?](https://www.dock.us/revenue-archives/pricing-calculators)
- [Smashing Magazine: Designing A Perfect Configurator UX](https://smashingmagazine.com/2018/02/designing-a-perfect-responsive-configurator)
- [Curso de accesibilidad web (ESDC): regiones ARIA live](https://bati-itao.github.io/learning/esdc-self-paced-web-accessibility-course/module11/aria-live.html)
- [WebAIM: anuncio de precio tras cambiar una opción](https://webaim.org/discussion/mail_message?id=41361)
- [Accesibilidad en comercio electrónico (WCAG AA)](https://dev.to/greedy_reader/accessible-e-commerce-why-your-store-needs-wcag-aa-from-day-one-1fk7)
- [LFPC, capítulo II (artículo 7 Bis)](https://mexico.justia.com/federales/leyes/ley-federal-de-proteccion-al-consumidor/capitulo-ii)
- [LFPC consolidada (artículo 59)](https://mley.mx/LFPC/?ley=LFPC)
- [El Imparcial: multas de PROFECO por cargos ocultos](https://www.elimparcial.com/dinero/2025/07/31/alto-a-los-cobros-ocultos-profeco-advierte-multas-de-hasta-2300000-por-cargos-extras-en-tarjetas-o-propinas-forzadas/)
- [Siempre al Día: retención del ISR en RESICO](https://siemprealdia.co/mexico/fiscal/retencion-del-isr-en-el-resico/)
- [El Contribuyente: personas morales retienen a RESICO](https://www.elcontribuyente.mx/2024/07/aviso-personas-morales-deben-retener-impuestos-al-pagar-a-pf-resico/)
- [Vercel: Fair use guidelines (Hobby solo para uso no comercial)](https://vercel.com/docs/limits/fair-use-guidelines)
- [Cloudflare Pages: límites](https://developers.cloudflare.com/pages/platform/limits) y [precios de Functions](https://developers.cloudflare.com/pages/functions/pricing)
