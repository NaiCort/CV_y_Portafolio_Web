import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import Bienvenida from "./pages/Bienvenida"
import NotFound from "./pages/NotFound"
import Cotizador from "./pages/Cotizador"
import RestaurantProvider from "./giros/restaurante/state/RestaurantProvider"
import FloatingTimer from "./giros/restaurante/components/FloatingTimer"
import RouteErrorBoundary from "./components/shared/RouteErrorBoundary"
import { CARGAS } from "./rutasDemo"

const PsicologoApp = lazy(CARGAS["/psicologo"])
const RestauranteApp = lazy(CARGAS["/restaurante"])
const CafeApp = lazy(CARGAS["/cafe"])
const GimnasioApp = lazy(CARGAS["/gimnasio"])
const TallerApp = lazy(CARGAS["/taller"])
const DespachoApp = lazy(CARGAS["/despacho"])
const RevistaApp = lazy(CARGAS["/revista"])

function RouteLoading() {
  return (
    <div className="route-message" role="status">
      Cargando demo…
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
        <RestaurantProvider>
          <RoutePosition />
          <RouteErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Bienvenida />} />
                <Route path="/cotizador" element={<Cotizador />} />
                <Route path="/psicologo" element={<PsicologoApp />} />
                <Route path="/restaurante/*" element={<RestauranteApp />} />
                <Route path="/cafe/*" element={<CafeApp />} />
                <Route path="/gimnasio/*" element={<GimnasioApp />} />
                <Route path="/taller/*" element={<TallerApp />} />
                <Route path="/despacho/*" element={<DespachoApp />} />
                <Route path="/revista/*" element={<RevistaApp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </RouteErrorBoundary>
          <FloatingTimer />
        </RestaurantProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}
