/**
 * Romantic Ambient Audio Engine using Web Audio API
 * Generates soothing, romantic music box & piano harmonies
 * Zero external audio file dependencies - 100% reliable offline & online!
 */

class RomanticAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.currentNoteIndex = 0;

    // Romantic melody sequence (F major / D minor romantic progression)
    // F - C - Dm - Bb (Gentle music box / Rhodes chords)
    this.progression = [
      // F major
      { chord: [174.61, 220.00, 261.63, 349.23], melody: [349.23, 440.00, 523.25, 440.00] },
      // C major
      { chord: [130.81, 196.00, 261.63, 329.63], melody: [329.63, 392.00, 523.25, 392.00] },
      // D minor
      { chord: [146.83, 220.00, 261.63, 349.23], melody: [293.66, 349.23, 440.00, 349.23] },
      // Bb major
      { chord: [116.54, 174.61, 233.08, 293.66], melody: [293.66, 349.23, 466.16, 349.23] },
      // A minor / Fmaj7
      { chord: [164.81, 220.00, 261.63, 329.63], melody: [329.63, 440.00, 523.25, 659.25] },
      // G minor
      { chord: [196.00, 233.08, 293.66, 392.00], melody: [392.00, 349.23, 293.66, 261.63] },
      // C dominant suspended
      { chord: [130.81, 196.00, 261.63, 349.23], melody: [349.23, 392.00, 440.00, 523.25] },
      // F resolve
      { chord: [174.61, 220.00, 261.63, 349.23], melody: [523.25, 440.00, 349.23, 261.63] }
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, time, duration, gainLevel = 0.08, type = 'sine') {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // Warm soft envelope: quick smooth attack, warm decay
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(gainLevel, time + 0.06);
    gain.gain.exponentialRampToValueAtTime(gainLevel * 0.4, time + duration * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  playStep() {
    if (!this.isPlaying) return;

    const now = this.ctx.currentTime;
    const item = this.progression[this.currentNoteIndex % this.progression.length];

    // Play soft warm chord pad
    item.chord.forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.03, 2.6, 0.035, 'triangle');
    });

    // Play sparkling melody notes
    item.melody.forEach((freq, step) => {
      const noteTime = now + step * 0.55;
      // Dual tone for warm bell/chime acoustic richness
      this.playTone(freq, noteTime, 1.4, 0.06, 'sine');
      this.playTone(freq * 2, noteTime, 0.8, 0.015, 'sine');
    });

    this.currentNoteIndex++;
    this.timer = setTimeout(() => this.playStep(), 2200);
  }

  toggle() {
    this.initContext();

    if (this.isPlaying) {
      this.isPlaying = false;
      if (this.timer) clearTimeout(this.timer);
      return false;
    } else {
      this.isPlaying = true;
      this.playStep();
      return true;
    }
  }
}

window.RomanticAudio = RomanticAudio;
