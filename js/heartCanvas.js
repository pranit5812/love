/**
 * Multilingual Parametric Heart Typography & Animation Engine
 * Preserves & extends the original algorithm from love.py to HTML5 Canvas
 * Personalized for Riddhima & pranit
 */

class RomanticHeartCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    const config = window.ROMANTIC_CONFIG || {
      partnerName: "Riddhima",
      senderName: "pranit"
    };

    const pName = config.partnerName;
    const sName = config.senderName;

    // Phrases: Original 20 multilingual languages + personalized romantic phrases
    this.phrases = [
      "I love you", `${pName} ❤️ ${sName}`, "Te amo", "Je t'aime",
      "Ich liebe dich", "Ti amo", "Eu te amo", "Я тебя люблю",
      "사랑해", "愛してる", "我爱你", "मैं तुमसे प्यार करता हूँ",
      "Σ' αγαπώ", "Ik hou van jou", "Jag älskar dig", "Kocham cię",
      "ฉันรักเธอ", "Anh yêu em", "Aku cinta kamu", "Я тебе кохаю",
      `I love you, ${pName}`, "Meri Jaan", "Forever & Always",
      "My Heart", pName, `${sName} ❤️ ${pName}`, "My Soulmate",
      "Tujhpe Fida", "Dil ki Dhadkan", "October 3, 2026", "Always Yours"
    ];

    this.sizes = [9, 10, 11, 12, 13];
    this.fontFamily = "'Plus Jakarta Sans', Arial, sans-serif";
    this.duration = 9; // Total spawn duration in seconds
    this.animFrames = 38;
    this.lift = 32;
    this.gap = 7;

    // Palette: romantic warm wine -> crimson -> glowing rose -> blush highlight
    this.wine = [0.65, 0.05, 0.22];
    this.crimson = [0.92, 0.12, 0.28];
    this.rose = [1.0, 0.28, 0.45];
    this.flashColor = [1.0, 0.82, 0.88];
    this.bgColor = [10 / 255, 4 / 255, 8 / 255]; // matches deep background

    this.placed = [];
    this.active = [];
    this.mainItems = [];
    this.shimmerTimer = null;
    this.animationFrameId = null;
    this.isRunning = false;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        this.restart();
      });
    } else {
      setTimeout(() => this.restart(), 200);
    }
  }

  handleResize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 800;
    this.height = rect.height || 600;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.resetTransform?.();
    this.ctx.scale(dpr, dpr);

    this.sc = Math.min(this.width, this.height) / 36.5;
    this.oy = 15;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  heartPoint(a) {
    const x = 16 * Math.pow(Math.sin(a), 3);
    const y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
    return [x * this.sc, y * this.sc + this.oy];
  }

  mix(a, b, k) {
    return [
      a[0] + (b[0] - a[0]) * k,
      a[1] + (b[1] - a[1]) * k,
      a[2] + (b[2] - a[2]) * k
    ];
  }

  rgbString(c, alpha = 1) {
    const r = Math.round(Math.max(0, Math.min(1, c[0])) * 255);
    const g = Math.round(Math.max(0, Math.min(1, c[1])) * 255);
    const b = Math.round(Math.max(0, Math.min(1, c[2])) * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  mathDist(x, y, cy) {
    return Math.hypot(x / (16 * this.sc), (y - cy) / (14.5 * this.sc));
  }

  buildHeartLayout() {
    const poly = [];
    const stepCount = 720;
    for (let i = 0; i < stepCount; i++) {
      poly.push(this.heartPoint((2 * Math.PI * i) / stepCount));
    }

    const edges = [];
    for (let i = 0; i < stepCount; i++) {
      edges.push([poly[i], poly[(i + 1) % stepCount]]);
    }

    let yMax = -Infinity;
    let yMin = Infinity;
    for (const p of poly) {
      if (p[1] > yMax) yMax = p[1];
      if (p[1] < yMin) yMin = p[1];
    }
    const cy = (yMax + yMin) / 2;

    const spans = (y) => {
      const xs = [];
      for (const [[x1, y1], [x2, y2]] of edges) {
        if ((y1 <= y && y < y2) || (y2 <= y && y < y1)) {
          xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1));
        }
      }
      xs.sort((a, b) => a - b);
      const res = [];
      for (let i = 0; i < xs.length; i += 2) {
        if (i + 1 < xs.length) {
          res.push([xs[i], xs[i + 1]]);
        }
      }
      return res;
    };

    const intersect = (A, B) => {
      const out = [];
      for (const a of A) {
        for (const b of B) {
          const lo = Math.max(a[0], b[0]);
          const hi = Math.min(a[1], b[1]);
          if (hi - lo > 16) {
            out.push([lo, hi]);
          }
        }
      }
      return out;
    };

    let phrasePool = [...this.phrases];
    const nextPhrase = () => {
      if (phrasePool.length === 0) {
        phrasePool = [...this.phrases];
      }
      const idx = Math.floor(Math.random() * phrasePool.length);
      return phrasePool.splice(idx, 1)[0];
    };

    const maxFontSize = Math.max(...this.sizes);
    const rowH = maxFontSize * 1.35 + 4;
    const half = rowH / 2;
    const placed = [];

    let y = yMax - half;
    while (y > yMin + half) {
      const row = intersect(spans(y + half), spans(y - half));

      for (let [lo, hi] of row) {
        lo += 4;
        hi -= 4;
        let cur = lo + Math.random() * 8;
        const line = [];

        while (true) {
          let fit = null;
          for (let attempt = 0; attempt < 12; attempt++) {
            const text = nextPhrase();
            const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
            this.ctx.font = `bold ${size}px ${this.fontFamily}`;
            const w = this.ctx.measureText(text).width;
            if (cur + w <= hi) {
              fit = { text, size, w };
              break;
            }
          }
          if (!fit) break;
          line.push([cur + fit.w / 2, fit.text, fit.size, fit.w]);
          cur += fit.w + this.gap;
        }

        if (line.length === 0) continue;

        if (line.length > 1) {
          const left = hi - (line[line.length - 1][0] + line[line.length - 1][3] / 2);
          for (let i = 0; i < line.length; i++) {
            line[i][0] += (left * i) / (line.length - 1);
          }
        } else {
          line[0][0] = (lo + hi) / 2;
        }

        for (let i = 0; i < line.length; i++) {
          const edge = (i === 0 || i === line.length - 1);
          const [xPos, text, size, w] = line[i];
          placed.push({ x: xPos, y: y, text, size, edge, w });
        }
      }
      y -= rowH;
    }

    for (const p of placed) {
      const rad = Math.min(1.0, this.mathDist(p.x, p.y, cy));
      let base = this.mix(this.wine, this.crimson, 0.25 + 0.75 * rad);
      const edgeBoost = p.edge ? 0.35 : 0;
      base = this.mix(base, this.rose, Math.random() * 0.35 + edgeBoost);
      p.color = base.map(v => Math.min(1, v));
      p.rad = rad;
      p.cy = cy;
    }

    const edgesList = placed.filter(p => p.edge);
    const innerList = placed.filter(p => !p.edge);

    edgesList.sort((a, b) => {
      const angA = (Math.atan2(a.x, a.y - cy) + 2 * Math.PI) % (2 * Math.PI);
      const angB = (Math.atan2(b.x, b.y - cy) + 2 * Math.PI) % (2 * Math.PI);
      return angA - angB;
    });

    innerList.sort((a, b) => (-a.rad + Math.random() * 0.08) - (-b.rad + Math.random() * 0.08));

    return edgesList.concat(innerList);
  }

  restart() {
    if (this.shimmerTimer) clearTimeout(this.shimmerTimer);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    this.handleResize();
    this.order = this.buildHeartLayout();
    this.itemsToSpawn = [...this.order];
    this.active = [];
    this.rendered = [];
    this.mainItems = [];

    // If reduced motion is requested, render instantly without animation ticks
    if (this.prefersReducedMotion) {
      for (const item of this.order) {
        item.currentX = item.x;
        item.currentY = -item.y;
        item.currentColor = [...item.color];
        item.isShimmering = false;
        this.rendered.push(item);
        this.mainItems.push(item);
      }
      this.redrawAll();
      return;
    }

    const totalTicks = (this.duration * 1000) / 16;
    this.rate = this.order.length / totalTicks;
    this.acc = 0.0;
    this.spawning = true;
    this.isRunning = true;

    this.runLoop();
  }

  spawn(p) {
    p.f = 0;
    p.dx = (Math.random() - 0.5) * 18;
    p.currentColor = [...p.color];
    p.isShimmering = false;
    this.active.push(p);
  }

  animate(p) {
    p.f += 1;
    const u = Math.min(1.0, Math.max(0.0, p.f / this.animFrames));
    const e = 1 - Math.pow(1 - u, 3);
    p.ease = e;
    p.u = u;

    const hover = (1 - e) * this.lift;
    p.currentX = p.x + p.dx * (1 - e);
    p.currentY = -p.y - hover;

    const flashProgress = Math.max(0.0, Math.min(1.0, (u - 0.55) / 0.45));
    const flashVal = 0.7 * Math.sin(Math.PI * flashProgress);
    const blendedColor = this.mix(this.mix(this.bgColor, p.color, Math.pow(e, 1.5)), this.flashColor, flashVal);
    p.currentColor = blendedColor;

    if (u >= 1.0) {
      p.currentX = p.x;
      p.currentY = -p.y;
      p.currentColor = [...p.color];
      this.rendered.push(p);
      this.mainItems.push(p);
      return false;
    }
    return true;
  }

  drawPhrase(p, isAnimated = false) {
    const drawX = this.centerX + p.currentX;
    const drawY = this.centerY + p.currentY;

    this.ctx.font = `bold ${p.size}px ${this.fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    if (isAnimated && p.u < 1) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      this.ctx.fillText(p.text, drawX + 1.5, drawY + 2);

      this.ctx.fillStyle = this.rgbString(p.currentColor, 0.25 * p.ease);
      this.ctx.fillText(p.text, drawX, drawY);
    }

    if (p.isShimmering) {
      this.ctx.shadowColor = 'rgba(255, 182, 193, 0.85)';
      this.ctx.shadowBlur = 10;
    }

    this.ctx.fillStyle = this.rgbString(p.currentColor, 1);
    this.ctx.fillText(p.text, drawX, drawY);

    if (p.isShimmering) {
      this.ctx.shadowBlur = 0;
    }
  }

  runLoop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.spawning) {
      this.acc += this.rate;
      while (this.acc >= 1 && this.itemsToSpawn.length > 0) {
        this.acc -= 1;
        this.spawn(this.itemsToSpawn.shift());
      }
      if (this.itemsToSpawn.length === 0) {
        this.spawning = false;
      }
    }

    for (let i = 0; i < this.rendered.length; i++) {
      this.drawPhrase(this.rendered[i], false);
    }

    this.active = this.active.filter(p => {
      const isAlive = this.animate(p);
      this.drawPhrase(p, true);
      return isAlive;
    });

    if (!this.spawning && this.active.length === 0) {
      this.startShimmer();
      return;
    }

    this.animationFrameId = requestAnimationFrame(() => this.runLoop());
  }

  startShimmer() {
    if (!this.isRunning || this.prefersReducedMotion) return;

    const triggerShimmer = () => {
      if (!this.isRunning || this.mainItems.length === 0) return;

      const count = Math.floor(Math.random() * 2) + 1;
      for (let k = 0; k < count; k++) {
        const item = this.mainItems[Math.floor(Math.random() * this.mainItems.length)];
        if (!item || item.isShimmering) continue;

        item.isShimmering = true;
        const originalColor = [...item.color];
        item.currentColor = this.mix(originalColor, this.flashColor, 0.7);

        this.redrawAll();

        setTimeout(() => {
          item.currentColor = originalColor;
          item.isShimmering = false;
          this.redrawAll();
        }, 280);
      }

      this.shimmerTimer = setTimeout(triggerShimmer, 180 + Math.random() * 120);
    };

    triggerShimmer();
  }

  redrawAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.rendered.length; i++) {
      this.drawPhrase(this.rendered[i], false);
    }
  }
}

window.RomanticHeartCanvas = RomanticHeartCanvas;
