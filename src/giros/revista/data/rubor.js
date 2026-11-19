// Rubor: revista mensual ficticia de moda y celebridades (docs/FICHA_REVISTA.md). Personas,
// marcas, precios y textos son inventados; las fotos son de Unsplash y se sirven desde el sitio.
const foto = (clave, ancho = 1200) => `/revista/rubor/fotos/${clave}-${ancho}.webp`
export const fotoSrcSet = (clave) => `${foto(clave, 600)} 600w, ${foto(clave, 1200)} 1200w`
export { foto }

// Cada número tiene su paleta: el sitio entero toma sus colores del número que estás viendo.
export const PALETAS = {
  rojo: {
    noche: "#0A0204",
    fondo1: "#7A0614",
    fondo2: "#3A0309",
    hoja: "#17050A",
    linea: "#3A1219",
    acento: "#E3132F",
    acentoTexto: "#FF4259",
    sobreAcento: "#FFFFFF",
    humo: "#C2A6A1",
    brillo: "rgba(255, 40, 60, 0.45)",
  },
  azul: {
    noche: "#04081A",
    fondo1: "#1E3A8A",
    fondo2: "#0B1A45",
    hoja: "#0A1230",
    linea: "#1E2A4A",
    acento: "#D9B25C",
    acentoTexto: "#E8C77A",
    sobreAcento: "#04081A",
    humo: "#A9B3CC",
    brillo: "rgba(120, 160, 255, 0.40)",
  },
  cobre: {
    noche: "#0D0503",
    fondo1: "#7A2E12",
    fondo2: "#3A1608",
    hoja: "#1A0B06",
    linea: "#3E2116",
    acento: "#D9683A",
    acentoTexto: "#F08A5C",
    sobreAcento: "#0D0503",
    humo: "#C9AFA2",
    brillo: "rgba(240, 120, 70, 0.40)",
  },
  ciruela: {
    noche: "#0B030A",
    fondo1: "#6B0F4E",
    fondo2: "#330826",
    hoja: "#170614",
    linea: "#3A1433",
    acento: "#D63A8C",
    acentoTexto: "#F06AAE",
    sobreAcento: "#0B030A",
    humo: "#C7A9BC",
    brillo: "rgba(230, 70, 150, 0.40)",
  },
  ocre: {
    noche: "#0C0903",
    fondo1: "#6E4E0E",
    fondo2: "#352507",
    hoja: "#171106",
    linea: "#3A2E14",
    acento: "#D9A12B",
    acentoTexto: "#EDBB52",
    sobreAcento: "#0C0903",
    humo: "#C8B89A",
    brillo: "rgba(230, 170, 50, 0.38)",
  },
  grafito: {
    noche: "#070809",
    fondo1: "#3A3F46",
    fondo2: "#1B1E22",
    hoja: "#111316",
    linea: "#2B2F35",
    acento: "#E8E4DC",
    acentoTexto: "#F2EFE9",
    sobreAcento: "#070809",
    humo: "#AEB3BA",
    brillo: "rgba(230, 230, 230, 0.25)",
  },
}

export const EDITORA = "Andrea Roldán"
export const LECTORA = { nombre: "Ana Ruiz", iniciales: "AR" }

// Del más reciente al más antiguo. El primero es siempre la portada del sitio.
const ARCHIVO = [
  [22, "Septiembre", 2026, "Noches de gala", "053879", "ciruela", "Camila Ferré"],
  [21, "Agosto", 2026, "Perfiles", "403499", "ciruela", "Lía Montaner"],
  [20, "Julio", 2026, "Blanco de verano", "777550", "grafito", "Sun Meyer"],
  [19, "Junio", 2026, "Rosa campo", "293891", "rojo", "Renata Ibáñez"],
  [18, "Mayo", 2026, "Azul eléctrico", "741775", "azul", "Mara Ellis"],
  [17, "Abril", 2026, "Ellos visten", "360753", "grafito", "Nicolás Aranda"],
  [16, "Marzo", 2026, "Neón", "179647", "ciruela", "Abril Sotelo"],
  [15, "Febrero", 2026, "Amor propio", "862026", "rojo", "Dalia Ferrer"],
  [14, "Enero", 2026, "Empezar de cero", "530036", "grafito", "Irene Paz"],
  [13, "Diciembre", 2025, "Edición coleccionista", "778202", "ocre", "Mateo Larrea"],
  [12, "Noviembre", 2025, "Cuero y lluvia", "477894", "cobre", "Tobi Adeyemi"],
  [11, "Octubre", 2025, "Calle", "136881", "azul", "Alma Ruiz"],
  [10, "Septiembre", 2025, "Regreso", "579580", "cobre", "Paula Vidal"],
  [9, "Agosto", 2025, "Amarillo", "657613", "ocre", "Zoe Navarro"],
  [8, "Julio", 2025, "Mar abierto", "031218", "ocre", "Nina Campos"],
  [7, "Junio", 2025, "Denim", "905240", "azul", "Clara Ríos"],
  [6, "Mayo", 2025, "Ventana", "628813", "cobre", "Leo Varga"],
  [5, "Abril", 2025, "Primavera", "834685", "ocre", "Olivia Brand"],
  [4, "Marzo", 2025, "Rojo tierra", "574466", "rojo", "Maya Sol"],
  [3, "Febrero", 2025, "Hombres de traje", "211169", "grafito", "Gael Moreno"],
  [2, "Enero", 2025, "La ciudad", "691023", "azul", "Iker Salas"],
  [1, "Diciembre", 2024, "Primer número", "954732", "cobre", "Bruno Aldama"],
]

