import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Wind, Heart, Sparkles } from 'lucide-react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

export function SensoryCalmZone({ onBackToHub }) {
  const [phase, setPhase] = useState('inspire'); // 'inspire', 'hold', 'expire'
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (phase === 'inspire') {
            setPhase('hold');
            return 2;
          } else if (phase === 'hold') {
            setPhase('expire');
            return 4;
          } else {
            setPhase('inspire');
            sensoryAudio.playSuccessSound();
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const getPhaseText = () => {
    if (phase === 'inspire') return 'Inspire Suavemente...';
    if (phase === 'hold') return 'Segure o Ar...';
    return 'Expire Devagar...';
  };

  return (
    <div className="calm-wrapper">
      <header className="game-nav-bar">
        <button className="game-nav-btn" onClick={onBackToHub}>
          <ArrowLeft size={22} />
          <span>Voltar aos Jogos</span>
        </button>
        <span className="game-title-badge mint">Cantinho da Calmaria (Regulação Sensorial)</span>
        <button className="game-nav-btn" onClick={onBackToHub}>
          <Home size={22} />
          <span>Início</span>
        </button>
      </header>

      <main className="calm-content">
        <h2 className="calm-headline">Respiração Guiada Sem Gatilhos</h2>
        <p className="calm-subtitle">Respire junto com o balão para acalmar a mente antes dos exercícios.</p>

        {/* BALÃO VISUAL ANIMADO DE RESPIRAÇÃO */}
        <div className={`calm-balloon-circle ${phase}`}>
          <div className="inner-pulse">
            <Wind size={48} color="#FFFFFF" />
            <span className="seconds-count">{seconds}s</span>
          </div>
        </div>

        <div className="phase-instruction">
          <Heart size={24} color="#5E9B75" />
          <span>{getPhaseText()}</span>
        </div>
      </main>

      <style>{`
        .calm-wrapper {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
        }

        .game-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 900px;
          margin-bottom: 24px;
        }

        .game-nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 2px solid #E2E8F0;
          padding: 10px 20px;
          border-radius: 24px;
          font-weight: 700;
          color: #5A6A85;
          cursor: pointer;
        }

        .game-title-badge.mint {
          background: #DCFCE7;
          color: #166534;
          font-weight: 800;
          padding: 8px 20px;
          border-radius: 20px;
        }

        .calm-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          margin-top: 20px;
        }

        .calm-headline {
          font-size: 2.2rem;
          font-weight: 800;
          color: #1B4332;
        }

        .calm-subtitle {
          font-size: 1.15rem;
          color: #2D6A4F;
          font-weight: 600;
        }

        .calm-balloon-circle {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, #81C784 0%, #4CAF50 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 40px rgba(76, 175, 80, 0.3);
          transition: transform 4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .calm-balloon-circle.inspire {
          transform: scale(1.4);
        }

        .calm-balloon-circle.hold {
          transform: scale(1.4);
        }

        .calm-balloon-circle.expire {
          transform: scale(0.9);
        }

        .inner-pulse {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .seconds-count {
          font-size: 2rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        .phase-instruction {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          padding: 16px 36px;
          border-radius: 30px;
          font-size: 1.4rem;
          font-weight: 800;
          color: #1B4332;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
      `}</style>
    </div>
  );
}
