import { useEffect, useId, useRef, useState } from "react"
import WhatsAppPreview from "../../../components/shared/WhatsAppPreview"
import { PERSONA, TEMAS_CONTACTO } from "../data/consultorio"
import { MEDIOS, validarContacto, validarNombre } from "../lib/agenda"
import Mapa from "./Mapa"

const PUNTO = [{ id: "consultorio", nombre: "Consultorio", coordenadas: PERSONA.coordenadas }]
const MENSAJES = [
  "Hola, quiero agendar la llamada de 15 minutos",
  "Hola, ¿tienes espacio en precio social?",
  "Hola, ¿atiendes en línea desde otra ciudad?",
]
const RESPUESTA =
  "Hola, gracias por escribir. Te respondo en horario de consulta, normalmente el mismo día. Si estás en una emergencia, llama al 911 o a la Línea de la Vida, 800 911 2000. (Respuesta de ejemplo: no se envió ningún mensaje.)"

// Contacto (V4.10.2): formulario corto sin texto libre (nadie escribe aquí su motivo de consulta),
// WhatsApp simulado, dirección con mapa y horario. Cinco estados: inicial, llenado, enviando,
// resultado y salida («Escribir otro» o volver a la página).
export default function Contacto({ temaInicial, onPrivacidad }) {
  const [estado, setEstado] = useState("inicial")
  const [nombre, setNombre] = useState("")
  const [medio, setMedio] = useState("whatsapp")
  const [valor, setValor] = useState("")
  const [asunto, setAsunto] = useState(temaInicial?.valor ?? TEMAS_CONTACTO[0])
  // «Pedir información» en Instituciones elige el tema del mensaje (se ajusta al renderizar).
  const [pedido, setPedido] = useState(temaInicial)
  if (temaInicial !== pedido) {
    setPedido(temaInicial)
    if (temaInicial) setAsunto(temaInicial.valor)
  }
  const [acepta, setAcepta] = useState(false)
  const [errores, setErrores] = useState({})
  const [chat, setChat] = useState(false)
  const temporizador = useRef(null)
  const resultado = useRef(null)
  const base = useId()
  useEffect(() => () => clearTimeout(temporizador.current), [])
  useEffect(() => {
    if (estado === "resultado") resultado.current?.focus()
  }, [estado])
  const medioElegido = MEDIOS.find((m) => m.id === medio)

  const enviar = (e) => {
    e.preventDefault()
    const nuevos = {}
    const n = validarNombre(nombre)
    if (n) nuevos.nombre = n
    const c = validarContacto(medio, valor)
    if (c) nuevos.contacto = c
    if (!acepta) nuevos.acepta = "Confirma que leíste el aviso de privacidad."
    setErrores(nuevos)
    const primero = Object.keys(nuevos)[0]
    if (primero) {
      document.getElementById(`${base}-${primero}`)?.focus()
      return
    }
    setEstado("enviando")
    temporizador.current = setTimeout(() => setEstado("resultado"), 900)
  }
  const otro = () => {
    setEstado("inicial")
    setNombre("")
    setValor("")
    setAcepta(false)
  }

  return (
    <div className="p-contacto">
      <div className="p-contacto-form">
        {estado === "resultado" ? (
          <div className="p-confirmacion">
            <p ref={resultado} tabIndex={-1} role="status" className="p-resultado">
              Gracias, {nombre.trim()}. Valeria te respondería por{" "}
              {medioElegido.nombre.toLowerCase()} sobre «{asunto}». Es una simulación: no se envió
              ni se guardó nada.
            </p>
            <button type="button" className="p-btn p-btn-s" onClick={otro}>
              Escribir otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate aria-busy={estado === "enviando"}>
            <div className="p-campo">
              <label htmlFor={`${base}-nombre`}>Tu nombre</label>
              <input
                id={`${base}-nombre`}
                value={nombre}
                autoComplete="given-name"
                aria-invalid={!!errores.nombre}
                aria-describedby={errores.nombre ? `${base}-nombre-e` : undefined}
                onChange={(e) => setNombre(e.target.value)}
                onFocus={() => estado === "inicial" && setEstado("llenando")}
              />
              {errores.nombre && (
                <p className="p-error" id={`${base}-nombre-e`}>
                  {errores.nombre}
                </p>
              )}
            </div>
            <fieldset className="p-campo">
              <legend>¿Cómo te respondo?</legend>
              <div className="p-segmento">
                {MEDIOS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={medio === m.id}
                    onClick={() => setMedio(m.id)}
                  >
                    {m.nombre}
                  </button>
                ))}
              </div>
              <label htmlFor={`${base}-contacto`} className="p-sub">
                {medioElegido.etiqueta}
              </label>
              <input
                id={`${base}-contacto`}
                type={medioElegido.tipo}
                inputMode={medioElegido.tipo === "tel" ? "tel" : "email"}
                autoComplete={medioElegido.tipo === "tel" ? "tel" : "email"}
                value={valor}
                aria-invalid={!!errores.contacto}
                aria-describedby={errores.contacto ? `${base}-contacto-e` : undefined}
                onChange={(e) => setValor(e.target.value)}
              />
              {errores.contacto && (
                <p className="p-error" id={`${base}-contacto-e`}>
                  {errores.contacto}
                </p>
              )}
            </fieldset>
            <div className="p-campo">
              <label htmlFor={`${base}-asunto`}>Tema</label>
              <select
                id={`${base}-asunto`}
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              >
                {TEMAS_CONTACTO.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <p className="p-nota">
              No hay espacio para escribir tu motivo de consulta, a propósito: eso lo hablamos en
              persona, con confidencialidad.
            </p>
            <label className="p-check" id={`${base}-acepta`} tabIndex={-1}>
              <input
                type="checkbox"
                checked={acepta}
                onChange={(e) => setAcepta(e.target.checked)}
              />
              <span>
                Leí el{" "}
                <button type="button" className="p-enlace" onClick={onPrivacidad}>
                  aviso de privacidad
                </button>
                .
              </span>
            </label>
            {errores.acepta && <p className="p-error">{errores.acepta}</p>}
            <button type="submit" className="p-btn p-btn-t" disabled={estado === "enviando"}>
              {estado === "enviando" ? "Enviando…" : "Enviar"}
            </button>
            {estado === "enviando" && (
              <p className="p-oculto" role="status">
                Enviando…
              </p>
            )}
          </form>
        )}
      </div>
      <div className="p-contacto-datos">
        <button type="button" className="p-btn p-btn-s" onClick={() => setChat(true)}>
          Escribir por WhatsApp
        </button>
        <dl className="p-datos">
          <div>
            <dt>Consultorio</dt>
            <dd>{PERSONA.direccion} (dirección de ejemplo)</dd>
          </div>
          <div>
            <dt>Teléfono</dt>
            <dd>{PERSONA.telefono} (de ejemplo)</dd>
          </div>
          <div>
            <dt>Horario</dt>
            <dd>
              {PERSONA.horario.map(([dias, horas]) => (
                <span key={dias} className="p-horario">
                  {dias}: {horas}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <Mapa
          puntos={PUNTO}
          elegida="consultorio"
          onElegir={() => {}}
          estilo="claro"
          etiqueta="Mapa de Xalapa con la ubicación de ejemplo del consultorio"
        />
      </div>
      <WhatsAppPreview
        isOpen={chat}
        onClose={() => setChat(false)}
        businessName={PERSONA.nombre}
        autoReply={RESPUESTA}
        messages={MENSAJES}
      />
    </div>
  )
}
