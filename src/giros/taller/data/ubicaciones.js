// Ubicaciones ficticias en Xalapa. Cada punto está junto a una calle o lugar real que sirve de
// referencia (consulta manual a OpenStreetMap/Nominatim, 16/11/2026); ahí no hay ningún
// taller. Rosales y Vértice son negocios distintos: no comparten zona. Horarios de ejemplo,
// por día de la semana (0 = domingo) en horas decimales; null = cerrado.
const SEMANA = (lv, sab, dom = null) => [dom, lv, lv, lv, lv, lv, sab]

export const LOCAL_ROSALES = {
  id: "rosales",
  nombre: "Mecánica Rosales",
  direccion: "Colonia Revolución, al norte de Xalapa",
  referencia: { nombre: "Calle Paseo de Xalapa", osm: "way/151252942" },
  coordenadas: [-96.9245, 19.5724],
  horario: SEMANA([8.5, 18.5], [8.5, 14]),
  llegar:
    "A tres calles del Boulevard Xalapa-Banderilla. Las rutas que suben a Banderilla paran en la esquina.",
  estacionamiento: "Tres lugares frente al taller; el auto en reparación se queda adentro.",
  accesibilidad: "Recepción a nivel de la calle, sin escalones; sala de espera con baño.",
  extras: [
    "Mecánico a domicilio hasta 3 km del taller",
    "Revisión de presión y ponchaduras sin costo",
    "Pago en efectivo, tarjeta o transferencia",
  ],
}

export const SUCURSALES_VERTICE = [
  {
    id: "animas",
    nombre: "Ánimas",
    especialidad: "Hojalatería y pintura",
    direccion: "Cerca de Plaza Ánimas, Fraccionamiento Vista Hermosa",
    referencia: { nombre: "Plaza Ánimas", osm: "way/220677840" },
    coordenadas: [-96.8839, 19.5208],
    horario: SEMANA([8, 19], [9, 15]),
    servicios: ["Cabina de pintura", "Trato directo con seis aseguradoras", "Auto sustituto"],
  },
  {
    id: "centro",
    nombre: "Centro",
    especialidad: "Mecánica general",
    direccion: "Sobre Av. Manuel Ávila Camacho, colonia del Maestro",
    referencia: { nombre: "Avenida Manuel Ávila Camacho", osm: "way/903454797" },
    coordenadas: [-96.9268, 19.5403],
    horario: SEMANA([8, 19], [8, 19]),
    servicios: ["Servicio por kilometraje", "Diagnóstico computarizado", "Sala de espera con wifi"],
  },
  {
    id: "arco-sur",
    nombre: "Arco Sur",
    especialidad: "Híbridos",
    direccion: "Sobre Av. Arco Sur, Nueva Herradura",
    referencia: { nombre: "Avenida Arco Sur", osm: "way/144693127" },
    coordenadas: [-96.8772, 19.5071],
    horario: SEMANA([8, 18], [9, 14]),
    servicios: [
      "Técnicos certificados en alto voltaje",
      "Batería, inversor y frenos regenerativos",
      "Cargador para autos eléctricos",
    ],
  },
  {
    id: "cardenas",
    nombre: "Lázaro Cárdenas",
    especialidad: "Llantas y alineación",
    direccion: "Sobre Av. Lázaro Cárdenas, colonia Miguel Hidalgo",
    referencia: { nombre: "Avenida Lázaro Cárdenas", osm: "way/153882616" },
    coordenadas: [-96.9112, 19.5474],
    horario: SEMANA([8, 20], [8, 20], [9, 14]),
    servicios: ["Alineación 3D", "Revisión de presión y ponchaduras sin costo", "Abre el domingo"],
  },
]

export const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
