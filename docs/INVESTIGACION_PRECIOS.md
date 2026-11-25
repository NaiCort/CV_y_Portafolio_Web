# Investigación de precios: junior y senior (V4.9.4)

25 de noviembre de 2026. Pedido de Ian: investigar a fondo los precios de cada servicio del cotizador, incluidos los que estaban como «en la propuesta», con precios junior y senior. Con eso se ajustan los precios actuales, y cuando estén los tres proyectos reales con testimonio se sube de nivel.

**Advertencia sobre las fuentes.** Casi todas son blogs de agencias, plataformas o freelancers que venden esos servicios, o calculadoras comerciales. Los rangos son orientativos, no un estudio de mercado; por eso se toman los puntos donde varias fuentes coinciden.

## 1. Tarifa por hora

| Región | Junior | Intermedio | Senior | Fuentes |
| --- | --- | --- | --- | --- |
| **México (MXN)** | 250–700, lo más citado 250–450 | 350–900 | 1,000–1,800, hasta 3,000 en especialidades | Freelance México, Universe Page, Falctec, Vivir de Freelance |
| **Resto de América (USD)** | 15–40 en Latinoamérica; 40–60 en EE. UU. | 35–60 en Latinoamérica; 60–100 en EE. UU. | 45–90 en Latinoamérica; 100–160 en EE. UU. | Upwork (mediana 30), Freelancedesk, Axonbuild, Index.dev |
| **Europa (EUR)** | 22 (España, Malt: 175 €/día) – 55 (Alemania) | 30–60 | 36–80 en España; 90–130 en Alemania | Malt vía daily-rate.eu, Solohourly, Fratch |

Además:
- **Por ciudad:** en México, CDMX y Monterrey cobran entre 20 y 30 % más que Guadalajara, Mérida o Puebla. Xalapa está en el grupo de menor costo.
- **Tarifa freelance frente a salario:** la tarifa freelance suele ser 2.5 a 3 veces el salario por hora de un empleado, porque cubre prestaciones, impuestos y tiempo no facturable.
- **Plataforma frente a cliente directo:** en Upwork las medianas son más bajas (30 USD) que con clientes directos.

## 2. Precio por tipo de sitio (México)

| Tipo | Freelance | Agencia | Rango más citado |
| --- | --- | --- | --- |
| Landing | 1,500–15,000 | 15,000–25,000 | 8,000–20,000 profesional |
| Varias páginas (corporativo) | 5,000–25,000 | 15,900–60,000 | 12,000–35,000 |
| Tienda o sistema | desde 12,000 (con plataforma) | 25,000–150,000 | 20,000–80,000 |
| Proyecto a medida (portales, integraciones) | — | desde 150,000 | — |

Varias agencias cotizan «más IVA»; la ley pide mostrar el total con impuestos al consumidor (ver `INVESTIGACION_COTIZADOR.md`, sección 5).

**Cómo queda el cotizador (V4.9.3, con lanzamiento e IVA):**
- landing desde 4,304; Psicólogo, de 8,607 a 26,065;
- varias páginas desde 6,821; Patio 12, de 13,398 a 30,044;
- tienda desde 20,868; Brío, de 27,852 a 53,592.

Está en la parte baja del rango freelance, lo que corresponde a un perfil junior con descuento de lanzamiento.

## 3. Funciones con precio de mercado

| Función | Mercado (freelance) | Antes en el cotizador | Ajuste |
| --- | --- | --- | --- |
| Inicio de sesión y cuentas | 1,000–3,500 USD; 1,500–4,000 registro y perfiles | 16–24 h (unos 600 USD) | **20–30 h** |
| Cobro en línea (Stripe o Mercado Pago) | 500–2,000 USD en freelance; 2,000–8,000 en agencia | 10–16 h | **12–20 h** (pruebas, avisos de pago y devoluciones) |
| Panel de administración | 2,000–4,000 USD | 20–30 h | **30–45 h** |
| Reservas con disponibilidad | sitio con reservas, pagos y cuentas: 10,000–30,000 USD | 10–14 h | **12–18 h** |
| Sitio en dos idiomas | +25–40 % del total; 500–2,000 USD | +30 % | Sin cambio. Ian traduce español-inglés (experiencia en Fiverr) |

Las comisiones de las pasarelas las paga el negocio aparte: Mercado Pago cobra alrededor de 3.79 % + IVA + 4 MXN por venta; Pago Nube, 5.5 % + IVA.

## 4. IA y automatización (antes «en la propuesta»)

