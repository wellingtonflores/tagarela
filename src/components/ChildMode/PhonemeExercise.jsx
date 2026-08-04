import React, { useState, useEffect } from 'react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';
import { SensoryButton } from '../Shared/SensoryButton';
import { Volume2, Sparkles, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

const EXERCISES = [
  {
    id: 1,
    phoneme: '/B/',
    word: 'BOLA',
    hint: 'Encontre o objeto que começa com a letra B: BOLA',
    options: [
      { id: 'a', name: 'BOLA', icon: '⚽', correct: true },
      { id: 'b', name: 'PATO', icon: '🦆', correct: false },
      { id: 'c', name: 'GATO', icon: '🐱', correct: false }
    ]
  },
  {
    id: 2,
    phoneme: '/P/',
    word: 'PATO',
    hint: 'Qual destes começa com P? PATO',
    options: [
      { id: 'a', name: 'MAÇÃ', icon: '🍎', correct: false },
      { id: 'b', name: 'PATO', icon: '🦆', correct: true },
      { id: 'c', name: 'BOLO', icon: '🎂', correct: false }
    ]
  },
  {
    id: 3,
    phoneme: '/M/',
    word: 'MAÇÃ',
    hint: 'Qual das opções começa com M? MAÇÃ',
    options: [
      { id: 'a', name: 'MAÇÃ', icon: '🍎', correct: true },
      { id: 'b', name: 'BOLA', icon: '⚽', correct: false },
      { id: 'c', name: 'CASA', icon: '🏠', correct: false }
    ]
  },
  {
    id: 4,
    phoneme: '/S/',
    word: 'SAPO',
    hint: 'Encontre o animal que começa com S: SAPO',
    options: [
      { id: 'a', name: 'CARRO', icon: '🚗', correct: false },
      { id: 'b', name: 'SAPO', icon: '🐸', correct: true },
      { id: 'c', name: 'PIANO', icon: '🎹', correct: false }
    ]
  }
];

export function PhonemeExercise({ onRecordProgress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const currentExercise = EXERCISES[currentIndex];

  // Tocar o som da palavra ao carregar cada exercício
  useEffect(() => {
    setSelectedOption(null);
    setIsSuccess(false);
    setFeedbackText('');
    
    // Tocar a palavra com voz pausada e clara
    const timer = setTimeout(() => {
      sensoryAudio.speakWord(currentExercise.word);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleSpeak = () => {
    sensoryAudio.speakWord(currentExercise.word);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option.id);

    if (option.correct) {
      setIsSuccess(true);
      setFeedbackText('Muito bem! Você acertou!');
      sensoryAudio.playSuccessSound();

      // Gravar métrica no relatório do adulto
      if (onRecordProgress) {
        onRecordProgress(true);
      }

      // Avançar suavemente após 1.8s
      setTimeout(() => {
        if (currentIndex < EXERCISES.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Reiniciar ciclo de atividades
          setCurrentIndex(0);
        }
      }, 1800);
    } else {
      setIsSuccess(false);
      setFeedbackText('Vamos tentar juntos de novo?');
      sensoryAudio.playRetrySound();

      if (onRecordProgress) {
        onRecordProgress(false);
      }
    }
  };

  return (
    <div className="exercise-container">
      {/* CARD DO ESTÍMULO ÚNICO */}
      <div className="exercise-prompt-card sensory-card">
        <div className="phoneme-badge">Fonema Terapêutico {currentExercise.phoneme}</div>
        <h2 className="target-word">{currentExercise.word}</h2>
        <p className="hint-text">{currentExercise.hint}</p>

        <SensoryButton
          variant="secondary"
          onClick={handleSpeak}
          className="btn-audio-listen"
          ariaLabel={`Ouvir a palavra ${currentExercise.word}`}
        >
          <Volume2 size={28} color="#6B90A7" />
          <span>Ouvir Palavra</span>
        </SensoryButton>
      </div>

      {/* ÁREA DE RESPOSTAS (OPÇÕES AMPLAS) */}
      <div className="options-grid">
        {currentExercise.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const showCorrectStyle = isSelected && opt.correct;
          const showRetryStyle = isSelected && !opt.correct;

          return (
            <button
              key={opt.id}
              className={`option-card ${showCorrectStyle ? 'success' : ''} ${showRetryStyle ? 'retry' : ''}`}
              onClick={() => handleSelectOption(opt)}
            >
              <span className="option-emoji">{opt.icon}</span>
              <span className="option-label">{opt.name}</span>

              {showCorrectStyle && (
                <div className="success-sparkle">
                  <CheckCircle2 size={36} color="#7BA88B" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* FEEDBACK SENSORIAL SUAVE */}
      {feedbackText && (
        <div className={`feedback-banner ${isSuccess ? 'success' : 'retry'}`}>
          <Sparkles size={24} />
          <span>{feedbackText}</span>
        </div>
      )}

      <style>{`
        .exercise-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        .exercise-prompt-card {
          width: 100%;
          text-align: center;
          background: var(--bg-surface);
          border-radius: var(--radius-lg);
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .phoneme-badge {
          background: var(--accent-sky-light);
          color: var(--accent-sky);
          font-weight: 700;
          font-size: 1rem;
          padding: 8px 20px;
          border-radius: 20px;
          letter-spacing: 0.05em;
        }

        .target-word {
          font-size: 3.2rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.08em;
        }

        .hint-text {
          font-size: 1.15rem;
          color: var(--text-muted);
        }

        .btn-audio-listen {
          margin-top: 8px;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }

        .option-card {
          background: var(--bg-surface);
          border: 3px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 32px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 180px;
          cursor: pointer;
          box-shadow: var(--shadow-card);
          transition: var(--transition-smooth);
          position: relative;
        }

        .option-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-sky);
          background: var(--bg-surface-subtle);
        }

        .option-emoji {
          font-size: 4.5rem;
          line-height: 1;
        }

        .option-label {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .option-card.success {
          border-color: var(--accent-mint);
          background: var(--accent-mint-light);
          transform: scale(1.03);
        }

        .option-card.retry {
          border-color: var(--accent-peach);
          background: var(--accent-peach-light);
        }

        .success-sparkle {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        .feedback-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 1.2rem;
          font-weight: 700;
          animation: slideUp 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .feedback-banner.success {
          background: var(--accent-mint-light);
          color: #2D6A4F;
          border: 1px solid var(--accent-mint);
        }

        .feedback-banner.retry {
          background: var(--accent-peach-light);
          color: #9C4221;
          border: 1px solid var(--accent-peach);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
