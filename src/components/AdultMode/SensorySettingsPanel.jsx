import React, { useState } from 'react';
import { useSensory } from '../../context/SensoryContext';
import { SensoryButton } from '../Shared/SensoryButton';
import { Sliders, Volume2, Type, Palette, MousePointer, Lock, Save, Sparkles } from 'lucide-react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

export function SensorySettingsPanel() {
  const { settings, updateSetting } = useSensory();
  const [newPin, setNewPin] = useState(settings.pinCode);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTestSound = () => {
    sensoryAudio.playSuccessSound();
  };

  const handleSavePin = () => {
    if (newPin.length === 4) {
      updateSetting('pinCode', newPin);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="sensory-settings-panel">
      <div className="settings-section sensory-card">
        <div className="section-header">
          <Volume2 size={26} color="#6B90A7" />
          <div>
            <h3>Controle e Limitação de Volume Áudio</h3>
            <p>Ajuste o volume máximo de saída para prevenir hipersensibilidade auditiva.</p>
          </div>
        </div>

        <div className="setting-control-row">
          <label htmlFor="volume-range">Volume Máximo Permitido: {settings.volume}%</label>
          <div className="range-wrap">
            <input
              id="volume-range"
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => updateSetting('volume', Number(e.target.value))}
              className="sensory-range"
            />
            <SensoryButton variant="secondary" onClick={handleTestSound}>
              <span>Testar Som Suave</span>
            </SensoryButton>
          </div>
        </div>
      </div>

      <div className="settings-section sensory-card">
        <div className="section-header">
          <Palette size={26} color="#7BA88B" />
          <div>
            <h3>Paleta de Cores Pastel Tranquilizante</h3>
            <p>Selecione a paleta de cores mais confortável para o perfil visual da criança.</p>
          </div>
        </div>

        <div className="theme-options-grid">
          {[
            { id: 'sky', name: 'Azul Céu', bg: '#F4F7F6', accent: '#6B90A7' },
            { id: 'mint', name: 'Menta Suave', bg: '#F0F6F2', accent: '#5E9B75' },
            { id: 'lavender', name: 'Lavanda Suave', bg: '#F5F3F9', accent: '#8474A5' },
            { id: 'cream', name: 'Creme Acolhedor', bg: '#FAF7F2', accent: '#B88562' },
          ].map((theme) => (
            <button
              key={theme.id}
              className={`theme-card ${settings.theme === theme.id ? 'active' : ''}`}
              onClick={() => updateSetting('theme', theme.id)}
              style={{ backgroundColor: theme.bg }}
            >
              <div className="color-dot" style={{ backgroundColor: theme.accent }} />
              <span className="theme-name">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section sensory-card">
        <div className="section-header">
          <Type size={26} color="#9385B1" />
          <div>
            <h3>Acessibilidade Tipográfica</h3>
            <p>Configure o tamanho do texto e ative fontes para facilitar a leitura.</p>
          </div>
        </div>

        <div className="settings-grid-two">
          <div className="setting-box">
            <label>Tamanho da Fonte:</label>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${settings.fontSize === 'normal' ? 'active' : ''}`}
                onClick={() => updateSetting('fontSize', 'normal')}
              >
                Médio (16px)
              </button>
              <button
                className={`toggle-btn ${settings.fontSize === 'large' ? 'active' : ''}`}
                onClick={() => updateSetting('fontSize', 'large')}
              >
                Grande (18px)
              </button>
              <button
                className={`toggle-btn ${settings.fontSize === 'xlarge' ? 'active' : ''}`}
                onClick={() => updateSetting('fontSize', 'xlarge')}
              >
                Extra Grande (21px)
              </button>
            </div>
          </div>

          <div className="setting-box">
            <label>Suporte a Dislexia:</label>
            <label className="switch-label">
              <input
                type="checkbox"
                checked={settings.dyslexiaFont}
                onChange={(e) => updateSetting('dyslexiaFont', e.target.checked)}
              />
              <span>Ativar Fonte de Alta Legibilidade</span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section sensory-card">
        <div className="section-header">
          <MousePointer size={26} color="#DF9B79" />
          <div>
            <h3>Modo de Entrada e Movimentos</h3>
            <p>Ajuste os alvos de clique e desative animações se houver sobrecarga sensorial.</p>
          </div>
        </div>

        <div className="settings-grid-two">
          <div className="setting-box">
            <label>Modo de Entrada Preferencial:</label>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${settings.inputMode === 'touch' ? 'active' : ''}`}
                onClick={() => updateSetting('inputMode', 'touch')}
              >
                Touchscreen (Botões Grandes)
              </button>
              <button
                className={`toggle-btn ${settings.inputMode === 'mouse' ? 'active' : ''}`}
                onClick={() => updateSetting('inputMode', 'mouse')}
              >
                Mouse (Cursor Padrão)
              </button>
            </div>
          </div>

          <div className="setting-box">
            <label>Sensibilidade a Movimentos:</label>
            <label className="switch-label">
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
              />
              <span>Desativar Animações (Reduced Motion)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section sensory-card">
        <div className="section-header">
          <Lock size={26} color="#6B90A7" />
          <div>
            <h3>Segurança dos Pais (PIN de Acesso)</h3>
            <p>Altere a senha de 4 dígitos exigida para sair do Modo Criança.</p>
          </div>
        </div>

        <div className="pin-change-row">
          <input
            type="password"
            maxLength={4}
            className="pin-input"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="****"
          />
          <SensoryButton onClick={handleSavePin}>
            <Save size={20} />
            <span>Salvar Novo PIN</span>
          </SensoryButton>
          {saveSuccess && (
            <span className="save-success-tag">
              <Sparkles size={18} /> PIN Salvo com Sucesso!
            </span>
          )}
        </div>
      </div>

      <style>{`
        .sensory-settings-panel {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .section-header h3 {
          font-size: 1.2rem;
          color: var(--text-main);
        }

        .section-header p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .setting-control-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .range-wrap {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .sensory-range {
          flex: 1;
          height: 10px;
          accent-color: var(--accent-sky);
          cursor: pointer;
        }

        .theme-options-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .theme-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: var(--radius-md);
          border: 2px solid var(--border-color);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .theme-card.active {
          border-color: var(--accent-sky);
          box-shadow: 0 4px 12px rgba(107, 144, 167, 0.15);
        }

        .color-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .theme-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .settings-grid-two {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .setting-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .setting-box label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .toggle-group {
          display: flex;
          gap: 8px;
          background: var(--bg-primary);
          padding: 4px;
          border-radius: var(--radius-md);
        }

        .toggle-btn {
          flex: 1;
          padding: 10px 14px;
          border: none;
          background: transparent;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .toggle-btn.active {
          background: var(--bg-surface);
          color: var(--accent-sky);
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .switch-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .switch-label input {
          width: 20px;
          height: 20px;
          accent-color: var(--accent-sky);
        }

        .pin-change-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pin-input {
          width: 120px;
          padding: 12px 16px;
          font-size: 1.3rem;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.2em;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          outline: none;
        }

        .save-success-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #2D6A4F;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