| Servicio | Mercado | Nuevo en el cotizador |
| --- | --- | --- |
| **Asistente de WhatsApp con IA** | México, pyme: implementación de 7,000–36,000 MXN; operación de 3,000–4,500 MXN al mes con IA, o 300–1,500 al mes solo la API. Mensajes de Meta: los primeros 1,000 al mes gratis y después unos 0.16 MXN cada uno | **20–30 h** de configuración, conexión con la agenda o el catálogo y pruebas. El uso de la plataforma y de Meta lo paga el negocio directamente |
| **Asistente de preguntas en el sitio** | Freelance: 500–2,500 USD (1 a 2 semanas); entrenado con el contenido del negocio: 1,500–20,000 USD; uso mensual de 40–450 USD | **12–20 h**. El uso de la IA se paga aparte (desde unos pocos dólares al mes con poco tráfico) |
| **Documentos automáticos** (cotizaciones y contratos desde un formulario) | Herramientas de 0–49 USD por usuario al mes; los proyectos a medida rara vez publican precio | **12–20 h**, sobre el motor DOCX y PDF que Ian ya hizo en el Servicio Social |
| **Lectura de facturas o formularios** | OCR en la nube: unos 1.50 USD por 1,000 páginas (básico) o 30 USD por 1,000 (formularios); herramientas de 0.03–0.50 USD por documento | **16–24 h**. El servicio de lectura se paga aparte por documento |
| **Diagnóstico de automatización** (estaba en la sección 20.1, pero no en el catálogo) | Llamada de 60 min desde 150 USD; diagnóstico con informe de 350–2,000 USD; consultoría de 100–350 USD por hora | **Nueva función: 3–5 h** (sesión de 60 a 90 minutos e informe con lo que conviene automatizar y en qué orden) |

## 5. Extras y contenido

| Servicio | Mercado | Ajuste |
| --- | --- | --- |
| **Redacción de textos** | México, por página: inicio 3,000–10,000 MXN y servicios 5,000–12,000. EE. UU.: 60–300 USD por página (WebFX) o 150–600 en freelance | **Por página: 2–4 h cada una** (antes 4–8 h por todo el sitio, muy por debajo del mercado) |
| **Logotipo** | México: 4,000–28,000 MXN; freelance en EE. UU.: 300–800 USD | Sin cambio (8–12 h): Ian no es diseñador gráfico. Queda en la parte baja y como apoyo |
| **Fotografías o imágenes** | Licencias de banco, muy variables | Sin cambio (4–8 h de búsqueda, recorte y optimización) |

## 6. Mantenimiento y urgencia

**Mantenimiento:**
- México: planes de 1,800 a 14,000 MXN al mes, lo más habitual entre 3,000 y 10,000; hora de cambios a 400–600 MXN.
- EE. UU.: Basic de 50–150 USD (0 a 1 h) y Standard de 150–500 USD (1 a 3 h).
- **Sin cambio:** los planes del cotizador (400, 1,200, 2,200 y 4,000 MXN; 25 a 279 USD) quedan por debajo o en la parte baja del mercado, como corresponde a un perfil junior.

**Urgencia:**
- recargo habitual del 25 al 50 %; del 75 al 100 % para plazos extremos;
- la entrega prioritaria (+30 %, alrededor de la mitad del tiempo) está en el rango y no cambia;
- la exprés (alrededor de una cuarta parte del tiempo) sube de +60 % a **+75 %**, el piso de los plazos extremos.

## 7. Niveles de tarifa

Se guardan los tres niveles en `src/data/catalogo.js` (`NIVELES`). El cotizador usa el nivel actual:

| Nivel | Cuándo | MXN/h | USD/h | EUR/h | Mínimo |
| --- | --- | --- | --- | --- | --- |
| **Junior** (actual) | Ahora | 400 | 30 | 28 | 3,500 MXN · 300 USD · 280 EUR |
| **Intermedio** | Tras 3 a 5 proyectos reales con testimonio (sección 22.1) | 550 | 40 | 38 | 5,000 MXN · 400 USD · 380 EUR |
| **Senior** (referencia) | Con 5 años o más de experiencia | 1,000 | 75 | 70 | 10,000 MXN · 800 USD · 750 EUR |

La tarifa junior se mantiene porque está dentro del rango junior de las tres regiones. Con el descuento de lanzamiento, el precio efectivo es de 280 MXN por hora, en la parte baja del rango junior. Ian debe decidir si conserva el descuento del 30 % o lo baja: es lo que más mueve el precio final.

## Fuentes

