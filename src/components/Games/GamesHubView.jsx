import React from 'react';
import { Play, ArrowRight, FolderOpen, MessageSquare, Puzzle, Gamepad2, Star, Lightbulb, LogOut, User } from 'lucide-react';
import { useSensory } from '../../context/SensoryContext';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

export function GamesHubView({ onSelectModule, onOpenParentAuth, onLogout }) {
  const { userSession, logoutUser } = useSensory();

  const handleCardClick = (moduleId, title) => {
    sensoryAudio.playClickSound();
    if (moduleId === 'parents') {
      onOpenParentAuth();
    } else {
      sensoryAudio.speakWord(title);
      onSelectModule(moduleId);
    }
  };

  const handleLogoutClick = () => {
    sensoryAudio.playClickSound();
    logoutUser();
    if (onLogout) {
      onLogout();
    }
  };

  const gameModules = [
    {
      id: 'expressive',
      title: 'Linguagem Expressiva',
      color: '#1E6091',
      iconSvg: (
        <div className="icon-blocks-wrap">
          <div className="block b-pink" />
          <div className="block b-blue" />
          <div className="block b-yellow" />
        </div>
      )
    },
    {
      id: 'communicative',
      title: 'Linguagem Comunicativa',
      color: '#7209B7',
      iconSvg: (
        <div className="icon-speech-wrap">
          <MessageSquare size={52} color="#4361EE" fill="#E0E7FF" />
          <span className="speech-dots">...</span>
        </div>
      )
    },
    {
      id: 'pragmatics',
      title: 'Pragmática',
      color: '#1E6091',
      iconSvg: (
        <div className="icon-puzzle-wrap">
          <Puzzle size={56} color="#70E000" fill="#E8FCC2" />
        </div>
      )
    },
    {
      id: 'phonological',
      title: 'Consciência Fonológica',
      color: '#7209B7',
      iconSvg: (
        <div className="icon-controller-wrap">
          <Gamepad2 size={58} color="#7209B7" />
        </div>
      )
    },
    {
      id: 'prosody',
      title: 'Prosódia',
      color: '#1E6091',
      iconSvg: (
        <div className="icon-stars-wrap">
          <Star size={44} color="#FFB703" fill="#FFB703" className="star-big" />
          <Star size={28} color="#FFD166" fill="#FFD166" className="star-small" />
        </div>
      )
    },
    {
      id: 'vocabulary',
      title: 'Vocabulário',
      color: '#7209B7',
      iconSvg: (
        <div className="icon-bulb-wrap">
          <Lightbulb size={56} color="#F72585" fill="#FFE5EC" />
        </div>
      )
    }
  ];

  return (
    <div className="hub-container">
      {/* HEADER TAGARELA COM PERFIL E LOGOUT */}
      <header className="hub-header">
        <h1 className="hub-tagarela-title">TAGARELA</h1>

        <div className="header-user-actions">
          {userSession && (
            <div className="logged-user-pill">
              <User size={18} color="#6B90A7" />
              <span>{userSession.email}</span>
            </div>
          )}

          <button className="btn-logout" onClick={handleLogoutClick} title="Sair da Conta">
            <LogOut size={18} />
            <span>Sair (Logout)</span>
          </button>
        </div>
      </header>

      {/* GRADE DE CARDS BASEADA FIELMENTE NA IMAGEM ANEXADA */}
      <main className="modules-grid-layout">
        {/* CARD VERTICAL 1: ÁREA DOS PAIS (CARD DESTAQUE NA ESQUERDA) */}
        <div
          className="parent-area-card"
          onClick={() => handleCardClick('parents', 'Área dos Pais')}
        >
          <div className="play-badge-circle">
            <Play size={18} fill="#FFFFFF" color="#FFFFFF" />
          </div>

          <div className="folder-icon-wrap">
            <FolderOpen size={64} color="#F7A619" fill="#FFFBEB" />
            <div className="confetti-dots">
              <span className="dot d-purple" />
              <span className="dot d-blue" />
              <span className="dot d-green" />
            </div>
          </div>

          <h2 className="parent-card-title">Área dos pais</h2>

          <div className="arrow-badge-btn">
            <ArrowRight size={24} color="#D97706" />
          </div>
        </div>

        {/* CARDS DOS 6 MÓDULOS DE JOGOS DA DIREITA */}
        <div className="games-cards-grid">
          {gameModules.map((mod) => (
            <div
              key={mod.id}
              className="game-module-card"
              onClick={() => handleCardClick(mod.id, mod.title)}
            >
              <div className="play-badge-circle">
                <Play size={16} fill="#FFFFFF" color="#FFFFFF" />
              </div>

              <div className="module-icon-area">
                {mod.iconSvg}
              </div>

              <h2 className="module-card-title" style={{ color: mod.color }}>
                {mod.title}
              </h2>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        .hub-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(180deg, #C4ECFF 0%, #E3F5FF 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px;
          overflow-y: auto;
          position: relative;
        }

        .hub-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1100px;
          margin-bottom: 28px;
        }

        .hub-tagarela-title {
          font-size: 3.2rem;
          font-weight: 900;
          color: #F7A619;
          letter-spacing: 0.08em;
          text-shadow: 
            0 4px 0 #D97706,
            0 8px 16px rgba(247, 166, 25, 0.25);
        }

        .header-user-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logged-user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #2D3748;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .btn-logout {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 2px solid #FCA5A5;
          padding: 10px 18px;
          border-radius: 24px;
          font-weight: 700;
          color: #DC2626;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .btn-logout:hover {
          transform: translateY(-2px);
          background: #FEE2E2;
        }

        .modules-grid-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
          width: 100%;
          max-width: 1100px;
        }

        .parent-area-card {
          background: #FFFFFF;
          border-radius: 28px;
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          min-height: 380px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
          border: 3px solid #FFFFFF;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease;
        }

        .parent-area-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.1);
          border-color: #F7A619;
        }

        .play-badge-circle {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 34px;
          height: 34px;
          background: #F7A619;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(247, 166, 25, 0.4);
        }

        .folder-icon-wrap {
          margin-top: 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .confetti-dots {
          position: absolute;
          top: -10px;
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .d-purple { background: #7209B7; }
        .d-blue { background: #4361EE; }
        .d-green { background: #70E000; }

        .parent-card-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #7209B7;
          text-align: center;
          margin: 16px 0;
        }

        .arrow-badge-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid #F7A619;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFBEB;
        }

        .games-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .game-module-card {
          background: #FFFFFF;
          border-radius: 28px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          min-height: 180px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.05);
          border: 3px solid #FFFFFF;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease;
        }

        .game-module-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.09);
          border-color: #6B90A7;
        }

        .module-icon-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 12px;
        }

        .module-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          text-align: center;
          line-height: 1.2;
          margin-top: 12px;
        }

        .icon-blocks-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .block {
          width: 48px;
          height: 14px;
          border-radius: 6px;
        }
        .b-pink { background: #F72585; }
        .b-blue { background: #4CC9F0; }
        .b-yellow { background: #FFB703; }

        .icon-speech-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .speech-dots {
          position: absolute;
          color: #4361EE;
          font-weight: 900;
          font-size: 1.4rem;
          top: 10px;
        }

        .icon-stars-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}
