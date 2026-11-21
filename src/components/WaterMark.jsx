import { Link } from "react-router-dom"

// Autoría de la demo. Antes era una etiqueta fija abajo a la izquierda que tapaba el texto al
// desplazarse (pendiente 6 de V4.8); ahora cierra la página, después del pie de cada negocio,
// y lleva al CV y portafolio de Ian.
export default function WaterMark() {
  return (
    <aside
      className="demo-watermark px-4 py-3 bg-[#111318] text-white text-center"
      aria-label="Autoría de la demo"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <p className="text-xs">
        Demo hecha por{" "}
        <Link to="/" className="underline underline-offset-2">
          Ian Habid Aldana Martínez
        </Link>
        . El negocio, sus datos y sus envíos son simulados.
      </p>
    </aside>
  )
}
