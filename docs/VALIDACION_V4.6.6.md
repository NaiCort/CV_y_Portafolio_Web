# Validación de V4.6.6 · Despacho contable, confianza

Entorno: Node 22, Chromium de Playwright; compilación de producción servida con `vite preview`. Revisión del 18 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 80.4 kB de JavaScript (23.2 kB comprimido) y 23.6 kB de CSS (5.4 kB comprimido). Fotos: retrato de 30 kB (400 px) o 94 kB (800 px) y sala de 36 kB (640 px) o 126 kB (1280 px), las dos con carga diferida.
- **283 pruebas en 35 archivos**; ocho nuevas en `tests/despacho-confianza.test.jsx`: huella de cada foto contra su procedencia, aviso de que la persona no es Elena, créditos, especialidades y opiniones, guías, «Antes de contratarnos» antes de la cotización, validación del recordatorio guardado y su flujo de cinco estados.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px sobre la compilación de producción, con axe (WCAG 2.2 AA) y sin desbordamiento en las diez páginas; nuevos pasos: recordatorio, fotos cargadas con su pie y de la portada a una guía.
- **Detector de impeccable** en Inicio, Guías, Precios, Créditos y Tu expediente: sin hallazgos propios; quedan los de componentes compartidos anotados para V4.8.
- **Patrones vigilados:** las opiniones van en tres columnas iguales, pero sin íconos ni recuadros (solo una línea arriba); las listas de «Antes de contratarnos» usan ✓ y × con texto. Sin degradados, etiquetas sobre títulos ni numeración decorativa.
- **Core Web Vitals de laboratorio** (390 px, CPU 4× más lenta, 4G lenta):

| Página | LCP | CLS |
|---|---|---|
| Inicio | 1.96 s | 0.002 |
| Guías | 1.85 s | 0.032 |
| Precios | 1.82 s | 0.021 |
| Tu expediente | 1.87 s | 0.038 |

  Las fotos no están en la primera pantalla y cargan en diferido: el LCP sigue siendo texto.

## No comprobado

- Autor de las dos fotos: Unsplash bloquea las consultas automáticas desde este entorno; la licencia no exige atribución y los créditos enlazan los originales.
- Teléfono físico, Safari y lector de pantalla: quedan a la revisión de Ian.
