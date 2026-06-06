# CronoGol v1.10.3 — QA Checklist

## Máquina / estados asíncronos

- [ ] 1 vs Máquina → empezar → esperar turno máquina → reiniciar.
- [ ] 1 vs Máquina → empezar → volver al setup durante turno de máquina.
- [ ] 1 vs Máquina → reiniciar → empezar otra partida.
- [ ] No se ejecutan tiradas fantasma tras reiniciar.
- [ ] No se mezclan turnos de partida anterior.

## Juego básico

- [ ] 1 vs 1 clásico.
- [ ] 1 vs Máquina clásico.
- [ ] 1 vs 1 rápido.
- [ ] 1 vs Máquina rápido.
- [ ] START / STOP responde.
- [ ] Estadísticas actualizan.
- [ ] Historial actualiza.

## Modales / acciones

- [ ] Reglas abre/cierra.
- [ ] Apoya abre/cierra.
- [ ] Compartir funciona.
- [ ] Copiar enlace muestra feedback.
- [ ] Feedback funciona.

## Analítica

- [ ] Consola muestra `[CronoGol event]`.
- [ ] Consola muestra `[CronoGol GA4 bridge]`.
- [ ] GA4 recibe `page_view`.
- [ ] GA4 recibe eventos personalizados si la integración lo permite.

## Producción

- [ ] Debug no aparece al tocar logo en producción.
- [ ] HTTPS correcto.
- [ ] Móvil 360px sin cortes graves.
