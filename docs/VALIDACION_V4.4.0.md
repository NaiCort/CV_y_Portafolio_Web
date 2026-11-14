# Validación de V4.4.0

Entorno: Node 22, Chromium de Playwright, compilación de producción servida con `vite preview`. Revisión del 14 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier (`format:check`) y compilación de producción sin errores. El código de Brío pesa 27.5 kB de JavaScript (9.7 kB comprimido) y 15.6 kB de CSS (4.3 kB comprimido).
- **132 pruebas en 18 archivos.** Se conservan las 116 anteriores y se añaden 16 en `tests/gimnasio.test.jsx`: integridad de sucursales, horario, coaches y planes; horario de hoy por sucursal; aforo cerrado fuera de horario, más alto en la tarde y dentro de 2–97 %; nombres de estado; próximas clases en orden y solo futuras; lugares libres estables y dentro del cupo; «hoy», «mañana» y día de la semana; lectura y guardado del tema; código del pase cada 30 s; Inicio con un solo `h1`, título propio, cifras del horario y sin `href="#"`; cambio de tema; elección de sucursal; aviso del área de socio; créditos con licencia.
- Capturas en Chromium a 1440 y 390 px en los dos temas: sin desbordamiento horizontal ni errores de consola.
- Disco de la portada: Ian vio en su revisión que, a unos 560 px, el disco tapaba los botones. Ahora, hasta 900 px, va debajo de los botones dentro del flujo, y en escritorio su tamaño depende del ancho. Se midió la distancia entre el círculo y el título, el texto y los dos botones en 11 anchos (360 a 1920 px): ninguno se toca.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA) a 1440 y 390 px en los dos temas, en Inicio y Créditos: **sin infracciones**. Durante la revisión se corrigieron el contraste de «No incluido» en la tabla, el terracota sobre su tinte en Distrito, la tabla desplazable sin acceso por teclado, y una regla de enlaces que oscurecía el enlace del banner compartido en el tema Cobalto. Sigue la alerta de buenas prácticas `region` del banner compartido, ya anotada para V4.8.
- Contrastes de las dos paletas calculados y anotados en la ficha.
- Conteo de patrones vigilados en Inicio: fondo oscuro en la franja de sucursales y clases, y velo oscuro sobre las fotos para leer el texto; ambos permitidos con motivo en la ficha. La llamada comercial compartida conserva su etiqueta superior (V4.8).

## No comprobado todavía

Teléfono físico, Safari, lector de pantalla, Core Web Vitals medidos y pruebas de navegador automatizadas de Brío; se harán al cerrar V4.4.

## Reproducción

```bash
npm ci
npm run lint
npm run format:check
npm test
npm run build
```
