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
  fuerza: {
    alt: "Una persona levanta una barra con discos en un rack de sentadillas",
    autor: "Airman 1st Class Jovante Johnson, Fuerza Aérea de EE. UU.",
    licencia: "Dominio público",
    pagina: "https://commons.wikimedia.org/wiki/File:Watch_me_lift_(5047995).jpg",
  },
  ciclo: {
    alt: "Una instructora sonríe sobre una bicicleta fija en una clase de ciclo",
    autor: "Airman First Class Lynette Rolen, Fuerza Aérea de EE. UU.",
    licencia: "Dominio público",
    pagina:
      "https://commons.wikimedia.org/wiki/File:Through_Airmen%27s_Eyes,_FTAC_instructor_by_day,_Spin_instructor_by_night_150713-F-PT740-033.jpg",
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
  fuerza: { foto: "fuerza", alt: FOTOS.fuerza.alt, video: null },
  ciclo: { foto: "ciclo", alt: FOTOS.ciclo.alt, video: null },
}
