import { foto } from "../../data/prisma"

// Portada de un número: foto nítida arriba que se desvanece en el color de su área.
export default function Portada({ articulo: a, grande = false, sizes = "180px", carga = "lazy" }) {
  return (
    <figure
      className={grande ? "pr-port pr-port-g" : "pr-port"}
      style={{ "--c": a.color }}
      aria-hidden="true"
    >
      <img
        src={foto(a.foto, grande ? 1000 : 480)}
        srcSet={`${foto(a.foto, 480)} 480w, ${foto(a.foto, 1000)} 1000w`}
        sizes={sizes}
        alt=""
        loading={carga}
        fetchPriority={grande ? "high" : undefined}
        decoding="async"
      />
      <figcaption>
        <span className="pr-pt">
          <span className="pr-pm">PRISMA</span>
          <span className="pr-pv">Vol. 4 · N.º {a.n}</span>
        </span>
        <span className="pr-pb">
          <b>{a.titulo}</b>
          <span className="pr-pa">{a.areaNombre}</span>
        </span>
      </figcaption>
    </figure>
  )
}
