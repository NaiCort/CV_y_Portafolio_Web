import { CONTACTO_INTRO, PERSONA, PORTADA } from "../data/consultorio"
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

// Cuaderno (docs/FICHA_PSICOLOGO.md): retícula de impresión con notas al margen, la polaroid con
// cinta, honorarios como lista de libreta y un subrayado de marcatexto por título como mucho.
function Subrayado({ children }) {
  return (
    <span className="p-subrayado">
      {children}
      <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 9 C 60 3, 140 13, 298 5" pathLength="1" />
      </svg>
    </span>
  )
}

export default function Cuaderno({ onAgendar, onPrivacidad, onPedirInfo, temaContacto }) {
  const [antes, marcado, despues] = PORTADA.titulo.cuaderno
  return (
    <div className="psi psi-cuaderno">
      <Cabecera
        marca={
          <>
            Valeria Romero <span className="p-marca-mano">psicóloga</span>
          </>
        }
        onAgendar={() => onAgendar("llamada")}
      />
      <main id="contenido" tabIndex={-1}>
        <section id="inicio" className="p-portada" aria-labelledby="inicio-titulo">
          <div className="p-wrap p-portada-in" data-entra="">
            <p className="p-margen">
              aquí empieza todo, con una llamada <span aria-hidden="true">→</span>
            </p>
            <div className="p-cuerpo p-portada-carga">
              <h1 id="inicio-titulo">
                {antes}
                <Subrayado>{marcado}</Subrayado>
                {despues}
              </h1>
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
            <figure className="p-polaroid">
              <Foto
                {...PORTADAS.cuaderno}
                alt="Retrato de una mujer sonriente con saco gris, sentada junto a una ventana"
                prioridad
              />
              <figcaption>Valeria (foto ilustrativa: no es ella)</figcaption>
            </figure>
          </div>
        </section>

        <Seccion id="te-suena" titulo="¿Te suena esto?" margen="lo que más escucho en consulta">
          <Motivos />
        </Seccion>

        <Seccion id="como-trabajo" titulo="Cómo trabajo" margen="sin jerga, prometido">
          <Enfoque />
        </Seccion>

        <Seccion
          id="sobre-mi"
          titulo="Sobre mí"
          margen={`${PERSONA.anios} años de práctica · supervisión cada mes`}
        >
          <div className="p-dos">
            <div>
              <Historia />
            </div>
            <div className="p-ficha">
              <h3>Formación y supervisión</h3>
              <Formacion />
              <Resenas tema="cuaderno" />
            </div>
          </div>
        </Seccion>

        <Seccion id="honorarios" titulo="Honorarios" margen="precios claros antes de escribir">
          <Honorarios forma="libreta" />
        </Seccion>

        <Seccion
          id="primera-sesion"
          titulo="Así es tu primera sesión"
          margen="notas de la primera sesión"
        >
          <PrimeraSesion conNota />
          <button type="button" className="p-btn p-btn-s" onClick={() => onAgendar("primera")}>
            Agenda tu primera sesión
          </button>
        </Seccion>

        <Seccion id="en-linea" titulo="Terapia en línea" margen="desde donde estés">
          <EnLinea />
          <Foto
            nombre="cuaderno"
            anchos={[700, 1200]}
            sizes="(min-width: 900px) 560px, 90vw"
            alt="Libreta abierta con una pluma fuente y unos lentes sobre una mesa de madera"
            className="p-foto-mesa"
          />
        </Seccion>

        <section className="p-seccion" aria-labelledby="respira-titulo">
          <div className="p-wrap p-seccion-in" data-entra="">
            <p className="p-margen">un minuto, cuando quieras</p>
            <div className="p-cuerpo">
              <Respira titulo="Respira conmigo">
                <p>
                  Sigue la línea: sube mientras inhalas 4 segundos y baja mientras exhalas 6. Tú lo
                  empiezas y lo detienes. No sustituye la terapia.
                </p>
              </Respira>
            </div>
          </div>
        </section>

        <Seccion
          id="instituciones"
          titulo="Instituciones y colegas"
          margen="escuelas, empresas y colegas"
        >
          <Instituciones onPedir={onPedirInfo} />
        </Seccion>

        <Seccion id="recursos" titulo="Recursos" margen="para leer con calma">
          <Recursos />
        </Seccion>

        <Seccion id="preguntas" titulo="Preguntas frecuentes" margen="lo que más me preguntan">
          <Preguntas />
        </Seccion>

        <div className="p-wrap">
          <Crisis titulo="Si estás en riesgo, no esperes." />
        </div>

        <Seccion id="contacto" titulo="Escríbeme" margen="te respondo el mismo día">
          <p className="p-entrada">{CONTACTO_INTRO}</p>
          <Contacto temaInicial={temaContacto} onPrivacidad={onPrivacidad} />
        </Seccion>
      </main>
      <Pie onPrivacidad={onPrivacidad} />
    </div>
  )
}
