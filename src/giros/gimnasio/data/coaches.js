// Coaches ficticios. Los nombres no corresponden a personas reales y no hay fotos: ninguna
// persona de los videos se presenta como coach de Brío.
export const COACHES = [
  {
    id: "mara",
    nombre: "Mara",
    especialidad: "Fuerza y técnica de barra",
    anios: 9,
    objetivos: ["fuerza", "cero"],
    enfoque:
      "Empieza por la técnica y sube el peso cuando el movimiento sale limpio. Lleva un registro de cada serie para que veas el avance semana a semana.",
    formacion: ["Licenciatura en Entrenamiento Deportivo", "Curso de halterofilia, nivel 2"],
  },
  {
    id: "rafa",
    nombre: "Rafa",
    especialidad: "Box y kickboxing",
    anios: 12,
    objetivos: ["combate", "resistencia"],
    enfoque:
      "Guardia, desplazamiento y combinaciones antes que sparring. Nadie se sube a hacer guantes sin pedirlo y sin haber practicado la defensa.",
    formacion: ["Exboxeador amateur", "Curso de entrenador de box, nivel 1"],
  },
  {
    id: "ivan",
    nombre: "Iván",
    especialidad: "Ciclo y resistencia",
    anios: 7,
    objetivos: ["resistencia"],
    enfoque:
      "Clases por zonas de esfuerzo: sabes cuándo apretar y cuándo recuperar. La música marca el ritmo, la bici la ajustas tú.",
    formacion: ["Licenciatura en Educación Física", "Curso de ciclismo de interior"],
  },
  {
    id: "sofia",
    nombre: "Sofía",
    especialidad: "Movilidad, yoga y pilates",
    anios: 10,
    objetivos: ["movilidad", "cero"],
    enfoque:
      "Rango de movimiento, respiración y control. Cada postura tiene una versión más sencilla; nadie tiene que tocarse los pies el primer día.",
    formacion: ["Formación de instructora de yoga, 200 h", "Curso de pilates en colchoneta"],
  },
  {
    id: "dani",
    nombre: "Dani",
    especialidad: "Ritmo y cardio de baile",
    anios: 6,
    objetivos: ["resistencia", "cero"],
    enfoque:
      "Coreografías cortas que se repiten hasta que salen. Se viene a sudar y a pasarla bien; no hace falta saber bailar.",
    formacion: ["Licenciatura en Danza", "Curso de acondicionamiento físico grupal"],
  },
  {
    id: "leo",
    nombre: "Leo",
    especialidad: "Fuerza para principiantes",
    anios: 5,
    objetivos: ["fuerza", "cero", "movilidad"],
    enfoque:
      "Para quien nunca ha entrado a un área de pesas. Te enseña a usar cada máquina, a armar tu rutina y a calentar sin perder media hora.",
    formacion: ["Licenciatura en Ciencias del Deporte", "Curso de entrenamiento de fuerza básico"],
  },
]
export const findCoach = (id) => COACHES.find((coach) => coach.id === id)

export const OBJETIVOS = [
  { id: "fuerza", nombre: "Ganar fuerza" },
  { id: "resistencia", nombre: "Más resistencia" },
  { id: "combate", nombre: "Aprender a boxear" },
  { id: "movilidad", nombre: "Moverme mejor" },
  { id: "cero", nombre: "Empezar desde cero" },
]

// Sesiones personales de 60 minutos. Precios de ejemplo en MXN con IVA incluido.
export const PAQUETES = [
  { id: "sesion-1", sesiones: 1, precio: 390, vigenciaDias: 30 },
  { id: "sesion-4", sesiones: 4, precio: 1440, vigenciaDias: 45 },
  { id: "sesion-8", sesiones: 8, precio: 2640, vigenciaDias: 90 },
]
export const findPaquete = (id) => PAQUETES.find((p) => p.id === id)
export const nombrePaquete = (p) =>
  p.sesiones === 1 ? "Sesión personal suelta" : `Paquete de ${p.sesiones} sesiones personales`

// Horarios de la evaluación gratuita (45 min), de lunes a sábado.
export const HORAS_EVALUACION = ["7:00", "8:00", "10:00", "17:00", "18:00", "19:00"]
