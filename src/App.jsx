import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import NotFound from "./pages/NotFound"
import RouteErrorBoundary from "./components/shared/RouteErrorBoundary"
import VolverCotizador from "./components/shared/VolverCotizador"
import { CARGAS } from "./rutasDemo"

const Bienvenida = lazy(CARGAS["/"])
const Cotizador = lazy(CARGAS["/cotizador"])
const Privacidad = lazy(CARGAS["/privacidad"])
const PsicologoApp = lazy(CARGAS["/psicologo"])
const RestauranteRuta = lazy(CARGAS["/restaurante"])
const CafeApp = lazy(CARGAS["/cafe"])
const GimnasioApp = lazy(CARGAS["/gimnasio"])
const TallerApp = lazy(CARGAS["/taller"])
const DespachoApp = lazy(CARGAS["/despacho"])
const RevistaApp = lazy(CARGAS["/revista"])

// Mientras llega el código de una ruta perezosa (demos, cotizador y aviso de privacidad).
function RouteLoading() {
  return (
    <div className="route-message" role="status">
      Cargando…
    </div>
  )
}
function RoutePosition() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])
  return null
}
export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <RoutePosition />
        <VolverCotizador />
        <RouteErrorBoundary>
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Bienvenida />} />
              <Route path="/cotizador" element={<Cotizador />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/psicologo" element={<PsicologoApp />} />
              <Route path="/restaurante/*" element={<RestauranteRuta />} />
              <Route path="/cafe/*" element={<CafeApp />} />
              <Route path="/gimnasio/*" element={<GimnasioApp />} />
              <Route path="/taller/*" element={<TallerApp />} />
              <Route path="/despacho/*" element={<DespachoApp />} />
              <Route path="/revista/*" element={<RevistaApp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </MotionConfig>
    </BrowserRouter>
  )
}
