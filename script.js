'use strict';

/* ============================= CONFIG ============================= */

const GAME_CONFIG = {
  clawSpeed: 34,        // percent of rail width per second
  dropSpeed: 550,       // ms, lower/raise transition duration
  grabRadiusBonus: 2.5, // percent added to a capsule's collision radius
  finalPrizeDifficulty: 3.4,
  soundEnabled: true,
  clawMinX: 8,
  clawMaxX: 92,
  chuteX: 50,
};

document.documentElement.style.setProperty('--drop-duration', GAME_CONFIG.dropSpeed + 'ms');

const RARITY_STATS = {
  common:   { difficulty: 1.0, collisionRadius: 10.5, sizeVmin: 15.5 },
  uncommon: { difficulty: 1.35, collisionRadius: 9.3,  sizeVmin: 14.2 },
  rare:     { difficulty: 1.75, collisionRadius: 8.2,  sizeVmin: 13.2 },
};

const PRIZES = [
  { id: 'baby-photo', name: "Baby's Photo", image: 'images/baby-photo.jpg', message: "Awww look at my pretty baby. Of course I had to put one of your cute pictures here. You really are my favorite view.", rarity: 'common' },
  { id: 'lovebirds', name: 'Our Love Birds', image: 'images/lovebirds.jpg', message: "Just two love birds being us. Honestly, I really love seeing us like this. Sana marami pa tayong ganitong moments together.", rarity: 'common' },
  { id: 'babycake', name: 'Babycake', image: 'images/babycake.jpg', message: "HAHAHA babycake unlocked. Kahit ilang beses kitang makita, ikaw pa rin yung babycake crush ko.", rarity: 'common' },
  { id: 'hug', name: 'Hug', image: 'images/hug.jpg', message: "Congratulations baby, you won one hug from me. Actually unlimited dapat pero isa muna kasi claw machine lang to HAHAHA.", rarity: 'common' },
  { id: 'kiss', name: 'Kiss', image: 'images/kiss.jpg', message: "Okay baby, this one is yours. One kiss for my favorite girl. Bawal ibalik, already claimed.", rarity: 'uncommon' },
  { id: 'smile', name: 'Your Smile', image: 'images/smile.jpg', message: "One of my favorite things in this world. Your smile. I hope I get to see this smile a lot more.", rarity: 'uncommon' },
  { id: 'funny', name: 'Funny Prize', image: 'images/funny.jpg', message: "HAHAHAHA you really thought you were getting something serious. Sorry baby, kailangan din natin ng kalokohan.", rarity: 'common' },
  { id: 'selos', name: 'Selos', image: 'images/selos.jpg', message: "Warning baby. My selos is still under development. Please be patient with the boyfriend application HAHAHA.", rarity: 'uncommon' },
  { id: 'clingy', name: 'Clingy', image: 'images/clingy.jpg', message: "Congratulations baby. You unlocked my clingy side. Unfortunately, this feature cannot be disabled.", rarity: 'uncommon' },
  { id: 'coupon', name: 'Love Coupon', image: 'images/coupon.jpg', message: "You won one free hug from me. Valid forever. Cannot be exchanged for cash. Can be redeemed whenever my baby needs one.", rarity: 'rare' },
  { id: 'random-baby', name: 'Random Baby Pic', image: 'images/random-baby.jpg', message: "Random baby pic unlocked. No reason, I just wanted another picture of my baby here. Still pretty as always.", rarity: 'uncommon' },
  { id: 'secret', name: 'Secret', image: 'images/secret.jpg', message: "HAHAHA you found the secret prize. But nope, this isn't the final one yet. Keep going baby.", rarity: 'rare' },
  { id: 'final', name: 'For My Baby', image: 'images/final.jpg', message: '', rarity: 'final', final: true },
].map(p => {
  if (p.final) {
    return { ...p, difficulty: GAME_CONFIG.finalPrizeDifficulty, collisionRadius: 7.6, sizeVmin: 14.5 };
  }
  const stats = RARITY_STATS[p.rarity];
  return { ...p, difficulty: stats.difficulty, collisionRadius: stats.collisionRadius, sizeVmin: stats.sizeVmin };
});

