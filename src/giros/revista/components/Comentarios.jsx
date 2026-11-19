import { useEffect, useRef, useState } from "react"
import {
  MAX_COMENTARIO,
  agregar,
  guardarComentarios,
  leerComentarios,
  quitar,
} from "../lib/comentarios"

const almacen = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

// Dos iniciales de las palabras con mayúscula: «Club de Astronomía Cerro Azul» da «CA».
const iniciales = (nombre) => {
  const p = nombre.split(" ").filter((x) => /^\p{Lu}/u.test(x))
  return (p.length > 2 ? [p[0], p.at(-1)] : p).map((x) => x[0]).join("")
}

// Comentarios de una pieza: los de ejemplo y los tuyos (cuenta de ejemplo). Publicar es
// simulado: se guarda solo en este navegador.
export default function Comentarios({ clave, ejemplos, usuario, prefijo, titulo = "Comentarios" }) {
  const [todos, setTodos] = useState(() => leerComentarios(almacen()))
  const [texto, setTexto] = useState("")
  const [estado, setEstado] = useState("listo") // listo · enviando
  const [aviso, setAviso] = useState("")
  const [reportados, setReportados] = useState([])
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const propios = todos[clave] ?? []
  const p = (c) => `${prefijo}-${c}`

  const enviar = (ev) => {
    ev.preventDefault()
    if (!texto.trim() || estado === "enviando") return
    setEstado("enviando")
    timer.current = setTimeout(() => {
      const nuevo = agregar(todos, clave, texto)
      setTodos(nuevo)
      guardarComentarios(almacen(), nuevo)
      setTexto("")
      setEstado("listo")
      setAviso("Comentario publicado (solo en este navegador).")
    }, 600)
  }
  const borrar = (id) => {
    const nuevo = quitar(todos, clave, id)
    setTodos(nuevo)
    guardarComentarios(almacen(), nuevo)
    setAviso("Comentario borrado.")
  }

  return (
    <section className={p("comentarios")} aria-labelledby={p("com-titulo")}>
      <h2 id={p("com-titulo")}>{titulo}</h2>
      <ul className={p("com-lista")}>
        {ejemplos.map(([nombre, cuando, t]) => (
          <li key={nombre + t}>
            <span className={p("com-av")} aria-hidden="true">
              {iniciales(nombre)}
            </span>
            <div>
              <p className={p("com-cab")}>
                <b>{nombre}</b> <span>{cuando}</span>
              </p>
              <p>{t}</p>
              <button
                type="button"
                className={p("com-accion")}
                disabled={reportados.includes(nombre + t)}
                onClick={() => {
                  setReportados((r) => [...r, nombre + t])
                  setAviso(`Reporte enviado sobre el comentario de ${nombre} (simulado).`)
                }}
              >
                {reportados.includes(nombre + t) ? "Reportado" : "Reportar"}
              </button>
            </div>
          </li>
        ))}
        {propios.map((c) => (
          <li key={c.id} className={p("com-propio")}>
            <span className={p("com-av")} aria-hidden="true">
              {usuario.iniciales}
            </span>
            <div>
              <p className={p("com-cab")}>
                <b>{usuario.nombre}</b> <span>tú</span>
              </p>
              <p>{c.texto}</p>
              <button type="button" className={p("com-accion")} onClick={() => borrar(c.id)}>
                Borrar mi comentario
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form className={p("com-form")} onSubmit={enviar}>
        <label htmlFor={p(`com-${clave}`)}>Escribe un comentario como {usuario.nombre}</label>
        <textarea
          id={p(`com-${clave}`)}
          rows={3}
          maxLength={MAX_COMENTARIO}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className={p("com-pie")}>
          <span>
            {texto.length}/{MAX_COMENTARIO} · Cuenta de ejemplo: nada se publica de verdad.
          </span>
          <button type="submit" disabled={!texto.trim() || estado === "enviando"}>
            {estado === "enviando" ? "Publicando…" : "Publicar comentario"}
          </button>
        </div>
      </form>
      <p className="rv-oculto" role="status">
        {aviso}
      </p>
    </section>
  )
}
