// Diagnóstico gratuito: cinco preguntas que sugieren un régimen, avisan de riesgos y llevan a
// cotizar. Orientación general, no sustituye la revisión de un contador.
export const PREGUNTAS = [
  {
    id: "ingreso",
    texto: "¿Cómo ganas tu dinero?",
    opciones: [
      ["sueldo", "Solo con un sueldo"],
      ["cuenta", "Por mi cuenta: servicios u honorarios"],
      ["apps", "Con apps: transporte, hospedaje o ventas en línea"],
      ["rentas", "Rentando casas o locales"],
      ["negocio", "Con un negocio a mi nombre"],
      ["empresa", "Con una empresa o sociedad"],
    ],
  },
  {
    id: "monto",
    texto: "¿Cuánto ingresas al año, más o menos?",
    opciones: [
      ["bajo", "Menos de $1 millón"],
      ["medio", "Entre $1 y $3.5 millones"],
      ["alto", "Más de $3.5 millones"],
    ],
  },
  {
    id: "empleados",
    texto: "¿Tienes empleados?",
    opciones: [
      ["no", "No"],
      ["pocos", "De 1 a 5"],
      ["muchos", "Más de 5"],
    ],
  },
  {
    id: "corriente",
    texto: "¿Estás al corriente con el SAT?",
    opciones: [
      ["si", "Sí, todo presentado"],
      ["nose", "No estoy seguro"],
      ["no", "Debo declaraciones"],
    ],
  },
  {
    id: "buzon",
    texto: "¿Tienes activo tu buzón tributario?",
    opciones: [
      ["si", "Sí"],
      ["no", "No"],
      ["nose", "No sé qué es"],
    ],
  },
]

export function diagnosticar(r) {
  const alto = r.monto === "alto"
  const regimen =
    r.ingreso === "sueldo"
      ? "sueldos"
      : r.ingreso === "apps"
        ? "plataformas"
        : r.ingreso === "rentas"
          ? "arrendamiento"
          : r.ingreso === "empresa"
            ? "moral"
            : alto
              ? "empresarial"
              : "resico"
  const riesgos = []
  if (alto && ["cuenta", "negocio"].includes(r.ingreso))
    riesgos.push({
      nivel: "ojo",
      texto:
        "Con más de $3.5 millones al año no puedes estar en RESICO: te toca actividad empresarial.",
    })
  if (r.corriente === "no")
    riesgos.push({
      nivel: "mal",
      texto:
        "Tienes declaraciones pendientes. Si las presentas antes de que el SAT te lo pida, evitas la multa y solo pagas recargos.",
    })
  if (r.corriente === "nose")
    riesgos.push({
      nivel: "ojo",
      texto: "Revisa tu opinión de cumplimiento: dice en un minuto si te falta algo.",
    })
  if (r.buzon !== "si" && r.ingreso !== "sueldo")
    riesgos.push({
      nivel: r.buzon === "no" ? "mal" : "ojo",
      texto:
        "Sin buzón tributario activo, tu opinión de cumplimiento sale negativa y el SAT puede restringir tus sellos para facturar.",
    })
  if (r.empleados !== "no")
    riesgos.push({
      nivel: "ojo",
      texto:
        "Con empleados pagas cuotas del IMSS e INFONAVIT el día 17 y retienes su ISR: suma nómina a tu plan.",
    })
  if (!riesgos.length)
    riesgos.push({ nivel: "ok", texto: "Con lo que contestaste, no vemos riesgos inmediatos." })
  const empleados = { no: 0, pocos: 3, muchos: 8 }[r.empleados] ?? 0
  return { regimen, riesgos, empleados, regularizar: r.corriente === "no" }
}
