/*
===============================================================================
CronoGol v2.1.7 — Online Remote Action UX
===============================================================================
Integración segura de salas privadas con Supabase y primera sincronización básica de estado de partido.

Importante:
- Si supabase-config.js tiene enabled:false, la UI comunica modo demo local y no permite iniciar online real.
- Si enabled:true y hay url/anonKey válidos, Crear sala / Unirse consultan Supabase.
- Sincroniza estado básico de sala waiting/ready/playing/finished mediante Supabase Realtime.
- Publica snapshot básico del partido online: marcador, turno, parte, modo y finalizado.
- Define autoridad de turno por rol: anfitrión controla Jugador 1 y rival controla Jugador 2.
- Aplica snapshots remotos básicos en pantalla: marcador, turno, parte, estado y nombres.
- Sincroniza la última acción de partido para que el rival vea qué tirada produjo el cambio.
- Todavía no replica el cronómetro corriendo en vivo ni resuelve conflictos avanzados.
- Mantiene el juego local intacto.
===============================================================================
*/
(function(){
  "use strict";

  const CG_ONLINE_VERSION = "2.1.7";
  const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const ROOMS_TABLE = "cronogol_rooms";
  let supabaseClient = null;
  let roomRealtimeChannel = null;
  let activeRealtimeRoomCode = "";
  let lastPublishedMatchSignature = "";
  let lastPublishAt = 0;

  function randomRoomCode(length = 6){
    let code = "";
    if(window.crypto && crypto.getRandomValues){
      const values = new Uint32Array(length);
      crypto.getRandomValues(values);
      for(let i = 0; i < length; i++) code += ROOM_CODE_CHARS[values[i] % ROOM_CODE_CHARS.length];
      return code;
    }
    for(let i = 0; i < length; i++) code += ROOM_CODE_CHARS[Math.floor(Math.random() * ROOM_CODE_CHARS.length)];
    return code;
  }

  function normalizeRoomCode(value){
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8);
  }

  function isValidRoomCode(value){
    const code = normalizeRoomCode(value);
    return code.length >= 4 && code.length <= 8;
  }

  function getSupabaseConfig(){
    const cfg = window.CRONOGOL_SUPABASE_CONFIG || {};
    return {
      enabled: Boolean(cfg.enabled),
      url: String(cfg.url || "").trim(),
      anonKey: String(cfg.anonKey || "").trim()
    };
  }

  function hasBackendConfig(){
    const cfg = getSupabaseConfig();
    return Boolean(cfg.enabled && cfg.url && cfg.anonKey && window.supabase && typeof window.supabase.createClient === "function");
  }

  function getSupabaseClient(){
    if(supabaseClient) return supabaseClient;
    if(!hasBackendConfig()) return null;
    const cfg = getSupabaseConfig();
    supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
    return supabaseClient;
  }

  function createRoomDraft(options = {}){
    const roomCode = normalizeRoomCode(options.roomCode) || randomRoomCode();
    return {
      schemaVersion: 1,
      appVersion: CG_ONLINE_VERSION,
      roomCode,
      status: "draft-local-only",
      createdAt: new Date().toISOString(),
      hostName: String(options.hostName || "Jugador 1").slice(0, 24),
      guestName: String(options.guestName || "Jugador 2").slice(0, 24),
      matchMode: options.matchMode === "five" ? "five" : "classic",
      gameMode: "online"
    };
  }

  function createMatchSnapshot(gameState){
    if(!gameState || !Array.isArray(gameState.players)) return null;
    const players = gameState.players.map((p, index) => ({
      index,
      name: p && p.name ? String(p.name).slice(0, 24) : `Jugador ${index + 1}`,
      goals: Number(p && p.goals || 0),
      skipTurns: Number(p && p.skipTurns || 0)
    }));
    return {
      schemaVersion: 2,
      appVersion: CG_ONLINE_VERSION,
      updatedAt: new Date().toISOString(),
      half: Number(gameState.half || 1),
      currentPlayerIndex: Number(gameState.currentPlayerIndex || 0),
      currentPlayerName: players[Number(gameState.currentPlayerIndex || 0)]?.name || players[0]?.name || "Jugador 1",
      matchMode: gameState.matchMode || "classic",
      gameMode: gameState.gameMode || "online",
      turnAuthority: getTurnAuthoritySnapshot(gameState),
      matchEnded: Boolean(gameState.matchEnded),
      totalTurns: Number(gameState.totalTurns || 0),
      scoreText: players.length >= 2 ? `${players[0].name} ${players[0].goals} - ${players[1].goals} ${players[1].name}` : "",
      stats: Object.assign({}, gameState.stats || {}),
      lastEvent: gameState.lastOnlineEvent ? Object.assign({}, gameState.lastOnlineEvent) : null,
      players
    };
  }

  function roomPayloadFromDraft(draft){
    return {
      room_code: draft.roomCode,
      status: "waiting",
      host_name: draft.hostName,
      guest_name: "",
      match_mode: draft.matchMode,
      game_mode: "online",
      room_state: {
        schemaVersion: 1,
        appVersion: CG_ONLINE_VERSION,
        createdAt: draft.createdAt,
        phase: "waiting_guest",
        hostName: draft.hostName,
        guestName: draft.guestName,
        matchMode: draft.matchMode
      }
    };
  }

  async function createRoomBackend(options = {}){
    const client = getSupabaseClient();
    if(!client) return { ok: false, offline: true, reason: "backend-not-configured" };

    let lastError = null;
    for(let attempt = 0; attempt < 4; attempt++){
      const draft = createRoomDraft(options);
      const payload = roomPayloadFromDraft(draft);
      const { data, error } = await client
        .from(ROOMS_TABLE)
        .insert(payload)
        .select("room_code,status,host_name,guest_name,created_at")
        .single();

      if(!error && data){
        return { ok: true, data, roomCode: normalizeRoomCode(data.room_code), draft };
      }
      lastError = error;
    }
    return { ok: false, error: lastError, reason: "create-room-failed" };
  }

  async function joinRoomBackend(code, options = {}){
    const client = getSupabaseClient();
    const roomCode = normalizeRoomCode(code);
    if(!client) return { ok: false, offline: true, reason: "backend-not-configured" };
    if(!isValidRoomCode(roomCode)) return { ok: false, reason: "invalid-code" };

    const { data: room, error: selectError } = await client
      .from(ROOMS_TABLE)
      .select("room_code,status,host_name,guest_name,room_state")
      .eq("room_code", roomCode)
      .maybeSingle();

    if(selectError) return { ok: false, error: selectError, reason: "select-room-failed" };
    if(!room) return { ok: false, reason: "room-not-found" };

    const guestName = String(options.guestName || "Jugador 2").slice(0, 24);
    const mergedState = Object.assign({}, room.room_state || {}, {
      phase: "guest_joined",
      guestName,
      joinedAt: new Date().toISOString()
    });

    const { data, error: updateError } = await client
      .from(ROOMS_TABLE)
      .update({
        status: "ready",
        guest_name: guestName,
        room_state: mergedState
      })
      .eq("room_code", roomCode)
      .select("room_code,status,host_name,guest_name,updated_at")
      .single();

    if(updateError) return { ok: false, error: updateError, reason: "join-room-failed" };
    return { ok: true, data, roomCode };
  }


  function getActiveOnlineRoom(){
    try{
      const raw = localStorage.getItem("cronogol_online_active_room");
      const data = raw ? JSON.parse(raw) : null;
      if(data && isValidRoomCode(data.roomCode)){
        return {
          roomCode: normalizeRoomCode(data.roomCode),
          role: data.role === "guest" ? "guest" : "host",
          savedAt: data.savedAt || ""
        };
      }
    }catch(e){}
    return null;
  }

  function setActiveOnlineRoom(roomCode, role){
    const clean = normalizeRoomCode(roomCode);
    if(!isValidRoomCode(clean)) return null;
    const active = {
      roomCode: clean,
      role: role === "guest" ? "guest" : "host",
      savedAt: new Date().toISOString()
    };
    try{ localStorage.setItem("cronogol_online_active_room", JSON.stringify(active)); }catch(e){}
    return active;
  }

  function clearActiveOnlineRoom(){
    try{ localStorage.removeItem("cronogol_online_active_room"); }catch(e){}
  }

  function onlinePlayerIndexForRole(role){
    return role === "guest" ? 1 : 0;
  }

  function onlineRoleForPlayerIndex(index){
    return Number(index || 0) === 1 ? "guest" : "host";
  }

  function getCurrentTurnRole(gameState){
    return onlineRoleForPlayerIndex(gameState && gameState.currentPlayerIndex);
  }

  function isCurrentDeviceTurn(gameState){
    const active = getActiveOnlineRoom();
    if(!active) return false;
    if(!gameState || gameState.gameMode !== "online" || gameState.matchEnded) return false;
    return onlinePlayerIndexForRole(active.role) === Number(gameState.currentPlayerIndex || 0);
  }

  function getTurnAuthoritySnapshot(gameState){
    const active = getActiveOnlineRoom();
    const currentRole = getCurrentTurnRole(gameState);
    return {
      schemaVersion: 1,
      mode: "host-player-1-guest-player-2",
      localRole: active ? active.role : "none",
      localPlayerIndex: active ? onlinePlayerIndexForRole(active.role) : null,
      currentRole,
      currentPlayerIndex: Number(gameState && gameState.currentPlayerIndex || 0),
      canLocalDevicePlay: Boolean(gameState && gameState.gameMode === "online" && isCurrentDeviceTurn(gameState))
    };
  }

  function turnAuthorityMessage(gameState){
    const active = getActiveOnlineRoom();
    if(!gameState || gameState.gameMode !== "online") return "";
    if(!active) return "Sala online no seleccionada.";
    const role = active.role === "guest" ? "rival" : "anfitrión";
    const expected = isCurrentDeviceTurn(gameState);
    const turnName = gameState.players && gameState.players[gameState.currentPlayerIndex] ? gameState.players[gameState.currentPlayerIndex].name : "jugador";
    return expected
      ? `Tu turno (${role}) · ${turnName}.`
      : `Turno del rival · esperando tirada de ${turnName}.`;
  }

  function updateTurnAuthorityUi(gameState){
    const status = document.getElementById("cg-online-status");
    if(!status || !gameState || gameState.gameMode !== "online") return;
    const message = turnAuthorityMessage(gameState);
    if(message) status.textContent = message;
  }

  function canStartOnlineMatch(){
    const select = document.getElementById("game-mode");
    if(select && select.value !== "online") return false;
    if(!hasBackendConfig()) return false;
    return Boolean(getActiveOnlineRoom());
  }

  function roomStateWithMatch(roomState, snapshot, options = {}){
    return Object.assign({}, roomState || {}, {
      phase: snapshot && snapshot.matchEnded ? "match_finished" : (options.phase || "match_playing"),
      matchSnapshot: snapshot,
      lastPublisherRole: options.role || getActiveOnlineRoom()?.role || "host",
      lastMatchSyncAt: new Date().toISOString()
    });
  }

  async function updateRoomMatchState(roomCode, snapshot, options = {}){
    const client = getSupabaseClient();
    const clean = normalizeRoomCode(roomCode);
    if(!client) return { ok: false, offline: true, reason: "backend-not-configured" };
    if(!isValidRoomCode(clean)) return { ok: false, reason: "invalid-code" };
    if(!snapshot) return { ok: false, reason: "empty-snapshot" };

    const { data: room, error: selectError } = await client
      .from(ROOMS_TABLE)
      .select("room_code,status,room_state")
      .eq("room_code", clean)
      .maybeSingle();

    if(selectError) return { ok: false, error: selectError, reason: "select-room-failed" };
    if(!room) return { ok: false, reason: "room-not-found" };

    const nextStatus = snapshot.matchEnded ? "finished" : "playing";
    const nextState = roomStateWithMatch(room.room_state || {}, snapshot, options);

    const { data, error } = await client
      .from(ROOMS_TABLE)
      .update({
        status: nextStatus,
        room_state: nextState
      })
      .eq("room_code", clean)
      .select("room_code,status,room_state,updated_at")
      .single();

    if(error) return { ok: false, error, reason: "update-match-state-failed" };
    return { ok: true, data, roomCode: clean };
  }

  function matchSignature(snapshot){
    if(!snapshot || !Array.isArray(snapshot.players)) return "";
    const p = snapshot.players.map(player => `${player.goals}:${player.skipTurns}`).join("|");
    const e = snapshot.lastEvent ? `${snapshot.lastEvent.id || ""}:${snapshot.lastEvent.value ?? ""}:${snapshot.lastEvent.resultType || ""}` : "";
    return [snapshot.matchEnded ? 1 : 0, snapshot.half, snapshot.currentPlayerIndex, snapshot.totalTurns, p, e].join("#");
  }

  function publishLocalMatchState(gameState, options = {}){
    const active = getActiveOnlineRoom();
    if(!active) return { ok: false, reason: "no-active-room" };
    if(!gameState || gameState.gameMode !== "online") return { ok: false, reason: "not-online-match" };

    const snapshot = createMatchSnapshot(gameState);
    if(!snapshot) return { ok: false, reason: "empty-snapshot" };

    const signature = matchSignature(snapshot);
    const now = Date.now();
    if(signature === lastPublishedMatchSignature && !options.force) return { ok: true, skipped: true, reason: "unchanged" };
    if(now - lastPublishAt < 900 && !snapshot.matchEnded && !options.force) return { ok: true, skipped: true, reason: "throttled" };

    lastPublishedMatchSignature = signature;
    lastPublishAt = now;

    updateLastEventUi(snapshot.lastEvent, "Última acción local");

    if(!hasBackendConfig()){
      try{
        localStorage.setItem("cronogol_online_last_match_snapshot", JSON.stringify({ roomCode: active.roomCode, snapshot }));
      }catch(e){}
      return { ok: true, offline: true, roomCode: active.roomCode, snapshot };
    }

    updateRoomMatchState(active.roomCode, snapshot, { role: active.role, phase: options.phase })
      .catch((error) => console.warn("CronoGol match state sync failed", error));

    return { ok: true, pending: true, roomCode: active.roomCode, snapshot };
  }

  function summarizeMatchSnapshot(snapshot){
    if(!snapshot || !Array.isArray(snapshot.players) || snapshot.players.length < 2) return "";
    const turnName = snapshot.currentPlayerName || snapshot.players[snapshot.currentPlayerIndex || 0]?.name || "Jugador";
    const phase = snapshot.matchEnded ? "finalizada" : `turno de ${turnName}`;
    return `${snapshot.scoreText || `${snapshot.players[0].goals}-${snapshot.players[1].goals}`} · ${phase}`;
  }


  function summarizeLastEvent(event){
    if(!event) return "";
    const player = event.playerName || "Jugador";
    const value = typeof event.value === "number" ? String(event.value).padStart(2, "0") : "--";
    const label = event.resultLabel || event.resultType || "acción";
    return `${player} sacó ${value} → ${label}`;
  }

  function updateLastEventUi(event, prefix){
    const el = document.getElementById("cg-online-last-event");
    if(!el) return;
    const summary = summarizeLastEvent(event);
    el.textContent = summary ? `${prefix || "Última acción online"}: ${summary}` : "Última acción online: —";
    el.classList.toggle("has-online-event", Boolean(summary));
  }

  function remoteSnapshotPublisherRole(room){
    return room && room.room_state ? String(room.room_state.lastPublisherRole || "") : "";
  }

  function applyRemoteSnapshotFromRoom(room){
    const snapshot = room && room.room_state && room.room_state.matchSnapshot;
    if(!snapshot) return { ok: false, reason: "no-snapshot" };
    const active = getActiveOnlineRoom();
    const publisherRole = remoteSnapshotPublisherRole(room);

    // Evita re-aplicar al mismo dispositivo el estado que acaba de publicar.
    if(active && publisherRole && publisherRole === active.role){
      return { ok: true, skipped: true, reason: "own-snapshot" };
    }

    try{
      localStorage.setItem("cronogol_online_remote_match_snapshot", JSON.stringify({
        roomCode: normalizeRoomCode(room && room.room_code || activeRealtimeRoomCode || ""),
        publisherRole,
        receivedAt: new Date().toISOString(),
        snapshot
      }));
    }catch(e){}

    updateLastEventUi(snapshot.lastEvent, "Última acción recibida");

    if(typeof window.CronoGolApplyRemoteSnapshot === "function"){
      return window.CronoGolApplyRemoteSnapshot(snapshot, {
        roomCode: normalizeRoomCode(room && room.room_code || activeRealtimeRoomCode || ""),
        publisherRole,
        roomStatus: room && room.status
      }) || { ok: true, applied: true };
    }
    return { ok: false, reason: "apply-function-missing" };
  }

  function describeRoomStatus(room){
    const code = normalizeRoomCode(room && room.room_code || activeRealtimeRoomCode || "");
    const host = String(room && room.host_name || "Jugador 1").slice(0, 24);
    const guest = String(room && room.guest_name || "").slice(0, 24);
    const status = String(room && room.status || "waiting");
    const snapshot = room && room.room_state && room.room_state.matchSnapshot;
    const matchSummary = summarizeMatchSnapshot(snapshot);
    if(status === "ready") return `Sala ${code} lista · ${host} vs ${guest || "Jugador 2"}.`;
    if(status === "playing") return matchSummary ? `Sala ${code} en juego · ${matchSummary}.` : `Sala ${code} en juego · autoridad de turnos preparada.`;
    if(status === "finished") return matchSummary ? `Sala ${code} finalizada · ${matchSummary}.` : `Sala ${code} finalizada.`;
    if(status === "closed") return `Sala ${code} cerrada.`;
    return `Sala ${code} online · esperando rival.`;
  }

  function stopRoomRealtime(){
    const client = getSupabaseClient();
    if(client && roomRealtimeChannel){
      try{ client.removeChannel(roomRealtimeChannel); }catch(e){}
    }
    roomRealtimeChannel = null;
    activeRealtimeRoomCode = "";
  }

  function subscribeRoomRealtime(roomCode, callbacks = {}){
    const client = getSupabaseClient();
    const clean = normalizeRoomCode(roomCode);
    if(!client) return { ok: false, reason: "backend-not-configured" };
    if(!isValidRoomCode(clean)) return { ok: false, reason: "invalid-code" };

    stopRoomRealtime();
    activeRealtimeRoomCode = clean;

    roomRealtimeChannel = client
      .channel(`cronogol-room-${clean}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: ROOMS_TABLE, filter: `room_code=eq.${clean}` },
        (payload) => {
          if(callbacks.onRoomChange) callbacks.onRoomChange(payload.new, payload);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: ROOMS_TABLE, filter: `room_code=eq.${clean}` },
        (payload) => {
          if(callbacks.onRoomClosed) callbacks.onRoomClosed(payload.old, payload);
        }
      )
      .subscribe((status) => {
        if(callbacks.onSubscribeStatus) callbacks.onSubscribeStatus(status);
      });

    return { ok: true, roomCode: clean };
  }

  function getOnlineStatus(){
    const cfg = getSupabaseConfig();
    return {
      version: CG_ONLINE_VERSION,
      backendEnabled: hasBackendConfig(),
      configured: Boolean(cfg.enabled && cfg.url && cfg.anonKey),
      mode: hasBackendConfig() ? "supabase-private-rooms" : "local-foundation-only"
    };
  }

  function safeToast(message){
    if(typeof window.showToast === "function"){
      window.showToast(message);
      return;
    }
    const existing = document.querySelector(".cg-online-temp-toast");
    if(existing) existing.remove();
    const el = document.createElement("div");
    el.className = "toast cg-online-temp-toast";
    el.textContent = message;
    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), 2600);
  }

  function bindOnlineFoundationUI(){
    const createBtn = document.getElementById("cg-online-create-btn");
    const copyBtn = document.getElementById("cg-online-copy-btn");
    const joinBtn = document.getElementById("cg-online-join-btn");
    const codeInput = document.getElementById("cg-online-code-input");
    const roomCodeEl = document.getElementById("cg-online-room-code");
    const roomLabel = document.getElementById("cg-online-room-label");
    const modeDescription = document.getElementById("cg-online-mode-description");
    const panel = document.getElementById("cg-online-foundation-panel");
    const status = document.getElementById("cg-online-status");
    const backendReady = hasBackendConfig();

    if(panel){
      panel.classList.toggle("is-backend-off", !backendReady);
      panel.classList.toggle("is-backend-on", backendReady);
    }
    if(roomLabel){
      roomLabel.textContent = backendReady ? "Código de sala" : "Código local de prueba";
    }
    if(modeDescription){
      modeDescription.textContent = backendReady
        ? "Supabase activo. Puedes crear o unirte a una sala privada real."
        : "Modo demo local. Para jugar online real, configura Supabase.";
    }
    if(codeInput){
      codeInput.disabled = !backendReady;
      codeInput.placeholder = backendReady ? "Introduce código" : "Supabase pendiente";
      codeInput.title = backendReady ? "Código de sala" : "Configura Supabase para unirte a salas reales";
    }
    if(joinBtn){
      joinBtn.disabled = !backendReady;
      joinBtn.title = backendReady ? "Unirse a sala" : "Configura Supabase para unirte a salas reales";
    }

    function setStatus(message){ if(status) status.textContent = message; }
    setStatus(backendReady ? "Supabase listo · salas privadas con sincronización básica y autoridad de turnos." : "Modo demo local · Supabase no configurado.");
    updateLastEventUi(null);

    function currentRoomCode(){
      const value = roomCodeEl ? roomCodeEl.textContent : "";
      const code = normalizeRoomCode(value || "");
      return isValidRoomCode(code) ? code : "";
    }

    function showRoomCode(code){
      const clean = normalizeRoomCode(code || "");
      if(roomCodeEl) roomCodeEl.textContent = clean || "— — — — — —";
      if(copyBtn) copyBtn.disabled = !clean;
      if(createBtn) createBtn.textContent = clean
        ? (backendReady ? "Nueva sala" : "Nueva sala demo")
        : (backendReady ? "Crear sala" : "Crear sala demo");
    }


    function startRealtimeFor(code){
      if(!hasBackendConfig()) return;
      const clean = normalizeRoomCode(code);
      if(!isValidRoomCode(clean)) return;
      const result = subscribeRoomRealtime(clean, {
        onSubscribeStatus(statusValue){
          if(statusValue === "SUBSCRIBED") setStatus(`Sala ${clean} conectada en Realtime · esperando cambios.`);
          if(statusValue === "CHANNEL_ERROR") setStatus(`Sala ${clean} creada, pero Realtime no está activo. Revisa la publicación en Supabase.`);
          if(statusValue === "TIMED_OUT") setStatus(`Sala ${clean} creada, pero Realtime tarda en responder.`);
        },
        onRoomChange(room){
          const description = describeRoomStatus(room);
          let applyResult = null;
          if(room && (room.status === "playing" || room.status === "finished") && room.room_state && room.room_state.matchSnapshot){
            applyResult = applyRemoteSnapshotFromRoom(room);
          }
          setStatus(applyResult && applyResult.applied ? `${description} · pantalla sincronizada.` : description);
          if(room && room.status === "ready") safeToast("Rival conectado a la sala.");
          if(applyResult && applyResult.applied) safeToast("Estado online recibido.");
        },
        onRoomClosed(){
          setStatus(`Sala ${clean} cerrada.`);
        }
      });
      if(!result.ok) console.warn("CronoGol realtime subscription skipped", result.reason);
    }

    try{
      const existingDraft = JSON.parse(localStorage.getItem("cronogol_online_room_draft") || "null");
      if(existingDraft && existingDraft.roomCode){
        showRoomCode(existingDraft.roomCode);
        setStatus(backendReady
          ? `Sala ${normalizeRoomCode(existingDraft.roomCode)} guardada en este dispositivo · Realtime listo al crear nueva sala.`
          : `Código local ${normalizeRoomCode(existingDraft.roomCode)} · configura Supabase para sincronizar online.`);
      }else{
        showRoomCode("");
      }
      if(codeInput) codeInput.value = "";
    }catch(e){ showRoomCode(""); }

    if(codeInput){
      codeInput.addEventListener("input", () => {
        codeInput.value = normalizeRoomCode(codeInput.value);
      });
      codeInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter" && joinBtn) joinBtn.click();
      });
    }

    if(createBtn){
      createBtn.addEventListener("click", async () => {
        createBtn.disabled = true;
        const options = {
          hostName: document.getElementById("player1-name")?.value,
          guestName: document.getElementById("player2-name")?.value,
          matchMode: document.getElementById("match-mode")?.value,
          gameMode: document.getElementById("game-mode")?.value
        };

        try{
          if(hasBackendConfig()){
            setStatus("Creando sala en Supabase...");
            const result = await createRoomBackend(options);
            if(result.ok){
              try{ localStorage.setItem("cronogol_online_room_draft", JSON.stringify(result.draft)); }catch(e){}
              showRoomCode(result.roomCode);
              setActiveOnlineRoom(result.roomCode, "host");
              if(codeInput) codeInput.value = "";
              safeToast(`Sala ${result.roomCode} creada online.`);
              setStatus(`Sala ${result.roomCode} creada online · esperando rival.`);
              startRealtimeFor(result.roomCode);
              return;
            }
            console.warn("CronoGol Supabase create room failed", result.error || result.reason);
            safeToast("No se pudo crear sala online. Se crea borrador local.");
          }

          const draft = createRoomDraft(options);
          try{ localStorage.setItem("cronogol_online_room_draft", JSON.stringify(draft)); }catch(e){}
          showRoomCode(draft.roomCode);
          setActiveOnlineRoom(draft.roomCode, "host");
          if(codeInput) codeInput.value = "";
          stopRoomRealtime();
          safeToast(`Código local ${draft.roomCode} creado. Supabase pendiente.`);
          setStatus(`Código local ${draft.roomCode} creado · no sincroniza online hasta configurar Supabase.`);
        }finally{
          createBtn.disabled = false;
        }
      });
    }

    if(copyBtn){
      copyBtn.addEventListener("click", async () => {
        const code = currentRoomCode();
        if(!code){
          safeToast("Primero crea una sala.");
          return;
        }
        try{
          if(navigator.clipboard && window.isSecureContext){
            await navigator.clipboard.writeText(code);
          }else{
            const tmp = document.createElement("textarea");
            tmp.value = code;
            tmp.setAttribute("readonly", "");
            tmp.style.position = "fixed";
            tmp.style.opacity = "0";
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand("copy");
            tmp.remove();
          }
          safeToast(`Código ${code} copiado.`);
          setStatus(`Código ${code} copiado · compártelo con tu rival.`);
        }catch(e){
          safeToast(`Código de sala: ${code}`);
        }
      });
    }

    if(joinBtn){
      joinBtn.addEventListener("click", async () => {
        const code = normalizeRoomCode(codeInput ? codeInput.value : "");
        if(!code){
          safeToast("Escribe un código de sala.");
          if(codeInput) codeInput.focus();
          return;
        }
        if(!isValidRoomCode(code)){
          safeToast("Código de sala no válido.");
          setStatus("El código debe tener entre 4 y 8 caracteres.");
          if(codeInput) codeInput.focus();
          return;
        }

        joinBtn.disabled = true;
        try{
          if(hasBackendConfig()){
            setStatus(`Buscando sala ${code}...`);
            const result = await joinRoomBackend(code, {
              guestName: document.getElementById("player2-name")?.value || document.getElementById("player1-name")?.value
            });
            if(result.ok){
              try{ localStorage.setItem("cronogol_online_join_code_draft", code); }catch(e){}
              setActiveOnlineRoom(code, "guest");
              safeToast(`Unido a sala ${code}.`);
              setStatus(`Unido a sala ${code} · sala lista para sincronización básica.`);
              if(codeInput) codeInput.value = "";
              showRoomCode(code);
              startRealtimeFor(code);
              return;
            }
            if(result.reason === "room-not-found"){
              safeToast("Sala no encontrada.");
              setStatus(`No existe ninguna sala con código ${code}.`);
              return;
            }
            console.warn("CronoGol Supabase join room failed", result.error || result.reason);
            safeToast("No se pudo unir online. Código guardado localmente.");
          }

          try{ localStorage.setItem("cronogol_online_join_code_draft", code); }catch(e){}
          setActiveOnlineRoom(code, "guest");
          stopRoomRealtime();
          safeToast(`Supabase pendiente. No se puede unir online todavía.`);
          setStatus(`Configura Supabase para unirte a una sala real.`);
          if(codeInput) codeInput.value = "";
        }finally{
          joinBtn.disabled = false;
        }
      });
    }

    refreshOnlinePanelVisibility();
    if(typeof window.updateCronoGolSetupButtonState === "function") window.updateCronoGolSetupButtonState();
  }

  function refreshOnlinePanelVisibility(){
    const panel = document.getElementById("cg-online-foundation-panel");
    const select = document.getElementById("game-mode");
    if(panel && select){
      panel.classList.toggle("is-online-hidden", select.value !== "online");
    }
  }

  window.CronoGolOnline = Object.freeze({
    version: CG_ONLINE_VERSION,
    backendEnabled: hasBackendConfig,
    randomRoomCode,
    normalizeRoomCode,
    isValidRoomCode,
    createRoomDraft,
    createMatchSnapshot,
    getActiveOnlineRoom,
    setActiveOnlineRoom,
    clearActiveOnlineRoom,
    onlinePlayerIndexForRole,
    onlineRoleForPlayerIndex,
    getCurrentTurnRole,
    isCurrentDeviceTurn,
    getTurnAuthoritySnapshot,
    turnAuthorityMessage,
    updateTurnAuthorityUi,
    canStartOnlineMatch,
    updateRoomMatchState,
    publishLocalMatchState,
    summarizeLastEvent,
    updateLastEventUi,
    createRoomBackend,
    joinRoomBackend,
    describeRoomStatus,
    applyRemoteSnapshotFromRoom,
    subscribeRoomRealtime,
    stopRoomRealtime,
    getOnlineStatus,
    refreshOnlinePanelVisibility
  });

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bindOnlineFoundationUI);
  }else{
    bindOnlineFoundationUI();
  }
})();
