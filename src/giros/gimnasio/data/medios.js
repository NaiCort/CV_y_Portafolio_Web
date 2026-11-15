// Fotos de Wikimedia Commons. Huellas y origen en public/gimnasio/medios-origen.json.
// Ilustran el ambiente; no son Brío, sus sucursales ni sus coaches.
export const FOTOS = {
  sparring: {
    alt: "Un coach y una boxeadora practican desplazamientos y golpes en un gimnasio",
    autor:
      "Senior Airman Violette Hosack, Fuerza Aérea de EE. UU. (video «Airmen trains for Rumble in the Deid IV»)",
    licencia: "Dominio público",
    cambios: "Tramo de 2 s recortado, en blanco y negro y en bucle de ida y vuelta; sin audio.",
    pagina:
      "https://commons.wikimedia.org/wiki/File:Airmen_trains_for_Rumble_in_the_Deid_IV_(955484).webm",
  },
  grupo: {
    alt: "Un grupo pedalea en bicicletas fijas durante una clase de ciclo",
    autor: "RN7 (video «Kiwanis Spinning Event haalt 10.000 euro op voor Leontienhuis»)",
    licencia: "CC BY 3.0",
    cambios:
      "Tramo de 2.6 s recortado para quitar logotipos, en blanco y negro y en bucle de ida y vuelta; sin audio.",
    pagina:
      "https://commons.wikimedia.org/wiki/File:Kiwanis_Spinning_Event_haalt_10.000_euro_op_voor_Leontienhuis.webm",
  },
  press: {
    alt: "Una persona levanta una barra con discos por encima de la cabeza frente a un rack",
    autor: "FitnessScape (video «Half rack resistance exercise workout»)",
    licencia: "CC BY 3.0",
    cambios: "Tramo de 2 s recortado, en blanco y negro y en bucle de ida y vuelta; sin audio.",
    pagina: "https://commons.wikimedia.org/wiki/File:Half_rack_resistance_exercise_workout.webm",
  },
  socia: {
    alt: "",
    autor: "Николай Панченко (Nikolái Pánchenko)",
    licencia: "CC BY-SA 4.0",
    pagina: "https://commons.wikimedia.org/wiki/File:Fitness_Trainer_at_Starcomplex_Gym.jpg",
  },
}

// Medio de cada disciplina: video en bucle cuando lo hay, foto como póster y respaldo.
// Movilidad y Ritmo no tienen todavía un medio propio con licencia libre.
// Fuerza, Combate y Ciclo: bucles cortos de Wikimedia Commons (docs/ESTADO_V4.4.5.md).
export const MEDIOS = {
  combate: { foto: "sparring", alt: FOTOS.sparring.alt, video: "/gimnasio/videos/combate.mp4" },
  fuerza: { foto: "press", alt: FOTOS.press.alt, video: "/gimnasio/videos/fuerza.mp4" },
  ciclo: { foto: "grupo", alt: FOTOS.grupo.alt, video: "/gimnasio/videos/ciclo.mp4" },
}
