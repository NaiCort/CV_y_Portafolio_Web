# Validación de V4.7.14 · Umbral desde cero

Entorno: Node 22, Chromium de Playwright; compilación de producción con `vite preview`. 21 de noviembre de 2026.

## Comprobaciones

- ESLint, Prettier y compilación sin errores.
- **321 pruebas en 38 archivos.** Nuevas o cambiadas en `tests/revista-ampliacion.test.jsx`: datos y fotos locales de los dos dossiers y de los cuatro números de archivo; relato con tres pliegos y proceso con cuatro capas; guardar y quitar; el proceso apaga la capa de rebanadas, separa y junta el cartel, y el cartel es una imagen con descripción; lámina de «Agua»; créditos con cinco licencias de tipografía y la licencia CC BY de la música.
- `npm run test:browser:revista`: ver el resultado al final de este documento. Incluye axe (WCAG 2.2 AA) en las páginas de Umbral, sin desbordamiento horizontal, y el recorrido de relato, proceso, disciplina y guardados. La espera de animaciones antes de axe ahora ignora las animaciones ligadas al desplazamiento y las infinitas, que no terminan nunca.
- **Detector de textos encimados** (script de la sesión) en las siete páginas de Umbral y 11 tamaños, sin contar el interior de los carteles (sus encimados son intencionales y decorativos): se corrigieron el pie de lámina que tapaba la parte baja de «Agua» y «Crear» (ahora va debajo) y el título con enlace del cierre. Quedan avisos falsos de párrafos partidos entre dos columnas (su caja abarca las dos).
- Capturas revisadas en 1440 × 900 y 390 × 844: inicio, los dos dossiers y las láminas. En celular, las páginas de texto y los carteles colapsaban a altura cero; corregido.

## No comprobado

- Teléfono físico (inclinación para el 2.5D, rendimiento del WebGL), Safari y Firefox (animaciones ligadas al desplazamiento: sin soporte en Firefox, el cartel queda quieto).
- Core Web Vitals de las páginas nuevas: queda para el cierre.

## Resultado del recorrido de navegador

`npm run test:browser:revista`: **5 de 5 escenarios aprobados** (320, 390, 768, 1024 y 1440 px), con axe sin hallazgos. Axe pidió subrayar los enlaces dentro de los pies de lámina; corregido.