const MILESTONES = [
  {
    title: 'The Beginning', subtitle: 'Our Date Invitation', date: 'June 12',
    description: 'The day that led me to you.', buttonText: 'Open Memory',
    url: 'https://haruqt.github.io/Roana_/',
  },
  {
    title: 'GF Day', subtitle: 'A little surprise for my baby',
    buttonText: 'Open Memory', url: 'https://haruqt.github.io/Project_testing_nexus/',
  },
  {
    title: '1 Month', subtitle: 'Our first month', date: 'July 12',
    buttonText: 'Open Memory', url: 'https://haruqt.github.io/Roana_1month/',
  },
  {
    title: 'A Letter', subtitle: 'Something I wanted you to read',
    buttonText: 'Open Letter', url: 'https://haruqt.github.io/Open-it-baby/',
  },
  {
    title: '2 Months', subtitle: 'Another month with my baby', date: 'August 12',
    buttonText: 'Open Memory', url: 'https://haruqt.github.io/Baby/',
  },
  {
    title: '3 Months', subtitle: 'This little surprise', date: 'September 12',
    buttonText: 'Play Again', current: true, special: true,
  },
];

const LETTER_TEXT = `Baby, I know I’m not perfect. Sorry if minsan sobra akong jealous, clingy, naughty/freaky, or hindi ako yung funny guy na laging kayang magpasmile sa’yo and make your day better. Sorry din sa mga times na paulit ulit kong nagagawa yung same mistakes, especially when it comes to trust and being honest. I know I still have a lot to improve, and I’m genuinely trying my hardest to become better for you.

Sometimes I get too protective, too worried, or too much when it comes to you. Yung mga times na may sinasabi ako about what you wear or asking you to change something, it’s really just because I care so much about my baby and sometimes I don’t know how to handle how protective I feel.

I know I’m not the most romantic guy, hindi rin ako ganun ka stylish or handsome, and sometimes baka hindi ko alam paano ka pasayahin. But one thing I know for sure is that I want to make you the happiest woman I can. I care about you, your feelings, your dreams, and everything that makes you who you are.

I hope you never get tired of me. And kahit maraming nagkakagusto sa’yo, I hope you still choose me. I hope we both become successful someday, and I pray that God guides us and lets us reach all the things we dream about together.

I know I’m not perfect, baby, but I’m trying my hardest to treat you right, to understand you better, and to love you better than I did yesterday. You’re the only girl I want, the only girl I care about this much, and the one I think about way too much HAHAHA.

And please don’t ever think na having you in my life isn’t enough. Having you as my baby is already something I’m so thankful for. You’ll always be my babycake, my crush, kahit ikaw na yung akin ngayon. HAHAHA. Wala ka nang takas, ipagdadamot kita.

I just hope you never get tired of having me around. I hope you stay, I hope you keep choosing us, and I hope kahit maraming pag aaway, tampuhan, kulit, selos, and everything in between, we still find our way back to each other.

I love you, baby. I care about you more than I sometimes know how to say. And whatever happens, I’ll keep trying to be better for you.`;

/* ============================= HELPERS ============================= */

const $ = (sel) => document.querySelector(sel);
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const rand = (min, max) => Math.random() * (max - min) + min;
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initials(name) {
  return name.trim().charAt(0).toUpperCase();
}

/* ---------- sound library ---------- */

const SOUND_FILES = {
  uiClick: 'button-click.wav',
  controlTap: 'click-1133.wav',
  clawDrop: 'claw-drop.mp3',
  clawGrab: 'claw-grab.wav',
  clawMiss: 'claw-miss.wav',
  capsuleOpen: 'capsule-open.wav',
  prizeWin: 'prize-win.wav',
  finalReveal: 'final-reveal.wav',
  timelineClick: 'timeline-click.wav',
  clawMove: 'claw-move.mp3',
  bgMusic: 'bg-musix.mp3',
};

