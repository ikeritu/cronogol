-- CronoGol v2.4.0 — Online Throws & Score Sync
-- No requiere cambios obligatorios de esquema.
-- Usa state_json.lastThrow para sincronizar última tirada.
create index if not exists idx_cronogol_rooms_playing_updated
on public.cronogol_rooms (status, updated_at desc);
