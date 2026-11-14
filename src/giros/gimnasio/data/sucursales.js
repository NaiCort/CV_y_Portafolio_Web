// Cinco sucursales ficticias en una ciudad sin nombre. Calles, horarios y aforos son de ejemplo.
export const SUCURSALES = [
  {
    id: "centro",
    nombre: "Centro",
    rasgo: "Piso de pesas doble y vapor",
    direccion: "Calle Hidalgo 214, a dos cuadras de la plaza",
    tiene: ["Piso de pesas doble", "Vapor", "Sala de ritmo"],
    horario: { semana: [5.5, 23], finde: [7, 20] },
    capacidad: 220,
    ritmo: 1,
    pin: { x: 410, y: 250 },
  },
  {
    id: "arboledas",
    nombre: "Arboledas",
    rasgo: "Alberca semiolímpica",
    direccion: "Av. de los Fresnos 88, junto al parque",
    tiene: ["Alberca de 25 m", "Estudio de movilidad", "Ludoteca"],
    horario: { semana: [6, 22], finde: [7, 20] },
    capacidad: 260,
    ritmo: 1.12,
    pin: { x: 170, y: 150 },
  },
  {
    id: "rio-norte",
    nombre: "Río Norte",
    rasgo: "Abierta las 24 horas",
    direccion: "Blvd. Río Seco 1500, planta baja",
    tiene: ["Acceso 24 horas", "Piso de pesas", "Zona de cardio"],
    horario: { semana: [0, 24], finde: [0, 24] },
    capacidad: 160,
    ritmo: 0.72,
    pin: { x: 430, y: 70 },
  },
  {
    id: "mirador",
    nombre: "Mirador",
    rasgo: "Terraza de movilidad",
    direccion: "Calle Mirador 32, último piso",
    tiene: ["Terraza al aire libre", "Sala de ciclo", "Estudio de movilidad"],
    horario: { semana: [6, 22], finde: [7, 20] },
    capacidad: 180,
    ritmo: 0.95,
    pin: { x: 590, y: 215 },
  },
  {
    id: "fundicion",
    nombre: "Fundición",
    rasgo: "Ring de box y sala de ciclo",
    direccion: "Antigua Fundición, nave 3",
    tiene: ["Ring de box", "Sala de ciclo", "Piso de fuerza"],
    horario: { semana: [6, 23], finde: [8, 20] },
    capacidad: 200,
    ritmo: 1.05,
    pin: { x: 230, y: 440 },
  },
]

export const findSucursal = (id) => SUCURSALES.find((sucursal) => sucursal.id === id)

const hora = (valor) => {
  const h = Math.floor(valor)
  const m = Math.round((valor - h) * 60)
  return `${h}:${String(m).padStart(2, "0")}`
}
export function horarioTexto(sucursal, fecha = new Date()) {
  const finde = [0, 6].includes(fecha.getDay())
  const [abre, cierra] = finde ? sucursal.horario.finde : sucursal.horario.semana
  if (abre === 0 && cierra === 24) return "Abierta las 24 horas"
  return `${hora(abre)} a ${hora(cierra)}`
}