function playSfx(key, volume) {
  if (!GAME_CONFIG.soundEnabled) return null;
  const file = SOUND_FILES[key];
  if (!file) return null;
  try {
    const audio = new Audio(`sounds/${file}`);
    audio.volume = volume ?? 0.55;
    audio.play().catch(() => {});
    return audio;
  } catch (e) {
    return null;
  }
}

let bgMusicAudio = null;
function startBackgroundMusic() {
  if (bgMusicAudio) return;
  try {
    bgMusicAudio = new Audio(`sounds/${SOUND_FILES.bgMusic}`);
    bgMusicAudio.loop = true;
    bgMusicAudio.volume = 0.25;
    bgMusicAudio.muted = !GAME_CONFIG.soundEnabled;
    bgMusicAudio.play().catch(() => {});
  } catch (e) {}
}

let moveAudio = null;
function startMoveSound() {
  if (!GAME_CONFIG.soundEnabled || moveAudio) return;
  try {
    moveAudio = new Audio(`sounds/${SOUND_FILES.clawMove}`);
    moveAudio.loop = true;
    moveAudio.volume = 0.32;
    moveAudio.play().catch(() => {});
  } catch (e) {}
}
function stopMoveSound() {
  if (moveAudio) {
    moveAudio.pause();
    moveAudio = null;
  }
}
function updateMoveSoundState() {
  if ((state.leftHeld || state.rightHeld) && !state.isDropping) {
    startMoveSound();
  } else {
    stopMoveSound();
  }
}

function toggleSound() {
  GAME_CONFIG.soundEnabled = !GAME_CONFIG.soundEnabled;
  if (bgMusicAudio) bgMusicAudio.muted = !GAME_CONFIG.soundEnabled;
  if (!GAME_CONFIG.soundEnabled) stopMoveSound();
  const btn = $('#btnSoundToggle');
  if (btn) btn.classList.toggle('muted', !GAME_CONFIG.soundEnabled);
}

$('#btnSoundToggle').addEventListener('click', toggleSound);

/* ============================= SCREEN MANAGEMENT ============================= */

const screens = document.querySelectorAll('.screen');

function showScreen(name) {
  screens.forEach((s) => {
    if (s.dataset.screen === name) {
      s.classList.remove('screen--active');
      void s.offsetWidth;
      s.classList.add('screen--active');
    } else {
      s.classList.remove('screen--active');
    }
  });
}

/* ============================= FLOATING BACKGROUND HEARTS ============================= */

function spawnBackgroundHeart() {
  const container = $('#floatingHearts');
  const heart = document.createElement('span');
  heart.className = 'fheart';
  heart.textContent = Math.random() < 0.5 ? '♥' : '✦';
  heart.style.left = rand(2, 96) + '%';
  heart.style.setProperty('--drift', rand(-40, 40) + 'px');
  const duration = rand(9, 16);
  heart.style.animationDuration = duration + 's';
  heart.style.fontSize = rand(0.8, 1.6) + 'rem';
  container.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000 + 200);
}
setInterval(spawnBackgroundHeart, 1500);
for (let i = 0; i < 5; i++) setTimeout(spawnBackgroundHeart, i * 400);

/* ============================= CLAW MACHINE STATE ============================= */

const cabinetGlass = $('.cabinet-glass');
const clawRig = $('#clawRig');
const clawEl = $('#claw');
const cableEl = $('#cable');
const stageEl = $('#stage');
const attemptsCountEl = $('#attemptsCount');
const toastEl = $('#toast');

const TOTAL_REGULAR = PRIZES.filter((p) => !p.final).length;

const state = {
  clawX: 50,
  isDropping: false,
  attempts: 0,
  moveDir: 0,
  leftHeld: false,
  rightHeld: false,
  finalUnlocked: false,
};

function collectedRegularCount() {
  return PRIZES.filter((p) => !p.final && p.wonAlready).length;
}

