import "./interior-lineas.css"
import { useId } from "react"
import { Link } from "react-router-dom"

// Contorno trazado en las coordenadas de la foto (213 × 320), incluida la correa.
const figura =
  "M97 57Q96 49 105 49Q117 47 123 54L124 61 119 71 118 78Q132 82 138 94L142 124 144 162 141 164 140 174 136 180 129 182 127 179 132 168 130 165 125 180 122 199 121 224 119 248 120 260 120 272Q114 278 106 272L107 259 109 247 108 225 104 207 101 231 103 239 100 250 99 261Q94 268 89 263L92 249 90 240 87 219 84 195 83 169 80 164 78 174 75 179 73 178 71 223 73 224 72 237 68 238 67 228 70 179 65 179 64 173 68 166 72 163 75 145 76 118 80 98Q84 87 97 81L102 76 99 73 97 68 95 65Z"

function Lamina({ src, ancha }) {
  const id = useId().replaceAll(":", "")
  const w = ancha ? 480 : 213
  const x = 0
  return (
    <svg
      className={ancha ? "um-paisaje" : "um-vertical"}
      viewBox={`0 0 ${w} 320`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <image
          id={id + "foto"}
          href={src}
          width="213"
          height="320"
          preserveAspectRatio="xMidYMid slice"
        />
        <clipPath id={id + "persona"}>
          <path d={figura} />
        </clipPath>
        <clipPath id={id + "letra"}>
          {["ENTRE", "LÍNEAS"].map((t, i) => (
            <text
              key={t}
              x="106.5"
              textAnchor="middle"
              y={i === 0 ? 135 : 208}
              fontSize={i === 0 ? 61 : 54}
              fontWeight="800"
              fontFamily="Rubor Texto, Arial, sans-serif"
              letterSpacing="-2"
            >
              {t}
            </text>
          ))}
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}letra)`}>
        <use href={"#" + id + "foto"} x={x} />
      </g>
      {ancha && (
        <svg
          x="218"
          y="40"
          width="257"
          height="228"
          viewBox="40 140 95 84"
          preserveAspectRatio="xMidYMid slice"
        >
          <use href={"#" + id + "foto"} />
        </svg>
      )}
      <g transform={`translate(${x} 0)`}>
        <use href={"#" + id + "foto"} clipPath={`url(#${id}persona)`} />
      </g>
    </svg>
  )
}
export function ArteLineas({ src, amplia = false }) {
  return (
    <div
      className={"um-arte" + (amplia ? " um-arte-amplia" : "")}
      role="img"
      aria-label="Entre líneas. La calle aparece dentro de las letras y un fotógrafo atraviesa el título."
    >
      {amplia && <Lamina src={src} ancha />}
      <Lamina src={src} />
    </div>
  )
}
export default function AperturaLineas({ d, inicio = false, children }) {
  const Titulo = inicio ? "h2" : "h1"
  return (
    <header className="um-pliego">
      <div className="um-folio">
        {inicio ? <h1>Umbral</h1> : <Link to="/revista/umbral">Umbral</Link>}
        <span>Fotografía</span>
      </div>
      <ArteLineas src={d.foto} amplia />
      <div className="um-colofon">
        <div>
          <Titulo>{d.titulo}</Titulo>
          <Link to="/revista/umbral/creador/nicolas-vera">{d.autor}</Link>
        </div>
        <p>{d.entradilla}</p>
        {inicio ? (
          <Link className="um-abrir" to="/revista/umbral/dossier/entre-lineas#relato">
            Leer Entre líneas
          </Link>
        ) : (
          children
        )}
      </div>
    </header>
  )
}
