// Dos talleres ficticios, uno por tema (docs/FICHA_TALLER.md). Personas, folios, placas,
// precios y número de contrato son de ejemplo. Precios en pesos, con IVA.
import { LOCAL_ROSALES, SUCURSALES_VERTICE } from "./ubicaciones"

export const CONTRATO_EJEMPLO = "1234-2026"

export const TALLERES = {
  rosales: {
    id: "rosales",
    nombre: "Mecánica Rosales",
    corto: "Rosales",
    descripcion: "taller familiar en la colonia Revolución, Xalapa, desde 1989",
    titulo: "Te decimos qué tiene tu auto antes de tocarlo",
    bajada:
      "Mecánica Rosales, taller familiar en la colonia Revolución desde 1989. Diagnóstico con escáner, presupuesto por escrito y tus piezas viejas de regreso.",
    telefono: "228 104 2236",
    direccion: "Colonia Revolución, al norte de Xalapa",
    local: LOCAL_ROSALES,
    horario: "Lunes a viernes de 8:30 a 18:30 · sábado de 8:30 a 14:00",
    garantia: "90 días o 5,000 km",
    manoDeObra: 450,
    foto: {
      id: "rosales",
      alt: "Interior de un taller pequeño: un auto rojo con el cofre abierto y un motor colgado de una grúa",
      ancho: 1280,
      alto: 854,
    },
    servicios: [
      {
        id: "diagnostico",
        nombre: "Diagnóstico con escáner",
        detalle: "Se descuenta si hacemos la reparación",
        precio: 350,
      },
      {
        id: "aceite",
        nombre: "Cambio de aceite y filtro",
        detalle: "Aceite sintético, motor de 4 cilindros",
        precio: 780,
      },
      {
        id: "afinacion",
        nombre: "Afinación mayor",
        detalle: "Bujías, filtros y limpieza de inyectores",
        precio: 1450,
      },
      {
        id: "frenos",
        nombre: "Balatas delanteras",
        detalle: "Incluye rectificar discos si hace falta",
        precio: 950,
      },
      {
        id: "usados",
        nombre: "Revisión antes de comprar un usado",
        detalle: "Reporte por escrito con fotos",
        precio: 600,
      },
      {
        id: "domicilio",
        nombre: "Mecánico a domicilio en la colonia",
        detalle: "Batería, arranque o revisión rápida, hasta 3 km del taller",
        precio: 250,
      },
    ],
    presupuesto: {
      titulo: "Así recibes tu presupuesto",
      puntos: [
        "Rojo es urgente, amarillo puede esperar, verde está bien.",
        "Firmas solo lo que quieres arreglar.",
        "Lo que cambiamos te lo regresamos al entregar.",
        "Garantía de 90 días o 5,000 km en mano de obra.",
      ],
    },
    orden: {
      folio: "R-2611-047",
      placas: "YHR-27-41",
      vehiculo: "Nissan Tsuru 2015 · gris",
      campo: ["Lo que notó", "Rechina al frenar y jala a la derecha"],
      sello: ["Recibido", "26 nov"],
      partidas: [
        { nivel: "urgente", texto: "Balatas delanteras al 10 %", precio: 950 },
        { nivel: "espera", texto: "Amortiguador trasero con fuga", precio: 1180 },
        { nivel: "bien", texto: "Aceite y filtro en buen estado", precio: null },
      ],
    },
  },
  vertice: {
    id: "vertice",
    nombre: "Vértice",
    corto: "Vértice",
    descripcion: "servicio automotriz multimarca con cuatro sucursales en Xalapa",
    titulo: "Tu auto, a la vista en todo momento",
    bajada:
      "Vértice, servicio multimarca con cuatro sucursales en Xalapa. Diagnóstico con fotos, recolección a domicilio y el historial de tus autos en Mi garaje.",
    telefono: "228 690 1100",
    direccion: "Cuatro sucursales en Xalapa",
    horario: "Lunes a sábado de 8:00 a 19:00",
    garantia: "6 meses o 10,000 km",
    manoDeObra: 620,
    foto: {
      id: "vertice",
      alt: "Nave de servicio con varios elevadores azules; un auto gris levantado y otro negro estacionado",
      ancho: 1280,
      alto: 960,
    },
    servicios: [
      {
        id: "kilometraje",
        nombre: "Servicio por kilometraje",
        detalle: "Según el manual de tu marca, sin perder la garantía de agencia",
        precio: 2190,
      },
      {
        id: "diagnostico",
        nombre: "Diagnóstico computarizado",
        detalle: "Reporte con fotos y video a tu WhatsApp",
        precio: 450,
      },
      {
        id: "hojalateria",
        nombre: "Hojalatería y pintura",
        detalle: "Trato directo con seis aseguradoras",
        precio: null,
        sinPrecio: "Cotización",
      },
      {
        id: "hibridos",
        nombre: "Revisión de híbridos",
        detalle: "Batería de alto voltaje, inversor y frenos regenerativos",
        precio: 1890,
      },
      {
        id: "alineacion",
        nombre: "Alineación y balanceo",
        detalle: "Equipo 3D con informe impreso",
        precio: 690,
      },
      {
        id: "recoleccion",
        nombre: "Recolección y entrega",
        detalle: "En toda Xalapa, sin costo con tu servicio",
        precio: 0,
        sinPrecio: "Incluida",
      },
    ],
    presupuesto: {
      titulo: "Autorizas desde tu teléfono",
      puntos: [
        "Fotos y video de cada partida a tu WhatsApp.",
        "Rojo es urgente, amarillo puede esperar, verde está bien.",
        "Las piezas cambiadas te esperan en la sucursal.",
        "Garantía de 6 meses o 10,000 km, válida en las cuatro sucursales.",
      ],
    },
    orden: {
      folio: "VX-CEN-1182",
      placas: "YKZ-418-B",
      vehiculo: "Mazda 3 2019 · rojo",
      campo: ["Sucursal", "Centro · asesora Paola"],
      sello: ["Autorizado", "por WhatsApp"],
      partidas: [
        { nivel: "urgente", texto: "Llantas traseras a 2 mm", precio: 3980 },
        { nivel: "espera", texto: "Servicio de 60,000 km", precio: 2190 },
        { nivel: "bien", texto: "Frenos dentro de rango", precio: null },
      ],
    },
    garaje: {
      auto: "Mazda 3 2019",
      km: 62300,
      ultimo: 60000,
      siguiente: 70000,
    },
    sucursales: SUCURSALES_VERTICE,
  },
}

export const NIVELES_PARTIDA = {
  urgente: "Urgente",
  espera: "Puede esperar",
  bien: "En buen estado",
}

export const findServicio = (taller, id) => taller.servicios.find((s) => s.id === id)
