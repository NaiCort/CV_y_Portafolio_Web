import { CONTACTO_INTRO, PERSONA, PORTADA, SOBRE_MI } from "../data/consultorio"
import { PORTADAS } from "../portadas"
import Contacto from "../components/Contacto"
import Respira from "../components/Respira"
import {
  Cabecera,
  Cedula,
  Crisis,
  Pie,
  Preguntas,
  Recursos,
  Resenas,
  Seccion,
} from "../components/piezas"
import {
  EnLinea,
  Enfoque,
  Formacion,
  Foto,
  Historia,
  Honorarios,
  Instituciones,
  Motivos,
  PrimeraSesion,
} from "../components/secciones"

// Neblina (docs/FICHA_PSICOLOGO.md): por pausas fotográficas. Portada de niebla a todo el ancho,
// presentación con gafete, honorarios en tabla y dos fotos que separan los bloques de lectura.
function Contornos() {
  return (
    <svg
      className="p-contornos"
      width="520"
      height="420"
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M${20 + i * 8} ${380 - i * 30} C ${140 + i * 10} ${300 - i * 34}, ${300 - i * 6} ${360 - i * 40}, ${500 - i * 10} ${260 - i * 24}`}
        />
      ))}
    </svg>
  )
}

function Pausa({ foto, alt, children }) {
  return (
    <div className="p-pausa">
      <Foto nombre={foto} anchos={[800, 1600]} sizes="100vw" alt={alt} />
      {children && <div className="p-pausa-texto">{children}</div>}
    </div>
  )
}

export default function Neblina({ onAgendar, onPrivacidad, onPedirInfo, temaContacto }) {
  return (
    <div className="psi psi-neblina">
      <Cabecera marca="Valeria Romero · Psicología" onAgendar={() => onAgendar("llamada")} />
      <main id="contenido" tabIndex={-1}>
        <section id="inicio" className="p-portada" aria-labelledby="inicio-titulo">
          <Foto {...PORTADAS.neblina} alt="" className="p-portada-foto" prioridad />
          <div className="p-wrap p-portada-in p-portada-carga">
            <h1 id="inicio-titulo">{PORTADA.titulo.neblina}</h1>
            <p className="p-entrada">{PORTADA.texto}</p>
            <div className="p-acciones">
              <button type="button" className="p-btn p-btn-p" onClick={() => onAgendar("llamada")}>
                {PORTADA.accion}
              </button>
              <a className="p-btn p-btn-s" href="#primera-sesion">
                Cómo es la primera sesión
              </a>
            </div>
            <p className="p-nota">{PORTADA.llamada}</p>
            <Cedula enlace={false} />
          </div>
        </section>

        <section id="sobre-mi" className="p-seccion p-presenta" aria-labelledby="sobre-mi-titulo">
          <div className="p-wrap p-presenta-in" data-entra="">
            <figure className="p-retrato">
              <Foto
                nombre="retrato"
                anchos={[500, 900]}
                sizes="(min-width: 900px) 220px, 90vw"
                alt="Retrato de una mujer sonriente con saco gris, sentada junto a una ventana"
              />
              <figcaption>{SOBRE_MI.pieFoto}</figcaption>
            </figure>
            <div>
              <h2 id="sobre-mi-titulo">Sobre mí</h2>
              <Historia />
              <h3>Formación y supervisión</h3>
              <Formacion />
              <Resenas tema="neblina" />
            </div>
            <aside className="p-gafete" aria-label="Cédula profesional">
              <p className="p-gafete-titulo">{PERSONA.licenciatura}</p>
              <p>{PERSONA.maestria}</p>
              <p>
                Cédula {PERSONA.cedula} ({PERSONA.cedulaNota})
              </p>
              <p>
                <a href={PERSONA.verificar} target="_blank" rel="noopener noreferrer">
                  Verificar en el Registro Nacional de Profesionistas
                  <span className="p-oculto"> (se abre en otra pestaña)</span>
                </a>
              </p>
              <p>Supervisión clínica mensual · {PERSONA.anios} años de práctica</p>
            </aside>
          </div>
        </section>

        <section id="te-suena" className="p-seccion p-contorno" aria-labelledby="te-suena-titulo">
          <Contornos />
          <div className="p-wrap" data-entra="">
            <h2 id="te-suena-titulo">Lo que solemos trabajar</h2>
            <Motivos />
          </div>
        </section>

        <Seccion id="como-trabajo" titulo="Cómo trabajo">
          <Enfoque />
        </Seccion>

        <Pausa foto="montana-niebla" alt="Montañas verdes con niebla que se levanta al amanecer">
          <p>La niebla no se quita a la fuerza: se despeja con tiempo.</p>
        </Pausa>

        <Seccion id="honorarios" titulo="Honorarios">
          <Honorarios forma="tabla" />
        </Seccion>

        <section id="primera-sesion" className="p-seccion" aria-labelledby="primera-sesion-titulo">
          <div className="p-wrap p-dos" data-entra="">
            <div>
              <h2 id="primera-sesion-titulo">Tu primera sesión</h2>
              <PrimeraSesion />
              <button type="button" className="p-btn p-btn-s" onClick={() => onAgendar("primera")}>
                Agenda tu primera sesión
              </button>
            </div>
            <div>
              <h2 id="en-linea">Terapia en línea</h2>
              <EnLinea />
            </div>
          </div>
        </section>

        <section className="p-seccion p-respira-pausa" aria-labelledby="respira-titulo">
          <Foto
            nombre="muro-salvia"
            anchos={[700, 1200]}
            sizes="100vw"
            alt=""
            className="p-respira-fondo"
          />
          <div className="p-wrap" data-entra="">
            <Respira titulo="Un minuto para ti">
              <p>
                La bruma se abre cuando inhalas y se cierra cuando exhalas. Tú decides cuándo
                empieza y cuándo termina. No sustituye la terapia.
              </p>
            </Respira>
          </div>
        </section>

        <Seccion id="instituciones" titulo="Instituciones y colegas">
          <Instituciones onPedir={onPedirInfo} />
        </Seccion>

        <Seccion id="recursos" titulo="Recursos">
          <Recursos />
        </Seccion>

        <Seccion id="preguntas" titulo="Preguntas frecuentes">
          <Preguntas />
        </Seccion>

        <div className="p-franja">
          <div className="p-wrap">
            <Crisis titulo="¿Estás en riesgo ahora?" />
          </div>
        </div>

        <Seccion id="contacto" titulo="Contacto">
          <p className="p-entrada">{CONTACTO_INTRO}</p>
          <Contacto temaInicial={temaContacto} onPrivacidad={onPrivacidad} />
        </Seccion>
      </main>
      <Pie onPrivacidad={onPrivacidad} />
    </div>
  )
}
