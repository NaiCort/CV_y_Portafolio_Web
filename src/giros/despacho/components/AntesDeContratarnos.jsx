import { ENCAJAMOS, NO_ENCAJAMOS } from "../data/confianza"

// «Antes de contratarnos»: con quién encaja Cotejo y con quién no. Va en Precios, justo antes
// de la cotización, para filtrar sin rodeos y mostrar la ética del despacho.
export default function AntesDeContratarnos() {
  return (
    <section className="d-antes" aria-labelledby="d-antes-titulo">
      <h2 id="d-antes-titulo">Antes de contratarnos</h2>
      <p className="d-nota">Preferimos decírtelo ahora que a mitad del año.</p>
      <div className="d-antes-grid">
        <div>
          <h3>Encajamos contigo si…</h3>
          <ul className="d-antes-si">
            {ENCAJAMOS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>No somos tu despacho si…</h3>
          <ul className="d-antes-no">
            {NO_ENCAJAMOS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
