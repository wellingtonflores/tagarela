import React, { useState, useRef, useEffect } from 'react';
import { Play, MessageSquare, Puzzle, Gamepad2, Star, Lightbulb, LogOut, User, Mic, HeartHandshake, Award, Settings, ChevronDown, ShieldCheck } from 'lucide-react';
import { useSensory } from '../../context/SensoryContext';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

export function GamesHubView({ onSelectModule, onOpenParentAuth, onLogout }) {
  const { userSession, logoutUser } = useSensory();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCardClick = (moduleId) => {
    sensoryAudio.playClickSound();
    // NÃO fala o nome do módulo automaticamente. A fala ocorre estritamente ao clicar no botão "Ouvir".
    onSelectModule(moduleId);
  };

  const handleOpenParentPanel = () => {
    sensoryAudio.playClickSound();
    setIsDropdownOpen(false);
    onOpenParentAuth();
  };

  const handleLogoutClick = () => {
    sensoryAudio.playClickSound();
    setIsDropdownOpen(false);
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
      id: 'voice_recorder',
      title: 'Imitação Vocal (Gravador)',
      color: '#F72585',
      iconSvg: <Mic size={52} color="#F72585" />
    },
    {
      id: 'calm_zone',
      title: 'Cantinho da Calmaria',
      color: '#166534',
      iconSvg: <HeartHandshake size={54} color="#4CAF50" />
    },
    {
      id: 'sticker_album',
      title: 'Álbum de Figurinhas',
      color: '#B45309',
      iconSvg: <Award size={54} color="#F59E0B" />
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
      {/* HEADER TAGARELA COM DROPDOWN MENU NO EMAIL DO USUÁRIO */}
      <header className="hub-header">
        <h1 className="hub-tagarela-title">TAGARELA</h1>

        <div className="header-user-actions" ref={dropdownRef}>
          <div
            className={`logged-user-dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="user-avatar-circle">
              <User size={18} color="#1E6091" />
            </div>
            <span className="user-email-text">{userSession?.email || 'Fonoaudiólogo(a)'}</span>
            <ChevronDown size={18} className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
          </div>

          {/* MENU DROPDOWN DE OPÇÕES DOS PAIS */}
          {isDropdownOpen && (
            <div className="user-options-dropdown-menu">
              <div className="dropdown-header-info">
                <span className="info-title">Conta do Responsável</span>
                <span className="info-email">{userSession?.email}</span>
              </div>

              <div className="dropdown-divider" />

              <button className="dropdown-item-btn" onClick={handleOpenParentPanel}>
                <ShieldCheck size={20} color="#7209B7" />
                <div className="item-text-group">
                  <span className="item-title">Painel do Adulto / Área dos Pais</span>
                  <span className="item-sub">Estatísticas, Relatórios e Configurações</span>
                </div>
              </button>

              <button className="dropdown-item-btn" onClick={handleOpenParentPanel}>
                <Settings size={20} color="#1E6091" />
                <div className="item-text-group">
                  <span className="item-title">Preferências Sensoriais</span>
                  <span className="item-sub">Ajuste de Cores, Fontes e Áudio</span>
                </div>
              </button>

              <div className="dropdown-divider" />

              <button className="dropdown-item-btn logout" onClick={handleLogoutClick}>
                <LogOut size={20} color="#DC2626" />
                <span>Sair da Conta (Logout)</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* GRADE DE JOGOS LIMPA (SEM FALA AUTOMÁTICA) */}
      <main className="modules-grid-clean">
        {gameModules.map((mod) => (
          <div
            key={mod.id}
            className="game-module-card"
            onClick={() => handleCardClick(mod.id)}
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
          position: relative;
        }

        .logged-user-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 2px solid #E2E8F0;
          padding: 8px 16px;
          border-radius: 28px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.2s ease;
        }

        .logged-user-dropdown-trigger:hover, .logged-user-dropdown-trigger.active {
          border-color: #F7A619;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(247, 166, 25, 0.15);
        }

        .user-avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E1ECF4;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-email-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: #2D3748;
        }

        .chevron-icon {
          color: #718096;
          transition: transform 0.2s ease;
        }

        .chevron-icon.open {
          transform: rotate(180deg);
        }

        .user-options-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 310px;
          background: #FFFFFF;
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border: 2px solid #E2E8F0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: dropdownFadeIn 0.2s ease;
        }

        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header-info {
          display: flex;
          flex-direction: column;
          padding: 4px 8px 8px 8px;
        }

        .info-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #A0AEC0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .info-email {
          font-size: 1rem;
          font-weight: 800;
          color: #1A202C;
          margin-top: 2px;
        }

        .dropdown-divider {
          height: 1px;
          background: #EDF2F7;
          margin: 4px 0;
        }

        .dropdown-item-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          border-radius: 16px;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        }

        .dropdown-item-btn:hover {
          background: #F7FAFC;
        }

        .dropdown-item-btn.logout:hover {
          background: #FEE2E2;
        }

        .item-text-group {
          display: flex;
          flex-direction: column;
        }

        .item-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #2D3748;
        }

        .item-sub {
          font-size: 0.8rem;
          color: #718096;
          font-weight: 500;
        }

        .modules-grid-clean {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 1100px;
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

        .play-badge-circle {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          background: #F7A619;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(247, 166, 25, 0.4);
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
