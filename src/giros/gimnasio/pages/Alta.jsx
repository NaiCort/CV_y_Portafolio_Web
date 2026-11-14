import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { PLANES } from "../data/planes"
import { SUCURSALES, findSucursal } from "../data/sucursales"
import { METODOS_PAGO, PASOS, REGLAMENTO, TEMAS_SALUD } from "../data/alta"

const pesos = (n) => `$${n.toLocaleString("en-US")}`
const correoValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
// La firma se compara sin mayúsculas, tildes ni espacios de más.
const sinTildes = (v) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
const telefonoValido = (v) => v.replace(/\D/g, "").length === 10
const fechaLarga = (f) =>
  f.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })

function renovacion(desde) {
  const f = new Date(desde)
  f.setMonth(f.getMonth() + 1)
  return f
}

// Alta simulada en cinco pasos. Los datos viven solo mientras la página está abierta: no se
// guardan en el navegador ni se envían.
export default function Alta() {
  const [params] = useSearchParams()
  const inicial = PLANES.some((p) => p.id === params.get("plan")) ? params.get("plan") : "club"
  const [paso, setPaso] = useState(0)
  const [datos, setDatos] = useState({
    plan: inicial,
    sucursal: "centro",
    nombre: "",
    correo: "",
    telefono: "",
    acepta: false,
    firma: "",
    pago: "recepcion",
  })
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [hecho, setHecho] = useState(null)
  const timer = useRef(null)
  const titulo = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    titulo.current?.focus({ preventScroll: true })
  }, [paso, hecho])
  const plan = PLANES.find((p) => p.id === datos.plan)
  const cambiar = (campo) => (e) => {
    const valor = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setDatos((d) => ({ ...d, [campo]: valor }))
    setErrores((x) => ({ ...x, [campo]: undefined }))
  }
  const validar = () => {
    const e = {}
    if (paso === 1) {
      if (!datos.nombre.trim()) e.nombre = "Escribe tu nombre completo."
      if (!correoValido(datos.correo)) e.correo = "Escribe un correo como nombre@dominio.com."
      if (!telefonoValido(datos.telefono)) e.telefono = "Escribe un teléfono de 10 dígitos."
    }
    if (paso === 3) {
      if (!datos.acepta) e.acepta = "Marca la casilla para aceptar el reglamento."
      if (sinTildes(datos.firma) !== sinTildes(datos.nombre))
        e.firma = `Firma escribiendo tu nombre tal como lo pusiste: ${datos.nombre.trim()}.`
    }
    setErrores(e)
    const primero = Object.keys(e)[0]
    if (primero) document.getElementById(`b-alta-${primero}`)?.focus()
    return !primero
  }
  const seguir = (event) => {
    event.preventDefault()
    if (!validar()) return
    if (paso < PASOS.length - 1) {
      setPaso(paso + 1)
      return
    }
    setEnviando(true)
    timer.current = setTimeout(() => {
      const hoy = new Date()
      setHecho({ numero: `BRIO-${String(hoy.getTime()).slice(-6)}`, desde: hoy })
      setEnviando(false)
    }, 900)
  }
  const campo = (id, etiqueta, props = {}) => (
    <div className="b-campo-alta">
      <label htmlFor={`b-alta-${id}`}>{etiqueta}</label>
      <input
        id={`b-alta-${id}`}
        value={datos[id]}
        onChange={cambiar(id)}
        aria-invalid={Boolean(errores[id])}
        aria-describedby={errores[id] ? `b-alta-${id}-error` : undefined}
        {...props}
      />
      {errores[id] && (
        <p id={`b-alta-${id}-error`} className="b-error">
          {errores[id]}
        </p>
      )}
    </div>
  )

  if (hecho)
    return (
      <section className="b-wrap b-alta" aria-labelledby="b-titulo">
        <h1 id="b-titulo" tabIndex={-1} ref={titulo} className="b-d b-media">
          Ya eres parte de Brío
        </h1>
        <div className="b-alta-hecha" role="status">
          <p className="b-reserva-codigo b-num">{hecho.numero}</p>
          <p>
            {datos.nombre.trim()}, tu plan {plan.nombre} en Brío{" "}
            {findSucursal(datos.sucursal).nombre} empieza hoy. Se renueva el{" "}
            {fechaLarga(renovacion(hecho.desde))}; te avisamos cinco días antes y puedes cancelar
            desde tu perfil en un paso.
          </p>
          <p className="b-ficcion">
            Alta simulada: no se cobró nada, no se envió ningún dato y al salir de esta página se
            borra.
          </p>
          <div className="b-acciones">
            <Link className="b-btn b-btn-p" to="/gimnasio/clases">
              Reservar mi primera clase
            </Link>
            <Link className="b-btn" to="/gimnasio">
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    )

  return (
    <section className="b-wrap b-alta" aria-labelledby="b-titulo">
      <h1 id="b-titulo" tabIndex={-1} ref={titulo} className="b-d b-media">
        Hazte socio
      </h1>
      <ol className="b-pasos" aria-label="Pasos del alta">
        {PASOS.map((nombre, i) => (
          <li
            key={nombre}
            className={i < paso ? "is-hecho" : i === paso ? "is-actual" : ""}
            aria-current={i === paso ? "step" : undefined}
          >
            {nombre}
          </li>
        ))}
      </ol>
      <p className="b-paso-texto">
        Paso {paso + 1} de {PASOS.length}: {PASOS[paso]}
      </p>
      <form className="b-alta-form" onSubmit={seguir} noValidate>
        <fieldset disabled={enviando} className="b-alta-campos">
          {paso === 0 && (
            <>
              <fieldset className="b-alta-planes">
                <legend>Membresía</legend>
                {PLANES.map((p) => (
                  <label key={p.id} className="b-alta-plan">
                    <input
                      type="radio"
                      name="plan"
                      value={p.id}
                      checked={datos.plan === p.id}
                      onChange={cambiar("plan")}
                    />
                    <span>
                      <strong>{p.nombre}</strong>
                      <small>{p.lema}</small>
                      <b className="b-num">{pesos(p.precio)} al mes</b>
                    </span>
                  </label>
                ))}
              </fieldset>
              <div className="b-campo-alta">
                <label htmlFor="b-alta-sucursal">Sucursal base</label>
                <select id="b-alta-sucursal" value={datos.sucursal} onChange={cambiar("sucursal")}>
                  {SUCURSALES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre} · {s.rasgo}
                    </option>
                  ))}
                </select>
                <p className="b-nota">
                  Ahí guardas tu locker y ves tu aforo primero. Tu plan abre las cinco sucursales.
                </p>
              </div>
            </>
          )}
          {paso === 1 && (
            <>
              {campo("nombre", "Nombre completo", { autoComplete: "name", maxLength: 60 })}
              {campo("correo", "Correo", {
                type: "email",
                autoComplete: "email",
                inputMode: "email",
                spellCheck: false,
              })}
              {campo("telefono", "Teléfono celular, 10 dígitos", {
                type: "tel",
                autoComplete: "tel-national",
                inputMode: "tel",
              })}
              <p className="b-nota">
                Estos datos solo viven en esta página: no se guardan ni se envían.
              </p>
            </>
          )}
          {paso === 2 && (
            <div className="b-alta-salud">
              <p>
                En un club real, aquí responderías un cuestionario breve de preparación para la
                actividad física. Pregunta, entre otras cosas:
              </p>
              <ul>
                {TEMAS_SALUD.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p>
                Si respondes «sí» a alguna, el club te pide el visto bueno de tu médico antes de
                entrenar con intensidad. Son datos sensibles: la ley pide tu consentimiento expreso
                y por escrito, aparte del alta.
              </p>
              <p className="b-ficcion">
                Esta demo no pide datos de salud. Continúa para ver el reglamento.
              </p>
            </div>
          )}
          {paso === 3 && (
            <>
              <ul className="b-reglamento">
                {REGLAMENTO.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="b-campo-alta b-casilla">
                <input
                  id="b-alta-acepta"
                  type="checkbox"
                  checked={datos.acepta}
                  onChange={cambiar("acepta")}
                  aria-invalid={Boolean(errores.acepta)}
                  aria-describedby={errores.acepta ? "b-alta-acepta-error" : undefined}
                />
                <label htmlFor="b-alta-acepta">
                  Leí el reglamento y la responsiva, y los acepto.
                </label>
                {errores.acepta && (
                  <p id="b-alta-acepta-error" className="b-error">
                    {errores.acepta}
                  </p>
                )}
              </div>
              {campo("firma", "Firma: escribe tu nombre completo", {
                autoComplete: "off",
                className: "b-firma",
              })}
            </>
          )}
          {paso === 4 && (
            <>
              <fieldset className="b-alta-planes">
                <legend>Cómo pagas</legend>
                {METODOS_PAGO.map((m) => (
                  <label key={m.id} className="b-alta-plan">
                    <input
                      type="radio"
                      name="pago"
                      value={m.id}
                      checked={datos.pago === m.id}
                      onChange={cambiar("pago")}
                    />
                    <span>
                      <strong>{m.nombre}</strong>
                      <small>{m.nota}</small>
                    </span>
                  </label>
                ))}
              </fieldset>
              <dl className="b-alta-resumen">
                <div>
                  <dt>Plan {plan.nombre}, primer mes</dt>
                  <dd className="b-num">{pesos(plan.precio)}</dd>
                </div>
                <div>
                  <dt>Inscripción</dt>
                  <dd className="b-num">$0</dd>
                </div>
                <div className="b-alta-total">
                  <dt>Total, IVA incluido</dt>
                  <dd className="b-num">{pesos(plan.precio)} MXN</dd>
                </div>
              </dl>
              <p className="b-nota">
                Mes a mes, sin plazo forzoso. Se renueva el {fechaLarga(renovacion(new Date()))}; te
                avisamos cinco días antes y cancelas desde tu perfil en un paso.
              </p>
            </>
          )}
          <div className="b-acciones">
            {paso > 0 && (
              <button type="button" className="b-btn" onClick={() => setPaso(paso - 1)}>
                Atrás
              </button>
            )}
            <button type="submit" className="b-btn b-btn-p">
              {enviando
                ? "Dando de alta…"
                : paso === PASOS.length - 1
                  ? "Confirmar alta"
                  : paso === 2
                    ? "Entendido, continuar"
                    : "Continuar"}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  )
}
