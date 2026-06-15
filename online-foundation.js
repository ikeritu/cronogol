/* CronoGol v2.1.0 — Room Lobby Sync */
(function(){
  "use strict";
  const CG_ONLINE_VERSION="2.1.0";
  const CG_SUPABASE_URL="https://xbrrdkflztxkvnngmdhu.supabase.co";
  const CG_SUPABASE_ANON_KEY="sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l";
  const CG_ROOMS_TABLE="cronogol_rooms";
  const ROOM_CODE_CHARS="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const POLL_INTERVAL_MS=8000;
  let currentRoomCode="";
  let currentRole="";
  let pollTimer=null;

  function randomRoomCode(length=6){
    let code="";
    if(window.crypto&&crypto.getRandomValues){const v=new Uint32Array(length);crypto.getRandomValues(v);for(let i=0;i<length;i++)code+=ROOM_CODE_CHARS[v[i]%ROOM_CODE_CHARS.length];return code;}
    for(let i=0;i<length;i++)code+=ROOM_CODE_CHARS[Math.floor(Math.random()*ROOM_CODE_CHARS.length)];
    return code;
  }
  function normalizeRoomCode(value){return String(value||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8);}
  function isValidRoomCode(value){const c=normalizeRoomCode(value);return c.length>=4&&c.length<=8;}
  function cleanPlayerName(value,fallback){return String(value||fallback||"Jugador").trim().slice(0,24)||fallback||"Jugador";}
  function readInput(id,fallback){const el=document.getElementById(id);return cleanPlayerName(el&&el.value,fallback);}
  function getSetupOptions(){
    const activeText=Array.from(document.querySelectorAll(".active,[aria-pressed='true']")).map(b=>(b.textContent||"").toLowerCase()).join(" ");
    return {hostName:readInput("player1-name","Jugador 1"),guestName:"",matchMode:activeText.includes("rápido")?"fast":"classic",gameMode:activeText.includes("máquina")?"machine":"local"};
  }
  async function supabaseFetch(path,options={}){
    const response=await fetch(`${CG_SUPABASE_URL}/rest/v1/${path}`,Object.assign({},options,{headers:Object.assign({apikey:CG_SUPABASE_ANON_KEY,Authorization:`Bearer ${CG_SUPABASE_ANON_KEY}`,"Content-Type":"application/json"},options.headers||{})}));
    const text=await response.text();let data=null;if(text){try{data=JSON.parse(text)}catch(e){data=text}}
    if(!response.ok){const err=new Error(data&&data.message?data.message:`Supabase HTTP ${response.status}`);err.status=response.status;err.data=data;throw err;}
    return data;
  }
  function rowToLobby(row){if(!row)return null;const st=row.state_json||{};return {roomCode:row.room_code,status:row.status||"waiting",hostName:row.host_name||st.hostName||"Jugador 1",guestName:row.guest_name||st.guestName||"",matchMode:row.match_mode||"classic",gameMode:row.game_mode||"local",stateJson:st,updatedAt:row.updated_at};}
  function buildState(hostName,guestName,extra={}){return Object.assign({schemaVersion:2,appVersion:CG_ONLINE_VERSION,phase:"lobby",hostName,guestName,hostConnected:true,guestConnected:Boolean(guestName),score:[0,0],currentPlayerIndex:0,events:[],lastLobbyUpdateAt:new Date().toISOString()},extra);}
  async function fetchRoomRemote(code){const c=normalizeRoomCode(code);if(!isValidRoomCode(c))throw new Error("Código de sala no válido.");const data=await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(c)}&select=*`,{method:"GET"});if(!Array.isArray(data)||!data.length)throw new Error("No existe ninguna sala con ese código.");return rowToLobby(data[0]);}
  async function createRoomRemote(options={}){const code=randomRoomCode();const host=cleanPlayerName(options.hostName,"Jugador 1");const payload={room_code:code,status:"waiting",host_name:host,guest_name:"",match_mode:options.matchMode==="fast"?"fast":"classic",game_mode:options.gameMode==="machine"?"machine":"local",state_json:buildState(host,""),app_version:CG_ONLINE_VERSION,last_seen_at:new Date().toISOString()};const data=await supabaseFetch(CG_ROOMS_TABLE,{method:"POST",headers:{Prefer:"return=representation"},body:JSON.stringify(payload)});return rowToLobby(Array.isArray(data)&&data[0]?data[0]:payload);}
  async function joinRoomRemote(code){const room=await fetchRoomRemote(code);const guest=readInput("player1-name","Invitado");const state=buildState(room.hostName,guest,Object.assign({},room.stateJson||{}));const payload={status:"ready",guest_name:guest,state_json:state,app_version:CG_ONLINE_VERSION,last_seen_at:new Date().toISOString()};const data=await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(room.roomCode)}`,{method:"PATCH",headers:{Prefer:"return=representation"},body:JSON.stringify(payload)});return rowToLobby(Array.isArray(data)&&data[0]?data[0]:Object.assign(room,payload,{guestName:guest}));}
  async function refreshRoomRemote(code){const room=await fetchRoomRemote(code);await supabaseFetch(`${CG_ROOMS_TABLE}?room_code=eq.${encodeURIComponent(room.roomCode)}`,{method:"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify({last_seen_at:new Date().toISOString()})});return room;}
  function safeToast(msg){if(typeof window.showToast==="function")return window.showToast(msg);const el=document.createElement("div");el.className="toast cg-online-temp-toast";el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),3000);}
  function setStatus(msg,type){const el=document.getElementById("cg-online-status");if(el){el.textContent=msg;el.dataset.state=type||"neutral";}}
  function setRoomCode(code){const el=document.getElementById("cg-online-room-code");if(el)el.textContent=normalizeRoomCode(code)||"------";}
  function setLobby(room){const h=document.getElementById("cg-online-host-name"),g=document.getElementById("cg-online-guest-name"),st=document.getElementById("cg-online-room-state");if(!room){if(h)h.textContent="—";if(g)g.textContent="Esperando rival";if(st)st.textContent="Sin sala";return;}if(h)h.textContent=room.hostName||"Jugador 1";if(g)g.textContent=room.guestName||"Esperando rival";if(st)st.textContent=(room.status==="ready"&&room.guestName)?"Rival conectado":"Esperando rival";}
  function rememberRoom(room,role){currentRoomCode=normalizeRoomCode(room.roomCode);currentRole=role||currentRole;setRoomCode(currentRoomCode);setLobby(room);try{localStorage.setItem("cronogol_online_active_room",JSON.stringify({roomCode:currentRoomCode,role:currentRole,savedAt:new Date().toISOString()}));}catch(e){}startPolling();}
  function restoreRememberedRoom(){try{const raw=localStorage.getItem("cronogol_online_active_room");if(!raw)return;const saved=JSON.parse(raw);if(saved&&isValidRoomCode(saved.roomCode)){currentRoomCode=normalizeRoomCode(saved.roomCode);currentRole=saved.role||"";setRoomCode(currentRoomCode);setStatus(`Sala recordada ${currentRoomCode} · pulsa Actualizar lobby.`,"ready");}}catch(e){}}
  function setLoading(v){document.querySelectorAll("#cg-online-create-btn,#cg-online-join-btn,#cg-online-refresh-btn,#cg-online-join-code").forEach(el=>el.disabled=Boolean(v));}
  function explainError(e){const raw=String(e&&e.message||"");if(e&&e.status===404)return"No encuentro la tabla cronogol_rooms.";if(e&&e.status===401)return"Supabase rechaza la clave pública.";if(e&&e.status===409)return"Ese código ya existe. Pulsa Crear sala otra vez.";if(raw.toLowerCase().includes("failed to fetch"))return"No se pudo conectar con Supabase.";return raw||"Error desconocido con Supabase.";}
  async function refreshLobby({silent=false}={}){if(!currentRoomCode){if(!silent)setStatus("No hay sala activa todavía.","error");return null;}if(!silent)setStatus(`Actualizando sala ${currentRoomCode}...`,"loading");const room=await refreshRoomRemote(currentRoomCode);rememberRoom(room,currentRole);setStatus((room.status==="ready"&&room.guestName)?`Sala ${room.roomCode} lista · ${room.hostName} vs ${room.guestName}.`:`Sala ${room.roomCode} activa · esperando rival.`,"ok");return room;}
  function startPolling(){if(pollTimer)clearInterval(pollTimer);if(!currentRoomCode)return;pollTimer=setInterval(()=>refreshLobby({silent:true}).catch(()=>{}),POLL_INTERVAL_MS);}
  function bind(){const createBtn=document.getElementById("cg-online-create-btn"),joinBtn=document.getElementById("cg-online-join-btn"),refreshBtn=document.getElementById("cg-online-refresh-btn"),joinInput=document.getElementById("cg-online-join-code");setStatus("Lobby online listo · crea una sala o únete con código.","ready");restoreRememberedRoom();if(currentRoomCode)refreshLobby({silent:true}).catch(()=>{});if(joinInput){joinInput.addEventListener("input",()=>joinInput.value=normalizeRoomCode(joinInput.value));joinInput.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&joinBtn)joinBtn.click();});}if(createBtn)createBtn.addEventListener("click",async()=>{setLoading(true);setStatus("Creando sala en Supabase...","loading");try{const room=await createRoomRemote(getSetupOptions());rememberRoom(room,"host");safeToast(`Sala ${room.roomCode} creada.`);setStatus(`Sala ${room.roomCode} creada · esperando rival.`,"ok");}catch(e){const msg=explainError(e);safeToast(msg);setStatus(msg,"error");}finally{setLoading(false);}});if(joinBtn)joinBtn.addEventListener("click",async()=>{const code=normalizeRoomCode(joinInput&&joinInput.value);if(!isValidRoomCode(code)){safeToast("Introduce un código de sala válido.");setStatus("Introduce un código de sala válido.","error");return;}setLoading(true);setStatus(`Uniéndose a sala ${code}...`,"loading");try{const room=await joinRoomRemote(code);rememberRoom(room,"guest");safeToast(`Te has unido a la sala ${code}.`);setStatus(`Sala ${code} lista · ${room.hostName} vs ${room.guestName}.`,"ok");}catch(e){const msg=explainError(e);safeToast(msg);setStatus(msg,"error");}finally{setLoading(false);}});if(refreshBtn)refreshBtn.addEventListener("click",async()=>{setLoading(true);try{await refreshLobby();}catch(e){const msg=explainError(e);safeToast(msg);setStatus(msg,"error");}finally{setLoading(false);}});}
  window.CronoGolOnline=Object.freeze({version:CG_ONLINE_VERSION,supabaseUrl:CG_SUPABASE_URL,table:CG_ROOMS_TABLE,randomRoomCode,normalizeRoomCode,isValidRoomCode,fetchRoomRemote,createRoomRemote,joinRoomRemote,refreshRoomRemote,getOnlineStatus:()=>({version:CG_ONLINE_VERSION,currentRoomCode,currentRole})});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind);else bind();
})();
