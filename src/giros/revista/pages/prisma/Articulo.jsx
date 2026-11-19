import { useState } from "react"
import { Navigate, useParams, Link } from "react-router-dom"
import Acciones from "../../components/prisma/Acciones"
import Autores from "../../components/prisma/Autores"
import Grafica from "../../components/prisma/Grafica"
import Comentarios from "../../components/Comentarios"
import { ARTICULOS, USUARIO, findArticulo, foto, nombresAutores } from "../../data/prisma"
import { cita, textoDe } from "../../data/prisma-textos"

const miles = new Intl.NumberFormat("es-MX")

function Cabecera({ a }) {
  return (
    <>
      <p className="pr-impreso">
        Prisma, revista ficticia de ciencia y tecnología · Demo del portafolio de Ian Aldana
        Martínez · Autores, datos y referencias son de ejemplo.
      </p>
      <p className="pr-meta">
        PRISMA · Vol. 4 · N.º {a.n} · {a.areaNombre} · {a.fecha} · Versión {a.version}
      </p>
      <h1>{a.titulo}</h1>
      <Autores ids={a.autores} />
      <div className="pr-chips">
        {a.revisado ? (
          <span className="pr-chip pr-chip-ok">Revisado por pares</span>
        ) : (
          <span className="pr-chip pr-chip-pre">Preimpresión · sin revisión por pares</span>
        )}
        <span className="pr-chip">
          DOI 10.0000/prisma.2026.{String(a.n).padStart(3, "0")} (de ejemplo)
        </span>
        <span className="pr-chip">CC BY 4.0</span>
      </div>
    </>
  )
}

function Citar({ a }) {
  const [aviso, setAviso] = useState("")
  const texto = cita(a, nombresAutores(a))
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto)
      setAviso("Cita copiada.")
    } catch {
      setAviso("No se pudo copiar; selecciona el texto de la cita.")
    }
  }
  return (
    <div className="pr-citar">
      <h2>Cómo citar</h2>
      <p>{texto}</p>
      <button type="button" className="pr-bt pr-bt-s" onClick={copiar}>
        Copiar cita
      </button>
      <p className="pr-aviso" role="status">
        {aviso}
      </p>
    </div>
  )
}

function Lectura({ a, t }) {
  const [grande, setGrande] = useState(false)
  const otro = ARTICULOS.find((x) => x.completo && x.id !== a.id)
  const indice = [
    ["resumen", "Resumen"],
    ...t.secciones.map((s) => [s.id, s.titulo]),
    ["referencias", "Referencias"],
    ["pr-com-titulo", "Comentarios"],
  ]
  return (
    <>
      <ul className="pr-breve" aria-label="En breve">
        {t.enBreve.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <div className="pr-leer">
        <aside className="pr-leer-lado">
          <nav aria-label="En este artículo">
            <h2>En este artículo</h2>
            <ol>
              {indice.map(([id, nombre]) => (
                <li key={id}>
                  <a href={`#${id}`}>{nombre}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="pr-tam" role="group" aria-label="Tamaño del texto">
            <button type="button" aria-pressed={!grande} onClick={() => setGrande(false)}>
              Texto normal
            </button>
            <button type="button" aria-pressed={grande} onClick={() => setGrande(true)}>
              Texto grande
            </button>
          </div>
          <dl className="pr-leer-cifras">
            <div>
              <dt>Lecturas</dt>
              <dd>{miles.format(a.cifras.lecturas)}</dd>
            </div>
            <div>
              <dt>Descargas</dt>
              <dd>{miles.format(a.cifras.descargas)}</dd>
            </div>
            <div>
              <dt>Citas</dt>
              <dd>{a.cifras.citas}</dd>
            </div>
          </dl>
        </aside>
        <article className={grande ? "pr-hoja pr-hoja-g" : "pr-hoja"}>
          <section id="resumen" aria-labelledby="pr-res-titulo">
            <h2 id="pr-res-titulo">Resumen</h2>
            <p className="pr-hoja-res">{a.resumen}</p>
            <p className="pr-hoja-claves">
              <b>Palabras clave:</b> {t.claves.join(", ")}.
            </p>
            <p className="pr-hoja-fechas">
              Recibido el {t.recibido} · Aceptado el {t.aceptado} · Publicado el {a.fecha} ·{" "}
              {t.revisores} revisores anónimos
            </p>
          </section>
          {t.secciones.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`pr-s-${s.id}`}>
              <h2 id={`pr-s-${s.id}`}>{s.titulo}</h2>
              {s.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.tabla && (
                <div className="pr-tabla">
                  <div
                    className="pr-tabla-desliz"
                    role="region"
                    aria-label={s.tabla.titulo}
                    tabIndex={0}
                  >
                    <table>
                      <caption>{s.tabla.titulo}</caption>
                      <thead>
                        <tr>
                          {s.tabla.columnas.map((c) => (
                            <th key={c} scope="col">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.tabla.filas.map((f) => (
                          <tr key={f[0]}>
                            {f.map((v, i) =>
                              i === 0 ? (
                                <th key={v} scope="row">
                                  {v}
                                </th>
                              ) : (
                                <td key={s.tabla.columnas[i]}>{v}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p>{s.tabla.nota}</p>
                </div>
              )}
              {s.figura && <Grafica id={`fig-${s.figura}`} f={t.figuras[s.figura]} />}
            </section>
          ))}
          <section aria-labelledby="pr-datos-titulo">
            <h2 id="pr-datos-titulo">Datos, código y financiamiento</h2>
            <p>{t.datos}</p>
            <p>{t.financiamiento}</p>
          </section>
          <section id="referencias" aria-labelledby="pr-ref-titulo">
            <h2 id="pr-ref-titulo">Referencias</h2>
            <ol className="pr-refs">
              {t.referencias.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </section>
          <Citar a={a} />
        </article>
      </div>
      <Comentarios
        clave={`prisma-${a.id}`}
        ejemplos={t.comentarios}
        usuario={USUARIO}
        prefijo="pr"
        titulo="Comentarios de la comunidad"
      />
      {otro && (
        <p className="pr-sig">
          Siguiente lectura completa:{" "}
          <Link to={`/revista/prisma/articulo/${otro.id}`}>
            N.º {otro.n} · {otro.titulo}
          </Link>
        </p>
      )}
    </>
  )
}

// Ficha de una investigación. Los números 24 y 23 se leen completos; los demás son entradas
// de archivo con su resumen.
export default function Articulo() {
  const { id } = useParams()
  const a = findArticulo(id)
  if (!a) return <Navigate to="/revista/prisma" replace />
  const t = textoDe(a.id)
  return (
    <main className="pr-art" style={{ "--c": a.color }}>
      <div className="pr-artbg" aria-hidden="true">
        <img src={foto(a.foto)} alt="" />
      </div>
      <div className={t ? "pr-w pr-art-in pr-art-completo" : "pr-w pr-art-in"}>
        <Cabecera a={a} />
        {t ? (
          <>
            <Acciones articulo={a} leer={false} />
            <Lectura a={a} t={t} />
          </>
        ) : (
          <>
            <section className="pr-resumen" aria-labelledby="pr-res-titulo">
              <h2 id="pr-res-titulo">Resumen</h2>
              <p>{a.resumen}</p>
            </section>
            <Acciones articulo={a} leer={false} />
            <p className="pr-nota">
              Entrada de archivo: en esta demo solo los números 24 y 23 tienen texto completo.{" "}
              <Link to="/revista/prisma">Volver a los números</Link>
            </p>
          </>
        )}
      </div>
    </main>
  )
}
