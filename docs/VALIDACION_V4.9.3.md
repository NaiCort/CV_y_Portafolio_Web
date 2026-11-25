# Validación de V4.9.3

Entorno: Node 22 y Chromium de Playwright, compilación de producción con `vite preview`. 25 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores.
- **395 pruebas unitarias.** Nuevas:
  - **cálculo:**
    - plan mensual: 40 % inicial, saldo en 18 cuotas sin intereses, plan Básico como mínimo y un plan mayor respetado;
    - el plan mensual viaja en la dirección;
    - sugerencia de tipo en Personalizado (landing, varias páginas y, con cuentas, tienda);
    - tipo inferior de cada tipo.
  - **interfaz:**
    - la nota muestra «Hoy» y «18 pagos al mes», y deshabilita «Sin plan»;
    - «¿No la necesitas? Cambia a landing» desde Patio 12;
    - sugerencia «una landing» en Personalizado.
- **Navegador con axe** (`DEMO_START_PREVIEW=1 npm run test:browser:cv`): 5 de 5, de 320 a 1440 px.
- **Textos encimados** (plan mensual y sugerencia): 0 casos.
- **impeccable** (plan mensual y Brío completa): sin hallazgos, después de quitar la opacidad de las opciones deshabilitadas.
- **Capturas** a 1440 y 390 px: plan mensual, sugerencia y tipo inferior, sin errores en la página.

## No comprobado

- Teléfono de Ian.
