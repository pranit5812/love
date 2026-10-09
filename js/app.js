/**
 * Main Application Script for Riddhima & pranit's Romantic Website
 * Handles Welcome screen, day counter, memories gallery with lightbox,
 * interactive love letter, reasons generator, and navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.ROMANTIC_CONFIG;
  if (!config) {
    console.error('ROMANTIC_CONFIG not loaded');
    return;
  }

  // 1. Welcome Screen Interaction
  initWelcomeScreen(config);

  // 2. Navigation Smooth Scrolling & Active State
  initNavigation();

  // 3. Heart Canvas Engine (Initialized after welcome open or immediately)
  let heartEngine = null;
  const startHeart = () => {
    if (!heartEngine) {
      heartEngine = new RomanticHeartCanvas('heartCanvas');
    }
  };

  const replayBtn = document.getElementById('replayHeartBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      if (heartEngine) heartEngine.restart();
    });
  }

  // 4. Ambient Background Petals
  initBackgroundPetals();

  // 5. Relationship Day Counter
  initDayCounter(config);

  // 6. Memories Gallery & Lightbox
  initMemoriesGallery(config);

  // 7. Interactive Love Letter
  initLoveLetter(config);

  // 8. Reasons I Love You
  initReasonsSection(config);

  // 9. Final Closing Message
  initClosingSection(config);

  // If welcome screen was already closed or bypassed, start heart
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (!welcomeScreen || welcomeScreen.classList.contains('hidden')) {
    startHeart();
  }

  // Expose startHeart for welcome transition
  window.triggerStartHeart = startHeart;
});

/**
 * 1. Welcome Screen
 */
function initWelcomeScreen(config) {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const openHeartBtn = document.getElementById('openHeartBtn');
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeIntro = document.getElementById('welcomeIntro');
  const welcomeBadge = document.getElementById('welcomeBadge');

  if (welcomeTitle) welcomeTitle.textContent = config.welcome.title;
  if (welcomeIntro) welcomeIntro.textContent = config.welcome.intro;
  if (welcomeBadge) welcomeBadge.textContent = config.welcome.badge;
  if (openHeartBtn && config.welcome.buttonText) {
    openHeartBtn.textContent = config.welcome.buttonText;
  }

  if (openHeartBtn && welcomeScreen) {
    openHeartBtn.addEventListener('click', () => {
      welcomeScreen.classList.add('fade-out');

      // Accessibility: respect reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const delay = prefersReducedMotion ? 50 : 600;

      setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        welcomeScreen.style.display = 'none';
        document.body.classList.remove('modal-open');
        if (window.triggerStartHeart) {
          window.triggerStartHeart();
        }
      }, delay);
    });
  }
}

/**
 * 2. Sticky Navigation
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * 3. Ambient Floating Petals & Hearts
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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Disable background movement for accessibility

  const particles = [];
  const particleCount = Math.min(30, Math.floor(width / 40));

  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle(width, height, true));
  }

  function createParticle(w, h, randomY = false) {
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 20,
      size: Math.random() * 11 + 7,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.12,
      type: Math.random() > 0.4 ? 'heart' : 'glow',
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01
    };
  }

  function drawHeart(x, y, size, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    const top = size * 0.3;
    ctx.moveTo(0, top);
    ctx.bezierCurveTo(-size / 2, -size / 2, -size, top / 3, 0, size);
    ctx.bezierCurveTo(size, top / 3, size / 2, -size / 2, 0, top);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 117, 143, ${opacity})`;
    ctx.shadowColor = 'rgba(230, 57, 86, 0.35)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  }

  function drawGlow(x, y, size, opacity) {
    ctx.save();
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
    grad.addColorStop(0, `rgba(255, 182, 193, ${opacity})`);
    grad.addColorStop(0.5, `rgba(230, 57, 86, ${opacity * 0.35})`);
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

      if (p.y < -30 || p.x < -40 || p.x > width + 40) {
        particles[i] = createParticle(width, height, false);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * 4. Relationship Day Counter
 */
