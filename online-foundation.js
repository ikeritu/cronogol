/*
===============================================================================
CronoGol v2.0.0 — Online Foundation
===============================================================================
Primera base técnica para el futuro modo online.

Importante:
- No conecta todavía con Supabase ni con ningún backend.
- No modifica reglas ni flujo de la partida local.
- Expone utilidades puras y una UI segura para evitar prometer online real antes de tiempo.
===============================================================================
*/
(function(){
  "use strict";

  const CG_ONLINE_VERSION = "2.0.0";
  const CG_ONLINE_BACKEND_ENABLED = false;
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
      gameMode: options.gameMode === "machine" ? "machine" : "local"
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
      mode: CG_ONLINE_BACKEND_ENABLED ? "backend" : "local-foundation-only"
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
    const joinBtn = document.getElementById("cg-online-join-btn");
    const status = document.getElementById("cg-online-status");
    if(status) status.textContent = "V2.0.0: base online preparada · backend no conectado.";

    if(createBtn){
      createBtn.addEventListener("click", () => {
        const draft = createRoomDraft({
          hostName: document.getElementById("player1-name")?.value,
          guestName: document.getElementById("player2-name")?.value,
          matchMode: document.getElementById("match-mode")?.value,
          gameMode: document.getElementById("game-mode")?.value
        });
        try{ localStorage.setItem("cronogol_online_room_draft", JSON.stringify(draft)); }catch(e){}
        safeToast(`Sala ${draft.roomCode} preparada en modo local. Backend pendiente.`);
        if(status) status.textContent = `Borrador de sala ${draft.roomCode} creado localmente · no sincroniza todavía.`;
      });
    }

    if(joinBtn){
      joinBtn.addEventListener("click", () => {
        const code = normalizeRoomCode(window.prompt("Código de sala", "") || "");
        if(!code) return;
        if(!isValidRoomCode(code)){
          safeToast("Código de sala no válido.");
          return;
        }
        try{ localStorage.setItem("cronogol_online_join_code_draft", code); }catch(e){}
        safeToast(`Código ${code} guardado. Conexión online pendiente.`);
        if(status) status.textContent = `Código ${code} guardado localmente · backend pendiente.`;
      });
    }
  }

  window.CronoGolOnline = Object.freeze({
    version: CG_ONLINE_VERSION,
    backendEnabled: CG_ONLINE_BACKEND_ENABLED,
    randomRoomCode,
    normalizeRoomCode,
    isValidRoomCode,
    createRoomDraft,
    createMatchSnapshot,
    getOnlineStatus
  });

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bindOnlineFoundationUI);
  }else{
    bindOnlineFoundationUI();
  }
})();