function updateProgressDisplay() {
  const el = $('#progressCount');
  if (el) el.textContent = `${collectedRegularCount()} / ${TOTAL_REGULAR}`;
  const tray = document.querySelectorAll('.tray-dot:not(.tray-dot--final)');
  tray.forEach((dot) => {
    const id = dot.dataset.id;
    const prize = PRIZES.find((p) => p.id === id);
    dot.classList.toggle('tray-dot--unlocked', !!(prize && prize.wonAlready));
  });
  const finalDot = document.querySelector('.tray-dot--final');
  if (finalDot) {
    finalDot.classList.toggle('tray-dot--ready', state.finalUnlocked);
    const finalPrize = PRIZES.find((p) => p.final);
    finalDot.classList.toggle('tray-dot--unlocked', !!(finalPrize && finalPrize.wonAlready));
  }
}

function buildTray() {
  const tray = $('#collectionTray');
  if (!tray) return;
  tray.innerHTML = '';
  PRIZES.filter((p) => !p.final).forEach((p) => {
    const dot = document.createElement('span');
    dot.className = 'tray-dot';
    dot.dataset.id = p.id;
    tray.appendChild(dot);
  });
  const finalDot = document.createElement('span');
  finalDot.className = 'tray-dot tray-dot--final';
  tray.appendChild(finalDot);
  updateProgressDisplay();
}

let toastTimer = null;
function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
}

function updateAttemptsDisplay() {
  attemptsCountEl.textContent = state.attempts;
}

/* ---------- capsule layout ---------- */

function generateLayout() {
  const cols = 4;
  const rows = Math.ceil(PRIZES.length / cols);
  const cellW = 74 / cols;
  const cellH = 34 / rows;
  const slots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseX = 13 + c * cellW + cellW / 2;
      const baseY = 52 + r * cellH + cellH / 2;
      slots.push({
        x: clamp(baseX + rand(-cellW * 0.3, cellW * 0.3), 10, 90),
        y: clamp(baseY + rand(-cellH * 0.28, cellH * 0.28), 48, 92),
      });
    }
  }
  shuffle(slots);
  PRIZES.forEach((p, i) => {
    p.x = slots[i].x;
    p.y = slots[i].y;
    p.rotation = rand(-10, 10);
    p.grabOffsetX = rand(-3, 3);
    p.wonAlready = false;
    p.el = null;
  });
}

function createCapsuleElement(prize) {
  const el = document.createElement('div');
  el.className = `capsule capsule--${prize.rarity}`;
  el.style.left = prize.x + '%';
  el.style.top = prize.y + '%';
  el.style.width = prize.sizeVmin + 'vmin';
  el.style.height = prize.sizeVmin + 'vmin';
  el.style.animationDelay = rand(0, 2) + 's';
  el.style.setProperty('--rot', prize.rotation + 'deg');

  const top = document.createElement('div');
  top.className = 'capsule__top';
  el.appendChild(top);

  // Mystery marker only — never reveal which prize is inside before it's won.
  const mystery = document.createElement('div');
  mystery.className = 'capsule__mystery';
  mystery.textContent = prize.final ? '♥' : '?';
  el.appendChild(mystery);

  prize.el = el;
  return el;
}

function renderCapsules() {
  stageEl.innerHTML = '';
  PRIZES.filter((p) => !p.wonAlready && (!p.final || state.finalUnlocked)).forEach((p) => {
    stageEl.appendChild(createCapsuleElement(p));
  });
}

/* ---------- claw vertical movement ---------- */

function getCabinetHeight() {
  return cabinetGlass.getBoundingClientRect().height;
}

function lowerClaw() {
  const targetPx = getCabinetHeight() * 0.66;
  cableEl.style.height = targetPx + 'px';
  clawEl.style.top = targetPx + 'px';
}

function raiseClaw() {
  cableEl.style.height = '14px';
  clawEl.style.top = '14px';
}

/* ---------- horizontal movement loop ---------- */

