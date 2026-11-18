# Validación de V4.6.5 · cierre de Despacho contable

Entorno: Node 22, Chromium de Playwright; compilación de producción servida con `vite preview`. Revisión del 18 de noviembre de 2026. El visto bueno de Ian sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores. Cotejo pesa 65.8 kB de JavaScript (18.7 kB comprimido) y 20.9 kB de CSS (4.8 kB comprimido), sin fotos.
- **275 pruebas en 34 archivos** (48 de Cotejo en seis archivos); nueva: el enlace de la Bienvenida.
- `npm run test:browser:despacho`: **5 de 5 aprobados** de 320 a 1440 px sobre la compilación de producción, con axe (WCAG 2.2 AA) y sin desbordamiento en las nueve páginas y todos los flujos: recibo, expediente de la portada, cotización, WhatsApp, diagnóstico, calendario, calculadoras, Tu expediente con archivo, regularización, aviso de privacidad con borrado y menú.
- **Detector de impeccable en las nueve páginas:** sin hallazgos propios. Quedan solo los de componentes compartidos anotados para V4.8 (etiqueta de la llamada comercial y marca de agua fija).
- **Patrones vigilados:** ninguno estructural; el semáforo siempre lleva texto. Sin fotos de banco, degradados, etiquetas sobre títulos ni numeración decorativa.
- **Core Web Vitals de laboratorio** (390 px, CPU 4× más lenta, 4G lenta):

| Página | LCP | CLS |
|---|---|---|
| Inicio | 2.04 s | 0.002 |
| Precios | 1.78 s | 0.021 |
| Diagnóstico | 1.76 s | 0.002 |
| Calendario | 1.82 s | 0.002 |
| Calculadoras | 1.80 s | 0.002 |
| Tu expediente | 1.81 s | 0.038 |
| Servicios | 1.76 s | 0.005 |
| Regularización | 1.83 s | 0.002 |

  Todas por debajo de 2.5 s de LCP y 0.1 de CLS: sin fotos, el elemento más grande es texto.

## No comprobado

Teléfono físico, Safari y lector de pantalla: quedan a la revisión de Ian.
