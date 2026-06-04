# CronoGol v1.6.8 — estabilidad

## Objetivo

Versión centrada en estabilidad y limpieza tras QA.

## Correcciones principales

- Cancelación de `setTimeout` pendientes de la máquina al reiniciar o empezar nueva partida.
- Reset limpio de estado:
  - `pendingSpecial = null`
  - `penaltyShootout = null`
  - botones reactivados
  - paneles especiales ocultos
  - cronómetro parado
- Corrección definitiva del formato compartido:
  - `Jugador 1 | 2 - 6 | Máquina. Gana Máquina.`
- Cambio de modo:
  - si vuelves de `1 vs Máquina` a `1 vs 1`, `Máquina` vuelve a `Jugador 2` si no se editó manualmente.
- Texto de setup actualizado:
  - `Forzar descanso/final contra máquina`
- Penaltis separados del marcador del partido:
  - marcador normal no se altera durante la tanda.
  - resumen muestra `Penaltis: X - Y`.
- Final anticipado de tanda cuando ya no es matemáticamente remontable.
- Privacidad actualizada:
  - feedback gestionado mediante Formspree.
- README limpiado para dejar solo información actual.

## Feedback

El formulario usa Formspree:

`https://formspree.io/f/xjgdkwev`

## Pruebas recomendadas

1. Compartir resultado:
   - Debe aparecer con separadores `|`.
2. Máquina:
   - Reiniciar mientras la máquina está pensando no debe ejecutar tiradas antiguas.
3. Tirada especial:
   - Reiniciar durante penalti/falta no debe dejar paneles bloqueados.
4. Cambio de modo:
   - Máquina → Local debe restaurar `Jugador 2`.
5. Penaltis:
   - El marcador del partido no debe sumar goles de tanda.
6. Privacidad:
   - Debe mencionar Formspree, no Netlify Forms.


# CronoGol v1.7.1 — recuperación estable

## Motivo

La v1.7 introdujo demasiados cambios visuales y afectó al flujo del juego:

- modo máquina no respondía correctamente,
- modo rápido no respondía correctamente,
- el turno no cambiaba bien,
- estadísticas e historial no se actualizaban.

## Solución

Esta versión vuelve a la base estable v1.6.8 y aplica solo mejoras visuales seguras por CSS, sin reescribir la estructura del juego ni la lógica.

## Qué se conserva

- Estabilidad v1.6.8.
- Timeouts de máquina cancelables.
- Reset limpio.
- Modo rápido correcto.
- Compartir resultado con separadores `|`.
- Penaltis separados.
- Formspree.
- Estadísticas e historial funcionales.

## Qué se retira temporalmente

- Integración agresiva del logo.
- Rediseño completo tipo Casio que modificaba estructura.
- Cambios visuales que podían romper referencias JS.

## Pruebas recomendadas

- 1 vs 1: deben alternar Jugador 1 y Jugador 2.
- 1 vs Máquina: la máquina debe jugar.
- Modo rápido: terminados en 0 gol, terminados en 9 penalti.
- Estadísticas: deben subir.
- Historial: debe registrar jugadas.


# CronoGol v1.7.2 — fix línea/cuadro fantasma

## Problema corregido

Aparecía un cuadrado/línea muy tenue atravesando la tarjeta “Modo online próximamente”.

## Causa probable

El pseudo-elemento decorativo `.device::before` del reloj no quedaba correctamente acotado en algunos navegadores.

## Solución

- `.device` ahora usa `position: relative`.
- `.device` ahora usa `overflow: hidden`.
- `.device::before` queda acotado dentro del reloj.
- Los hijos del reloj tienen `z-index: 1` para quedar por encima del borde decorativo.


# CronoGol v1.7.3 — logo horizontal + Casio Lite estable

## Objetivo

Integrar el nuevo logo horizontal sin romper la lógica del juego.

## Cambios

- Logo horizontal en la pantalla inicial.
- Logo horizontal en páginas estáticas.
- Favicon generado desde el nuevo logo.
- Imagen OG generada desde el nuevo logo.
- Marca pequeña `CRONOGOL` dentro del reloj, sin meter el logo completo en la pantalla de partido.
- Etiquetas decorativas tipo `MODE`, `FOOTBALL CHRONO`, `WATER RESIST`.
- Estética Casio/LCD aplicada solo con CSS seguro.
- No se modifica la lógica principal de `game.js`.

## Base

Esta versión parte de `v1.7.2`, que recuperó la estabilidad del juego.


# CronoGol v1.7.4 — limpieza de logo duplicado

## Cambios

- La home deja de mostrar el texto duplicado `CRONOGOL` debajo del logo.
- Se elimina el subtítulo duplicado bajo el logo porque el logo ya incluye el claim.
- El debug sigue funcionando tocando 5 veces el logo principal.
- En páginas estáticas se elimina la marca duplicada tras el logo.
- Se amplía ligeramente el logo en desktop y se ajusta en móvil.
- No se toca la lógica del juego.

## Motivo

El logo horizontal ya contiene la marca y el claim. Repetir `CRONOGOL` y otro subtítulo debajo generaba ruido visual.


# CronoGol v1.7.5 — logo oscuro integrado

## Cambio aplicado

Se sustituye el logo anterior por el nuevo logo horizontal oscuro, que encaja mejor con el fondo y la estética retro/Casio de la app.

## Archivos actualizados

- `logo-cronogol-horizontal.png`
- `logo-cronogol-dark.png`
- `og-cronogol.png`
- `favicon.png`

## Ajustes CSS

- Logo principal más ancho.
- Menor sensación de “pegatina” sobre fondo oscuro.
- Favicon generado desde el reloj del logo.
- Imagen social generada con el nuevo logo.


# CronoGol v1.7.6 — integración del nuevo logo

## Cambios aplicados

- Sustituido el logo principal por el nuevo logo metálico/retro.
- Actualizado `logo-cronogol-horizontal.png`.
- Añadido `logo-cronogol-new.png`.
- Regenerado `og-cronogol.png`.
- Regenerado `favicon.png`.
- Ajustados tamaños CSS del logo en home y páginas estáticas.
- No se toca la lógica del juego.

## Base

Esta versión parte de `v1.7.5`, manteniendo la estabilidad del juego.


# CronoGol v1.7.7 — logo reposicionado + selector ES/EN

## Cambios aplicados

- El logo principal sale del interior del reloj y queda por encima de la carcasa.
- El reloj vuelve a quedar más limpio y centrado en el juego.
- Se añade selector de idioma pequeño y sutil arriba a la derecha.
- Selector disponible: ES / EN.
- El idioma se guarda en `localStorage`.
- Se traducen textos principales de home, configuración, menú, estadísticas e historial.
- No se toca la lógica de juego.

## Motivo

El logo dentro del reloj ocupaba demasiado espacio y rompía la jerarquía visual. Ahora funciona como cabecera de marca, mientras el reloj queda como zona jugable.


# CronoGol v1.7.8 — logo fuera del reloj

## Problema corregido

El logo seguía apareciendo visualmente dentro de la carcasa del reloj.

## Cambios

- El bloque del logo se mueve como hijo directo de `<main>`, antes de `setup-screen`.
- Se elimina la etiqueta superior decorativa del setup para que no parezca que el logo está dentro del reloj.
- Se ajusta el tamaño del logo en desktop y móvil.
- Se reduce ligeramente el LCD inicial para mejorar jerarquía.
- No se toca la lógica del juego.
