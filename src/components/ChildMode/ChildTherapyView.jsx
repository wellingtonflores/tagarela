import React, { useState } from 'react';
import { PhonemeExercise } from './PhonemeExercise';
import { useSensory } from '../../context/SensoryContext';
import { ShieldCheck, Heart, Smile } from 'lucide-react';

export function ChildTherapyView({ onRecordMetrics }) {
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
      {/* BARRA SUPERIOR SILENCIOSA (MODO KIOSK) */}
      <div className="kiosk-status-strip">
        <div className="kiosk-shield-indicator">
          <ShieldCheck size={20} color="#7BA88B" />
          <span>Ambiente Seguro e Focado</span>
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
          height: calc(100vh - 80px);
          width: 100%;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          padding: 24px 32px;
        }

        .kiosk-status-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-soft);
        }

        .kiosk-shield-indicator, .stars-counter {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
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
