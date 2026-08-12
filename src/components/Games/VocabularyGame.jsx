import React, { useState } from 'react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';
import { SensoryButton } from '../Shared/SensoryButton';
import { Volume2, ArrowLeft, Home, Sparkles } from 'lucide-react';

const VOCAB_EXERCISES = [
  {
    id: 1,
    prompt: 'Qual destes é a MAÇÃ?',
    target: 'MAÇÃ',
    options: [
      { id: 'a', name: 'MAÇÃ', emoji: '🍎', correct: true },
      { id: 'b', name: 'BANANA', emoji: '🍌', correct: false },
      { id: 'c', name: 'LARAJA', emoji: '🍊', correct: false }
    ]
  },
  {
    id: 2,
    prompt: 'Qual destes é o CARRO?',
    target: 'CARRO',
    options: [
      { id: 'a', name: 'BICICLETA', emoji: '🚲', correct: false },
      { id: 'b', name: 'AVIÃO', emoji: '✈️', correct: false },
      { id: 'c', name: 'CARRO', emoji: '🚗', correct: true }
    ]
  }
];

export function VocabularyGame({ onBackToHub }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const current = VOCAB_EXERCISES[index];

  const handleSelect = (opt) => {
    setSelected(opt.id);
    if (opt.correct) {
      setIsSuccess(true);
      setFeedback('Acertou! Excelente vocabulário!');
      sensoryAudio.playSuccessSound();

      setTimeout(() => {
        if (index < VOCAB_EXERCISES.length - 1) {
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
      setFeedback('Vamos procurar a imagem juntos?');
      sensoryAudio.playRetrySound();
    }
  };

  return (
    <div className="game-wrapper">
      <header className="game-nav-bar">
        <button className="game-nav-btn" onClick={onBackToHub}>
          <ArrowLeft size={22} />
          <span>Voltar aos Jogos</span>
        </button>
        <span className="game-title-badge purple">Módulo: Vocabulário</span>
        <button className="game-nav-btn" onClick={onBackToHub}>
          <Home size={22} />
          <span>Início</span>
        </button>
      </header>

      <main className="game-content-card sensory-card">
        <h2 className="prompt-title">{current.prompt}</h2>

        <SensoryButton
          variant="secondary"
          onClick={() => sensoryAudio.speakWord(current.prompt)}
        >
          <Volume2 size={24} color="#7209B7" />
          <span>Ouvir Palavra</span>
        </SensoryButton>

        <div className="game-options-grid">
          {current.options.map((opt) => (
            <button
              key={opt.id}
              className={`game-opt-card ${selected === opt.id ? (opt.correct ? 'correct' : 'retry') : ''}`}
              onClick={() => handleSelect(opt)}
            >
              <span className="opt-emoji">{opt.emoji}</span>
              <span className="opt-text">{opt.name}</span>
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
    </div>
  );
}
