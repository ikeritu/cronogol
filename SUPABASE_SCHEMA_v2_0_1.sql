-- CronoGol v2.6.2 - Usuario mejoras
-- Ejecutar en Supabase SQL Editor.
-- Esta tabla permite crear y buscar salas privadas por código.
-- No uses service_role en el frontend.

create table if not exists public.cronogol_rooms (
  room_code text primary key,
  status text not null default 'waiting',
  host_name text not null default 'Jugador 1',
  guest_name text not null default 'Jugador 2',
  match_mode text not null default 'classic',
  game_mode text not null default 'local',
  state_json jsonb not null default '{}'::jsonb,
  app_version text not null default '2.0.1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

alter table public.cronogol_rooms enable row level security;

drop policy if exists "cronogol rooms can be read by public anon" on public.cronogol_rooms;
create policy "cronogol rooms can be read by public anon"
on public.cronogol_rooms
for select
to anon
using (true);

drop policy if exists "cronogol rooms can be created by public anon" on public.cronogol_rooms;
create policy "cronogol rooms can be created by public anon"
on public.cronogol_rooms
for insert
to anon
with check (true);

drop policy if exists "cronogol rooms can be updated by public anon" on public.cronogol_rooms;
create policy "cronogol rooms can be updated by public anon"
on public.cronogol_rooms
for update
to anon
using (true)
with check (true);

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

create index if not exists idx_cronogol_rooms_created_at
on public.cronogol_rooms (created_at desc);
