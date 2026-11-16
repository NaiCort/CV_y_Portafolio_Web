# Validación de V4.5.0

Entorno: Node 22, Chromium de Playwright, servidor de desarrollo de Vite. Revisión del 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El código del taller pesa 28.8 kB de JavaScript (9.8 kB comprimido) y 15.3 kB de CSS (4.0 kB comprimido).
- **193 pruebas en 25 archivos.** Se conservan las 179 anteriores y se añaden 14 en `tests/taller.test.jsx`: cada testigo apunta a un servicio existente en los dos talleres; solo Vértice tiene sucursales y Mi garaje; créditos de las fotos; formato de precios y textos sin cifra; búsqueda de la orden sin importar guiones, espacios ni mayúsculas, y datos incompletos frente a una orden que no existe; lectura y guardado del tema; Inicio con un solo `h1`; cambio de taller recordado; lectura del testigo con la oferta del taller del tema; agendar desde un testigo; llamada simulada sin enlaces `tel:`; la consulta en sus cinco estados; créditos y rutas desconocidas.
- **Pruebas de navegador desde la primera entrega:** `npm run test:browser:taller`, cinco recorridos de 320 a 1440 px, **5 de 5 aprobados**. Cada uno revisa Inicio y Créditos en los dos talleres (un `h1`, sin `href="#"` ni `tel:`, sin desbordamiento, axe), elige un testigo, agenda desde él, consulta la orden de ejemplo, prueba la llamada simulada (barra en teléfono, número en la cabecera en pantallas anchas), cambia de taller, recarga y comprueba que la altura no salta al ir y volver de tema.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA) en los cinco anchos, los dos talleres y con los diálogos abiertos: **sin infracciones**. Durante la revisión se corrigió una regla de enlaces que oscurecía «Ver todos los giros» del banner compartido en Rosales (la misma trampa que en Brío).
- Detector de impeccable en Inicio: se corrigieron el contraste de los ejemplos dentro de los campos de la consulta y una palabra sola al final de un párrafo. Queda la etiqueta superior de la llamada comercial compartida, ya anotada para V4.8.
- Contrastes de las dos paletas calculados y anotados en la ficha.
- Conteo de patrones vigilados en Inicio: fondo oscuro en todo Vértice y monoespaciada solo en los datos de la orden; ambos permitidos con motivo en la ficha. Los seis testigos son botones de tablero con dibujo y texto propios.

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla y Core Web Vitals medidos; se harán al cerrar V4.5.

## Reproducción

```bash
npm ci
npm run lint
npm run format:check
npm test
npm run build
npm run test:browser:taller
```
