import { INTENSIDADES, NIVELES } from "../data/clases"

// «Para empezar · intensidad media», con tres marcas para la intensidad (1 a 3).
export default function Nivel({ categoria }) {
  return (
    <span className="b-nivel">
      {NIVELES[categoria.nivel]} ·{" "}
      <span className="b-intensidad">
        intensidad {INTENSIDADES[categoria.intensidad]}
        <span aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <i key={n} className={n <= categoria.intensidad ? "is-on" : undefined} />
          ))}
        </span>
      </span>
    </span>
  )
}
