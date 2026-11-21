import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ACTUAL, NUMEROS, foto, fechaNumero } from "../../data/rubor"

// Índice por sección (pliego): a la izquierda las cuatro secciones como palabras grandes, a la
// derecha las piezas de esa sección en todos los números.
const ARCHIVO = {
  Moda: [20, 19, 18, 17, 13, 12, 10, 9, 7, 4, 3],
  Belleza: [21, 16, 15, 14, 6, 5],
  Celebridades: [11, 8, 2, 1],
  "Alfombra roja": [22],
}
const LEMAS = {
  Moda: "Lo que se lleva y lo que se queda.",
  Belleza: "Rostros, texturas y rituales.",
  Celebridades: "Conversaciones sin guion.",
  "Alfombra roja": "La noche, vestido por vestido.",
}

function piezasDe(seccion) {
  return NUMEROS.map((n) => {
    const ruta = n.n === ACTUAL.n ? "/revista/rubor" : "/revista/rubor/numero/" + n.n
    const pieza = n.completo
      ? seccion === "Moda"
        ? [n.reportaje.titulo.join(" "), "reportaje"]
        : seccion === "Celebridades"
          ? [n.entrevista.titulo, "entrevista"]
          : seccion === "Belleza" && n.portada.derecha
            ? [n.portada.derecha[1][1], "sumario"]
            : seccion === "Alfombra roja" && n.portada.derecha
              ? [n.portada.derecha[0][1], "sumario"]
              : null
      : ARCHIVO[seccion].includes(n.n)
        ? [n.tema, "sumario"]
        : null
    return pieza && { n, ruta: ruta + "#" + pieza[1], titulo: pieza[0] }
  }).filter(Boolean)
}

