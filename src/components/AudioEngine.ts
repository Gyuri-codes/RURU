/**
 * Procedural Web Audio Engine for RURU
 * Synthesizes nocturnal Japanese temple soundscapes (night wind, soft rain, resonant singing bowl, crickets)
 * Zero external audio dependencies - 100% reliable and latency-free.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = true;
  private isRunning: boolean = false;

  // Wind nodes
  private windGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private cricketsGain: GainNode | null = null;

  private init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtxClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.startAmbientGenerators();
  }

  private startAmbientGenerators() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Mountain Wind (Filtered Pink Noise with sweeping LFO)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const windSource = this.ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(3, this.ctx.currentTime);

    // LFO for slow wind gusting
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    windSource.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    windSource.start();

    // 2. Slow Night Rain (Highpass + Bandpass Noise with soft drops)
    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    rainFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    rainSource.connect(rainFilter);
    rainFilter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);
    rainSource.start();

    // 3. Subtle Night Crickets / Suzumushi
    this.cricketsGain = this.ctx.createGain();
    this.cricketsGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    this.cricketsGain.connect(this.masterGain);

    this.scheduleCricketChirps();
  }

  private scheduleCricketChirps() {
    if (!this.ctx || !this.cricketsGain) return;
    const now = this.ctx.currentTime;
    const delay = Math.random() * 2 + 1.5;

    // Periodic gentle cricket burst
    setTimeout(() => {
      if (this.ctx && this.cricketsGain && !this.isMuted) {
        try {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const chirpGain = this.ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(4600 + Math.random() * 300, this.ctx.currentTime);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(4950 + Math.random() * 300, this.ctx.currentTime);

          chirpGain.gain.setValueAtTime(0, this.ctx.currentTime);
          chirpGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.05);
          chirpGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

          osc1.connect(chirpGain);
          osc2.connect(chirpGain);
          chirpGain.connect(this.cricketsGain);

          osc1.start();
          osc2.start();
          osc1.stop(this.ctx.currentTime + 0.45);
          osc2.stop(this.ctx.currentTime + 0.45);
        } catch {
          // Ignore lifecycle drops
        }
      }
      this.scheduleCricketChirps();
    }, delay * 1000);
  }

  /**
   * Resonant Temple Bell / Singing Bowl (Rin) on chapter arrival
   */
  public playTempleBell(frequency: number = 261.63) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // Fundamental + 3 overtones characteristic of Japanese Buddhist bronze bells
      const freqs = [frequency, frequency * 2.01, frequency * 3.12, frequency * 4.85];
      const gains = [0.35, 0.18, 0.1, 0.05];
      const decays = [6.5, 5.0, 3.2, 1.8];

      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gains[idx], now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + decays[idx] + 0.1);
      });
    } catch {
      // AudioContext could be suspended or pending
    }
  }

  public async toggleMute(): Promise<boolean> {
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    const now = this.ctx.currentTime;
    if (this.isMuted) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
    } else {
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.linearRampToValueAtTime(0.7, now + 1.2);
      this.playTempleBell(220); // Warm welcoming gong on sound start
    }

    this.isRunning = !this.isMuted;
    return !this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }
}

export const audioEngine = new SoundEngine();
