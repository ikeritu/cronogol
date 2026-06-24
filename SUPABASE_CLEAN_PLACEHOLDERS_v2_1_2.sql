-- CronoGol v2.6.5 - Online Lobby Visual Match
update public.cronogol_rooms
set guest_name = '',
    status = 'waiting',
    state_json = jsonb_set(
      jsonb_set(coalesce(state_json, '{}'::jsonb), '{guestName}', '""'::jsonb, true),
      '{guestConnected}', 'false'::jsonb, true
    )
where lower(coalesce(guest_name, '')) in ('jugador 2', 'jugador2', 'player 2', 'player2', 'máquina', 'maquina', 'machine');
