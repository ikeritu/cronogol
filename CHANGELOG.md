## v2.0.3 — Online Mode Visibility

- Oculta el panel V2 Online por defecto.
- Añade opción `Online` al selector de modo.
- Muestra el panel de salas privadas solo cuando se selecciona modo online.
- Reubica el panel debajo de `EMPEZAR PARTIDO` y encima de la navegación secundaria.
- Mantiene intactos juego local, estadísticas, reglas rápidas y backend pendiente.

## v2.0.2 — Online Panel Clarity

- Sustituido el `prompt()` nativo del navegador por una UI integrada en el panel V2.
- Añadido campo visual para introducir código de sala.
- Añadido visor del código creado localmente.
- Mantiene el backend online desactivado: no sincroniza todavía entre dispositivos.
- No toca reglas, estadísticas, sonidos ni flujo local.
- Actualizado cache/versionado a `v2.0.2`.

## v2.0.2 — Online Panel Clarity

- Inicio de la rama V2.
- Añadido `online-foundation.js` con helpers seguros para futura sala online.
- Añadido panel V2 online en la pantalla inicial.
- Botones de crear/unirse generan borradores locales, sin backend ni sincronización real.
- Actualizado cache/versionado a `v2.0.2`.
- No se modifica la lógica jugable estable de v1.12.3.

## v1.12.3 — Stats UI Final Polish

- Pulido visual final del bloque de estadísticas locales.
- Cambio de etiqueta `STATS` a `LOCAL`.
- Título `Estadísticas locales` más centrado y limpio.
- Cambio de `Últimas` a `Últimas partidas`.
- Cambio de `Borrar stats` a `Borrar estadísticas`.
- Sin cambios en reglas, lógica, sonidos, online ni analytics.

# Changelog

## v1.12.3 — Fast Rules & Stats Polish

- Pulido visual del panel de estadísticas locales para mantener el estilo CronoGol.
- Estadísticas desde la perspectiva de Jugador 1: victorias, derrotas, goles a favor y goles en contra.
- Eliminado el concepto de empates del panel local.
- Modo rápido actualizado: 00 gol, 01-02 poste, 03-04 larguero, 50 amarilla, 60 roja, 96-97 falta peligrosa.
- No se toca Cloudflare, analítica ni modo online.

## v1.12.3 — Fast Rules & Stats Polish

- Añadido panel de estadísticas locales visible desde la pantalla inicial.
- Guardadas las últimas 10 partidas en `localStorage`.
- Añadido resumen de victorias, empates, goles y tiradas acumuladas.
- Añadidos botones para ver historial y borrar estadísticas locales.
- Añadido resumen acumulado dentro del modal final del partido.
- No se modifican reglas, sonidos, machine mode ni configuración de Cloudflare.

## v1.12.3 — Fast Rules & Stats Polish

- Corrección responsive conservadora de la botonera secundaria en móvil.
- Reseteados `grid-column`/`grid-row` heredados que podían crear columnas implícitas y provocar botones cortados.
- Botonera secundaria en 2 columnas en móvil y 1 columna en pantallas muy estrechas.
- Sin cambios en lógica de juego, reglas, sonidos ni analítica.

# CHANGELOG

## v1.11.0 — Technical Foundation

### Cambios

- Añadida guarda en `endMatch()` para evitar doble ejecución.
- Añadidos helpers de limpieza de timers críticos.
- Añadido desbloqueo robusto de AudioContext tras interacción.
- Añadida restauración segura del texto del botón de tirada especial.
- Corregido `sw.js`: eliminado asset inexistente `logo-cronogol-v1.10.17`.
- Actualizada caché a `cronogol-v1.11.0`.
- Añadido honeypot y cooldown local al formulario de feedback.
- Añadida plantilla `cloudflare-worker-feedback-proxy.example.js`.
- Añadido documento `TECHNICAL_FOUNDATION_V1_11_0.md`.

### No se ha tocado

- Reglas del juego.
- Modo local.
- Modo máquina.
- Penalti/falta.
- Sonidos existentes.
- Vibración.
- Marcador.
- Estadísticas.
- Pantalla de partida.

### Pendiente

- Refactor profundo de duplicaciones históricas de `game.js`.
- V2 online alpha: creación de salas.


