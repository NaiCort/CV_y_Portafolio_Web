import { Link } from "react-router-dom"
import { TALLERES } from "../data/talleres"

// Página de un solo taller abierta desde el otro tema: dice de quién es y ofrece cambiar.
export default function SoloEn({ taller, titulo, onCambiar }) {
  const otro = TALLERES[taller]
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
        {titulo}
      </h1>
      <div className="t-solo-en">
        <h2>Es un servicio de {otro.nombre}</h2>
        <p>
          Este servicio es de <b>{otro.nombre}</b>, {otro.descripcion}. Estás viendo el otro taller
          de la demo.
        </p>
        <div className="t-acciones">
          <button type="button" className="t-btn t-btn-p" onClick={() => onCambiar(taller)}>
            Ver {otro.nombre}
          </button>
          <Link className="t-btn t-btn-s" to="/taller">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