const COMPLETOS = [
  {
    n: 24,
    mes: "Noviembre",
    anio: 2026,
    tema: "Negro y rojo",
    paleta: "rojo",
    precio: "México $95",
    portada: {
      recorte: "portada-24",
      ancho: 741,
      alto: 1400,
      protagonista: ["Valeria", "Ocampo"],
      frase: "«No vine a pedir permiso»: la actriz habla de su primer papel protagónico",
      cifra: ["28", "piezas negras", "para todo el invierno"],
      derecha: [
        ["Especial", "Alfombra roja", "Los vestidos que se robaron la noche en Madrid"],
        ["Belleza", "Labios color vino", "Cómo llevarlos de día"],
      ],
      persona: "Valeria Ocampo",
    },
    sumarioFoto: "053879",
    sumario: [
      [12, "Carta de la editora", "Lo que nos dejó un año de rojo", "carta"],
      [24, "Valeria Ocampo", "Portada: una conversación sin guion", "entrevista"],
      [48, "Maison Alba", "Anuncio", "anuncio"],
      [66, "Negro absoluto", "Veintiocho piezas para el invierno", "reportaje"],
      [90, "Comentarios", "Lo que dicen nuestras lectoras", "comentarios"],
    ],
    carta: [
      "Este número empezó con una pregunta: ¿qué pasa cuando alguien deja de pedir permiso para ocupar el escenario? Valeria Ocampo nos respondió en una tarde larga en un estudio de Ciudad de México, entre cambios de vestuario y una taza de café que nunca se terminó.",
      "También hablamos de negro, el color que vuelve cada invierno y que este año llega con textura: terciopelo, piel y encaje. Lo vimos en las pasarelas de Madrid, Bogotá y Buenos Aires, y lo traemos aquí en veintiocho piezas.",
      "Y hablamos de rojo, porque este año fue nuestro. Gracias por leernos doce meses seguidos.",
    ],
    entrevista: {
      etiqueta: "Portada · Entrevista",
      titulo: "«No vine a pedir permiso»",
      bajada:
        "Valeria Ocampo llegó tarde al cine y temprano a todo lo demás. Hablamos con ella sobre su primer protagónico.",
      foto: "388940",
      gigante: "VALERIA",
      parrafos: [
        "La cita era a las diez y Valeria llegó a las diez en punto, con el pelo mojado y una chamarra de piel que había sido de su padre. «Es lo único que me traje de Guadalajara», dijo antes de sentarse.",
        "Tenía veintiséis años cuando le dijeron que ya era tarde para empezar. No les hizo caso: tomó clases de actuación por la noche y trabajó de día en una tienda de telas del centro, donde aprendió a distinguir la seda del poliéster con los ojos cerrados.",
        "Hoy protagoniza la película que abrió el festival de Morelia y se prepara para su primera obra de teatro en Madrid. Cuando le preguntamos qué la asusta, tarda en responder: «Que me guste demasiado y deje de cuidarlo».",
      ],
      cita: "«Me dijeron que ya era tarde. Yo pensé que apenas era temprano.»",
    },
    anuncio: { marca: "Maison Alba", lema: "Nueva fragancia · Noir", foto: "957992" },
    reportaje: {
      titulo: ["Negro", "absoluto"],
      bajada: "Veintiocho piezas para el invierno, de la mañana a la gala",
      fotos: ["053879", "777550", "403499"],
      parrafos: [
        "El negro no es un color de luto en esta temporada: es un color de textura. Terciopelo para la noche, piel suave para el día y encaje que aparece donde menos lo esperas.",
        "Recorrimos talleres de Oaxaca, Medellín y Valencia para elegir veintiocho piezas que se pueden combinar entre sí y durar más de un invierno. Ninguna es una marca real: son ejemplos para esta demo.",
      ],
    },
    comentarios: [
      [
        "Mariana F.",
        "hace 2 horas",
        "La entrevista con Valeria es de lo mejor que han publicado este año.",
      ],
      [
        "Javier L.",
        "hace 5 horas",
        "Ojalá el próximo número traiga más de los talleres de Oaxaca.",
      ],
      ["Sofía R.", "ayer", "El reportaje de negro me salvó el guardarropa de invierno."],
    ],
  },
  {
    n: 23,
    mes: "Octubre",
    anio: 2026,
    tema: "Azul medianoche",
    paleta: "azul",
    precio: "México $95",
    portada: {
      recorte: "portada-23",
      ancho: 1120,
      alto: 1400,
      protagonista: ["Inés", "Valdivia"],
      frase: "La cantante que convirtió el bolero en algo nuevo",
      cifra: ["12", "tonos de azul", "para la noche"],
      derecha: [
        ["Música", "Bolero eléctrico", "Una gira de Lima a Sevilla"],
        ["Belleza", "Delineado dorado", "El brillo justo para octubre"],
      ],
      persona: "Inés Valdivia",
    },
    sumarioFoto: "741775",
    sumario: [
      [10, "Carta de la editora", "Por qué octubre es azul", "carta"],
      [22, "Inés Valdivia", "Portada: cantar sin pedir perdón", "entrevista"],
      [44, "Atelier Norte", "Anuncio", "anuncio"],
      [58, "Doce azules", "Del cobalto al índigo, en doce prendas", "reportaje"],
      [86, "Comentarios", "Lo que dicen nuestras lectoras", "comentarios"],
    ],
    carta: [
      "Octubre siempre nos pareció un mes azul: las noches llegan antes y la ciudad se viste de otra forma. Este número es para esas noches.",
      "Inés Valdivia nos recibió en un estudio de grabación de Lima, entre micrófonos viejos y una guitarra que fue de su abuela. Habla del bolero como si fuera un idioma que todavía se está inventando.",
    ],
    entrevista: {
      etiqueta: "Portada · Entrevista",
      titulo: "Cantar sin pedir perdón",
      bajada:
        "Inés Valdivia creció escuchando boleros en la radio de su abuela. Hoy los canta con sintetizadores y llena teatros.",
      foto: "020798",
      gigante: "INÉS",
      parrafos: [
        "Inés tiene una regla: nunca canta una canción que no pueda tocar sola con la guitarra. «Si no aguanta así, no aguanta con nada», dice mientras afina.",
        "Su primer disco salió casi sin promoción y se volvió viral por una grabación hecha en un baño de hotel. Desde entonces ha tocado en Bogotá, Ciudad de México y Sevilla.",
        "Para la sesión de este número eligió azul: «Es el color de la hora en que empiezo a trabajar».",
      ],
      cita: "«El bolero no es nostalgia. Es la forma más directa de decir lo que sientes.»",
    },
    anuncio: { marca: "Atelier Norte", lema: "Colección Medianoche", foto: "611176" },
    reportaje: {
      titulo: ["Doce", "azules"],
      bajada: "Del cobalto al índigo, doce prendas para las noches de octubre",
      fotos: ["741775", "905240", "136881"],
      parrafos: [
        "El azul es el color más difícil de fotografiar: cambia con cada luz. Por eso lo probamos de noche, en la calle y bajo lámparas de sodio.",
        "Elegimos doce prendas, de un abrigo cobalto a unos jeans casi negros, todas de diseñadores ficticios creados para esta demo.",
      ],
    },
    comentarios: [
      ["Lucía M.", "hace 3 días", "No conocía a Inés y ya escuché su disco completo dos veces."],
      ["Andrés P.", "hace 4 días", "El reportaje de azules tiene las mejores fotos del año."],
    ],
  },
]

export const NUMEROS = [
  ...COMPLETOS.map((x) => ({ ...x, completo: true, foto: x.entrevista.foto })),
  ...ARCHIVO.map(([n, mes, anio, tema, foto, paleta, persona]) => ({
    n,
    mes,
    anio,
    tema,
    foto,
    paleta,
    completo: false,
    portada: { persona, protagonista: persona.split(" ") },
  })),
]

export const ACTUAL = NUMEROS[0]
export const findNumero = (n) => NUMEROS.find((x) => x.n === Number(n))
export const fechaNumero = (x) => `${x.mes} ${x.anio}`
