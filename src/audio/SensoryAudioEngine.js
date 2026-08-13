/**
 * ============================================================================
 * SENSORY AUDIO ENGINE — TAGARELA
 * Arquitetura de Áudio Sensorial Livre de Gatilhos para Crianças Autistas (TEA)
 * ============================================================================
 */

class SensoryAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.volume = 0.7; // 70% volume seguro padrão
    this.isMuted = false;
    this.lastSpokenText = '';
    this.lastSpokenTime = 0;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = this.volume;
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(volumeFraction) {
    this.volume = Math.max(0, Math.min(1, volumeFraction));
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.volume,
        this.audioCtx ? this.audioCtx.currentTime : 0
      );
    }
  }

  playSuccessSound() {
    try {
      this.initContext();
      if (!this.audioCtx || this.isMuted) return;

      const now = this.audioCtx.currentTime;
      const frequencies = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

      frequencies.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        const noteStart = now + idx * 0.08;
        noteGain.gain.setValueAtTime(0, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.18, noteStart + 0.06);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.9);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(noteStart);
        osc.stop(noteStart + 0.95);
      });
    } catch (e) {
      console.warn("Erro ao sintetizar som de sucesso:", e);
    }
  }

  playRetrySound() {
    try {
      this.initContext();
      if (!this.audioCtx || this.isMuted) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(196, now + 0.35);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.10, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn("Erro ao sintetizar som de tentativa:", e);
    }
  }

  playClickSound() {
    try {
      this.initContext();
      if (!this.audioCtx || this.isMuted) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // Ignorar erros
    }
  }

  /**
   * Reprodução de Voz Humana em Português do Brasil com proteção anti-duplicação (Debounce)
   */
  speakWord(text) {
    if (!text || !('speechSynthesis' in window)) return;

    // Evitar repetição dupla acidental se o botão for clicado 2 vezes seguidas rapidamente
    const now = Date.now();
    if (this.lastSpokenText === text && (now - this.lastSpokenTime) < 1000) {
      return;
    }
    this.lastSpokenText = text;
    this.lastSpokenTime = now;

    window.speechSynthesis.cancel(); // Cancela falas anteriores soltas

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95; // Velocidade natural e nítida
    utterance.pitch = 1.0; // PITCH 1.0 NATURAL (evita o filtro metálico/robótico)
    utterance.volume = this.volume;

    const voices = window.speechSynthesis.getVoices();
    const ptVoices = voices.filter(v => v.lang.includes('pt') || v.lang.includes('PT'));

    // Preferência por vozes femininas de alta definição em Português do Brasil
    const naturalFemaleVoice = ptVoices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('google português do brasil') ||
             name.includes('francisca') ||
             name.includes('luciana') ||
             name.includes('heloisa') ||
             name.includes('vitória') ||
             name.includes('vitoria') ||
             name.includes('maria') ||
             name.includes('female');
    }) || ptVoices[0];

    if (naturalFemaleVoice) {
      utterance.voice = naturalFemaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const sensoryAudio = new SensoryAudioEngine();
