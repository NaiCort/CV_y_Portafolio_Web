// Fotos de Wikimedia Commons. Huellas y origen en public/gimnasio/medios-origen.json.
// Ilustran el ambiente; no son Brío, sus sucursales ni sus coaches.
export const FOTOS = {
  combate: {
    alt: "Dos personas practican golpes con guantes de box en un gimnasio",
    autor: "Senior Airman Zachary Foster, Fuerza Aérea de EE. UU.",
    licencia: "Dominio público",
    pagina:
      "https://commons.wikimedia.org/wiki/File:Training_for_Rumble_in_the_Deid_III_begins_(8614366).jpg",
  },
  ciclo: {
    alt: "Una instructora sonríe sobre una bicicleta fija en una clase de ciclo",
    autor: "Airman First Class Lynette Rolen, Fuerza Aérea de EE. UU.",
    licencia: "Dominio público",
    pagina:
      "https://commons.wikimedia.org/wiki/File:Through_Airmen%27s_Eyes,_FTAC_instructor_by_day,_Spin_instructor_by_night_150713-F-PT740-033.jpg",
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
export const MEDIOS = {
  combate: { foto: "combate", alt: FOTOS.combate.alt, video: null },
  fuerza: { foto: "press", alt: FOTOS.press.alt, video: "/gimnasio/videos/fuerza.mp4" },
  ciclo: { foto: "ciclo", alt: FOTOS.ciclo.alt, video: null },
}
