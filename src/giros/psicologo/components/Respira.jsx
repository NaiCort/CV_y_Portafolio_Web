import { useEffect, useRef, useState } from "react"

// «Respira conmigo» (V4.10.2; figura nueva en V4.10.5, pedido de Ian): un minuto de respiración que
// el visitante inicia y detiene. Inhalar 4 segundos y exhalar 6, seis veces.
// La figura acompaña el conteo:
// - antes de empezar, el disco es invisible y diminuto dentro de su anillo;
// - al inhalar crece hasta llenar el anillo, y al exhalar se encoge hasta casi desaparecer;
// - al terminar o detener, se encoge del todo y se apaga.
// Es lo único lento de la página y solo corre a petición. Con movimiento reducido, el disco no
// cambia de tamaño: se aclara y se oscurece al mismo ritmo, y el conteo sigue en el centro.
const FASES = [
  { id: "inhala", texto: "Inhala", segundos: 4 },
  { id: "exhala", texto: "Exhala", segundos: 6 },
]
const CICLOS = 6
const APAGADO = 0.9

export default function Respira({ titulo = "Respira conmigo, un minuto", children }) {
  const [estado, setEstado] = useState("quieto")
  const [corrio, setCorrio] = useState(false)
  const [fase, setFase] = useState(0)
  const [ciclo, setCiclo] = useState(0)
  const [segundo, setSegundo] = useState(0)
  const reloj = useRef(null)
  useEffect(() => () => clearInterval(reloj.current), [])

  const empezar = () => {
    clearInterval(reloj.current)
    setEstado("activo")
    setCorrio(true)
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
  // Duración de la transición de la figura: la de la fase en curso; al apagarse, menos de un
  // segundo; y nada antes de la primera vez, para que no se vea encogerse al cargar la página.
  const duracion = activo ? actual.segundos : corrio ? APAGADO : 0
  return (
    <div className="p-respira" data-estado={estado}>
      <div
        className="p-respira-figura"
        data-fase={activo ? actual.id : "quieta"}
        style={{ "--p-dur": `${duracion}s` }}
        aria-hidden="true"
      >
        <span className="p-respira-anillo" />
        <span className="p-respira-disco" />
        <span className="p-respira-centro">
          <span className="p-respira-palabra">{activo ? actual.texto : "Respira"}</span>
          {activo && <span className="p-respira-numero">{actual.segundos - segundo}</span>}
        </span>
      </div>
      <div className="p-respira-texto">
        <h2 id="respira-titulo">{titulo}</h2>
        {children}
        {/* Solo se anuncia el cambio de fase; el conteo de segundos está en la figura. */}
        <p className="p-respira-estado" role="status">
          {activo
            ? `${actual.texto}. Respiración ${ciclo + 1} de ${CICLOS}.`
            : estado === "terminado"
              ? "Terminaste el minuto. Puedes repetirlo cuando quieras."
              : ""}
        </p>
        <button type="button" className="p-btn p-btn-s" onClick={activo ? detener : empezar}>
          {activo ? "Detener" : estado === "terminado" ? "Repetir" : "Empezar"}
        </button>
      </div>
    </div>
  )
}
