const $ = (id) => document.getElementById(id);

const setupScreen = $("setup-screen");
const gameScreen = $("game-screen");
const modalScreen = $("modal-screen");
const sideMenu = $("side-menu");

const player1Input = $("player1-name");
const player2Input = $("player2-name");
const gameModeSelect = $("game-mode");
const machineLevelSelect = $("machine-level");
const machineLevelLabel = $("machine-level-label");
const matchModeSelect = $("match-mode");
const forceEventsInput = $("force-events");
const soundEnabledInput = $("sound-enabled");

const startMatchBtn = $("start-match-btn");
const mainActionBtn = $("main-action-btn");
const resetBtn = $("reset-btn");
const menuResetBtn = $("menu-reset-btn");
const menuBtn = $("menu-btn");
const closeMenuBtn = $("close-menu-btn");

const rulesBtn = $("rules-btn");
const menuRulesBtn = $("menu-rules-btn");
const supportBtn = $("support-btn");
const menuSupportBtn = $("menu-support-btn");
const shareBtn = $("share-btn");
const menuShareBtn = $("menu-share-btn");
const copyLinkBtn = $("copy-link-btn");
const menuCopyBtn = $("menu-copy-btn");

const p1Label = $("p1-label"), p2Label = $("p2-label"), p1Score = $("p1-score"), p2Score = $("p2-score");
const p1Sanction = $("p1-sanction"), p2Sanction = $("p2-sanction");
const team0 = $("team-0"), team1 = $("team-1");
const halfLabel = $("half-label");
const timerDisplay = $("timer-display"), lastTwoDisplay = $("last-two-display");
const eventCard = $("event-card"), eventTitle = $("event-title"), messageLabel = $("message-label");
const turnLabel = $("turn-label");
const statTurns = $("stat-turns"), statGoals = $("stat-goals"), statWoodwork = $("stat-woodwork"), statCards = $("stat-cards"), statSpecials = $("stat-specials");
const matchClockLabel = $("match-clock-label"), localMatchesCount = $("local-matches-count");
const gameLog = $("game-log");

const specialPanel = $("special-panel"), specialLabel = $("special-label"), specialStartBtn = $("special-start-btn");
const shootoutPanel = $("shootout-panel"), shootoutP1Name = $("shootout-p1-name"), shootoutP2Name = $("shootout-p2-name"), shootoutP1 = $("shootout-p1"), shootoutP2 = $("shootout-p2");
const debugBox = $("debug-box"), debugValueInput = $("debug-value"), debugThrowBtn = $("debug-throw-btn");

const modalTitle = $("modal-title"), modalText = $("modal-text"), modalExtra = $("modal-extra"), modalActions = $("modal-actions");

const CRONOGOL_CONFIG = {
  siteUrl:"https://cronogol.es/",
  whatsappText: "Estoy jugando a CronoGol, el juego del cronómetro Casio ⚽⌚\n\nPruébalo aquí:\nhttps://cronogol.es/",
  paypalUrl: "https://paypal.me/ikeritus",
  bizumPhone: "+34615717190",
  bizumConcept: "CronoGol",
  contactEmail: "ikeritu@hotmail.com"
};


const I18N = {
  es: {
    labelMode:"Modo",
    labelDuration:"Duración",
    labelDifficulty:"Dificultad",
    machineDifficultyHint:"Normal: partida equilibrada.",
    advancedOptions:"Opciones avanzadas",
    labelPlayer1:"Jugador 1",
    labelPlayer2:"Jugador 2 / Máquina",
    modeLocal:"1 vs 1",
    modeMachine:"1 vs Máquina",
    durationClassic:"Clásico",
    durationFast:"Rápido",
    startMatch:"EMPEZAR PARTIDO",
    forceMachine:"Forzar descanso/final contra máquina",
    sound:"Sonido",
    rules:"Reglas",
    modes:"Modos",
    history:"Historia",
    share:"Compartir",
    copyLink:"Copiar enlace",
    feedback:"Feedback",
    supportShort:"Apoya",
    inDevelopment:"En desarrollo",
    onlineSoon:"Modo online próximamente",
    onlineSoonText:"Salas privadas para jugar con amigos.",
    sponsorSpace:"CronoGol es gratis",
    sponsorText:"Puedes apoyar el proyecto invitándome a un café.",
    lastThrow:"ÚLTIMA TIRADA",
    turnOf:"TURNO DE",
    stats:"Estadísticas",
    matchHistory:"Historial del partido",
    resetMatch:"Reiniciar partido",
    menu:"Menú",
    supportFull:"Apoya CronoGol"
  },
  en: {
    labelMode:"Mode",
    labelDuration:"Duration",
    labelDifficulty:"Difficulty",
    machineDifficultyHint:"Normal: balanced match.",
    advancedOptions:"Advanced options",
    labelPlayer1:"Player 1",
    labelPlayer2:"Player 2 / Machine",
    modeLocal:"1 vs 1",
    modeMachine:"1 vs Machine",
    durationClassic:"Classic",
    durationFast:"Fast",
    startMatch:"START MATCH",
    forceMachine:"Force half/full time vs machine",
    sound:"Sound",
    rules:"Rules",
    modes:"Modes",
    history:"History",
    share:"Share",
    copyLink:"Copy link",
    feedback:"Feedback",
    supportShort:"Support",
    inDevelopment:"In development",
    onlineSoon:"Online mode coming soon",
    onlineSoonText:"Private rooms to play with friends.",
    sponsorSpace:"CronoGol is free",
    sponsorText:"You can support the project by buying me a coffee.",
    lastThrow:"LAST THROW",
    turnOf:"TURN OF",
    stats:"Stats",
    matchHistory:"Match history",
    resetMatch:"Restart match",
    menu:"Menu",
    supportFull:"Support CronoGol"
  }
};

let currentLang = "es";


function updateLanguageLinks(){
  document.querySelectorAll('a[href^="feedback.html"]').forEach((a)=>{
    a.href = `feedback.html?lang=${currentLang}`;
  });
}


