/**
 * Main Application Logic for Riddhima & Ishu's Romantic Website
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Heart Canvas
  const heartEngine = new RomanticHeartCanvas('heartCanvas');

  // Replay Button
  const replayBtn = document.getElementById('replayHeartBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      heartEngine.restart();
    });
  }

  // 2. Background Floating Hearts & Rose Petals Canvas
  initBackgroundPetals();

  // 3. Relationship Milestone Counter (October 3, 2026)
  initLoveCounter();

  // 4. Romantic Audio Toggle
  initMusicController();

  // 5. Interactive Love Sparks on click
  initClickSparkles();
});

/**
 * Ambient Floating Rose Petals & Glowing Hearts Particle System
 */
function initBackgroundPetals() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(35, Math.floor(width / 35));

  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle(width, height, true));
  }

  function createParticle(w, h, randomY = false) {
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 20,
      size: Math.random() * 12 + 8,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.45 + 0.15,
      type: Math.random() > 0.4 ? 'heart' : 'glow', // heart or soft orb
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01
    };
  }

  function drawHeart(x, y, size, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
      -size / 2, -size / 2,
      -size, topCurveHeight / 3,
      0, size
    );
    // top right curve
    ctx.bezierCurveTo(
      size, topCurveHeight / 3,
      size / 2, -size / 2,
      0, topCurveHeight
    );
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 117, 143, ${opacity})`;
    ctx.shadowColor = 'rgba(230, 57, 86, 0.4)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
  }

  function drawGlow(x, y, size, opacity) {
    ctx.save();
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
    grad.addColorStop(0, `rgba(255, 182, 193, ${opacity})`);
    grad.addColorStop(0.5, `rgba(230, 57, 86, ${opacity * 0.4})`);
    grad.addColorStop(1, 'rgba(230, 57, 86, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let time = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(time * p.swaySpeed + p.sway) * 0.3;
      p.rotation += p.rotationSpeed;

      if (p.type === 'heart') {
        drawHeart(p.x, p.y, p.size, p.opacity, p.rotation);
      } else {
        drawGlow(p.x, p.y, p.size * 1.5, p.opacity);
      }

      // Reset when floating out of top screen
      if (p.y < -30 || p.x < -40 || p.x > width + 40) {
        particles[i] = createParticle(width, height, false);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Milestone Relationship Counter starting October 3, 2026
 */
function initLoveCounter() {
  const startDate = new Date('2026-10-03T00:00:00');
  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');
  const headerSubtitleEl = document.getElementById('counterSubtitle');

  function update() {
    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();

    if (diffMs >= 0) {
      if (headerSubtitleEl) headerSubtitleEl.textContent = 'Every second with you is a dream come true ❤️';
      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
      // Countdown if prior to start date
      if (headerSubtitleEl) headerSubtitleEl.textContent = 'Counting down every precious moment to our forever ❤️';
      const futureSeconds = Math.floor(Math.abs(diffMs) / 1000);
      const days = Math.floor(futureSeconds / (3600 * 24));
      const hours = Math.floor((futureSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((futureSeconds % 3600) / 60);
      const seconds = futureSeconds % 60;

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
  }

  update();
  setInterval(update, 1000);
}

/**
 * Audio Controller Handler
 */
function initMusicController() {
  const music = new RomanticAudio();
  const toggleBtn = document.getElementById('audioToggleBtn');
  const label = document.getElementById('audioLabel');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isPlaying = music.toggle();
    if (isPlaying) {
      toggleBtn.classList.add('audio-playing');
      if (label) label.textContent = 'Playing Our Melody';
    } else {
      toggleBtn.classList.remove('audio-playing');
      if (label) label.textContent = 'Play Our Melody';
    }
  });
}

/**
 * Interactive glowing heart sparks on user click
 */
function initClickSparkles() {
  document.addEventListener('click', (e) => {
    // Avoid triggering sparkles directly on buttons
    if (e.target.closest('button') || e.target.closest('a')) return;

    for (let i = 0; i < 5; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-sparkle';
      spark.textContent = ['❤️', '✨', '💖', '🌸'][Math.floor(Math.random() * 4)];
      spark.style.position = 'fixed';
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999';
      spark.style.fontSize = `${Math.random() * 14 + 14}px`;
      spark.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
      document.body.appendChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 70 + 30;
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.4) rotate(${Math.random() * 60 - 30}deg)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 1000);
    }
  });
}
