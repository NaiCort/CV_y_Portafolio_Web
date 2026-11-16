// Contenido de las páginas propias de Vértice. Casos, perfil, autos y cifras son de ejemplo.
// No se nombran aseguradoras reales: Vértice es ficticio y no tiene convenios.

export const CON_SEGURO = [
  [
    "Reporta el siniestro",
    "Llama a tu aseguradora desde el lugar y pide que el auto venga a Vértice Ánimas.",
  ],
  [
    "Valuación",
    "El ajustador y nuestro valuador revisan el daño juntos; te mandamos fotos de cada pieza.",
  ],
  [
    "Pagas solo tu deducible",
    "La aseguradora paga el resto directo al taller. Si te toca auto sustituto, te lo entregamos aquí.",
  ],
  [
    "Seguimiento",
    "Ves en qué va desde Mi garaje: desarmado, hojalatería, pintura, armado y lavado.",
  ],
]

export const SIN_SEGURO = [
  "Valoración de daños sin costo, en la sucursal o con fotos por WhatsApp.",
  "Presupuesto por pieza: reparar o cambiar, y el precio de cada opción.",
  "Igualación de color por computadora y garantía de 12 meses en la pintura.",
]

export const PORCENTAJES_DEDUCIBLE = [5, 10, 20]

// Si la reparación cuesta menos que el deducible, conviene pagarla directo.
export function decidirSeguro(valorAuto, porcentaje, reparacion) {
  const deducible = Math.round((valorAuto * porcentaje) / 100)
  const conSeguro = Math.min(deducible, reparacion)
  return {
    deducible,
    conSeguro,
    conviene: reparacion > deducible ? "seguro" : "directo",
    ahorro: Math.max(0, reparacion - deducible),
  }
}

export const CASOS = [
  {
    auto: "Volkswagen Jetta 2021",
    dano: "Golpe trasero en un alto",
    trabajo: "Defensa y cajuela cambiadas, calavera derecha, pintura de dos piezas",
    dias: 6,
    via: "Con seguro: el cliente pagó $6,500 de deducible",
  },
  {
    auto: "Honda CR-V 2018",
    dano: "Raspón lateral en un estacionamiento",
    trabajo: "Dos puertas reparadas sin cambiar piezas, pintura y pulido",
    dias: 3,
    via: "Sin seguro: $7,900, menos que su deducible de $12,000",
  },
  {
    auto: "Nissan Kicks 2022",
    dano: "Granizo en cofre y techo",
    trabajo: "Reparación sin pintura (desabollado con varillas) de 34 abolladuras",
    dias: 4,
    via: "Con seguro: cobertura de fenómenos naturales",
  },
]

export const HIBRIDOS_ATENDEMOS = [
  ["Batería de alto voltaje", "Prueba de cada módulo, balanceo y cambio de módulos dañados."],
  [
    "Inversor y motor eléctrico",
    "Diagnóstico con el equipo del fabricante y prueba de aislamiento.",
  ],
  ["Enfriamiento de la batería", "Limpieza del ventilador y los ductos, que se tapan con polvo."],
  [
    "Frenos regenerativos",
    "Balatas que duran más, pero con calibradores que se pegan si no se usan.",
  ],
  ["Cargador a bordo", "Para híbridos enchufables y eléctricos: carga lenta y rápida."],
]

export const HIBRIDOS_SEGURIDAD = [
  "Técnicos con certificación en alto voltaje.",
  "Herramienta aislada a 1,000 V y guantes probados cada seis meses.",
  "Bahía señalizada y separada: nadie más se acerca mientras el sistema está energizado.",
]

// Reporte de ejemplo de la batería de un Toyota Prius 2016: voltaje de cada bloque.
export const BATERIA_EJEMPLO = {
  auto: "Toyota Prius 2016 · 142,000 km",
  minimo: 14.4,
  bloques: [15.6, 15.5, 15.6, 15.4, 15.6, 15.5, 14.1, 15.5, 15.6, 15.4, 15.5, 15.6, 15.5, 15.4],
  conclusion:
    "Un bloque está bajo el mínimo y arrastra a los demás. Cambiarlo y balancear cuesta $4,900; una batería nueva, unos $38,000.",
}

export const HIBRIDOS_PREGUNTAS = [
  [
    "¿Pierdo la garantía si no lo llevo a la agencia?",
    "Seguimos el programa de mantenimiento del fabricante y te damos por escrito qué se hizo y con qué refacciones, para que lo presentes si usas la garantía.",
  ],
  [
    "¿Cada cuánto se revisa la batería?",
    "Una vez al año o cada 20,000 km. Si el auto se apaga solo o el modo eléctrico dura menos, antes.",
  ],
  [
    "¿Cuánto dura una batería híbrida?",
    "Entre 8 y 15 años según el uso y el calor. Cambiar un bloque cuesta mucho menos que la batería completa.",
  ],
]

// Perfil de ejemplo de Mi garaje. Datos inventados; se muestran en pantalla para entrar.
export const PERFIL_GARAJE = {
  nombre: "Mariana López",
  correo: "mariana@ejemplo.mx",
  clave: "vertice2026",
  autos: [
    {
      id: "mazda",
      nombre: "Mazda 3 2019",
      placas: "YKZ-418-B",
      km: 62300,
      ultimo: 60000,
      siguiente: 70000,
      orden: true,
      historial: [
        ["26 nov 2026", "Diagnóstico y presupuesto (orden VX-CEN-1182)", "Centro"],
        ["14 may 2026", "Servicio de 50,000 km", "Centro"],
        ["2 dic 2025", "Alineación y balanceo", "Lázaro Cárdenas"],
        ["20 jun 2025", "Servicio de 40,000 km", "Centro"],
      ],
    },
    {
      id: "prius",
      nombre: "Toyota Prius 2020",
      placas: "YLA-205-C",
      km: 38900,
      ultimo: 30000,
      siguiente: 40000,
      orden: false,
      historial: [
        ["9 ago 2026", "Revisión de híbridos: batería al 94 %", "Arco Sur"],
        ["3 feb 2026", "Servicio de 30,000 km", "Arco Sur"],
      ],
    },
  ],
}
