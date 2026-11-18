# Validación de V4.6.7 · Despacho contable, portada editorial

Entorno: Node 22, Chromium de Playwright; compilación de producción servida con `vite preview`. Revisión del 18 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 85.3 kB de JavaScript (25.0 kB comprimido) y 26.5 kB de CSS (6.2 kB comprimido). Fotos nuevas: Xalapa de 59 kB (960 px) o 179 kB (1920 px) y consulta de 16 kB (640 px) o 41 kB (1280 px), las dos con carga diferida.
- **285 pruebas en 35 archivos**; dos nuevas: la estructura de la portada (libro mayor oculto a lectores de pantalla, crédito de Xalapa, expediente sobre la consulta, aviso de foto ilustrativa) y los créditos de las cuatro fotos.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px sobre la compilación de producción, con axe (WCAG 2.2 AA) y sin desbordamiento; nuevo paso: canvas dibujado, foto de Xalapa cargada y expediente sobre la consulta. La espera previa a axe ahora ignora las animaciones ligadas al desplazamiento, que nunca «terminan».
- **Contraste sobre la foto de Xalapa** (peor caso, nube blanca al 32 % sobre `#0D1D22`): frase en ocre 4.1:1 (texto grande, mínimo 3:1), contexto 5.5:1, pie 4.5:1.
- **Detector de impeccable** en Inicio: sin hallazgos propios; quedan los de componentes compartidos anotados para V4.8.
- **Patrones vigilados:** título con media frase en gris (énfasis tipográfico, no degradado ni cursiva); la máscara que desvanece el libro mayor es invisible como degradado. Sin etiquetas sobre títulos ni numeración decorativa.
- **Core Web Vitals de laboratorio** (390 px, CPU 4× más lenta, 4G lenta): Inicio LCP 1.79 s (el título) y CLS 0.035. Una primera versión dejaba asomar la foto de Xalapa en el teléfono y el LCP subía a 3.56 s; se corrigió haciendo que la portada llene la pantalla. Créditos: LCP 1.79 s y CLS 0.151 por el cambio de tipografía, el mismo caso anotado en el pendiente 7 de V4.8 (precarga de fuentes).

## No comprobado

- Autor de la foto de la consulta: Unsplash bloquea las consultas automáticas desde este entorno; la licencia no exige atribución y los créditos enlazan el original.
- Teléfono físico, Safari y lector de pantalla: quedan a la revisión de Ian.
