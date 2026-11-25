import { useEffect, useRef, useState } from "react"

// «Respira conmigo» (V4.10.2): un minuto de respiración que el visitante inicia y detiene.
// Inhalar 4 segundos y exhalar 6, seis veces. Es lo único lento de la página y solo corre a
// petición; con movimiento reducido, la figura no cambia de tamaño y queda el texto con el conteo.
const FASES = [
  { id: "inhala", texto: "Inhala", segundos: 4 },
  { id: "exhala", texto: "Exhala", segundos: 6 },
]
const CICLOS = 6

export default function Respira({ titulo = "Respira conmigo, un minuto", children }) {
  const [estado, setEstado] = useState("quieto")
  const [fase, setFase] = useState(0)
  const [ciclo, setCiclo] = useState(0)
  const [segundo, setSegundo] = useState(0)
  const reloj = useRef(null)
  useEffect(() => () => clearInterval(reloj.current), [])

  const empezar = () => {
    clearInterval(reloj.current)
    setEstado("activo")
    setFase(0)
    setCiclo(0)
    setSegundo(0)
    let f = 0
    let c = 0
    let s = 0
    reloj.current = setInterval(() => {
      s += 1
      if (s >= FASES[f].segundos) {
        s = 0
        f = (f + 1) % FASES.length
        if (f === 0) c += 1
        if (c >= CICLOS) {
          clearInterval(reloj.current)
          setEstado("terminado")
          return
        }
        setFase(f)
        setCiclo(c)
      }
      setSegundo(s)
    }, 1000)
  }
  const detener = () => {
    clearInterval(reloj.current)
    setEstado("quieto")
  }

  const actual = FASES[fase]
  const activo = estado === "activo"
  return (
    <div className="p-respira" data-estado={estado}>
      <div
        className="p-respira-figura"
        data-fase={activo ? actual.id : "quieta"}
        style={{ "--p-dur": `${activo ? actual.segundos : 0.3}s` }}
        aria-hidden="true"
      >
        <span className="p-respira-centro">{activo ? actual.texto : "Respira"}</span>
      </div>
      <div className="p-respira-texto">
        <h2 id="respira-titulo">{titulo}</h2>
        {children}
        <p className="p-respira-estado">
          {/* Solo se anuncia el cambio de fase; el conteo de segundos es visual. */}
          <span role="status">
            {activo
              ? `${actual.texto}. Respiración ${ciclo + 1} de ${CICLOS}.`
              : estado === "terminado"
                ? "Terminaste el minuto. Puedes repetirlo cuando quieras."
                : ""}
          </span>
          {activo && (
            <span className="p-respira-cuenta" aria-hidden="true">
              {" "}
              {actual.segundos - segundo}
            </span>
          )}
        </p>
        <button type="button" className="p-btn p-btn-s" onClick={activo ? detener : empezar}>
          {activo ? "Detener" : estado === "terminado" ? "Repetir" : "Empezar"}
        </button>
      </div>
    </div>
  )
}
