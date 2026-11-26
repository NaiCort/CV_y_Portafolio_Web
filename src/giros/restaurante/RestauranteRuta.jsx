import RestaurantProvider from "./state/RestaurantProvider"
import FloatingTimer from "./components/FloatingTimer"
import RestauranteApp from "./RestauranteApp"

// Ruta de Patio 12 (V4.10.6, DEC-021). El estado de la visita y el contador flotante vivían en
// App.jsx y bajaban con todo el sitio aunque solo se usan aquí. Ahora llegan con el código del
// restaurante. La visita no se pierde al salir y volver: se guarda en el navegador y sus relojes
// usan la hora de término, no un conteo en marcha.
export default function RestauranteRuta() {
  return (
    <RestaurantProvider>
      <RestauranteApp />
      <FloatingTimer />
    </RestaurantProvider>
  )
}
