import { CONTRATO_EJEMPLO, NIVELES_PARTIDA } from "../data/talleres"
import { precioTexto } from "../lib/formato"

// Orden de servicio de ejemplo, en papel en los dos temas (NOM-174-SCFI-2007).
export default function OrdenServicio({ orden }) {
  const campos = [
    ["Folio", orden.folio, true],
    ["Vehículo", orden.vehiculo],
    ["Placas", orden.placas, true],
    [orden.campo[0], orden.campo[1]],
  ]
  return (
    <figure className="t-orden">
      <div className="t-orden-cab">
        <b>Orden de servicio</b>
        <span className="t-dato">Contrato Profeco {CONTRATO_EJEMPLO}</span>
      </div>
      <dl>
        {campos.map(([nombre, valor, dato]) => (
          <div key={nombre} className="t-orden-campo">
            <dt>{nombre}</dt>
            <dd className={dato ? "t-dato" : undefined}>{valor}</dd>
          </div>
        ))}
      </dl>
      <ul className="t-partidas" aria-label="Partidas del presupuesto">
        {orden.partidas.map((p) => (
          <li key={p.texto}>
            <i className={`t-punto t-nivel-${p.nivel}`} aria-hidden="true" />
            <span>
              {p.texto}
              <span className="t-oculto"> ({NIVELES_PARTIDA[p.nivel]})</span>
            </span>
            <b className="t-num">
              {p.precio ? (
                precioTexto(p.precio)
              ) : (
                <>
                  <span aria-hidden="true">—</span>
                  <span className="t-oculto">sin cargo</span>
                </>
              )}
            </b>
          </li>
        ))}
      </ul>
      <span className="t-sello" aria-hidden="true">
        {orden.sello[0]}
        <br />
        {orden.sello[1]}
      </span>
      <figcaption>
        <span>Orden de ejemplo: folio, placas y contrato inventados.</span>
        <span>Nada se hace sin tu visto bueno.</span>
      </figcaption>
    </figure>
  )
}
