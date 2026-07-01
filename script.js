// ============================================
// LAKSHYAN KONATHALA – ANIMATIONS & NAV LOGIC
// ============================================

// Force scroll to top on refresh/load to show entrance animations
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const ANIM_DURATION = 1500; // ms to wait before navigating

// Global Mute State
window.globalIsMuted = false;

(function initMuteToggle() {
  const muteBtn = document.getElementById('global-mute-toggle');
  const iconVol = document.getElementById('mute-icon-vol');
  const iconMuted = document.getElementById('mute-icon-muted');
  
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      window.globalIsMuted = !window.globalIsMuted;
      if (window.globalIsMuted) {
        iconVol.style.display = 'none';
        iconMuted.style.display = 'inline-block';
        muteBtn.style.background = 'rgba(239, 68, 68, 0.8)';
      } else {
        iconVol.style.display = 'inline-block';
        iconMuted.style.display = 'none';
        muteBtn.style.background = 'rgba(20, 20, 30, 0.85)';
      }
    });
  }
})();

function triggerBasketball(e) {
  e.preventDefault();
  const icon = document.getElementById('bball-icon');
  const el = icon.querySelector('.sport-icon');
  animateAndNavigate(el, 'anim-basketball', '#basketball');
}

function triggerFootball(e) {
  e.preventDefault();
  const icon = document.getElementById('fb-icon');
  const el = icon.querySelector('.sport-icon');
  el.classList.add('anim-football');

  launchFootball(() => {
    navigateTo('#football');
    setTimeout(() => { el.classList.remove('anim-football'); }, 200);
  });
}

function triggerPiano(e) {
  e.preventDefault();
  const icon = document.getElementById('piano-icon');
  const el = icon.querySelector('.sport-icon');
  animateAndNavigate(el, 'anim-piano', '#piano');
}

function triggerAbacus(e) {
  e.preventDefault();
  const icon = document.getElementById('abacus-icon');
  const el = icon.querySelector('.sport-icon');
  animateAndNavigate(el, 'anim-abacus', '#abacus');
}

function triggerTaekwondo(e) {
  e.preventDefault();
  const icon = document.getElementById('tkd-icon');
  const el = icon.querySelector('.sport-icon');
  animateAndNavigate(el, 'anim-taekwondo', '#taekwondo');
}

function triggerRobotics(e) {
  e.preventDefault();
  const icon = document.getElementById('robot-icon');
  const el = icon.querySelector('.sport-icon');
  animateAndNavigate(el, 'anim-robot', '#robotics');
}

function triggerHobbies(e) {
  e.preventDefault();
  navigateTo('#hobbies'); // Instantly navigate Hobbies with no animation
}

function triggerScratch(e) {
  e.preventDefault();
  const icon = document.getElementById('scratch-icon');
  const el = icon.querySelector('.sport-icon');
  animateAndNavigate(el, 'anim-scratch', '#scratch');
}

function triggerRewards(e) {
  e.preventDefault();
  const icon = document.getElementById('rewards-icon');
  const el = icon.querySelector('.sport-icon');
  animateAndNavigate(el, 'anim-rewards', '#rewards');
}

// -------------------------------------------------------
// Generic animate + scroll to section
// -------------------------------------------------------
function animateAndNavigate(el, animClass, targetId) {
  el.classList.remove(animClass);
  void el.offsetWidth; // reflow
  el.classList.add(animClass);

  setTimeout(() => {
    navigateTo(targetId);
    setTimeout(() => {
      el.classList.remove(animClass);
    }, 400);
  }, ANIM_DURATION);
}

// -------------------------------------------------------
// Football: launch a ball flying across the entire screen
// -------------------------------------------------------
function launchFootball(callback) {
  const ball = document.createElement('div');
  ball.style.cssText = `
    position: fixed;
    top: 50%;
    left: -80px;
    transform: translateY(-50%);
    z-index: 99999;
    pointer-events: none;
    width: 70px;
    height: 70px;
    transition: none;
  `;
  ball.innerHTML = `
    <svg viewBox="0 0 64 64" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32" rx="22" ry="14" fill="#8B4513" stroke="#5a2d0c" stroke-width="2"/>
      <line x1="20" y1="32" x2="44" y2="32" stroke="white" stroke-width="2"/>
      <line x1="26" y1="27" x2="26" y2="37" stroke="white" stroke-width="2"/>
      <line x1="32" y1="25" x2="32" y2="39" stroke="white" stroke-width="2"/>
      <line x1="38" y1="27" x2="38" y2="37" stroke="white" stroke-width="2"/>
    </svg>
  `;
  document.body.appendChild(ball);

  requestAnimationFrame(() => {
    ball.style.transition = 'left 1s cubic-bezier(0.25,0.46,0.45,0.94), transform 1s ease, opacity 0.3s ease';
    ball.style.left = (window.innerWidth + 100) + 'px';
    ball.style.transform = 'translateY(-50%) rotate(720deg)';
  });

  setTimeout(() => {
    ball.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(ball);
      if (callback) callback();
    }, 300);
  }, 900);
}

