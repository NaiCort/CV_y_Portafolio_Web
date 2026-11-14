// Categorías y horario semanal de ejemplo. Coaches y cupos son ficticios.
export const CATEGORIAS = [
  {
    id: "fuerza",
    nombre: "Fuerza",
    desc: "Barra, mancuernas y técnica",
    minutos: 45,
    cupo: 14,
    foto: "fuerza",
  },
  {
    id: "ciclo",
    nombre: "Ciclo",
    desc: "Bici fija con música y zonas de esfuerzo",
    minutos: 45,
    cupo: 24,
    foto: "ciclo",
  },
  {
    id: "combate",
    nombre: "Combate",
    desc: "Box y kickboxing sin contacto",
    minutos: 50,
    cupo: 16,
    foto: "combate",
  },
  {
    id: "movilidad",
    nombre: "Movilidad",
    desc: "Yoga y pilates en tapete",
    minutos: 50,
    cupo: 20,
  },
  { id: "ritmo", nombre: "Ritmo", desc: "Cardio de baile", minutos: 45, cupo: 30 },
]
export const findCategoria = (id) => CATEGORIAS.find((categoria) => categoria.id === id)

// Días con letra: L M X J V S D.
const DIAS = { D: 0, L: 1, M: 2, X: 3, J: 4, V: 5, S: 6 }
const PLANTILLA = [
  ["centro", "fuerza", "7:00", "LMXJV", "mara"],
  ["centro", "fuerza", "19:30", "LXV", "mara"],
  ["centro", "ritmo", "20:00", "MJ", "dani"],
  ["centro", "movilidad", "9:00", "SD", "sofia"],
  ["arboledas", "movilidad", "8:00", "LXV", "sofia"],
  ["arboledas", "ritmo", "19:00", "LMXJ", "dani"],
  ["arboledas", "ritmo", "10:00", "S", "dani"],
  ["rio-norte", "fuerza", "6:00", "MJ", "leo"],
  ["rio-norte", "fuerza", "21:00", "LMXJV", "leo"],
  ["mirador", "ciclo", "7:00", "LXV", "ivan"],
  ["mirador", "ciclo", "20:00", "LMXJV", "ivan"],
  ["mirador", "movilidad", "18:30", "MJ", "sofia"],
  ["mirador", "movilidad", "9:30", "S", "sofia"],
  ["fundicion", "combate", "7:00", "MJ", "rafa"],
  ["fundicion", "combate", "19:00", "LMXJV", "rafa"],
  ["fundicion", "ciclo", "18:00", "LXV", "ivan"],
  ["fundicion", "fuerza", "20:00", "MJ", "mara"],
  ["fundicion", "combate", "11:00", "SD", "rafa"],
]

export const HORARIO = PLANTILLA.flatMap(([sucursal, categoria, hora, dias, coach]) =>
  [...dias].map((letra) => ({
    id: `${sucursal}-${categoria}-${letra}-${hora.replace(":", "")}`,
    sucursal,
    categoria,
    coach,
    dia: DIAS[letra],
    hora,
  })),
)
