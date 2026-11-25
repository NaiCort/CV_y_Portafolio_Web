import { useEffect, useId, useState } from "react"
import { Menu, X } from "lucide-react"
import Modal from "../../../components/shared/Modal"
import { CREDITOS, CRISIS, NAV, PERSONA, PREGUNTAS, RECURSOS, RESENAS } from "../data/consultorio"

// Piezas comunes de la landing (V4.10.2). Cada tema las acomoda a su manera; el texto es el mismo.

export function Crisis({ compacta = false, titulo = CRISIS.titulo }) {
  if (compacta)
    return (
      <p className="p-crisis-breve">
        Este sitio no atiende emergencias. Si estás en riesgo, llama al <a href="tel:911">911</a> o
        a la Línea de la Vida, <a href={`tel:${CRISIS.tel}`}>{CRISIS.numero}</a> (gratuita, 24
        horas).
      </p>
    )
  return (
    <aside className="p-crisis" aria-labelledby="crisis-titulo">
      <div className="p-crisis-texto">
        <h2 id="crisis-titulo">{titulo}</h2>
        <p>{CRISIS.texto}</p>
        <ul className="p-crisis-otras">
          {CRISIS.otras.map(([nombre, numero, tel]) => (
            <li key={tel}>
              {nombre}: <a href={`tel:${tel}`}>{numero}</a>
            </li>
          ))}
        </ul>
      </div>
      <a className="p-crisis-numero" href={`tel:${CRISIS.tel}`}>
        <span className="p-crisis-linea">Línea de la Vida</span>
        {CRISIS.numero}
      </a>
    </aside>
  )
}

export function Cedula({ enlace = true }) {
  return (
    <p className="p-cedula">
      {PERSONA.licenciatura} · Cédula profesional {PERSONA.cedula} ({PERSONA.cedulaNota})
      {enlace && (
        <>
          {" · "}
          <a href={PERSONA.verificar} target="_blank" rel="noopener noreferrer">
            Verificar en la SEP
            <span className="p-oculto"> (se abre en otra pestaña)</span>
          </a>
        </>
      )}
    </p>
  )
}

export function Preguntas() {
  return (
    <div className="p-preguntas">
      {PREGUNTAS.map(([pregunta, respuesta]) => (
        <details key={pregunta}>
          <summary>{pregunta}</summary>
          <p>{respuesta}</p>
        </details>
      ))}
    </div>
  )
}

export function Recursos() {
  return (
    <div className="p-recursos">
      {RECURSOS.map((r) => (
        <article key={r.id} className="p-recurso" aria-labelledby={`recurso-${r.id}`}>
          <h3 id={`recurso-${r.id}`}>{r.titulo}</h3>
          <p className="p-recurso-resumen">{r.resumen}</p>
          <details>
            <summary>
              Leer la nota<span className="p-oculto">: {r.titulo}</span>
            </summary>
            {r.texto.map((t) => (
              <p key={t}>{t}</p>
            ))}
            {r.crisis && <Crisis compacta />}
            <p className="p-nota">Nota de orientación general: no sustituye la consulta.</p>
          </details>
        </article>
      ))}
    </div>
  )
}

export function Resenas({ tema }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="p-resenas">
      <p>{RESENAS.texto}</p>
      <button type="button" className="p-enlace" onClick={() => setAbierto(true)}>
        {RESENAS.enlace}
      </button>
      {abierto && (
        <Modal
          title="Opiniones en plataformas públicas"
          onClose={() => setAbierto(false)}
          className={`p-modal p-modal-${tema}`}
          radius={tema === "cuaderno" ? 6 : 16}
        >
          {RESENAS.modal.map((t) => (
            <p key={t} className="p-modal-texto">
              {t}
            </p>
          ))}
          <button type="button" className="p-btn p-btn-p" onClick={() => setAbierto(false)}>
            Volver a la página
          </button>
        </Modal>
      )}
    </div>
  )
}

