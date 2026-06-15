/*
===============================================================================
CronoGol v2.1.1 — Lobby Guardrails
===============================================================================
Pulido del lobby online:
- Impide que el anfitrión se una a su propia sala desde el mismo dispositivo.
- Avisa si intentas crear otra sala cuando ya tienes una activa.
- Refuerza el rol local host/guest.
- Mejora mensajes del lobby.
- No sincroniza todavía el partido completo.
===============================================================================
*/
(function(){
  "use strict";

  const CG_ONLINE_VERSION = "2.1.1";
  const CG_ONLINE_BACKEND_ENABLED = true;
  const CG_SUPABASE_URL = "https://xbrrdkflztxkvnngmdhu.supabase.co";
  const CG_SUPABASE_ANON_KEY = "sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l";
  const CG_ROOMS_TABLE = "cronogol_rooms";
  const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const POLL_INTERVAL_MS = 8000;

  let currentRoomCode = "";
  let currentRole = "";
  let pollTimer = null;

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

  function cleanPlayerName(value, fallback){
    return String(value || fallback || "Jugador").trim().slice(0, 24) || fallback || "Jugador";
  }

  function readInput(id, fallback){
    const el = document.getElementById(id);
    return cleanPlayerName(el && el.value, fallback);
  }

  function getLocalPlayerName(){
    return readInput("player1-name", "Jugador");
  }

  function getSetupOptions(){
    const gameModeBtn = document.querySelector(".mode-btn.active, .mode-option.active, [data-mode].active");
    const durationBtn = document.querySelector(".duration-btn.active, .duration-option.active, [data-duration].active");

    let matchMode = document.getElementById("match-mode")?.value || durationBtn?.dataset?.duration || "classic";
    let gameMode = document.getElementById("game-mode")?.value || gameModeBtn?.dataset?.mode || "local";

    const activeButtons = Array.from(document.querySelectorAll(".active, [aria-pressed='true']"));
    const activeText = activeButtons.map(b => (b.textContent || "").toLowerCase()).join(" ");
    if(activeText.includes("rápido")) matchMode = "fast";
    if(activeText.includes("máquina")) gameMode = "machine";

    return {
      hostName: readInput("player1-name", "Jugador 1"),
      guestName: readInput("player2-name", "Jugador 2"),
      matchMode: matchMode === "five" || matchMode === "fast" || matchMode === "quick" ? "fast" : "classic",
      gameMode: gameMode === "machine" ? "machine" : "local"
    };
  }

  function createRoomDraft(options = {}){
    const roomCode = normalizeRoomCode(options.roomCode) || randomRoomCode();
    const hostName = cleanPlayerName(options.hostName, "Jugador 1");
    const guestName = cleanPlayerName(options.guestName, "");
    return {
      schemaVersion: 2,
      appVersion: CG_ONLINE_VERSION,
      roomCode,
      status: guestName ? "ready" : "waiting",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hostName,
      guestName,
      matchMode: options.matchMode === "fast" ? "fast" : "classic",
      gameMode: options.gameMode === "machine" ? "machine" : "local",
      matchState: {
        phase: "lobby",
        hostName,
        guestName,
        hostConnected: true,
        guestConnected: Boolean(guestName),
        score: [0, 0],
        currentPlayerIndex: 0,
        events: []
      }
    };
  }

  function createMatchSnapshot(gameState){
    if(!gameState || !Array.isArray(gameState.players)) return null;
    return {
      schemaVersion: 2,
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

  function getOnlineStatus(){
    return {
      version: CG_ONLINE_VERSION,
      backendEnabled: CG_ONLINE_BACKEND_ENABLED,
      supabaseUrl: CG_SUPABASE_URL,
      table: CG_ROOMS_TABLE,
      mode: "supabase-room-lobby-guardrails",
      currentRoomCode,
      currentRole
    };
  }

  async function supabaseFetch(path, options = {}){
    const url = `${CG_SUPABASE_URL}/rest/v1/${path}`;
    const headers = Object.assign({
      "apikey": CG_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${CG_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    }, options.headers || {});
    const response = await fetch(url, Object.assign({}, options, { headers }));
    const text = await response.text();
    let data = null;
    if(text){
      try{ data = JSON.parse(text); }catch(e){ data = text; }
    }
    if(!response.ok){
      const message = data && data.message ? data.message : `Supabase HTTP ${response.status}`;
      const error = new Error(message);
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  }

  function rowToLobby(row){
    if(!row) return null;
    const state = row.state_json || {};
    return {
      roomCode: row.room_code,
      status: row.status || "waiting",
      hostName: row.host_name || state.hostName || "Jugador 1",
      guestName: row.guest_name || state.guestName || "",
      matchMode: row.match_mode || "classic",
      gameMode: row.game_mode || "local",
      stateJson: state,
      appVersion: row.app_version,
      updatedAt: row.updated_at,
      lastSeenAt: row.last_seen_at
    };
  }

  function buildStateJson(room, patch = {}){
    const state = Object.assign({}, room && room.stateJson || {});
    const hostName = patch.hostName || room?.hostName || state.hostName || "Jugador 1";
    const guestName = patch.guestName !== undefined ? patch.guestName : (room?.guestName || state.guestName || "");
    return Object.assign(state, {
      schemaVersion: 2,
      appVersion: CG_ONLINE_VERSION,
      phase: "lobby",
      hostName,
      guestName,
      hostConnected: true,
      guestConnected: Boolean(guestName),
      lastLobbyUpdateAt: new Date().toISOString()
    }, patch.statePatch || {});
  }

  async function fetchRoomRemote(code){
    const roomCode = normalizeRoomCode(code);
    if(!isValidRoomCode(roomCode)) throw new Error("Código de sala no válido.");
    const query = `${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(roomCode)}&select=*`;
    const data = await supabaseFetch(query, { method: "GET" });
    if(!Array.isArray(data) || !data.length) throw new Error("No existe ninguna sala con ese código.");
    return rowToLobby(data[0]);
  }

  async function createRoomRemote(options = {}){
    const draft = createRoomDraft(options);
    const payload = {
      room_code: draft.roomCode,
      status: "waiting",
      host_name: draft.hostName,
      guest_name: "",
      match_mode: draft.matchMode,
      game_mode: draft.gameMode,
      state_json: draft.matchState,
      app_version: CG_ONLINE_VERSION,
      last_seen_at: new Date().toISOString()
    };
    const data = await supabaseFetch(CG_ROOMS_TABLE, {
      method: "POST",
      headers: { "Prefer": "return=representation" },
      body: JSON.stringify(payload)
    });
    return rowToLobby(Array.isArray(data) && data[0] ? data[0] : payload);
  }

  async function joinRoomRemote(code, guestNameInput){
    const roomCode = normalizeRoomCode(code);
    if(!isValidRoomCode(roomCode)) throw new Error("Código de sala no válido.");

    if(currentRole === "host" && currentRoomCode === roomCode){
      throw new Error("Ya eres el anfitrión de esta sala. Compártela con otro dispositivo o navegador.");
    }

    const current = await fetchRoomRemote(roomCode);
    const guestName = cleanPlayerName(guestNameInput || getLocalPlayerName(), "Invitado");

    // Guardrail principal: evita que el mismo jugador/dispositivo se una como rival.
    if(current.hostName && guestName && current.hostName.trim().toLowerCase() === guestName.trim().toLowerCase()){
      throw new Error("El invitado tiene el mismo nombre que el anfitrión. Cambia el nombre en el segundo dispositivo antes de unirte.");
    }

    if(current.guestName && current.guestName.trim()){
      const sameGuest = current.guestName.trim().toLowerCase() === guestName.trim().toLowerCase();
      if(!sameGuest){
        throw new Error(`La sala ${roomCode} ya tiene invitado: ${current.guestName}.`);
      }
    }

    const nextState = buildStateJson(current, { guestName });
    const payload = {
      status: "ready",
      guest_name: guestName,
      state_json: nextState,
      app_version: CG_ONLINE_VERSION,
      last_seen_at: new Date().toISOString()
    };

    const data = await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(roomCode)}`, {
      method: "PATCH",
      headers: { "Prefer": "return=representation" },
      body: JSON.stringify(payload)
    });
    return rowToLobby(Array.isArray(data) && data[0] ? data[0] : Object.assign(current, payload));
  }

  async function refreshRoomRemote(code){
    const room = await fetchRoomRemote(code);
    await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(room.roomCode)}`, {
      method: "PATCH",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify({ last_seen_at: new Date().toISOString() })
    });
    return room;
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
    window.setTimeout(() => el.remove(), 3500);
  }

  function setStatus(message, type){
    const status = document.getElementById("cg-online-status");
    if(status){
      status.textContent = message;
      status.dataset.state = type || "neutral";
    }
  }

  function setRoomCode(code){
    const el = document.getElementById("cg-online-room-code");
    if(el) el.textContent = normalizeRoomCode(code) || "------";
  }

  function setLobby(room){
    const host = document.getElementById("cg-online-host-name");
    const guest = document.getElementById("cg-online-guest-name");
    const state = document.getElementById("cg-online-room-state");
    if(!room){
      if(host) host.textContent = "—";
      if(guest) guest.textContent = "Esperando rival";
      if(state) state.textContent = "Sin sala";
      return;
    }
    if(host) host.textContent = room.hostName || "Jugador 1";
    if(guest) guest.textContent = room.guestName || "Esperando rival";
    if(state){
      if(room.status === "ready" && room.guestName) state.textContent = "Rival conectado";
      else if(room.status === "playing") state.textContent = "Partida en curso";
      else state.textContent = "Esperando rival";
    }
  }

  function rememberRoom(room, role){
    if(!room) return;
    currentRoomCode = normalizeRoomCode(room.roomCode || room.room_code);
    currentRole = role || currentRole || "";
    setRoomCode(currentRoomCode);
    setLobby(room);
    try{
      localStorage.setItem("cronogol_online_active_room", JSON.stringify({
        roomCode: currentRoomCode,
        role: currentRole,
        localName: getLocalPlayerName(),
        savedAt: new Date().toISOString()
      }));
    }catch(e){}
    startPolling();
  }

  function clearRememberedRoom(){
    currentRoomCode = "";
    currentRole = "";
    try{ localStorage.removeItem("cronogol_online_active_room"); }catch(e){}
    setRoomCode("");
    setLobby(null);
    if(pollTimer) window.clearInterval(pollTimer);
    pollTimer = null;
  }

  function restoreRememberedRoom(){
    try{
      const raw = localStorage.getItem("cronogol_online_active_room");
      if(!raw) return null;
      const saved = JSON.parse(raw);
      if(saved && isValidRoomCode(saved.roomCode)){
        currentRoomCode = normalizeRoomCode(saved.roomCode);
        currentRole = saved.role || "";
        setRoomCode(currentRoomCode);
        return saved;
      }
    }catch(e){}
    return null;
  }

  function setLoading(isLoading){
    document.querySelectorAll("#cg-online-create-btn,#cg-online-join-btn,#cg-online-refresh-btn,#cg-online-join-code").forEach(el => {
      el.disabled = Boolean(isLoading);
    });
  }

  function explainSupabaseError(error){
    const raw = String(error && error.message || "");
    if(error && error.status === 404) return "No encuentro la tabla cronogol_rooms. Ejecuta primero el SQL incluido.";
    if(error && error.status === 401) return "Supabase rechaza la clave pública. Revisa la anon/publishable key.";
    if(error && error.status === 409) return "Ese código ya existe. Pulsa Crear sala otra vez.";
    if(raw.toLowerCase().includes("failed to fetch")) return "No se pudo conectar con Supabase. Revisa URL, CORS o conexión.";
    if(raw) return raw;
    return "Error desconocido al conectar con Supabase.";
  }

  async function refreshLobby({silent = false} = {}){
    if(!currentRoomCode) {
      if(!silent) setStatus("No hay sala activa todavía.", "error");
      return null;
    }
    if(!silent) setStatus(`Actualizando sala ${currentRoomCode}...`, "loading");
    const room = await refreshRoomRemote(currentRoomCode);
    rememberRoom(room, currentRole);
    if(room.status === "ready" && room.guestName){
      setStatus(`Sala ${room.roomCode} lista · ${room.hostName} vs ${room.guestName}.`, "ok");
    }else{
      setStatus(`Sala ${room.roomCode} activa · comparte el código con tu rival.`, "ok");
    }
    return room;
  }

  function startPolling(){
    if(pollTimer) window.clearInterval(pollTimer);
    if(!currentRoomCode) return;
    pollTimer = window.setInterval(() => {
      refreshLobby({silent:true}).catch(() => {});
    }, POLL_INTERVAL_MS);
  }

  function bindOnlineFoundationUI(){
    const createBtn = document.getElementById("cg-online-create-btn");
    const joinBtn = document.getElementById("cg-online-join-btn");
    const refreshBtn = document.getElementById("cg-online-refresh-btn");
    const joinInput = document.getElementById("cg-online-join-code");

    setStatus("Lobby online listo · crea una sala o únete con código.", "ready");

    const saved = restoreRememberedRoom();
    if(saved){
      setStatus(`Sala recordada ${saved.roomCode} · pulsa Actualizar lobby.`, "ready");
      refreshLobby({silent:true}).catch(() => {});
    }

    if(joinInput){
      joinInput.addEventListener("input", () => {
        joinInput.value = normalizeRoomCode(joinInput.value);
      });
      joinInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter" && joinBtn) joinBtn.click();
      });
    }

    if(createBtn){
      createBtn.addEventListener("click", async () => {
        if(currentRoomCode && currentRole === "host"){
          const confirmNew = window.confirm(`Ya eres anfitrión de la sala ${currentRoomCode}. ¿Crear una sala nueva?`);
          if(!confirmNew){
            setStatus(`Mantienes la sala ${currentRoomCode} · compártela con tu rival.`, "ready");
            return;
          }
          clearRememberedRoom();
        }

        setLoading(true);
        setStatus("Creando sala en Supabase...", "loading");
        try{
          const room = await createRoomRemote(getSetupOptions());
          rememberRoom(room, "host");
          safeToast(`Sala ${room.roomCode} creada.`);
          setStatus(`Sala ${room.roomCode} creada · comparte el código con tu rival.`, "ok");
        }catch(error){
          const msg = explainSupabaseError(error);
          safeToast(msg);
          setStatus(msg, "error");
        }finally{
          setLoading(false);
        }
      });
    }

    if(joinBtn){
      joinBtn.addEventListener("click", async () => {
        const code = normalizeRoomCode(joinInput && joinInput.value);
        if(!isValidRoomCode(code)){
          safeToast("Introduce un código de sala válido.");
          setStatus("Introduce un código de sala válido.", "error");
          return;
        }

        if(currentRole === "host" && currentRoomCode === code){
          const msg = "Ya eres el anfitrión de esta sala. Ábrela en otro móvil/navegador con otro nombre para unirte.";
          safeToast(msg);
          setStatus(msg, "error");
          return;
        }

        setLoading(true);
        setStatus(`Uniéndose a sala ${code}...`, "loading");
        try{
          const room = await joinRoomRemote(code, getLocalPlayerName());
          rememberRoom(room, "guest");
          safeToast(`Te has unido a la sala ${code}.`);
          setStatus(`Sala ${code} lista · ${room.hostName} vs ${room.guestName}.`, "ok");
        }catch(error){
          const msg = explainSupabaseError(error);
          safeToast(msg);
          setStatus(msg, "error");
        }finally{
          setLoading(false);
        }
      });
    }

    if(refreshBtn){
      refreshBtn.addEventListener("click", async () => {
        setLoading(true);
        try{
          await refreshLobby();
        }catch(error){
          const msg = explainSupabaseError(error);
          safeToast(msg);
          setStatus(msg, "error");
        }finally{
          setLoading(false);
        }
      });
    }
  }

  window.CronoGolOnline = Object.freeze({
    version: CG_ONLINE_VERSION,
    backendEnabled: CG_ONLINE_BACKEND_ENABLED,
    supabaseUrl: CG_SUPABASE_URL,
    table: CG_ROOMS_TABLE,
    randomRoomCode,
    normalizeRoomCode,
    isValidRoomCode,
    createRoomDraft,
    createMatchSnapshot,
    getOnlineStatus,
    fetchRoomRemote,
    createRoomRemote,
    joinRoomRemote,
    refreshRoomRemote
  });

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bindOnlineFoundationUI);
  }else{
    bindOnlineFoundationUI();
  }
})();
