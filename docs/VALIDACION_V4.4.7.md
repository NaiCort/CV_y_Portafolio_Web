# Validación de V4.4.7

Entorno: Node 22, Chromium de Playwright, compilación de producción con `vite preview`. 15 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores.
- **167 pruebas en 22 archivos.** La prueba del menú del teléfono ahora también comprueba que se cierra al elegir la página actual.
- **Navegador (`npm run test:browser:gimnasio`):** cinco escenarios de 320, 390, 768, 1024 y 1440 px (táctil por debajo de 640 px; movimiento normal solo en 1440). Cada uno recorre las diez páginas con un h1, sin desbordamiento horizontal y con axe; activa las tarjetas de clase (ratón en 1440: el video corre y se pausa al salir; dedo por debajo de 640: el primer toque activa y el segundo reserva); reserva una clase; hace el alta con errores y firma; entra al área de socio, conecta el reloj y congela; agenda una evaluación; agrega un paquete; aparta un pedido con precio de socio; cambia al tema Distrito y borra todo desde el aviso de privacidad; y comprueba el enlace desde la Bienvenida. El arnés también falla si hay errores de JavaScript, envíos de red o recursos locales rotos. **5 de 5 aprobados.**
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA) con los scripts de cada entrega, en los dos temas a 1440 y 390 px: Inicio, Clases, Planes, alta, área de socio, Coaches, tienda, carrito y Créditos. **Sin infracciones.**
- Detector de impeccable en las diez páginas: sin hallazgos propios de Brío tras los cambios (ver Estado para los compartidos).
- **Core Web Vitals de laboratorio** (390 px, CPU 4× más lenta, 4G lenta: 150 ms de latencia y 1.6 Mb/s):

| Página | LCP | CLS |
|---|---|---|
| Inicio | 1.96 s | 0.060 |
| Clases | 2.10 s | 0.004 |
| Planes | 1.98 s | 0.000 |
| Alta | 1.89 s | 0.000 |
| Área de socio | 1.83 s | 0.033 |
| Coaches | 1.86 s | 0.019 |
| Tienda | 1.94 s | 0.001 |
| Ficha de producto | 1.91 s | 0.009 |
| Carrito | 2.26 s | 0.001 |
| Créditos | 1.90 s | 0.071 |

Todas por debajo de 2.5 s y de 0.1. Los videos no cuentan: solo se descargan al activar una tarjeta. INP no se mide en laboratorio sin interacción real.

## No comprobado

Teléfono físico, Safari y lector de pantalla real: revisión de Ian en la vista previa.