export function Secciones() {
  const [params, setParams] = useSearchParams()
  const seleccion = params.get("s") ?? "Moda"
  const seccion = Object.hasOwn(ARCHIVO, seleccion) ? seleccion : "Moda"
  const piezas = piezasDe(seccion)
  return (
    <main className="rb-pliego rb-secciones">
      <section className="rb-pagina rb-secciones-indice" aria-labelledby="rb-sec-titulo">
        <p className="rb-sobre">Índice por sección</p>
        <h1 id="rb-sec-titulo" className="rv-oculto">
          Secciones de Rubor
        </h1>
        <div className="rb-sec-botones" role="group" aria-label="Sección">
          {Object.keys(ARCHIVO).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === seccion}
              onClick={() => setParams({ s })}
            >
              <span>{s}</span>
              <small>
                {piezasDe(s).length} piezas · {LEMAS[s]}
              </small>
            </button>
          ))}
        </div>
        <span className="rb-folio rb-folio-i" aria-hidden="true">
          Rubor · Secciones · 4
        </span>
      </section>
      <section
        className="rb-pagina rb-secciones-lista"
        aria-label={`Piezas de ${seccion}`}
        key={seccion}
      >
        <h2>
          {seccion}
          <span>{LEMAS[seccion]}</span>
        </h2>
        <ol>
          {piezas.map(({ n, ruta, titulo }, i) => (
            <li key={n.n} style={{ "--i": i }}>
              <Link to={ruta}>
                <span className="rb-tinte rb-sec-mini">
                  <img src={foto(n.foto, 600)} alt="" width="600" height="800" loading="lazy" />
                </span>
                <span className="rb-sec-texto">
                  <small>
                    N.º {n.n} · {fechaNumero(n)}
                  </small>
                  <b>{titulo}</b>
                  <em>{n.completo ? "Completo en esta demo" : "Nota de archivo"}</em>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <span className="rb-folio rb-folio-d" aria-hidden="true">
          5
        </span>
      </section>
    </main>
  )
}

// «Detrás de cámaras»: hoja de contactos marcada con lápiz graso y hoja de llamado del día.
const CONTACTOS = [
  [
    "053879",
    "Prueba de vestuario: el morado se queda fuera del número.",
    "f/2.8 · 1/160 · ISO 200",
  ],
  ["388940", "La elegida para la entrevista: la chamarra de su padre.", "f/2 · 1/125 · ISO 400"],
  ["403499", "Luz lateral de color; demasiado fría para noviembre.", "f/4 · 1/200 · ISO 320"],
  ["530036", "Prueba en blanco y negro para el contraste del rojo.", "f/5.6 · 1/250 · ISO 100"],
  ["777550", "El campo de trigo no cupo en la historia de invierno.", "f/2.8 · 1/500 · ISO 100"],
  ["741775", "Fondo azul: guardado para el N.º 23.", "f/2.2 · 1/160 · ISO 200"],
  ["020798", "Primer plano sin maquillaje para la carta de la editora.", "f/2 · 1/200 · ISO 160"],
  ["862026", "La mezclilla quedó para «Denim», el N.º 4.", "f/2.8 · 1/250 · ISO 200"],
  ["293891", "Toma de cortesía para redes; no entra en papel.", "f/3.2 · 1/320 · ISO 100"],
]
const ELEGIDA = 1
const DIA = [
  ["07:30", "Llegada del equipo y montaje de luces en el estudio de la Roma."],
  ["09:00", "Vestuario: cinco cambios, del terciopelo a la piel."],
  ["10:00", "Llega Valeria, a la hora exacta, con el pelo mojado."],
  ["12:40", "Primera tanda: el rojo se ve naranja; se cambia el fondo."],
  ["15:10", "La toma de la chamarra. Silencio en el estudio."],
  ["18:30", "Entrevista grabada en el camerino."],
  ["19:40", "Última toma y café que nadie terminó."],
]
const EQUIPO = [
  ["Dirección de arte", "Julia Valdés"],
  ["Fotografía", "Iker Montoya"],
  ["Estilismo", "Elena Prado"],
  ["Maquillaje", "Sofía Robles"],
  ["Iluminación", "Mar Cano"],
  ["Edición", "Andrea Roldán"],
]

export function Sesion() {
  const [vista, setVista] = useState(ELEGIDA)
  const [id, nota, datos] = CONTACTOS[vista]
  return (
    <main className="rb-sesion">
      <section className="rb-pliego" aria-labelledby="rb-sesion-titulo">
        <div className="rb-pagina rb-contactos">
          <p className="rb-sobre">
            Detrás de cámaras · Sesión del N.º {ACTUAL.n}, {ACTUAL.tema.toLowerCase()}
          </p>
          <h1 id="rb-sesion-titulo">
            La hoja de <span>contactos</span>
          </h1>
          <p className="rb-sesion-bajada">
            Nueve tomas de un solo día. Marcamos con lápiz graso la que llegó a la portada de la
            entrevista; toca cualquiera para ver por qué se quedó o se fue.
          </p>
          <ol className="rb-tira-contactos">
            {CONTACTOS.map(([clave, texto], i) => (
              <li key={clave}>
                <button
                  type="button"
                  aria-pressed={i === vista}
                  aria-label={`Toma ${i + 1}${i === ELEGIDA ? " (la elegida)" : ""}: ${texto}`}
                  onClick={() => setVista(i)}
                >
                  <span className="rb-tinte">
                    <img src={foto(clave, 600)} alt="" width="600" height="800" loading="lazy" />
                  </span>
                  <small aria-hidden="true">{24 + i}A</small>
                  {i === ELEGIDA && (
                    <svg className="rb-lapiz" viewBox="0 0 100 130" aria-hidden="true">
                      <path d="M52 6C22 4 6 30 7 64c1 36 22 60 47 59 27-1 41-30 39-62C91 29 74 6 44 9" />
                    </svg>
                  )}
                  {(i === 0 || i === 4 || i === 8) && (
                    <svg className="rb-tache" viewBox="0 0 100 100" aria-hidden="true">
                      <path d="M12 14 88 86M86 12 14 88" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ol>
          <span className="rb-folio rb-folio-i" aria-hidden="true">
            Rubor · {ACTUAL.mes} {ACTUAL.anio} · 70
          </span>
        </div>
        <figure className="rb-pagina rb-lupa" key={id}>
          <span className="rb-tinte">
            <img src={foto(id)} alt={nota} width="1200" height="1600" />
          </span>
          <figcaption>
            <b>
              Toma {vista + 1} · {24 + vista}A
            </b>
            {nota}
            <small>{datos} · Datos ficticios de una sesión de ejemplo.</small>
          </figcaption>
          <span className="rb-folio rb-folio-d" aria-hidden="true">
            71
          </span>
        </figure>
      </section>
      <section className="rb-pliego rb-llamado" aria-labelledby="rb-llamado-titulo">
        <div className="rb-pagina">
          <h2 id="rb-llamado-titulo">
            Hoja de <span>llamado</span>
          </h2>
          <ol className="rb-dia">
            {DIA.map(([hora, texto]) => (
              <li key={hora}>
                <time>{hora}</time>
                <p>{texto}</p>
              </li>
            ))}
          </ol>
          <span className="rb-folio rb-folio-i" aria-hidden="true">
            Rubor · {ACTUAL.mes} {ACTUAL.anio} · 72
          </span>
        </div>
        <div className="rb-pagina rb-equipo">
          <h2>Equipo</h2>
          <dl>
            {EQUIPO.map(([rol, nombre]) => (
              <div key={rol}>
                <dt>{rol}</dt>
                <dd>{nombre}</dd>
              </div>
            ))}
          </dl>
          <p className="rb-equipo-nota">
            Equipo y sesión ficticios. Las fotos son ilustrativas (Unsplash) y las personas no son
            Valeria Ocampo. <Link to="/revista/rubor/creditos">Procedencia de las fotografías</Link>
            .
          </p>
          <span className="rb-folio rb-folio-d" aria-hidden="true">
            73
          </span>
        </div>
      </section>
    </main>
  )
}
