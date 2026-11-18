import { useState } from "react"
import { Link } from "react-router-dom"
import { PERFILES, obligaciones } from "../lib/calendario"
import Cabeza from "../components/Cabeza"

const mesLargo = new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" })
const diaLargo = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric" })
const SEMANA = ["L", "M", "M", "J", "V", "S", "D"]
const NOMBRES = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]

// Calendario fiscal del mes según el régimen, con navegación entre meses.
export default function Calendario() {
  const hoy = new Date()
  const [vista, setVista] = useState({ anio: hoy.getFullYear(), mes: hoy.getMonth() })
  const [perfil, setPerfil] = useState("resico")
  const [empleados, setEmpleados] = useState(false)
  const lista = obligaciones(perfil, vista.anio, vista.mes, empleados)
  const dias = new Date(vista.anio, vista.mes + 1, 0).getDate()
  const hueco = (new Date(vista.anio, vista.mes, 1).getDay() + 6) % 7
  const marcados = new Set(lista.map((o) => o.fecha.getDate()))
  const esHoy = (d) =>
    vista.anio === hoy.getFullYear() && vista.mes === hoy.getMonth() && d === hoy.getDate()
  const mover = (n) =>
    setVista((v) => {
      const f = new Date(v.anio, v.mes + n, 1)
      return { anio: f.getFullYear(), mes: f.getMonth() }
    })
  const titulo = mesLargo.format(new Date(vista.anio, vista.mes, 1))
  return (
    <section className="d-pagina" aria-labelledby="d-titulo">
      <Cabeza
        ruta={[["/despacho#herramientas", "Herramientas"], "Calendario fiscal"]}
        titulo="Lo que te vence"
        gris="este mes."
        bajada="Lo que te vence cada mes según tu régimen. Si una fecha cae en fin de semana, pasa al lunes; los días festivos no se marcan."
      />
      <div className="d-wrap d-pagina-cuerpo">
        <div className="d-cal-filtros">
          <div className="d-campo">
            <label htmlFor="d-perfil">Tu régimen</label>
            <select id="d-perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
              {PERFILES.map(([id, nombre]) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>
          {perfil !== "sueldos" && (
            <label className="d-check">
              <input
                type="checkbox"
                checked={empleados}
                onChange={(e) => setEmpleados(e.target.checked)}
              />
              <span>Tengo empleados</span>
            </label>
          )}
        </div>
        <div className="d-cal">
          <div className="d-cal-mes">
            <div className="d-cal-cab">
              <button
                type="button"
                className="d-btn"
                aria-label="Mes anterior"
                onClick={() => mover(-1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <h2 aria-live="polite">{titulo}</h2>
              <button
                type="button"
                className="d-btn"
                aria-label="Mes siguiente"
                onClick={() => mover(1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="d-cal-dias" aria-hidden="true">
              {SEMANA.map((d, i) => (
                <i key={NOMBRES[i]} className="is-cab">
                  {d}
                </i>
              ))}
              {Array.from({ length: hueco }, (_, i) => (
                <i key={`h${i}`} className="is-hueco" />
              ))}
              {Array.from({ length: dias }, (_, i) => i + 1).map((d) => (
                <i
                  key={d}
                  className={[marcados.has(d) && "is-vence", esHoy(d) && "is-hoy"]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {d}
                </i>
              ))}
            </div>
          </div>
          <div>
            <h2 className="d-cal-lista-titulo">
              {lista.length ? "Lo que vence" : "Este mes no te vence nada"}
            </h2>
            {lista.length > 0 && (
              <ul className="d-cal-lista">
                {lista.map((o) => (
                  <li key={o.nombre + o.fecha}>
                    <span className="d-cal-fecha">{diaLargo.format(o.fecha)}</span>
                    <b>{o.nombre}</b>
                    <span>{o.detalle}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="d-nota">
              Calendario orientativo. En Cotejo te avisamos antes de cada fecha y presentamos con tu
              visto bueno.
            </p>
            <Link className="d-btn d-btn-p" to={`/despacho/precios?regimen=${perfil}#cotizar`}>
              Que lo lleve Cotejo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
