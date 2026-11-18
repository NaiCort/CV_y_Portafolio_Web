// Bloques de confianza de Cotejo (V4.6.6), a partir de docs/INVESTIGACION_DESPACHO_2.md:
// especialidades, opiniones de ejemplo, «Antes de contratarnos» y guías cortas.

// Con quién trabajamos más: Cotejo atiende a todos, pero conoce mejor estos casos.
export const ESPECIALIDADES = [
  {
    quien: "Profesionistas por honorarios",
    ejemplos: "Médicos, dentistas, diseñadores, abogados, arquitectos",
    vemos: "Retenciones de las empresas a las que facturas y si te conviene RESICO.",
  },
  {
    quien: "Ventas en plataformas",
    ejemplos: "Mercado Libre, Amazon, Uber, DiDi, Airbnb",
    vemos: "Lo que te retiene cada plataforma y cuándo ya no tienes que declarar más.",
  },
  {
    quien: "Comercios y restaurantes",
    ejemplos: "Cafeterías, fondas, tiendas, estéticas",
    vemos: "Nómina, IMSS, propinas y la factura global de lo que vendes al público.",
  },
  {
    quien: "Rentas de casas y locales",
    ejemplos: "Una casa, departamentos o locales comerciales",
    vemos: "Deducción ciega del 35 %, retenciones cuando le rentas a una empresa y el predial.",
  },
]

// Opiniones inventadas para la demo; se dice en la página.
export const OPINIONES = [
  {
    texto:
      "Antes me enteraba de las multas por el buzón del SAT. Ahora veo el semáforo y el previo me llega antes del 17.",
    quien: "Rocío M.",
    giro: "Consultorio dental, RESICO",
  },
  {
    texto:
      "Me pusieron al día con dos años sin presentar y me dijeron cuánto iba a costar antes de empezar.",
    quien: "Arturo P.",
    giro: "Vende en Mercado Libre",
  },
  {
    texto:
      "Llevan la nómina de mis ocho empleados y me contestan por WhatsApp el mismo día. No he tenido que ir a la oficina.",
    quien: "Gerardo L.",
    giro: "Cafetería, persona moral",
  },
]

// Antes de contratarnos: con quién encajamos y con quién no.
export const ENCAJAMOS = [
  "Quieres saber cada mes cómo vas, sin tener que preguntar.",
  "Puedes revisar y aprobar el previo antes del 17.",
  "Prefieres una iguala fija por régimen y que lo extra se cotice antes.",
  "Nos mandas lo que te pedimos, aunque sea por WhatsApp.",
]
export const NO_ENCAJAMOS = [
  "Buscas declaraciones «en ceros» cuando sí tuviste ingresos.",
  "Quieres que guardemos tu e.firma o tu contraseña del SAT.",
  "Necesitas facturas de operaciones que no ocurrieron o deducciones sin comprobante.",
  "Buscas solo el precio más bajo: no competimos por precio, sino por no fallar el 17.",
]

// Guías cortas. Cifras de 2026; orientativas, no sustituyen una revisión de tu caso.
export const GUIAS = [
  {
    id: "resico",
    titulo: "RESICO en cinco minutos",
    resumen: "Quién puede entrar, cuánto se paga y qué cambia con respecto al régimen normal.",
    lectura: "5 minutos",
    secciones: [
      {
        titulo: "Quién puede",
        texto: [
          "Personas físicas con actividad empresarial, servicios profesionales o rentas, con ingresos de hasta $3.5 millones al año.",
          "No pueden quienes son socios o accionistas de una empresa, ni quienes ya tienen otros ingresos que lo impiden, como algunos asimilados a salarios.",
        ],
      },
      {
        titulo: "Cuánto se paga",
        texto: [
          "El ISR es un porcentaje de lo que cobras en el mes, sin restar gastos: de 1 % si cobras hasta $25,000, a 2.5 % si pasas de $208,333.",
          "Si le facturas a una empresa, te retiene 1.25 % y eso se resta de lo que pagas.",
          "El IVA no cambia: se paga el que cobras menos el de tus gastos con factura.",
        ],
      },
      {
        titulo: "Lo que hay que cuidar",
        texto: [
          "Si te pasas de $3.5 millones en el año, sales de RESICO y no puedes volver.",
          "La declaración mensual vence el 17 aunque no hayas cobrado nada, y la anual es en abril. En RESICO no hay deducciones personales.",
        ],
      },
    ],
    herramienta: ["/despacho/calculadoras?c=resico", "Calcular mi ISR de RESICO"],
  },
  {
    id: "requerimiento",
    titulo: "Si te llega una carta del SAT",
    resumen: "Cómo distinguir una carta invitación de un requerimiento y qué hacer en cada caso.",
    lectura: "4 minutos",
    secciones: [
      {
        titulo: "Primero, qué es",
        texto: [
          "Una carta invitación te avisa que el SAT ve algo raro, por ejemplo facturas que no declaraste. No es una multa, pero sí una señal de que te están viendo.",
          "Un requerimiento te pide algo con un plazo: presentar declaraciones que faltan o entregar documentos. Si no lo atiendes, sí hay multa.",
        ],
      },
      {
        titulo: "Qué hacer",
        texto: [
          "No lo ignores ni contestes sin revisar. Anota la fecha en que te lo notificaron: el plazo cuenta desde ahí y viene escrito en el documento.",
          "Revisa tu buzón tributario: ahí llegan casi todas. Si no lo tienes confirmado, el SAT te puede notificar por estrados y te enteras tarde.",
          "Mándanos el documento completo. Si es por declaraciones que faltan, ya no cuenta como corrección espontánea, así que conviene atenderlo pronto para que la multa no crezca.",
        ],
      },
    ],
    herramienta: ["/despacho/servicios#defensa", "Ver el servicio de defensa ante el SAT"],
  },
  {
    id: "anual",
    titulo: "Tu primera declaración anual",
    resumen: "Quién la presenta, qué deducciones hay y cómo se recupera el saldo a favor.",
    lectura: "5 minutos",
    secciones: [
      {
        titulo: "Quién la presenta",
        texto: [
          "Las personas físicas la presentan en abril. Si solo tuviste un patrón y ganaste hasta $400,000, no estás obligado, pero te conviene si tienes gastos para deducir.",
          "Si cambiaste de trabajo en el año, tuviste dos patrones a la vez o también facturas, sí estás obligado.",
        ],
      },
      {
        titulo: "Lo que puedes deducir",
        texto: [
          "Médicos, dentistas, psicólogos, lentes, hospital, colegiaturas, intereses del crédito hipotecario, seguros de gastos médicos y aportaciones para el retiro.",
          "Tienen que estar pagados con tarjeta o transferencia y con factura a tu RFC. El tope general es lo menor entre 15 % de tus ingresos y cinco UMA anuales (unos $214,000 en 2026).",
        ],
      },
      {
        titulo: "El saldo a favor",
        texto: [
          "Si te retuvieron de más, el SAT te lo devuelve a tu cuenta, casi siempre en pocas semanas, si la cuenta está a tu nombre y la CLABE es correcta.",
        ],
      },
    ],
    herramienta: ["/despacho/precios?regimen=sueldos#cotizar", "Cotizar mi declaración anual"],
  },
]
