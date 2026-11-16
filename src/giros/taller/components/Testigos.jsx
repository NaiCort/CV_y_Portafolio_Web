import { useState } from "react"
import { Link } from "react-router-dom"
import { TESTIGOS, URGENCIAS, findTestigo } from "../data/testigos"
import { findServicio } from "../data/talleres"
import { precioServicio } from "../lib/formato"

const t = { fill: "none", stroke: "currentColor", strokeWidth: 1.7 }
const r = { ...t, strokeLinecap: "round", strokeLinejoin: "round" }
// Dibujos propios de los testigos (símbolos de tablero simplificados).
const ICONOS = {
  motor: <path {...r} d="M5 9h3l1-2h5l1 2h2v2h2v4h-2v2h-3l-2 2H8l-1-2H5z" />,
  aceite: (
    <>
      <path {...r} d="M3 11h6l2-2h7l3-2-3 7H7l-2-2H3z" />
      <path
        {...r}
        d="M20 15.5c0 .9-.6 1.5-1.2 1.5s-1.2-.6-1.2-1.5.6-1.6 1.2-2.4c.6.8 1.2 1.5 1.2 2.4z"
      />
    </>
  ),
  bateria: <path {...r} d="M4 8h16v10H4z M7 8V6h3v2 M14 8V6h3v2 M7 13h3 M14 13h3 M15.5 11.5v3" />,
  frenos: (
    <>
      <circle {...t} cx="12" cy="12" r="5" />
      <path {...r} d="M6 6a8.5 8.5 0 0 0 0 12 M18 6a8.5 8.5 0 0 1 0 12 M12 9.5v3 M12 14.4v.1" />
    </>
  ),
  temperatura: (
    <path
      {...r}
      d="M12 4v9 M12 4h3 M12 7h3 M12 10h3 M9.5 15.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0 M5 19c2 1 3-1 5 0s3 1 5 0 3-1 4 0"
    />
  ),
  llantas: <path {...r} d="M7 7c-2 3-2 7 0 10h10c2-3 2-7 0-10 M12 9v4 M12 15v.1" />,
}

export function IconoTestigo({ id }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {ICONOS[id]}
    </svg>
  )
}

// «¿Qué luz se encendió?»: seis testigos y la lectura del elegido para el taller del tema.
export default function Testigos({ taller }) {
  const [elegido, setElegido] = useState("motor")
  const testigo = findTestigo(elegido)
  const oferta = testigo.taller[taller.id]
  const servicio = oferta.servicio ? findServicio(taller, oferta.servicio) : null
  const urgencia = URGENCIAS[testigo.urgencia]
  return (
    <>
      <div className="t-tablero" role="group" aria-label="Testigos del tablero">
        {TESTIGOS.map((x) => (
          <button
            key={x.id}
            type="button"
            className="t-testigo"
            aria-pressed={x.id === elegido}
            aria-controls="t-lectura"
            onClick={() => setElegido(x.id)}
          >
            <IconoTestigo id={x.id} />
            <span>{x.nombre}</span>
          </button>
        ))}
      </div>
      <div id="t-lectura" className="t-lectura" aria-live="polite" key={elegido}>
        <div className="t-lectura-cab">
          <h3>{testigo.titulo}</h3>
          <span className={`t-urgencia t-nivel-${urgencia.nivel}`}>
            <i aria-hidden="true" />
            {urgencia.nombre}
          </span>
        </div>
        <div className="t-lectura-cuerpo">
          <div>
            <h4>Qué puede ser</h4>
            <p>{testigo.que}</p>
          </div>
          <div>
            <h4>Qué hacer ahora</h4>
            <p>{testigo.hacer}</p>
          </div>
          <div className="t-lectura-oferta">
            <h4>En {taller.corto}</h4>
            <p>{oferta.nota}</p>
            <p className="t-lectura-precio">
              <span>{servicio ? servicio.nombre : "Revisión de presión y ponchaduras"}</span>
              <b className="t-num">{precioServicio(servicio)}</b>
            </p>
          </div>
        </div>
        <Link className="t-btn t-btn-p" to={`/taller/cita?testigo=${testigo.id}`}>
          Agendar revisión
        </Link>
      </div>
    </>
  )
}
