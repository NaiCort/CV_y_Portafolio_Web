# Estado de V4.5.6 · Cierre de Taller mecánico

Séptima entrega y cierre del giro Taller mecánico, 16 de noviembre de 2026. Base: V4.5.5 en `main` (`e828ae3`). Ficha: [FICHA_TALLER.md](FICHA_TALLER.md).

## Construido en esta entrega

- **Aviso de privacidad** al pie de cada página: qué guarda la demo en el navegador (taller elegido, citas, presupuesto y Mi garaje), qué pediría un taller real y «Borrar mis datos de esta demo» con confirmación. Al borrar, vuelve a Rosales, vacía las citas, reinicia el presupuesto y cierra Mi garaje, con un aviso.
- **La Bienvenida enlaza el taller** (`/taller`).
- La consulta sin orden lleva un h2 antes del formulario.
- La foto de portada de Rosales pesa 95 kB en lugar de 207 kB (suavizado ligero del grano, anotado en sus créditos y huella actualizada).

## El taller completo (V4.5.0 a V4.5.6)

Dos talleres ficticios en Xalapa, uno por tema: **Mecánica Rosales** (familiar, colonia Revolución, papel y rojo de sello) y **Vértice** (multimarca, cuatro sucursales, tablero de noche con ámbar).

| Página | Ruta | Taller |
|---|---|---|
| Inicio: testigos del tablero, orden de ejemplo, precios desde, consulta o Mi garaje, mapa | `/taller` | Ambos |
| Agendar cita | `/taller/cita` | Ambos |
| Consulta tu auto: presupuesto con visto bueno, hallazgo y entrega | `/taller/consulta` | Ambos |
| Lista de precios con suma aproximada y reglas de Profeco | `/taller/precios` | Ambos |
| Revisión antes de comprar un usado | `/taller/usados` | Rosales |
| Hojalatería y seguros | `/taller/hojalateria` | Vértice |
| Híbridos y eléctricos | `/taller/hibridos` | Vértice |
| Mi garaje | `/taller/garaje` | Vértice |
| Créditos | `/taller/creditos` | Ambos |

## Qué revisar en la vista previa

1. Entrar desde la Bienvenida.
2. Abrir el aviso de privacidad, borrar los datos y comprobar que vuelve a Rosales sin citas.
3. Recorrer el menú del teléfono en los dos talleres.
