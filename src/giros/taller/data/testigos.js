// Testigos del tablero: qué pueden significar, qué tan urgente es y qué ofrece cada taller.
// Orientación general para la demo; no sustituye el manual del auto ni un diagnóstico.
export const URGENCIAS = {
  ya: { nombre: "Detente", nivel: "urgente" },
  pronto: { nombre: "Agenda pronto", nivel: "espera" },
  espera: { nombre: "Puede esperar", nivel: "bien" },
}

export const TESTIGOS = [
  {
    id: "motor",
    nombre: "Motor",
    titulo: "Revisar motor",
    que: "La computadora del auto detectó una falla: puede ser un sensor, una bujía, la tapa de gasolina mal cerrada o el catalizador.",
    hacer:
      "Si la luz está fija, maneja con cuidado y agenda pronto. Si parpadea, detente: el motor está fallando.",
    urgencia: "pronto",
    taller: {
      rosales: {
        servicio: "diagnostico",
        nota: "La leemos con escáner en 20 minutos y te decimos si urge o puede esperar.",
      },
      vertice: {
        servicio: "diagnostico",
        nota: "Te mandamos el código, fotos y la explicación por WhatsApp. Si es híbrido, lo atiende Arco Sur.",
      },
    },
  },
  {
    id: "aceite",
    nombre: "Aceite",
    titulo: "Presión de aceite",
    que: "El motor no está recibiendo aceite suficiente: nivel bajo, una fuga o la bomba de aceite.",
    hacer:
      "Detente en cuanto sea seguro y apaga el motor. Manejar así puede dañarlo en pocos minutos.",
    urgencia: "ya",
    taller: {
      rosales: {
        servicio: "domicilio",
        nota: "Si estás en la colonia, vamos a revisar el nivel y la fuga sin que muevas el auto.",
      },
      vertice: {
        servicio: "recoleccion",
        nota: "No lo manejes: pasamos por él con grúa de plataforma a cualquier punto de Xalapa.",
      },
    },
  },
  {
    id: "bateria",
    nombre: "Batería",
    titulo: "Carga de batería",
    que: "La batería no se está cargando: el alternador, la banda o la batería misma.",
    hacer:
      "Puedes llegar cerca, pero el auto se apagará cuando la batería se agote. Apaga el aire y el radio.",
    urgencia: "pronto",
    taller: {
      rosales: {
        servicio: "domicilio",
        nota: "Probamos batería y alternador donde estés, hasta 3 km del taller.",
      },
      vertice: {
        servicio: "diagnostico",
        nota: "Medimos batería, alternador y banda; la prueba se incluye en el diagnóstico.",
      },
    },
  },
  {
    id: "frenos",
    nombre: "Frenos",
    titulo: "Sistema de frenos",
    que: "El líquido de frenos está bajo, las balatas están gastadas o el freno de mano sigue puesto.",
    hacer:
      "Revisa primero el freno de mano. Si la luz sigue, maneja despacio hasta el taller o pide que vayamos.",
    urgencia: "ya",
    taller: {
      rosales: {
        servicio: "frenos",
        nota: "Revisamos balatas, discos y líquido; el precio es de las balatas delanteras.",
      },
      vertice: {
        servicio: "diagnostico",
        nota: "Medimos balatas y discos con fotos de cada rueda antes de cotizar.",
      },
    },
  },
  {
    id: "temperatura",
    nombre: "Temperatura",
    titulo: "Temperatura del motor",
    que: "El motor se está calentando: anticongelante bajo, una fuga, el termostato o el ventilador.",
    hacer: "Detente y apaga el motor. No abras el radiador en caliente: el líquido sale a presión.",
    urgencia: "ya",
    taller: {
      rosales: {
        servicio: "diagnostico",
        nota: "Hacemos prueba de presión al sistema de enfriamiento para encontrar la fuga.",
      },
      vertice: {
        servicio: "recoleccion",
        nota: "Pasamos por el auto sin que lo manejes y te mandamos el diagnóstico con fotos.",
      },
    },
  },
  {
    id: "llantas",
    nombre: "Llantas",
    titulo: "Presión de llantas",
    que: "Una o más llantas tienen menos aire del indicado. A veces es solo el frío de la mañana.",
    hacer:
      "Revisa la presión en la siguiente gasolinera. Si una llanta baja sola, puede traer un clavo.",
    urgencia: "espera",
    taller: {
      rosales: {
        servicio: null,
        nota: "Revisamos la presión y buscamos ponchaduras sin costo, aunque no sea cita.",
      },
      vertice: {
        servicio: "alineacion",
        nota: "La sucursal Lázaro Cárdenas revisa presión y ponchaduras sin costo; si hace falta, alinea y balancea.",
      },
    },
  },
]

export const findTestigo = (id) => TESTIGOS.find((t) => t.id === id)
