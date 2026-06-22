-- CronoGol v2.6.0 — Supabase Private Rooms
-- Ejecutar en Supabase SQL Editor.
-- No pegues aquí claves privadas. La web solo debe usar anon/public key.

create extension if not exists pgcrypto;

create table if not exists public.cronogol_rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique check (char_length(room_code) between 4 and 8),
  status text not null default 'waiting' check (status in ('waiting', 'ready', 'playing', 'finished', 'closed')),
  host_name text not null default 'Jugador 1',
  guest_name text not null default '',
  match_mode text not null default 'classic',
  game_mode text not null default 'online',
  state_json jsonb not null default '{}'::jsonb,
  app_version text not null default '2.6.0',
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_cronogol_rooms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cronogol_rooms_updated_at on public.cronogol_rooms;
create trigger trg_cronogol_rooms_updated_at
before update on public.cronogol_rooms
for each row
execute function public.set_cronogol_rooms_updated_at();


-- Migración idempotente para proyectos creados con SQL antiguo.
alter table public.cronogol_rooms add column if not exists state_json jsonb not null default '{}'::jsonb;
alter table public.cronogol_rooms add column if not exists app_version text not null default '2.6.0';
alter table public.cronogol_rooms add column if not exists last_seen_at timestamptz;

alter table public.cronogol_rooms enable row level security;

-- Políticas abiertas para prototipo de salas privadas por código.
-- Es válido para probar, pero en una fase posterior conviene endurecerlo con tokens de sala.
drop policy if exists "cronogol_rooms_select_anon" on public.cronogol_rooms;
create policy "cronogol_rooms_select_anon"
on public.cronogol_rooms
for select
to anon
using (true);

drop policy if exists "cronogol_rooms_insert_anon" on public.cronogol_rooms;
create policy "cronogol_rooms_insert_anon"
on public.cronogol_rooms
for insert
to anon
with check (true);

drop policy if exists "cronogol_rooms_update_anon" on public.cronogol_rooms;
create policy "cronogol_rooms_update_anon"
on public.cronogol_rooms
for update
to anon
using (true)
with check (true);

create index if not exists idx_cronogol_rooms_room_code on public.cronogol_rooms(room_code);
create index if not exists idx_cronogol_rooms_created_at on public.cronogol_rooms(created_at desc);

-- Limpieza manual opcional de salas antiguas:
-- delete from public.cronogol_rooms where created_at < now() - interval '24 hours';


-- Realtime para v2.1.2: permite que ambos navegadores reciban cambios de estado de sala.
-- En Supabase también puedes activarlo desde Database > Publications > supabase_realtime.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'cronogol_rooms'
  ) then
    alter publication supabase_realtime add table public.cronogol_rooms;
  end if;
end $$;


-- v2.1.2: el marcador básico se guarda dentro de room_state.matchSnapshot (jsonb).
-- No hace falta crear columnas nuevas para esta fase.