## v1.11.0 — Flatten Secondary Actions

### Cambios

- Corregida la causa real del fallo de acciones secundarias.
- Eliminados wrappers `.setup-action-group` dentro de `nav.setup-links` en `index.html`.
- Los botones/enlaces vuelven a ser hijos directos de la parrilla.
- Añadido override CSS final específico para `#setup-screen nav.setup-links.secondary-actions-final`.
- Actualizada versión/cache a `v1.11.0`.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Sonidos.
- Vibración.
- Historial.
- Estadísticas.


## v1.11.0 — Secondary Actions Fix

### Cambios

- Corregida definitivamente la parrilla de acciones secundarias.
- `.setup-action-group` usa `display: contents`.
- Los botones internos ya no quedan comprimidos ni se pisan.
- Parrilla estable: 3 columnas en desktop/tablet, 2 columnas en móvil.
- `Apoya CronoGol` queda a ancho completo.
- Eliminado contenido accidental antes del `DOCTYPE` si existía.
- Actualizada versión/cache a `v1.11.0`.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Sonidos.
- Vibración.
- Historial.
- Estadísticas.


## v1.11.0 — Mobile Layout Fix

### Cambios

- Corregida la distribución responsive de `.setup-links`.
- Añadido soporte explícito para `.setup-action-group`.
- Evitado desbordamiento horizontal en móvil.
- Ajustado selector ES/EN para que no flote sobre todo el contenido.
- Ajustada altura máxima del menú/modal en móvil.
- Actualizada versión/cache a `v1.11.0`.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Sonidos.
- Vibración.
- Historial.
- Estadísticas.


## v1.11.0 — Menu & Home Hierarchy Polish

### UI/UX

- Menú lateral más compacto y jerarquizado.
- Acción `Reiniciar partido` separada como acción peligrosa.
- Home organizada en grupos de acciones secundarias.
- `Apoya CronoGol` queda como CTA suave, no protagonista.
- Se reduce sensación comercial y saturación visual.

### No se ha tocado

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Vibración estricta.
- Cloudflare Web Analytics.
- Zaraz/event tracking.


## v1.11.0 — Home Support Dedup

### UI/UX

- Eliminada la franja redundante de apoyo económico en la pantalla de inicio.
- Se conserva un único CTA de apoyo: `☕ Apoya CronoGol`.
- La home queda menos insistente y más limpia.

### No se ha tocado

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Vibración estricta.
- Cloudflare Web Analytics.
- Zaraz/event tracking.


## v1.11.0 — Project Audit Fixes

### Frontend

- Añadido debounce de 150 ms en botón principal y tirada especial.
- Sanitizados y truncados nombres de jugadores a 24 caracteres.
- Reducido riesgo de inyección accidental en textos de usuario.
- Cierre de capas con Escape y `popstate`.

### UI/UX

- Confirmación antes de reiniciar partido.
- Botón superior de vuelta a inicio en páginas estáticas.
- Transición suave del menú lateral.
- Estado activo/focus del selector de idioma reforzado.

### QA / estabilidad

- Botón principal se deshabilita temporalmente durante el ciclo crítico.
- Reset limpia timers, intervalos y paneles.
- Se mantiene flujo estable de máquina y vibración estricta.

### PWA mínima

- Añadidos `sw.js` y `site.webmanifest`.


## v1.11.0_ESTABLE_VIBRATION_OK

### Estado

- Congelada como versión estable tras validación manual.
- Confirmado que la vibración física solo ocurre en gol y penalti fallado.
- Confirmado cache busting `game.js?v=1.11.0` y `style.css?v=1.11.0`.

### No se ha tocado

- Código funcional respecto a `v1.11.0`.
- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Cloudflare Web Analytics.
- Footer/copyright.


## v1.11.0 — Strict Physical Vibration Gate

### Correcciones

- Eliminado `haptic()` genérico.
- Eliminado `vibrate()` genérico.
- Añadido `physicalVibration(event)` como único punto permitido para `navigator.vibrate`.
- Añadido `applyPhysicalVibration(context)` como única función de decisión.
- Gol vibra fuerte.
- Penalti fallado vibra leve.
- Fallo normal no vibra.
- Falta fallada no vibra.
- Poste/larguero no vibra.
- START/STOP no vibra.
- Tarjetas no vibran.
- Descanso/final no vibra.
- Eliminada animación de fallo normal.
- Añadido cache busting `game.js?v=1.11.0` y `style.css?v=1.11.0`.

