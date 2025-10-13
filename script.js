/* AI for Everyone Monopoly — Cisco Amsterdam 2026 CTF
   Pure JS. No frameworks. */

(function(){
  const TILE_COUNT = 20; // Simplified ring for demo
  const BADGE_GOAL = 8;
  const FLAG_TEXT = "FLAG{AI4EVERYONE-CISCO-AMS-2026}";

  const els = {
    screens: {
      home: document.getElementById('home'),
      howto: document.getElementById('howto'),
      game: document.getElementById('game'),
      about: document.getElementById('about')
    },
    navBtns: document.querySelectorAll('.nav-btn, .cta-row button'),
    board: document.getElementById('board'),
    token: document.getElementById('token'),
    rollBtn: document.getElementById('rollBtn'),
    dice: document.getElementById('dice'),
    diceFace: document.getElementById('diceFace'),
    posLabel: document.getElementById('posLabel'),
    badgeCount: document.getElementById('badgeCount'),
    badgeGoal: document.getElementById('badgeGoal'),
    progressFill: document.getElementById('progressFill'),
    flagArea: document.getElementById('flagArea'),
    resetBtn: document.getElementById('resetBtn'),
    hintBtn: document.getElementById('hintBtn'),
    log: document.getElementById('log'),
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modalTitle'),
    modalFact: document.getElementById('modalFact'),
    modalQuiz: document.getElementById('modalQuiz'),
    quizQuestion: document.getElementById('quizQuestion'),
    quizOptions: document.getElementById('quizOptions'),
    modalResult: document.getElementById('modalResult'),
    modalClose: document.getElementById('modalClose'),
    modalContinue: document.getElementById('modalContinue'),
  };

  let state = {
    position: 0,
    rolling: false,
    badges: new Set(),
    visited: new Set(),
  };

  els.badgeGoal.textContent = BADGE_GOAL.toString();

  const diceChars = ["⚀","⚁","⚂","⚃","⚄","⚅"];

  // Board spaces with Cisco-related AI facts and quick quiz
  const spaces = [
    { name:"Go", icon:"🚀", fact:"Welcome! Learn AI concepts across Cisco technologies as you move.", quiz:{q:"What powers the dice roll?", opts:["Randomness","ML model","Manual input"], a:0}, key:"start" },
    { name:"AI Networking", icon:"🔗", fact:"AI-driven network analytics help detect anomalies and optimize performance.", quiz:{q:"AI can help identify:", opts:["Network anomalies","Coffee orders","Vacation spots"], a:0}, key:"net-ai" },
    { name:"Webex AI", icon:"🎙️", fact:"Webex uses AI for noise removal, transcription, and meeting summaries.", quiz:{q:"An AI-powered Webex feature is:", opts:["Real-time transcription","MP3 burning","CRT rendering"], a:0}, key:"webex" },
    { name:"Talos Threat Intel", icon:"🛡️", fact:"Cisco Talos applies ML techniques to help detect threats faster.", quiz:{q:"ML in security can:", opts:["Detect anomalies","Only store logs","Decrease visibility"], a:0}, key:"talos" },
    { name:"Meraki Vision AI", icon:"📷", fact:"Meraki MV cameras support edge analytics like people detection.", quiz:{q:"Edge analytics means:", opts:["Processing at the device","Processing only in cloud","No processing"], a:0}, key:"meraki" },
    { name:"AppDynamics", icon:"📈", fact:"AppDynamics uses AI to detect application performance anomalies.", quiz:{q:"AIOps can identify:", opts:["Perf anomalies","Only UI colors","HTML tags"], a:0}, key:"appd" },
    { name:"ThousandEyes", icon:"🌐", fact:"ThousandEyes provides internet visibility; insights can be aided by ML.", quiz:{q:"Internet visibility helps:", opts:["Troubleshoot paths","Bake cakes","Fold paper"], a:0}, key:"te" },
    { name:"XDR Security", icon:"🔍", fact:"Extended detection and response can use AI to correlate signals.", quiz:{q:"XDR aims to:", opts:["Correlate signals","Replace keyboards","Disable Wi-Fi"], a:0}, key:"xdr" },
    { name:"Catalyst Center", icon:"🧠", fact:"AI insights in Catalyst Center support assurance and optimization.", quiz:{q:"Assurance helps:", opts:["User experience","Shoe sizes","Calendar dates"], a:0}, key:"catcenter" },
    { name:"Responsible AI", icon:"⚖️", fact:"Responsible AI emphasizes fairness, transparency, and accountability.", quiz:{q:"Responsible AI includes:", opts:["Transparency","Random bias","Secrecy only"], a:0}, key:"rai" },
    { name:"Full-Stack Observability", icon:"🧩", fact:"FSO combines signals across layers; AI helps prioritize issues.", quiz:{q:"FSO spans:", opts:["Multiple layers","Only front-end","Only power"], a:0}, key:"fso" },
    { name:"Wireless Insights", icon:"📶", fact:"AI can help optimize radio resource management and client experience.", quiz:{q:"RRM optimizes:", opts:["Wireless channels","CD players","Bookmarks"], a:0}, key:"wireless" },
    { name:"Natural Language Ops", icon:"💬", fact:"Chat-style interfaces can accelerate admin tasks with guardrails.", quiz:{q:"NL interfaces can:", opts:["Accelerate tasks","Replace all UIs","Delete logs"], a:0}, key:"nlo" },
    { name:"AI + Sustainability", icon:"🌱", fact:"AI can support energy efficiency and sustainability insights.", quiz:{q:"AI can help:", opts:["Optimize energy","Print newspapers","Grow plants directly"], a:0}, key:"sustain" },
    { name:"Hypershield", icon:"🧱", fact:"Modern security architectures can use AI/ML to detect advanced threats.", quiz:{q:"AI in security aims to:", opts:["Improve detection","Hide incidents","Disable logs"], a:0}, key:"hypershield" },
    { name:"Secure Access", icon:"🔑", fact:"Risk-based access can leverage ML signals to adapt authentication.", quiz:{q:"Adaptive auth uses:", opts:["Risk signals","Random choice","Static rules only"], a:0}, key:"secureaccess" },
    { name:"Cloud Security", icon:"☁️", fact:"AI assists in cloud threat detection and posture insights.", quiz:{q:"Cloud AI can:", opts:["Detect threats","Change weather","Delete clouds"], a:0}, key:"cloudsec" },
    { name:"AI Readiness", icon:"📚", fact:"AI adoption requires data quality, governance, and skills.", quiz:{q:"Key for AI:", opts:["Data quality","Randomness only","No governance"], a:0}, key:"readiness" },
    { name:"AI Ethics", icon:"🧭", fact:"Ethical AI aligns with values and mitigates unintended harms.", quiz:{q:"Ethics includes:", opts:["Mitigation","Encouraging bias","Ignoring users"], a:0}, key:"ethics" },
    { name:"Flag Gate", icon:"🏁", fact:"Collect enough badges to reveal the final flag.", quiz:{q:"To reveal the flag:", opts:["Collect badges","Skip everything","Roll 0"], a:0}, key:"flag" },
  ];

  // Navigation
  els.navBtns.forEach(btn=>{
    const target = btn.getAttribute('data-nav');
    if(!target) return;
    btn.addEventListener('click', ()=>showScreen(target));
  });

  function showScreen(id){
    Object.values(els.screens).forEach(s=>s.classList.remove('active'));
    if(els.screens[id]) els.screens[id].classList.add('active');
    if(id === 'game'){ layoutBoard(); placeToken(state.position); }
  }

  // Build board tiles along the ring (5 per side)
  function layoutBoard(){
    els.board.innerHTML = "";
    const rect = els.board.getBoundingClientRect();
    const pad = 8;
    const w = rect.width;
    const h = rect.height;
    const tileW = Math.min(86, Math.max(72, Math.floor(w/7)));
    const tileH = tileW;

    function posForIndex(i){
      // Indices mapping: 0 corner (bottom-right), then bottom row leftwards 1..4
      // 5 corner (bottom-left), 6..9 left column upwards, 10 corner (top-left),
      // 11..14 top row rightwards, 15 corner (top-right), 16..19 right column downwards.
      const innerPad = 6;
      const rightX = w - tileW/2 - innerPad;
      const leftX  = tileW/2 + innerPad;
      const topY   = tileH/2 + innerPad;
      const bottomY= h - tileH/2 - innerPad;

      if(i===0) return {x:rightX, y:bottomY};
      if(i>=1 && i<=4){
        const t = i; // 1..4
        const col = 4 - (t-1); // 4..1 moving left
        const x = leftX + (col-1)*((rightX-leftX)/4);
        return {x, y:bottomY};
      }
      if(i===5) return {x:leftX, y:bottomY};
      if(i>=6 && i<=9){
        const t = i; // 6..9
        const row = 4 - (t-6); // 4..1 moving up
        const y = topY + (row-1)*((bottomY-topY)/4);
        return {x:leftX, y};
      }
      if(i===10) return {x:leftX, y:topY};
      if(i>=11 && i<=14){
        const t = i; // 11..14
        const col = (t-10); // 1..4 moving right
        const x = leftX + (col-1)*((rightX-leftX)/4);
        return {x, y:topY};
      }
      if(i===15) return {x:rightX, y:topY};
      if(i>=16 && i<=19){
        const t = i; // 16..19
        const row = (t-15); // 1..4 moving down
        const y = topY + (row-1)*((bottomY-topY)/4);
        return {x:rightX, y};
      }
      return {x:rightX, y:bottomY};
    }

    spaces.forEach((s, i)=>{
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.index = i.toString();
      tile.innerHTML = `
        <div class="index">#${i}</div>
        <div class="name">${s.icon} ${s.name}</div>
      `;
      const p = posForIndex(i);
      tile.style.left = `${p.x - tileW/2}px`;
      tile.style.top  = `${p.y - tileH/2}px`;
      tile.style.width = `${tileW}px`;
      tile.style.height = `${tileH}px`;
      els.board.appendChild(tile);
    });

    highlightTile(state.position);
  }

  function highlightTile(i){
    document.querySelectorAll('.tile').forEach(t=>t.classList.remove('active'));
    const t = document.querySelector(`.tile[data-index="${i}"]`);
    if(t) t.classList.add('active');
  }

  function placeToken(i){
    const tile = document.querySelector(`.tile[data-index="${i}"]`);
    if(!tile) return;
    const rectBoard = els.board.getBoundingClientRect();
    const rect = tile.getBoundingClientRect();
    const boardLeft = rectBoard.left;
    const boardTop  = rectBoard.top;
    const x = rect.left - boardLeft + rect.width/2;
    const y = rect.top  - boardTop  + rect.height/2;
    els.token.style.left = `${x}px`;
    els.token.style.top  = `${y}px`;
    els.posLabel.textContent = i.toString();
    highlightTile(i);
  }

  // Dice roll + movement
  els.rollBtn.addEventListener('click', rollDice);
  els.hintBtn.addEventListener('click', ()=>{
    log(`Hint: Earn ${BADGE_GOAL} badges to reveal the flag.`);
  });

  function rollDice(){
    if(state.rolling) return;
    state.rolling = true;
    els.dice.classList.add('rolling');
    log("Rolling...");
    setTimeout(()=>{
      const steps = 1 + Math.floor(Math.random()*6);
      els.dice.classList.remove('rolling');
      els.diceFace.textContent = diceChars[steps-1];
      log(`You rolled a ${steps}.`);
      moveToken(steps);
    }, 1000);
  }

  function moveToken(steps){
    let remaining = steps;
    const tick = setInterval(()=>{
      if(remaining<=0){
        clearInterval(tick);
        state.rolling = false;
        onLanded(state.position);
        return;
      }
      state.position = (state.position + 1) % TILE_COUNT;
      placeToken(state.position);
      remaining--;
    }, 220);
  }

  function onLanded(i){
    const space = spaces[i];
    if(!space) return;
    openModal(space);
    state.visited.add(i);
    save();
  }

  // Modal with fact and quiz
  function openModal(space){
    els.modalTitle.textContent = `${space.icon} ${space.name}`;
    els.modalFact.textContent = `Did you know? ${space.fact}`;
    els.modalResult.textContent = "";
    // quiz
    els.quizQuestion.textContent = space.quiz.q;
    els.quizOptions.innerHTML = "";
    space.quiz.opts.forEach((opt, idx)=>{
      const b = document.createElement('button');
      b.textContent = opt;
      b.addEventListener('click', ()=>{
        handleQuizAnswer(space, idx);
      });
      els.quizOptions.appendChild(b);
    });

    els.modal.classList.add('show');
    els.modal.setAttribute('aria-hidden','false');

    // Close/continue handlers
    els.modalClose.onclick = closeModal;
    els.modalContinue.onclick = ()=>{
      closeModal();
      // After closing, update UI
      refreshProgress();
    };
  }

  function handleQuizAnswer(space, idx){
    if(idx === space.quiz.a){
      // success
      els.modalResult.style.color = "var(--ok)";
      els.modalResult.textContent = "Correct! You earned a badge.";
      state.badges.add(space.key);
      refreshProgress();
      save();
    } else {
      els.modalResult.style.color = "var(--danger)";
      els.modalResult.textContent = "Not quite. Keep exploring!";
    }
  }

  function closeModal(){
    els.modal.classList.remove('show');
    els.modal.setAttribute('aria-hidden','true');
  }

  // Progress and flag
  function refreshProgress(){
    const count = state.badges.size;
    els.badgeCount.textContent = count.toString();
    const pct = Math.min(100, Math.round((count / BADGE_GOAL) * 100));
    els.progressFill.style.width = `${pct}%`;
    if(count >= BADGE_GOAL){
      els.flagArea.innerHTML = `<span class="pill" style="background:#124; border-color:#2aa3ff">Flag Revealed:</span> <strong>${FLAG_TEXT}</strong>`;
    } else {
      els.flagArea.innerHTML = `<p class="flag-hidden">Collect ${BADGE_GOAL - count} more badge(s) to reveal the flag.</p>`;
    }
  }

  function log(msg){
    const time = new Date().toLocaleTimeString();
    els.log.innerHTML = `<div>[${time}] ${msg}</div>` + els.log.innerHTML;
  }

  // Reset
  els.resetBtn.addEventListener('click', ()=>{
    if(confirm("Reset progress? This clears badges and position.")){
      state = { position: 0, rolling: false, badges: new Set(), visited: new Set() };
      placeToken(0);
      refreshProgress();
      save();
      log("Progress reset.");
    }
  });

  // Persistence
  function save(){
    const payload = {
      position: state.position,
      badges: Array.from(state.badges),
      visited: Array.from(state.visited),
    };
    localStorage.setItem('ai4all-monopoly', JSON.stringify(payload));
  }
  function load(){
    const raw = localStorage.getItem('ai4all-monopoly');
    if(!raw) return;
    try {
      const p = JSON.parse(raw);
      state.position = p.position || 0;
      state.badges = new Set(p.badges || []);
      state.visited = new Set(p.visited || []);
    } catch(e){}
  }

  // Init
  window.addEventListener('resize', ()=>{
    layoutBoard();
    placeToken(state.position);
  });

  function init(){
    load();
    showScreen('home');
    layoutBoard();
    placeToken(state.position);
    refreshProgress();
    log("Welcome! Navigate to How To Play or jump into the Game.");
  }

  init();
})();
