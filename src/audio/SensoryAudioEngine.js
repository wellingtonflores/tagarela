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

  /**
   * Som de Sucesso/Conquista:
   * Acorde harmônico pentatônico em tom maiúsculo suave (Dó Major/Pentatônico: C4, E4, G4, C5).
   * Usa ondas senoidais puras (Sine Wave) com rampa de subida (attack) amortecida de 60ms.
   */
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

        // Subida suave de volume (evita cliques ou sustos)
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

  /**
   * Orientação Gentil para Nova Tentativa (Erro):
   * NUNCA usa buzinas, estridentes ou frequências altas.
   * Usa um tom neutro grave (220Hz - Lá2) em volume reduzido.
   */
  playRetrySound() {
    try {
      this.initContext();
      if (!this.audioCtx || this.isMuted) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now); // Frequência confortavelmente grave
      osc.frequency.exponentialRampToValueAtTime(196, now + 0.35); // Leve descida para Sol2

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.10, now + 0.05); // Volume máximo baixo (10%)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn("Erro ao sintetizar som de tentativa:", e);
    }
  }

  /**
   * Clique tátil suave em interações de botões
   */
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
      // Ignorar erros silenciosamente
    }
  }

  /**
   * Reproduz a voz de síntese do fonema/palavra usando a SpeechSynthesis API nativa do navegador
   */
  speakWord(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancela falas anteriores pendentes
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.85; // Velocidade ligeiramente pausada para clareza fonoaudiológica
      utterance.pitch = 1.0;
      utterance.volume = this.volume;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const sensoryAudio = new SensoryAudioEngine();