function applyLanguage(lang){
  currentLang = I18N[lang] ? lang : "es";

  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el)=>{
    const key = el.dataset.i18n;
    const value = I18N[currentLang][key];
    if(value) el.textContent = value;
  });

  document.querySelectorAll(".lang-btn").forEach((btn)=>{
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  updateLanguageLinks();
  if(typeof cgPatchDynamicTranslations === "function") cgPatchDynamicTranslations();
  try { localStorage.setItem("cronogol_lang", currentLang); } catch(e) {}
}


const MODAL_TEXTS = {
  es: {
    rulesTitle: "REGLAS",
    rulesIntro: "Se usan los dos últimos dígitos del cronómetro.",
    rulesHtml: `<div class="donation-item">
      <strong>Modo clásico</strong><br>
      <strong>00</strong> = Gol.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>45</strong> = Descanso. Se resetea el cronómetro y cambia el turno.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>90</strong> = Final del partido.<br>
      <strong>96-97</strong> = Falta peligrosa. Hay una tirada especial: si sale de <strong>00 a 20</strong>, es gol; si sale de <strong>21 a 99</strong>, falla.<br>
      <strong>98-99</strong> = Penalti. Hay una tirada especial: si sale número <strong>par</strong>, es gol; si sale <strong>impar</strong>, falla.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.
    </div>
    <div class="donation-item">
      <strong>Modo rápido</strong><br>
      Todo número terminado en <strong>0</strong> es gol: 00, 10, 20, 30, 40, 50, 60, 70, 80 y 90.<br>
      Todo número terminado en <strong>9</strong> es penalti: 09, 19, 29, 39, 49, 59, 69, 79, 89 y 99.<br>
      En el penalti, se hace una tirada especial: <strong>par = gol</strong>, <strong>impar = fallo</strong>.<br>
      Gana el primero que llegue a <strong>6 goles con 2 de ventaja</strong>. Ejemplo: 6-4 gana; 6-5 no gana; hay que llegar a 7-5.
    </div>`,
    close: "CERRAR",
    supportTitle: "APOYA CRONOGOL",
    supportIntro: "CronoGol es gratis y lo seguirá siendo.",
    bizumButton: "Abrir Bizum",
    paypalButton: "Abrir PayPal",
    concept: "Concepto"
  },
  en: {
    rulesTitle: "RULES",
    rulesIntro: "The game uses the last two digits of the stopwatch.",
    rulesHtml: `<div class="donation-item">
      <strong>Classic mode</strong><br>
      <strong>00</strong> = Goal.<br>
      <strong>01-02</strong> = Post. Same player repeats.<br>
      <strong>03-04</strong> = Crossbar. Same player repeats.<br>
      <strong>45</strong> = Half-time. Stopwatch resets and turn changes.<br>
      <strong>50</strong> = Yellow card. Turn ends and the player skips the next turn.<br>
      <strong>60</strong> = Red card. Turn ends and the player skips two turns.<br>
      <strong>90</strong> = Full-time.<br>
      <strong>96-97</strong> = Dangerous free kick. Special throw: <strong>00 to 20</strong> is a goal; <strong>21 to 99</strong> is a miss.<br>
      <strong>98-99</strong> = Penalty. Special throw: <strong>even = goal</strong>; <strong>odd = miss</strong>.<br>
      <strong>Any other number</strong> = Miss and turn changes.
    </div>
    <div class="donation-item">
      <strong>Fast mode</strong><br>
      Any number ending in <strong>0</strong> is a goal: 00, 10, 20, 30, 40, 50, 60, 70, 80 and 90.<br>
      Any number ending in <strong>9</strong> is a penalty: 09, 19, 29, 39, 49, 59, 69, 79, 89 and 99.<br>
      Penalty special throw: <strong>even = goal</strong>, <strong>odd = miss</strong>.<br>
      The first player to reach <strong>6 goals with a 2-goal lead</strong> wins. Example: 6-4 wins; 6-5 does not; you need 7-5.
    </div>`,
    close: "CLOSE",
    supportTitle: "SUPPORT CRONOGOL",
    supportIntro: "CronoGol is free and will remain free.",
    bizumButton: "Open Bizum",
    paypalButton: "Open PayPal",
    concept: "Concept"
  }
};

function modalLang(){
  return MODAL_TEXTS[currentLang] ? currentLang : "es";
}


function setupLanguageSelector(){
  document.querySelectorAll(".lang-btn").forEach((btn)=>{
    btn.addEventListener("click",()=>applyLanguage(btn.dataset.lang));
  });

  try {
    applyLanguage(localStorage.getItem("cronogol_lang") || "es");
  } catch(e) {
    applyLanguage("es");
  }
}


let timerInterval = null, matchClockInterval = null, timerStartTime = 0, currentElapsedMs = 0, stopwatchBaseMs = 0, matchStartTime = 0;
let machineTurnTimeout = null, machineStopTimeout = null, machineSpecialTurnTimeout = null, machineSpecialStopTimeout = null;
let pendingSpecial = null, penaltyShootout = null, audioCtx = null, versionTaps = 0;

const gameState = {
  players: [{name:"Jugador 1",goals:0,skipTurns:0},{name:"Jugador 2",goals:0,skipTurns:0}],
  currentPlayerIndex:0, half:1, isRunning:false, gameMode:"local", machineLevel:"normal", matchMode:"classic", forceEvents:true, soundEnabled:true, matchEnded:false,
  totalTurns:0, firstHalfTurns:0, secondHalfTurns:0, machineForceHalfAt:null, machineForceEndAt:null, log:[],
  stats:{goals:0,woodwork:0,cards:0,specials:0,penalties:0,freeKicks:0,misses:0},
  lastFinalText:""
};


/* ===== v1.8.7 QA FIX: helpers base restaurados =====
   El juego se rompía antes de arrancar porque varias funciones usadas en
   asignaciones onclick y en el flujo principal no existían en el bundle.
*/
function pad(n){ return String(Number(n)||0).padStart(2,"0"); }
function randomInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function currentPlayer(){ return gameState.players[gameState.currentPlayerIndex]; }
function scoreText(){ return `${gameState.players[0].name} ${gameState.players[0].goals} - ${gameState.players[1].goals} ${gameState.players[1].name}`; }
function clockSec(){
  try{
    const sec = Math.max(0, Math.floor((Date.now() - matchStartTime) / 1000));
    return `${pad(Math.floor(sec/60))}:${pad(sec%60)}`;
  }catch(e){ return "00:00"; }
}
function vibrate(pattern){ try{ if(navigator.vibrate) navigator.vibrate(pattern); }catch(e){} }
function playSound(type){
  try{
    if(!gameState.soundEnabled || !soundEnabledInput.checked) return;
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const patterns = {
      beep: [[880,0.045,0.030]],
      stop: [[420,0.050,0.032]],

      goal: [[660,0.070,0.045],[880,0.080,0.050],[1180,0.120,0.060]],
      penalty: [[520,0.080,0.045],[760,0.080,0.050],[520,0.080,0.045]],
      penalty_fail: [[240,0.120,0.050],[180,0.140,0.040]],
      free_kick: [[620,0.070,0.040],[720,0.090,0.045]],

      post: [[620,0.050,0.040],[340,0.080,0.045]],
      crossbar: [[700,0.050,0.040],[380,0.090,0.045]],
      yellow: [[540,0.100,0.045]],
      red: [[180,0.160,0.055]],
      miss: [[260,0.060,0.030]],
      half_time: [[440,0.080,0.040],[440,0.080,0.040]],
      full_time: [[360,0.080,0.040],[520,0.080,0.045],[360,0.120,0.040]]
    };

    const sequence = patterns[type] || patterns.beep;
    let offset = 0;
    sequence.forEach(([freq,duration,volume])=>{
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + offset + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + offset + duration);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + offset);
      osc.stop(audioCtx.currentTime + offset + duration + 0.02);
      offset += duration + 0.035;
    });
  }catch(e){}
}

function triggerScreenFeedback(type){
  try{
    const map = {
      goal: "cg-flash-goal",
      penalty: "cg-flash-penalty",
      free_kick: "cg-flash-special",
      post: "cg-shake-soft",
      crossbar: "cg-shake-soft",
      yellow: "cg-flash-yellow",
      red: "cg-flash-red",
      half_time: "cg-flash-special",
      full_time: "cg-flash-special"
    };
    const cls = map[type];
    if(!cls) return;
    document.body.classList.remove("cg-flash-goal","cg-flash-penalty","cg-flash-special","cg-shake-soft","cg-flash-yellow","cg-flash-red");
    void document.body.offsetWidth;
    document.body.classList.add(cls);
    window.setTimeout(()=>document.body.classList.remove(cls), 650);
  }catch(e){}
}
async function copyText(text,msg){
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(text);
    } else {
      const ta=document.createElement('textarea');
      ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    showToast(msg || "Copiado");
  }catch(e){ showToast(text); }
}
function showToast(message){
  try{
    const old=document.querySelector('.toast');
    if(old) old.remove();
    const t=document.createElement('div');
    t.className='toast';
    t.textContent=message;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),2200);
  }catch(e){}
}
function formattedFinalResult(){
  const p1=gameState.players[0], p2=gameState.players[1];
  let text=`${p1.name} | ${p1.goals} - ${p2.goals} | ${p2.name}`;
  if(p1.goals>p2.goals) text+=`. Gana ${p1.name}.`;
  else if(p2.goals>p1.goals) text+=`. Gana ${p2.name}.`;
  else text+='. Empate final.';
  return text;
}
function copyResult(){ copyText(resultText(true), currentLang === "en" ? "Result copied" : "Resultado copiado"); }
function forceDebugThrow(){
  const value = Number(debugValueInput.value);
  if(Number.isNaN(value) || value < 0 || value > 99){ showToast('Valor 00-99'); return; }
  if(gameState.matchEnded){ showToast('No hay partido activo'); return; }
  stopTimerAndEvaluate(value);
}

startMatchBtn.onclick = startMatch;
mainActionBtn.onclick = handleMainAction;
if(resetBtn) resetBtn.onclick = confirmReset;
menuResetBtn.onclick = () => { sideMenu.classList.add("hidden"); confirmReset(); };
specialStartBtn.onclick = handleSpecialButton;
debugThrowBtn.onclick = forceDebugThrow;
gameModeSelect.onchange = () => {
  if(gameModeSelect.value==="machine" && player2Input.value==="Jugador 2") player2Input.value="Máquina";
  if(gameModeSelect.value==="local" && player2Input.value==="Máquina") player2Input.value="Jugador 2";
  updateSetupVisibility();
};
rulesBtn.onclick = showRulesModal; menuRulesBtn.onclick = () => { sideMenu.classList.add("hidden"); showRulesModal(); };
supportBtn.onclick = showSupportModal; menuSupportBtn.onclick = () => { sideMenu.classList.add("hidden"); showSupportModal(); };
shareBtn.onclick = shareCronoGol; menuShareBtn.onclick = () => { sideMenu.classList.add("hidden"); shareCronoGol(); };
copyLinkBtn.onclick = copyCronoGolLink; menuCopyBtn.onclick = () => { sideMenu.classList.add("hidden"); copyCronoGolLink(); };
menuBtn.onclick = () => sideMenu.classList.remove("hidden");
closeMenuBtn.onclick = () => sideMenu.classList.add("hidden");
$("version-tap-target").onclick = () => { versionTaps++; if(versionTaps>=5){ debugBox.classList.remove("hidden"); showToast("Debug activado"); } };



function setupSegmentedControls(){
  document.querySelectorAll(".segment-btn").forEach((btn)=>{
    btn.addEventListener("click",()=>{
      const targetId = btn.dataset.target;
      const value = btn.dataset.value;
      const select = document.getElementById(targetId);
      if(!select) return;

      select.value = value;

      document
        .querySelectorAll(`.segment-btn[data-target="${targetId}"]`)
        .forEach((item)=>item.classList.toggle("active", item.dataset.value === value));

      select.dispatchEvent(new Event("change"));
    });
  });
}


function closeMenuAndRun(fn){
  sideMenu.classList.add("hidden");
  setTimeout(fn, 0);
}


function clearMachineTimers(){
  clearTimeout(machineTurnTimeout);
  clearTimeout(machineStopTimeout);
  clearTimeout(machineSpecialTurnTimeout);
  clearTimeout(machineSpecialStopTimeout);
  machineTurnTimeout = null;
  machineStopTimeout = null;
  machineSpecialTurnTimeout = null;
  machineSpecialStopTimeout = null;
}

function resetRuntimeState(){
  clearMachineTimers();
  clearInterval(timerInterval);
  clearInterval(matchClockInterval);
  timerInterval = null;
  matchClockInterval = null;
  pendingSpecial = null;
  penaltyShootout = null;
  currentElapsedMs = 0;
  stopwatchBaseMs = 0;
  gameState.isRunning = false;
  gameState.matchEnded = true;

  if(mainActionBtn){
    mainActionBtn.disabled = false;
    mainActionBtn.textContent = "START";
    mainActionBtn.classList.remove("stop");
  }

  if(specialStartBtn){
    specialStartBtn.disabled = false;
    specialStartBtn.textContent = "TIRADA ESPECIAL";
  }

  if(specialPanel) specialPanel.classList.add("hidden");
  if(shootoutPanel) shootoutPanel.classList.add("hidden");
}



