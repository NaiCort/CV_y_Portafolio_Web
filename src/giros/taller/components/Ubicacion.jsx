import { useEffect, useMemo, useState } from "react"
import MapaTaller from "./MapaTaller"
import { DIAS } from "../data/ubicaciones"
import { estadoAhora, horarioAgrupado } from "../lib/horario"

const osm = (ref) => `https://www.openstreetmap.org/${ref.osm}`

function useAhora() {
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setAhora(new Date()), 60_000)
    return () => clearInterval(timer)
  }, [])
  return ahora
}

function Estado({ horario, ahora }) {
  const estado = estadoAhora(horario, ahora)
  return (
    <span className={`t-estado ${estado.abierto ? "is-abierto" : ""}`}>
      <i aria-hidden="true" />
      {estado.texto}
    </span>
  )
}

function Horario({ horario, ahora }) {
  const hoy = ahora.getDay()
  return (
    <table className="t-horario">
      <caption className="t-oculto">Horario</caption>
      <tbody>
        {horarioAgrupado(horario, DIAS).map((g) => (
          <tr key={g.dias} className={g.incluye(hoy) ? "is-hoy" : undefined}>
            <th scope="row">
              {g.dias}
              {g.incluye(hoy) && <span className="t-oculto"> (hoy)</span>}
            </th>
            <td className="t-num">{g.texto}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Referencia = ({ referencia }) => (
  <a className="t-ref" href={osm(referencia)} target="_blank" rel="noopener noreferrer">
    Ver {referencia.nombre} en OpenStreetMap
    <span className="t-oculto"> (se abre en otra pestaña)</span>
  </a>
)

// Rosales: un solo local, con su ficha fija junto al mapa.
function LocalRosales({ local, onLlamar }) {
  const ahora = useAhora()
  const puntos = useMemo(() => [local], [local])
  return (
    <div className="t-ubicacion t-ubicacion-uno">
      <MapaTaller
        puntos={puntos}
        elegida={local.id}
        onElegir={() => {}}
        estilo="claro"
        etiqueta="Mapa de la colonia Revolución, al norte de Xalapa, con el local ficticio de Mecánica Rosales"
      />
      <div className="t-ficha">
        <Estado horario={local.horario} ahora={ahora} />
        <p className="t-ficha-dir">{local.direccion}</p>
        <Horario horario={local.horario} ahora={ahora} />
        <dl className="t-ficha-datos">
          <div>
            <dt>Cómo llegar</dt>
            <dd>{local.llegar}</dd>
          </div>
          <div>
            <dt>Estacionamiento</dt>
            <dd>{local.estacionamiento}</dd>
          </div>
          <div>
            <dt>Accesibilidad</dt>
            <dd>{local.accesibilidad}</dd>
          </div>
        </dl>
        <ul className="t-ficha-extras">
          {local.extras.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <div className="t-ficha-acciones">
          <button type="button" className="t-btn t-btn-p" onClick={onLlamar}>
            Llamar al taller
          </button>
          <Referencia referencia={local.referencia} />
        </div>
      </div>
    </div>
  )
}

// Vértice: cuatro sucursales en una lista que se desplaza junto al mapa.
function SucursalesVertice({ sucursales, onAgendar }) {
  const ahora = useAhora()
  const [elegida, setElegida] = useState(sucursales[0].id)
  return (
    <div className="t-ubicacion">
      <MapaTaller
        puntos={sucursales}
        elegida={elegida}
        onElegir={setElegida}
        estilo="oscuro"
        etiqueta="Mapa de Xalapa con las cuatro sucursales ficticias de Vértice"
      />
      <div className="t-sucursales-marco">
        <ul className="t-sucursales" aria-label="Sucursales de Vértice">
          {sucursales.map((s) => {
            const on = s.id === elegida
            return (
              <li key={s.id} className={on ? "is-on" : undefined}>
                <button
                  type="button"
                  className="t-sucursal-boton"
                  aria-expanded={on}
                  aria-controls={`t-suc-${s.id}`}
                  onClick={() => setElegida(s.id)}
                >
                  <b>{s.nombre}</b>
                  <em>{s.especialidad}</em>
                  <Estado horario={s.horario} ahora={ahora} />
                </button>
                <div id={`t-suc-${s.id}`} className="t-sucursal-detalle" hidden={!on}>
                  <p>{s.direccion}</p>
                  <Horario horario={s.horario} ahora={ahora} />
                  <ul className="t-ficha-extras">
                    {s.servicios.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="t-ficha-acciones">
                    <button
                      type="button"
                      className="t-btn t-btn-p"
                      onClick={() => onAgendar(`Hola, quiero agendar en la sucursal ${s.nombre}`)}
                    >
                      Agendar aquí
                    </button>
                    <Referencia referencia={s.referencia} />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Ubicacion({ taller, onAgendar, onLlamar }) {
  const esRosales = taller.id === "rosales"
  return (
    <section
      id={esRosales ? "ubicacion" : "sucursales"}
      className="t-wrap t-seccion"
      aria-labelledby="t-ubicacion-titulo"
    >
      <div className="t-sec-cab">
        <h2 id="t-ubicacion-titulo">{esRosales ? "Cómo llegar" : "Cuatro sucursales"}</h2>
        <p>
          {esRosales
            ? "Un solo local, en la colonia Revolución. El punto es de ejemplo: ahí no hay ningún taller."
            : "Todas hacen mecánica general y cada una tiene su especialidad. Los puntos son de ejemplo: ahí no hay ningún taller."}
        </p>
      </div>
      {esRosales ? (
        <LocalRosales local={taller.local} onLlamar={onLlamar} />
      ) : (
        <SucursalesVertice sucursales={taller.sucursales} onAgendar={onAgendar} />
      )}
    </section>
  )
}
