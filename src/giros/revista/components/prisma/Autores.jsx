import { Fragment } from "react"
import { Link } from "react-router-dom"
import { findAutor } from "../../data/prisma"

// «Por A, B y C»: cada autor enlaza a su perfil.
export default function Autores({ ids, por = true }) {
  return (
    <p className="pr-autores">
      {por && "Por "}
      {ids.map((id, i) => {
        const a = findAutor(id)
        return (
          <Fragment key={id}>
            {i > 0 && (i === ids.length - 1 ? " y " : ", ")}
            <Link to={`/revista/prisma/autor/${id}`}>{a.nombre}</Link>
          </Fragment>
        )
      })}
    </p>
  )
}
