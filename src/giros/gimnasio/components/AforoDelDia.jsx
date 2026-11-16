import { aforoPorHora } from "../lib/aforo"

// Aforo simulado de hoy, hora por hora (de 5:00 a 23:00), con la hora actual resaltada.
export default function AforoDelDia({ sucursal, ahora }) {
  const horas = aforoPorHora(sucursal, ahora).filter((x) => x.hora >= 5 && x.hora <= 23)
  if (!horas.length) return null
  const pico = horas.reduce((a, b) => (b.pct > a.pct ? b : a))
  const visitables = horas.filter((x) => x.hora >= 6 && x.hora < 22)
  const tranquila = (visitables.length ? visitables : horas).reduce((a, b) =>
    b.pct < a.pct ? b : a,
  )
  const actual = ahora.getHours()
  return (
    <figure className="b-aforo-dia">
      <figcaption>
        Aforo de hoy por hora: más lleno a las{" "}
        <span className="b-num">
          {pico.hora}:00 ({pico.pct} %)
        </span>
        , más tranquilo a las{" "}
        <span className="b-num">
          {tranquila.hora}:00 ({tranquila.pct} %)
        </span>
        .
      </figcaption>
      <div className="b-aforo-barras" aria-hidden="true">
        {horas.map(({ hora, pct }) => (
          <div key={hora} className={hora === actual ? "is-ahora" : undefined}>
            <i style={{ height: `${Math.max(4, pct)}%` }} />
            <span>{hora % 3 === 0 ? hora : ""}</span>
          </div>
        ))}
      </div>
      <ul className="b-oculto">
        {horas.map(({ hora, pct }) => (
          <li key={hora}>
            {hora}:00, {pct} %{hora === actual ? " (ahora)" : ""}
          </li>
        ))}
      </ul>
    </figure>
  )
}
