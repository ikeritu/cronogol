# CronoGol v2.1.6 — Online Last Action Sync

Evolución conservadora sobre `v2.1.5 Remote Snapshot Apply Draft`.

## Objetivo

Además de sincronizar marcador, turno, parte, nombres y estado de partido, el snapshot online incluye ahora la **última acción de juego**.

Esto permite que el segundo dispositivo no vea solo que el marcador cambió, sino también qué ocurrió:

- jugador que tiró;
- número obtenido;
- resultado de la tirada;
- gol, fallo, penalti, tarjeta, poste, larguero o tirada especial.

## Cambios principales

- `gameState.lastOnlineEvent` registra la última acción relevante en modo online.
- `createMatchSnapshot()` incorpora `lastEvent` al snapshot enviado a Supabase.
- La firma del snapshot incluye la última acción para no saltarse cambios importantes.
- Al recibir un snapshot remoto, la pantalla puede mostrar la última acción recibida.
- El panel online muestra una línea de estado: `Última acción online`.
- Se evita re-aplicar dos veces la misma acción remota mediante `lastAppliedRemoteEventId`.

## Limitaciones conocidas

- Todavía no se sincroniza el cronómetro corriendo en vivo.
- Todavía no se replica una animación completa de tirada en el segundo dispositivo.
- La sincronización avanzada de conflictos queda para fases posteriores.

## Seguridad

- Si Supabase no está configurado, la app sigue funcionando en modo demo local.
- El juego local, modo máquina, reglas rápidas, estadísticas y sonidos no se modifican.
