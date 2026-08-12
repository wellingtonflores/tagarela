import React, { createContext, useContext, useState, useEffect } from 'react';
import { sensoryAudio } from '../audio/SensoryAudioEngine';

const SensoryContext = createContext();

const STORAGE_KEY = 'tagarela_sensory_preferences_v1';
const USER_SESSION_KEY = 'tagarela_user_session_v1';

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

  // Sessão persistente do Usuário Fonoaudiólogo / Pais
  const [userSession, setUserSession] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_SESSION_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Salvar preferências sensoriais no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn("Não foi possível salvar configurações locais:", e);
    }

    document.body.setAttribute('data-theme', settings.theme);
    document.body.setAttribute('data-font-size', settings.fontSize);
    document.body.setAttribute('data-dyslexia-font', settings.dyslexiaFont);
    document.body.setAttribute('data-reduced-motion', settings.reducedMotion);
    document.body.setAttribute('data-input-mode', settings.inputMode);

    sensoryAudio.setVolume(settings.volume / 100);
  }, [settings]);

  // Salvar sessão de usuário no localStorage
  useEffect(() => {
    try {
      if (userSession) {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userSession));
      } else {
        localStorage.removeItem(USER_SESSION_KEY);
      }
    } catch (e) {
      console.warn("Não foi possível salvar sessão no localStorage:", e);
    }
  }, [userSession]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const switchMode = (mode) => {
    updateSetting('activeMode', mode);
  };

  // Método de Login Realista com validação de formato de e-mail
  const loginUser = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email.trim())) {
      return {
        success: false,
        error: 'Por favor, insira um e-mail válido (ex: seu.nome@exemplo.com)'
      };
    }

    if (!password || password.trim().length === 0) {
      return {
        success: false,
        error: 'Por favor, digite sua senha.'
      };
    }

    const userData = {
      email: email.trim(),
      name: email.split('@')[0],
      loggedInAt: new Date().toISOString()
    };

    setUserSession(userData);
    return { success: true, user: userData };
  };

  const logoutUser = () => {
    setUserSession(null);
  };

  return (
    <SensoryContext.Provider value={{
      settings,
      updateSetting,
      switchMode,
      userSession,
      loginUser,
      logoutUser
    }}>
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
