# CronoGol v1.10.6 — QA Checklist

## Bug principal

- [ ] Modo rápido + 1 vs Máquina.
- [ ] Provocar penalti de la máquina.
- [ ] Confirmar que START no puede pulsarse.
- [ ] Confirmar que botón especial tampoco puede pulsarse por el humano.
- [ ] Confirmar que Enter/Espacio tampoco activa START.
- [ ] Confirmar que la máquina lanza automáticamente.

## GA4 eventos

- [ ] Click en Reglas → debe verse `[CronoGol v1.10.6 direct click event] rules_open` en consola.
- [ ] Click en Apoya → `support_open`.
- [ ] Click en Compartir → `share_home`.
- [ ] Click en 1 vs Máquina → `mode_machine`.
- [ ] Click en Rápido → `mode_fast`.
- [ ] Click en Empezar partido → `start_match`.
- [ ] Revisar GA4 Tiempo real tras 2-5 minutos.

## Regresión

- [ ] Penalti/falta del jugador humano sí permite lanzar.
- [ ] 1 vs 1 no se bloquea.
- [ ] Modo clásico no se bloquea.
- [ ] Historial y estadísticas siguen funcionando.
