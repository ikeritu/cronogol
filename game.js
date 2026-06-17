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
  kofiUrl: "https://ko-fi.com/ikeritu",
  contactEmail: "ikeritu@hotmail.com"
};


const I18N = {
  es: {
    labelMode:"Rival",
    labelDuration:"Reglas",
    labelDifficulty:"Dificultad",
    machineDifficultyHint:"Normal: partida equilibrada.",
    advancedOptions:"Opciones avanzadas",
    labelPlayer1:"Jugador 1",
    labelPlayer2:"Jugador 2 / Máquina",
    modeLocal:"1 vs 1 local",
    modeOnline:"1 vs 1 online",
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
    labelMode:"Opponent",
    labelDuration:"Rules",
    labelDifficulty:"Difficulty",
    machineDifficultyHint:"Normal: balanced match.",
    advancedOptions:"Advanced options",
    labelPlayer1:"Player 1",
    labelPlayer2:"Player 2 / Machine",
    modeLocal:"1 vs 1 local",
    modeOnline:"1 vs 1 online",
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
      <strong>Números acabados en 0</strong> = Gol, excepto <strong>50</strong> y <strong>60</strong>: 00, 10, 20, 30, 40, 70, 80 y 90.<br>
      <strong>Números acabados en 9</strong> = Penalti: 09, 19, 29, 39, 49, 59, 69, 79, 89 y 99. Tirada especial: <strong>par = gol</strong>; <strong>impar = fallo</strong>.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>96-97</strong> = Falta peligrosa. Tirada especial: <strong>00 a 20</strong> gol; <strong>21 a 99</strong> fallo.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.<br>
      Gana el primero que llegue a <strong>6 goles con 2 de ventaja</strong>. Ejemplo: 6-4 gana; 6-5 no gana; hay que llegar a 7-5.
    </div>`,
    close: "CERRAR",
    supportTitle: "APOYA CRONOGOL",
    supportIntro: "CronoGol es gratis y lo seguirá siendo.",
    kofiButton: "Abrir Ko-fi",
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
      Any number ending in <strong>0</strong> is a goal, except <strong>50</strong> and <strong>60</strong>: 00, 10, 20, 30, 40, 70, 80 and 90.<br>
      Any number ending in <strong>9</strong> is a penalty: 09, 19, 29, 39, 49, 59, 69, 79, 89 and 99.<br>
      Penalty special throw: <strong>even = goal</strong>, <strong>odd = miss</strong>.<br>
      <strong>01-02</strong> = Post. Same player repeats.<br>
      <strong>03-04</strong> = Crossbar. Same player repeats.<br>
      <strong>50</strong> = Yellow card. Turn ends and the player skips the next turn.<br>
      <strong>60</strong> = Red card. Turn ends and the player skips two turns.<br>
      <strong>96-97</strong> = Dangerous free kick. Special throw: <strong>00 to 20</strong> is a goal; <strong>21 to 99</strong> is a miss.<br>
      The first player to reach <strong>6 goals with a 2-goal lead</strong> wins. Example: 6-4 wins; 6-5 does not; you need 7-5.
    </div>`,
    close: "CLOSE",
    supportTitle: "SUPPORT CRONOGOL",
    supportIntro: "CronoGol is free and will remain free.",
    kofiButton: "Open Ko-fi",
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



function physicalVibration(event){
  // v1.11.0 — Strict Physical Vibration Gate
  // ÚNICO punto permitido para activar vibración física.
  // Norma:
  // - Gol: vibración fuerte
  // - Penalti fallado: vibración leve
  // - Todo lo demás: sin vibración física
  try{
    if(!navigator.vibrate) return;

    if(event === "goal"){
      navigator.vibrate([130, 45, 170]);
      return;
    }

    if(event === "penalty_fail"){
      navigator.vibrate([35]);
      return;
    }
  }catch(e){}
}

function applyPhysicalVibration(context){
  if(!context || !context.result) return;

  if(context.result === "goal"){
    physicalVibration("goal");
    return;
  }

  if(context.result === "penalty_fail"){
    physicalVibration("penalty_fail");
    return;
  }

  // Todos los demás eventos quedan explícitamente sin vibración.
}

function playSound(type){
  try{
    if(!gameState.soundEnabled || !soundEnabledInput.checked) return;
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if(audioCtx && audioCtx.state === "suspended") resumeCronoGolAudio();

    const patterns = {
      beep: [
        {f:880,d:0.040,v:0.026,w:"square"}
      ],
      stop: [
        {f:390,d:0.060,v:0.030,w:"square"}
      ],

      // Celebración corta tipo arcade, sin ser molesta.
      goal: [
        {f:523.25,d:0.065,v:0.045,w:"triangle"},
        {f:659.25,d:0.070,v:0.050,w:"triangle"},
        {f:783.99,d:0.080,v:0.052,w:"triangle"},
        {f:1046.50,d:0.140,v:0.058,w:"square"}
      ],

      // Aviso de tensión.
      penalty: [
        {f:392.00,d:0.075,v:0.044,w:"square"},
        {f:0,d:0.045,v:0,w:"square"},
        {f:587.33,d:0.095,v:0.050,w:"square"},
        {f:0,d:0.035,v:0,w:"square"},
        {f:783.99,d:0.120,v:0.052,w:"triangle"}
      ],

      penalty_fail: [
        {f:220.00,d:0.120,v:0.050,w:"sawtooth"},
        {f:164.81,d:0.170,v:0.040,w:"sawtooth"}
      ],

      // Sonido tipo silbato corto.
      free_kick: [
        {f:1108.73,d:0.080,v:0.040,w:"sine"},
        {f:1318.51,d:0.110,v:0.045,w:"sine"}
      ],

      post: [
        {f:740.00,d:0.045,v:0.045,w:"square"},
        {f:310.00,d:0.110,v:0.035,w:"sawtooth"}
      ],
      crossbar: [
        {f:860.00,d:0.050,v:0.045,w:"square"},
        {f:350.00,d:0.125,v:0.036,w:"sawtooth"}
      ],

      yellow: [
        {f:560.00,d:0.090,v:0.044,w:"square"},
        {f:560.00,d:0.060,v:0.032,w:"square"}
      ],
      red: [
        {f:210.00,d:0.170,v:0.055,w:"sawtooth"},
        {f:150.00,d:0.130,v:0.045,w:"sawtooth"}
      ],
      miss: [
        {f:260.00,d:0.070,v:0.030,w:"triangle"}
      ],
      half_time: [
        {f:440.00,d:0.080,v:0.038,w:"square"},
        {f:0,d:0.050,v:0,w:"square"},
        {f:440.00,d:0.080,v:0.038,w:"square"}
      ],
      full_time: [
        {f:360.00,d:0.080,v:0.040,w:"square"},
        {f:520.00,d:0.080,v:0.044,w:"square"},
        {f:360.00,d:0.150,v:0.040,w:"square"}
      ]
    };

    const sequence = patterns[type] || patterns.beep;
    let offset = 0;

    sequence.forEach((step)=>{
      const duration = step.d || 0.05;
      if(!step.f || step.v === 0){
        offset += duration;
        return;
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = step.w || "square";
      osc.frequency.setValueAtTime(step.f, audioCtx.currentTime + offset);

      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(step.v || 0.035, audioCtx.currentTime + offset + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + offset + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + offset);
      osc.stop(audioCtx.currentTime + offset + duration + 0.025);

      offset += duration + 0.028;
    });
  }catch(e){}
}

function triggerScreenFeedback(type){
  try{
    const map = {
      goal: "cg-flash-goal",
      penalty_fail: "cg-shake-soft"
    };
    const cls = map[type];
    if(!cls) return;
    const classes = ["cg-flash-goal","cg-flash-penalty","cg-flash-special","cg-shake-soft","cg-flash-yellow","cg-flash-red"];
    document.body.classList.remove(...classes);
    void document.body.offsetWidth;
    document.body.classList.add(cls);
    window.setTimeout(()=>document.body.classList.remove(cls), type === "goal" ? 760 : 520);
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
  else text+='. Igualado antes de penaltis.';
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
  if(gameModeSelect.value==="machine" && (player2Input.value==="Jugador 2" || player2Input.value==="Rival")) player2Input.value="Máquina";
  if(gameModeSelect.value==="online" && (player2Input.value==="Jugador 2" || player2Input.value==="Máquina")) player2Input.value="Rival";
  if(gameModeSelect.value==="local" && (player2Input.value==="Máquina" || player2Input.value==="Rival")) player2Input.value="Jugador 2";
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
  clearMachineTurnTimers();
  clearMachineSpecialTimers();
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
    mainActionBtn.textContent = safeCgText("start", "START");
    mainActionBtn.classList.remove("stop");
  }

  if(specialStartBtn){
    specialStartBtn.disabled = false;
    specialStartBtn.textContent = safeCgText("specialThrow", "TIRADA ESPECIAL");
  }

  if(specialPanel) specialPanel.classList.add("hidden");
  if(shootoutPanel) shootoutPanel.classList.add("hidden");
}




/* ===== v1.11.0 TECHNICAL FOUNDATION HELPERS ===== */
/* Preparación conservadora para V2 online:
   - guardas idempotentes;
   - limpieza centralizada de timers críticos;
   - unlock robusto de AudioContext;
   - restauración segura de textos de controles.
   No cambia reglas ni mecánica de juego. */

function safeCgText(key, fallback){
  try{
    if(typeof cgT === "function"){
      const value = cgT(key);
      if(value && value !== key) return value;
    }
  }catch(e){}
  return fallback;
}

function clearMachineTurnTimers(){
  try{ clearTimeout(machineTurnTimeout); }catch(e){}
  try{ clearTimeout(machineStopTimeout); }catch(e){}
  machineTurnTimeout = null;
  machineStopTimeout = null;
}

function clearMachineSpecialTimers(){
  try{ clearTimeout(machineSpecialTurnTimeout); }catch(e){}
  try{ clearTimeout(machineSpecialStopTimeout); }catch(e){}
  machineSpecialTurnTimeout = null;
  machineSpecialStopTimeout = null;
}

function clearGameplayTimers(){
  try{ clearInterval(timerInterval); }catch(e){}
  try{ clearInterval(matchClockInterval); }catch(e){}
  clearMachineTurnTimers();
  clearMachineSpecialTimers();
  timerInterval = null;
  matchClockInterval = null;
}

function restoreSpecialButtonLabel(){
  try{
    if(!specialStartBtn) return;
    if(!pendingSpecial && !penaltyShootout){
      specialStartBtn.textContent = safeCgText("specialThrow", "TIRADA ESPECIAL");
    }
  }catch(e){}
}

async function resumeCronoGolAudio(){
  try{
    if(!audioCtx && window.AudioContext){
      audioCtx = new window.AudioContext();
    } else if(!audioCtx && window.webkitAudioContext){
      audioCtx = new window.webkitAudioContext();
    }
    if(audioCtx && audioCtx.state === "suspended"){
      await audioCtx.resume();
    }
  }catch(e){}
}

function bindAudioUnlockOnce(){
  try{
    const unlock = () => resumeCronoGolAudio();
    ["pointerdown","touchstart","click","keydown"].forEach((eventName)=>{
      document.addEventListener(eventName, unlock, {once:true, passive:true});
    });
  }catch(e){}
}


function updateSetupVisibility(){
  const mode = gameModeSelect ? gameModeSelect.value : "local";
  if(machineLevelLabel) machineLevelLabel.classList.toggle("is-hidden", mode !== "machine");
  document.body.classList.toggle("online-mode-active", mode === "online");
  document.body.classList.toggle("machine-mode-active", mode === "machine");
}
function loadLocal(){ try{ player1Input.value = localStorage.getItem("cronogol_player1") || player1Input.value; player2Input.value = localStorage.getItem("cronogol_player2") || player2Input.value; if(localMatchesCount) localMatchesCount.textContent = localStorage.getItem("cronogol_matches_played") || "0"; }catch(e){} }
function saveLocal(p1,p2){ try{ localStorage.setItem("cronogol_player1",p1); localStorage.setItem("cronogol_player2",p2); }catch(e){} }
function incrementMatches(){ try{ const n=Number(localStorage.getItem("cronogol_matches_played")||"0")+1; localStorage.setItem("cronogol_matches_played",String(n)); if(localMatchesCount) localMatchesCount.textContent=n; }catch(e){} }

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
  // v1.11.0: vibración física directa eliminada; usar
}

function handleMainAction(){ if(gameState.matchEnded||pendingSpecial) return; gameState.isRunning ? stopTimerAndEvaluate() : startTimer(); }
function startTimer(){
  gameState.isRunning=true; timerStartTime=performance.now(); mainActionBtn.textContent="STOP"; mainActionBtn.classList.add("stop"); playSound("beep");
timerInterval=setInterval(()=>{ currentElapsedMs=stopwatchBaseMs+(performance.now()-timerStartTime); updateTimerDisplay(currentElapsedMs); },16);
}
function stopTimerAndEvaluate(forcedValue=null){
  stopTimer(); const value = forcedValue ?? getLastTwoDigits(currentElapsedMs); lastTwoDisplay.textContent=pad(value);
  if(penaltyShootout){ evaluateShootoutPenalty(value); return; }
  gameState.totalTurns++; if(gameState.half===1) gameState.firstHalfTurns++; else gameState.secondHalfTurns++;
  applyNormalResult(value,evaluateThrow(value));
}
function stopTimer(){ gameState.isRunning=false; clearInterval(timerInterval); timerInterval=null; stopwatchBaseMs=currentElapsedMs; mainActionBtn.textContent="START"; mainActionBtn.classList.remove("stop"); playSound("stop");
}
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
  // Modo rápido v1.12.3:
  // - Números acabados en 0 = gol, excepto 50 y 60.
  // - Números acabados en 9 = penalti.
  // - 01-02 = poste, repite el mismo jugador.
  // - 03-04 = larguero, repite el mismo jugador.
  // - 50 = amarilla, termina turno y pierde el siguiente.
  // - 60 = roja, termina turno y pierde dos turnos.
  // - 96-97 = falta peligrosa con tirada especial: 00-20 gol, 21-99 falla.
  if (v === 1 || v === 2) return {type:"post",msg:"POSTE",cls:"special",repeat:true};
  if (v === 3 || v === 4) return {type:"crossbar",msg:"LARGUERO",cls:"special",repeat:true};
  if (v === 50) return {type:"yellow",msg:"🟨 AMARILLA",cls:"yellow"};
  if (v === 60) return {type:"red",msg:"🟥 ROJA",cls:"red"};
  if (v === 96 || v === 97) return {type:"free_kick",msg:"FALTA PELIGROSA",cls:"special",special:"free_kick"};
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
  const p = currentPlayer();
  setEvent(r.msg, `${p.name} sacó ${pad(v)} → ${r.msg}`, r.cls);
  addLog(`${clockSec()}  ${p.name} — ${pad(v)} — ${r.msg}`);
  playSound(r.type);
  triggerScreenFeedback(r.type);

  if(r.type === "goal"){
    p.goals++;
    gameState.stats.goals++;
    applyPhysicalVibration({ result: "goal" });

    if(isFastMode() && hasFastModeWinner()){
      endMatch();
    } else {
      switchTurn();
    }
  }
  else if(r.type === "post" || r.type === "crossbar"){
    gameState.stats.woodwork++;
    messageLabel.textContent += ". Repite.";
  }
  else if(r.type === "half_time"){
    if(gameState.half === 1) showHalfTime();
    else switchTurn();
  }
  else if(r.type === "yellow"){
    p.skipTurns++;
    gameState.stats.cards++;
    switchTurn();
  }
  else if(r.type === "red"){
    p.skipTurns += 2;
    gameState.stats.cards++;
    switchTurn();
  }
  else if(r.type === "full_time"){
    endMatch();
  }
  else if(r.special){
    gameState.stats.specials++;
    if(r.special === "free_kick") gameState.stats.freeKicks++;
    if(r.special === "penalty") gameState.stats.penalties++;

    pendingSpecial = r.special;
    specialPanel.classList.remove("hidden");
    specialStartBtn.textContent = safeCgText("specialThrow", "TIRADA ESPECIAL");
    specialLabel.textContent =
      r.special === "free_kick"
        ? `${p.name}: 00-20 es gol.`
        : `${p.name}: par es gol.`;

    mainActionBtn.disabled = true;
    specialStartBtn.disabled = true;

    updateUI();
    syncActionControls();

    if(
      gameState.gameMode === "machine" &&
      gameState.currentPlayerIndex === 1 &&
      !gameState.matchEnded
    ){
      resolveMachineSpecialDirectly();
    }
    return;
  }
  else {
    gameState.stats.misses++;
    switchTurn();
  }

  updateUI();
  syncActionControls();

  if(!gameState.matchEnded && !pendingSpecial && !penaltyShootout){
    maybeMachineTurn();
  }
}
function handleSpecialButton(){ if(!pendingSpecial) return; if(gameState.gameMode==="machine" && gameState.currentPlayerIndex===1) return; if(!gameState.isRunning){ startTimer(); specialStartBtn.textContent=safeCgText("specialStop", "STOP ESPECIAL"); } else { stopTimer(); evaluateSpecialThrow(getLastTwoDigits(currentElapsedMs)); } }
function evaluateSpecialThrow(v){
  const p = currentPlayer();
  const specialType = pendingSpecial;
  let goal = false;
  let msg = "";

  if(specialType === "free_kick"){
    goal = v >= 0 && v <= 20;
    msg = goal ? "GOL DE FALTA" : "FALTA FALLADA";
  }

  if(specialType === "penalty"){
    goal = v % 2 === 0;
    msg = goal ? "GOL DE PENALTI" : "PENALTI FALLADO";
  }

  if(goal){
    p.goals++;
    gameState.stats.goals++;
  } else {
    gameState.stats.misses++;
  }

  setEvent(msg, `${pad(v)} → ${msg}`, goal ? "goal" : "neutral");
  addLog(`${clockSec()}  ${p.name} — ${pad(v)} — ${msg}`);
  playSound(goal ? "goal" : (specialType === "penalty" ? "penalty_fail" : "miss"));
  triggerScreenFeedback(goal ? "goal" : (specialType === "penalty" ? "penalty_fail" : "free_kick_fail"));

  if(goal){
    applyPhysicalVibration({ result: "goal" });
  } else if(specialType === "penalty"){
    applyPhysicalVibration({ result: "penalty_fail" });
  }

  pendingSpecial = null;
  specialPanel.classList.add("hidden");
  specialStartBtn.textContent = safeCgText("specialThrow", "TIRADA ESPECIAL");
  resetMainTimerVisualState();

  if(isFastMode() && goal && hasFastModeWinner()){
    endMatch();
  } else {
    switchTurn();
    updateUI();
    syncActionControls();
    maybeMachineTurn();
  }

  syncActionControls();
}
function showHalfTime(){ gameState.half=2; currentElapsedMs=0; stopwatchBaseMs=0; timerDisplay.textContent="00:00:00"; lastTwoDisplay.textContent="--"; switchTurn(); showModal("DESCANSO",scoreText(),"<p>Se resetea el cronómetro y comienza la segunda parte.</p>",[{text:"CONTINUAR",action:()=>{closeModal();maybeMachineTurn();}}]); }
function endMatch(){
  if(gameState.matchEnded) return;
  gameState.matchEnded = true;
  clearMachineTurnTimers();
  clearMachineSpecialTimers();
  try{ clearInterval(matchClockInterval); }catch(e){}
  if(gameState.isRunning) stopTimer();
  restoreSpecialButtonLabel();

  if(gameState.players[0].goals === gameState.players[1].goals){
    showModal("FINAL", `${scoreText()}. Partido igualado.`, finalHtml(), [
      {text:"IR A PENALTIS", action:startPenaltyShootout}
    ]);
  } else {
    showFinal(false);
  }
}
function startPenaltyShootout(){
  closeModal();
  clearMachineTurnTimers();
  clearMachineSpecialTimers();
  gameState.matchEnded = false;
  pendingSpecial = null;
  penaltyShootout = {currentPlayerIndex:0, shots:[[],[]], goals:[0,0]};
  gameState.currentPlayerIndex = 0;
  shootoutPanel.classList.remove("hidden");
  restoreSpecialButtonLabel();
  setEvent("PENALTIS", "Par = gol, impar = fallo.", "special");
  updateUI();
  syncActionControls();
  maybeMachineTurn();
}
function evaluateShootoutPenalty(v){
  const idx = penaltyShootout.currentPlayerIndex;
  const goal = v % 2 === 0;

  penaltyShootout.shots[idx].push(goal);

  if(goal){
    gameState.players[idx].goals++;
    gameState.stats.goals++;
  } else {
    gameState.stats.misses++;
  }

  addLog(`${clockSec()}  ${gameState.players[idx].name} — ${pad(v)} — ${goal ? "Gol penalti" : "Penalti fallado"}`);
  setEvent(goal ? "GOL" : "FALLO", pad(v), goal ? "goal" : "neutral");
  playSound(goal ? "goal" : "penalty_fail");
  triggerScreenFeedback(goal ? "goal" : "penalty_fail");
  applyPhysicalVibration({ result: goal ? "goal" : "penalty_fail" });

  if(isShootoutFinished()){
    gameState.matchEnded = true;
    showFinal(true);
    updateUI();
    syncActionControls();
    return;
  }

  penaltyShootout.currentPlayerIndex = idx === 0 ? 1 : 0;
  gameState.currentPlayerIndex = penaltyShootout.currentPlayerIndex;
  updateUI();
  syncActionControls();
  maybeMachineTurn();
}
function isShootoutFinished(){ const a=penaltyShootout.shots[0],b=penaltyShootout.shots[1]; return a.length>=5&&b.length>=5&&a.length===b.length&&gameState.players[0].goals!==gameState.players[1].goals; }
function showFinal(pens){ incrementMatches(); let text=scoreText(); if(gameState.players[0].goals>gameState.players[1].goals) text+=`. Gana ${gameState.players[0].name}.`; else if(gameState.players[1].goals>gameState.players[0].goals) text+=`. Gana ${gameState.players[1].name}.`; else text+=". Igualado antes de penaltis."; if(pens) text+=" Resuelto en penaltis."; gameState.lastFinalText=formattedFinalResult(); showModal("FINAL DEL PARTIDO",text,finalHtml(),[{text:"REVANCHA",action:restartSameMatch},{text:"COMPARTIR RESULTADO",action:shareResult},{text:"COPIAR RESULTADO",action:copyResult},{text:"NUEVA PARTIDA",action:resetToSetup}]); }
function finalHtml(){ return `<div class="donation-item"><strong>Resumen</strong><br>Tiradas: ${gameState.totalTurns}<br>Goles: ${gameState.stats.goals}<br>Postes/Largueros: ${gameState.stats.woodwork}<br>Tarjetas: ${gameState.stats.cards}<br>Especiales: ${gameState.stats.specials}</div><div class="donation-item"><strong>☕ CronoGol es gratis</strong><br><button class="kofi-direct-btn" onclick="openKofi()">Abrir Ko-fi</button><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">PayPal</a></div>`; }
function restartSameMatch(){ closeModal(); player1Input.value=gameState.players[0].name; player2Input.value=gameState.players[1].name; startMatch(); }
function switchTurn(){ gameState.currentPlayerIndex=gameState.currentPlayerIndex===0?1:0; processSkippedTurns(); }
function processSkippedTurns(){ let safe=0; while(currentPlayer().skipTurns>0&&safe<4){ const p=currentPlayer(); p.skipTurns--; addLog(`${clockSec()}  ${p.name} pierde turno por sanción`); gameState.currentPlayerIndex=gameState.currentPlayerIndex===0?1:0; safe++; } }

function getMachineSpecialStopDelay(){
  if(gameState.machineLevel === "easy") return randomInt(700, 1300);
  if(gameState.machineLevel === "hard") return randomInt(900, 1700);
  return randomInt(800, 1500);
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

    const pool = wantsGoal ? evens : odds;
    return pool[randomInt(0, pool.length - 1)];
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

function resetMainTimerVisualState(){
  try{
    clearInterval(timerInterval);
    timerInterval = null;
    gameState.isRunning = false;
    mainActionBtn.textContent = safeCgText("start", "START");
    mainActionBtn.classList.remove("stop");
  }catch(e){}
}

function resolveMachineSpecialDirectly(){
  clearMachineSpecialTimers();

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

  // Estado seguro: el humano no puede interactuar y la IA no depende de botones.
  resetMainTimerVisualState();
  mainActionBtn.disabled = true;
  specialStartBtn.disabled = true;
  setMachineSpecialStatus("MÁQUINA...");

  const specialTypeAtStart = pendingSpecial;

  machineSpecialTurnTimeout = setTimeout(() => {
    if(
      gameState.gameMode !== "machine" ||
      gameState.currentPlayerIndex !== 1 ||
      gameState.matchEnded ||
      pendingSpecial !== specialTypeAtStart ||
      penaltyShootout ||
      !gameScreen.classList.contains("active")
    ){
      syncActionControls();
      return;
    }

    setMachineSpecialStatus("DISPARO");
    playSound(specialTypeAtStart === "penalty" ? "penalty" : "free_kick");
    triggerScreenFeedback(specialTypeAtStart);

    machineSpecialStopTimeout = setTimeout(() => {
      if(
        gameState.gameMode !== "machine" ||
        gameState.currentPlayerIndex !== 1 ||
        gameState.matchEnded ||
        pendingSpecial !== specialTypeAtStart ||
        penaltyShootout ||
        !gameScreen.classList.contains("active")
      ){
        syncActionControls();
        return;
      }

      const value = getMachineSpecialForcedValue(specialTypeAtStart);
      currentElapsedMs = value * 10;
      stopwatchBaseMs = currentElapsedMs;
      updateTimerDisplay(currentElapsedMs);
      lastTwoDisplay.textContent = pad(value);

      evaluateSpecialThrow(value);
    }, getMachineSpecialStopDelay());
  }, randomInt(500, 950));
}

function maybeMachineSpecialTurn(){
  resolveMachineSpecialDirectly();
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

  restoreSpecialButtonLabel();
}

function maybeMachineTurn(){
  clearMachineTurnTimers();

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
      <strong>Números acabados en 0</strong> = Gol, excepto <strong>50</strong> y <strong>60</strong>: 00, 10, 20, 30, 40, 70, 80 y 90.<br>
      <strong>Números acabados en 9</strong> = Penalti: 09, 19, 29, 39, 49, 59, 69, 79, 89 y 99. Tirada especial: <strong>par = gol</strong>; <strong>impar = fallo</strong>.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>96-97</strong> = Falta peligrosa. Tirada especial: <strong>00 a 20</strong> gol; <strong>21 a 99</strong> fallo.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.<br>
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
          <strong>Ko-fi</strong><br>
          <a class="support-link kofi-link" href="${CRONOGOL_CONFIG.kofiUrl}" target="_blank" rel="noopener">${isEn ? "Open Ko-fi" : "Abrir Ko-fi"}</a>
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
    `<div class="donation-data"><div class="donation-item"><strong>Ko-fi</strong><br><a class="support-link kofi-link" href="${CRONOGOL_CONFIG.kofiUrl}" target="_blank" rel="noopener">${t.kofiButton || "Abrir Ko-fi"}</a></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${t.paypalButton}</a></div></div>`,
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
    `<div class="donation-data"><div class="donation-item"><strong>Ko-fi</strong><br><a class="support-link kofi-link" href="${CRONOGOL_CONFIG.kofiUrl}" target="_blank" rel="noopener">${t.kofiButton || "Abrir Ko-fi"}</a></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${t.paypalButton}</a></div></div>`,
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
    finalDraw: "Igualado antes de penaltis.",
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
    openKofi: "Abrir Ko-fi",
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
      <strong>Números acabados en 0</strong> = Gol, excepto <strong>50</strong> y <strong>60</strong>: 00, 10, 20, 30, 40, 70, 80 y 90.<br>
      <strong>Números acabados en 9</strong> = Penalti: 09, 19, 29, 39, 49, 59, 69, 79, 89 y 99. Tirada especial: <strong>par = gol</strong>; <strong>impar = fallo</strong>.<br>
      <strong>01-02</strong> = Poste. Repite el mismo jugador.<br>
      <strong>03-04</strong> = Larguero. Repite el mismo jugador.<br>
      <strong>50</strong> = Amarilla. Termina el turno y pierde el siguiente.<br>
      <strong>60</strong> = Roja. Termina el turno y pierde dos turnos.<br>
      <strong>96-97</strong> = Falta peligrosa. Tirada especial: <strong>00 a 20</strong> gol; <strong>21 a 99</strong> fallo.<br>
      <strong>Otros números</strong> = Fallo y cambia el turno.<br>
      Gana el primero que llegue a <strong>6 goles con 2 de ventaja</strong>. Ejemplo: 6-4 gana; 6-5 no gana; hay que llegar a 7-5.
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
    finalDraw: "Level before penalties.",
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
    openKofi: "Open Ko-fi",
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
        `<div class="donation-data"><div class="donation-item"><strong>Ko-fi</strong><br><a class="support-link kofi-link" href="${CRONOGOL_CONFIG.kofiUrl}" target="_blank" rel="noopener">${cgT("openKofi")}</a></div><div class="donation-item"><strong>PayPal</strong><br><a class="support-link" href="${CRONOGOL_CONFIG.paypalUrl}" target="_blank">${cgT("paypal")}</a></div></div>`,
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
        if(gameModeSelect.value==="machine" && (player2Input.value==="Jugador 2" || player2Input.value==="Rival")) player2Input.value="Máquina";
        if(gameModeSelect.value==="online" && (player2Input.value==="Jugador 2" || player2Input.value==="Máquina")) player2Input.value="Rival";
        if(gameModeSelect.value==="local" && (player2Input.value==="Máquina" || player2Input.value==="Rival")) player2Input.value="Jugador 2";
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

function openKofi(){
  window.open(CRONOGOL_CONFIG.kofiUrl, "_blank", "noopener");
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
          <strong>Ko-fi</strong><br>
          <a class="support-link kofi-link" href="${CRONOGOL_CONFIG.kofiUrl}" target="_blank" rel="noopener">${isEn ? "Open Ko-fi" : "Abrir Ko-fi"}</a>
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


/* ===== CronoGol v1.11.0: game feel improvements ===== */
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
    <button class="kofi-direct-btn" onclick="openKofi()">${isEn ? "Open Ko-fi" : "Abrir Ko-fi"}</button>
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


/* ===== CronoGol v1.11.0: Project Audit Fixes =====
   Jefe de proyecto: se aplican correcciones críticas de Frontend + UI/UX
   sin tocar reglas, marcador, máquina, sonidos ni vibración estable.
*/

let actionLockUntil = 0;
let resetConfirmationOpen = false;

function safePlayerName(raw, fallback){
  const value = String(raw || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const clipped = value.slice(0, 24);
  return clipped || fallback;
}

function safeDisplayName(name){
  return safePlayerName(name, "Jugador");
}

function lockActionTemporarily(ms = 150){
  actionLockUntil = performance.now() + ms;
}

function isActionLocked(){
  return performance.now() < actionLockUntil;
}

function openSideMenu(){
  if(!sideMenu) return;
  sideMenu.classList.remove("hidden");
  sideMenu.setAttribute("aria-hidden", "false");
  try{
    if(location.hash !== "#menu"){
      history.pushState({cronogolLayer:"menu"}, "", "#menu");
    }
  }catch(e){}
}

function closeSideMenu(){
  if(!sideMenu) return;
  sideMenu.classList.add("hidden");
  sideMenu.setAttribute("aria-hidden", "true");
}

function hasOpenLayer(){
  return (modalScreen && !modalScreen.classList.contains("hidden")) ||
         (sideMenu && !sideMenu.classList.contains("hidden"));
}

function closeTopLayer(){
  if(modalScreen && !modalScreen.classList.contains("hidden")){
    closeModal();
    return true;
  }
  if(sideMenu && !sideMenu.classList.contains("hidden")){
    closeSideMenu();
    return true;
  }
  return false;
}

function closeModal(){
  modalScreen.classList.add("hidden");
  modalScreen.setAttribute("aria-hidden", "true");
  modalExtra.replaceChildren();
  modalActions.replaceChildren();
  resetConfirmationOpen = false;
}

function setTrustedModalHtml(html){
  modalExtra.replaceChildren();
  if(!html) return;
  const tpl = document.createElement("template");
  tpl.innerHTML = String(html);
  modalExtra.appendChild(tpl.content.cloneNode(true));
}

function showModal(t, txt, html, actions){
  modalTitle.textContent = String(t || "");
  modalText.textContent = String(txt || "");
  setTrustedModalHtml(html || "");
  modalActions.replaceChildren();

  (actions || []).forEach((a)=>{
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = String(a.text || "");
    b.onclick = typeof a.action === "function" ? a.action : closeModal;
    modalActions.appendChild(b);
  });

  modalScreen.classList.remove("hidden");
  modalScreen.setAttribute("aria-hidden", "false");
}

function confirmReset(){
  if(resetConfirmationOpen) return;
  resetConfirmationOpen = true;

  showModal(
    currentLang === "en" ? "RESET MATCH" : "REINICIAR PARTIDO",
    currentLang === "en"
      ? "Are you sure you want to restart the current match? Current progress will be lost."
      : "¿Seguro que deseas reiniciar el partido actual? Se perderá el progreso.",
    "",
    [
      {
        text: currentLang === "en" ? "YES, RESET" : "SÍ, REINICIAR",
        action: () => {
          resetConfirmationOpen = false;
          resetToSetup();
        }
      },
      {
        text: currentLang === "en" ? "CANCEL" : "CANCELAR",
        action: closeModal
      }
    ]
  );
}

function resetToSetup(){
  resetRuntimeState();
  setupScreen.classList.add("active");
  gameScreen.classList.remove("active");
  closeModal();
  closeSideMenu();

  if(mainActionBtn){
    mainActionBtn.textContent = safeCgText("start", "START");
    mainActionBtn.classList.remove("stop");
  }
  if(specialPanel) specialPanel.classList.add("hidden");
  if(shootoutPanel) shootoutPanel.classList.add("hidden");

  syncActionControls();
}

function startMatch(){
  clearMachineTimers();

  const p1 = safePlayerName(player1Input.value, "Jugador 1");
  const p2Default = gameModeSelect.value === "machine" ? "Máquina" : "Jugador 2";
  const p2 = safePlayerName(player2Input.value, p2Default);

  player1Input.value = p1;
  player2Input.value = p2;
  saveLocal(p1, p2);

  Object.assign(gameState,{
    players:[{name:p1,goals:0,skipTurns:0},{name:p2,goals:0,skipTurns:0}],
    currentPlayerIndex:0,
    half:1,
    isRunning:false,
    gameMode:gameModeSelect.value,
    machineLevel:machineLevelSelect.value,
    matchMode:matchModeSelect.value,
    forceEvents:forceEventsInput.checked,
    soundEnabled:soundEnabledInput.checked,
    matchEnded:false,
    totalTurns:0,
    firstHalfTurns:0,
    secondHalfTurns:0,
    machineForceHalfAt:randomInt(20,30),
    machineForceEndAt:randomInt(20,30),
    log:[],
    stats:{goals:0,woodwork:0,cards:0,specials:0,penalties:0,freeKicks:0,misses:0},
    lastFinalText:""
  });

  pendingSpecial = null;
  penaltyShootout = null;
  currentElapsedMs = 0;
  stopwatchBaseMs = 0;
  matchStartTime = Date.now();

  setupScreen.classList.remove("active");
  gameScreen.classList.add("active");
  closeModal();
  closeSideMenu();

  timerDisplay.textContent = "00:00:00";
  lastTwoDisplay.textContent = "--";
  setEvent("--", currentLang === "en" ? "Press START to begin." : "Pulsa START para comenzar.", "neutral");
  addLog(currentLang === "en" ? "Match started." : "Comienza el partido.");

  startMatchClock();
  updateUI();
  syncActionControls();
  lockActionTemporarily(180);
  maybeMachineTurn();
}

function handleMainAction(){
  if(isActionLocked()) return;
  lockActionTemporarily(150);

  if(gameState.matchEnded || pendingSpecial) return;

  if(mainActionBtn){
    mainActionBtn.disabled = true;
    setTimeout(syncActionControls, 150);
  }

  if(gameState.isRunning) stopTimerAndEvaluate();
  else startTimer();
}

function handleSpecialButton(){
  if(isActionLocked()) return;
  lockActionTemporarily(150);

  if(!pendingSpecial || gameState.matchEnded) return;
  if(gameState.gameMode === "machine" && gameState.currentPlayerIndex === 1) return;

  if(gameState.isRunning){
    stopTimer();
    const v = getLastTwoDigits(currentElapsedMs);
    lastTwoDisplay.textContent = pad(v);
    evaluateSpecialThrow(v);
  } else {
    startTimer();
    specialStartBtn.textContent = currentLang === "en" ? "STOP SPECIAL" : "STOP ESPECIAL";
    setTimeout(syncActionControls, 150);
  }
}

function formattedFinalResult(){
  const p1 = gameState.players[0], p2 = gameState.players[1];
  let text = `${safeDisplayName(p1.name)} | ${p1.goals} - ${p2.goals} | ${safeDisplayName(p2.name)}`;
  if(p1.goals > p2.goals) text += `. Gana ${safeDisplayName(p1.name)}.`;
  else if(p2.goals > p1.goals) text += `. Gana ${safeDisplayName(p2.name)}.`;
  else text += ". Igualado antes de penaltis.";
  return text;
}

function showFinal(pens){
  incrementMatches();

  const p1 = gameState.players[0];
  const p2 = gameState.players[1];

  let text = `${safeDisplayName(p1.name)} ${p1.goals} - ${p2.goals} ${safeDisplayName(p2.name)}`;
  if(p1.goals > p2.goals) text += `. Gana ${safeDisplayName(p1.name)}.`;
  else if(p2.goals > p1.goals) text += `. Gana ${safeDisplayName(p2.name)}.`;
  else text += ". Igualado antes de penaltis.";
  if(pens) text += currentLang === "en" ? " Decided on penalties." : " Resuelto en penaltis.";

  gameState.lastFinalText = formattedFinalResult();

  showModal(
    currentLang === "en" ? "FULL TIME" : "FINAL DEL PARTIDO",
    text,
    finalHtml(),
    [
      {text: currentLang === "en" ? "REMATCH" : "REVANCHA", action: restartSameMatch},
      {text: currentLang === "en" ? "SHARE RESULT" : "COMPARTIR RESULTADO", action: shareResult},
      {text: currentLang === "en" ? "COPY RESULT" : "COPIAR RESULTADO", action: copyResult},
      {text: currentLang === "en" ? "NEW MATCH" : "NUEVA PARTIDA", action: resetToSetup}
    ]
  );
}

function restartSameMatch(){
  closeModal();
  player1Input.value = safeDisplayName(gameState.players[0].name);
  player2Input.value = safeDisplayName(gameState.players[1].name);
  startMatch();
}

function wireAuditSafeEvents(){
  if(startMatchBtn) startMatchBtn.onclick = startMatch;
  if(mainActionBtn) mainActionBtn.onclick = handleMainAction;
  if(specialStartBtn) specialStartBtn.onclick = handleSpecialButton;
  if(debugThrowBtn) debugThrowBtn.onclick = forceDebugThrow;

  if(resetBtn) resetBtn.onclick = confirmReset;
  if(menuResetBtn) menuResetBtn.onclick = () => {
    closeSideMenu();
    confirmReset();
  };

  if(menuBtn) menuBtn.onclick = openSideMenu;
  if(closeMenuBtn) closeMenuBtn.onclick = closeSideMenu;

  if(rulesBtn) rulesBtn.onclick = showRulesModal;
  if(menuRulesBtn) menuRulesBtn.onclick = () => {
    closeSideMenu();
    showRulesModal();
  };

  if(supportBtn) supportBtn.onclick = showSupportModal;
  if(menuSupportBtn) menuSupportBtn.onclick = () => {
    closeSideMenu();
    showSupportModal();
  };

  if(shareBtn) shareBtn.onclick = shareCronoGol;
  if(menuShareBtn) menuShareBtn.onclick = () => {
    closeSideMenu();
    shareCronoGol();
  };

  if(copyLinkBtn) copyLinkBtn.onclick = copyCronoGolLink;
  if(menuCopyBtn) menuCopyBtn.onclick = () => {
    closeSideMenu();
    copyCronoGolLink();
  };

  [player1Input, player2Input].forEach((input)=>{
    if(!input) return;
    input.setAttribute("maxlength", "24");
    input.addEventListener("blur", () => {
      input.value = safePlayerName(input.value, input.id === "player2" ? "Jugador 2" : "Jugador 1");
    });
  });
}

window.addEventListener("popstate", () => {
  closeTopLayer();
});

window.addEventListener("keydown", (event) => {
  if(event.key === "Escape") closeTopLayer();
});

wireAuditSafeEvents();
syncActionControls();



try{ bindAudioUnlockOnce(); }catch(e){}


/* ===== CronoGol v1.12.3: Fast Rules & Stats Polish =====
   Rejugabilidad local sin backend: guarda resumen, acumulados e historial
   en localStorage. No cambia reglas, eventos de juego ni Cloudflare.
*/
const CG_LOCAL_STATS_KEY = "cronogol_local_stats_v112";

function cgDefaultLocalStats(){
  return {
    matches:0,
    wins:0,
    losses:0,
    leftWins:0,
    rightWins:0,
    goalsFor:0,
    goalsAgainst:0,
    goals:0,
    throws:0,
    specials:0,
    woodwork:0,
    cards:0,
    history:[]
  };
}

function cgReadLocalStats(){
  try{
    const raw = localStorage.getItem(CG_LOCAL_STATS_KEY);
    if(!raw) return cgDefaultLocalStats();
    const parsed = JSON.parse(raw);
    return Object.assign(cgDefaultLocalStats(), parsed, {
      history:Array.isArray(parsed.history) ? parsed.history.slice(0,10) : []
    });
  }catch(e){
    return cgDefaultLocalStats();
  }
}

function cgWriteLocalStats(stats){
  try{
    stats.history = Array.isArray(stats.history) ? stats.history.slice(0,10) : [];
    localStorage.setItem(CG_LOCAL_STATS_KEY, JSON.stringify(stats));
  }catch(e){}
}

function cgMatchModeLabel(){
  if(gameState.matchMode === "five") return currentLang === "en" ? "Fast" : "Rápido";
  return currentLang === "en" ? "Classic" : "Clásico";
}

function cgWinnerLabel(p1, p2){
  if(p1.goals > p2.goals) return safeDisplayName(p1.name);
  if(p2.goals > p1.goals) return safeDisplayName(p2.name);
  return currentLang === "en" ? "Level" : "Igualado";
}

function cgSaveFinishedMatch(pens){
  if(gameState.localStatsSaved) return cgReadLocalStats();
  if(!gameState.players || gameState.players.length < 2) return cgReadLocalStats();

  const p1 = gameState.players[0];
  const p2 = gameState.players[1];
  const stats = cgReadLocalStats();

  stats.matches += 1;
  stats.goals += Number(gameState.stats && gameState.stats.goals || 0);
  stats.goalsFor += Number(p1.goals || 0);
  stats.goalsAgainst += Number(p2.goals || 0);
  stats.throws += Number(gameState.totalTurns || 0);
  stats.specials += Number(gameState.stats && gameState.stats.specials || 0);
  stats.woodwork += Number(gameState.stats && gameState.stats.woodwork || 0);
  stats.cards += Number(gameState.stats && gameState.stats.cards || 0);

  if(p1.goals > p2.goals){
    stats.wins += 1;
    stats.leftWins += 1;
  } else {
    stats.losses += 1;
    stats.rightWins += p2.goals > p1.goals ? 1 : 0;
  }

  stats.history.unshift({
    date:new Date().toISOString(),
    p1:safeDisplayName(p1.name),
    p2:safeDisplayName(p2.name),
    g1:Number(p1.goals || 0),
    g2:Number(p2.goals || 0),
    winner:cgWinnerLabel(p1, p2),
    mode:cgMatchModeLabel(),
    machine:gameState.gameMode === "machine",
    pens:Boolean(pens),
    throws:Number(gameState.totalTurns || 0),
    goals:Number(gameState.stats && gameState.stats.goals || 0),
    specials:Number(gameState.stats && gameState.stats.specials || 0)
  });

  cgWriteLocalStats(stats);
  gameState.localStatsSaved = true;
  cgRenderLocalStatsPanel();
  return stats;
}

function cgRenderLocalStatsPanel(){
  const stats = cgReadLocalStats();
  const matchesEl = $("cg-stat-matches");
  const winsEl = $("cg-stat-wins");
  const lossesEl = $("cg-stat-losses");
  const goalsForEl = $("cg-stat-goals-for");
  const goalsAgainstEl = $("cg-stat-goals-against");
  const historyEl = $("cg-stat-history-count");

  if(matchesEl) matchesEl.textContent = String(stats.matches);
  if(winsEl) winsEl.textContent = String(stats.wins || stats.leftWins || 0);
  if(lossesEl) lossesEl.textContent = String(stats.losses || stats.rightWins || 0);
  if(goalsForEl) goalsForEl.textContent = String(stats.goalsFor || 0);
  if(goalsAgainstEl) goalsAgainstEl.textContent = String(stats.goalsAgainst || 0);
  if(historyEl) historyEl.textContent = String(stats.history.length);
  if(localMatchesCount) localMatchesCount.textContent = String(stats.matches || localStorage.getItem("cronogol_matches_played") || "0");
}

function cgFormatHistoryDate(iso){
  try{
    return new Intl.DateTimeFormat(currentLang === "en" ? "en-GB" : "es-ES", {
      day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"
    }).format(new Date(iso));
  }catch(e){
    return "--";
  }
}

function cgLocalHistoryHtml(){
  const stats = cgReadLocalStats();
  if(!stats.history.length){
    return `<div class="donation-item"><strong>${currentLang === "en" ? "No matches yet" : "Aún no hay partidas"}</strong><br>${currentLang === "en" ? "Finish a match and it will appear here." : "Termina una partida y aparecerá aquí."}</div>`;
  }

  const items = stats.history.map((m)=>{
    const extra = [
      m.mode,
      m.machine ? (currentLang === "en" ? "vs Machine" : "vs Máquina") : "1 vs 1",
      m.pens ? (currentLang === "en" ? "Penalties" : "Penaltis") : null,
      `${m.throws || 0} ${currentLang === "en" ? "throws" : "tiradas"}`
    ].filter(Boolean).join(" · ");

    return `<div class="local-history-item">
      <strong>${m.p1} ${m.g1} - ${m.g2} ${m.p2}</strong>
      <small>${cgFormatHistoryDate(m.date)} · ${currentLang === "en" ? "Winner" : "Ganador"}: ${m.winner}</small>
      <small>${extra}</small>
    </div>`;
  }).join("");

  return `<div class="local-history-list">${items}</div>`;
}

function cgShowLocalHistory(){
  const stats = cgReadLocalStats();
  showModal(
    currentLang === "en" ? "LOCAL HISTORY" : "HISTORIAL LOCAL",
    currentLang === "en"
      ? `${stats.matches} matches saved on this device.`
      : `${stats.matches} partidas guardadas en este dispositivo.`,
    cgLocalHistoryHtml(),
    [{text: currentLang === "en" ? "CLOSE" : "CERRAR", action: closeModal}]
  );
}

function cgConfirmResetStats(){
  showModal(
    currentLang === "en" ? "RESET STATISTICS" : "BORRAR ESTADÍSTICAS",
    currentLang === "en"
      ? "Delete local match history from this device?"
      : "¿Borrar el historial local de este dispositivo?",
    "",
    [
      {text: currentLang === "en" ? "YES, DELETE" : "SÍ, BORRAR", action: () => {
        cgWriteLocalStats(cgDefaultLocalStats());
        try{ localStorage.setItem("cronogol_matches_played", "0"); }catch(e){}
        cgRenderLocalStatsPanel();
        closeModal();
        showToast(currentLang === "en" ? "Stats deleted" : "Stats borradas");
      }},
      {text: currentLang === "en" ? "CANCEL" : "CANCELAR", action: closeModal}
    ]
  );
}

function cgLocalStatsFinalHtml(stats){
  const total = Math.max(1, Number(stats.matches || 0));
  const avgGoals = (Number(stats.goals || 0) / total).toFixed(1);
  const avgThrows = (Number(stats.throws || 0) / total).toFixed(1);
  const isEn = currentLang === "en";

  return `<div class="donation-item final-local-stats">
    <strong>${isEn ? "On this device" : "En este dispositivo"}</strong><br>
    ${isEn ? "Matches" : "Partidas"}: ${stats.matches}<br>
    ${isEn ? "Wins" : "Victorias"}: ${stats.wins || stats.leftWins || 0}<br>
    ${isEn ? "Losses" : "Derrotas"}: ${stats.losses || stats.rightWins || 0}<br>
    ${isEn ? "Goals for" : "Goles a favor"}: ${stats.goalsFor || 0}<br>
    ${isEn ? "Goals against" : "Goles en contra"}: ${stats.goalsAgainst || 0}<br>
    ${isEn ? "Avg. goals" : "Media de goles"}: ${avgGoals}<br>
    ${isEn ? "Avg. throws" : "Media de tiradas"}: ${avgThrows}
  </div>`;
}

const cgStartMatchBeforeLocalStats = startMatch;
startMatch = function(){
  gameState.localStatsSaved = false;
  cgStartMatchBeforeLocalStats();
};
try{ window.startMatch = startMatch; }catch(e){}

showFinal = function(pens){
  const savedStats = cgSaveFinishedMatch(Boolean(pens));
  incrementMatches();
  if(localMatchesCount) localMatchesCount.textContent = String(savedStats.matches);

  const p1 = gameState.players[0];
  const p2 = gameState.players[1];

  let text = `${safeDisplayName(p1.name)} ${p1.goals} - ${p2.goals} ${safeDisplayName(p2.name)}`;
  if(p1.goals > p2.goals) text += `. ${currentLang === "en" ? "Winner" : "Gana"} ${safeDisplayName(p1.name)}.`;
  else if(p2.goals > p1.goals) text += `. ${currentLang === "en" ? "Winner" : "Gana"} ${safeDisplayName(p2.name)}.`;
  else text += currentLang === "en" ? ". Level before penalties." : ". Igualado antes de penaltis.";
  if(pens) text += currentLang === "en" ? " Decided on penalties." : " Resuelto en penaltis.";

  gameState.lastFinalText = formattedFinalResult();

  showModal(
    currentLang === "en" ? "FULL TIME" : "FINAL DEL PARTIDO",
    text,
    finalHtml(Boolean(pens)) + cgLocalStatsFinalHtml(savedStats),
    [
      {text: currentLang === "en" ? "REMATCH" : "REVANCHA", action: restartSameMatch},
      {text: currentLang === "en" ? "SHARE RESULT" : "COMPARTIR RESULTADO", action: shareResult},
      {text: currentLang === "en" ? "HISTORY" : "HISTORIAL", action: cgShowLocalHistory},
      {text: currentLang === "en" ? "NEW MATCH" : "NUEVA PARTIDA", action: resetToSetup}
    ]
  );
};

function cgWireLocalStats(){
  const showBtn = $("cg-show-history-btn");
  const resetBtnStats = $("cg-reset-stats-btn");
  if(showBtn) showBtn.onclick = cgShowLocalHistory;
  if(resetBtnStats) resetBtnStats.onclick = cgConfirmResetStats;
  if(startMatchBtn) startMatchBtn.onclick = startMatch;
  cgRenderLocalStatsPanel();
}

try{ cgWireLocalStats(); }catch(e){}


try{ window.startMatch = startMatch; }catch(e){}



/*
===============================================================================
CronoGol v2.4.2 — Online Turn Control
===============================================================================
Primera capa de control de turno online:
- Host = jugador 1, invitado = jugador 2.
- Si no es tu turno, START queda bloqueado.
- Tras una tirada local, se sube a Supabase el turno activo y un snapshot básico.
- El rival lee Supabase por polling y habilita START cuando le toca.

Todavía no es la sincronización completa de eventos/final, pero ya evita que ambos
puedan jugar a la vez.
===============================================================================
*/
(function(){
  "use strict";

  const ONLINE_TURN_VERSION = "2.4.2";
  const SUPABASE_URL = "https://xbrrdkflztxkvnngmdhu.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l";
  const ROOMS_TABLE = "cronogol_rooms";
  const POLL_MS = 2500;

  let pullTimer = null;
  let lastPulledTurnAt = "";
  let isPushingOnlineState = false;
  let lastBlockedToastAt = 0;

  function onlineStatus(){
    try{
      if(window.CronoGolOnline && typeof window.CronoGolOnline.getOnlineStatus === "function"){
        return window.CronoGolOnline.getOnlineStatus() || {};
      }
    }catch(e){}
    return {};
  }

  function activeRoomCode(){
    return String(onlineStatus().currentRoomCode || "").trim().toUpperCase();
  }

  function activeRole(){
    return String(onlineStatus().currentRole || "").trim().toLowerCase();
  }

  function onlineLocalPlayerIndex(){
    return activeRole() === "guest" ? 1 : 0;
  }

  function isOnlineGameActive(){
    try{
      return Boolean(
        gameState &&
        gameState.gameMode === "online" &&
        gameScreen &&
        gameScreen.classList.contains("active") &&
        activeRoomCode()
      );
    }catch(e){
      return false;
    }
  }

  function isLocalOnlineTurn(){
    if(!isOnlineGameActive()) return true;
    return Number(gameState.currentPlayerIndex || 0) === onlineLocalPlayerIndex();
  }

  function otherPlayerName(){
    try{
      const idx = Number(gameState.currentPlayerIndex || 0);
      return gameState.players && gameState.players[idx] ? gameState.players[idx].name : "rival";
    }catch(e){
      return "rival";
    }
  }

  function canApplyRemoteState(){
    try{
      return isOnlineGameActive() &&
        !gameState.isRunning &&
        !pendingSpecial &&
        !penaltyShootout &&
        !gameState.matchEnded;
    }catch(e){
      return false;
    }
  }

  function roomEndpoint(code){
    return `${ROOMS_TABLE}?room_code=eq.${encodeURIComponent(code)}`;
  }

  async function supabaseFetch(path, options = {}){
    const headers = Object.assign({
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    }, options.headers || {});
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, Object.assign({}, options, {headers}));
    const text = await response.text();
    let data = null;
    if(text){
      try{ data = JSON.parse(text); }catch(e){ data = text; }
    }
    if(!response.ok){
      const err = new Error(data && data.message ? data.message : `Supabase HTTP ${response.status}`);
      err.status = response.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function onlineSnapshot(reason){
    const players = (gameState.players || []).map((p, index)=>({
      index,
      name: String(p && p.name ? p.name : `Jugador ${index + 1}`).slice(0,24),
      goals: Number(p && p.goals || 0),
      skipTurns: Number(p && p.skipTurns || 0)
    }));

    return {
      schemaVersion: 4,
      appVersion: ONLINE_TURN_VERSION,
      phase: "playing",
      gameMode: "online",
      matchMode: gameState.matchMode || "classic",
      half: gameState.half || 1,
      currentPlayerIndex: Number(gameState.currentPlayerIndex || 0),
      players,
      score: [
        Number(players[0] && players[0].goals || 0),
        Number(players[1] && players[1].goals || 0)
      ],
      stats: Object.assign({}, gameState.stats || {}),
      matchEnded: Boolean(gameState.matchEnded),
      lastTurnReason: reason || "turn_sync",
      lastTurnActorRole: activeRole() || "unknown",
      lastTurnSyncAt: new Date().toISOString()
    };
  }

  async function pushOnlineTurnState(reason){
    if(!isOnlineGameActive() || isPushingOnlineState) return;
    const code = activeRoomCode();
    if(!code) return;

    isPushingOnlineState = true;
    try{
      const state = onlineSnapshot(reason);
      await supabaseFetch(roomEndpoint(code), {
        method: "PATCH",
        headers: {"Prefer": "return=minimal"},
        body: JSON.stringify({
          status: gameState.matchEnded ? "finished" : "playing",
          state_json: state,
          app_version: ONLINE_TURN_VERSION,
          last_seen_at: new Date().toISOString()
        })
      });
    }catch(e){
      try{ console.warn("[CronoGol online turn push]", e); }catch(_){}
    }finally{
      isPushingOnlineState = false;
    }
  }

  function applyRemoteStateToLocal(state){
    if(!state || !canApplyRemoteState()) return;

    let changed = false;

    if(Array.isArray(state.players) && state.players.length >= 2){
      for(let i = 0; i < 2; i++){
        const remote = state.players[i] || {};
        if(gameState.players[i]){
          if(remote.name && gameState.players[i].name !== remote.name){
            gameState.players[i].name = String(remote.name).slice(0,24);
            changed = true;
          }
          if(Number.isFinite(Number(remote.goals)) && gameState.players[i].goals !== Number(remote.goals)){
            gameState.players[i].goals = Number(remote.goals);
            changed = true;
          }
          if(Number.isFinite(Number(remote.skipTurns)) && gameState.players[i].skipTurns !== Number(remote.skipTurns)){
            gameState.players[i].skipTurns = Number(remote.skipTurns);
            changed = true;
          }
        }
      }
    }

    if(Number.isFinite(Number(state.currentPlayerIndex))){
      const remoteTurn = Number(state.currentPlayerIndex);
      if(remoteTurn === 0 || remoteTurn === 1){
        if(gameState.currentPlayerIndex !== remoteTurn){
          gameState.currentPlayerIndex = remoteTurn;
          changed = true;
        }
      }
    }

    if(state.matchEnded && !gameState.matchEnded){
      gameState.matchEnded = true;
      changed = true;
    }

    if(changed){
      try{ updateUI(); }catch(e){}
    }
    try{ syncActionControls(); }catch(e){}
  }

  async function pullOnlineTurnState(){
    if(!isOnlineGameActive()) return;
    const code = activeRoomCode();
    if(!code || !canApplyRemoteState()) return;

    try{
      const data = await supabaseFetch(`${roomEndpoint(code)}&select=state_json,status,updated_at`, {method:"GET"});
      if(!Array.isArray(data) || !data.length) return;
      const row = data[0];
      const state = row.state_json || {};
      const stamp = state.lastTurnSyncAt || row.updated_at || "";
      if(stamp && stamp === lastPulledTurnAt) return;
      lastPulledTurnAt = stamp;
      if(row.status === "playing" || state.phase === "playing"){
        applyRemoteStateToLocal(state);
      }
    }catch(e){
      try{ console.warn("[CronoGol online turn pull]", e); }catch(_){}
    }
  }

  function applyOnlineTurnControls(){
    if(!mainActionBtn || !specialStartBtn) return;

    if(!isOnlineGameActive()){
      mainActionBtn.classList.remove("online-waiting-turn");
      specialStartBtn.classList.remove("online-waiting-turn");
      return;
    }

    const localTurn = isLocalOnlineTurn();
    document.body.classList.toggle("online-my-turn", localTurn);
    document.body.classList.toggle("online-waiting-turn", !localTurn);

    if(!localTurn && !gameState.matchEnded){
      mainActionBtn.disabled = true;
      specialStartBtn.disabled = true;
      mainActionBtn.classList.add("online-waiting-turn");
      specialStartBtn.classList.add("online-waiting-turn");
      if(!gameState.isRunning){
        mainActionBtn.textContent = currentLang === "en" ? "WAITING TURN" : "ESPERANDO TURNO";
      }
      if(messageLabel && eventTitle && !pendingSpecial && !penaltyShootout){
        const titleNow = String(eventTitle.textContent || "").trim();
        const msgNow = String(messageLabel.textContent || "").trim();
        const canReplace =
          !titleNow || titleNow === "--" ||
          !msgNow ||
          msgNow.indexOf("Pulsa START") >= 0 ||
          msgNow.indexOf("Press START") >= 0 ||
          msgNow.indexOf("Esperando turno") === 0 ||
          msgNow.indexOf("Waiting for") === 0;
        if(canReplace){
          messageLabel.textContent = currentLang === "en"
            ? `Waiting for ${otherPlayerName()}.`
            : `Esperando turno de ${otherPlayerName()}.`;
        }
      }
      return;
    }

    mainActionBtn.classList.remove("online-waiting-turn");
    specialStartBtn.classList.remove("online-waiting-turn");

    if(localTurn && !gameState.isRunning && !pendingSpecial && !penaltyShootout && !gameState.matchEnded){
      mainActionBtn.disabled = false;
      mainActionBtn.textContent = safeCgText("start", "START");
    }

    if(localTurn && pendingSpecial && !gameState.matchEnded){
      specialStartBtn.disabled = false;
    }
  }

  function blockedTurnFeedback(){
    const now = Date.now();
    if(now - lastBlockedToastAt < 1400) return;
    lastBlockedToastAt = now;
    const msg = currentLang === "en"
      ? `Wait for ${otherPlayerName()}'s turn.`
      : `Espera el turno de ${otherPlayerName()}.`;
    try{ showToast(msg); }catch(e){}
  }

  function startOnlineTurnPolling(){
    if(pullTimer) clearInterval(pullTimer);
    pullTimer = setInterval(()=>{ pullOnlineTurnState(); }, POLL_MS);
  }

  // Wrap control sync.
  try{
    const originalSyncActionControls = syncActionControls;
    syncActionControls = function(){
      originalSyncActionControls();
      applyOnlineTurnControls();
    };
  }catch(e){}

  // Guard main action.
  try{
    const originalHandleMainAction = handleMainAction;
    handleMainAction = function(){
      if(isOnlineGameActive() && !isLocalOnlineTurn()){
        applyOnlineTurnControls();
        blockedTurnFeedback();
        return;
      }
      return originalHandleMainAction();
    };
  }catch(e){}

  // Push turn state after any normal/special/shootout throw.
  try{
    const originalApplyNormalResult = applyNormalResult;
    applyNormalResult = function(v, r){
      const out = originalApplyNormalResult(v, r);
      setTimeout(()=>pushOnlineTurnState("normal_throw"), 80);
      setTimeout(()=>applyOnlineTurnControls(), 120);
      return out;
    };
  }catch(e){}

  try{
    const originalEvaluateSpecialThrow = evaluateSpecialThrow;
    evaluateSpecialThrow = function(v){
      const out = originalEvaluateSpecialThrow(v);
      setTimeout(()=>pushOnlineTurnState("special_throw"), 80);
      setTimeout(()=>applyOnlineTurnControls(), 120);
      return out;
    };
  }catch(e){}

  try{
    const originalEvaluateShootoutPenalty = evaluateShootoutPenalty;
    evaluateShootoutPenalty = function(v){
      const out = originalEvaluateShootoutPenalty(v);
      setTimeout(()=>pushOnlineTurnState("shootout_penalty"), 80);
      setTimeout(()=>applyOnlineTurnControls(), 120);
      return out;
    };
  }catch(e){}

  // After match start, publish initial turn snapshot and apply controls.
  try{
    const originalStartMatchForOnlineTurn = startMatch;
    startMatch = function(){
      const out = originalStartMatchForOnlineTurn();
      setTimeout(()=>{
        if(isOnlineGameActive()){
          pushOnlineTurnState("match_start");
          applyOnlineTurnControls();
          startOnlineTurnPolling();
        }
      }, 180);
      return out;
    };
    try{ window.startMatch = startMatch; }catch(e){}
  }catch(e){}

  // Keep polling alive; only acts during online game.
  startOnlineTurnPolling();
  setInterval(()=>{ try{ applyOnlineTurnControls(); }catch(e){} }, 1000);

  window.CronoGolOnlineTurn = Object.freeze({
    version: ONLINE_TURN_VERSION,
    isOnlineGameActive,
    onlineLocalPlayerIndex,
    isLocalOnlineTurn,
    pushOnlineTurnState,
    pullOnlineTurnState
  });
})();



/* CronoGol v2.4.2 — Online Throws & Score Sync */
(function(){
"use strict";
const V="2.4.2";
const URL="https://xbrrdkflztxkvnngmdhu.supabase.co";
const KEY="sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l";
const TABLE="cronogol_rooms";
let lastApplied="", lastPushed="", pushing=false;

function st(){try{return window.CronoGolOnline&&window.CronoGolOnline.getOnlineStatus?window.CronoGolOnline.getOnlineStatus():{};}catch(e){return {};}}
function code(){return String(st().currentRoomCode||"").trim().toUpperCase();}
function role(){return String(st().currentRole||"").trim().toLowerCase();}
function online(){try{return gameState&&gameState.gameMode==="online"&&gameScreen.classList.contains("active")&&code();}catch(e){return false;}}
function ep(c){return `${TABLE}?room_code=eq.${encodeURIComponent(c)}`;}
async function sf(path,opt={}){
 const h=Object.assign({"apikey":KEY,"Authorization":`Bearer ${KEY}`,"Content-Type":"application/json"},opt.headers||{});
 const r=await fetch(`${URL}/rest/v1/${path}`,Object.assign({},opt,{headers:h}));
 const tx=await r.text(); let d=null; if(tx){try{d=JSON.parse(tx)}catch(e){d=tx}}
 if(!r.ok){throw new Error(d&&d.message?d.message:`Supabase HTTP ${r.status}`)}
 return d;
}
function players(){
 return (gameState.players||[]).map((p,i)=>({index:i,name:String(p&&p.name?p.name:`Jugador ${i+1}`).slice(0,24),goals:Number(p&&p.goals||0),skipTurns:Number(p&&p.skipTurns||0)}));
}
function cls(){
 try{return Array.from(eventCard.classList||[]).find(c=>c.indexOf("event-")===0&&c!=="event-card")||"event-neutral";}catch(e){return "event-neutral";}
}
function ev(kind,v,actor){
 const id=`${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
 const valueText=Number.isFinite(Number(v))?pad(Number(v)):(lastTwoDisplay?lastTwoDisplay.textContent:"--");
 const actorName=String(actor.name||"").slice(0,24);
 const title=eventTitle?String(eventTitle.textContent||""):"";
 const rawMsg=messageLabel?String(messageLabel.textContent||""):"";
 const cleanMessage=(title&&title!=="--")?(actorName?`${actorName} sacó ${valueText} → ${title}`:`${valueText} → ${title}`):rawMsg;
 const payload={id,kind,value:Number.isFinite(Number(v))?Number(v):null,valueText,actorIndex:actor.idx,actorName,title,message:cleanMessage,eventClass:cls(),createdAt:new Date().toISOString()};try{window.__cronogolLastThrowForAudit=payload;}catch(e){}return payload;
}
function state(lastThrow,reason){
 const ps=players();
 return {schemaVersion:5,appVersion:V,phase:gameState.matchEnded?"finished":"playing",gameMode:"online",matchMode:gameState.matchMode||"classic",half:gameState.half||1,currentPlayerIndex:Number(gameState.currentPlayerIndex||0),players:ps,score:[Number(ps[0]&&ps[0].goals||0),Number(ps[1]&&ps[1].goals||0)],stats:Object.assign({},gameState.stats||{}),matchEnded:Boolean(gameState.matchEnded),lastTurnReason:reason||"online_throw",lastTurnActorRole:role()||"unknown",lastTurnSyncAt:new Date().toISOString(),lastThrow};
}
async function push(lastThrow,reason){
 if(!online()||!lastThrow||pushing||lastPushed===lastThrow.id)return;
 lastPushed=lastThrow.id; pushing=true;
 try{await sf(ep(code()),{method:"PATCH",headers:{"Prefer":"return=minimal"},body:JSON.stringify({status:gameState.matchEnded?"finished":"playing",state_json:state(lastThrow,reason),app_version:V,last_seen_at:new Date().toISOString()})});}
 catch(e){try{console.warn("[CronoGol v2.4 push]",e)}catch(_){}} finally{pushing=false;}
}
function actor(){try{const i=Number(gameState.currentPlayerIndex||0),p=gameState.players&&gameState.players[i];return {idx:i,name:p?p.name:`Jugador ${i+1}`};}catch(e){return {idx:0,name:"Jugador 1"};}}
function canPull(){try{return online()&&!gameState.isRunning&&!pendingSpecial&&!penaltyShootout;}catch(e){return false;}}
function applyState(s){
 if(!s)return;
 if(Array.isArray(s.players)&&s.players.length>=2){for(let i=0;i<2;i++){const r=s.players[i]||{};if(gameState.players[i]){if(r.name)gameState.players[i].name=String(r.name).slice(0,24);if(Number.isFinite(Number(r.goals)))gameState.players[i].goals=Number(r.goals);if(Number.isFinite(Number(r.skipTurns)))gameState.players[i].skipTurns=Number(r.skipTurns);}}}
 if(Number.isFinite(Number(s.currentPlayerIndex))){const i=Number(s.currentPlayerIndex); if(i===0||i===1)gameState.currentPlayerIndex=i;}
 if(s.half)gameState.half=Number(s.half)||gameState.half;
 if(s.stats&&typeof s.stats==="object")gameState.stats=Object.assign({},gameState.stats||{},s.stats);
 if(s.matchEnded)gameState.matchEnded=true;
 try{updateUI()}catch(e){}; try{syncActionControls()}catch(e){};
}
function applyThrow(t){
 if(!t||!t.id||lastApplied===t.id)return;
 lastApplied=t.id;
 if(lastTwoDisplay)lastTwoDisplay.textContent=t.valueText||(Number.isFinite(Number(t.value))?pad(Number(t.value)):"--");
 if(eventTitle&&messageLabel&&eventCard){eventTitle.textContent=t.title||"--";messageLabel.textContent=t.message||"";eventCard.className=`event-card ${t.eventClass||"event-neutral"}`;}
 try{if(gameState.log){gameState.log.unshift(`${clockSec()}  ${t.actorName||"Jugador"} — ${t.valueText||"--"} — ${t.title||""}`);if(gameState.log.length>50)gameState.log.pop();renderLog();}}catch(e){}
}
async function pull(){
 if(!canPull())return;
 try{const d=await sf(`${ep(code())}&select=state_json,status,updated_at`,{method:"GET"}); if(!Array.isArray(d)||!d.length)return; const row=d[0],s=row.state_json||{}; if(row.status!=="playing"&&row.status!=="finished"&&s.phase!=="playing"&&s.phase!=="finished")return; applyState(s); if(s.lastThrow)applyThrow(s.lastThrow);}
 catch(e){try{console.warn("[CronoGol v2.4 pull]",e)}catch(_){}}
}
try{const prev=applyNormalResult; applyNormalResult=function(v,r){const a=actor();const out=prev(v,r);setTimeout(()=>{if(online())push(ev("normal",v,a),"normal_throw")},140);return out;};}catch(e){}
try{const prev=evaluateSpecialThrow; evaluateSpecialThrow=function(v){const a=actor();const out=prev(v);setTimeout(()=>{if(online())push(ev("special",v,a),"special_throw")},140);return out;};}catch(e){}
try{const prev=evaluateShootoutPenalty; evaluateShootoutPenalty=function(v){const a=actor();const out=prev(v);setTimeout(()=>{if(online())push(ev("shootout",v,a),"shootout_penalty")},140);return out;};}catch(e){}
setInterval(pull,1800);
window.CronoGolOnlineEvents=Object.freeze({version:V,pushThrowEvent:push,pullThrowState:pull});
})();



/* CronoGol v2.4.2 — Last Throw Message Fix */
(function(){
  "use strict";
  let lastClean = null;

  function remember(){
    try{
      if(!eventTitle || !messageLabel || !eventCard) return;
      const title = String(eventTitle.textContent || "").trim();
      const msg = String(messageLabel.textContent || "").trim();
      if(title && title !== "--" && msg && msg.indexOf("Esperando turno") !== 0 && msg.indexOf("Waiting for") !== 0){
        lastClean = {title, msg, cls:eventCard.className};
      }
    }catch(e){}
  }

  function restore(){
    try{
      if(!lastClean || !eventTitle || !messageLabel || !eventCard) return;
      const msg = String(messageLabel.textContent || "").trim();
      if(msg.indexOf("Esperando turno") === 0 || msg.indexOf("Waiting for") === 0){
        eventTitle.textContent = lastClean.title;
        messageLabel.textContent = lastClean.msg;
        eventCard.className = lastClean.cls || "event-card event-neutral";
      }
    }catch(e){}
  }

  try{
    const prevSync = syncActionControls;
    syncActionControls = function(){
      remember();
      const out = prevSync();
      restore();
      return out;
    };
  }catch(e){}

  try{
    const prevNormal = applyNormalResult;
    applyNormalResult = function(v,r){
      const out = prevNormal(v,r);
      remember();
      setTimeout(remember,80);
      return out;
    };
  }catch(e){}

  try{
    const prevSpecial = evaluateSpecialThrow;
    evaluateSpecialThrow = function(v){
      const out = prevSpecial(v);
      remember();
      setTimeout(remember,80);
      return out;
    };
  }catch(e){}
})();



/* CronoGol v2.4.2 — Rules Selector & Online Sanctions Fix */
(function(){
"use strict";
const V="2.4.2",URL="https://xbrrdkflztxkvnngmdhu.supabase.co",KEY="sb_publishable_Ktw6Eh91X5K0yRjA9qJ6VA_vhxLPu8l",TABLE="cronogol_rooms";
let busy=false;
function st(){try{return window.CronoGolOnline&&window.CronoGolOnline.getOnlineStatus?window.CronoGolOnline.getOnlineStatus():{};}catch(e){return {};}}
function code(){return String(st().currentRoomCode||"").trim().toUpperCase();}
function role(){return String(st().currentRole||"").trim().toLowerCase();}
function online(){try{return gameState&&gameState.gameMode==="online"&&gameScreen.classList.contains("active")&&code();}catch(e){return false;}}
async function sf(path,opt={}){const h=Object.assign({"apikey":KEY,"Authorization":`Bearer ${KEY}`,"Content-Type":"application/json"},opt.headers||{});const r=await fetch(`${URL}/rest/v1/${path}`,Object.assign({},opt,{headers:h}));const tx=await r.text();let d=null;if(tx){try{d=JSON.parse(tx)}catch(e){d=tx}}if(!r.ok)throw new Error(d&&d.message?d.message:`Supabase HTTP ${r.status}`);return d;}
function ps(){return (gameState.players||[]).map((p,i)=>({index:i,name:String(p&&p.name?p.name:`Jugador ${i+1}`).slice(0,24),goals:Number(p&&p.goals||0),skipTurns:Number(p&&p.skipTurns||0)}));}
async function push(reason){if(!online())return;const c=code(),p=ps();const state={schemaVersion:6,appVersion:V,phase:gameState.matchEnded?"finished":"playing",gameMode:"online",matchMode:gameState.matchMode||"classic",half:gameState.half||1,currentPlayerIndex:Number(gameState.currentPlayerIndex||0),players:p,score:[Number(p[0]&&p[0].goals||0),Number(p[1]&&p[1].goals||0)],stats:Object.assign({},gameState.stats||{}),matchEnded:Boolean(gameState.matchEnded),lastTurnReason:reason||"sanction_skip",lastTurnActorRole:role()||"unknown",lastTurnSyncAt:new Date().toISOString(),lastThrow:window.__cronogolLastThrowForAudit||null};try{await sf(`${TABLE}?room_code=eq.${encodeURIComponent(c)}`,{method:"PATCH",headers:{"Prefer":"return=minimal"},body:JSON.stringify({status:gameState.matchEnded?"finished":"playing",state_json:state,app_version:V,last_seen_at:new Date().toISOString()})});}catch(e){try{console.warn("[sanctions push]",e)}catch(_){}}}
function process(){if(!online()||busy||gameState.matchEnded||pendingSpecial||penaltyShootout)return false;const p=gameState.players&&gameState.players[gameState.currentPlayerIndex];if(!p||Number(p.skipTurns||0)<=0)return false;busy=true;try{const skipped=p.name;p.skipTurns=Math.max(0,Number(p.skipTurns||0)-1);addLog(`${clockSec()}  ${skipped} pierde turno por sanción`);gameState.currentPlayerIndex=gameState.currentPlayerIndex===0?1:0;const next=gameState.players&&gameState.players[gameState.currentPlayerIndex]?gameState.players[gameState.currentPlayerIndex].name:"rival";if(eventTitle&&messageLabel&&eventCard){eventTitle.textContent="SANCIÓN";messageLabel.textContent=`${skipped} pierde turno. Turno de ${next}.`;eventCard.className="event-card event-special";}updateUI();setTimeout(()=>push("sanction_skip"),80);return true;}finally{busy=false;}}
try{const prev=syncActionControls;syncActionControls=function(){const skipped=process();const out=prev();if(skipped)setTimeout(()=>{try{syncActionControls()}catch(e){}},120);return out;};}catch(e){}
try{const prev=updateUI;updateUI=function(){const out=prev();setTimeout(process,30);return out;};}catch(e){}
window.CronoGolOnlineSanctions=Object.freeze({version:V,processOnlineSanctionSkipIfNeeded:process,pushSanctionTurnState:push});
})();