- [Freelance México: tarifas 2026](https://freelancemexico.com.mx/consejos-freelancers/cuanto-cobrar-proyectos-freelance-mexico-2026/)
- [Universe Page: tarifa de desarrollador web en México](https://universepage.com.mx/blog/tarifa-desarrollador-web-freelance-mexico)
- [Vivir de Freelance: tarifas por país en Latinoamérica](https://vivirdefreelance.com/es/33-tarifas-freelance-por-pais-latinoamerica-2026/)
- [Falctec: tarifas de desarrolladores web en Latinoamérica](https://falctec.com/blog/cuanto-cobra-un-desarrollador-web-latam-2026)
- [Evariandev: cuánto cuesta una página web en México](https://www.evariandev.com.mx/blog/articulos/cuanto-cuesta-una-pagina-web-en-mexico-guia-de-precios-real-y-sin-letras-chiquitas)
- [Dardo Studio: precios 2026](https://dardo.studio/es/blog/cuanto-cuesta-una-pagina-web-mexico/)
- [Creatupaginaweb: precios 2026](https://creatupaginaweb.mx/cuanto-cuesta-una-pagina-web-en-mexico/)
- [Emproyecta: precio de una página web](https://emproyecta.mx/blog/cuanto-cuesta-una-pagina-web-en-mexico)
- [Varelta: rangos en pesos](https://varelta.com/blog/cuanto-cuesta-una-pagina-web-en-mexico)
- [Index.dev: tarifas por país](https://www.index.dev/blog/freelance-developer-rates)
- [GigRadar: tarifas en Upwork](https://gigradar.io/blog/upwork-hourly-rate)
- [Axonbuild: bandas de tarifas](https://axonbuild.com/blog/freelance-developer-hourly-rates)
- [Freelancedesk: tarifas promedio](https://freelancedesk.online/blog/average-freelance-web-developer-rates-2026)
- [Project Cost Estimator: tarifas y costos por función](https://projectcostestimator.com/feature-cost-breakdown)
- [daily-rate.eu: tarifas diarias en la UE](https://daily-rate.eu/professions/software-developer/)
- [Fratch: Alemania](https://fratch.io/en/role/web-developer/germany/rate-benchmark)
- [Solohourly: Alemania](https://solohourly.com/rates/web-developer-rates-in-germany)
- [Technologia: chatbot de WhatsApp en México](https://technologia.com.mx/cuanto-cuesta-un-chatbot-de-whatsapp)
- [Kosmo: chatbot de WhatsApp](https://kosmo.com.mx/blog/chatbot-whatsapp-precio-mexico)
- [Uniamos: chatbot con IA en México](https://uniamos.com/blog/cuanto-cuesta-chatbot-ia-mexico-2026)
- [Clap Digital: chatbot para pequeñas empresas](https://clapdigital.co/blog/ai-chatbot-cost-small-business)
- [Denser: costo de un chatbot](https://denser.ai/blog/how-much-chatbot-cost/)
- [Pixel Management: costos de desarrollo 2026](https://pixel.management/en/blog/website-development-costs-2026)
- [Daigency: sitios con reservas](https://daigency.com/how-much-does-a-travel-website-development-cost/)
- [Mercado Pago: checkout](https://www.mercadopago.com.mx/herramientas-para-vender/check-out?code=homemp)
- [Tiendanube: pasarelas de pago en México](https://www.tiendanube.com/mx/blog/pasarelas-de-pago-mexico)
- [Soceton: precios de OCR](https://soceton.com/blogs/document-ai-ocr-pricing-comparison)
- [Heyneuron: automatización de documentos](https://heyneuron.com/en/blog/document-workflow-automation-for-small-business)
- [Krater: consultoría de automatización](https://krater.ai/blog/ai-automation-consulting)
- [Contra: llamada de diagnóstico de 60 minutos](https://contra.com/s/YsoEWA6M-ai-automation-audit-call-60-minutes)
- [Ryan Doser: costo de un consultor de IA](https://ryandoser.com/ai-consultant-cost/)
- [Cronoshare: logotipo](https://www.cronoshare.com.mx/cuanto-cuesta/diseno-logotipo)
- [ManyPixels: logotipo](https://www.manypixels.co/blog/brand-design/logo-design-cost-guide)
- [goLance: tarifas de diseñadores de logotipo](https://golance.com/hiring/best-freelance-logo-designers-hourly-rate)
- [Cronoshare: copywriting](https://www.cronoshare.com.mx/cuanto-cuesta/copywriting)
- [WebFX: redacción web](https://www.webfx.com/website-copywriter-pricing.html)
- [NewMedia: tarifas de copywriting](https://newmedia.com/blog/copywriting-rates)
- [Cronoshare: mantenimiento web](https://www.cronoshare.com.mx/cuanto-cuesta/mantener-pagina-web)
- [UENI: mantenimiento para pequeñas empresas](https://ueni.com/blog/website-maintenance-cost/)
- [FatLab: paquetes de mantenimiento](https://fatlabwebsupport.com/blog/website-maintenance/website-maintenance-packages-compared-your-complete-buyers-guide/)
- [InvoiceQuickly: trabajos urgentes](https://invoicequickly.com/blog/invoice-for-rush-work)
- [Freelancermap: recargos por urgencia](https://www.freelancermap.com/freelancer-tips/12384-how-to-use-freelance-rush-fees)
- [Cronoshare: traducción](https://www.cronoshare.com.mx/cuanto-cuesta/traduccion)
