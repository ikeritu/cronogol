/*
===============================================================================
CronoGol v2.1.1 — Supabase Private Rooms
===============================================================================
Integración segura de salas privadas con Supabase y primera suscripción Realtime de estado de sala.

Importante:
- Si supabase-config.js tiene enabled:false, la app conserva el borrador local.
- Si enabled:true y hay url/anonKey válidos, Crear sala / Unirse consultan Supabase.
- Sincroniza estado básico de sala waiting/ready/playing/finished mediante Supabase Realtime.
- No sincroniza todavía marcador completo ni turnos de partida.
- No modifica reglas ni flujo de la partida local.
===============================================================================
*/
(function(){
  "use strict";

  const CG_ONLINE_VERSION = "2.1.1";
  const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const ROOMS_TABLE = "cronogol_rooms";
  let supabaseClient = null;
  let roomRealtimeChannel = null;
  let activeRealtimeRoomCode = "";

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
    return {
      schemaVersion: 1,
      appVersion: CG_ONLINE_VERSION,
      createdAt: new Date().toISOString(),
      half: gameState.half,
      currentPlayerIndex: gameState.currentPlayerIndex,
      matchMode: gameState.matchMode,
      matchEnded: Boolean(gameState.matchEnded),
      players: gameState.players.map((p, index) => ({
        index,
        name: p && p.name ? String(p.name).slice(0, 24) : `Jugador ${index + 1}`,
        goals: Number(p && p.goals || 0),
        skipTurns: Number(p && p.skipTurns || 0)
      }))
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


  function describeRoomStatus(room){
    const code = normalizeRoomCode(room && room.room_code || activeRealtimeRoomCode || "");
    const host = String(room && room.host_name || "Jugador 1").slice(0, 24);
    const guest = String(room && room.guest_name || "").slice(0, 24);
    const status = String(room && room.status || "waiting");
    if(status === "ready") return `Sala ${code} lista · ${host} vs ${guest || "Jugador 2"}.`;
    if(status === "playing") return `Sala ${code} en juego · sincronización básica activa.`;
    if(status === "finished") return `Sala ${code} finalizada.`;
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
    const status = document.getElementById("cg-online-status");
    const backendReady = hasBackendConfig();

    function setStatus(message){ if(status) status.textContent = message; }
    setStatus(backendReady ? "Supabase listo · salas privadas con estado Realtime básico." : "V2.1.1: backend Supabase pendiente · modo borrador local activo.");

    function currentRoomCode(){
      const value = roomCodeEl ? roomCodeEl.textContent : "";
      const code = normalizeRoomCode(value || "");
      return isValidRoomCode(code) ? code : "";
    }

    function showRoomCode(code){
      const clean = normalizeRoomCode(code || "");
      if(roomCodeEl) roomCodeEl.textContent = clean || "— — — — — —";
      if(copyBtn) copyBtn.disabled = !clean;
      if(createBtn) createBtn.textContent = clean ? "Nueva sala" : "Crear sala";
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
          setStatus(describeRoomStatus(room));
          if(room && room.status === "ready") safeToast("Rival conectado a la sala.");
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
          : `Sala ${normalizeRoomCode(existingDraft.roomCode)} guardada localmente · configura Supabase para sincronizar.`);
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
          if(codeInput) codeInput.value = "";
          stopRoomRealtime();
          safeToast(`Sala ${draft.roomCode} creada localmente. Supabase pendiente.`);
          setStatus(`Sala ${draft.roomCode} creada localmente · todavía no sincroniza online.`);
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
              safeToast(`Unido a sala ${code}.`);
              setStatus(`Unido a sala ${code} · sala lista con Realtime básico.`);
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
          stopRoomRealtime();
          safeToast(`Código ${code} guardado. Supabase pendiente.`);
          setStatus(`Código ${code} guardado localmente · backend pendiente.`);
          if(codeInput) codeInput.value = "";
        }finally{
          joinBtn.disabled = false;
        }
      });
    }

    refreshOnlinePanelVisibility();
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
    createRoomBackend,
    joinRoomBackend,
    describeRoomStatus,
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
