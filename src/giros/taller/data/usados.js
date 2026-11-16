// Revisión antes de comprar un usado (solo Mecánica Rosales). El reporte es de ejemplo: auto,
// medidas y montos inventados.
export const QUE_REVISAMOS = [
  {
    id: "papeles",
    nombre: "Papeles",
    puntos: [
      "Que el número de serie del auto coincida con la factura y la tarjeta de circulación",
      "Consulta en el REPUVE (registro público de vehículos) de que no tenga reporte de robo",
      "Refrendos y tenencias pagados",
    ],
  },
  {
    id: "motor",
    nombre: "Motor y transmisión",
    puntos: [
      "Arranque en frío, humo y ruidos",
      "Fugas de aceite y anticongelante",
      "Escáner: fallas guardadas y si las borraron hace poco",
      "Cambios de la transmisión en prueba de manejo",
    ],
  },
  {
    id: "frenos",
    nombre: "Frenos, suspensión y llantas",
    puntos: [
      "Grosor de balatas y discos",
      "Amortiguadores, rótulas y bujes",
      "Profundidad y desgaste de las llantas (el desgaste disparejo delata golpes)",
    ],
  },
  {
    id: "carroceria",
    nombre: "Carrocería y chasis",
    puntos: [
      "Medidor de grosor de pintura en cada pieza: dónde la repintaron",
      "Soldaduras y golpes en el chasis",
      "Óxido y señales de inundación (lodo bajo alfombras, olor a humedad)",
    ],
  },
  {
    id: "electrico",
    nombre: "Eléctrico e interior",
    puntos: [
      "Batería, alternador y luces del tablero",
      "Aire acondicionado, vidrios y seguros",
      "Bolsas de aire sin testigo encendido",
    ],
  },
]

export const PASOS_USADOS = [
  [
    "Agendas",
    "Eliges día y hora y quedas con el vendedor en el taller. Si el auto no puede moverse, te decimos qué revisar tú.",
  ],
  [
    "Revisamos",
    "Unos 90 minutos, con el auto en el elevador, escáner y prueba de manejo. Puedes quedarte a ver.",
  ],
  [
    "Te damos el reporte",
    "Por escrito, con fotos, lo que urge, lo que puede esperar y cuánto costaría arreglarlo.",
  ],
]

export const REPORTE_EJEMPLO = {
  auto: "Chevrolet Aveo 2017 · 98,400 km",
  precioPedido: 129000,
  veredicto: "Cómpralo si bajan el precio",
  resumen:
    "Motor y papeles en orden. Tiene una salpicadera repintada por un golpe leve y necesita frenos y llantas pronto. Con lo que cuesta ponerlo al día, una oferta de $121,000 es razonable.",
  categorias: [
    {
      id: "papeles",
      nivel: "bien",
      hallazgos: [
        "Número de serie coincide con factura y tarjeta de circulación.",
        "Sin reporte de robo en el REPUVE.",
        "Refrendos al corriente.",
      ],
      costo: 0,
    },
    {
      id: "motor",
      nivel: "bien",
      hallazgos: [
        "Arranca bien en frío, sin humo.",
        "Escáner sin fallas guardadas; no hay señales de que las hayan borrado.",
        "Fuga ligera en la tapa de punterías: no urge.",
      ],
      costo: 650,
    },
    {
      id: "frenos",
      nivel: "urgente",
      hallazgos: ["Balatas delanteras al 20 %.", "Llantas delanteras a 3 mm, desgaste parejo."],
      costo: 4650,
    },
    {
      id: "carroceria",
      nivel: "espera",
      hallazgos: [
        "Salpicadera delantera derecha repintada (pintura de 310 micras contra 110 de fábrica).",
        "Chasis sin soldaduras ni golpes estructurales.",
        "Sin señales de inundación.",
      ],
      costo: 0,
    },
    {
      id: "electrico",
      nivel: "espera",
      hallazgos: ["Batería de 2019 al 60 % de carga.", "Aire acondicionado enfría bien."],
      costo: 2300,
    },
  ],
}
