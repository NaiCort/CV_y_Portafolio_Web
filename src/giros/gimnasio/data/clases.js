// Categorías y horario semanal de ejemplo. Coaches y cupos son ficticios.
export const CATEGORIAS = [
  {
    id: "fuerza",
    nombre: "Fuerza",
    desc: "Barra, mancuernas y técnica",
    minutos: 45,
    cupo: 14,
    foto: "fuerza",
    nivel: "todos",
    intensidad: 2,
    traer: "Ropa cómoda, tenis de suela plana y toalla. Barras y discos los pone el club.",
  },
  {
    id: "ciclo",
    nombre: "Ciclo",
    desc: "Bici fija con música y zonas de esfuerzo",
    minutos: 45,
    cupo: 24,
    foto: "ciclo",
    nivel: "todos",
    intensidad: 3,
    traer: "Toalla, agua y tenis de suela rígida. La bici se ajusta a tu altura al llegar.",
  },
  {
    id: "combate",
    nombre: "Combate",
    desc: "Box y kickboxing sin contacto",
    minutos: 50,
    cupo: 16,
    foto: "combate",
    nivel: "todos",
    intensidad: 3,
    traer: "Agua y vendas. Si no tienes, en tu primera clase te prestamos vendas y guantes.",
  },
  {
    id: "movilidad",
    nombre: "Movilidad",
    desc: "Yoga y pilates en tapete",
    minutos: 50,
    cupo: 20,
    nivel: "empezar",
    intensidad: 1,
    traer: "Ropa que te deje moverte. Tapete y bloques los pone el club.",
  },
  {
    id: "ritmo",
    nombre: "Ritmo",
    desc: "Cardio de baile",
    minutos: 45,
    cupo: 30,
    nivel: "empezar",
    intensidad: 2,
    traer: "Tenis ligeros y agua. No hace falta saber bailar.",
  },
]
export const findCategoria = (id) => CATEGORIAS.find((categoria) => categoria.id === id)

// Nivel = técnica que pide la clase; intensidad = esfuerzo (1 suave, 2 media, 3 alta).
export const NIVELES = { empezar: "Para empezar", todos: "Todos los niveles" }
export const INTENSIDADES = { 1: "suave", 2: "media", 3: "alta" }

// Días con letra: L M X J V S D.
const DIAS = { D: 0, L: 1, M: 2, X: 3, J: 4, V: 5, S: 6 }
const PLANTILLA = [
  ["centro", "fuerza", "7:00", "LMXJV", "mara"],
  ["centro", "fuerza", "19:30", "LXV", "mara"],
  ["centro", "ritmo", "20:00", "MJ", "dani"],
  ["centro", "movilidad", "9:00", "SD", "sofia"],
  ["lagos", "movilidad", "8:00", "LXV", "sofia"],
  ["lagos", "ritmo", "19:00", "LMXJ", "dani"],
  ["lagos", "ritmo", "10:00", "S", "dani"],
  ["macuiltepetl", "fuerza", "6:00", "MJ", "leo"],
  ["macuiltepetl", "fuerza", "21:00", "LMXJV", "leo"],
  ["tecajetes", "ciclo", "7:00", "LXV", "ivan"],
  ["tecajetes", "ciclo", "20:00", "LMXJV", "ivan"],
  ["tecajetes", "movilidad", "18:30", "MJ", "sofia"],
  ["tecajetes", "movilidad", "11:00", "S", "sofia"],
  ["natura", "combate", "7:00", "MJ", "rafa"],
  ["natura", "combate", "19:00", "LMXJV", "rafa"],
  ["natura", "ciclo", "18:00", "LXV", "ivan"],
  ["natura", "fuerza", "20:00", "MJ", "mara"],
  ["natura", "combate", "11:00", "SD", "rafa"],
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