let lastTime = null;
function movementLoop(timestamp) {
  if (lastTime === null) lastTime = timestamp;
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  const dir = (state.rightHeld ? 1 : 0) + (state.leftHeld ? -1 : 0);
  if (!state.isDropping && dir !== 0) {
    state.clawX = clamp(state.clawX + dir * GAME_CONFIG.clawSpeed * dt, GAME_CONFIG.clawMinX, GAME_CONFIG.clawMaxX);
    clawRig.style.left = state.clawX + '%';
  }
  requestAnimationFrame(movementLoop);
}
requestAnimationFrame(movementLoop);

/* ---------- grab detection ---------- */

function tryGrabCapsule(clawX) {
  const candidates = PRIZES.filter((p) => !p.wonAlready && (!p.final || state.finalUnlocked));
  let best = null;
  let bestDist = Infinity;

  candidates.forEach((p) => {
    const dist = Math.abs(p.x - clawX);
    const radius = p.collisionRadius + GAME_CONFIG.grabRadiusBonus;
    if (dist <= radius && dist < bestDist) {
      best = p;
      bestDist = dist;
    }
  });

  if (!best) return null;

  const radius = best.collisionRadius + GAME_CONFIG.grabRadiusBonus;
  const precision = 1 - bestDist / radius; // 0..1, higher = more centered
  const baseChance = 0.35 + precision * 0.6; // 0.35 - 0.95
  const chance = clamp(baseChance / best.difficulty, 0.04, 0.95);

  if (Math.random() < chance) {
    return best;
  }

  if (best.el) {
    best.el.classList.remove('nudge');
    void best.el.offsetWidth;
    best.el.classList.add('nudge');
  }
  return null;
}

/* ---------- attach / release ---------- */

function attachCapsuleToClaw(prize) {
  prize.wonAlready = true;
  const el = prize.el;
  if (!el) return;
  el.classList.add('grabbed');
  clawEl.appendChild(el);
  el.style.left = `calc(50% + ${prize.grabOffsetX}px)`;
  el.style.top = '40px';
  el.style.width = (prize.sizeVmin * 0.62) + 'vmin';
  el.style.height = (prize.sizeVmin * 0.62) + 'vmin';
  el.style.transform = 'translate(-50%,0)';
  el.style.animation = 'none';
}

async function moveClawToChute() {
  clawRig.classList.add('auto-move');
  clawRig.style.left = GAME_CONFIG.chuteX + '%';
  state.clawX = GAME_CONFIG.chuteX;
  await wait(GAME_CONFIG.dropSpeed + 100);
  clawRig.classList.remove('auto-move');
}

async function releaseIntoChute(prize) {
  const el = prize.el;
  if (!el) return;
  el.style.transition = 'transform .5s cubic-bezier(.4,0,.7,1), opacity .5s ease';
  el.style.transform = 'translate(-50%, 60px) scale(.5)';
  el.style.opacity = '0';
  await wait(500);
  el.remove();
}

/* ---------- full drop sequence ---------- */

async function performDrop() {
  if (state.isDropping) return;
  state.isDropping = true;
  stopMoveSound();

  clawEl.classList.remove('closed');
  clawEl.classList.add('open');
  playSfx('clawDrop', 0.5);
  await wait(160);

  lowerClaw();
  await wait(GAME_CONFIG.dropSpeed + 60);

  const grabbed = tryGrabCapsule(state.clawX);

  clawEl.classList.remove('open');
  clawEl.classList.add('closed');
  playSfx(grabbed ? 'clawGrab' : 'clawMiss', 0.6);
  await wait(260);

  if (grabbed) attachCapsuleToClaw(grabbed);

  raiseClaw();
  await wait(GAME_CONFIG.dropSpeed + 60);

  if (grabbed) {
    await moveClawToChute();
    await wait(150);
    playSfx('capsuleOpen', 0.55);
    await releaseIntoChute(grabbed);
  }

  clawEl.classList.remove('closed');
  state.attempts++;
  updateAttemptsDisplay();
  state.isDropping = false;
  updateMoveSoundState();

  if (grabbed) {
    updateProgressDisplay();
    if (grabbed.final) {
      await wait(250);
      launchFinalSequence();
    } else {
      showToast('YOU GOT IT!');
      await wait(200);
      playSfx('prizeWin', 0.6);
      showPrizeModal(grabbed);
    }
  } else {
    showToast('Almost baby HAHAHA');
  }
}

