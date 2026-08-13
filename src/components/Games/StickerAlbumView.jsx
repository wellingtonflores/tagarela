import React, { useState } from 'react';
import { ArrowLeft, Home, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

const INITIAL_STICKERS = [
  { id: 1, name: 'Cachorrinho Carinhoso', emoji: '🐶', unlocked: true, category: 'Animais' },
  { id: 2, name: 'Foguete das Conquistas', emoji: '🚀', unlocked: true, category: 'Brinquedos' },
  { id: 3, name: 'Estrelinha Brilhante', emoji: '🌟', unlocked: true, category: 'Recompensas' },
  { id: 4, name: 'Maçã Gostosa', emoji: '🍎', unlocked: true, category: 'Alimentos' },
  { id: 5, name: 'Carrinho Amarelo', emoji: '🚗', unlocked: false, category: 'Brinquedos' },
  { id: 6, name: 'Ursinho de Pelúcia', emoji: '🧸', unlocked: false, category: 'Brinquedos' },
];

export function StickerAlbumView({ onBackToHub }) {
  const [stickers, setStickers] = useState(INITIAL_STICKERS);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const handleStickerClick = (st) => {
    sensoryAudio.playClickSound();
    if (st.unlocked) {
      sensoryAudio.speakWord(st.name);
      setSelectedSticker(st);
    } else {
      sensoryAudio.playRetrySound();
    }
  };

  return (
    <div className="album-wrapper">
      <header className="game-nav-bar">
        <button className="game-nav-btn" onClick={onBackToHub}>
          <ArrowLeft size={22} />
          <span>Voltar aos Jogos</span>
        </button>
        <span className="game-title-badge yellow">Álbum de Figurinhas Virtuais</span>
        <button className="game-nav-btn" onClick={onBackToHub}>
          <Home size={22} />
          <span>Início</span>
        </button>
      </header>

      <main className="album-content sensory-card">
        <div className="album-header-title">
          <Award size={32} color="#D97706" />
          <h2>Minhas Figurinhas Conquistadas</h2>
        </div>
        <p className="album-subtitle">Conclua os exercícios diários com seus pais para colecionar novas figurinhas!</p>

        <div className="stickers-grid">
          {stickers.map((st) => (
            <div
              key={st.id}
              className={`sticker-card ${st.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => handleStickerClick(st)}
            >
              {st.unlocked ? (
                <>
                  <span className="sticker-emoji">{st.emoji}</span>
                  <span className="sticker-name">{st.name}</span>
                </>
              ) : (
                <>
                  <span className="sticker-lock-icon">🔒</span>
                  <span className="sticker-name text-muted">Bloqueada</span>
                </>
              )}
            </div>
          ))}
        </div>

        {selectedSticker && (
          <div className="sticker-modal-preview">
            <Sparkles size={24} color="#F7A619" />
            <span>Figurinha Selecionada: <strong>{selectedSticker.name}</strong> {selectedSticker.emoji}</span>
          </div>
        )}
      </main>

      <style>{`
        .album-wrapper {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(180deg, #FEF3C7 0%, #FFFBEB 100%);
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

        .game-title-badge.yellow {
          background: #FEF3C7;
          color: #B45309;
          font-weight: 800;
          padding: 8px 20px;
          border-radius: 20px;
        }

        .album-content {
          width: 100%;
          max-width: 900px;
          background: #FFFFFF;
          border-radius: 32px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          box-shadow: 0 16px 40px rgba(217, 119, 6, 0.08);
        }

        .album-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .album-header-title h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #78350F;
        }

        .album-subtitle {
          font-size: 1.1rem;
          color: #92400E;
          font-weight: 600;
        }

        .stickers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          margin-top: 16px;
        }

        .sticker-card {
          background: #FFFFFF;
          border: 3px dashed #FCD34D;
          border-radius: 24px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .sticker-card.unlocked {
          border-style: solid;
          border-color: #F59E0B;
          background: #FFFBEB;
        }

        .sticker-card.unlocked:hover {
          transform: translateY(-4px) scale(1.03);
        }

        .sticker-card.locked {
          opacity: 0.5;
          background: #F3F4F6;
          border-color: #D1D5DB;
        }

        .sticker-emoji { font-size: 4rem; }
        .sticker-lock-icon { font-size: 3rem; }

        .sticker-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: #78350F;
          text-align: center;
        }

        .sticker-modal-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FEF3C7;
          border: 2px solid #F59E0B;
          padding: 12px 24px;
          border-radius: 24px;
          font-size: 1.1rem;
          color: #78350F;
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
}
