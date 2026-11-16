import { Link } from "react-router-dom"
import TablaPlanes from "../components/TablaPlanes"
import { OPINIONES } from "../data/opiniones"

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
    "¿Cobran mantenimiento anual?",
    "No. Solo pagas la mensualidad de tu plan: no hay cuota anual, cargo por locker ni cobros que aparezcan después en tu estado de cuenta.",
  ],
  [
    "¿Qué pasa si cierra una sucursal?",
    "Tu membresía sigue valiendo en las otras cuatro. Si cierra la tuya y ninguna otra te queda cerca, cancelas sin costo y te devolvemos los días pagados que no usaste. Por eso no vendemos anualidades: nunca pagas más de un mes por adelantado.",
  ],
  [
    "¿Tienen seguro y atención médica?",
    "Cada sucursal tiene seguro de responsabilidad civil, botiquín, desfibrilador y personal con curso de primeros auxilios en todos los turnos.",
  ],
  [
    "¿Puedo leer el contrato antes de firmar?",
    "Sí: el alta te lo muestra completo en el paso del reglamento, antes de firmar, y te enviaríamos una copia. Un club real debe registrar su contrato de adhesión ante Profeco; esta demo no tiene contrato real.",
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
        <p className="b-sin-cobros">
          <strong>Lo que no cobramos:</strong> inscripción, mantenimiento anual, anualidades ni
          penalización por cancelar. Pagas el mes de tu plan y nada más.
        </p>
      </section>
      <section className="b-wrap b-opiniones" aria-labelledby="b-opiniones-titulo">
        <h2 id="b-opiniones-titulo" className="b-d b-media">
          Lo que dicen en el club
        </h2>
        <p className="b-nota">
          Opiniones de ejemplo: las personas y lo que dicen son inventados para esta demo.
        </p>
        <ul>
          {OPINIONES.map((o) => (
            <li key={o.id}>
              <figure>
                <blockquote>
                  <p>«{o.texto}»</p>
                </blockquote>
                <figcaption>
                  <b>{o.nombre}</b> · {o.detalle}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
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
