// Catálogo del cotizador (V4.9): fuente única de funciones, categorías, reglas, precios y puntos
// de partida por demo (Sitio Profesional Integral V1.4, secciones 18 a 23; investigación en
// docs/INVESTIGACION_COTIZADOR.md). El cálculo vive en src/lib/cotizacion.js y no guarda precios:
// todo sale de aquí, para que el servidor de una versión futura use exactamente lo mismo.
//
// Las horas son una primera estimación de Ian y Claude (25/11/2026); se sustituirán por tiempos
// medidos. Los precios son los propuestos en la sección 22 y se decidirán al terminar el cotizador.

export const VERSION_CATALOGO = 1

export const PARAMETROS = {
  // Plazo: como máximo 8 horas al día, solo días hábiles (decisión de Ian, 25/11/2026).
  horasPorDia: 8,
  // Ficha de identidad y pasada final de calidad (sección 20): se suma a las horas del proyecto.
  calidad: 0.1,
  // Precio de lanzamiento para los primeros clientes (sección 22.1, propuesto).
  lanzamiento: 0.3,
  // IVA trasladado en México (LFPC 7 Bis: se muestra el total con impuestos).
  iva: 0.16,
  // Vigencia de la cotización en días (sección 22.2).
  vigencia: 15,
  // Anticipo del pago único (sección 23.1).
  anticipo: 0.3,
}

export const MONEDAS = {
  MXN: {
    id: "MXN",
    nombre: "Pesos mexicanos",
    tarifa: 400,
    minimo: 3500,
    redondeo: 100,
    iva: true,
  },
  USD: { id: "USD", nombre: "Dólares", tarifa: 30, minimo: 300, redondeo: 5, iva: false },
  EUR: { id: "EUR", nombre: "Euros", tarifa: 28, minimo: 280, redondeo: 5, iva: false },
}

// Entrega urgente (sección 21.3). La exprés solo existe para proyectos pequeños.
export const URGENCIAS = [
  { id: "normal", nombre: "Normal", recargo: 0, plazo: 1 },
  { id: "prioritaria", nombre: "Prioritaria", recargo: 0.3, plazo: 0.5 },
  { id: "expres", nombre: "Exprés", recargo: 0.6, plazo: 0.25, maxHoras: 40 },
]

// Planes de mantenimiento (sección 23.2): mensualidad aparte del pago único.
export const MANTENIMIENTO = [
  {
    id: "ninguno",
    nombre: "Sin plan",
    detalle: "Lo administras tú.",
    precio: { MXN: 0, USD: 0, EUR: 0 },
  },
  {
    id: "esencial",
    nombre: "Esencial",
    detalle: "Hospedaje, dominio y respaldos; sin horas de cambios.",
    precio: { MXN: 400, USD: 25, EUR: 22 },
  },
  {
    id: "basico",
    nombre: "Básico",
    detalle: "Hospedaje gestionado, respaldos, seguridad y monitoreo.",
    precio: { MXN: 1200, USD: 79, EUR: 69 },
  },
  {
    id: "estandar",
    nombre: "Estándar",
    detalle: "Básico más 2 horas de cambios al mes.",
    precio: { MXN: 2200, USD: 149, EUR: 129 },
  },
  {
    id: "prioritario",
    nombre: "Prioritario",
    detalle: "Estándar más 5 horas de cambios y respuesta en menos de 24 horas.",
    precio: { MXN: 4000, USD: 279, EUR: 239 },
  },
]

// Las cuatro categorías (sección 18.1), de la más libre a la más completa. `orden` sirve para
// sugerir la siguiente cuando una función no cabe en la actual.
export const CATEGORIAS = [
  {
    id: "personalizado",
    nombre: "Personalizado",
    para: "Armas tu proyecto con todo el catálogo.",
    ejemplo: null,
    orden: 0,
  },
  {
    id: "landing",
    nombre: "Landing",
    para: "Una sola página para presentarte y que te contacten.",
    ejemplo: "psicologo",
    orden: 1,
  },
  {
    id: "varias",
    nombre: "Varias páginas",
    para: "Páginas independientes con menú entre ellas.",
    ejemplo: "patio-12",
    orden: 2,
  },
  {
    id: "tienda",
    nombre: "Tienda o sistema",
    para: "Venta en línea, cuentas de usuario o gestión interna.",
    ejemplo: "brio",
    orden: 3,
  },
]

