import { CONTACTO_INTRO, PORTADA, SOBRE_MI } from "../data/consultorio"
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

// Sala con luz (docs/FICHA_PSICOLOGO.md): por bandas. Portada con arco, listas de dos columnas,
// tarjetas en honorarios y una banda olivo de lado a lado para la primera sesión.
export default function Sala({ onAgendar, onPrivacidad, onPedirInfo, temaContacto }) {
  return (
    <div className="psi psi-sala">
      <Cabecera marca="Valeria Romero" onAgendar={() => onAgendar("llamada")} />
      <main id="contenido" tabIndex={-1}>
        <section id="inicio" className="p-portada" aria-labelledby="inicio-titulo">
          <div className="p-wrap p-portada-in">
            <div className="p-portada-texto p-portada-carga">
              <h1 id="inicio-titulo">{PORTADA.titulo.sala}</h1>
              <p className="p-entrada">{PORTADA.texto}</p>
              <div className="p-acciones">
                <button
                  type="button"
                  className="p-btn p-btn-p"
                  onClick={() => onAgendar("llamada")}
                >
                  {PORTADA.accion}
                </button>
                <a className="p-enlace" href="#como-trabajo">
                  {PORTADA.secundaria}
                </a>
              </div>
              <p className="p-nota">{PORTADA.llamada}</p>
              <Cedula />
            </div>
            <figure className="p-arco">
              <Foto
                nombre="retrato"
                anchos={[500, 900]}
                sizes="(min-width: 900px) 440px, 90vw"
                alt="Retrato de una mujer sonriente con saco gris, sentada junto a una ventana"
                prioridad
              />
              <figcaption>{SOBRE_MI.pieFoto}</figcaption>
            </figure>
          </div>
        </section>

        <Seccion id="te-suena" titulo="¿Te suena alguna de estas cosas?" className="p-papel">
          <Motivos />
        </Seccion>

        <Seccion id="como-trabajo" titulo="Cómo trabajo">
          <Enfoque />
        </Seccion>

        <Seccion id="sobre-mi" titulo="Sobre mí" className="p-sobre">
          <div className="p-dos">
            <div>
              <Historia />
            </div>
            <div>
              <h3>Formación y supervisión</h3>
              <Formacion />
              <Resenas tema="sala" />
            </div>
          </div>
        </Seccion>

        <Seccion id="honorarios" titulo="Honorarios">
          <Honorarios forma="tarjetas" />
        </Seccion>

        <section id="primera-sesion" className="p-banda" aria-labelledby="primera-sesion-titulo">
          <div className="p-wrap p-banda-in" data-entra="">
            <div>
              <h2 id="primera-sesion-titulo">Tu primera sesión</h2>
              <PrimeraSesion />
              <button
                type="button"
                className="p-btn p-btn-claro"
                onClick={() => onAgendar("primera")}
              >
                Agenda tu primera sesión
              </button>
            </div>
            <div>
              <Foto
                nombre="sala"
                anchos={[800, 1400]}
                sizes="(min-width: 900px) 520px, 90vw"
                alt="Sala luminosa con sillones claros, plantas y cuadros en la pared"
                className="p-banda-foto"
              />
              <h3 id="en-linea">Terapia en línea</h3>
              <EnLinea />
            </div>
          </div>
        </section>

        <section className="p-seccion" aria-labelledby="respira-titulo">
          <div className="p-wrap" data-entra="">
            <Respira>
              <p>
                Un ejercicio breve que tú inicias y detienes: inhala 4 segundos y exhala 6. No
                sustituye la terapia.
              </p>
            </Respira>
          </div>
        </section>

        <Seccion id="instituciones" titulo="Instituciones y colegas">
          <Instituciones onPedir={onPedirInfo} />
        </Seccion>

        <Seccion id="recursos" titulo="Recursos" className="p-papel">
          <Recursos />
        </Seccion>

        <Seccion id="preguntas" titulo="Preguntas frecuentes">
          <Preguntas />
        </Seccion>

        <div className="p-wrap">
          <Crisis />
        </div>

        <Seccion id="contacto" titulo="Escríbeme">
          <p className="p-entrada">{CONTACTO_INTRO}</p>
          <Contacto temaInicial={temaContacto} onPrivacidad={onPrivacidad} />
        </Seccion>
      </main>
      <Pie onPrivacidad={onPrivacidad} />
    </div>
  )
}