function maybeUnlockFinal() {
  if (state.finalUnlocked) return;
  if (collectedRegularCount() < TOTAL_REGULAR) return;
  state.finalUnlocked = true;
  showToast('Baby, you got them all...');
  updateProgressDisplay();
  setTimeout(() => {
    renderCapsules();
  }, 900);
}

/* ============================= PRIZE MODAL ============================= */

const prizeModal = $('#prizeModal');
const prizeImage = $('#prizeImage');
const prizeName = $('#prizeName');
const prizeMessage = $('#prizeMessage');
const prizeRarity = $('#prizeRarity');

function showPrizeModal(prize) {
  prizeName.textContent = prize.name;
  prizeMessage.textContent = prize.message;
  prizeRarity.textContent = prize.rarity;
  prizeImage.style.display = 'block';
  prizeImage.src = prize.image;
  prizeImage.alt = prize.name;
  prizeImage.onerror = () => {
    prizeImage.style.display = 'none';
    let fb = prizeImage.parentElement.querySelector('.capsule__fallback');
    if (!fb) {
      fb = document.createElement('div');
      fb.className = 'capsule__fallback';
      fb.style.width = '100%';
      fb.style.height = '100%';
      prizeImage.parentElement.appendChild(fb);
    }
    fb.textContent = initials(prize.name);
  };
  prizeModal.classList.add('show');
}

$('#btnPrizeContinue').addEventListener('click', () => {
  playSfx('uiClick', 0.5);
  prizeModal.classList.remove('show');
  maybeUnlockFinal();
});

/* ============================= FINAL SEQUENCE ============================= */

let finalBurstInterval = null;

function spawnFinalBurst() {
  const container = $('#finalParticles');
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('span');
    const isHeart = Math.random() < 0.6;
    el.textContent = isHeart ? '♥' : '✦';
    el.style.position = 'absolute';
    el.style.left = rand(10, 90) + '%';
    el.style.top = rand(20, 90) + '%';
    el.style.fontSize = rand(0.9, 2.1) + 'rem';
    el.style.color = isHeart ? '#ffb6d9' : '#ffe6a8';
    el.style.opacity = '0';
    el.style.animation = `particleFloat ${rand(1.6, 2.4)}s ease-out forwards`;
    el.style.textShadow = '0 0 12px rgba(255,215,130,.8)';
    container.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }
}

