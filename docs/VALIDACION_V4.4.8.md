# Validación de V4.4.8

Entorno: Node 22, Chromium de Playwright, compilación de producción con `vite preview`. 16 de noviembre de 2026. El visto bueno de Ian en sus dispositivos sigue pendiente.

## Comprobaciones

- ESLint, Prettier y compilación sin errores.
- **178 pruebas en 24 archivos.** Nuevas, en `tests/gimnasio-v448.test.jsx` (7):
  - nivel, intensidad y qué traer en cada disciplina; filtro «Para empezar» en los siete días (solo quedan Movilidad y Ritmo) y guía «¿Cuál elijo?»;
  - horas tranquilas dentro del horario de cada sucursal y bajo un tercio del aforo (incluido el sábado de Centro, que cierra a las 20:00); página «Tu primera visita» con título propio y enlaces desde la portada y el pie;
  - aforo por hora solo con horas abiertas y la hora actual marcada en la ficha;
  - accesibilidad y estacionamiento en las cinco sucursales;
  - archivo de calendario: hora en UTC, fin según la duración de la clase, UID, aviso una hora antes, comas escapadas y líneas de 75 bytes como máximo.

  Ampliadas: la portada ofrece primero la clase de prueba; Planes tiene nueve preguntas, «Lo que no cobramos» y cuatro opiniones declaradas como inventadas, sin estrellas ni kilos.
- **Navegador (`npm run test:browser:gimnasio`):** cinco recorridos de 320 a 1440 px, ahora con «Tu primera visita», el filtro por nivel, «Qué traer» en la confirmación y la descarga del `.ics`. **5 de 5 aprobados.** La primera corrida falló a 768 px y encontró el error del botón principal en los diálogos al pasar el ratón; se corrigió y se volvió a correr.
- Descarga del calendario en un iPhone 13 emulado: archivo `brio-BR-#####.ics` válido, revisado línea por línea.
- axe-core (WCAG 2 A/AA, 2.1 AA y 2.2 AA) en los dos temas a 1440 y 390 px: «Tu primera visita», Inicio con la ficha de sucursal, Planes con opiniones y Clases con la guía abierta. **Sin infracciones** tras quitar el desplazamiento lateral de la tabla de horas tranquilas.
- Detector de impeccable: sin hallazgos propios tras equilibrar un título de «Tu primera visita» (el disco y los componentes compartidos siguen como en V4.4.7).
- **Core Web Vitals de laboratorio** (390 px, CPU 4×, 4G lenta): Inicio 2.06 s y 0.061; Clases 2.01 s y 0.004; Planes 1.91 s y 0.000; Tu primera visita 1.86 s y 0.032.

## Última revisión antes de Taller (16/11)

- **179 pruebas en 24 archivos.** Nueva, en `tests/gimnasio-revision.test.jsx`: al filtrar Movilidad, el encabezado de Clases muestra su panel y no una foto; con Ciclo vuelve la imagen.
- `npm run test:browser:gimnasio`: **5 de 5 aprobados** de 320 a 1440 px.
- axe-core con los seis scripts de Brío (Inicio y Créditos, Clases, Planes y alta, área de socio, Coaches y tienda, primera visita), en los dos temas a 1440 y 390 px: **sin infracciones**.
- Revisión visual en 390 y 1440 px del panel de Movilidad y Ritmo en los dos temas y de la tabla de horas tranquilas.

## No comprobado

Teléfono físico, Safari, lector de pantalla real y la importación del `.ics` en cada aplicación de calendario: revisión de Ian en la vista previa.