// -------------------------------------------------------
// Smooth scroll helper
// -------------------------------------------------------
function navigateTo(hash) {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// -------------------------------------------------------
// Intersection Observer: animate sections on scroll in
// -------------------------------------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .card').forEach(el => {
  observer.observe(el);
});

// -------------------------------------------------------
// Abacus: continuously animate beads on the nav icon
// -------------------------------------------------------
function startAbacusAnimation() {
  const beads = document.querySelectorAll('.abacus-svg .abacus-bead');
  if (!beads.length) return;

  let dir = 1;
  let offset = 0;

  setInterval(() => {
    offset = dir * 6;
    dir *= -1;
    beads.forEach((bead, i) => {
      const delay = i * 60;
      setTimeout(() => {
        const cy = parseFloat(bead.getAttribute('cy'));
        bead.style.transition = 'transform 0.4s ease';
        bead.style.transform = `translateY(${offset * (i % 2 === 0 ? 1 : -1)}px)`;
      }, delay);
    });
  }, 1200);
}

// Start ambient abacus idle animation & force scroll to top
window.addEventListener('load', () => {
  startAbacusAnimation();
  window.scrollTo(0, 0);
});

window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
});

// -------------------------------------------------------
// Particle background (floating dots on hero)
// -------------------------------------------------------
(function createHeroParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 10 + 8;
    const delay = Math.random() * -15;
    const opacity = Math.random() * 0.3 + 0.05;

    dot.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: ${opacity};
      animation: floatDot ${dur}s ${delay}s ease-in-out infinite;
      pointer-events: none;
    `;
    hero.appendChild(dot);
  }

  // Add keyframes if not already added
  if (!document.getElementById('particle-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
      @keyframes floatDot {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: var(--op, 0.1); }
        33% { transform: translateY(-20px) translateX(10px); }
        66% { transform: translateY(10px) translateX(-10px); }
      }
      .section { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .section.in-view { opacity: 1; transform: translateY(0); }
      .card { opacity: 0; transform: translateY(25px); transition: opacity 0.6s ease, transform 0.6s ease; }
      .card.in-view { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(style);
  }
})();

// -------------------------------------------------------
// Settings Panel
// -------------------------------------------------------
(function initSettings() {
  const toggle = document.getElementById('settings-toggle');
  const panel = document.getElementById('settings-panel');
  const overlay = document.getElementById('settings-overlay');
  const closeBtn = document.getElementById('settings-close');

  function openPanel() {
    panel.classList.add('open');
    overlay.classList.add('open');
  }
  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
  }

  toggle.addEventListener('click', () => {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  // --- Font Toggle ---
  const fontDefault = document.getElementById('font-default');
  const fontDyslexic = document.getElementById('font-dyslexic');

  function setFont(mode) {
    if (mode === 'dyslexic') {
      document.body.classList.add('dyslexic-font');
      fontDyslexic.classList.add('active');
      fontDefault.classList.remove('active');
    } else {
      document.body.classList.remove('dyslexic-font');
      fontDefault.classList.add('active');
      fontDyslexic.classList.remove('active');
    }
    localStorage.setItem('lk-font', mode);
  }

  fontDefault.addEventListener('click', () => setFont('default'));
  fontDyslexic.addEventListener('click', () => setFont('dyslexic'));

  // --- Background Toggle ---
  const bgDark = document.getElementById('bg-dark');
  const bgLight = document.getElementById('bg-light');

  function setBg(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      bgLight.classList.add('active');
      bgDark.classList.remove('active');
    } else {
      document.body.classList.remove('light-mode');
      bgDark.classList.add('active');
      bgLight.classList.remove('active');
    }
    localStorage.setItem('lk-bg', mode);
  }

  bgDark.addEventListener('click', () => setBg('dark'));
  bgLight.addEventListener('click', () => setBg('light'));

  // --- Restore saved preferences ---
  const savedFont = localStorage.getItem('lk-font');
  const savedBg = localStorage.getItem('lk-bg');
  if (savedFont) setFont(savedFont);
  if (savedBg) setBg(savedBg);
})();

// -------------------------------------------------------
// Interactive Piano Sound Synthesis & Event Listeners
// -------------------------------------------------------
(function initPiano() {
  let audioCtx = null;
  let currentOctave = 4; // Default medium octave (C4-C5)
  let currentInstrument = 'piano'; // piano, edm, violin

  // Ensure AudioContext is loaded and running on first click/keypress
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.addEventListener('click', initAudio, { once: true });
  window.addEventListener('keydown', initAudio, { once: true });

  function playTone(freq) {
    if (window.globalIsMuted) return;
    try {
      initAudio();
      
      const t = audioCtx.currentTime;
      
      // Fundamental (Triangle wave for warmth)
      const osc = audioCtx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      // Overtone (Sine wave one octave up for brightness)
      const osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = freq * 2;
      
      const gainNode = audioCtx.createGain();
      const gainNode2 = audioCtx.createGain();
      const masterGain = audioCtx.createGain();
      
      osc.connect(gainNode);
      osc2.connect(gainNode2);
      gainNode.connect(masterGain);
      gainNode2.connect(masterGain);
      masterGain.connect(audioCtx.destination);
      
      if (currentInstrument === 'piano') {
        osc.type = 'triangle';
        osc2.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.setTargetAtTime(1, t, 0.015);
        gainNode.gain.setTargetAtTime(0, t + 0.1, 0.6); // Long decay like a piano string
        
        gainNode2.gain.setValueAtTime(0, t);
        gainNode2.gain.setTargetAtTime(0.3, t, 0.01);
        gainNode2.gain.setTargetAtTime(0, t + 0.05, 0.2); 
        
        masterGain.gain.value = 0.8; 
      } else if (currentInstrument === 'edm') {
        osc.type = 'sawtooth';
        osc2.type = 'square';
        
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.setTargetAtTime(1, t, 0.01);
        gainNode.gain.setTargetAtTime(0, t + 0.1, 0.3); // Punchy fast decay
        
        gainNode2.gain.setValueAtTime(0, t);
        gainNode2.gain.setTargetAtTime(0.5, t, 0.01);
        gainNode2.gain.setTargetAtTime(0, t + 0.1, 0.3);
        
        masterGain.gain.value = 0.3; // Much lower master volume because square/saw are loud
      } else if (currentInstrument === 'violin') {
        osc.type = 'sawtooth';
        osc2.type = 'sine';
        
        // Slow attack for a bowing sound
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.setTargetAtTime(1, t, 0.2);
        gainNode.gain.setTargetAtTime(0, t + 0.4, 0.8); 
        
        gainNode2.gain.setValueAtTime(0, t);
        gainNode2.gain.setTargetAtTime(0.4, t, 0.2);
        gainNode2.gain.setTargetAtTime(0, t + 0.4, 0.5); 
        
        masterGain.gain.value = 0.5; 
      }
      
      osc.start(t);
      osc2.start(t);
      
      // Stop oscillators cleanly after the sound has decayed completely
      osc.stop(t + 3);
      osc2.stop(t + 3);

      const debugEl = document.getElementById('audio-debug');
      if (debugEl) {
        debugEl.textContent = `State: ${audioCtx.state} | Freq: ${freq.toFixed(1)}Hz`;
        debugEl.style.color = audioCtx.state === 'running' ? '#22c55e' : '#ef4444';
      }

    } catch (e) {
      console.warn("Audio playback error:", e);
      const debugEl = document.getElementById('audio-debug');
      if (debugEl) debugEl.textContent = "Error: " + e.message;
    }
  }


  // Handle key triggers
  function triggerKey(keyEl) {
    if (!keyEl) return;
    const baseFreq = parseFloat(keyEl.getAttribute('data-note'));
    // Calculate shifted frequency based on chosen octave
    const freq = baseFreq * Math.pow(2, currentOctave - 4);
    playTone(freq);
    
    // Visual active animation
    keyEl.classList.add('piano-key-active');
    setTimeout(() => {
      keyEl.classList.remove('piano-key-active');
    }, 150);
  }

  // Click / Touch events for keys
  const keys = document.querySelectorAll('.piano-key');
  keys.forEach(key => {
    key.addEventListener('click', () => {
      initAudio();
      triggerKey(key);
    });
    key.addEventListener('touchstart', (e) => {
      e.preventDefault();
      initAudio();
      triggerKey(key);
    }, { passive: false });
  });

  // Octave buttons configuration
  const octaveBtns = document.querySelectorAll('.octave-btn');
  octaveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio();
      octaveBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentOctave = parseInt(btn.getAttribute('data-octave'));
    });
  });

  // Instrument buttons configuration
  const instBtns = document.querySelectorAll('.instrument-btn');
  instBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio();
      instBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentInstrument = btn.getAttribute('data-inst');
    });
  });

  // Physical keyboard support
  const keyMap = {
    'a': 'A', 's': 'S', 'd': 'D', 'f': 'F', 'g': 'G', 'h': 'H', 'j': 'J', 'k': 'K',
    'w': 'W', 'e': 'E', 't': 'T', 'y': 'Y', 'u': 'U',
    'A': 'A', 'S': 'S', 'D': 'D', 'F': 'F', 'G': 'G', 'H': 'H', 'J': 'J', 'K': 'K',
    'W': 'W', 'E': 'E', 'T': 'T', 'Y': 'Y', 'U': 'U'
  };

  window.addEventListener('keydown', (e) => {
    // Avoid playing piano notes if typing inside the math answer input box
    if (document.activeElement && document.activeElement.id === 'math-answer-input') {
      return;
    }
    const keyLabel = keyMap[e.key];
    if (keyLabel) {
      triggerKey(document.getElementById(`key-${keyLabel}`));
    }
  });
})();

// -------------------------------------------------------
// Interactive Abacus Lightning Math Game
// -------------------------------------------------------
(function initAbacusGame() {
  const startBtn = document.getElementById('start-math-btn');
  const gamePlayBox = document.getElementById('math-game-play');
  const num1El = document.getElementById('math-num1');
  const num2El = document.getElementById('math-num2');
  const opEl = document.getElementById('math-operator');
  const answerInput = document.getElementById('math-answer-input');
  const progressBar = document.getElementById('math-progress');
  const feedbackEl = document.getElementById('math-feedback');

  let score = 0;
  let currentAnswer = 0;
  let gameActive = false;
  let timerInterval = null;
  let timerDuration = 4000; // 4 seconds per question
  let timerStart = 0;

  function generateQuestion() {
    feedbackEl.textContent = '';
    answerInput.value = '';
    answerInput.focus();

    // 70% addition, 30% subtraction
    const isAddition = Math.random() > 0.3;
    let n1, n2;

    if (isAddition) {
      n1 = Math.floor(Math.random() * 80) + 10; // double digit 10-89
      n2 = Math.floor(Math.random() * 80) + 10;
      currentAnswer = n1 + n2;
      opEl.textContent = '+';
    } else {
      n1 = Math.floor(Math.random() * 90) + 10;
      n2 = Math.floor(Math.random() * (n1 - 5)) + 5; // make sure answer is positive
      currentAnswer = n1 - n2;
      opEl.textContent = '-';
    }

    num1El.textContent = n1;
    num2El.textContent = n2;

    // Reset progress bar
    progressBar.style.width = '100%';
    timerStart = Date.now();

    // Clear old timer interval
    if (timerInterval) clearInterval(timerInterval);

    // Start progress bar tick
    timerInterval = setInterval(() => {
      const elapsed = Date.now() - timerStart;
      const pct = Math.max(0, 100 - (elapsed / timerDuration) * 100);
      progressBar.style.width = `${pct}%`;

      if (elapsed >= timerDuration) {
        clearInterval(timerInterval);
        endGame(false); // Time out
      }
    }, 30);
  }

  function checkAnswer() {
    if (!gameActive) return;
    const userVal = parseInt(answerInput.value);
    if (userVal === currentAnswer) {
      score++;
      // Short correct flash
      feedbackEl.style.color = '#22c55e';
      feedbackEl.textContent = 'Correct! ⚡';
      // Load next question
      setTimeout(generateQuestion, 200);
    }
  }

  function startGame() {
    score = 0;
    gameActive = true;
    startBtn.style.display = 'none';
    gamePlayBox.style.display = 'block';
    generateQuestion();
  }

  function endGame(completed) {
    gameActive = false;
    clearInterval(timerInterval);
    answerInput.blur();

    progressBar.style.width = '0%';
    feedbackEl.style.color = '#ef4444';
    
    // Comparison messages comparing speed to Lakshyan
    let msg = `Game Over! You got <strong>${score}</strong> correct. `;
    if (score === 0) {
      msg += `Lakshyan would have solved 10 abacus addition problems in this time! 🧠`;
    } else if (score < 3) {
      msg += `Nice effort! But Lakshyan computes twice as fast using mental abacus math! ⚡`;
    } else if (score < 6) {
      msg += `Awesome speed! You're catching up to Lakshyan's abacus calculation speed! 🚀`;
    } else {
      msg += `WOW! You are an Abacus Master! You match Lakshyan's lightning mental math speed! 🏆`;
    }

    feedbackEl.innerHTML = msg;
    
    // Show restart button
    startBtn.textContent = 'Play Again 🔄';
    startBtn.style.display = 'inline-block';
  }

  startBtn.addEventListener('click', startGame);
  answerInput.addEventListener('input', checkAnswer);
})();
