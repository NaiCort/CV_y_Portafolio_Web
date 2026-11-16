import { useEffect, useRef, useState } from "react"
import { ETAPAS, buscarOrden } from "../lib/consulta"

// Consulta tu auto (Rosales): folio y placas, sin cuenta. Cinco estados: inicial, escritura,
// búsqueda, resultado y salida («Consultar otra»).
export default function ConsultaAuto({ orden }) {
  const [folio, setFolio] = useState("")
  const [placas, setPlacas] = useState("")
  const [estado, setEstado] = useState({ estado: "inicial" })
  const timer = useRef(null)
  const resultado = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (["encontrada", "no-encontrada", "incompleto"].includes(estado.estado))
      resultado.current?.focus()
  }, [estado])

  const consultar = (e) => {
    e.preventDefault()
    if (estado.estado === "buscando") return
    const r = buscarOrden(orden, folio, placas)
    if (r.estado === "incompleto") return setEstado(r)
    setEstado({ estado: "buscando" })
    timer.current = setTimeout(() => setEstado(r), 600)
  }
  const usarEjemplo = () => {
    setFolio(orden.folio)
    setPlacas(orden.placas)
    setEstado({ estado: "inicial" })
  }
  const otra = () => {
    setFolio("")
    setPlacas("")
    setEstado({ estado: "inicial" })
  }

  if (estado.estado === "encontrada") {
    const actual = ETAPAS.findIndex((e) => e.id === estado.etapa)
    return (
      <div className="t-consulta-resultado" ref={resultado} tabIndex={-1}>
        <p className="t-consulta-titulo">
          Folio <span className="t-dato">{orden.folio}</span> · {orden.vehiculo}
        </p>
        <ol className="t-etapas">
          {ETAPAS.map((e, i) => (
            <li
              key={e.id}
              className={i < actual ? "is-hecha" : i === actual ? "is-actual" : undefined}
              aria-current={i === actual ? "step" : undefined}
            >
              <b>{e.nombre}</b>
              <span>{e.detalle}</span>
            </li>
          ))}
        </ol>
        <p className="t-nota">
          Estado de ejemplo: en un taller real, aquí verías tu presupuesto para darle el visto
          bueno.
        </p>
        <button type="button" className="t-btn t-btn-s" onClick={otra}>
          Consultar otra orden
        </button>
      </div>
    )
  }
  return (
    <form className="t-consulta" onSubmit={consultar} noValidate>
      <label>
        Folio
        <input
          className="t-dato"
          value={folio}
          onChange={(e) => setFolio(e.target.value)}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder={orden.folio}
        />
      </label>
      <label>
        Placas
        <input
          className="t-dato"
          value={placas}
          onChange={(e) => setPlacas(e.target.value)}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder={orden.placas}
        />
      </label>
      <button type="submit" className="t-btn t-btn-p" disabled={estado.estado === "buscando"}>
        {estado.estado === "buscando" ? "Buscando…" : "Consultar"}
      </button>
      <div className="t-consulta-aviso" ref={resultado} tabIndex={-1} role="status">
        {estado.estado === "incompleto" && <p>Escribe el folio y las placas de tu orden.</p>}
        {estado.estado === "no-encontrada" && (
          <p>No encontramos esa orden. En esta demo solo existe la orden de ejemplo.</p>
        )}
      </div>
      <button
        type="button"
        className="t-inline t-consulta-ejemplo"
        onClick={usarEjemplo}
        disabled={estado.estado === "buscando"}
      >
        Usar la orden de ejemplo ({orden.folio} · {orden.placas})
      </button>
    </form>
  )
}
