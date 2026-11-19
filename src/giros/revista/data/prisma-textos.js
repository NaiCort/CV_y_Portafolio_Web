// Texto completo de los dos números que se leen en el sitio (N.º 24 y N.º 23).
// Investigaciones, datos, instituciones y referencias son ficticios: sirven para mostrar cómo
// se lee un artículo de acceso abierto, no son resultados reales.

const ANDROMEDA = {
  recibido: "2 de agosto de 2026",
  aceptado: "21 de octubre de 2026",
  revisores: 2,
  claves: ["Andrómeda", "fotometría", "luz difusa", "telescopios pequeños"],
  enBreve: [
    "Medimos el brillo de Andrómeda en 412 noches con tres telescopios de 40 cm.",
    "Entre 9 y 14 kiloparsecs del centro hay entre 18 % y 23 % más luz de la que suman sus estrellas.",
    "Proponemos que viene de estrellas viejas y débiles arrancadas a galaxias satélite, y cómo comprobarlo.",
  ],
  secciones: [
    {
      id: "introduccion",
      titulo: "Introducción",
      parrafos: [
        "Andrómeda es la galaxia grande más cercana a la nuestra: su luz tarda unos dos millones y medio de años en llegar. Por eso es el mejor laboratorio para entender cómo crecen las galaxias espirales, incluida la Vía Láctea.",
        "Si contamos una por una las estrellas que los grandes telescopios alcanzan a separar y sumamos su luz, deberíamos obtener el brillo total de la galaxia. En la mayor parte del disco las cuentas cuadran. En un anillo a media distancia del centro, no: sobra luz.",
        "Esa diferencia se había visto antes en imágenes sueltas y se atribuía al cielo nocturno o a la óptica de cada instrumento. Nuestro objetivo fue medirla con cuidado durante tres años y descartar, una por una, esas explicaciones.",
      ],
    },
    {
      id: "metodos",
      titulo: "Métodos",
      parrafos: [
        "Usamos tres telescopios de 40 cm en sitios con cielo oscuro, con la misma cámara y los mismos filtros. Elegir instrumentos pequeños fue deliberado: cualquier universidad o club de astronomía de la región puede repetir la medición.",
        "Cada noche tomamos imágenes de la galaxia y, a la misma altura sobre el horizonte, de un campo vacío cercano. Restar ese campo vacío elimina el brillo del cielo, que cambia con la Luna, la humedad y las luces de las ciudades.",
        "Para la luz de las estrellas partimos de un catálogo de 1.2 millones de estrellas resueltas por telescopios espaciales, al que sumamos la contribución esperada de las que son demasiado débiles para verse, según modelos de población estelar.",
      ],
      tabla: {
        titulo: "Tabla 1. Instrumentos y noches útiles",
        columnas: ["Sitio (ficticio)", "Altitud", "Noches útiles", "Brillo del cielo"],
        filas: [
          ["Observatorio del Altiplano", "4,100 m", "171", "21.8 mag/arcsec²"],
          ["Estación Austral", "2,450 m", "138", "21.5 mag/arcsec²"],
          ["Sierra de las Ánimas", "2,800 m", "103", "21.6 mag/arcsec²"],
        ],
        nota: "Una noche es útil si el cielo estuvo despejado al menos cuatro horas con la galaxia por encima de 40° de altura.",
      },
    },
    {
      id: "resultados",
      titulo: "Resultados",
      parrafos: [
        "Hasta 8 kiloparsecs del centro, la luz medida y la luz que suman las estrellas coinciden dentro del error. A partir de ahí se separan: entre 9 y 14 kiloparsecs medimos entre 18 % y 23 % más luz de la que explican las estrellas (figura 1).",
        "El exceso aparece igual en los tres sitios y en los tres años, y no cambia con la fase de la Luna. Eso descarta que venga del cielo o de un instrumento en particular.",
        "Además, la luz que sobra es más roja que la del disco. Las estrellas jóvenes son azules; una luz roja y difusa apunta a estrellas viejas y frías.",
      ],
      figura: "andromeda-perfil",
    },
    {
      id: "discusion",
      titulo: "Discusión",
      parrafos: [
        "La explicación que mejor encaja es una población de estrellas viejas y débiles, demasiado tenues para verse una a una, repartidas en un anillo. Andrómeda ha absorbido varias galaxias satélite a lo largo de su historia; sus restos podrían ser esa luz.",
        "Otras explicaciones, como polvo que refleja la luz de estrellas cercanas, producirían una luz más azul y concentrada en los brazos espirales, que no es lo que vemos (figura 2).",
        "Nuestro estudio tiene límites: tres sitios en el mismo hemisferio y un solo juego de filtros. Una prueba independiente con otros filtros, sobre todo en el infrarrojo, permitiría confirmar la edad de esas estrellas.",
      ],
      figura: "andromeda-color",
    },
    {
      id: "conclusiones",
      titulo: "Conclusiones",
      parrafos: [
        "Andrómeda tiene más luz de la que sumamos con sus estrellas visibles, en un anillo a media distancia del centro. La luz es roja y difusa, y es la misma desde tres sitios durante tres años.",
        "Publicamos las imágenes, los catálogos y el código para que cualquier grupo con un telescopio pequeño pueda repetir la medición. Invitamos a otros observatorios de la región a sumar noches en el otoño de 2027.",
      ],
    },
  ],
  figuras: {
    "andromeda-perfil": {
      tipo: "lineas",
      titulo: "Figura 1. Brillo de Andrómeda según la distancia al centro",
      pie: "La luz medida (ámbar) se separa de la suma de las estrellas (azul) a partir de unos 9 kiloparsecs. Datos de ejemplo.",
      ejeX: "Distancia al centro (kpc)",
      ejeY: "Brillo relativo",
      x: [2, 4, 6, 8, 10, 12, 14, 16],
      series: [
        ["Luz medida", "am", [100, 74, 55, 41, 35, 29, 22, 14]],
        ["Suma de estrellas", "az", [100, 73, 54, 40, 29, 24, 18, 13]],
      ],
    },
    "andromeda-color": {
      tipo: "barras",
      titulo: "Figura 2. Color de la luz que sobra comparada con el disco",
      pie: "Índice de color (más alto, más rojo). La luz que sobra es más roja que el disco y que la luz reflejada por polvo. Datos de ejemplo.",
      ejeY: "Índice de color g − r",
      barras: [
        ["Disco", 0.62, "az"],
        ["Luz que sobra", 0.81, "am"],
        ["Polvo (modelo)", 0.44, "gr"],
      ],
    },
  },
  referencias: [
    "Arrieta, L. y Montes, R. (2024). Fotometría de bajo brillo con telescopios de 40 cm. Revista Austral de Astronomía, 12(3), 44–61. (Referencia ficticia).",
    "Ibarra, T. (2023). El cielo del altiplano: diez años de mediciones de brillo nocturno. Boletín del Observatorio del Altiplano, 8, 1–19. (Referencia ficticia).",
    "Quintero, M., Salas, F. y Robles, A. (2021). Galaxias satélite absorbidas por Andrómeda. Anales de Astrofísica Latina, 33, 210–232. (Referencia ficticia).",
    "Pereda, J. (2019). Modelos de población estelar para estrellas débiles. Cuadernos de Física Estelar, 5(1), 7–30. (Referencia ficticia).",
    "Red de Ciencia Abierta (2025). Guía para publicar imágenes astronómicas con sus datos. (Documento ficticio).",
  ],
  datos: "Imágenes, catálogo y código: repositorio de ejemplo de Prisma (no existe).",
  financiamiento:
    "Fondo Regional de Ciencia Básica (ficticio). Los autores declaran no tener conflictos de interés.",
  comentarios: [
    [
      "Mateo Ugarte",
      "hace 2 días",
      "Muy claro el método del campo vacío. ¿Publicarán también las noches que descartaron? Ayudaría a quien quiera repetirlo.",
    ],
    [
      "Lucía Arrieta (autora)",
      "hace 1 día",
      "Sí: el registro completo de noches, incluidas las descartadas y el motivo, va en la versión 2 junto con los datos.",
    ],
    [
      "Club de Astronomía Cerro Azul",
      "hace 5 horas",
      "Tenemos un telescopio de 40 cm. Nos anotamos para el otoño de 2027.",
    ],
  ],
}