function updateSetupVisibility(){
  machineLevelLabel.classList.toggle("is-hidden", gameModeSelect.value !== "machine");
}
function loadLocal(){ try{ player1Input.value = localStorage.getItem("cronogol_player1") || player1Input.value; player2Input.value = localStorage.getItem("cronogol_player2") || player2Input.value; localMatchesCount.textContent = localStorage.getItem("cronogol_matches_played") || "0"; }catch(e){} }
function saveLocal(p1,p2){ try{ localStorage.setItem("cronogol_player1",p1); localStorage.setItem("cronogol_player2",p2); }catch(e){} }
function incrementMatches(){ try{ const n=Number(localStorage.getItem("cronogol_matches_played")||"0")+1; localStorage.setItem("cronogol_matches_played",String(n)); localMatchesCount.textContent=n; }catch(e){} }

function startMatch(){
  clearMachineTimers();
  const p1 = player1Input.value.trim() || "Jugador 1";
  const p2Default = gameModeSelect.value === "machine" ? "Máquina" : "Jugador 2";
  const p2 = player2Input.value.trim() || p2Default;
  saveLocal(p1,p2);

  Object.assign(gameState,{
    players:[{name:p1,goals:0,skipTurns:0},{name:p2,goals:0,skipTurns:0}],
    currentPlayerIndex:0, half:1, isRunning:false, gameMode:gameModeSelect.value, machineLevel:machineLevelSelect.value, matchMode:matchModeSelect.value,
    forceEvents:forceEventsInput.checked, soundEnabled:soundEnabledInput.checked, matchEnded:false,totalTurns:0,firstHalfTurns:0,secondHalfTurns:0,
    machineForceHalfAt:randomInt(20,30),machineForceEndAt:randomInt(20,30),log:[],stats:{goals:0,woodwork:0,cards:0,specials:0,penalties:0,freeKicks:0,misses:0},lastFinalText:""
  });
  pendingSpecial=null; penaltyShootout=null; currentElapsedMs=0; stopwatchBaseMs=0; matchStartTime=Date.now();
  setupScreen.classList.remove("active"); gameScreen.classList.add("active"); closeModal(); sideMenu.classList.add("hidden");
  timerDisplay.textContent="00:00:00"; lastTwoDisplay.textContent="--"; setEvent("--", currentLang === "en" ? "Press START to begin." : "Pulsa START para comenzar.","neutral");
  startMatchClock(); updateUI(); addLog("Comienza el partido."); vibrate([30]); maybeMachineTurn();

  syncActionControls();
}

function handleMainAction(){ if(gameState.matchEnded||pendingSpecial) return; gameState.isRunning ? stopTimerAndEvaluate() : startTimer(); }
function startTimer(){
  gameState.isRunning=true; timerStartTime=performance.now(); mainActionBtn.textContent="STOP"; mainActionBtn.classList.add("stop"); playSound("beep"); vibrate([20]);
  timerInterval=setInterval(()=>{ currentElapsedMs=stopwatchBaseMs+(performance.now()-timerStartTime); updateTimerDisplay(currentElapsedMs); },16);
}
function stopTimerAndEvaluate(forcedValue=null){
  stopTimer(); const value = forcedValue ?? getLastTwoDigits(currentElapsedMs); lastTwoDisplay.textContent=pad(value);
  if(penaltyShootout){ evaluateShootoutPenalty(value); return; }
  gameState.totalTurns++; if(gameState.half===1) gameState.firstHalfTurns++; else gameState.secondHalfTurns++;
  applyNormalResult(value,evaluateThrow(value));
}
function stopTimer(){ gameState.isRunning=false; clearInterval(timerInterval); timerInterval=null; stopwatchBaseMs=currentElapsedMs; mainActionBtn.textContent="START"; mainActionBtn.classList.remove("stop"); playSound("stop"); }
function getLastTwoDigits(ms){ return Math.floor(ms/10)%100; }
function updateTimerDisplay(ms){ const h=Math.floor(ms/10),m=Math.floor(h/6000),s=Math.floor((h%6000)/100),c=h%100; timerDisplay.textContent=`${pad(m)}:${pad(s)}:${pad(c)}`; lastTwoDisplay.textContent=pad(c); }


function isFastMode() {
  return gameState.matchMode === "five";
}

function hasFastModeWinner() {
  const a = gameState.players[0].goals;
  const b = gameState.players[1].goals;
  return (a >= 6 || b >= 6) && Math.abs(a - b) >= 2;
}

function evaluateFastThrow(v) {
  // Modo rápido:
  // - Todo número terminado en 0 es gol: 00, 10, 20... 90.
  // - Todo número terminado en 9 es penalti: 09, 19, 29...
  // - Gana el primero en llegar a 6 goles con 2 de ventaja.
  if (v % 10 === 0) return {type:"goal",msg:"⚽ GOOOL",cls:"goal"};
  if (v % 10 === 9) return {type:"penalty",msg:"PENALTI",cls:"special",special:"penalty"};
  return {type:"miss",msg:"FALLO",cls:"neutral"};
}