function launchFinalSequence() {
  showScreen('final');
  playSfx('finalReveal', 0.7);
  ['finalLine1', 'finalLine2', 'finalLine3'].forEach((id) => {
    const el = document.getElementById(id);
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
  const btn = $('#btnOpenLetter');
  btn.style.animation = 'none';
  void btn.offsetWidth;
  btn.style.animation = '';

  clearInterval(finalBurstInterval);
  finalBurstInterval = setInterval(spawnFinalBurst, 450);
}

$('#btnOpenLetter').addEventListener('click', () => {
  playSfx('uiClick', 0.5);
  clearInterval(finalBurstInterval);
  buildLetter();
  showScreen('letter');
});

/* ============================= LETTER ============================= */

let letterBuilt = false;
function buildLetter() {
  if (letterBuilt) return;
  letterBuilt = true;
  $('#letterText').textContent = LETTER_TEXT;
}

$('#btnLetterContinue').addEventListener('click', () => {
  playSfx('uiClick', 0.5);
  buildTimeline();
  showScreen('timeline');
  setTimeout(setupTimelineObserver, 60);
});

/* ============================= TIMELINE ============================= */

let timelineBuilt = false;
function buildTimeline() {
  if (timelineBuilt) return;
  timelineBuilt = true;
  const container = $('#timeline');

  MILESTONES.forEach((m) => {
    const item = document.createElement('div');
    item.className = 'tl-item' + (m.special ? ' tl-item--special' : '');

    const dot = document.createElement('span');
    dot.className = 'tl-dot';
    dot.textContent = '♥';
    item.appendChild(dot);

    const card = document.createElement('div');
    card.className = 'tl-card';

    if (m.date) {
      const date = document.createElement('p');
      date.className = 'tl-date';
      date.textContent = m.date;
      card.appendChild(date);
    }

    const title = document.createElement('h3');
    title.className = 'tl-title';
    title.textContent = m.title;
    card.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'tl-subtitle';
    subtitle.textContent = m.subtitle;
    card.appendChild(subtitle);

    if (m.description) {
      const desc = document.createElement('p');
      desc.className = 'tl-desc';
      desc.textContent = m.description;
      card.appendChild(desc);
    }

    if (m.current) {
      const btn = document.createElement('button');
      btn.className = 'tl-link';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.textContent = m.buttonText;
      btn.addEventListener('click', () => {
        playSfx('uiClick', 0.5);
        resetGame();
      });
      card.appendChild(btn);
    } else {
      const link = document.createElement('a');
      link.className = 'tl-link';
      link.textContent = m.buttonText;
      link.href = m.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.addEventListener('click', () => {
        playSfx('timelineClick', 0.5);
      });
      card.appendChild(link);
    }

    item.appendChild(card);
    container.appendChild(item);
  });
}

function setupTimelineObserver() {
  const items = document.querySelectorAll('.tl-item');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

$('#btnPlayAgainFinal').addEventListener('click', () => {
  playSfx('uiClick', 0.5);
  resetGame();
});

/* ============================= GAME RESET / INIT ============================= */

function resetGame() {
  state.attempts = 0;
  state.finalUnlocked = false;
  PRIZES.forEach((p) => { p.wonAlready = false; });
  updateAttemptsDisplay();
  generateLayout();
  renderCapsules();
  buildTray();
  state.clawX = 50;
  clawRig.style.left = '50%';
  clawEl.classList.remove('open', 'closed');
  raiseClaw();
  prizeModal.classList.remove('show');
  showScreen('game');
}

/* ============================= CONTROLS ============================= */

$('#btnStart').addEventListener('click', () => {
  playSfx('uiClick', 0.5);
  startBackgroundMusic();
  resetGame();
});

const btnLeft = $('#btnLeft');
const btnRight = $('#btnRight');
const btnDrop = $('#btnDrop');

function bindHold(btn, onDown, onUp) {
  const down = (e) => { e.preventDefault(); onDown(); };
  const up = (e) => { onUp(); };
  btn.addEventListener('pointerdown', down);
  btn.addEventListener('pointerup', up);
  btn.addEventListener('pointerleave', up);
  btn.addEventListener('pointercancel', up);
  btn.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
}

bindHold(btnLeft, () => {
  state.leftHeld = true;
  playSfx('controlTap', 0.4);
  updateMoveSoundState();
}, () => {
  state.leftHeld = false;
  updateMoveSoundState();
});
bindHold(btnRight, () => {
  state.rightHeld = true;
  playSfx('controlTap', 0.4);
  updateMoveSoundState();
}, () => {
  state.rightHeld = false;
  updateMoveSoundState();
});

btnDrop.addEventListener('click', () => {
  playSfx('controlTap', 0.4);
  performDrop();
});

window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (e.key === 'ArrowLeft') { state.leftHeld = true; updateMoveSoundState(); }
  if (e.key === 'ArrowRight') { state.rightHeld = true; updateMoveSoundState(); }
  if (e.code === 'Space') { e.preventDefault(); performDrop(); }
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') { state.leftHeld = false; updateMoveSoundState(); }
  if (e.key === 'ArrowRight') { state.rightHeld = false; updateMoveSoundState(); }
});

document.addEventListener('touchmove', (e) => {
  if (document.querySelector('#screen-game.screen--active')) {
    if (e.target.closest('.controls')) e.preventDefault();
  }
}, { passive: false });

/* ============================= INITIAL SETUP ============================= */

generateLayout();
buildTray();
raiseClaw();
