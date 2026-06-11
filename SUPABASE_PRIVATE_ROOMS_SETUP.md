# CronoGol v2.1.0 — Supabase Private Rooms

Esta versión prepara el primer backend real para salas privadas.

## Qué hace esta fase

- Crear una sala en Supabase si la configuración está activada.
- Unirse a una sala existente por código.
- Mostrar estado de sala: creada, esperando rival, unida.
- Mantener fallback local si Supabase no está configurado.

## Qué todavía no hace

- No sincroniza marcador en tiempo real.
- No sincroniza turnos ni tiradas.
- No inicia partida online real entre dos dispositivos.
- No usa login.

## Pasos de configuración

1. Crea un proyecto en Supabase.
2. Abre SQL Editor.
3. Ejecuta el archivo `SUPABASE_PRIVATE_ROOMS_SETUP.sql`.
4. En Supabase, busca:
   - Project URL
   - anon/public key
5. Edita `supabase-config.js`:

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

## Siguiente fase

`v2.1.1 — Basic Room Sync`:

- Suscripción realtime a cambios de sala.
- Estado `waiting/ready` visible en ambos dispositivos.
- Preparar sincronización de marcador.
