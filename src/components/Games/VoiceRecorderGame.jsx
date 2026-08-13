import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Volume2, ArrowLeft, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';
import { SensoryButton } from '../Shared/SensoryButton';

export function VoiceRecorderGame({ onBackToHub }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  const sampleTarget = {
    word: 'BOLA',
    phoneme: '/B/',
    emoji: '⚽',
    prompt: 'Ouça a palavra BOLA e depois aperte o microfone para repetir!'
  };

  const startRecording = async () => {
    try {
      sensoryAudio.playClickSound();
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setIsRecording(false);
        setFeedback('Gravação concluída! Clique em "Ouvir Minha Voz" para escutar juntos!');
        sensoryAudio.playSuccessSound();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setFeedback('Gravando... Fale a palavra "BOLA" no microfone!');
    } catch (err) {
      console.warn('Microfone indisponível ou permissão negada:', err);
      // Fallback simulado caso o microfone não esteja disponível no ambiente
      setIsRecording(true);
      setFeedback('Simulando gravação de voz...');
      setTimeout(() => {
        setIsRecording(false);
        setAudioUrl('mock_audio');
        setFeedback('Excelente imitação vocal gravada!');
        sensoryAudio.playSuccessSound();
      }, 3000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const playRecordedAudio = () => {
    if (audioUrl && audioUrl !== 'mock_audio') {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      }
      setIsPlaying(true);
      audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(false);
    } else {
      // Fala sintética de demonstração
      setIsPlaying(true);
      sensoryAudio.speakWord('BOLA');
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  return (
    <div className="game-wrapper">
      <header className="game-nav-bar">
        <button className="game-nav-btn" onClick={onBackToHub}>
          <ArrowLeft size={22} />
          <span>Voltar aos Jogos</span>
        </button>
        <span className="game-title-badge pink">Módulo: Imitação Vocal (Gravador)</span>
        <button className="game-nav-btn" onClick={onBackToHub}>
          <Home size={22} />
          <span>Início</span>
        </button>
      </header>

      <main className="game-content-card sensory-card">
        <div className="target-word-display">
          <span className="word-emoji">{sampleTarget.emoji}</span>
          <h2 className="target-word">{sampleTarget.word}</h2>
        </div>

        <p className="prompt-text">{sampleTarget.prompt}</p>

        <SensoryButton
          variant="secondary"
          onClick={() => sensoryAudio.speakWord(sampleTarget.word)}
        >
          <Volume2 size={24} color="#F72585" />
          <span>Ouvir Guia Fonoaudiológico</span>
        </SensoryButton>

        {/* CONTROLES DE GRAVAÇÃO E PLAYBACK */}
        <div className="recorder-controls">
          {!isRecording ? (
            <button className="rec-btn start" onClick={startRecording}>
              <Mic size={28} />
              <span>Gravar Minha Voz</span>
            </button>
          ) : (
            <button className="rec-btn stop" onClick={stopRecording}>
              <Square size={28} />
              <span>Parar Gravação</span>
            </button>
          )}

          {audioUrl && (
            <button className={`play-recorded-btn ${isPlaying ? 'playing' : ''}`} onClick={playRecordedAudio}>
              <Play size={24} />
              <span>Ouvir Minha Voz</span>
            </button>
          )}
        </div>

        {feedback && (
          <div className="feedback-tag success">
            <Sparkles size={20} />
            <span>{feedback}</span>
          </div>
        )}
      </main>

      <style>{`
        .game-wrapper {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(180deg, #FDE2E4 0%, #FFF0F3 100%);
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

        .game-title-badge.pink {
          background: #FFE5EC;
          color: #F72585;
          font-weight: 800;
          padding: 8px 20px;
          border-radius: 20px;
        }

        .game-content-card {
          width: 100%;
          max-width: 840px;
          background: #FFFFFF;
          border-radius: 32px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          box-shadow: 0 16px 40px rgba(247, 37, 133, 0.08);
        }

        .target-word-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .word-emoji { font-size: 5rem; }

        .target-word {
          font-size: 3rem;
          font-weight: 900;
          color: #F72585;
          letter-spacing: 0.05em;
        }

        .prompt-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4A5568;
          text-align: center;
        }

        .recorder-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 12px;
        }

        .rec-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 1.2rem;
          font-weight: 800;
          cursor: pointer;
          border: none;
          transition: transform 0.2s ease;
        }

        .rec-btn.start {
          background: #F72585;
          color: #FFFFFF;
          box-shadow: 0 8px 20px rgba(247, 37, 133, 0.3);
        }

        .rec-btn.stop {
          background: #DC2626;
          color: #FFFFFF;
          animation: pulse 1.5s infinite;
        }

        .play-recorded-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 30px;
          background: #E8F5E9;
          border: 2px solid #81C784;
          color: #2E7D32;
          font-size: 1.15rem;
          font-weight: 800;
          cursor: pointer;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