function initDayCounter(config) {
  // Parse local date safely (e.g. 2026-10-03)
  const [year, month, day] = config.startDate.split('-').map(Number);
  const startLocalDate = new Date(year, month - 1, day, 0, 0, 0);

  const headlineEl = document.getElementById('counterHeadline');
  const countDaysEl = document.getElementById('countDays');
  const countHoursEl = document.getElementById('countHours');
  const countMinutesEl = document.getElementById('countMinutes');
  const countSecondsEl = document.getElementById('countSeconds');
  const daysSummaryMsgEl = document.getElementById('daysSummaryMsg');
  const milestoneTagEl = document.getElementById('milestoneDateTag');

  if (milestoneTagEl) {
    milestoneTagEl.textContent = config.counter.milestoneDisplay;
  }

  function update() {
    const now = new Date();
    const diffMs = now.getTime() - startLocalDate.getTime();
    const isPast = diffMs >= 0;

    const totalSeconds = Math.floor(Math.abs(diffMs) / 1000);
    const elapsedDays = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (countDaysEl) countDaysEl.textContent = elapsedDays;
    if (countHoursEl) countHoursEl.textContent = String(hours).padStart(2, '0');
    if (countMinutesEl) countMinutesEl.textContent = String(minutes).padStart(2, '0');
    if (countSecondsEl) countSecondsEl.textContent = String(seconds).padStart(2, '0');

    if (isPast) {
      if (headlineEl) headlineEl.textContent = `${config.counter.pastMessageTemplate} ${elapsedDays} Days`;
      if (daysSummaryMsgEl) {
        daysSummaryMsgEl.textContent = `I have loved you for ${elapsedDays} beautiful days — and every second counts ❤️`;
      }
    } else {
      if (headlineEl) headlineEl.textContent = `${config.counter.futureMessageTemplate}`;
      if (daysSummaryMsgEl) {
        daysSummaryMsgEl.textContent = `Counting down to our special milestone: ${elapsedDays} days to go ❤️`;
      }
    }
  }

  update();
  setInterval(update, 1000);
}

/**
 * 5. Memories Gallery & Lightbox
 */
