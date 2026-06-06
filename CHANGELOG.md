# CHANGELOG

## v1.10.4 — Machine Special Lock Fix

### Cambios

- Corregido bug por el que el usuario podía pulsar `START` cuando la máquina iba a lanzar un penalti o falta.
- `handleMainAction()` bloquea clics durante turno de máquina.
- `maybeMachineTurn()` ahora conserva IDs de timeout y no reactiva botones si se genera una tirada especial.
- `maybeMachineSpecialTurn()` mantiene botones bloqueados mientras la máquina controla la jugada especial.
- Mensaje añadido: la máquina lanzará automáticamente.

### No se ha tocado

- Reglas del juego.
- Sistema de turnos base.
- Penalti/falta como mecánica.
- Estadísticas.
- Historial.
- CSS principal.
- Diseño visual.

## v1.10.3 — Stability Hotfix

### Cambios

- Añadida capa defensiva para evitar timeouts fantasma de la máquina.
- Limpieza de timeouts al reiniciar, volver al setup, iniciar partida o abandonar página.
- Protección del debug oculto en producción.
- Refuerzo de tracking directo en acciones clave.
- Añadido `type="button"` a botones HTML sin tipo.
- Actualizada documentación.

### No se ha tocado

- Lógica base de reglas.
- Sistema de turnos.
- Penalti/falta.
- Marcador.
- Estadísticas.
- Historial.
- CSS principal.
- Diseño visual.

### QA recomendado

- Reiniciar durante turno de máquina.
- Volver al setup durante turno de máquina.
- Iniciar nueva partida tras una partida contra máquina.
- Probar GA4 eventos.
- Probar móvil.


## v1.10.2 — Direct GA4 Event Bridge

### Cambios

- Añadido puente directo a GA4 para eventos personalizados.
- `cgTrackEvent()` ahora mantiene el comportamiento anterior y además intenta enviar por:
  - `gtag("event", ...)`
  - `dataLayer.push(...)`
- No se duplica `page_view`.
- Actualizada documentación y privacidad.

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Estadísticas.
- Historial.
- START/STOP.
- CSS principal.

## v1.10.1 — Game Event Tracking

### Cambios

- Añadida capa segura de tracking de eventos del juego.
- Eventos preparados para `zaraz.track()` si Cloudflare Zaraz está disponible.
- Fallback seguro a `localStorage` y `console.debug` si Zaraz no está activo.

### Eventos

- `app_loaded`
- `start_match`
- `finish_match`
- `share_result`
- `share_home`
- `copy_result`
- `copy_link`
- `rules_open`
- `support_open`
- `feedback_open`
- `mode_machine`
- `mode_local`
- `mode_fast`
- `mode_classic`

### No se ha tocado

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Estadísticas.
- Historial.
- Flujo START/STOP.


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