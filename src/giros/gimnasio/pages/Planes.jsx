import { Link } from "react-router-dom"
import TablaPlanes from "../components/TablaPlanes"

const PREGUNTAS = [
  [
    "¿Hay cuota de inscripción?",
    "No. Pagas el mes de tu plan y nada más. Los precios ya incluyen IVA.",
  ],
  [
    "¿Cómo cancelo?",
    "Desde tu perfil, en un paso, cuando quieras. Te avisamos cinco días antes de cada renovación para que decidas con tiempo.",
  ],
  [
    "¿Puedo cambiar de plan?",
    "Sí. Subir de plan aplica de inmediato; bajar aplica en tu siguiente renovación.",
  ],
  [
    "¿Puedo congelar mi membresía?",
    "Sí, por viaje o por salud, hasta dos meses al año. No pagas mientras está congelada.",
  ],
  [
    "¿Qué es la sucursal base?",
    "La que eliges al darte de alta: ahí está tu locker y ves su aforo primero. Todos los planes abren las cinco sucursales.",
  ],
]

export default function Planes() {
  return (
    <>
      <section className="b-wrap b-planes b-planes-pagina" aria-labelledby="b-titulo">
        <h1 id="b-titulo" tabIndex={-1} className="b-d b-ancha">
          Planes
        </h1>
        <p className="b-lead">
          Tres membresías mes a mes, todas en las cinco sucursales. Precios de ejemplo con IVA; esta
          demo no cobra.
        </p>
        <TablaPlanes tituloId="b-titulo" />
      </section>
      <section className="b-wrap" aria-labelledby="b-prueba-titulo">
        <div className="b-prueba">
          <div>
            <h2 id="b-prueba-titulo" className="b-d b-angosta">
              Prueba antes de decidir
            </h2>
            <p className="b-lead">
              Tu primera clase es gratis, en la sucursal y disciplina que quieras. No necesitas
              membresía.
            </p>
          </div>
          <div className="b-acciones">
            <Link className="b-btn b-btn-p" to="/gimnasio/clases?prueba=1">
              Elegir mi clase de prueba
            </Link>
            <Link className="b-btn" to="/gimnasio/primera-visita">
              Cómo es la primera visita
            </Link>
          </div>
        </div>
      </section>
      <section className="b-wrap" aria-labelledby="b-preguntas-titulo">
        <div className="b-preguntas">
          <h2 id="b-preguntas-titulo" className="b-d b-angosta">
            Preguntas frecuentes
          </h2>
          {PREGUNTAS.map(([pregunta, respuesta]) => (
            <details key={pregunta}>
              <summary>{pregunta}</summary>
              <p>{respuesta}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