export const GRUPOS = [
  { id: "estructura", nombre: "Estructura" },
  { id: "contenido", nombre: "Contenido" },
  { id: "interaccion", nombre: "Interacción" },
  { id: "ventas", nombre: "Ventas" },
  { id: "servicio", nombre: "Servicio" },
  { id: "ia", nombre: "IA y automatización" },
  { id: "extras", nombre: "Si no tienes el material" },
]

// Núcleo técnico global (sección 18.2): va en todo proyecto y no se cobra aparte.
export const NUCLEO_GLOBAL = [
  "Diseño para celular, tableta y escritorio",
  "Publicación con HTTPS y configuración de tu dominio (el dominio se paga aparte)",
  "Título, descripción, vista previa al compartir e ícono",
  "Accesibilidad básica: contraste, teclado y textos alternativos",
  "Al menos un contacto real (WhatsApp, teléfono, correo o formulario)",
]

// Estado de una función en cada categoría (sección 18.4):
// N = núcleo (no se puede retirar), I = incluida y retirable, O = opcional, null = no cabe.
// `datos: true` = recoge datos personales: obliga al aviso de privacidad.
// `requiere`: todas; `requiereAlguna`: al menos una. `excluye`: no pueden coexistir.
// `cantidad`: se puede pedir más de una (precio por unidad). `porcentaje`: suma un porcentaje de
// las horas de las demás funciones. `aparte`: sin número; se cotiza en la propuesta.
const N = "N"
const I = "I"
const O = "O"
const est = (personalizado, landing, varias, tienda) => ({ personalizado, landing, varias, tienda })

