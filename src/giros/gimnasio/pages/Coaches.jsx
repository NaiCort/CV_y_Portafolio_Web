import { useState } from "react"
import { Link } from "react-router-dom"
import EvaluacionPanel from "../components/EvaluacionPanel"
import { findCategoria } from "../data/clases"
import { COACHES, OBJETIVOS, PAQUETES, findCoach, nombrePaquete } from "../data/coaches"
import { findSucursal } from "../data/sucursales"
import { cuandoCita, pesos } from "../lib/formato"
import { categoriasDe, clasesPorSemana, sucursalesDe } from "../lib/evaluacion"
import { precioSocio } from "../lib/tienda"

function TuEvaluacion({ evaluacion, ahora, onCancelar }) {
  const [confirmar, setConfirmar] = useState(false)
  const c = findCoach(evaluacion.coach)
  return (
    <div className="b-tu-evaluacion">
      <p>
        <b>Tu evaluación</b> <span className="b-num">{evaluacion.id}</span>: con {c.nombre}{" "}
        {cuandoCita(evaluacion.fecha, ahora)} en {findSucursal(evaluacion.sucursal).nombre}.
      </p>
      {confirmar ? (
        <div className="b-acciones" role="group" aria-label="Confirmar cancelación">
          <button type="button" className="b-btn b-btn-p" onClick={onCancelar}>
            Sí, cancelar
          </button>
          <button type="button" className="b-btn" onClick={() => setConfirmar(false)}>
            Mantener
          </button>
        </div>
      ) : (
        <button type="button" className="b-btn" onClick={() => setConfirmar(true)}>
          Cancelar evaluación
        </button>
      )}
    </div>
  )
}

export default function Coaches({ evaluacion, esSocio, ahora, onEvaluacion, onAgregar }) {
  const [objetivo, setObjetivo] = useState("todos")
  const [panel, setPanel] = useState(null)
  const lista = COACHES.filter((c) => objetivo === "todos" || c.objetivos.includes(objetivo))
  const vigente = evaluacion && new Date(evaluacion.fecha) > ahora ? evaluacion : null
  return (
    <>
      <section className="b-wrap b-coaches-cabeza" aria-labelledby="b-titulo">
        <h1 id="b-titulo" tabIndex={-1} className="b-d b-angosta">
          Coaches
        </h1>
        <p className="b-lead">
          Seis coaches de planta que dan clases en las cinco sucursales y entrenan contigo uno a
          uno. Son personajes de ejemplo.
        </p>
      </section>

      <section className="b-wrap" aria-labelledby="b-eva-titulo">
        <div className="b-evaluacion">
          <div>
            <h2 id="b-eva-titulo" className="b-d b-media">
              Evaluación gratuita
            </h2>
            <p>
              45 minutos con un coach: platican lo que quieres lograr, prueban algunos movimientos
              básicos y sales con un plan para tus primeras cuatro semanas. No necesitas ser socio.
            </p>
          </div>
          {vigente ? (
            <TuEvaluacion
              evaluacion={vigente}
              ahora={ahora}
              onCancelar={() => onEvaluacion(null)}
            />
          ) : (
            <button type="button" className="b-btn b-btn-p" onClick={() => setPanel("mara")}>
              Agendar evaluación
            </button>
          )}
        </div>
      </section>

      <section className="b-wrap b-equipo" aria-labelledby="b-equipo-titulo">
        <h2 id="b-equipo-titulo" className="b-d b-media">
          El equipo
        </h2>
        <fieldset className="b-chips">
          <legend>¿Qué buscas?</legend>
          {[{ id: "todos", nombre: "Ver a todos" }, ...OBJETIVOS].map((o) => (
            <label key={o.id} className="b-chip">
              <input
                type="radio"
                name="objetivo-coach"
                checked={objetivo === o.id}
                onChange={() => setObjetivo(o.id)}
              />
              <span>{o.nombre}</span>
            </label>
          ))}
        </fieldset>
        <p className="b-oculto" role="status">
          {lista.length} {lista.length === 1 ? "coach" : "coaches"}
        </p>
        <ul className="b-coaches">
          {lista.map((c) => (
            <li key={c.id} className="b-coach">
              <div className="b-coach-nombre">
                <h3 className="b-d">{c.nombre}</h3>
                <p>{c.especialidad}</p>
              </div>
              <div className="b-coach-datos">
                <p className="b-coach-meta">
                  <span className="b-num">{c.anios}</span> años de experiencia ·{" "}
                  <span className="b-num">{clasesPorSemana(c.id)}</span> clases a la semana de{" "}
                  {categoriasDe(c.id)
                    .map((k) => findCategoria(k).nombre)
                    .join(" y ")}{" "}
                  ·{" "}
                  {sucursalesDe(c.id)
                    .map((s) => findSucursal(s).nombre)
                    .join(", ")}
                </p>
                <p>{c.enfoque}</p>
                <ul className="b-coach-formacion" aria-label={`Formación de ${c.nombre}`}>
                  {c.formacion.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="b-acciones">
                  <button type="button" className="b-btn" onClick={() => setPanel(c.id)}>
                    Evaluación con {c.nombre}
                  </button>
                  <Link className="b-inline" to={`/gimnasio/clases?coach=${c.id}`}>
                    Ver sus clases
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="paquetes" className="b-wrap b-paquetes" aria-labelledby="b-paquetes-titulo">
        <h2 id="b-paquetes-titulo" className="b-d b-media">
          Sesiones personales
        </h2>
        <p>
          Una hora con el coach que elijas, en cualquier sucursal. El plan Club ya incluye dos al
          mes y el plan Total, cuatro; estos paquetes son para entrenar más seguido. Socios: 10 %
          menos.
        </p>
        <ul className="b-paquetes-lista">
          {PAQUETES.map((p) => {
            const precio = esSocio ? precioSocio(p.precio) : p.precio
            return (
              <li key={p.id}>
                <span className="b-paquete-sesiones b-num">{p.sesiones}</span>
                <span className="b-paquete-nombre">
                  {nombrePaquete(p)}
                  <small>Vigencia de {p.vigenciaDias} días</small>
                </span>
                <span className="b-paquete-precio">
                  <b className="b-num">{pesos(precio)}</b>
                  <small className="b-num">
                    {pesos(Math.round(precio / p.sesiones))} por sesión
                    {esSocio ? " · socio" : ""}
                  </small>
                </span>
                <button
                  type="button"
                  className="b-btn"
                  onClick={() => onAgregar(p)}
                  aria-label={`Agregar al carrito: ${nombrePaquete(p)}`}
                >
                  Agregar al carrito
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {panel && (
        <EvaluacionPanel
          coachInicial={panel}
          previa={vigente}
          ahora={ahora}
          onConfirmar={onEvaluacion}
          onCerrar={() => setPanel(null)}
        />
      )}
    </>
  )
}
