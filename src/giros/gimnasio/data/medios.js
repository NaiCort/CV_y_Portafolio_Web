// Fotos y videos de Wikimedia Commons. Huellas y origen en public/gimnasio/medios-origen.json.
// Ilustran el ambiente; no son Brío, sus sucursales ni sus coaches.
export const FOTOS = {
  fuerza: {
    alt: "Un hombre levanta una barra por encima de la cabeza frente a un rack",
    autor: "FitnessScape (video «Half rack resistance exercise workout»)",
    licencia: "CC BY 3.0",
    cambios: "Toma continua de 7.7 s, recortada para dejar fuera los letreros; sin audio.",
    pagina: "https://commons.wikimedia.org/wiki/File:Half_rack_resistance_exercise_workout.webm",
  },
  combate: {
    alt: "Un coach y una boxeadora practican desplazamientos y golpes en un gimnasio",
    autor:
      "Senior Airman Violette Hosack, Fuerza Aérea de EE. UU. (video «Airmen trains for Rumble in the Deid IV»)",
    licencia: "Dominio público",
    cambios: "Montaje de cuatro tomas (9.4 s), recortado; sin audio.",
    pagina:
      "https://commons.wikimedia.org/wiki/File:Airmen_trains_for_Rumble_in_the_Deid_IV_(955484).webm",
  },
  ciclo: {
    alt: "Un grupo pedalea en bicicletas fijas durante una clase de ciclo",
    autor: "RN7 (video «Kiwanis Spinning Event haalt 10.000 euro op voor Leontienhuis»)",
    licencia: "CC BY 3.0",
    cambios:
      "Montaje de tres tomas (9.6 s), recortado para quitar logotipos y letreros; sin audio.",
    pagina:
      "https://commons.wikimedia.org/wiki/File:Kiwanis_Spinning_Event_haalt_10.000_euro_op_voor_Leontienhuis.webm",
  },
  socia: {
    alt: "",
    autor: "Николай Панченко (Nikolái Pánchenko)",
    licencia: "CC BY-SA 4.0",
    pagina: "https://commons.wikimedia.org/wiki/File:Fitness_Trainer_at_Starcomplex_Gym.jpg",
  },
}

// Medio de cada disciplina: póster fijo en blanco y negro; el video en color corre solo al
// pasar el ratón, enfocar o tocar la tarjeta. Movilidad y Ritmo no tienen todavía un medio
// propio con licencia libre.
export const MEDIOS = Object.fromEntries(
  ["fuerza", "combate", "ciclo"].map((id) => [
    id,
    { foto: id, alt: FOTOS[id].alt, video: `/gimnasio/videos/${id}.mp4` },
  ]),
)