function evaluateThrow(v){
  if(isFastMode()) return evaluateFastThrow(v);
  if(v===0) return {type:"goal",msg:"⚽ GOOOL",cls:"goal"};
  if(v===1||v===2) return {type:"post",msg:"POSTE",cls:"special",repeat:true};
  if(v===3||v===4) return {type:"crossbar",msg:"LARGUERO",cls:"special",repeat:true};
  if(v===45) return {type:"half_time",msg:"DESCANSO",cls:"special"};
  if(v===50) return {type:"yellow",msg:"🟨 AMARILLA",cls:"yellow"};
  if(v===60) return {type:"red",msg:"🟥 ROJA",cls:"red"};
  if(v===90) return {type:"full_time",msg:"FINAL",cls:"special"};
  if(v===96||v===97) return {type:"free_kick",msg:"FALTA PELIGROSA",cls:"special",special:"free_kick"};
  if(v===98||v===99) return {type:"penalty",msg:"PENALTI",cls:"special",special:"penalty"};
  return {type:"miss",msg:"FALLO",cls:"neutral"};
}
function applyNormalResult(v,r){
  const p=currentPlayer(); setEvent(r.msg,`${p.name} sacó ${pad(v)} → ${r.msg}`,r.cls); addLog(`${clockSec()}  ${p.name} — ${pad(v)} — ${r.msg}`); playSound(r.type); triggerScreenFeedback(r.type);
  if(r.type==="goal"){ p.goals++; gameState.stats.goals++; vibrate([90,40,90]); if(isFastMode() && hasFastModeWinner()){ endMatch(); } else { switchTurn(); } }
  else if(r.type==="post"||r.type==="crossbar"){ gameState.stats.woodwork++; vibrate([50,30,50]); messageLabel.textContent+=". Repite."; }
  else if(r.type==="half_time"){ if(gameState.half===1) showHalfTime(); else switchTurn(); }
  else if(r.type==="yellow"){ p.skipTurns++; gameState.stats.cards++; vibrate([120]); switchTurn(); }
  else if(r.type==="red"){ p.skipTurns+=2; gameState.stats.cards++; vibrate([160,60,160]); switchTurn(); }
  else if(r.type==="full_time"){ endMatch(); }
  else if(r.special){ gameState.stats.specials++; if(r.special==="free_kick")gameState.stats.freeKicks++; if(r.special==="penalty")gameState.stats.penalties++; pendingSpecial=r.special; specialPanel.classList.remove("hidden"); specialLabel.textContent=r.special==="free_kick"?`${p.name}: 00-20 es gol.`:`${p.name}: par es gol.`; mainActionBtn.disabled=true; vibrate([80,40,80]); maybeMachineSpecialTurn(); }
  else { gameState.stats.misses++; switchTurn(); }
  updateUI(); if(!gameState.matchEnded&&!pendingSpecial&&!penaltyShootout) maybeMachineTurn();
}
function handleSpecialButton(){ if(!pendingSpecial) return; if(gameState.gameMode==="machine" && gameState.currentPlayerIndex===1) return; if(!gameState.isRunning){ startTimer(); specialStartBtn.textContent="STOP ESPECIAL"; } else { stopTimer(); evaluateSpecialThrow(getLastTwoDigits(currentElapsedMs)); } }
function evaluateSpecialThrow(v){
  const p=currentPlayer(); let goal=false,msg="";
  if(pendingSpecial==="free_kick"){ goal=v>=0&&v<=20; msg=goal?"GOL DE FALTA":"FALTA FALLADA"; }
  if(pendingSpecial==="penalty"){ goal=v%2===0; msg=goal?"GOL DE PENALTI":"PENALTI FALLADO"; }
  if(goal){ p.goals++; gameState.stats.goals++; } else gameState.stats.misses++;
  setEvent(msg,`${pad(v)} → ${msg}`,goal?"goal":"neutral"); addLog(`${clockSec()}  ${p.name} — ${pad(v)} — ${msg}`); const finishedSpecial=pendingSpecial; playSound(goal?"goal":(finishedSpecial==="penalty"?"penalty_fail":"miss")); triggerScreenFeedback(goal?"goal":finishedSpecial); vibrate(goal?[120,50,120]:[45]); pendingSpecial=null; specialPanel.classList.add("hidden"); specialStartBtn.textContent="TIRADA ESPECIAL";
if(isFastMode() && goal && hasFastModeWinner()){ endMatch(); } else { switchTurn(); updateUI(); maybeMachineTurn(); }

  syncActionControls();
}
function showHalfTime(){ gameState.half=2; currentElapsedMs=0; stopwatchBaseMs=0; timerDisplay.textContent="00:00:00"; lastTwoDisplay.textContent="--"; switchTurn(); showModal("DESCANSO",scoreText(),"<p>Se resetea el cronómetro y comienza la segunda parte.</p>",[{text:"CONTINUAR",action:()=>{closeModal();maybeMachineTurn();}}]); }
function endMatch(){ gameState.matchEnded=true; clearInterval(matchClockInterval); if(gameState.isRunning) stopTimer(); if(gameState.players[0].goals===gameState.players[1].goals){ showModal("FINAL",`${scoreText()}. Empate.`,finalHtml(),[{text:"IR A PENALTIS",action:startPenaltyShootout},{text:"TERMINAR EN EMPATE",action:()=>showFinal(false)}]); } else showFinal(false); }
function startPenaltyShootout(){ closeModal(); gameState.matchEnded=false; penaltyShootout={currentPlayerIndex:0,shots:[[],[]],goals:[0,0]}; gameState.currentPlayerIndex=0; shootoutPanel.classList.remove("hidden"); setEvent("PENALTIS","Par = gol, impar = fallo.","special"); updateUI(); maybeMachineTurn(); }
function evaluateShootoutPenalty(v){ const idx=penaltyShootout.currentPlayerIndex, goal=v%2===0; penaltyShootout.shots[idx].push(goal); if(goal){gameState.players[idx].goals++;gameState.stats.goals++;}else gameState.stats.misses++; addLog(`${clockSec()}  ${gameState.players[idx].name} — ${pad(v)} — ${goal?"Gol penalti":"Penalti fallado"}`); setEvent(goal?"GOL":"FALLO",pad(v),goal?"goal":"neutral"); if(isShootoutFinished()){ gameState.matchEnded=true; showFinal(true); updateUI(); return; } penaltyShootout.currentPlayerIndex=idx===0?1:0; gameState.currentPlayerIndex=penaltyShootout.currentPlayerIndex; updateUI(); maybeMachineTurn(); }
function isShootoutFinished(){ const a=penaltyShootout.shots[0],b=penaltyShootout.shots[1]; return a.length>=5&&b.length>=5&&a.length===b.length&&gameState.players[0].goals!==gameState.players[1].goals; }
function showFinal(pens){ incrementMatches(); let text=scoreText(); if(gameState.players[0].goals>gameState.players[1].goals) text+=`. Gana ${gameState.players[0].name}.`; else if(gameState.players[1].goals>gameState.players[0].goals) text+=`. Gana ${gameState.players[1].name}.`; else text+=". Empate final."; if(pens) text+=" Resuelto en penaltis."; gameState.lastFinalText=formattedFinalResult(); showModal("FINAL DEL PARTIDO",text,finalHtml(),[{text:"REVANCHA",action:restartSameMatch},{text:"COMPARTIR RESULTADO",action:shareResult},{text:"COPIAR RESULTADO",action:copyResult},{text:"NUEVA PARTIDA",action:resetToSetup}]); }
function finalHtml(){ return `<div class="donation-item"><strong>Resumen</strong><br>Tiradas: ${gameState.totalTurns}<br>Goles: ${gameState.stats.goals}<br>Postes/Largueros: ${gameState.stats.woodwork}<br>Tarjetas: ${gameState.stats.cards}<br>Especiales: ${gameState.stats.specials}</div><div class="donation-item"><strong>☕ CronoGol es gratis</strong><br><button class="bizum-direct-btn" onclick="openBizum()">Abrir Bizum</button><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">PayPal</a></div>`; }
function restartSameMatch(){ closeModal(); player1Input.value=gameState.players[0].name; player2Input.value=gameState.players[1].name; startMatch(); }
function switchTurn(){ gameState.currentPlayerIndex=gameState.currentPlayerIndex===0?1:0; processSkippedTurns(); }
function processSkippedTurns(){ let safe=0; while(currentPlayer().skipTurns>0&&safe<4){ const p=currentPlayer(); p.skipTurns--; addLog(`${clockSec()}  ${p.name} pierde turno por sanción`); gameState.currentPlayerIndex=gameState.currentPlayerIndex===0?1:0; safe++; } }

function getMachineSpecialStopDelay(){
  if(gameState.machineLevel === "easy") return randomInt(650, 1500);
  if(gameState.machineLevel === "hard") return randomInt(900, 2400);
  return randomInt(750, 1900);
}

function pickMachineSpecialValue(values){
  return values[randomInt(0, values.length - 1)];
}

function getMachineSpecialForcedValue(type){
  if(type === "penalty"){
    const goalChance =
      gameState.machineLevel === "easy" ? 0.55 :
      gameState.machineLevel === "hard" ? 0.75 :
      0.65;

    const wantsGoal = Math.random() < goalChance;
    const evens = [];
    const odds = [];
    for(let i = 0; i <= 99; i++){
      if(i % 2 === 0) evens.push(i);
      else odds.push(i);
    }

    return pickMachineSpecialValue(wantsGoal ? evens : odds);
  }

  if(type === "free_kick"){
    const goalChance =
      gameState.machineLevel === "easy" ? 0.35 :
      gameState.machineLevel === "hard" ? 0.58 :
      0.45;

    if(Math.random() < goalChance) return randomInt(0, 20);
    return randomInt(21, 99);
  }

  return randomInt(0, 99);
}

function setMachineSpecialStatus(text){
  try{
    if(specialStartBtn) specialStartBtn.textContent = text;
  }catch(e){}
}

function maybeMachineSpecialTurn(){
  clearTimeout(machineSpecialTurnTimeout);
  clearTimeout(machineSpecialStopTimeout);

  if(
    gameState.gameMode !== "machine" ||
    gameState.currentPlayerIndex !== 1 ||
    gameState.matchEnded ||
    !pendingSpecial ||
    penaltyShootout ||
    !gameScreen.classList.contains("active")
  ){
    syncActionControls();
    return;
  }

  mainActionBtn.disabled = true;
  specialStartBtn.disabled = true;
  setMachineSpecialStatus("MÁQUINA...");

  machineSpecialTurnTimeout = setTimeout(() => {
    if(
      gameState.gameMode !== "machine" ||
      gameState.currentPlayerIndex !== 1 ||
      gameState.matchEnded ||
      !pendingSpecial ||
      penaltyShootout ||
      !gameScreen.classList.contains("active")
    ){
      syncActionControls();
      return;
    }

    setMachineSpecialStatus("DISPARO");
    playSound(pendingSpecial === "penalty" ? "penalty" : "free_kick");
    triggerScreenFeedback(pendingSpecial);

    machineSpecialStopTimeout = setTimeout(() => {
      if(
        gameState.gameMode !== "machine" ||
        gameState.currentPlayerIndex !== 1 ||
        gameState.matchEnded ||
        !pendingSpecial ||
        penaltyShootout ||
        !gameScreen.classList.contains("active")
      ){
        syncActionControls();
        return;
      }

      const specialType = pendingSpecial;
      const value = getMachineSpecialForcedValue(specialType);

      currentElapsedMs = value * 10;
      lastTwoDisplay.textContent = pad(value);

      evaluateSpecialThrow(value);

      setMachineSpecialStatus("TIRADA ESPECIAL");
      updateUI();
      syncActionControls();

      if(
        !gameState.matchEnded &&
        !pendingSpecial &&
        gameState.gameMode === "machine" &&
        gameState.currentPlayerIndex === 1 &&
        !penaltyShootout &&
        gameScreen.classList.contains("active")
      ){
        maybeMachineTurn();
      }
    }, getMachineSpecialStopDelay());
  }, randomInt(500,1000));
}


function syncActionControls(){
  const gameActive =
    gameScreen &&
    gameScreen.classList &&
    gameScreen.classList.contains("active");

  const machineTurn =
    gameState.gameMode === "machine" &&
    gameState.currentPlayerIndex === 1 &&
    !gameState.matchEnded &&
    gameActive;

  const shouldDisableMain =
    gameState.matchEnded ||
    Boolean(pendingSpecial) ||
    Boolean(penaltyShootout) ||
    machineTurn ||
    !gameActive;

  const shouldDisableSpecial =
    gameState.matchEnded ||
    !Boolean(pendingSpecial) ||
    machineTurn ||
    !gameActive;

  mainActionBtn.disabled = shouldDisableMain;
  specialStartBtn.disabled = shouldDisableSpecial;
}

