# Estado de V4.9.5 · Sin etiquetas de nivel

25 de noviembre de 2026. Ian preguntó si convenía presentarse solo como desarrollador, sin decir «junior» ni «senior», y si estaría bien cobrar de otra forma. Eligió la recomendación: precios de lista a tarifa intermedia con el precio de lanzamiento del 30 %.

## Cambios

- **CV:**
  - PDF nuevo de Ian (`public/cv/cv-ian-aldana-noviembre-2026.pdf`), donde «Datos Jr» pasa a «Analista de Datos»;
  - `src/data/cv.js` igual, en las etiquetas bajo el título.

  Ya no queda «Jr», «junior» ni «senior» visible en el sitio.
- **Precios** (`src/data/catalogo.js`):
  - `NIVEL_ACTUAL = "intermedio"`: lista a 550 MXN, 40 USD y 38 EUR por hora, con mínimo de 5,000 MXN, 400 USD o 380 EUR;
  - el lanzamiento del 30 % no cambia, así que el precio efectivo es de unos 385 MXN por hora y el mínimo efectivo, unos 3,500 MXN antes de IVA.
- **Pruebas:** las que tenían cifras fijas del nivel junior ahora leen el nivel actual de los datos.

## Cifras resultantes (MXN, con lanzamiento e IVA)

| | Desde | Completo |
| --- | --- | --- |
| Personalizado | 4,060 | — |
| Landing | 5,928 | 71,212 |
| Varias páginas | 9,419 | 119,932 |
| Tienda o sistema | 34,916 | 189,358 |

| Demo | Esencial | Recomendada | Completa |
| --- | --- | --- | --- |
| Psicólogo | 11,774 | 18,189 | 35,890 |
| Patio 12 | 18,514 | 32,074 | 42,874 |
| Ladera | 15,996 | 19,975 | 32,074 |
| Brío | 47,015 | 65,772 | 83,961 |
| Rosales y Vértice | 22,168 | 31,018 | 42,305 |
| Cotejo | 18,757 | 34,997 | 48,882 |
| Revista | 18,351 | 25,822 | 37,433 |

Quedan dentro de los rangos de mercado de la investigación: landing de 8,000 a 20,000, sitio de varias páginas de 12,000 a 35,000, tienda de 20,000 a 80,000.

## Implementado, verificado y desplegado

- Implementado y verificado en pruebas: sí (ver [VALIDACION_V4.9.5.md](VALIDACION_V4.9.5.md)).
- Desplegado en producción: no; queda en la rama hasta que Ian revise la vista previa y haga el merge.

## Pendiente

- Quitar el precio de lanzamiento (`PARAMETROS.lanzamiento = 0`) cuando haya tres proyectos reales con testimonio.
- **V4.10:** demos, empezando por Psicólogo.
