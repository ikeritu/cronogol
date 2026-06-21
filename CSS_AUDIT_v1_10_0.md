# CronoGol v2.5.7 — CSS Audit

## Objetivo

Esta versión realiza una limpieza conservadora del CSS para reducir ruido histórico sin cambiar el diseño ni la lógica del juego.

## Decisión técnica

Se ha mantenido el orden de la cascada CSS para evitar regresiones visuales.

No se ha realizado un reordenamiento agresivo por módulos porque el archivo acumulaba muchas sobrescrituras históricas y cambiar el orden podría alterar la apariencia final.

## Cambios aplicados

- Eliminados comentarios históricos acumulados por versiones anteriores.
- Añadido encabezado técnico único con mapa funcional.
- Normalizado espaciado general.
- Mantenida la cascada original.
- Actualizada versión a `v1.11.0`.
- Limpieza del `data-i18n` duplicado en `ÚLTIMA TIRADA` si estaba presente.
- Documentación de versión actualizada.

## Inventario

| Elemento | Cantidad |
|---|---:|
| Archivos HTML | 9 |
| Archivos JS | 1 |
| Reglas CSS aproximadas | 381 |
| Selectores CSS aproximados | 354 |
| Selectores repetidos detectados | 74 |
| Clases usadas en HTML | 96 |
| IDs usados en HTML | 70 |

## Selectores repetidos principales

Estos selectores aparecen más de una vez. No se han fusionado automáticamente porque podrían depender de la cascada:

- `.cg-logo` → 8 veces
- `.cg-logo-static` → 7 veces
- `0%, 100%` → 7 veces
- `50%` → 7 veces
- `.app` → 6 veces
- `.device` → 5 veces
- `.action-btn.stop` → 4 veces
- `.action-zone` → 4 veces
- `.cg-header` → 4 veces
- `.hero-lcd` → 4 veces
- `.hero-lcd h1` → 4 veces
- `.lang-btn` → 4 veces
- `.outside-logo-header` → 4 veces
- `.outside-logo-header .cg-logo` → 4 veces
- `.setup-card` → 4 veces
- `.top-language-switch` → 4 veces
- `.action-btn` → 3 veces
- `.event-goal` → 3 veces
- `.feedback-actions` → 3 veces
- `.hero-lcd p` → 3 veces
- `.special-panel:not(.hidden)` → 3 veces
- `.team-card.active .turn-arrow` → 3 veces
- `#setup-screen nav.setup-links.secondary-actions-final` → 2 veces
- `#setup-screen nav.setup-links.secondary-actions-final > *` → 2 veces
- `#setup-screen nav.setup-links.secondary-actions-final > [data-slot="support"]` → 2 veces
- `#setup-screen nav.setup-links.secondary-actions-final > [data-slot="support"]::after` → 2 veces
- `.action-btn, .main-start-btn` → 2 veces
- `.brand` → 2 veces
- `.cg-subtitle` → 2 veces
- `.content-page` → 2 veces
- `.device::before` → 2 veces
- `.event-card p` → 2 veces
- `.feedback-status` → 2 veces
- `.feedback-status.error` → 2 veces
- `.feedback-status.success` → 2 veces
- `.field-hint` → 2 veces
- `.final-emotion-box` → 2 veces
- `.game-device` → 2 veces
- `.lang-btn.active` → 2 veces
- `.lcd, .game-lcd, .hero-lcd` → 2 veces


## Riesgo evitado

No se han eliminado reglas por heurística. En CSS de interfaz, una regla aparentemente antigua puede seguir afectando a responsive, modales o estados del juego.

## Recomendación futura

Si se quiere limpiar más, el siguiente paso debería ser una versión con comparación visual:

1. Captura pantalla inicial desktop.
2. Captura pantalla inicial móvil.
3. Captura partido desktop.
4. Captura partido móvil.
5. Captura modales.
6. Captura páginas estáticas.
7. Entonces sí, dividir CSS en módulos o eliminar reglas no usadas.
