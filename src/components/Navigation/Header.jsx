import React from 'react';
import { useSensory } from '../../context/SensoryContext';
import { SensoryButton } from '../Shared/SensoryButton';
import { Lock, Sparkles, LayoutDashboard, Target, Sliders, ShieldAlert } from 'lucide-react';

export function Header({ activeTab, setActiveTab, onRequestUnlock }) {
  const { settings } = useSensory();
  const isChildMode = settings.activeMode === 'child';

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-logo">
          <img src="/icon.jpg" alt="Mascote Tagarela" className="header-cute-logo" />
          <span className="brand-name">Tagarela</span>
        </div>
        <span className="badge-mode">
          {isChildMode ? 'Modo Terapêutico (Criança)' : 'Modo Fonoaudiólogo / Adulto'}
        </span>
      </div>

      {!isChildMode ? (
        <nav className="adult-nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'goals' ? 'active' : ''}`}
            onClick={() => setActiveTab('goals')}
          >
            <Target size={20} />
            <span>Metas Terapêuticas</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'sensory' ? 'active' : ''}`}
            onClick={() => setActiveTab('sensory')}
          >
            <Sliders size={20} />
            <span>Ajustes Sensoriais</span>
          </button>
        </nav>
      ) : null}

      <div className="header-actions">
        {isChildMode ? (
          <SensoryButton
            variant="secondary"
            onClick={onRequestUnlock}
            ariaLabel="Área Protegida dos Pais"
            title="Clique para acessar o menu de adultos (Exige PIN)"
          >
            <Lock size={20} color="#6B90A7" />
            <span>Área do Adulto</span>
          </SensoryButton>
        ) : (
          <SensoryButton
            variant="success"
            onClick={onRequestUnlock}
            ariaLabel="Iniciar Modo Criança"
          >
            <ShieldAlert size={20} />
            <span>Iniciar Modo Criança (Kiosk)</span>
          </SensoryButton>
        )}
      </div>

      <style>{`
        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-soft);
          height: 80px;
          z-index: 10;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-cute-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(107, 144, 167, 0.2);
        }

        .brand-name {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--accent-sky);
          letter-spacing: -0.02em;
        }

        .badge-mode {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          background: var(--accent-sky-light);
          color: var(--text-main);
        }

        .adult-nav-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-primary);
          padding: 6px;
          border-radius: var(--radius-md);
        }

        .nav-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .nav-tab:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.6);
        }

        .nav-tab.active {
          background: var(--bg-surface);
          color: var(--accent-sky);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
      `}</style>
    </header>
  );
}