function maybeMachineTurn(){
  clearTimeout(machineTurnTimeout);
  clearTimeout(machineStopTimeout);

  if(
    gameState.gameMode !== "machine" ||
    gameState.currentPlayerIndex !== 1 ||
    gameState.matchEnded ||
    pendingSpecial ||
    penaltyShootout ||
    !gameScreen.classList.contains("active")
  ){
    syncActionControls();
    return;
  }

  mainActionBtn.disabled = true;
  specialStartBtn.disabled = true;

  machineTurnTimeout = setTimeout(() => {
    if(
      gameState.gameMode !== "machine" ||
      gameState.currentPlayerIndex !== 1 ||
      gameState.matchEnded ||
      pendingSpecial ||
      penaltyShootout ||
      !gameScreen.classList.contains("active")
    ){
      syncActionControls();
      return;
    }

    startTimer();

    machineStopTimeout = setTimeout(() => {
      if(
        gameState.gameMode !== "machine" ||
        gameState.currentPlayerIndex !== 1 ||
        gameState.matchEnded ||
        pendingSpecial ||
        penaltyShootout ||
        !gameScreen.classList.contains("active")
      ){
        if(gameState.isRunning) stopTimer();
        syncActionControls();
        return;
      }

      stopTimerAndEvaluate(getMachineForcedValue());

      updateUI();
      syncActionControls();

      if(
        !gameState.matchEnded &&
        pendingSpecial &&
        gameState.gameMode === "machine" &&
        gameState.currentPlayerIndex === 1 &&
        !penaltyShootout &&
        gameScreen.classList.contains("active")
      ){
        maybeMachineSpecialTurn();
      }
    }, getMachineStopDelay());
  }, randomInt(500,1100));
}
function getMachineStopDelay(){ return gameState.machineLevel==="easy"?randomInt(600,1800):gameState.machineLevel==="hard"?randomInt(900,3200):randomInt(800,2500); }
function getMachineForcedValue(){ if(isFastMode()) return null; if(gameState.forceEvents){ if(gameState.half===1&&gameState.firstHalfTurns>=gameState.machineForceHalfAt) return 45; if(gameState.half===2&&gameState.secondHalfTurns>=gameState.machineForceEndAt) return 90; } if(gameState.machineLevel==="hard"){ const r=Math.random(); if(r<.025)return 0; if(r<.055)return [96,97,98,99][randomInt(0,3)]; } return null; }
function startMatchClock(){ clearInterval(matchClockInterval); matchClockInterval=setInterval(()=>{ const sec=Math.floor((Date.now()-matchStartTime)/1000); matchClockLabel.textContent=`${pad(Math.floor(sec/60))}:${pad(sec%60)}`; /* En modo rápido v1.6.1 no hay límite de 5 minutos: gana quien llega a 6 con 2 de ventaja. */ },1000); }
function updateUI(){ p1Label.textContent=gameState.players[0].name.toUpperCase(); p2Label.textContent=gameState.players[1].name.toUpperCase(); p1Score.textContent=gameState.players[0].goals; p2Score.textContent=gameState.players[1].goals; p1Sanction.textContent=gameState.players[0].skipTurns?`Sanción: ${gameState.players[0].skipTurns}`:""; p2Sanction.textContent=gameState.players[1].skipTurns?`Sanción: ${gameState.players[1].skipTurns}`:""; halfLabel.textContent=isFastMode()?"MODO RÁPIDO":(gameState.half===1?"1ª PARTE":"2ª PARTE"); turnLabel.textContent=currentPlayer().name; team0.classList.toggle("active",gameState.currentPlayerIndex===0); team1.classList.toggle("active",gameState.currentPlayerIndex===1); statTurns.textContent=gameState.totalTurns; statGoals.textContent=gameState.stats.goals; statWoodwork.textContent=gameState.stats.woodwork; statCards.textContent=gameState.stats.cards; statSpecials.textContent=gameState.stats.specials; updateShootoutUI(); renderLog(); }
function updateShootoutUI(){ if(!penaltyShootout){shootoutPanel.classList.add("hidden");return;} shootoutPanel.classList.remove("hidden"); shootoutP1Name.textContent=gameState.players[0].name; shootoutP2Name.textContent=gameState.players[1].name; shootoutP1.textContent=icons(penaltyShootout.shots[0]); shootoutP2.textContent=icons(penaltyShootout.shots[1]); }
function icons(shots){ const i=shots.map(s=>s?"✅":"❌"); while(i.length<5)i.push("⬜"); return i.join(" "); }
function setEvent(title,msg,cls){ eventTitle.textContent=title; messageLabel.textContent=msg; eventCard.className=`event-card event-${cls}`; }
function addLog(t){ gameState.log.unshift(t); if(gameState.log.length>50) gameState.log.pop(); renderLog(); }
function renderLog(){ gameLog.innerHTML=""; gameState.log.forEach(x=>{ const li=document.createElement("li"); li.textContent=x; gameLog.appendChild(li); }); }
function confirmReset(){ showModal("Reiniciar partido","¿Seguro que quieres reiniciar?", "", [{text:"SÍ, REINICIAR",action:resetToSetup},{text:"CANCELAR",action:closeModal}]); }
function resetToSetup(){ clearInterval(timerInterval); clearInterval(matchClockInterval); currentElapsedMs=0; stopwatchBaseMs=0; setupScreen.classList.add("active"); gameScreen.classList.remove("active"); closeModal(); sideMenu.classList.add("hidden"); }
function showModal(t,txt,html,actions){ modalTitle.textContent=t; modalText.textContent=txt; modalExtra.innerHTML=html||""; modalActions.innerHTML=""; actions.forEach(a=>{ const b=document.createElement("button"); b.textContent=a.text; b.onclick=a.action; modalActions.appendChild(b); }); modalScreen.classList.remove("hidden"); }
function closeModal(){ modalScreen.classList.add("hidden"); modalExtra.innerHTML=""; }
function showRulesModal(){
  if(currentLang === "en"){
    showModal(
      "RULES",
      "The game uses the last two digits of the stopwatch.",
      `<div class="donation-item">
        <strong>Classic mode</strong><br>
        <strong>00</strong> = Goal.<br>
        <strong>01-02</strong> = Post. Same player repeats.<br>
        <strong>03-04</strong> = Crossbar. Same player repeats.<br>
        <strong>45</strong> = Half-time. Stopwatch resets and turn changes.<br>
        <strong>50</strong> = Yellow card. Turn ends and player skips the next turn.<br>
        <strong>60</strong> = Red card. Turn ends and player skips two turns.<br>
        <strong>90</strong> = Full-time.<br>
        <strong>96-97</strong> = Dangerous free kick. Special throw: <strong>00 to 20</strong> is a goal; <strong>21 to 99</strong> is a miss.<br>
        <strong>98-99</strong> = Penalty. Special throw: <strong>even = goal</strong>; <strong>odd = miss</strong>.<br>
        <strong>Any other number</strong> = Miss and turn changes.
      </div>
      <div class="donation-item">
        <strong>Fast mode</strong><br>
        Any number ending in <strong>0</strong> is a goal: 00, 10, 20, 30, 40, 50, 60, 70, 80 and 90.<br>
        Any number ending in <strong>9</strong> is a penalty: 09, 19, 29, 39, 49, 59, 69, 79, 89 and 99.<br>
        Penalty special throw: <strong>even = goal</strong>, <strong>odd = miss</strong>.<br>
        First player to reach <strong>6 goals with a 2-goal lead</strong> wins. Example: 6-4 wins; 6-5 does not; you need 7-5.
      </div>`,
      [{text:"CLOSE",action:closeModal}]
    );
    return;
  }

  showModal(
    "REGLAS",
    "Se usan los dos últimos dígitos del cronómetro.",
    `<div class="donation-item">
      <strong>Modo clásico</strong><br>
      <strong>00</strong> = Gol.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>45</strong> = Descanso. Se resetea el cronómetro y cambia el turno.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>90</strong> = Final del partido.<br>
      <strong>96-97</strong> = Falta peligrosa. Hay una tirada especial: si sale de <strong>00 a 20</strong>, es gol; si sale de <strong>21 a 99</strong>, falla.<br>
      <strong>98-99</strong> = Penalti. Hay una tirada especial: si sale número <strong>par</strong>, es gol; si sale <strong>impar</strong>, falla.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.
    </div>
    <div class="donation-item">
      <strong>Modo rápido</strong><br>
      Todo número terminado en <strong>0</strong> es gol: 00, 10, 20, 30, 40, 50, 60, 70, 80 y 90.<br>
      Todo número terminado en <strong>9</strong> es penalti: 09, 19, 29, 39, 49, 59, 69, 79, 89 y 99.<br>
      En el penalti, se hace una tirada especial: <strong>par = gol</strong>, <strong>impar = fallo</strong>.<br>
      Gana el primero que llegue a <strong>6 goles con 2 de ventaja</strong>. Ejemplo: 6-4 gana; 6-5 no gana; hay que llegar a 7-5.
    </div>`,
    [{text:"CERRAR",action:closeModal}]
  );

  syncActionControls();
}
function showSupportModal(){
  const isEn = currentLang === "en";
  showModal(
    isEn ? "SUPPORT CRONOGOL" : "APOYA CRONOGOL",
    isEn
      ? "CronoGol is free and will remain free. If you enjoy it, you can buy me a coffee."
      : "CronoGol es gratis y lo seguirá siendo. Si te divierte, puedes invitarme a un café.",
    `<div class="support-modal">
      <div class="support-highlight">☕ ${isEn ? "Voluntary support" : "Apoyo voluntario"}</div>
      <div class="donation-data">
        <div class="donation-item">
          <strong>Bizum</strong><br>
          ${CRONOGOL_CONFIG.bizumPhone}<br>
          <small>${isEn ? "Concept" : "Concepto"}: ${CRONOGOL_CONFIG.bizumConcept}</small>
          <button class="bizum-direct-btn" onclick="openBizum()">${isEn ? "Open Bizum" : "Abrir Bizum"}</button>
        </div>
        <div class="donation-item">
          <strong>PayPal</strong><br>
          <a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank" rel="noopener">${isEn ? "Open PayPal" : "Abrir PayPal"}</a>
        </div>
      </div>
      <p class="support-note">${isEn ? "No ads during the match. No paywalls." : "Sin anuncios durante la partida. Sin pagos obligatorios."}</p>
    </div>`,
    [{text:isEn ? "CLOSE" : "CERRAR", action:closeModal}]
  );
}
function whatsappShareUrl(){ return `https://wa.me/?text=${encodeURIComponent(CRONOGOL_CONFIG.whatsappText)}`; }
async function shareCronoGol(){
  const nativeText = currentLang === "en"
    ? "I'm playing CronoGol ⚽⌚"
    : "Estoy jugando a CronoGol ⚽⌚";

  const fullText = `${nativeText}
${CRONOGOL_CONFIG.siteUrl}`;

  try{
    if(navigator.share){
      await navigator.share({
        title:"CronoGol",
        text:nativeText,
        url:CRONOGOL_CONFIG.siteUrl
      });
      return;
    }
  }catch(e){}

  window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`,"_blank","noopener");
}

function resultText(includeUrl=true){
  const final = gameState.lastFinalText || formattedFinalResult();
  const challenge = currentLang === "en" ? "Do you dare?" : "¿Te atreves?";
  const base = `⚽ CronoGol
${final}

${challenge}`;
  return includeUrl ? `${base}
${CRONOGOL_CONFIG.siteUrl}` : base;
}
async function shareResult(){
  try{
    if(navigator.share){
      await navigator.share({
        title:"Resultado CronoGol",
        text:resultText(false),
        url:CRONOGOL_CONFIG.siteUrl
      });
      return;
    }
  }catch(e){}
  window.open(`https://wa.me/?text=${encodeURIComponent(resultText(true))}`,"_blank","noopener");
}
function copyCronoGolLink(){
  copyText(CRONOGOL_CONFIG.siteUrl, currentLang === "en" ? "Link copied" : "Enlace copiado");
}

