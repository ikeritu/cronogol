/*
===============================================================================
CronoGol v2.5.4 — Online Match Start
===============================================================================
Objetivo:
- Mantiene lobby online Supabase.
- Al elegir 1 vs 1 online crea sala nueva automáticamente.
- Cuando hay rival conectado, el anfitrión puede pulsar "Empezar partido online".
- Supabase pasa la sala a status "playing".
- El invitado detecta el inicio por polling/refresco y ambos entran a partida local con los mismos nombres.

Importante:
- Todavía NO sincroniza tiradas, turnos ni marcador durante el partido.
===============================================================================
*/
(function(){
  "use strict";

  const CG_ONLINE_VERSION="2.5.4";
  const CG_SUPABASE_URL="https://xbrrdkflztxkvnngmdhu.supabase.co";
  const CG_SUPABASE_ANON_KEY="sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l";
  const CG_ROOMS_TABLE="cronogol_rooms";
  const ROOM_CODE_CHARS="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const POLL_INTERVAL_MS=5000;

  let currentRoomCode="";
  let currentRole="";
  let pollTimer=null;
  let autoCreatingRoom=false;
  let onlineLocalMatchStarted=false;
  let latestRoom=null;

  function randomRoomCode(length=6){
    let code="";
    if(window.crypto&&crypto.getRandomValues){
      const v=new Uint32Array(length);
      crypto.getRandomValues(v);
      for(let i=0;i<length;i++) code+=ROOM_CODE_CHARS[v[i]%ROOM_CODE_CHARS.length];
      return code;
    }
    for(let i=0;i<length;i++) code+=ROOM_CODE_CHARS[Math.floor(Math.random()*ROOM_CODE_CHARS.length)];
    return code;
  }

  function normalizeRoomCode(value){
    return String(value||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8);
  }

  function isValidRoomCode(value){
    const c=normalizeRoomCode(value);
    return c.length>=4&&c.length<=8;
  }

  function cleanPlayerName(value,fallback){
    return String(value||fallback||"Jugador").trim().slice(0,24)||fallback||"Jugador";
  }

  function readInput(id,fallback){
    const el=document.getElementById(id);
    return cleanPlayerName(el&&el.value,fallback);
  }

  function getLocalPlayerName(){
    return readInput("player1-name","Jugador");
  }

  function isPlaceholderGuestName(value){
    const v=String(value||"").trim().toLowerCase();
    return !v||v==="jugador 2"||v==="jugador2"||v==="player 2"||v==="player2"||v==="máquina"||v==="maquina"||v==="machine"||v==="rival"||v==="invitado";
  }

  function normalizedGuestName(value){
    return isPlaceholderGuestName(value)?"":cleanPlayerName(value,"");
  }

  function activeText(){
    return Array.from(document.querySelectorAll(".active, [aria-pressed='true']")).map(b=>(b.textContent||"").toLowerCase()).join(" ");
  }

  function getSetupOptions(){
    const text=activeText();
    const matchModeSelect=document.getElementById("match-mode");
    const gameModeSelect=document.getElementById("game-mode");
    const matchValue=matchModeSelect ? matchModeSelect.value : (text.includes("rápido") ? "five" : "classic");
    const gameValue=gameModeSelect ? gameModeSelect.value : (text.includes("online") ? "online" : "local");
    return {
      hostName:readInput("player1-name","Jugador 1"),
      guestName:"",
      matchMode:(matchValue==="five"||matchValue==="fast"||text.includes("rápido"))?"fast":"classic",
      gameMode:gameValue==="machine"?"machine":(gameValue==="online"?"online":"local")
    };
  }

  function createRoomDraft(options={}){
    const roomCode=normalizeRoomCode(options.roomCode)||randomRoomCode();
    const hostName=cleanPlayerName(options.hostName,"Jugador 1");
    return {
      schemaVersion:3,
      appVersion:CG_ONLINE_VERSION,
      roomCode,
      status:"waiting",
      hostName,
      guestName:"",
      matchMode:options.matchMode==="fast"?"fast":"classic",
      gameMode:options.gameMode==="machine"?"machine":(options.gameMode==="online"?"online":"local"),
      matchState:{
        schemaVersion:3,
        appVersion:CG_ONLINE_VERSION,
        phase:"lobby",
        hostName,
        guestName:"",
        hostConnected:true,
        guestConnected:false,
        score:[0,0],
        currentPlayerIndex:0,
        events:[]
      }
    };
  }

  function createMatchSnapshot(gameState){
    if(!gameState||!Array.isArray(gameState.players)) return null;
    return {
      schemaVersion:3,
      appVersion:CG_ONLINE_VERSION,
      createdAt:new Date().toISOString(),
      half:gameState.half,
      currentPlayerIndex:gameState.currentPlayerIndex,
      matchMode:gameState.matchMode,
      matchEnded:Boolean(gameState.matchEnded),
      players:gameState.players.map((p,index)=>({
        index,
        name:p&&p.name?String(p.name).slice(0,24):`Jugador ${index+1}`,
        goals:Number(p&&p.goals||0),
        skipTurns:Number(p&&p.skipTurns||0)
      }))
    };
  }

  function getOnlineStatus(){
    return {version:CG_ONLINE_VERSION,supabaseUrl:CG_SUPABASE_URL,table:CG_ROOMS_TABLE,currentRoomCode,currentRole};
  }

  async function supabaseFetch(path,options={}){
    const url=`${CG_SUPABASE_URL}/rest/v1/${path}`;
    const headers=Object.assign({
      "apikey":CG_SUPABASE_ANON_KEY,
      "Authorization":`Bearer ${CG_SUPABASE_ANON_KEY}`,
      "Content-Type":"application/json"
    },options.headers||{});
    const response=await fetch(url,Object.assign({},options,{headers}));
    const text=await response.text();
    let data=null;
    if(text){try{data=JSON.parse(text);}catch(e){data=text;}}
    if(!response.ok){
      const message=data&&data.message?data.message:`Supabase HTTP ${response.status}`;
      const error=new Error(message);
      error.status=response.status;
      error.data=data;
      throw error;
    }
    return data;
  }

  function rowToLobby(row){
    if(!row) return null;
    const state=row.state_json||{};
    const stateHost=(state.players&&state.players[0]&&state.players[0].name)||state.hostName||"";
    const stateGuest=(state.players&&state.players[1]&&state.players[1].name)||state.guestName||"";
    const guestName=normalizedGuestName(row.guest_name||stateGuest||"");
    const status=row.status || (guestName ? "ready" : "waiting");
    return {
      roomCode:row.room_code,
      status,
      hostName:cleanPlayerName(row.host_name||stateHost,"Jugador 1"),
      guestName,
      matchMode:row.match_mode||state.matchMode||"classic",
      gameMode:row.game_mode||state.gameMode||"online",
      stateJson:state,
      appVersion:row.app_version,
      updatedAt:row.updated_at,
      lastSeenAt:row.last_seen_at
    };
  }

  function buildStateJson(room,guestName,extra={}){
    const cleanGuest=normalizedGuestName(guestName);
    const state=Object.assign({},room&&room.stateJson||{});
    return Object.assign(state,{
      schemaVersion:3,
      appVersion:CG_ONLINE_VERSION,
      phase:extra.phase || state.phase || "lobby",
      hostName:room?.hostName||state.hostName||"Jugador 1",
      guestName:cleanGuest,
      hostConnected:true,
      guestConnected:Boolean(cleanGuest),
      matchMode:room?.matchMode||state.matchMode||"classic",
      gameMode:"online",
      lastLobbyUpdateAt:new Date().toISOString()
    },extra);
  }

  async function fetchRoomRemote(code){
    const roomCode=normalizeRoomCode(code);
    if(!isValidRoomCode(roomCode)) throw new Error("Código de sala no válido.");
    const query=`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(roomCode)}&select=*`;
    const data=await supabaseFetch(query,{method:"GET"});
    if(!Array.isArray(data)||!data.length) throw new Error("No existe ninguna sala con ese código.");
    return rowToLobby(data[0]);
  }

  async function createRoomRemote(options={}){
    const draft=createRoomDraft(options);
    const payload={
      room_code:draft.roomCode,
      status:"waiting",
      host_name:draft.hostName,
      guest_name:"",
      match_mode:draft.matchMode,
      game_mode:"online",
      state_json:draft.matchState,
      app_version:CG_ONLINE_VERSION,
      last_seen_at:new Date().toISOString()
    };
    const data=await supabaseFetch(CG_ROOMS_TABLE,{method:"POST",headers:{"Prefer":"return=representation"},body:JSON.stringify(payload)});
    return rowToLobby(Array.isArray(data)&&data[0]?data[0]:payload);
  }

  async function joinRoomRemote(code,guestNameInput){
    const roomCode=normalizeRoomCode(code);
    if(!isValidRoomCode(roomCode)) throw new Error("Código de sala no válido.");
    if(currentRole==="host"&&currentRoomCode===roomCode) throw new Error("Ya eres el anfitrión de esta sala. Compártela con otro dispositivo o navegador.");

    const current=await fetchRoomRemote(roomCode);
    if(current.status==="playing") throw new Error("La sala ya está en partida.");
    if(current.status==="finished") throw new Error("La sala ya ha terminado.");

    const guestName=cleanPlayerName(guestNameInput||getLocalPlayerName(),"Invitado");
    if(current.hostName&&guestName&&current.hostName.trim().toLowerCase()===guestName.trim().toLowerCase()){
      throw new Error("El invitado tiene el mismo nombre que el anfitrión. Cambia el nombre en el segundo dispositivo antes de unirte.");
    }

    if(current.guestName&&!isPlaceholderGuestName(current.guestName)){
      const sameGuest=current.guestName.trim().toLowerCase()===guestName.trim().toLowerCase();
      if(!sameGuest) throw new Error(`La sala ${roomCode} ya tiene invitado: ${current.guestName}.`);
    }

    const cleanGuest=cleanPlayerName(guestName,"Invitado");
    const nextState=buildStateJson(current,cleanGuest,{phase:"lobby",players:[{index:0,name:current.hostName,goals:0,skipTurns:0},{index:1,name:cleanGuest,goals:0,skipTurns:0}]});
    const payload={
      status:"ready",
      guest_name:cleanGuest,
      state_json:nextState,
      app_version:CG_ONLINE_VERSION,
      last_seen_at:new Date().toISOString()
    };
    const data=await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(roomCode)}`,{method:"PATCH",headers:{"Prefer":"return=representation"},body:JSON.stringify(payload)});
    return rowToLobby(Array.isArray(data)&&data[0]?data[0]:Object.assign(current,payload));
  }

  async function refreshRoomRemote(code){
    const room=await fetchRoomRemote(code);
    await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(room.roomCode)}`,{
      method:"PATCH",
      headers:{"Prefer":"return=minimal"},
      body:JSON.stringify({last_seen_at:new Date().toISOString()})
    });
    return room;
  }

  async function startOnlineMatchRemote(){
    if(currentRole!=="host") throw new Error("Solo el anfitrión puede empezar la partida online.");
    if(!currentRoomCode) throw new Error("No hay sala activa.");
    const room=await fetchRoomRemote(currentRoomCode);
    if(!(room.status==="ready"&&room.guestName)) throw new Error("Necesitas un rival conectado para empezar.");
    const hostName=cleanPlayerName(room.hostName,"Jugador 1");
    const guestName=cleanPlayerName(room.guestName,"Jugador 2");
    const state=buildStateJson(room,guestName,{
      phase:"playing",
      status:"playing",
      startedAt:new Date().toISOString(),
      hostName,
      guestName,
      players:[
        {index:0,name:hostName,goals:0,skipTurns:0},
        {index:1,name:guestName,goals:0,skipTurns:0}
      ],
      score:[0,0],
      currentPlayerIndex:0,
      events:[]
    });
    const payload={
      status:"playing",
      host_name:hostName,
      guest_name:guestName,
      state_json:state,
      app_version:CG_ONLINE_VERSION,
      last_seen_at:new Date().toISOString()
    };
    const data=await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(room.roomCode)}`,{
      method:"PATCH",
      headers:{"Prefer":"return=representation"},
      body:JSON.stringify(payload)
    });
    return rowToLobby(Array.isArray(data)&&data[0]?data[0]:Object.assign(room,payload));
  }

  function safeToast(message){
    if(typeof window.showToast==="function"){window.showToast(message); return;}
    const existing=document.querySelector(".cg-online-temp-toast");
    if(existing) existing.remove();
    const el=document.createElement("div");
    el.className="toast cg-online-temp-toast";
    el.textContent=message;
    document.body.appendChild(el);
    window.setTimeout(()=>el.remove(),3500);
  }

  function setStatus(message,type){
    const status=document.getElementById("cg-online-status");
    if(status){status.textContent=message; status.dataset.state=type||"neutral";}
  }

  function setRoomCode(code){
    const el=document.getElementById("cg-online-room-code");
    if(el) el.textContent=normalizeRoomCode(code)||"------";
  }

  function setLobby(room){
    latestRoom=room||null;
    const host=document.getElementById("cg-online-host-name");
    const guest=document.getElementById("cg-online-guest-name");
    const state=document.getElementById("cg-online-room-state");
    if(!room){
      if(host) host.textContent="—";
      if(guest) guest.textContent="Esperando rival";
      if(state) state.textContent="Sin sala";
      updateStartButton(null);
      return;
    }
    if(host) host.textContent=room.hostName||"Jugador 1";
    if(guest) guest.textContent=room.guestName||"Esperando rival";
    if(state){
      if(room.status==="playing") state.textContent="Partida iniciada";
      else if(room.status==="ready"&&room.guestName) state.textContent="Rival conectado";
      else state.textContent="Esperando rival";
    }
    updateStartButton(room);
  }

  function updateStartButton(room){
    const btn=document.getElementById("cg-online-start-btn");
    if(!btn) return;
    const isHost=currentRole==="host";
    if(!isHost && room && room.status==="ready" && room.guestName){
      btn.disabled=true;
      btn.classList.remove("is-ready");
      btn.textContent=`Esperando a ${room.hostName || "anfitrión"}`;
      return;
    }
    if(room && room.status==="playing"){
      btn.disabled=true;
      btn.classList.remove("is-ready");
      btn.textContent="Partida iniciada";
      return;
    }
    const ready=Boolean(room && room.status==="ready" && room.guestName && isHost);
    btn.disabled=!ready;
    btn.classList.toggle("is-ready",ready);
    btn.textContent="Empezar partido online";
  }

  function rememberRoom(room,role){
    if(!room) return;
    currentRoomCode=normalizeRoomCode(room.roomCode||room.room_code);
    currentRole=role||currentRole||"";
    setRoomCode(currentRoomCode);
    setLobby(room);
    try{
      localStorage.setItem("cronogol_online_active_room",JSON.stringify({roomCode:currentRoomCode,role:currentRole,localName:getLocalPlayerName(),savedAt:new Date().toISOString()}));
    }catch(e){}
    startPolling();
  }

  function clearLocalRoomSilent(){
    currentRoomCode="";
    currentRole="";
    onlineLocalMatchStarted=false;
    try{localStorage.removeItem("cronogol_online_active_room");}catch(e){}
    setRoomCode("");
    setLobby(null);
    if(pollTimer) window.clearInterval(pollTimer);
    pollTimer=null;
  }

  function clearRememberedRoom(){
    clearLocalRoomSilent();
    setStatus("Sala local limpiada. Selecciona 1 vs 1 online para crear una sala nueva.","ready");
  }

  function setLoading(isLoading){
    document.querySelectorAll("#cg-online-create-btn,#cg-online-join-btn,#cg-online-refresh-btn,#cg-online-clear-btn,#cg-online-join-code").forEach(el=>{el.disabled=Boolean(isLoading);});
    updateStartButton(latestRoom);
  }

  function explainSupabaseError(error){
    const raw=String(error&&error.message||"");
    if(error&&error.status===404) return "No encuentro la tabla cronogol_rooms. Ejecuta primero el SQL incluido.";
    if(error&&error.status===401) return "Supabase rechaza la clave pública. Revisa la anon/publishable key.";
    if(error&&error.status===409) return "Ese código ya existe. Pulsa Crear sala otra vez.";
    if(raw.toLowerCase().includes("failed to fetch")) return "No se pudo conectar con Supabase. Revisa URL, CORS o conexión.";
    return raw||"Error desconocido al conectar con Supabase.";
  }

  function setSegmentedValue(selectId,value){
    const select=document.getElementById(selectId);
    if(select) select.value=value;
    document.querySelectorAll(`[data-target="${selectId}"]`).forEach(btn=>{
      const active=btn.dataset.value===value;
      btn.classList.toggle("active",active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function startLocalOnlineMatch(room){
    if(onlineLocalMatchStarted) return;
    if(!room || room.status!=="playing") return;
    onlineLocalMatchStarted=true;

    const state=room.stateJson||{};
    const host=cleanPlayerName((state.players&&state.players[0]&&state.players[0].name)||state.hostName||room.hostName,"Jugador 1");
    const guest=cleanPlayerName((state.players&&state.players[1]&&state.players[1].name)||state.guestName||room.guestName,"Jugador 2");
    const mode=state.matchMode||room.matchMode||"classic";

    const p1=document.getElementById("player1-name");
    const p2=document.getElementById("player2-name");
    if(p1) p1.value=host;
    if(p2) p2.value=guest;

    setSegmentedValue("game-mode","online");
    setSegmentedValue("match-mode", mode==="fast" ? "five" : "classic");

    setStatus(`Partida online iniciada · ${host} vs ${guest}.`,"ok");
    safeToast("Partida online iniciada.");

    window.setTimeout(()=>{
      try{
        if(typeof window.startMatch==="function") window.startMatch();
        else if(typeof startMatch==="function") startMatch();
        else document.getElementById("start-match-btn")?.click();
      }catch(e){
        document.getElementById("start-match-btn")?.click();
      }
    },250);
  }

  async function refreshLobby({silent=false}={}){
    if(!currentRoomCode){if(!silent)setStatus("No hay sala activa todavía.","error"); return null;}
    if(!silent)setStatus(`Actualizando sala ${currentRoomCode}...`,"loading");
    const room=await refreshRoomRemote(currentRoomCode);
    rememberRoom(room,currentRole);
    if(room.status==="playing"){
      setStatus(`Sala ${room.roomCode} en partida · entrando...`,"ok");
      startLocalOnlineMatch(room);
    }else if(room.status==="ready"&&room.guestName){
      if(currentRole==="host") setStatus(`Sala ${room.roomCode} lista · puedes empezar la partida.`,"ok");
      else setStatus(`Sala ${room.roomCode} lista · esperando a ${room.hostName}.`,"ok");
    }else{
      setStatus(`Sala ${room.roomCode} creada · esperando rival.`,"ok");
    }
    return room;
  }

  function startPolling(){
    if(pollTimer) window.clearInterval(pollTimer);
    if(!currentRoomCode) return;
    pollTimer=window.setInterval(()=>{refreshLobby({silent:true}).catch(()=>{});},POLL_INTERVAL_MS);
  }

  async function createFreshOnlineRoom(reason){
    if(autoCreatingRoom) return;
    autoCreatingRoom=true;
    clearLocalRoomSilent();
    setLoading(true);
    setStatus(reason||"Creando nueva sala online...","loading");
    try{
      const room=await createRoomRemote(getSetupOptions());
      rememberRoom(room,"host");
      safeToast(`Sala ${room.roomCode} creada.`);
      setStatus(`Sala ${room.roomCode} creada · esperando rival.`,"ok");
    }catch(error){
      const msg=explainSupabaseError(error);
      safeToast(msg);
      setStatus(msg,"error");
    }finally{
      setLoading(false);
      autoCreatingRoom=false;
      updateStartButton(currentRoomCode ? awaitSafeCurrentRoom() : null);
    }
  }

  function awaitSafeCurrentRoom(){return null;}

  function bindOnlineFoundationUI(){
    const createBtn=document.getElementById("cg-online-create-btn");
    const joinBtn=document.getElementById("cg-online-join-btn");
    const refreshBtn=document.getElementById("cg-online-refresh-btn");
    const clearBtn=document.getElementById("cg-online-clear-btn");
    const startBtn=document.getElementById("cg-online-start-btn");
    const joinInput=document.getElementById("cg-online-join-code");
    const gameModeSelect=document.getElementById("game-mode");

    setStatus("Selecciona 1 vs 1 online para crear una sala nueva automáticamente.","ready");

    function onModeMaybeOnline(){
      if(gameModeSelect && gameModeSelect.value==="online"){
        createFreshOnlineRoom("Creando sala online nueva...");
      }else{
        clearLocalRoomSilent();
        setStatus("Modo online desactivado.","ready");
      }
    }

    if(joinInput){
      joinInput.addEventListener("input",()=>{joinInput.value=normalizeRoomCode(joinInput.value);});
      joinInput.addEventListener("keydown",event=>{if(event.key==="Enter"&&joinBtn) joinBtn.click();});
    }

    if(clearBtn) clearBtn.addEventListener("click",clearRememberedRoom);
    if(createBtn) createBtn.addEventListener("click",()=>createFreshOnlineRoom("Creando sala online nueva..."));

    if(startBtn){
      startBtn.addEventListener("click",async()=>{
        if(currentRole!=="host"){
          const msg=latestRoom && latestRoom.hostName ? `Esperando a que ${latestRoom.hostName} empiece la partida.` : "Solo el anfitrión puede empezar la partida online.";
          safeToast(msg); setStatus(msg,"ready"); updateStartButton(latestRoom); return;
        }
        setLoading(true);
        setStatus("Iniciando partida online...","loading");
        try{
          const room=await startOnlineMatchRemote();
          rememberRoom(room,"host");
          setStatus(`Partida online iniciada · ${room.hostName} vs ${room.guestName}.`,"ok");
          startLocalOnlineMatch(room);
        }catch(error){
          const msg=explainSupabaseError(error);
          safeToast(msg);
          setStatus(msg,"error");
        }finally{
          setLoading(false);
          updateStartButton(latestRoom);
        }
      });
    }

    if(joinBtn){
      joinBtn.addEventListener("click",async()=>{
        const code=normalizeRoomCode(joinInput&&joinInput.value);
        if(!isValidRoomCode(code)){safeToast("Introduce un código de sala válido."); setStatus("Introduce un código de sala válido.","error"); return;}
        if(currentRole==="host"&&currentRoomCode===code){
          const msg="Ya eres el anfitrión de esta sala. Ábrela en otro móvil/navegador con otro nombre para unirte.";
          safeToast(msg); setStatus(msg,"error"); return;
        }
        if(currentRoomCode&&currentRoomCode!==code) clearLocalRoomSilent();
        setLoading(true);
        setStatus(`Uniéndose a sala ${code}...`,"loading");
        try{
          const room=await joinRoomRemote(code,getLocalPlayerName());
          rememberRoom(room,"guest");
          safeToast(`Te has unido a la sala ${code}.`);
          setStatus(`Sala ${code} lista · esperando a ${room.hostName}.`,"ok");
        }catch(error){
          const msg=explainSupabaseError(error);
          safeToast(msg);
          setStatus(msg,"error");
        }finally{
          setLoading(false);
        }
      });
    }

    if(refreshBtn){
      refreshBtn.addEventListener("click",async()=>{
        setLoading(true);
        try{await refreshLobby();}
        catch(error){const msg=explainSupabaseError(error); safeToast(msg); setStatus(msg,"error");}
        finally{setLoading(false);}
      });
    }

    if(gameModeSelect){
      gameModeSelect.addEventListener("change",onModeMaybeOnline);
      document.querySelectorAll('[data-target="game-mode"][data-value="online"]').forEach(btn=>{
        btn.addEventListener("click",()=>setTimeout(onModeMaybeOnline,0));
      });
      if(gameModeSelect.value==="online") createFreshOnlineRoom("Creando sala online nueva...");
      else clearLocalRoomSilent();
    }
  }

  window.CronoGolOnline=Object.freeze({
    version:CG_ONLINE_VERSION,
    supabaseUrl:CG_SUPABASE_URL,
    table:CG_ROOMS_TABLE,
    randomRoomCode,
    normalizeRoomCode,
    isValidRoomCode,
    createRoomDraft,
    createMatchSnapshot,
    getOnlineStatus,
    fetchRoomRemote,
    createRoomRemote,
    joinRoomRemote,
    refreshRoomRemote,
    startOnlineMatchRemote
  });

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",bindOnlineFoundationUI);
  else bindOnlineFoundationUI();
})();
