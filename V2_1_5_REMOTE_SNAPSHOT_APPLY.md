# CronoGol v2.1.5 — Remote Snapshot Apply Draft

Primera fase de aplicación remota de estado de partida.

## Qué hace

- Escucha cambios Realtime de la sala en Supabase.
- Lee `room_state.matchSnapshot`.
- Ignora snapshots publicados por el mismo rol local.
- Aplica en pantalla: nombres, marcador, turno, parte, sanciones, estadísticas básicas y finalizado.
- Guarda el último snapshot remoto en `localStorage` para diagnóstico.

## Qué no hace todavía

- No reproduce la animación exacta de cada tirada remota.
- No sincroniza el cronómetro corriendo en tiempo real.
- No resuelve conflictos complejos si ambos dispositivos publican a la vez.
- No sustituye todavía una prueba real con dos móviles y Supabase configurado.

## Base segura

Si Supabase no está configurado (`enabled:false`), el juego local sigue funcionando igual.