export function AvisoPrivacidad({ tema, onClose }) {
  return (
    <Modal
      title="Aviso de privacidad"
      onClose={onClose}
      className={`p-modal p-modal-${tema}`}
      radius={tema === "cuaderno" ? 6 : 16}
    >
      <div className="p-modal-texto p-privacidad">
        <p>
          Responsable: {PERSONA.nombre}, {PERSONA.direccion}. Es un aviso de ejemplo para una
          consulta ficticia.
        </p>
        <p>
          <strong>Qué datos pido en este sitio:</strong> tu nombre y un teléfono o correo, solo para
          responderte, confirmar citas y recordártelas. No pido datos de salud en línea.
        </p>
        <p>
          <strong>Datos sensibles:</strong> lo que hablamos en consulta y tu expediente se tratan
          con tu consentimiento expreso y por escrito, como pide la ley de datos personales, y se
          guardan el tiempo que marca la norma del expediente clínico.
        </p>
        <p>
          <strong>Tus derechos:</strong> puedes pedir acceso, corrección, cancelación u oposición
          (derechos ARCO) escribiendo a {PERSONA.correo}. Respondo en un máximo de 20 días hábiles.
        </p>
        <p>
          <strong>En esta demo:</strong> nada de lo que escribes sale de tu navegador ni se guarda;
          solo se recuerda el tema visual. Las fotos y las tipografías se sirven desde este mismo
          sitio, y el mapa carga sus imágenes de OpenFreeMap.
        </p>
      </div>
      <button type="button" className="p-btn p-btn-p" onClick={onClose}>
        Entendido
      </button>
    </Modal>
  )
}

export function Cabecera({ marca, onAgendar, accionCorta = "Agenda una llamada" }) {
  const [abierto, setAbierto] = useState(false)
  const id = useId()
  useEffect(() => {
    if (!abierto) return undefined
    const cerrar = (e) => e.key === "Escape" && setAbierto(false)
    window.addEventListener("keydown", cerrar)
    return () => window.removeEventListener("keydown", cerrar)
  }, [abierto])
  return (
    <header className="p-cabecera">
      <div className="p-wrap p-cabecera-in">
        <a className="p-marca" href="#inicio">
          {marca}
        </a>
        <nav className="p-nav" aria-label="Secciones">
          {NAV.map(([ancla, texto]) => (
            <a key={ancla} href={`#${ancla}`}>
              {texto}
            </a>
          ))}
        </nav>
        <button type="button" className="p-btn p-btn-p p-cabecera-cta" onClick={onAgendar}>
          {accionCorta}
        </button>
        <button
          type="button"
          className="p-menu-boton"
          aria-expanded={abierto}
          aria-controls={id}
          onClick={() => setAbierto((a) => !a)}
        >
          {abierto ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="p-oculto">{abierto ? "Cerrar el menú" : "Abrir el menú"}</span>
        </button>
      </div>
      <nav id={id} className="p-menu-movil" hidden={!abierto} aria-label="Secciones (menú)">
        {NAV.map(([ancla, texto]) => (
          <a key={ancla} href={`#${ancla}`} onClick={() => setAbierto(false)}>
            {texto}
          </a>
        ))}
        <button
          type="button"
          className="p-btn p-btn-p"
          onClick={() => {
            setAbierto(false)
            onAgendar()
          }}
        >
          Agenda una llamada de 15 minutos
        </button>
      </nav>
    </header>
  )
}

export function Pie({ onPrivacidad }) {
  return (
    <footer className="p-pie">
      <div className="p-wrap p-pie-in">
        <div>
          <p className="p-pie-nombre">
            {PERSONA.nombre}, {PERSONA.titulo.toLowerCase()} en {PERSONA.ciudad}
          </p>
          <Cedula />
          <p>{PERSONA.avisoPublicidad}</p>
        </div>
        <div>
          <Crisis compacta />
          <p>
            <button type="button" className="p-enlace" onClick={onPrivacidad}>
              Aviso de privacidad
            </button>
          </p>
          <p className="p-creditos">{CREDITOS}</p>
        </div>
      </div>
    </footer>
  )
}

// Envuelve una sección con su título; `margen` es la nota al margen (solo en Cuaderno).
export function Seccion({ id, titulo, margen, className = "", children, sinTitulo = false }) {
  return (
    <section id={id} className={`p-seccion ${className}`} aria-labelledby={`${id}-titulo`}>
      <div className="p-wrap p-seccion-in" data-entra="">
        {margen && <p className="p-margen">{margen}</p>}
        <div className="p-cuerpo">
          <h2 id={`${id}-titulo`} className={sinTitulo ? "p-oculto" : undefined}>
            {titulo}
          </h2>
          {children}
        </div>
      </div>
    </section>
  )
}
