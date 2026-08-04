import React, { useState } from 'react';
import { useSensory } from '../../context/SensoryContext';
import { SensoryButton } from '../Shared/SensoryButton';
import { Lock, X, Check, Delete } from 'lucide-react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

export function PinModal({ isOpen, onClose, onSuccess }) {
  const { settings } = useSensory();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleNumClick = (num) => {
    sensoryAudio.playClickSound();
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg('');

      // Autoverificar quando atingir 4 dígitos
      if (newPin.length === 4) {
        if (newPin === settings.pinCode) {
          sensoryAudio.playSuccessSound();
          setPin('');
          onSuccess();
        } else {
          sensoryAudio.playRetrySound();
          setErrorMsg('PIN incorreto. Tente novamente.');
          setTimeout(() => setPin(''), 600);
        }
      }
    }
  };

  const handleDelete = () => {
    sensoryAudio.playClickSound();
    setPin(prev => prev.slice(0, -1));
    setErrorMsg('');
  };

  return (
    <div className="pin-modal-overlay">
      <div className="pin-modal-card sensory-card">
        <div className="pin-header">
          <div className="pin-icon-wrap">
            <Lock size={32} color="#6B90A7" />
          </div>
          <h3>Área Protegida dos Pais</h3>
          <p>Digite a senha de 4 dígitos para gerenciar ou sair do Modo Criança (Padrão: 1234)</p>
        </div>

        <div className="pin-dots">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`pin-dot ${pin.length > idx ? 'filled' : ''}`}
            />
          ))}
        </div>

        {errorMsg && <p className="pin-error">{errorMsg}</p>}

        <div className="pin-keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              className="keypad-btn"
              onClick={() => handleNumClick(num)}
            >
              {num}
            </button>
          ))}
          <button className="keypad-btn action" onClick={handleDelete}>
            <Delete size={24} />
          </button>
          <button className="keypad-btn" onClick={() => handleNumClick('0')}>
            0
          </button>

          <button className="keypad-btn action close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .pin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(45, 55, 72, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease-out;
        }

        .pin-modal-card {
          width: 400px;
          text-align: center;
          background: var(--bg-surface);
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .pin-icon-wrap {
          width: 64px;
          height: 64px;
          background: var(--accent-sky-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }

        .pin-header h3 {
          font-size: 1.4rem;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .pin-header p {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .pin-dots {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .pin-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--border-color-hover);
          transition: all 0.2s ease;
        }

        .pin-dot.filled {
          background: var(--accent-sky);
          border-color: var(--accent-sky);
          transform: scale(1.1);
        }

        .pin-error {
          color: #D97706;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .pin-keypad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .keypad-btn {
          height: 64px;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--text-main);
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .keypad-btn:hover {
          background: var(--accent-sky-light);
          border-color: var(--accent-sky);
        }

        .keypad-btn.action {
          background: var(--bg-surface-subtle);
          color: var(--text-muted);
        }

        .keypad-btn.action.close:hover {
          background: #FEE2E2;
          color: #DC2626;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
