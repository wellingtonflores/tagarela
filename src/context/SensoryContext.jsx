import React, { createContext, useContext, useState, useEffect } from 'react';
import { sensoryAudio } from '../audio/SensoryAudioEngine';

const SensoryContext = createContext();

const STORAGE_KEY = 'tagarela_sensory_preferences_v1';

const defaultSettings = {
  theme: 'sky',            // 'sky', 'mint', 'lavender', 'cream'
  fontSize: 'normal',      // 'normal', 'large', 'xlarge'
  dyslexiaFont: false,     // Usar fonte com alta legibilidade para dislexia
  reducedMotion: false,    // Desativar animações e movimentos
  volume: 70,              // Volume máximo em % (0 a 100)
  inputMode: 'touch',      // 'touch' (áreas maiores) ou 'mouse'
  pinCode: '1234',         // PIN de segurança do adulto
  activeMode: 'child',     // 'child' (Modo Criança Terapêutico) ou 'adult' (Painel Fono)
  isKioskLocked: true,     // Modo Kiosk em tela cheia ativado
};

export function SensoryProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  });

  // Salvar no localStorage sempre que houver mudanças
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn("Não foi possível salvar configurações locais:", e);
    }

    // Aplicar atributos no <body> para que o CSS reaja imediatamente
    document.body.setAttribute('data-theme', settings.theme);
    document.body.setAttribute('data-font-size', settings.fontSize);
    document.body.setAttribute('data-dyslexia-font', settings.dyslexiaFont);
    document.body.setAttribute('data-reduced-motion', settings.reducedMotion);
    document.body.setAttribute('data-input-mode', settings.inputMode);

    // Ajustar volume do sintetizador sonoro
    sensoryAudio.setVolume(settings.volume / 100);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const switchMode = (mode) => {
    updateSetting('activeMode', mode);
  };

  return (
    <SensoryContext.Provider value={{ settings, updateSetting, switchMode }}>
      {children}
    </SensoryContext.Provider>
  );
}

export function useSensory() {
  const context = useContext(SensoryContext);
  if (!context) {
    throw new Error('useSensory deve ser usado dentro de um SensoryProvider');
  }
  return context;
}
