import { useEffect, useRef, useState } from "react"
import { buscarOrden } from "../lib/consulta"

// Consulta tu auto: folio y placas, sin cuenta. Al encontrar la orden avisa a quien la usa
// (la portada lleva a /taller/consulta; esa página la abre ahí mismo).
export default function ConsultaAuto({ orden, onEncontrada }) {
  const [folio, setFolio] = useState("")
  const [placas, setPlacas] = useState("")
  const [estado, setEstado] = useState({ estado: "inicial" })
  const timer = useRef(null)
  const resultado = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (["no-encontrada", "incompleto"].includes(estado.estado)) resultado.current?.focus()
  }, [estado])

  const consultar = (e) => {
    e.preventDefault()
    if (estado.estado === "buscando") return
    const r = buscarOrden(orden, folio, placas)
    if (r.estado === "incompleto") return setEstado(r)
    setEstado({ estado: "buscando" })
    timer.current = setTimeout(() => {
      if (r.estado === "encontrada") {
        setEstado({ estado: "inicial" })
        onEncontrada({ folio: orden.folio, placas: orden.placas })
      } else setEstado(r)
    }, 600)
  }
  const usarEjemplo = () => {
    setFolio(orden.folio)
    setPlacas(orden.placas)
    setEstado({ estado: "inicial" })
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