export const FUNCIONES = [
  // Estructura
  {
    id: "una-pagina",
    grupo: "estructura",
    nombre: "Una sola página con secciones",
    detalle: "Propuesta, botón de acción, quién eres, dónde y cuándo.",
    horas: [10, 14],
    estados: est(I, N, null, null),
    excluye: ["paginas"],
    demos: ["psicologo"],
  },
  {
    id: "paginas",
    grupo: "estructura",
    nombre: "Páginas con menú entre ellas",
    detalle: "Hasta cuatro páginas, menú y página de «no encontrado».",
    horas: [16, 22],
    estados: est(O, null, N, N),
    excluye: ["una-pagina"],
    demos: ["patio-12", "ladera", "brio", "taller", "cotejo", "revista"],
  },
  {
    id: "pagina-extra",
    grupo: "estructura",
    nombre: "Página adicional",
    detalle: "Cada página más allá de las cuatro incluidas.",
    horas: [3, 5],
    cantidad: 10,
    estados: est(O, null, O, O),
    requiere: ["paginas"],
  },
  {
    id: "temas",
    grupo: "estructura",
    nombre: "Estilo alterno que el visitante elige",
    detalle: "Como los cuatro estilos de la demo de Psicólogo; precio por estilo.",
    horas: [8, 12],
    cantidad: 4,
    estados: est(O, O, O, O),
    demos: ["psicologo", "brio", "taller"],
  },
  {
    id: "sucursales",
    grupo: "estructura",
    nombre: "Varias sucursales",
    detalle: "Cada sucursal con su página, horario y ubicación.",
    horas: [8, 12],
    estados: est(O, null, O, O),
    requiere: ["paginas"],
    demos: ["patio-12", "brio", "taller"],
  },
  {
    id: "dos-idiomas",
    grupo: "estructura",
    nombre: "Sitio en español e inglés",
    detalle: "Todo el sitio en dos idiomas, con selector.",
    porcentaje: 0.3,
    estados: est(O, O, O, O),
  },
  // Contenido
  {
    id: "carta",
    grupo: "contenido",
    nombre: "Carta o lista de precios",
    detalle: "Productos o servicios con precio, fotos y filtros.",
    horas: [6, 10],
    estados: est(O, O, I, I),
    demos: ["patio-12", "ladera", "taller"],
  },
  {
    id: "galeria",
    grupo: "contenido",
    nombre: "Galería de fotos",
    detalle: "Con ampliación y gestos en el celular.",
    horas: [4, 6],
    estados: est(O, O, I, I),
    demos: ["patio-12", "revista"],
  },
  {
    id: "mapa",
    grupo: "contenido",
    nombre: "Ubicación con mapa",
    detalle: "Mapa, dirección y cómo llegar.",
    horas: [3, 5],
    estados: est(O, I, I, I),
    demos: ["ladera", "taller", "brio"],
  },
  {
    id: "equipo",
    grupo: "contenido",
    nombre: "Perfiles del equipo",
    detalle: "Quién atiende, con foto y especialidad.",
    horas: [4, 6],
    estados: est(O, O, I, I),
    demos: ["brio", "revista", "cotejo"],
  },
  {
    id: "preguntas",
    grupo: "contenido",
    nombre: "Preguntas frecuentes",
    detalle: "Costos, horarios, formas de pago y lo que más te preguntan.",
    horas: [2, 4],
    estados: est(O, O, I, I),
    demos: ["cotejo", "brio"],
  },
  {
    id: "opiniones",
    grupo: "contenido",
    nombre: "Opiniones de clientes",
    detalle: "Solo con su permiso para publicarlas.",
    horas: [2, 3],
    estados: est(O, O, O, O),
    demos: ["cotejo"],
  },
  {
    id: "articulos",
    grupo: "contenido",
    nombre: "Notas o artículos",
    detalle: "Sección para publicar con lectura cómoda.",
    horas: [10, 16],
    estados: est(O, null, O, O),
    requiere: ["paginas"],
    demos: ["revista"],
  },
  {
    id: "documentos",
    grupo: "contenido",
    nombre: "Documentos descargables",
    detalle: "Guías o folletos en PDF accesibles.",
    horas: [3, 6],
    estados: est(O, O, O, O),
    demos: ["revista", "cotejo"],
  },
  // Interacción
  {
    id: "whatsapp",
    grupo: "interaccion",
    nombre: "Botón de WhatsApp con mensaje escrito",
    detalle: "El cliente te escribe con el contexto ya puesto.",
    horas: [1, 2],
    estados: est(O, I, I, I),
    demos: ["psicologo", "patio-12", "ladera", "brio", "taller", "cotejo"],
  },
  {
    id: "formulario",
    grupo: "interaccion",
    nombre: "Formulario de contacto",
    detalle: "Con validación y confirmación.",
    horas: [3, 5],
    datos: true,
    estados: est(O, I, I, I),
    demos: ["psicologo"],
  },
  {
    id: "citas",
    grupo: "interaccion",
    nombre: "Agenda de citas paso a paso",
    detalle: "Modalidad, día y hora, y confirmación.",
    horas: [8, 12],
    datos: true,
    estados: est(O, O, I, I),
    demos: ["psicologo", "taller"],
  },
  {
    id: "reservas",
    grupo: "interaccion",
    nombre: "Reservas con disponibilidad",
    detalle: "De mesa, de clase o de espacio, con cupo a la vista.",
    horas: [10, 14],
    datos: true,
    estados: est(O, O, O, I),
    demos: ["patio-12", "brio"],
  },
  {
    id: "calculadora",
    grupo: "interaccion",
    nombre: "Calculadora o herramienta del giro",
    detalle: "Como el deducible del taller o los impuestos del despacho; precio por herramienta.",
    horas: [6, 10],
    cantidad: 5,
    estados: est(O, O, O, O),
    demos: ["taller", "cotejo"],
  },
  {
    id: "diagnostico",
    grupo: "interaccion",
    nombre: "Cuestionario que orienta al cliente",
    detalle: "Unas preguntas y una recomendación al final.",
    horas: [6, 8],
    estados: est(O, O, O, O),
    demos: ["cotejo"],
  },
  {
    id: "busqueda",
    grupo: "interaccion",
    nombre: "Búsqueda dentro del sitio",
    detalle: "Encuentra productos, notas o servicios por palabra.",
    horas: [4, 6],
    estados: est(O, null, O, O),
    requiere: ["paginas"],
    demos: ["revista"],
  },
  {
    id: "guardados",
    grupo: "interaccion",
    nombre: "Guardados del visitante",
    detalle: "Marcadores que se conservan en su navegador.",
    horas: [4, 6],
    estados: est(O, null, O, O),
    requiere: ["paginas"],
    demos: ["revista"],
  },
  {
    id: "musica",
    grupo: "interaccion",
    nombre: "Música de ambiente",
    detalle: "En silencio al llegar, con control de volumen.",
    horas: [2, 4],
    estados: est(O, O, O, O),
    demos: ["revista"],
  },
  // Ventas
  {
    id: "cotizacion",
    grupo: "ventas",
    nombre: "Presupuesto con visto bueno por partida",
    detalle: "El cliente aprueba o rechaza cada concepto antes de empezar.",
    horas: [8, 12],
    datos: true,
    estados: est(O, null, O, I),
    requiere: ["paginas"],
    demos: ["taller", "cotejo"],
  },
  {
    id: "carrito",
    grupo: "ventas",
    nombre: "Carrito con precio en tiempo real",
    detalle: "Agregar, quitar y ver el total al momento.",
    horas: [10, 14],
    estados: est(O, null, O, I),
    requiere: ["paginas"],
    demos: ["patio-12", "ladera", "brio"],
  },
  {
    id: "pedidos",
    grupo: "ventas",
    nombre: "Pedidos para recoger o a domicilio",
    detalle: "El pedido llega al negocio con todos sus datos.",
    horas: [8, 12],
    datos: true,
    estados: est(O, null, O, I),
    requiere: ["carrito"],
    demos: ["patio-12", "ladera"],
  },
  {
    id: "seguimiento",
    grupo: "ventas",
    nombre: "Seguimiento del pedido",
    detalle: "El cliente ve en qué va su pedido.",
    horas: [6, 8],
    estados: est(O, null, null, O),
    requiere: ["pedidos"],
    demos: ["patio-12"],
  },
  {
    id: "pago",
    grupo: "ventas",
    nombre: "Cobro en línea",
    detalle: "Tarjeta u otros medios, con una pasarela de pago.",
    horas: [10, 16],
    estados: est(O, null, null, O),
    requiere: ["carrito"],
  },
  {
    id: "planes",
    grupo: "ventas",
    nombre: "Planes y suscripciones",
    detalle: "Alta en línea, renovación y cancelación.",
    horas: [8, 12],
    datos: true,
    estados: est(O, null, null, O),
    requiere: ["cuentas"],
    demos: ["brio", "revista"],
  },
  // Servicio
  {
    id: "privacidad",
    grupo: "servicio",
    nombre: "Aviso de privacidad",
    detalle: "Obligatorio cuando el sitio recibe datos personales.",
    horas: [2, 3],
    estados: est(O, O, O, N),
    demos: ["ladera", "taller", "cotejo"],
  },
  {
    id: "recordatorios",
    grupo: "servicio",
    nombre: "Recordatorios por WhatsApp o correo",
    detalle: "Un aviso antes de la cita o la reserva.",
    horas: [4, 8],
    estados: est(O, O, O, O),
    requiereAlguna: ["citas", "reservas"],
    demos: ["cotejo"],
  },
  {
    id: "cuentas",
    grupo: "servicio",
    nombre: "Cuentas de usuario",
    detalle: "Registro, inicio de sesión, roles y permisos.",
    horas: [16, 24],
    datos: true,
    estados: est(O, null, null, O),
    requiere: ["panel"],
  },
  {
    id: "area-cliente",
    grupo: "servicio",
    nombre: "Área del cliente",
    detalle: "Historial, pases, expediente o pedidos anteriores.",
    horas: [10, 16],
    estados: est(O, null, null, O),
    requiere: ["cuentas"],
    demos: ["brio", "taller", "cotejo"],
  },
  {
    id: "panel",
    grupo: "servicio",
    nombre: "Panel de administración",
    detalle: "Base de datos y un panel para gestionar contenido, pedidos o clientes.",
    horas: [20, 30],
    estados: est(O, null, null, N),
    requiere: ["paginas"],
  },
  // IA y automatización (sección 20.1): sin horas medidas, se cotizan en la propuesta.
  {
    id: "ia-whatsapp",
    grupo: "ia",
    nombre: "Asistente de WhatsApp",
    detalle:
      "Responde con tu agenda, catálogo o preguntas frecuentes y pasa a una persona cuando hace falta.",
    aparte: true,
    estados: est(O, O, O, O),
  },
  {
    id: "ia-preguntas",
    grupo: "ia",
    nombre: "Asistente de preguntas en el sitio",
    detalle: "Horarios, precios, ubicación y cómo agendar.",
    aparte: true,
    estados: est(O, O, O, O),
  },
  {
    id: "ia-documentos",
    grupo: "ia",
    nombre: "Documentos automáticos",
    detalle: "Cotizaciones, contratos o reportes a partir de un formulario.",
    aparte: true,
    estados: est(O, O, O, O),
  },
  {
    id: "ia-datos",
    grupo: "ia",
    nombre: "Lectura de facturas o formularios",
    detalle: "De PDF a una hoja de cálculo o base de datos.",
    aparte: true,
    estados: est(O, O, O, O),
  },
  // Contenido del cliente (sección 23.3): solo si no lo tienes.
  {
    id: "textos",
    grupo: "extras",
    nombre: "Redacción de textos",
    detalle: "Si no tienes los textos de tu sitio.",
    horas: [4, 8],
    estados: est(O, O, O, O),
  },
  {
    id: "imagenes",
    grupo: "extras",
    nombre: "Fotografías o imágenes",
    detalle: "Búsqueda de fotos con licencia o imágenes generadas.",
    horas: [4, 8],
    estados: est(O, O, O, O),
  },
  {
    id: "logotipo",
    grupo: "extras",
    nombre: "Diseño de logotipo",
    detalle: "Si tu negocio todavía no tiene uno.",
    horas: [8, 12],
    estados: est(O, O, O, O),
  },
]