### No se ha tocado

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Zaraz/tracking de eventos.


## v1.11.0 — Vibration Strict Fix

### Correcciones

- Eliminada vibración física residual tras fallo normal.
- Eliminadas llamadas directas a `vibrate()` fuera de `haptic()`.
- `haptic()` queda como única puerta de vibración física.
- Solo vibra:
  - gol;
  - penalti fallado.
- Eliminada vibración visual de fallo normal, poste y larguero.

### No se ha tocado

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Zaraz/tracking de eventos.


## v1.11.0 — Haptics Tuning

### Cambios

- Vibración física solo tras gol.
- Vibración física leve tras penalti fallado.
- Eliminada vibración física para start, stop, falta, poste, larguero, tarjetas, descanso y final.
- Se mantienen sonidos y feedback visual.

### No se ha tocado

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Historial.
- Estadísticas.
- Zaraz/tracking de eventos.


## v1.11.0 — Sound & Haptics Polish

### Mejoras

- Sonidos más reconocibles para gol, penalti, falta, poste/larguero, tarjetas y final.
- Añadido helper `haptic(type)` con patrones de vibración diferenciados.
- Mejorado feedback de tanda de penaltis.
- Añadidas animaciones visuales suaves para gol, penalti/falta y roja.
- Se mantiene soporte `prefers-reduced-motion`.

### No se ha tocado

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Historial.
- Estadísticas.
- Zaraz/tracking de eventos.


## v1.11.0_ESTABLE_MACHINE_SPECIAL_OK

### Estado

- Congelada como versión estable tras validación manual.
- Confirmado que la máquina resuelve penalti/falta automáticamente.
- Confirmado que el botón no se queda bloqueado en STOP.
- Confirmado que los controles humanos quedan bloqueados durante la acción automática.

### Uso

Esta versión queda como base estable para futuras modificaciones.

### No se ha tocado

- Código funcional respecto a `v1.11.0`.
- Reglas.
- Marcador.
- Sonidos.
- Cloudflare Web Analytics.
- Footer/copyright.


## v1.11.0 — Machine Special Direct Resolve

### Correcciones

- Corregido el caso en que la máquina obtiene penalti/falta y no ejecuta la tirada especial.
- Añadida función `resolveMachineSpecialDirectly()`.
- La especial de máquina queda desacoplada de botones y cronómetro manual.
- `applyNormalResult()` actualiza UI antes de programar especial automática.
- `evaluateSpecialThrow()` limpia panel, botones y turno de forma centralizada.
- Añadida función `resetMainTimerVisualState()` para evitar quedarse en STOP.

### No se ha tocado

- Reglas.
- Marcador.
- Modo rápido.
- Modo clásico.
- Estadísticas.
- Historial.
- Sonidos/feedback visual.
- Zaraz/tracking de eventos.


## v1.11.0 — Machine Special Flow Fix

### Correcciones

- Añadida función `getMachineSpecialForcedValue()`.
- Añadida función `getMachineSpecialStopDelay()`.
- Rehecho `maybeMachineSpecialTurn()` para resolver penalti/falta de máquina sin depender de botones.
- Eliminados desbloqueos incondicionales en `evaluateSpecialThrow()`.
- Reforzado `syncActionControls()` como control central.
- Añadido estado visual `MÁQUINA...` / `DISPARO` durante tirada especial automática.

### No se ha tocado

- Reglas.
- Marcador.
- Modo rápido.
- Modo clásico.
- Estadísticas.
- Historial.
- Sonidos/feedback visual.
- Zaraz/tracking de eventos.


## v1.11.0 — Machine Special Autoshot Fix

### Correcciones

- Corregido el caso en el que la máquina conseguía penalti/falta, el botón quedaba bloqueado, pero la máquina no ejecutaba la tirada especial.
- Sustituida llamada inexistente a `startSpecialTimer()` por el flujo real `startTimer()` / `stopTimer()`.
- El botón especial sigue bloqueado para el usuario durante el turno automático.
- La máquina resuelve penalti/falta automáticamente.