const ADN = {
  recibido: "12 de julio de 2026",
  aceptado: "30 de septiembre de 2026",
  revisores: 3,
  claves: ["ADN no codificante", "regulación génica", "temperatura", "genómica comparada"],
  enBreve: [
    "Comparamos 400 genomas de personas que viven entre 0 y 4,000 m de altitud.",
    "Encontramos 37 regiones que no fabrican proteínas pero encienden o apagan genes vecinos según la temperatura.",
    "Tres de ellas cambian su actividad más del doble entre 18 °C y 30 °C en células cultivadas.",
  ],
  secciones: [
    {
      id: "introduccion",
      titulo: "Introducción",
      parrafos: [
        "Solo una pequeña parte de nuestro ADN contiene las instrucciones para fabricar proteínas. El resto, más del 90 %, se llamó durante años «ADN basura» porque no se sabía para qué servía.",
        "Hoy sabemos que buena parte de ese ADN funciona como interruptor: decide cuándo, dónde y cuánto se usa un gen. Lo que no está claro es si esos interruptores responden al ambiente, por ejemplo a la temperatura.",
        "Nos preguntamos si las personas que viven en climas muy distintos tienen diferencias en esos interruptores y si, en el laboratorio, la temperatura cambia lo que hacen.",
      ],
    },
    {
      id: "metodos",
      titulo: "Métodos",
      parrafos: [
        "Analizamos los genomas de 400 personas voluntarias de cuatro regiones con clima distinto, de la costa a la alta montaña. Todas dieron su consentimiento informado y los datos se guardaron sin nombres.",
        "Buscamos regiones no codificantes cuya secuencia cambiara de forma consistente con el clima de origen. Después copiamos esas regiones en células cultivadas y medimos la actividad del gen vecino a 18, 22, 26 y 30 °C.",
        "Cada medición se repitió seis veces en días distintos, y otro laboratorio repitió a ciegas las tres regiones con mayor efecto.",
      ],
      tabla: {
        titulo: "Tabla 1. Participantes por región",
        columnas: ["Región (ficticia)", "Altitud media", "Temperatura media", "Genomas"],
        filas: [
          ["Costa del Golfo", "20 m", "26 °C", "104"],
          ["Valle Central", "1,400 m", "20 °C", "98"],
          ["Sierra Alta", "2,700 m", "14 °C", "101"],
          ["Altiplano", "3,900 m", "9 °C", "97"],
        ],
        nota: "Las regiones y sus cifras son de ejemplo.",
      },
    },
    {
      id: "resultados",
      titulo: "Resultados",
      parrafos: [
        "Encontramos 37 regiones no codificantes con diferencias consistentes entre climas. Ninguna fabrica proteínas; todas están a menos de 50,000 letras de un gen conocido.",
        "En células cultivadas, 21 de las 37 cambiaron la actividad de su gen vecino con la temperatura. Tres la duplicaron o más entre 18 °C y 30 °C (figura 1).",
        "Los genes vecinos de esas tres regiones participan en cómo la célula maneja el calor y la energía, lo que da sentido biológico al resultado.",
      ],
      figura: "adn-temperatura",
    },
    {
      id: "discusion",
      titulo: "Discusión",
      parrafos: [
        "Los resultados sugieren que parte del ADN no codificante actúa como un termostato: ajusta genes según la temperatura. Las variantes más comunes en cada región podrían reflejar una adaptación al clima.",
        "Hay que ser prudentes. Una célula cultivada no es un cuerpo, y 400 genomas son pocos para hablar de evolución. Las diferencias entre regiones también pueden deberse a la historia de cada población y no al clima (figura 2).",
        "El siguiente paso es medir estas regiones en tejido humano donado y en más poblaciones, incluidas regiones cálidas de altura, para separar el efecto del clima del de la altitud.",
      ],
      figura: "adn-regiones",
    },
    {
      id: "conclusiones",
      titulo: "Conclusiones",
      parrafos: [
        "Al menos 21 regiones de ADN que no fabrican proteínas cambian lo que hacen sus genes vecinos según la temperatura. Llamarlas «basura» ya no tiene sentido.",
        "Publicamos la lista de regiones, los protocolos y los datos agregados (sin información personal) para que otros grupos puedan repetir y ampliar el estudio.",
      ],
    },
  ],
  figuras: {
    "adn-temperatura": {
      tipo: "lineas",
      titulo: "Figura 1. Actividad del gen vecino según la temperatura",
      pie: "Tres regiones con mayor efecto (R7, R19 y R31) frente a una región de control. Actividad relativa a 18 °C. Datos de ejemplo.",
      ejeX: "Temperatura (°C)",
      ejeY: "Actividad relativa",
      x: [18, 22, 26, 30],
      series: [
        ["R7", "am", [1, 1.4, 1.9, 2.4]],
        ["R19", "az", [1, 1.3, 1.7, 2.1]],
        ["R31", "ve", [1, 1.2, 1.6, 2.0]],
        ["Control", "gr", [1, 1.02, 0.98, 1.01]],
      ],
    },
    "adn-regiones": {
      tipo: "barras",
      titulo: "Figura 2. Regiones con diferencias entre climas, por grupo de cromosomas",
      pie: "Número de las 37 regiones encontradas en cada grupo de cromosomas. Datos de ejemplo.",
      ejeY: "Regiones",
      barras: [
        ["1 a 5", 12, "am"],
        ["6 a 10", 9, "az"],
        ["11 a 15", 7, "az"],
        ["16 a 22", 6, "az"],
        ["X", 3, "gr"],
      ],
    },
  },
  referencias: [
    "Solano, M. (2025). Interruptores del genoma: una guía para no especialistas. Gaceta de Genómica del Pacífico, 4, 12–29. (Referencia ficticia).",
    "Ferrán, D. y Ríos, P. (2024). Comparación de genomas a gran escala con equipo modesto. Revista de Bioinformática Aplicada, 9(2), 101–118. (Referencia ficticia).",
    "Aranda, C., Lugo, E. y Paz, N. (2022). Temperatura y expresión génica en células humanas. Archivos de Biología Celular, 17, 300–321. (Referencia ficticia).",
    "Comité de Ética del Centro de Genómica del Pacífico (2026). Protocolo de consentimiento para estudios de genoma completo. (Documento ficticio).",
  ],
  datos:
    "Lista de regiones, protocolos y datos agregados: repositorio de ejemplo de Prisma (no existe). Los genomas individuales no se publican.",
  financiamiento:
    "Programa de Genómica para la Salud (ficticio). Los autores declaran no tener conflictos de interés.",
  comentarios: [
    [
      "Renata Olmos",
      "hace 4 días",
      "Me gustó que separen el efecto del clima del de la historia de cada población. ¿Planean incluir regiones cálidas de altura?",
    ],
    [
      "Diego Ferrán (autor)",
      "hace 3 días",
      "Sí, es justo el siguiente paso: estamos buscando grupos en valles cálidos por encima de 2,000 m.",
    ],
  ],
}

export const TEXTOS = { andromeda: ANDROMEDA, "adn-no-codificante": ADN }
export const textoDe = (id) => TEXTOS[id]

// Cita en formato APA para copiar.
export function cita(articulo, nombres) {
  const partes = nombres.map((n) => {
    const [nombre, ...apellidos] = n.split(" ")
    return `${apellidos.join(" ")}, ${nombre[0]}.`
  })
  const autores =
    partes.length > 1 ? `${partes.slice(0, -1).join(", ")} y ${partes.at(-1)}` : partes[0]
  const anio = articulo.fechaIso.slice(0, 4)
  return `${autores} (${anio}). ${articulo.titulo}. Prisma, 4(${articulo.n}). https://doi.org/10.0000/prisma.2026.${String(articulo.n).padStart(3, "0")} (DOI de ejemplo)`
}
