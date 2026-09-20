// Web Audio API ambient sound generator & tactile UI sound effects
// Completely self-contained, no external audio files required.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isAmbiencePlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft tactile tick for receipt buttons
  playTick(frequency = 800, duration = 0.03) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or not supported
    }
  }

  // Thermal paper print flutter sound
  playPaperChirp() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600 + i * 150, now + i * 0.04);
        gain.gain.setValueAtTime(0.03, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.03);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.03);
      }
    } catch (e) {
      // Ignore
    }
  }

  // Toggle relaxing warm archival tape / atmospheric ambient hum
  toggleAmbience(): boolean {
    try {
      this.initCtx();
      if (!this.ctx) return false;

      if (this.isAmbiencePlaying) {
        if (this.ambientGain) {
          this.ambientGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.5);
          setTimeout(() => {
            if (this.noiseNode) {
              try { this.noiseNode.stop(); } catch(e) {}
              this.noiseNode.disconnect();
              this.noiseNode = null;
            }
          }, 600);
        }
        this.isAmbiencePlaying = false;
        return false;
      } else {
        // Create 2-second looped pink-ish noise buffer with warm low-pass filter
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.06;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Warm tape lowpass filter
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 420;

        // Subtle gentle harmonic drone
        const drone = this.ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.value = 110; // A2 note gentle warm hum
        const droneGain = this.ctx.createGain();
        droneGain.gain.value = 0.012;

        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        masterGain.gain.setTargetAtTime(0.06, this.ctx.currentTime, 0.8);

        noise.connect(filter);
        filter.connect(masterGain);

        drone.connect(droneGain);
        droneGain.connect(masterGain);

        masterGain.connect(this.ctx.destination);

        noise.start();
        drone.start();

        this.noiseNode = noise;
        this.ambientGain = masterGain;
        this.isAmbiencePlaying = true;
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  getAmbienceState(): boolean {
    return this.isAmbiencePlaying;
  }
}

export const soundEngine = new SoundEngine();
