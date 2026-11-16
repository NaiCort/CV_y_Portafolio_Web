// Cinco sucursales ficticias en Xalapa. Cada una se ubica junto a un espacio público real que
// sirve de referencia (consulta manual a OpenStreetMap/Nominatim, 14/11/2026); no hay ningún
// gimnasio en esos puntos. Calles, horarios y aforos son de ejemplo.
export const SUCURSALES = [
  {
    id: "centro",
    nombre: "Centro",
    rasgo: "Piso de pesas doble y vapor",
    direccion: "Cerca del Parque Juárez, Zona Centro",
    referencia: { nombre: "Parque Juárez", osm: "way/691364227" },
    coordenadas: [-96.9237455, 19.5265862],
    tiene: ["Piso de pesas doble", "Vapor", "Sala de ritmo"],
    horario: { semana: [5.5, 23], finde: [7, 20] },
    capacidad: 220,
    ritmo: 1,
    accesibilidad: "Rampa en la entrada y elevador a los dos pisos; vestidor y baño accesibles.",
    estacionamiento:
      "Sin estacionamiento propio: dos horas con descuento en el estacionamiento público de la esquina. Biciestacionamiento para 20.",
  },
  {
    id: "lagos",
    nombre: "Los Lagos",
    rasgo: "Alberca semiolímpica",
    direccion: "Junto al Paseo de los Lagos",
    referencia: { nombre: "Paseo de los Lagos", osm: "way/438542416" },
    coordenadas: [-96.9217696, 19.5205437],
    tiene: ["Alberca de 25 m", "Estudio de movilidad", "Ludoteca"],
    horario: { semana: [6, 22], finde: [7, 20] },
    capacidad: 260,
    ritmo: 1.12,
    accesibilidad:
      "Todo en una planta, con rampa; grúa para entrar a la alberca y vestidor accesible.",
    estacionamiento:
      "30 cajones gratis para socios, 2 de ellos para personas con discapacidad. Biciestacionamiento.",
  },
  {
    id: "macuiltepetl",
    nombre: "Macuiltépetl",
    rasgo: "Abierta las 24 horas",
    direccion: "Al pie del cerro Macuiltépetl",
    referencia: { nombre: "Parque Ecológico Macuiltépetl", osm: "way/1236749185" },
    coordenadas: [-96.9201254, 19.5474682],
    tiene: ["Acceso 24 horas", "Piso de pesas", "Zona de cardio"],
    horario: { semana: [0, 24], finde: [0, 24] },
    capacidad: 160,
    ritmo: 0.72,
    accesibilidad: "Rampa y elevador; área de pesas en planta baja y vestidor accesible.",
    estacionamiento:
      "60 cajones gratis, abiertos las 24 horas, con 3 para personas con discapacidad.",
  },
  {
    id: "tecajetes",
    nombre: "Tecajetes",
    rasgo: "Terraza de movilidad",
    direccion: "Frente al Parque de los Tecajetes",
    referencia: { nombre: "Parque de los Tecajetes", osm: "way/301356896" },
    coordenadas: [-96.9306243, 19.5317825],
    tiene: ["Terraza al aire libre", "Sala de ciclo", "Estudio de movilidad"],
    horario: { semana: [6, 22], finde: [7, 20] },
    capacidad: 180,
    ritmo: 0.95,
    accesibilidad:
      "Planta baja con rampa; los salones de clase del primer piso no tienen elevador.",
    estacionamiento:
      "Sin estacionamiento propio: cajones en la calle. Biciestacionamiento para 30.",
  },
  {
    id: "natura",
    nombre: "Natura",
    rasgo: "Ring de box y sala de ciclo",
    direccion: "A la entrada del Parque Natura",
    referencia: { nombre: "Parque Natura El Tejar Garnica", osm: "way/1236753020" },
    coordenadas: [-96.8923417, 19.514269],
    tiene: ["Ring de box", "Sala de ciclo", "Piso de fuerza"],
    horario: { semana: [6, 23], finde: [8, 20] },
    capacidad: 200,
    ritmo: 1.05,
    accesibilidad: "Todo en planta baja, con rampa y vestidor accesible.",
    estacionamiento:
      "Estacionamiento del Parque Natura, compartido; los socios no pagan las primeras dos horas.",
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
