import React, { useState } from 'react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';
import { SensoryButton } from '../Shared/SensoryButton';
import { Volume2, ArrowLeft, Home, Sparkles, CheckCircle2 } from 'lucide-react';

const EXPRESSIVE_EXERCISES = [
  {
    id: 1,
    category: 'Linguagem Expressiva',
    promptText: 'O que o cachorrinho faz quando está feliz?',
    correctAnswer: 'LATE',
    options: [
      { id: 'a', text: 'LATE', emoji: '🐶', correct: true },
      { id: 'b', text: 'VOA', emoji: '🦅', correct: false },
      { id: 'c', text: 'NADA', emoji: '🐟', correct: false },
    ]
  },
  {
    id: 2,
    category: 'Linguagem Expressiva',
    promptText: 'O que usaremos para tomar uma sopa quente?',
    correctAnswer: 'COLHER',
    options: [
      { id: 'a', text: 'PENTE', emoji: '🪮', correct: false },
      { id: 'b', text: 'COLHER', emoji: '🥄', correct: true },
      { id: 'c', text: 'SAPATO', emoji: '👟', correct: false },
    ]
  }
];

export function ExpressiveLanguageGame({ onBackToHub }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const current = EXPRESSIVE_EXERCISES[index];

  const handleSpeak = (text) => {
    sensoryAudio.speakWord(text);
  };

  const handleSelect = (opt) => {
    setSelected(opt.id);
    if (opt.correct) {
      setIsSuccess(true);
      setFeedback('Excelente expressão! Muito bem!');
      sensoryAudio.playSuccessSound();

      setTimeout(() => {
        if (index < EXPRESSIVE_EXERCISES.length - 1) {
          setIndex(prev => prev + 1);
          setSelected(null);
          setFeedback('');
        } else {
          setIndex(0);
          setSelected(null);
          setFeedback('');
        }
      }, 1800);
    } else {
      setIsSuccess(false);
      setFeedback('Vamos tentar mais uma vez juntos?');
      sensoryAudio.playRetrySound();
    }
  };

  return (
    <div className="game-wrapper">
      {/* NAVEGAÇÃO FIXA ESTRUTURAL DA TELA DO JOGO */}
      <header className="game-nav-bar">
        <button className="game-nav-btn" onClick={onBackToHub}>
          <ArrowLeft size={22} />
          <span>Voltar aos Jogos</span>
        </button>
        <span className="game-title-badge">Módulo: Linguagem Expressiva</span>
        <button className="game-nav-btn" onClick={onBackToHub}>
          <Home size={22} />
          <span>Início</span>
        </button>
      </header>

      <main className="game-content-card sensory-card">
        <h2 className="prompt-title">{current.promptText}</h2>

        <SensoryButton
          variant="secondary"
          onClick={() => handleSpeak(current.promptText)}
        >
          <Volume2 size={24} color="#6B90A7" />
          <span>Ouvir Pergunta</span>
        </SensoryButton>

        <div className="game-options-grid">
          {current.options.map((opt) => (
            <button
              key={opt.id}
              className={`game-opt-card ${selected === opt.id ? (opt.correct ? 'correct' : 'retry') : ''}`}
              onClick={() => handleSelect(opt)}
            >
              <span className="opt-emoji">{opt.emoji}</span>
              <span className="opt-text">{opt.text}</span>
            </button>
          ))}
        </div>

        {feedback && (
          <div className={`feedback-tag ${isSuccess ? 'success' : 'retry'}`}>
            <Sparkles size={20} />
            <span>{feedback}</span>
          </div>
        )}
      </main>

      <style>{`
        .game-wrapper {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(180deg, #C4ECFF 0%, #E3F5FF 100%);
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

        .game-title-badge {
          background: #E1ECF4;
          color: #1E6091;
          font-weight: 800;
          padding: 8px 20px;
          border-radius: 20px;
        }

        .game-content-card {
          width: 100%;
          max-width: 900px;
          background: #FFFFFF;
          border-radius: 32px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
        }

        .prompt-title {
          font-size: 2rem;
          font-weight: 800;
          color: #2D3748;
          text-align: center;
        }

        .game-options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          margin-top: 12px;
        }

        .game-opt-card {
          background: #FFFFFF;
          border: 3px solid #E2E8F0;
          border-radius: 24px;
          padding: 28px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .game-opt-card:hover {
          border-color: #6B90A7;
          transform: translateY(-4px);
        }

        .game-opt-card.correct {
          border-color: #7BA88B;
          background: #E4F2E9;
        }

        .game-opt-card.retry {
          border-color: #DF9B79;
          background: #FBF0EA;
        }

        .opt-emoji { font-size: 4rem; }
        .opt-text { font-size: 1.3rem; font-weight: 800; color: #2D3748; }

        .feedback-tag {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 1.15rem;
          font-weight: 700;
        }

        .feedback-tag.success { background: #E4F2E9; color: #2D6A4F; }
        .feedback-tag.retry { background: #FBF0EA; color: #9C4221; }
      `}</style>
    </div>
  );
}
