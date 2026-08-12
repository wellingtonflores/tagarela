import React, { useState } from 'react';
import { PhonemeExercise } from './PhonemeExercise';
import { useSensory } from '../../context/SensoryContext';
import { ShieldCheck, Smile, ArrowLeft, Home } from 'lucide-react';

export function ChildTherapyView({ onRecordMetrics, onBackToHub }) {
  const { settings } = useSensory();
  const [stars, setStars] = useState(3);

  const handleRecordProgress = (isSuccess) => {
    if (isSuccess) {
      setStars(prev => prev + 1);
    }
    if (onRecordMetrics) {
      onRecordMetrics(isSuccess);
    }
  };

  return (
    <div className="child-therapy-view">
      {/* BARRA SUPERIOR SILENCIOSA DE NAVEGAÇÃO */}
      <div className="kiosk-status-strip">
        {onBackToHub && (
          <button className="game-nav-btn" onClick={onBackToHub}>
            <ArrowLeft size={20} />
            <span>Voltar aos Jogos</span>
          </button>
        )}

        <div className="kiosk-shield-indicator">
          <ShieldCheck size={20} color="#7BA88B" />
          <span>Módulo: Consciência Fonológica</span>
        </div>

        <div className="stars-counter">
          <Smile size={22} color="#DF9B79" />
          <span>Conquistas: {stars} Estrelas</span>
        </div>
      </div>

      <main className="therapy-main-content">
        <PhonemeExercise onRecordProgress={handleRecordProgress} />
      </main>

      <style>{`
        .child-therapy-view {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(180deg, #C4ECFF 0%, #E3F5FF 100%);
          position: relative;
          overflow-y: auto;
          padding: 24px 32px;
        }

        .kiosk-status-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 28px;
          background: #FFFFFF;
          border-radius: 24px;
          margin-bottom: 24px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-soft);
        }

        .game-nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 2px solid #E2E8F0;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          color: #5A6A85;
          cursor: pointer;
        }

        .kiosk-shield-indicator, .stars-counter {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          color: #2D3748;
        }

        .therapy-main-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
