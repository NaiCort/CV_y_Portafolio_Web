import { SUCURSALES } from "../data/sucursales"
import { AVENIDAS, CALLES, MAPA, RIO } from "../lib/mapa"

// Mapa dibujado de una ciudad ficticia. La lista junto al mapa es la forma accesible de elegir;
// los pines también responden al clic como atajo.
export default function MapaSucursales({ elegida, onElegir }) {
  return (
    <svg
      viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`}
      className="b-mapa"
      role="img"
      aria-label={`Mapa ilustrativo de las cinco sucursales. Elegida: ${
        SUCURSALES.find((s) => s.id === elegida)?.nombre
      }.`}
    >
      <defs>
        <clipPath id="b-oeste">
          <path d="M0 0 H380 C 330 200 420 330 300 560 H0Z" />
        </clipPath>
        <clipPath id="b-este">
          <path d="M380 0 H760 V560 H300 C 420 330 330 200 380 0Z" />
        </clipPath>
      </defs>
      <rect width={MAPA.ancho} height={MAPA.alto} className="b-mapa-fondo" />
      <path d={CALLES.oeste} clipPath="url(#b-oeste)" className="b-mapa-calle" />
      <path d={CALLES.este} clipPath="url(#b-este)" className="b-mapa-calle" />
      {AVENIDAS.map((d, i) => (
        <path key={d} d={d} className="b-mapa-avenida" strokeWidth={i === 2 ? 5 : 7} />
      ))}
      <path d={RIO} className="b-mapa-rio" />
      <path d="M470 90 l90 -20 l30 80 l-95 25z" className="b-mapa-parque" />
      <text x="478" y="122" className="b-mapa-nota">
        Parque Alameda
      </text>
      <text x="352" y="300" className="b-mapa-nota" transform="rotate(-70 352 300)">
        RÍO SECO
      </text>
      {SUCURSALES.map((s) => {
        const on = s.id === elegida
        return (
          <g key={s.id} className={on ? "b-pin is-on" : "b-pin"} onClick={() => onElegir(s.id)}>
            {on && <circle cx={s.pin.x} cy={s.pin.y} r={30} className="b-pin-halo" />}
            <circle cx={s.pin.x} cy={s.pin.y} r={on ? 12 : 8} className="b-pin-punto" />
            <text x={s.pin.x + 18} y={s.pin.y + 6} className="b-pin-nombre">
              {s.nombre}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
