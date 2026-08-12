import React, { useState } from 'react';
import { SensoryProvider, useSensory } from './context/SensoryContext';
import { LoginView } from './components/Auth/LoginView';
import { GamesHubView } from './components/Games/GamesHubView';
import { ExpressiveLanguageGame } from './components/Games/ExpressiveLanguageGame';
import { VocabularyGame } from './components/Games/VocabularyGame';
import { ChildTherapyView } from './components/ChildMode/ChildTherapyView';
import { AdultDashboard } from './components/AdultMode/AdultDashboard';
import { Header } from './components/Navigation/Header';
import { PinModal } from './components/ChildMode/PinModal';

function AppContent() {
  const { settings, switchMode, userSession } = useSensory();
  
  // Se já estiver logado (sessão salva no localStorage), abre direto o Hub de Jogos.
  // Caso contrário, abre a Tela 1 de Login!
  const [currentView, setCurrentView] = useState(() => {
    return userSession ? 'hub' : 'login';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalAttempts: 48,
    correctCount: 42,
  });

  const handleRecordMetrics = (isSuccess) => {
    setStats((prev) => ({
      totalAttempts: prev.totalAttempts + 1,
      correctCount: isSuccess ? prev.correctCount + 1 : prev.correctCount,
    }));
  };

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'phonological') {
      setCurrentView('game_phonological');
    } else if (moduleId === 'expressive') {
      setCurrentView('game_expressive');
    } else if (moduleId === 'vocabulary') {
      setCurrentView('game_vocabulary');
    } else {
      setCurrentView('game_phonological');
    }
  };

  const handleOpenParentAuth = () => {
    switchMode('adult');
    setCurrentView('adult');
  };

  const handleLoginSuccess = () => {
    switchMode('child');
    setCurrentView('hub');
  };

  const handleReturnToHub = () => {
    switchMode('child');
    setCurrentView('hub');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  return (
    <div className="app-container">
      {/* Header do painel de estatísticas do adulto */}
      {currentView === 'adult' && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRequestUnlock={handleReturnToHub}
        />
      )}

      {/* TELA 1: LOGIN (Validação de e-mail e persistência de sessão) */}
      {currentView === 'login' && (
        <LoginView
          onLoginSuccess={handleLoginSuccess}
          onGuestChildAccess={handleLoginSuccess}
        />
      )}

      {/* TELA 2: HUB DE JOGOS (Exibe usuário logado e botão de Logout) */}
      {currentView === 'hub' && (
        <GamesHubView
          onSelectModule={handleSelectModule}
          onOpenParentAuth={handleOpenParentAuth}
          onLogout={handleLogout}
        />
      )}

      {/* MÓDULOS DE JOGOS INTERATIVOS */}
      {currentView === 'game_phonological' && (
        <ChildTherapyView
          onRecordMetrics={handleRecordMetrics}
          onBackToHub={handleReturnToHub}
        />
      )}

      {currentView === 'game_expressive' && (
        <ExpressiveLanguageGame onBackToHub={handleReturnToHub} />
      )}

      {currentView === 'game_vocabulary' && (
        <VocabularyGame onBackToHub={handleReturnToHub} />
      )}

      {/* PAINEL DOS PAIS / FONOAUDIÓLOGOS */}
      {currentView === 'adult' && (
        <AdultDashboard activeTab={activeTab} stats={stats} />
      )}

      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => {
          setIsPinModalOpen(false);
          switchMode('adult');
          setCurrentView('adult');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <SensoryProvider>
      <AppContent />
    </SensoryProvider>
  );
}
