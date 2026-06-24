-- CronoGol v2.6.8 — Supabase Private Rooms
-- Instalación limpia + migración idempotente para el modo online.
-- Columna oficial de estado: state_json.

create table if not exists public.cronogol_rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique,
  host_name text not null default 'Jugador 1',
  guest_name text,
  status text not null default 'waiting',
  state_json jsonb not null default '{}'::jsonb,
  app_version text not null default '2.6.8',
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cronogol_rooms add column if not exists state_json jsonb not null default '{}'::jsonb;
alter table public.cronogol_rooms add column if not exists app_version text not null default '2.6.8';
alter table public.cronogol_rooms add column if not exists last_seen_at timestamptz;
alter table public.cronogol_rooms add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'cronogol_rooms'
      and column_name = 'room_state'
  ) then
    execute 'update public.cronogol_rooms set state_json = room_state where state_json = ''{}''::jsonb and room_state is not null';
  end if;
end $$;

create or replace function public.set_cronogol_rooms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_cronogol_rooms_updated_at on public.cronogol_rooms;
create trigger set_cronogol_rooms_updated_at
before update on public.cronogol_rooms
for each row
execute function public.set_cronogol_rooms_updated_at();

alter table public.cronogol_rooms enable row level security;

drop policy if exists "cronogol_rooms_select_anon" on public.cronogol_rooms;
drop policy if exists "cronogol_rooms_insert_anon" on public.cronogol_rooms;
drop policy if exists "cronogol_rooms_update_anon" on public.cronogol_rooms;

-- PROTOTIPO: abierto para anon. Endurecer con tokens de sala en fase posterior.
create policy "cronogol_rooms_select_anon"
on public.cronogol_rooms
for select
to anon
using (true);

create policy "cronogol_rooms_insert_anon"
on public.cronogol_rooms
for insert
to anon
with check (true);

create policy "cronogol_rooms_update_anon"
on public.cronogol_rooms
for update
to anon
using (true)
with check (true);

do $$
begin
  begin
    alter publication supabase_realtime add table public.cronogol_rooms;
  exception when duplicate_object then
    null;
  end;
end $$;

-- Limpieza manual opcional:
-- delete from public.cronogol_rooms where created_at < now() - interval '7 days';
