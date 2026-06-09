# CHANGELOG

## v1.10.8 — Sound & Haptics Polish

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


## v1.10.7_ESTABLE_MACHINE_SPECIAL_OK

### Estado

- Congelada como versión estable tras validación manual.
- Confirmado que la máquina resuelve penalti/falta automáticamente.
- Confirmado que el botón no se queda bloqueado en STOP.
- Confirmado que los controles humanos quedan bloqueados durante la acción automática.

### Uso

Esta versión queda como base estable para futuras modificaciones.

### No se ha tocado

- Código funcional respecto a `v1.10.7`.
- Reglas.
- Marcador.
- Sonidos.
- Cloudflare Web Analytics.
- Footer/copyright.


## v1.10.7 — Machine Special Direct Resolve

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


## v1.10.6 — Machine Special Flow Fix

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


## v1.10.5 — Machine Special Autoshot Fix

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


## v1.10.4 — Machine Special Lock Fix

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
- Sonidos/feedback visual de v1.10.3.
- Zaraz/tracking de eventos.


## v1.10.3 — Goal & Penalty Feedback

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


## v1.10.2 — Stability Rollback

### Cambios

- Rollback a la base estable `v1.10.0 CSS Refactor`.
- Retirada la capa de eventos de juego introducida en `v1.10.1`.
- Mantenido Cloudflare Web Analytics básico.
- Actualizada versión a `v1.10.2`.

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


## v1.10.0 — CSS Refactor

### Cambios

- Limpieza conservadora de `style.css`.
- Eliminados comentarios históricos acumulados por versiones anteriores.
- Añadido encabezado técnico único con mapa funcional del CSS.
- Normalizado espaciado general del CSS.
- Añadido `CSS_AUDIT_v1_10_0.md`.
- Actualizada versión visible a `v1.10.0`.

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