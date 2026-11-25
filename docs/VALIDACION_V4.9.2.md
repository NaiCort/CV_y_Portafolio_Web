# Validación de V4.9.2

Entorno: Node 22 y Chromium de Playwright, compilación de producción con `vite preview`. 25 de noviembre de 2026.

- ESLint, Prettier y compilación sin errores.
- **389 pruebas unitarias.** Nuevas:
  - **cálculo:**
    - Personalizado vacío cuesta el proyecto mínimo;
    - el primer mes de mantenimiento entra en el total con su IVA, sin lanzamiento, y no cambia el anticipo;
    - plazo de un solo día.
  - **interfaz:**
    - sin tarjeta resaltada ni total al llegar, y la barra del celular oculta;
    - Personalizado sin funciones marcadas;
    - aviso de exclusión sin «dependía»;
    - mantenimiento en el desglose y en el total.
- **Recorrido en Chromium (1440 px):**
  - sin nada resaltado al llegar;
  - Personalizado con 0 funciones marcadas y el ajuste al mínimo;
  - el aviso «Se quitó «Una sola página con secciones», que no puede ir junto con ella»;
  - el plan Básico como línea del desglose (1,200) y «Después, mantenimiento Básico: 1,392 MXN al mes con IVA»;
  - sin errores en la página.
- **Navegador con axe** (`DEMO_START_PREVIEW=1 npm run test:browser:cv`): 5 de 5, de 320 a 1440 px.

## No comprobado

- Teléfono de Ian.
