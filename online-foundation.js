/*
===============================================================================
CronoGol v2.0.1 — Supabase Private Rooms Draft
===============================================================================
Base V2 con Supabase configurado para crear y buscar salas privadas.

Importante:
- Usa la anon/public key de Supabase. No incluye service_role.
- Primero necesita crear la tabla cronogol_rooms con SUPABASE_SCHEMA_v2_0_1.sql.
- Todavía no sincroniza una partida completa entre dispositivos.
- Mantiene intacto el juego local.
===============================================================================
*/
(function(){
  "use strict";

  const CG_ONLINE_VERSION = "2.0.1";
  const CG_ONLINE_BACKEND_ENABLED = true;
  const CG_SUPABASE_URL = "https://xbrrdkflztxkvnngmdhu.supabase.co";
  const CG_SUPABASE_ANON_KEY = "sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l";
  const CG_ROOMS_TABLE = "cronogol_rooms";
  const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

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

  function getSetupOptions(){
    const gameModeBtn = document.querySelector(".mode-btn.active, .mode-option.active, [data-mode].active");
    const durationBtn = document.querySelector(".duration-btn.active, .duration-option.active, [data-duration].active");
    return {
      hostName: cleanPlayerName(document.getElementById("player1-name")?.value, "Jugador 1"),
      guestName: cleanPlayerName(document.getElementById("player2-name")?.value, "Jugador 2"),
      matchMode: document.getElementById("match-mode")?.value || durationBtn?.dataset?.duration || "classic",
      gameMode: document.getElementById("game-mode")?.value || gameModeBtn?.dataset?.mode || "local"
    };
  }

  function createRoomDraft(options = {}){
    const roomCode = normalizeRoomCode(options.roomCode) || randomRoomCode();
    return {
      schemaVersion: 1,
      appVersion: CG_ONLINE_VERSION,
      roomCode,
      status: "waiting",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hostName: cleanPlayerName(options.hostName, "Jugador 1"),
      guestName: cleanPlayerName(options.guestName, "Jugador 2"),
      matchMode: options.matchMode === "five" || options.matchMode === "fast" || options.matchMode === "quick" ? "fast" : "classic",
      gameMode: options.gameMode === "machine" ? "machine" : "local",
      matchState: {
        phase: "lobby",
        players: [],
        score: [0, 0],
        currentPlayerIndex: 0,
        events: []
      }
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

  function getOnlineStatus(){
    return {
      version: CG_ONLINE_VERSION,
      backendEnabled: CG_ONLINE_BACKEND_ENABLED,
      supabaseUrl: CG_SUPABASE_URL,
      table: CG_ROOMS_TABLE,
      mode: "supabase-private-rooms-draft"
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

  async function createRoomRemote(options = {}){
    const draft = createRoomDraft(options);
    const payload = {
      room_code: draft.roomCode,
      status: draft.status,
      host_name: draft.hostName,
      guest_name: draft.guestName,
      match_mode: draft.matchMode,
      game_mode: draft.gameMode,
      state_json: draft.matchState,
      app_version: CG_ONLINE_VERSION
    };
    const data = await supabaseFetch(CG_ROOMS_TABLE, {
      method: "POST",
      headers: { "Prefer": "return=representation" },
      body: JSON.stringify(payload)
    });
    return Array.isArray(data) && data[0] ? data[0] : Object.assign(payload, { room_code: draft.roomCode });
  }

  async function joinRoomRemote(code){
    const roomCode = normalizeRoomCode(code);
    if(!isValidRoomCode(roomCode)) throw new Error("Código de sala no válido.");
    const query = `${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(roomCode)}&select=*`;
    const data = await supabaseFetch(query, { method: "GET" });
    if(!Array.isArray(data) || !data.length) throw new Error("No existe ninguna sala con ese código.");
    const room = data[0];
    await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(roomCode)}`, {
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
    window.setTimeout(() => el.remove(), 3000);
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

  function setLoading(isLoading){
    document.querySelectorAll("#cg-online-create-btn,#cg-online-join-btn,#cg-online-join-code").forEach(el => {
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

  function bindOnlineFoundationUI(){
    const createBtn = document.getElementById("cg-online-create-btn");
    const joinBtn = document.getElementById("cg-online-join-btn");
    const joinInput = document.getElementById("cg-online-join-code");

    setStatus("Supabase configurado · crea la tabla SQL antes de probar online real.", "ready");

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
        setLoading(true);
        setStatus("Creando sala en Supabase...", "loading");
        try{
          const room = await createRoomRemote(getSetupOptions());
          const code = room.room_code || room.roomCode;
          setRoomCode(code);
          try{ localStorage.setItem("cronogol_online_room", JSON.stringify(room)); }catch(e){}
          safeToast(`Sala ${code} creada.`);
          setStatus(`Sala ${code} creada en Supabase · sincronización de partido pendiente.`, "ok");
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
        setLoading(true);
        setStatus(`Buscando sala ${code}...`, "loading");
        try{
          const room = await joinRoomRemote(code);
          setRoomCode(room.room_code || code);
          try{ localStorage.setItem("cronogol_online_joined_room", JSON.stringify(room)); }catch(e){}
          safeToast(`Sala ${code} encontrada.`);
          setStatus(`Sala ${code} encontrada · sincronización de partido pendiente.`, "ok");
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
    createRoomRemote,
    joinRoomRemote
  });

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bindOnlineFoundationUI);
  }else{
    bindOnlineFoundationUI();
  }
})();
