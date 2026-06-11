/*
===============================================================================
CronoGol v2.0.2 — Online Panel Clarity
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

  const CG_ONLINE_VERSION = "2.0.2";
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
    const copyBtn = document.getElementById("cg-online-copy-btn");
    const joinBtn = document.getElementById("cg-online-join-btn");
    const codeInput = document.getElementById("cg-online-code-input");
    const roomCodeEl = document.getElementById("cg-online-room-code");
    const status = document.getElementById("cg-online-status");
    if(status) status.textContent = "V2.0.2: sala local preparada · online real pendiente.";

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

    try{
      const existingDraft = JSON.parse(localStorage.getItem("cronogol_online_room_draft") || "null");
      if(existingDraft && existingDraft.roomCode){
        showRoomCode(existingDraft.roomCode);
        if(status) status.textContent = `Sala ${normalizeRoomCode(existingDraft.roomCode)} guardada localmente · todavía no sincroniza online.`;
      }else{
        showRoomCode("");
      }
      // El campo de unión queda vacío por claridad: no rellenar con la sala propia.
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
      createBtn.addEventListener("click", () => {
        const draft = createRoomDraft({
          hostName: document.getElementById("player1-name")?.value,
          guestName: document.getElementById("player2-name")?.value,
          matchMode: document.getElementById("match-mode")?.value,
          gameMode: document.getElementById("game-mode")?.value
        });
        try{ localStorage.setItem("cronogol_online_room_draft", JSON.stringify(draft)); }catch(e){}
        showRoomCode(draft.roomCode);
        if(codeInput) codeInput.value = "";
        safeToast(`Sala ${draft.roomCode} creada localmente. Online real pendiente.`);
        if(status) status.textContent = `Sala ${draft.roomCode} creada localmente · todavía no sincroniza online.`;
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
          if(status) status.textContent = `Código ${code} copiado · compártelo cuando el backend esté activo.`;
        }catch(e){
          safeToast(`Código de sala: ${code}`);
        }
      });
    }

    if(joinBtn){
      joinBtn.addEventListener("click", () => {
        const code = normalizeRoomCode(codeInput ? codeInput.value : "");
        if(!code){
          safeToast("Escribe un código de sala.");
          if(codeInput) codeInput.focus();
          return;
        }
        if(!isValidRoomCode(code)){
          safeToast("Código de sala no válido.");
          if(status) status.textContent = "El código debe tener entre 4 y 8 caracteres.";
          if(codeInput) codeInput.focus();
          return;
        }
        try{ localStorage.setItem("cronogol_online_join_code_draft", code); }catch(e){}
        safeToast(`Código ${code} guardado. Conexión online pendiente.`);
        if(status) status.textContent = `Código ${code} guardado localmente · backend pendiente.`;
        if(codeInput) codeInput.value = "";
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
