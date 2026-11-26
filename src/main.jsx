import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { precargarPortada } from "./rutasDemo"

// La portada llega prerenderizada (scripts/prerender.mjs): React reutiliza ese HTML en lugar de
// volver a dibujarlo. Las demás rutas llegan vacías (dist/app.html) y se dibujan desde cero.
precargarPortada(window.location.pathname)
const raiz = document.getElementById("root")
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
if (raiz.hasChildNodes()) hydrateRoot(raiz, app)
else createRoot(raiz).render(app)