function showSupportModal(){
  const t = MODAL_TEXTS[modalLang()];
  showModal(
    t.supportTitle,
    t.supportIntro,
    `<div class="donation-data"><div class="donation-item"><strong>Bizum</strong><br>${CRONOGOL_CONFIG.bizumPhone} · ${t.concept}: ${CRONOGOL_CONFIG.bizumConcept}<button class="bizum-direct-btn" onclick="openBizum()">${t.bizumButton}</button></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${t.paypalButton}</a></div></div>`,
    [{text:t.close, action:closeModal}]
  );
}


// ===== v1.8.2 overrides: share/support language fix =====
async function shareCronoGol(){
  const nativeText = currentLang === "en" ? "I'm playing CronoGol ⚽⌚" : "Estoy jugando a CronoGol ⚽⌚";
  const fullText = `${nativeText}\n${CRONOGOL_CONFIG.siteUrl}`;

  try{
    if(navigator.share){
      await navigator.share({
        title:"CronoGol",
        text:nativeText,
        url:CRONOGOL_CONFIG.siteUrl
      });
      return;
    }
  }catch(e){}

  window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`,"_blank","noopener");
}

function copyCronoGolLink(){
  copyText(CRONOGOL_CONFIG.siteUrl, currentLang === "en" ? "Link copied" : "Enlace copiado");
}

function showSupportModal(){
  const t = MODAL_TEXTS[modalLang()];
  showModal(
    t.supportTitle,
    t.supportIntro,
    `<div class="donation-data"><div class="donation-item"><strong>Bizum</strong><br>${CRONOGOL_CONFIG.bizumPhone} · ${t.concept}: ${CRONOGOL_CONFIG.bizumConcept}<button class="bizum-direct-btn" onclick="openBizum()">${t.bizumButton}</button></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${t.paypalButton}</a></div></div>`,
    [{text:t.close, action:closeModal}]
  );
}


/* ===== v1.8.5 SAFE I18N PATCH — no toca flujo del juego ===== */

const CG_TEXT = {
  es: {
    start: "START",
    stop: "STOP",
    specialThrow: "TIRADA ESPECIAL",
    specialStop: "STOP ESPECIAL",
    goal: "⚽ GOOOL",
    goalTitle: "GOOOL",
    miss: "FALLO",
    post: "POSTE",
    crossbar: "LARGUERO",
    halfTime: "DESCANSO",
    fullTime: "FINAL",
    fullTimeTitle: "FINAL DEL PARTIDO",
    yellow: "AMARILLA",
    red: "ROJA",
    penalty: "PENALTI",
    freeKick: "FALTA",
    noEvents: "Sin jugadas todavía.",
    playerGot: "sacó",
    finalDraw: "Empate final.",
    winsBefore: "Gana",
    winsAfter: "",
    penalties: "Penaltis",
    summary: "Resumen",
    throws: "Tiradas",
    matchGoals: "Goles partido",
    woodwork: "Postes/Largueros",
    cards: "Tarjetas",
    specials: "Especiales",
    free: "☕ CronoGol es gratis",
    openBizum: "Abrir Bizum",
    rematch: "REVANCHA",
    shareResult: "COMPARTIR RESULTADO",
    copyResult: "COPIAR RESULTADO",
    newMatch: "NUEVA PARTIDA",
    confirmResetTitle: "REINICIAR",
    confirmResetText: "¿Seguro que quieres reiniciar el partido?",
    cancel: "CANCELAR",
    reset: "REINICIAR",
    resultCopied: "Resultado copiado",
    linkCopied: "Enlace copiado",
    challenge: "¿Te atreves?",
    rulesTitle: "REGLAS",
    rulesIntro: "Se usan los dos últimos dígitos del cronómetro.",
    close: "CERRAR",
    supportTitle: "APOYA CRONOGOL",
    supportIntro: "CronoGol es gratis y lo seguirá siendo.",
    concept: "Concepto",
    paypal: "PayPal",
    rulesHtml: `<div class="donation-item">
      <strong>Modo clásico</strong><br>
      <strong>00</strong> = Gol.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>45</strong> = Descanso. Se resetea el cronómetro y cambia el turno.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>90</strong> = Final del partido.<br>
      <strong>96-97</strong> = Falta peligrosa. Tirada especial: <strong>00 a 20</strong> gol; <strong>21 a 99</strong> fallo.<br>
      <strong>98-99</strong> = Penalti. Tirada especial: <strong>par = gol</strong>; <strong>impar = fallo</strong>.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.
    </div>
    <div class="donation-item">
      <strong>Modo rápido</strong><br>
      Todo número terminado en <strong>0</strong> es gol.<br>
      Todo número terminado en <strong>9</strong> es penalti.<br>
      En el penalti: <strong>par = gol</strong>, <strong>impar = fallo</strong>.<br>
      Gana el primero que llegue a <strong>6 goles con 2 de ventaja</strong>.
    </div>`
  },
  en: {
    start: "START",
    stop: "STOP",
    specialThrow: "SPECIAL THROW",
    specialStop: "SPECIAL STOP",
    goal: "⚽ GOAL",
    goalTitle: "GOAL",
    miss: "MISS",
    post: "POST",
    crossbar: "CROSSBAR",
    halfTime: "HALF-TIME",
    fullTime: "FULL-TIME",
    fullTimeTitle: "FULL-TIME",
    yellow: "YELLOW CARD",
    red: "RED CARD",
    penalty: "PENALTY",
    freeKick: "FREE KICK",
    noEvents: "No events yet.",
    playerGot: "got",
    finalDraw: "Final draw.",
    winsBefore: "",
    winsAfter: "wins",
    penalties: "Penalties",
    summary: "Summary",
    throws: "Throws",
    matchGoals: "Match goals",
    woodwork: "Posts/Crossbars",
    cards: "Cards",
    specials: "Specials",
    free: "☕ CronoGol is free",
    openBizum: "Open Bizum",
    rematch: "REMATCH",
    shareResult: "SHARE RESULT",
    copyResult: "COPY RESULT",
    newMatch: "NEW MATCH",
    confirmResetTitle: "RESTART",
    confirmResetText: "Are you sure you want to restart the match?",
    cancel: "CANCEL",
    reset: "RESTART",
    resultCopied: "Result copied",
    linkCopied: "Link copied",
    challenge: "Do you dare?",
    rulesTitle: "RULES",
    rulesIntro: "The game uses the last two digits of the stopwatch.",
    close: "CLOSE",
    supportTitle: "SUPPORT CRONOGOL",
    supportIntro: "CronoGol is free and will remain free.",
    concept: "Concept",
    paypal: "PayPal",
    rulesHtml: `<div class="donation-item">
      <strong>Classic mode</strong><br>
      <strong>00</strong> = Goal.<br>
      <strong>01-02</strong> = Post. Same player repeats.<br>
      <strong>03-04</strong> = Crossbar. Same player repeats.<br>
      <strong>45</strong> = Half-time. Stopwatch resets and turn changes.<br>
      <strong>50</strong> = Yellow card. Turn ends and the player skips the next turn.<br>
      <strong>60</strong> = Red card. Turn ends and the player skips two turns.<br>
      <strong>90</strong> = Full-time.<br>
      <strong>96-97</strong> = Dangerous free kick. Special throw: <strong>00 to 20</strong> is a goal; <strong>21 to 99</strong> is a miss.<br>
      <strong>98-99</strong> = Penalty. Special throw: <strong>even = goal</strong>; <strong>odd = miss</strong>.<br>
      <strong>Any other number</strong> = Miss and turn changes.
    </div>
    <div class="donation-item">
      <strong>Fast mode</strong><br>
      Any number ending in <strong>0</strong> is a goal.<br>
      Any number ending in <strong>9</strong> is a penalty.<br>
      Penalty special throw: <strong>even = goal</strong>, <strong>odd = miss</strong>.<br>
      The first player to reach <strong>6 goals with a 2-goal lead</strong> wins.
    </div>`
  }
};

function cgLang(){
  return (typeof currentLang !== "undefined" && currentLang === "en") ? "en" : "es";
}

function cgT(key){
  return (CG_TEXT[cgLang()] && CG_TEXT[cgLang()][key]) || CG_TEXT.es[key] || key;
}

function cgName(name){
  if(cgLang() === "en"){
    if(name === "Jugador 1") return "Player 1";
    if(name === "Jugador 2") return "Player 2";
    if(name === "Máquina") return "Machine";
  }
  return name;
}

function cgLocalizeText(text){
  let out = String(text || "");
  const replacements = [
    ["Jugador 1", cgName("Jugador 1")],
    ["Jugador 2", cgName("Jugador 2")],
    ["Máquina", cgName("Máquina")],
    ["GOOOL", cgT("goalTitle")],
    ["FALLO", cgT("miss")],
    ["POSTE", cgT("post")],
    ["LARGUERO", cgT("crossbar")],
    ["DESCANSO", cgT("halfTime")],
    ["FINAL", cgT("fullTime")],
    ["AMARILLA", cgT("yellow")],
    ["ROJA", cgT("red")],
    ["PENALTI", cgT("penalty")],
    ["FALTA", cgT("freeKick")],
    ["sacó", cgT("playerGot")]
  ];
  replacements.forEach(([a,b]) => { out = out.split(a).join(b); });
  return out;
}

function cgPatchDynamicTranslations(){
  // Wrap, don't replace core flow.
  if(typeof evaluateThrow === "function" && !evaluateThrow.__cgPatched){
    const originalEvaluateThrow = evaluateThrow;
    evaluateThrow = function(v){
      const r = originalEvaluateThrow(v);
      if(cgLang() === "en"){
        const typeMap = {
          goal: cgT("goal"),
          miss: cgT("miss"),
          woodwork: r && String(r.msg).includes("LARGUERO") ? cgT("crossbar") : cgT("post"),
          half: cgT("halfTime"),
          full: cgT("fullTime"),
          yellow: cgT("yellow"),
          red: cgT("red"),
          penalty: cgT("penalty"),
          free_kick: cgT("freeKick")
        };
        if(r && typeMap[r.type]) r.msg = typeMap[r.type];
        if(r && r.special === "penalty") r.msg = cgT("penalty");
        if(r && r.special === "free_kick") r.msg = cgT("freeKick");
      }
      return r;
    };
    evaluateThrow.__cgPatched = true;
  }

  if(typeof evaluateFastThrow === "function" && !evaluateFastThrow.__cgPatched){
    const originalEvaluateFastThrow = evaluateFastThrow;
    evaluateFastThrow = function(v){
      const r = originalEvaluateFastThrow(v);
      if(cgLang() === "en" && r){
        if(r.type === "goal") r.msg = cgT("goal");
        if(r.type === "miss") r.msg = cgT("miss");
        if(r.special === "penalty") r.msg = cgT("penalty");
      }
      return r;
    };
    evaluateFastThrow.__cgPatched = true;
  }

  if(typeof setEvent === "function" && !setEvent.__cgPatched){
    const originalSetEvent = setEvent;
    setEvent = function(title,msg,cls){
      originalSetEvent(cgLocalizeText(title), cgLocalizeText(msg), cls);
    };
    setEvent.__cgPatched = true;
  }

  if(typeof renderLog === "function" && !renderLog.__cgPatched){
    const originalRenderLog = renderLog;
    renderLog = function(){
      originalRenderLog();
      document.querySelectorAll("#game-log li").forEach((li)=>{
        li.textContent = cgLocalizeText(li.textContent);
      });
    };
    renderLog.__cgPatched = true;
  }

  if(typeof formattedFinalResult === "function" && !formattedFinalResult.__cgPatched){
    formattedFinalResult = function(){
      const p1 = gameState.players[0];
      const p2 = gameState.players[1];
      const n1 = cgName(p1.name);
      const n2 = cgName(p2.name);
      let text = `${n1} | ${p1.goals} - ${p2.goals} | ${n2}`;
      if(p1.goals > p2.goals){
        text += cgLang() === "en" ? `. ${n1} ${cgT("winsAfter")}.` : `. ${cgT("winsBefore")} ${n1}.`;
      } else if(p2.goals > p1.goals){
        text += cgLang() === "en" ? `. ${n2} ${cgT("winsAfter")}.` : `. ${cgT("winsBefore")} ${n2}.`;
      } else {
        text += `. ${cgT("finalDraw")}`;
      }
      return text;
    };
    formattedFinalResult.__cgPatched = true;
  }

  if(typeof resultText === "function" && !resultText.__cgPatched){
    resultText = function(includeUrl=true){
      const final = gameState.lastFinalText || formattedFinalResult();
      const base = `⚽ CronoGol\n${cgLocalizeText(final)}\n\n${cgT("challenge")}`;
      return includeUrl ? `${base}\n${CRONOGOL_CONFIG.siteUrl}` : base;
    };
    resultText.__cgPatched = true;
  }

  if(typeof showRulesModal === "function" && !showRulesModal.__cgPatched){
    showRulesModal = function(){
      showModal(cgT("rulesTitle"), cgT("rulesIntro"), cgT("rulesHtml"), [{text:cgT("close"), action:closeModal}]);
    };
    showRulesModal.__cgPatched = true;
  }

  if(typeof showSupportModal === "function" && !showSupportModal.__cgPatched){
    showSupportModal = function(){
      showModal(
        cgT("supportTitle"),
        cgT("supportIntro"),
        `<div class="donation-data"><div class="donation-item"><strong>Bizum</strong><br>${CRONOGOL_CONFIG.bizumPhone} · ${cgT("concept")}: ${CRONOGOL_CONFIG.bizumConcept}<button class="bizum-direct-btn" onclick="openBizum()">${cgT("openBizum")}</button></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${cgT("paypal")}</a></div></div>`,
        [{text:cgT("close"), action:closeModal}]
      );
    };
    showSupportModal.__cgPatched = true;
  }

  if(typeof confirmReset === "function" && !confirmReset.__cgPatched){
    confirmReset = function(){
      showModal(cgT("confirmResetTitle"), cgT("confirmResetText"), "", [
        {text:cgT("cancel"), action:closeModal},
        {text:cgT("reset"), action:resetToSetup}
      ]);
    };
    confirmReset.__cgPatched = true;
  }

  // Live button refresh only.
  if(mainActionBtn && !gameState.isRunning) mainActionBtn.textContent = cgT("start");
  if(specialStartBtn && !gameState.isRunning) specialStartBtn.textContent = cgT("specialThrow");
}

// Apply after original file has created all functions/listeners.
// This does not block setupSegmentedControls or startMatch.




/* ===== v1.8.6 BOOT FIX =====
   Causa del bloqueo:
   En v1.8.2+ se perdió la llamada final de inicialización:
   setupSegmentedControls(); setupLanguageSelector(); updateSetupVisibility(); loadLocal();

   Sin esa llamada:
   - los botones segmentados 1 vs Máquina / Rápido no reciben listener,
   - el selector de idioma no termina de inicializar,
   - la pantalla parece viva pero los controles principales no cambian estado.

   Este boot es defensivo: no reescribe la lógica de juego, solo asegura listeners.
*/
function bootCronoGol(){
  try {
    // Botones segmentados: usamos onclick para evitar listeners duplicados.
    document.querySelectorAll(".segment-btn").forEach((btn)=>{
      btn.onclick = () => {
        const targetId = btn.dataset.target;
        const value = btn.dataset.value;
        const select = document.getElementById(targetId);
        if(!select) return;

        select.value = value;

        document
          .querySelectorAll(`.segment-btn[data-target="${targetId}"]`)
          .forEach((item)=>item.classList.toggle("active", item.dataset.value === value));

        select.dispatchEvent(new Event("change"));
      };
    });

    // Botones principales: reasignación segura.
    if(startMatchBtn) startMatchBtn.onclick = startMatch;
    if(mainActionBtn) mainActionBtn.onclick = handleMainAction;
    if(specialStartBtn) specialStartBtn.onclick = handleSpecialButton;
    if(debugThrowBtn) debugThrowBtn.onclick = forceDebugThrow;

    if(resetBtn) resetBtn.onclick = confirmReset;
    if(menuResetBtn) menuResetBtn.onclick = () => { sideMenu.classList.add("hidden"); confirmReset(); };

    if(gameModeSelect){
      gameModeSelect.onchange = () => {
        if(gameModeSelect.value==="machine" && player2Input.value==="Jugador 2") player2Input.value="Máquina";
        if(gameModeSelect.value==="local" && player2Input.value==="Máquina") player2Input.value="Jugador 2";
        updateSetupVisibility();
      };
    }

    if(rulesBtn) rulesBtn.onclick = showRulesModal;
    if(menuRulesBtn) menuRulesBtn.onclick = () => { sideMenu.classList.add("hidden"); showRulesModal(); };

    if(supportBtn) supportBtn.onclick = showSupportModal;
    if(menuSupportBtn) menuSupportBtn.onclick = () => { sideMenu.classList.add("hidden"); showSupportModal(); };

    if(shareBtn) shareBtn.onclick = shareCronoGol;
    if(menuShareBtn) menuShareBtn.onclick = () => { sideMenu.classList.add("hidden"); shareCronoGol(); };

    if(copyLinkBtn) copyLinkBtn.onclick = copyCronoGolLink;
    if(menuCopyBtn) menuCopyBtn.onclick = () => { sideMenu.classList.add("hidden"); copyCronoGolLink(); };

    if(menuBtn) menuBtn.onclick = () => sideMenu.classList.remove("hidden");
    if(closeMenuBtn) closeMenuBtn.onclick = () => sideMenu.classList.add("hidden");

    const versionTarget = document.getElementById("version-tap-target");
    if(versionTarget){
      versionTarget.onclick = () => {
        versionTaps++;
        if(versionTaps >= 5){
          debugBox.classList.remove("hidden");
          showToast("Debug activado");
        }
      };
    }

    // Idioma
    document.querySelectorAll(".lang-btn").forEach((btn)=>{
      btn.onclick = () => applyLanguage(btn.dataset.lang);
    });

    try {
      applyLanguage(localStorage.getItem("cronogol_lang") || "es");
    } catch(e) {
      applyLanguage("es");
    }

    updateSetupVisibility();
    loadLocal();

    if(typeof cgPatchDynamicTranslations === "function") {
      cgPatchDynamicTranslations();
    }

    console.info("CronoGol boot OK v1.8.6");
  } catch(error) {
    console.error("CronoGol boot failed", error);
    alert("CronoGol no ha podido inicializarse. Revisa la consola del navegador.");
  }
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", bootCronoGol);
} else {
  bootCronoGol();
}


/* ===== CronoGol v1.9.6: support bugfix + clean share/support functions ===== */

async function openBizum(){
  const isEn = currentLang === "en";
  const conceptLabel = isEn ? "Concept" : "Concepto";
  const copiedMsg = isEn ? "Bizum details copied" : "Datos de Bizum copiados";
  const fallbackMsg = isEn
    ? "If your bank app does not open, use the copied details."
    : "Si tu banco no se abre, usa los datos copiados.";

  const text = `Bizum: ${CRONOGOL_CONFIG.bizumPhone} · ${conceptLabel}: ${CRONOGOL_CONFIG.bizumConcept}`;

  try {
    await copyText(text, copiedMsg);
  } catch(e) {
    showToast(text);
  }

  window.location.href = `bizum://send?phone=${encodeURIComponent(CRONOGOL_CONFIG.bizumPhone)}&concept=${encodeURIComponent(CRONOGOL_CONFIG.bizumConcept)}`;

  setTimeout(() => {
    showToast(fallbackMsg);
  }, 1200);
}

