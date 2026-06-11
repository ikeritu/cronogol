# CronoGol v2.1.2 — Basic Match State Sync

Primera fase de sincronización básica del partido online.

## Qué añade

- Permite iniciar partida en modo `Online` solo si hay una sala activa creada o unida.
- Publica en Supabase un snapshot básico del partido en `room_state.matchSnapshot`.
- El snapshot incluye marcador, turno, parte, modo, tiradas, estadísticas y estado finalizado.
- La suscripción Realtime actualiza el mensaje del panel online con el resumen del marcador.
- Si Supabase no está configurado, guarda el último snapshot en `localStorage` como fallback seguro.

## Qué no hace todavía

- No hay control autoritativo de turnos.
- No bloquea que ambos jugadores pulsen a la vez.
- No replica todavía la pantalla de partido completa en el dispositivo rival.
- No implementa reconexión avanzada ni tokens privados de sala.

## Siguiente fase recomendada

`v2.1.3 — Online Turn Authority Draft`: definir quién puede tirar, cuándo se bloquea el rival y cómo se valida el turno.
