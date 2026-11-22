import { TRAYECTORIA } from "../data/cv"
import { SECCIONES } from "./cvSecciones"

// Piezas del CV (V4.8.3, docs/IDEAS_CV.md): índice con la sección activa y línea de tiempo a
// escala.

export function Indice({ activa, onIr }) {
  return (
    <nav className="cv-indice" aria-label="Secciones del CV">
      <ol>
        {SECCIONES.map(([id, nombre]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activa === id ? "true" : undefined}
              onClick={(e) => onIr(e, id)}
            >
              {nombre}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ---------- Línea de tiempo ----------
// Fechas "AAAA-MM" o "AAAA". Un año sin mes cubre el año completo; nada se dibuja después de hoy.
const mes = (texto, final) => {
  const [a, m] = texto.split("-").map(Number)
  return a * 12 + (m ? m - 1 : final ? 11 : 0) + (final ? 1 : 0)
}
const INICIO = 2018 * 12

export function LineaDeTiempo({ hoy = new Date() }) {
  const ahora = hoy.getFullYear() * 12 + hoy.getMonth() + 1
  const total = ahora - INICIO
  const anios = []
  for (let a = 2018; a * 12 <= ahora; a++) anios.push(a)
  const fr = (m) => (m - INICIO) / total
  const pct = (m) => `${(fr(m) * 100).toFixed(2)}%`
  return (
    <figure className="cv-linea" style={{ "--paso": `${((12 / total) * 100).toFixed(3)}%` }}>
      <div className="cv-linea-eje" aria-hidden="true">
        {anios.map((a) => (
          <span
            key={a}
            style={{ "--x": fr(a * 12).toFixed(4) }}
            data-impar={a % 2 ? "" : undefined}
            data-cerca={fr(a * 12) > 0.85 ? "" : undefined}
          >
            {a}
          </span>
        ))}
        <span className="cv-linea-hoy" style={{ "--x": 1 }}>
          hoy
        </span>
      </div>
      <ol>
        {TRAYECTORIA.map((t) => {
          const a = mes(t.fechas[0], false)
          const enCurso = t.fechas[1] === null
          const b = enCurso ? ahora : Math.min(mes(t.fechas[1], true), ahora)
          return (
            <li key={t.id} data-tipo={t.tipo} data-en-curso={enCurso ? "" : undefined}>
              <span className="cv-linea-nombre">
                {t.nombre}
                <span className="cv-oculto">
                  , {t.tipo}, {t.periodo}
                  {enCurso ? ", en curso" : ""}
                </span>
              </span>
              <span className="cv-linea-pista" aria-hidden="true">
                <span
                  className="cv-linea-barra"
                  style={{ "--a": pct(a), "--b": pct(Math.max(b, a + 1)) }}
                />
              </span>
            </li>
          )
        })}
      </ol>
      <figcaption>
        <span className="cv-clave" data-tipo="estudio">
          Estudios
        </span>
        <span className="cv-clave" data-tipo="trabajo">
          Trabajo
        </span>
        <span className="cv-clave" data-tipo="proyecto">
          Proyectos
        </span>
        <span>
          Cuando solo se conoce el año, la barra cubre el año completo. La maestría sigue en curso;
          el egreso esperado es en agosto de 2028.
        </span>
      </figcaption>
    </figure>
  )
}
