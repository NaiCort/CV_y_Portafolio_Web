// Figuras de un artículo, dibujadas con sus propios datos (de ejemplo). Cada una lleva su
// tabla de datos para quien no puede ver la gráfica.
const TINTA = { am: "#A86F08", az: "#1F5FD6", ve: "#2E7D4F", gr: "#7C828A" }
const W = 640
const H = 300
const M = { i: 56, d: 20, a: 36, b: 46 }

const fmt = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(2).replace(/0$/, ""))

function Lineas({ f }) {
  const todos = f.series.flatMap(([, , v]) => v)
  const max = Math.max(...todos) * 1.08
  const min = Math.min(0, Math.min(...todos))
  const x0 = f.x[0]
  const x1 = f.x.at(-1)
  const px = (x) => M.i + ((x - x0) / (x1 - x0)) * (W - M.i - M.d)
  const py = (y) => H - M.b - ((y - min) / (max - min)) * (H - M.a - M.b)
  const marcas = Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4)
  return (
    <>
      {marcas.map((m) => (
        <g key={m}>
          <line x1={M.i} x2={W - M.d} y1={py(m)} y2={py(m)} className="pr-g-rej" />
          <text x={M.i - 8} y={py(m) + 4} textAnchor="end" className="pr-g-et">
            {fmt(Math.round(m * 10) / 10)}
          </text>
        </g>
      ))}
      {f.x.map((x) => (
        <text key={x} x={px(x)} y={H - M.b + 18} textAnchor="middle" className="pr-g-et">
          {x}
        </text>
      ))}
      {f.series.map(([nombre, color, v]) => (
        <g key={nombre} stroke={TINTA[color]} fill={TINTA[color]}>
          <polyline
            fill="none"
            strokeWidth="2.5"
            points={v.map((y, i) => `${px(f.x[i])},${py(y)}`).join(" ")}
          />
          {v.map((y, i) => (
            <circle key={f.x[i]} cx={px(f.x[i])} cy={py(y)} r="3.5" />
          ))}
        </g>
      ))}
      <text x={(W + M.i) / 2} y={H - 6} textAnchor="middle" className="pr-g-eje">
        {f.ejeX}
      </text>
    </>
  )
}

function Barras({ f }) {
  const max = Math.max(...f.barras.map(([, v]) => v)) * 1.15
  const ancho = (W - M.i - M.d) / f.barras.length
  const py = (y) => H - M.b - (y / max) * (H - M.a - M.b)
  return (
    <>
      <line x1={M.i} x2={W - M.d} y1={py(0)} y2={py(0)} className="pr-g-base" />
      {f.barras.map(([nombre, v, color], i) => {
        const x = M.i + i * ancho + ancho * 0.2
        return (
          <g key={nombre}>
            <rect
              x={x}
              y={py(v)}
              width={ancho * 0.6}
              height={py(0) - py(v)}
              rx="3"
              fill={TINTA[color]}
            />
            <text x={x + ancho * 0.3} y={py(v) - 8} textAnchor="middle" className="pr-g-val">
              {fmt(v)}
            </text>
            <text x={x + ancho * 0.3} y={H - M.b + 18} textAnchor="middle" className="pr-g-et">
              {nombre}
            </text>
          </g>
        )
      })}
    </>
  )
}

export default function Grafica({ id, f }) {
  const filas =
    f.tipo === "lineas"
      ? f.x.map((x, i) => [x, ...f.series.map(([, , v]) => v[i])])
      : f.barras.map(([n, v]) => [n, v])
  const columnas = f.tipo === "lineas" ? [f.ejeX, ...f.series.map(([n]) => n)] : ["Grupo", f.ejeY]
  return (
    <figure className="pr-fig" id={id}>
      <figcaption>
        <b>{f.titulo}</b>
      </figcaption>
      {f.tipo === "lineas" && (
        <ul className="pr-g-ley">
          {f.series.map(([n, c]) => (
            <li key={n} style={{ "--t": TINTA[c] }}>
              {n}
            </li>
          ))}
        </ul>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${f.titulo}. ${f.pie}`}>
        <text x={8} y={12} className="pr-g-eje">
          {f.ejeY}
        </text>
        {f.tipo === "lineas" ? <Lineas f={f} /> : <Barras f={f} />}
      </svg>
      <p className="pr-fig-pie">{f.pie}</p>
      <details className="pr-fig-datos">
        <summary>Ver los datos de la figura</summary>
        <table>
          <thead>
            <tr>
              {columnas.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila[0]}>
                {fila.map((v, i) => (
                  <td key={columnas[i]}>{typeof v === "number" ? fmt(v) : v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  )
}