async function shareCronoGol(){
  const nativeText = currentLang === "en"
    ? "I'm playing CronoGol ⚽⌚"
    : "Estoy jugando a CronoGol ⚽⌚";

  const fullText = `${nativeText}\n${CRONOGOL_CONFIG.siteUrl}`;

  try{
    if(navigator.share){
      await navigator.share({
        title:"CronoGol",
        text:nativeText,
        url:CRONOGOL_CONFIG.siteUrl
      });
      return;
    }
  }catch(e){}

  window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`,"_blank","noopener");
}

function copyCronoGolLink(){
  copyText(CRONOGOL_CONFIG.siteUrl, currentLang === "en" ? "Link copied" : "Enlace copiado");
}

function showSupportModal(){
  const isEn = currentLang === "en";
  showModal(
    isEn ? "SUPPORT CRONOGOL" : "APOYA CRONOGOL",
    isEn
      ? "CronoGol is free and will remain free. If you enjoy it, you can buy me a coffee."
      : "CronoGol es gratis y lo seguirá siendo. Si te divierte, puedes invitarme a un café.",
    `<div class="support-modal">
      <div class="support-highlight">☕ ${isEn ? "Voluntary support" : "Apoyo voluntario"}</div>
      <div class="donation-data">
        <div class="donation-item">
          <strong>Bizum</strong><br>
          ${CRONOGOL_CONFIG.bizumPhone}<br>
          <small>${isEn ? "Concept" : "Concepto"}: ${CRONOGOL_CONFIG.bizumConcept}</small>
          <button class="bizum-direct-btn" onclick="openBizum()">${isEn ? "Open Bizum" : "Abrir Bizum"}</button>
        </div>
        <div class="donation-item">
          <strong>PayPal</strong><br>
          <a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank" rel="noopener">${isEn ? "Open PayPal" : "Abrir PayPal"}</a>
        </div>
      </div>
      <p class="support-note">${isEn ? "No ads during the match. No paywalls." : "Sin anuncios durante la partida. Sin pagos obligatorios."}</p>
    </div>`,
    [{text:isEn ? "CLOSE" : "CERRAR", action:closeModal}]
  );
}


/* ===== CronoGol v1.10.6: game feel improvements ===== */
/* No modifica reglas, turnos, START/STOP ni lógica base del partido. */

function machineDifficultyText(){
  const level = machineLevelSelect ? machineLevelSelect.value : "normal";
  const isEn = currentLang === "en";

  const texts = {
    es: {
      easy: "Fácil: máquina torpe, ideal para aprender.",
      normal: "Normal: partida equilibrada.",
      hard: "Difícil: más precisión y más peligro en jugadas especiales."
    },
    en: {
      easy: "Easy: clumsy machine, ideal for learning.",
      normal: "Normal: balanced match.",
      hard: "Hard: more precision and more danger in special plays."
    }
  };

  return (isEn ? texts.en : texts.es)[level] || (isEn ? texts.en.normal : texts.es.normal);
}

function updateMachineDifficultyHint(){
  const hint = document.getElementById("machine-difficulty-hint");
  if(!hint) return;
  hint.textContent = machineDifficultyText();
}

function getFinalEmotion(pens=false){
  const p1 = gameState.players[0];
  const p2 = gameState.players[1];
  const goals1 = p1.goals;
  const goals2 = p2.goals;
  const totalGoals = goals1 + goals2;
  const diff = Math.abs(goals1 - goals2);
  const isEn = currentLang === "en";

  if(pens){
    return isEn
      ? "Total drama from the penalty spot."
      : "Drama total desde los once metros.";
  }

  if(totalGoals === 0){
    return isEn
      ? "Goalkeepers' match."
      : "Partido de porteros.";
  }

  if(diff === 1){
    return isEn
      ? "Extremely tight match."
      : "Partido ajustadísimo.";
  }

  if(totalGoals >= 7){
    return isEn
      ? "Attacking festival."
      : "Festival ofensivo.";
  }

  if(diff >= 4){
    return isEn
      ? "Commanding victory."
      : "Victoria contundente.";
  }

  if(gameState.gameMode === "machine" && goals2 > goals1){
    return isEn
      ? "The machine shows no mercy."
      : "La máquina no perdona.";
  }

  if(gameState.gameMode === "machine" && goals1 > goals2 && machineLevelSelect && machineLevelSelect.value === "hard"){
    return isEn
      ? "Big statement against the hard machine."
      : "Golpe sobre la mesa contra la máquina difícil.";
  }

  return isEn
    ? "Decided by stopwatch precision."
    : "Decidido por precisión de cronómetro.";
}

function resultText(includeUrl=true){
  const final = gameState.lastFinalText || formattedFinalResult();
  const emotion = getFinalEmotion(Boolean(penaltyShootout));
  const challenge = currentLang === "en" ? "Do you dare?" : "¿Te atreves?";
  const base = `⚽ CronoGol\n${final}\n\n${emotion}\n${challenge}`;
  return includeUrl ? `${base}\n${CRONOGOL_CONFIG.siteUrl}` : base;
}

function finalHtml(pens=false){
  const penaltyLine = (pens && penaltyShootout) ? `<br>Penaltis: ${penaltyShootout.goals[0]} - ${penaltyShootout.goals[1]}` : "";
  const isEn = currentLang === "en";
  const emotion = getFinalEmotion(pens);

  return `<div class="final-emotion-box">${emotion}</div>
  <div class="donation-item">
    <strong>${isEn ? "Match summary" : "Resumen"}</strong><br>
    ${isEn ? "Throws" : "Tiradas"}: ${gameState.totalTurns}<br>
    ${isEn ? "Goals" : "Goles"}: ${gameState.stats.goals}<br>
    ${isEn ? "Posts/Crossbars" : "Postes/Largueros"}: ${gameState.stats.woodwork}<br>
    ${isEn ? "Cards" : "Tarjetas"}: ${gameState.stats.cards}<br>
    ${isEn ? "Specials" : "Especiales"}: ${gameState.stats.specials}${penaltyLine}
  </div>
  <div class="donation-item final-support-box">
    <strong>☕ ${isEn ? "CronoGol is free" : "CronoGol es gratis"}</strong><br>
    ${isEn ? "If this match made you smile, you can buy me a coffee." : "Si esta partida te ha divertido, puedes invitarme a un café."}
    <button class="bizum-direct-btn" onclick="openBizum()">${isEn ? "Open Bizum" : "Abrir Bizum"}</button>
    <a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank" rel="noopener">${isEn ? "Open PayPal" : "Abrir PayPal"}</a>
  </div>`;
}

/* Conecta la descripción de dificultad sin alterar el comportamiento de la máquina */
document.addEventListener("DOMContentLoaded", () => {
  updateMachineDifficultyHint();

  if(machineLevelSelect){
    machineLevelSelect.addEventListener("change", updateMachineDifficultyHint);
  }

  const esBtn = document.querySelector('[data-lang="es"]');
  const enBtn = document.querySelector('[data-lang="en"]');

  if(esBtn) esBtn.addEventListener("click", () => setTimeout(updateMachineDifficultyHint, 0));
  if(enBtn) enBtn.addEventListener("click", () => setTimeout(updateMachineDifficultyHint, 0));
});