// En «Tienda o sistema», el núcleo exige al menos una de estas (sección 18.1).
export const NUCLEO_ALGUNA = { tienda: ["carrito", "cuentas"] }

// Puntos de partida al llegar desde una demo (sección 18.3): categoría y funciones de cada
// versión. La recomendada es la que se abre; la completa se parece a la demo.
export const PUNTOS_DE_PARTIDA = {
  psicologo: {
    categoria: "landing",
    esencial: ["una-pagina", "whatsapp", "formulario", "mapa"],
    recomendada: ["una-pagina", "whatsapp", "formulario", "mapa", "citas", "preguntas"],
    completa: [
      "una-pagina",
      "whatsapp",
      "formulario",
      "mapa",
      "citas",
      "preguntas",
      "temas*3",
      "recordatorios",
    ],
  },
  "patio-12": {
    categoria: "varias",
    esencial: ["paginas", "carta", "galeria", "mapa", "whatsapp"],
    recomendada: ["paginas", "carta", "galeria", "mapa", "whatsapp", "reservas", "sucursales"],
    completa: [
      "paginas",
      "carta",
      "galeria",
      "mapa",
      "whatsapp",
      "reservas",
      "sucursales",
      "carrito",
      "pedidos",
    ],
  },
  ladera: {
    categoria: "varias",
    esencial: ["paginas", "carta", "mapa", "whatsapp"],
    recomendada: ["paginas", "carta", "mapa", "whatsapp", "galeria", "preguntas"],
    completa: [
      "paginas",
      "carta",
      "mapa",
      "whatsapp",
      "galeria",
      "preguntas",
      "carrito",
      "pedidos",
    ],
  },
  brio: {
    categoria: "tienda",
    esencial: ["paginas", "panel", "cuentas", "planes", "whatsapp"],
    recomendada: [
      "paginas",
      "panel",
      "cuentas",
      "planes",
      "whatsapp",
      "reservas",
      "area-cliente",
      "sucursales",
    ],
    completa: [
      "paginas",
      "panel",
      "cuentas",
      "planes",
      "whatsapp",
      "reservas",
      "area-cliente",
      "sucursales",
      "temas*1",
      "equipo",
      "carrito",
      "pedidos",
    ],
  },
  taller: {
    categoria: "varias",
    esencial: ["paginas", "carta", "citas", "mapa", "whatsapp"],
    recomendada: ["paginas", "carta", "citas", "mapa", "whatsapp", "cotizacion", "calculadora*1"],
    completa: [
      "paginas",
      "carta",
      "citas",
      "mapa",
      "whatsapp",
      "cotizacion",
      "calculadora*1",
      "temas*1",
      "sucursales",
      "preguntas",
    ],
  },
  cotejo: {
    categoria: "varias",
    esencial: ["paginas", "carta", "preguntas", "formulario", "whatsapp"],
    recomendada: [
      "paginas",
      "carta",
      "preguntas",
      "formulario",
      "whatsapp",
      "cotizacion",
      "calculadora*2",
      "diagnostico",
    ],
    completa: [
      "paginas",
      "carta",
      "preguntas",
      "formulario",
      "whatsapp",
      "cotizacion",
      "calculadora*2",
      "diagnostico",
      "recordatorios",
      "citas",
      "documentos",
      "equipo",
      "opiniones",
    ],
  },
  revista: {
    categoria: "varias",
    esencial: ["paginas", "articulos", "galeria"],
    recomendada: ["paginas", "articulos", "galeria", "busqueda", "guardados", "equipo"],
    completa: [
      "paginas",
      "articulos",
      "galeria",
      "busqueda",
      "guardados",
      "equipo",
      "musica",
      "documentos",
      "pagina-extra*4",
    ],
  },
}

export const VERSIONES = [
  { id: "esencial", nombre: "Esencial" },
  { id: "recomendada", nombre: "Recomendada" },
  { id: "completa", nombre: "Completa" },
]

export const funcionPorId = (id) => FUNCIONES.find((f) => f.id === id)
export const categoriaPorId = (id) => CATEGORIAS.find((c) => c.id === id)
