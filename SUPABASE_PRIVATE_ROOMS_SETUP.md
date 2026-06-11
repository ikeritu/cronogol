# CronoGol v2.1.1 — Supabase Private Rooms

Esta versión prepara salas privadas reales y estado básico en Realtime.

## Qué hace esta fase

- Crear una sala en Supabase si la configuración está activada.
- Unirse a una sala existente por código.
- Mostrar estado de sala: creada, esperando rival, unida.
- Avisar al anfitrión cuando entra el rival mediante Realtime.
- Mantener fallback local si Supabase no está configurado.

## Qué todavía no hace

- No sincroniza marcador completo en tiempo real.
- No sincroniza turnos ni tiradas de partido.
- No inicia partida online real entre dos dispositivos.
- No usa login.

## Pasos de configuración

1. Crea un proyecto en Supabase.
2. Abre SQL Editor.
3. Ejecuta el archivo `SUPABASE_PRIVATE_ROOMS_SETUP.sql`.
4. Confirma que la tabla `cronogol_rooms` queda incluida en la publicación Realtime `supabase_realtime`.
5. En Supabase, busca:
   - Project URL
   - anon/public key
6. Edita `supabase-config.js`:

```js
window.CRONOGOL_SUPABASE_CONFIG = {
  enabled: true,
  url: "https://TU-PROYECTO.supabase.co",
  anonKey: "TU_ANON_PUBLIC_KEY"
};
```

No uses nunca la `service_role key` en GitHub Pages ni en código público.

## Prueba esperada

Con `enabled:true`:

- Selecciona `Online`.
- Pulsa `Crear sala`.
- Debe aparecer: `Sala XXXXX creada online · esperando rival.`
- En Supabase debe aparecer una fila en `cronogol_rooms`.
- En otro navegador, introduce el código y pulsa `Unirse`.
- Debe aparecer: `Unido a sala XXXXX`.
- En el navegador anfitrión, el texto de estado debe cambiar a sala lista / rival conectado sin recargar.

## Siguiente fase

`v2.1.2 — Basic Match State Sync`:

- Sincronización básica de marcador.
- Preparar sincronización de turnos.
- Mantener fallback local.

## Nota v2.1.2 — Basic Match State Sync

No hace falta crear columnas nuevas. La sincronización básica del partido usa el campo JSONB existente `room_state` y guarda el marcador dentro de `room_state.matchSnapshot`.

Si ya ejecutaste el SQL de v2.1.1, no necesitas rehacer la tabla; solo confirma que la tabla `cronogol_rooms` está incluida en la publicación `supabase_realtime`.
