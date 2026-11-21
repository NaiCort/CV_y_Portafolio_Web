import { Link, useSearchParams } from "react-router-dom"
import { ACTUAL, NUMEROS, foto, fechaNumero } from "../../data/rubor"
const archivo = {
  Moda: [20, 19, 18, 17, 13, 12, 10, 9, 7, 4, 3],
  Belleza: [21, 16, 15, 14, 6, 5],
  Celebridades: [11, 8, 2, 1],
  "Alfombra roja": [22],
}
export function Secciones() {
  const [params, setParams] = useSearchParams()
  const seleccion = params.get("s") ?? "Moda"
  const seccion = Object.hasOwn(archivo, seleccion) ? seleccion : "Moda"
  return (
    <main className="rb-archivo">
      <h1>Secciones de Rubor</h1>
      <label>
        Sección{" "}
        <select value={seccion} onChange={(e) => setParams({ s: e.target.value })}>
          {Object.keys(archivo).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <ul>
        {NUMEROS.map((n) => {
          const ruta = n.n === ACTUAL.n ? "/revista/rubor" : "/revista/rubor/numero/" + n.n
          const pieza = n.completo
            ? seccion === "Moda"
              ? [n.reportaje.titulo.join(" "), "reportaje"]
              : seccion === "Celebridades"
                ? [n.entrevista.titulo, "entrevista"]
                : null
            : archivo[seccion].includes(n.n)
              ? [n.tema, "sumario"]
              : null
          return pieza ? (
            <li key={n.n}>
              <Link to={ruta + "#" + pieza[1]}>{pieza[0]}</Link> · N.º {n.n}, {fechaNumero(n)}
              {!n.completo ? " · Nota de archivo" : ""}
            </li>
          ) : null
        })}
      </ul>
    </main>
  )
}
export function Sesion() {
  return (
    <main className="rb-archivo">
      <h1>Detrás de cámaras</h1>
      <p>
        Sesión ficticia del N.º {ACTUAL.n} · {ACTUAL.tema}
      </p>
      <dl>
        <dt>Dirección de arte</dt>
        <dd>Julia Valdés</dd>
        <dt>Estilismo</dt>
        <dd>Elena Prado</dd>
        <dt>Iluminación</dt>
        <dd>Mar Cano</dd>
      </dl>
      <p>Créditos narrativos de ejemplo. Las fotografías ilustrativas proceden de Unsplash.</p>
      {[
        ["530036", "Prueba de contraste"],
        ["403499", "Estudio de luz lateral"],
      ].map(([id, t]) => (
        <figure key={id}>
          <img src={foto(id, 600)} width="600" height="800" loading="lazy" alt={t} />
          <figcaption>{t}</figcaption>
        </figure>
      ))}
      <Link to="/revista/rubor/creditos">Procedencia de las fotografías</Link>
    </main>
  )
}