function initMemoriesGallery(config) {
  const galleryGrid = document.getElementById('memoriesGrid');
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDate = document.getElementById('lightboxDate');
  const closeLightboxBtn = document.getElementById('closeLightbox');

  if (!galleryGrid) return;

  galleryGrid.innerHTML = '';

  config.memories.forEach((mem, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View photo memory: ${mem.title}`);

    // Create image with fallback container
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'memory-img-wrapper';

    const img = document.createElement('img');
    img.className = 'memory-img';
    img.src = mem.filename;
    img.alt = mem.alt || mem.title;
    img.loading = 'lazy';

    // Graceful fallback for missing photos
    const fallbackBox = document.createElement('div');
    fallbackBox.className = 'memory-fallback';
    fallbackBox.innerHTML = `
      <div class="fallback-icon">📷</div>
      <div class="fallback-title">${mem.title}</div>
      <div class="fallback-hint">Add photo to <code>${mem.filename}</code></div>
    `;

    img.addEventListener('load', () => {
      img.style.display = 'block';
      fallbackBox.style.display = 'none';
    });

    img.addEventListener('error', () => {
      img.style.display = 'none';
      fallbackBox.style.display = 'flex';
      card.classList.add('has-fallback');
    });

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(fallbackBox);

    // Caption Content
    const content = document.createElement('div');
    content.className = 'memory-content';
    content.innerHTML = `
      <div class="memory-meta">
        <span class="memory-date">${mem.date}</span>
        <span class="memory-num">#${index + 1}</span>
      </div>
      <h3 class="memory-title">${mem.title}</h3>
      <p class="memory-caption">${mem.caption}</p>
    `;

    card.appendChild(imgWrapper);
    card.appendChild(content);

    // Lightbox open trigger
    const openInLightbox = () => {
      if (lightbox) {
        // If the image is loaded, show it in lightbox; if not, show fallback title
        if (img.complete && img.naturalWidth > 0) {
          lightboxImg.src = mem.filename;
          lightboxImg.alt = mem.alt || mem.title;
          lightboxImg.style.display = 'block';
        } else {
          lightboxImg.style.display = 'none';
        }
        if (lightboxTitle) lightboxTitle.textContent = mem.title;
        if (lightboxDate) lightboxDate.textContent = mem.date;
        if (lightboxCaption) lightboxCaption.textContent = mem.caption;

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        if (closeLightboxBtn) closeLightboxBtn.focus();
      }
    };

    card.addEventListener('click', openInLightbox);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInLightbox();
      }
    });

    galleryGrid.appendChild(card);
  });

  // Lightbox Close Interactions
  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  };

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * 6. Interactive Love Letter
 */
function initLoveLetter(config) {
  const envelope = document.getElementById('letterEnvelope');
  const letterContent = document.getElementById('parchmentLetter');
  const toggleBtn = document.getElementById('toggleLetterBtn');
  const salutationEl = document.getElementById('letterSalutation');
  const bodyEl = document.getElementById('letterBodyText');
  const closingEl = document.getElementById('letterClosing');
  const signatureEl = document.getElementById('letterSignature');

  if (salutationEl) salutationEl.textContent = config.letter.salutation;
  if (closingEl) closingEl.textContent = config.letter.closing;
  if (signatureEl) signatureEl.textContent = config.letter.signature;

  if (bodyEl && Array.isArray(config.letter.paragraphs)) {
    bodyEl.innerHTML = config.letter.paragraphs
      .map(p => `<p>${p}</p>`)
      .join('');
  }

  let isOpen = false;

  const toggleLetter = () => {
    isOpen = !isOpen;
    if (isOpen) {
      if (envelope) envelope.classList.add('opened');
      if (letterContent) {
        letterContent.classList.add('unfolded');
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (toggleBtn) toggleBtn.innerHTML = '<span>✉️</span> Fold Letter';
    } else {
      if (envelope) envelope.classList.remove('opened');
      if (letterContent) letterContent.classList.remove('unfolded');
      if (toggleBtn) toggleBtn.innerHTML = '<span>💌</span> Open My Letter';
    }
  };

  if (toggleBtn) toggleBtn.addEventListener('click', toggleLetter);
  if (envelope) envelope.addEventListener('click', toggleLetter);
}

/**
 * 7. Reasons I Love You Section
 */
function initReasonsSection(config) {
  const grid = document.getElementById('reasonsGrid');
  const revealMoreBtn = document.getElementById('revealMoreReasonsBtn');
  if (!grid || !Array.isArray(config.reasons)) return;

  grid.innerHTML = '';

  const initialVisibleCount = 6;
  let currentlyShown = initialVisibleCount;

  function renderReasons() {
    grid.innerHTML = '';
    config.reasons.forEach((reason, index) => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      if (index >= currentlyShown) {
        card.classList.add('reason-hidden');
      }

      const numStr = String(index + 1).padStart(2, '0');
      card.innerHTML = `
        <div class="reason-badge">Reason #${numStr}</div>
        <h3 class="reason-title">${reason.title}</h3>
        <p class="reason-desc">${reason.description}</p>
      `;
      grid.appendChild(card);
    });

    if (revealMoreBtn) {
      if (currentlyShown >= config.reasons.length) {
        revealMoreBtn.textContent = 'All 12 Reasons Revealed ❤️';
        revealMoreBtn.disabled = true;
      } else {
        revealMoreBtn.textContent = `Reveal More Reasons (${config.reasons.length - currentlyShown} remaining) ✨`;
        revealMoreBtn.disabled = false;
      }
    }
  }

  renderReasons();

  if (revealMoreBtn) {
    revealMoreBtn.addEventListener('click', () => {
      currentlyShown = Math.min(config.reasons.length, currentlyShown + 6);
      renderReasons();
    });
  }
}

/**
 * 8. Closing Section
 */
function initClosingSection(config) {
  const closingEl = document.getElementById('finalClosingMessage');
  if (closingEl) {
    closingEl.textContent = config.closingMessage;
  }
}