### No se ha tocado

- Reglas.
- Marcador.
- Modo rápido.
- Modo clásico.
- Estadísticas.
- Historial.
- Sonidos/feedback visual.
- Zaraz/tracking de eventos.


## v1.11.0 — Machine Special Lock Fix

### Correcciones

- Corregido bug donde el botón START/STOP quedaba activo cuando la máquina obtenía penalti/falta.
- Eliminado desbloqueo incondicional tras tirada automática de máquina.
- Eliminado desbloqueo incondicional tras tirada especial automática de máquina.
- Guardados y limpiados timeouts de máquina.
- Añadida función central `syncActionControls()`.

### No se ha tocado

- Reglas.
- Marcador.
- Modo rápido.
- Modo clásico.
- Estadísticas.
- Historial.
- Sonidos/feedback visual de v1.11.0.
- Zaraz/tracking de eventos.


## v1.11.0 — Goal & Penalty Feedback

### Cambios

- Mejorado el sonido de gol.
- Añadido sonido reconocible para penalti/falta.
- Añadido sonido de penalti fallado.
- Añadido flash visual para gol, penalti, falta y tarjetas.
- Añadida vibración visual suave del dispositivo para palo/larguero.
- Añadido soporte `prefers-reduced-motion`.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Estadísticas.
- Historial.
- START/STOP.
- Tracking de eventos/Zaraz.


## v1.11.0 — Stability Rollback

### Cambios

- Rollback a la base estable `v1.11.0 CSS Refactor`.
- Retirada la capa de eventos de juego introducida en `v1.11.0`.
- Mantenido Cloudflare Web Analytics básico.
- Actualizada versión a `v1.11.0`.

### Motivo

Se detectó bloqueo de la web durante partida tras añadir tracking de eventos.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Estadísticas.
- Historial.
- START/STOP.


## v1.11.0 — CSS Refactor

### Cambios

- Limpieza conservadora de `style.css`.
- Eliminados comentarios históricos acumulados por versiones anteriores.
- Añadido encabezado técnico único con mapa funcional del CSS.
- Normalizado espaciado general del CSS.
- Añadido `CSS_AUDIT_v1_10_0.md`.
- Actualizada versión visible a `v1.11.0`.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Estadísticas.
- Historial.
- Listeners principales.
- Cloudflare Web Analytics.
- Dominio personalizado.

### Nota

Se ha mantenido el orden de la cascada CSS para evitar regresiones visuales.


## v1.9.10 — Home UI Polish

### Cambios

- Mejora visual controlada de la pantalla inicial.
- LCD inicial orientado a explicar mejor la mecánica del juego.
- Botón `EMPEZAR PARTIDO` cambiado a estilo naranja/dorado.
- Bloques secundarios de la home con menos peso visual.
- Limpieza del `data-i18n` duplicado en `ÚLTIMA TIRADA` si estaba presente.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Estadísticas.
- Historial.
- Listeners principales.
- Cloudflare Web Analytics.
- Dominio personalizado.


## v1.9.9 — Analytics sobre v1.9.8

### Cambios

- Partiendo de `v1.9.8 Game Feel Improvements`, se añade Cloudflare Web Analytics.
- Se añade archivo `CNAME` con `cronogol.es`.
- Se actualiza URL oficial a `https://cronogol.es/`.
- Se añade texto de autoría en footer.
- Se añade sección `Derechos de autor` al README.
- Se actualiza privacidad para mencionar Cloudflare Web Analytics, si existe `privacidad.html`.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Estadísticas.
- Historial.
- Listeners principales.
- Mejoras de sensación de juego de v1.9.8.


## v1.9.8 — Game Feel Improvements

### Cambios

- Añadida descripción de dificultad de máquina.
- Añadido mensaje emocional post-partido.
- Añadido mensaje emocional en el texto compartido.
- Añadidos estilos para el bloque emocional final.

### Decisión de diseño

- La ayuda opcional para modo clásico largo queda descartada.
- No se modifican reglas ni ritmo del modo clásico.

### No se ha tocado

- START/STOP.
- Reglas.
- Turnos.
- Máquina.
- Modo rápido.
- Monetización funcional.