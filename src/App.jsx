import React, { useState } from 'react';
import { SensoryProvider, useSensory } from './context/SensoryContext';
import { LoginView } from './components/Auth/LoginView';
import { GamesHubView } from './components/Games/GamesHubView';
import { ExpressiveLanguageGame } from './components/Games/ExpressiveLanguageGame';
import { VocabularyGame } from './components/Games/VocabularyGame';
import { VoiceRecorderGame } from './components/Games/VoiceRecorderGame';
import { SensoryCalmZone } from './components/Games/SensoryCalmZone';
import { StickerAlbumView } from './components/Games/StickerAlbumView';
import { ChildTherapyView } from './components/ChildMode/ChildTherapyView';
import { AdultDashboard } from './components/AdultMode/AdultDashboard';
import { Header } from './components/Navigation/Header';
import { PinModal } from './components/ChildMode/PinModal';

function AppContent() {
  const { settings, switchMode, userSession } = useSensory();
  
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
    } else if (moduleId === 'voice_recorder') {
      setCurrentView('game_voice_recorder');
    } else if (moduleId === 'calm_zone') {
      setCurrentView('game_calm_zone');
    } else if (moduleId === 'sticker_album') {
      setCurrentView('game_sticker_album');
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
      {currentView === 'adult' && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRequestUnlock={handleReturnToHub}
        />
      )}

      {currentView === 'login' && (
        <LoginView
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'hub' && (
        <GamesHubView
          onSelectModule={handleSelectModule}
          onOpenParentAuth={handleOpenParentAuth}
          onLogout={handleLogout}
        />
      )}

      {/* JOGOS E RECURSOS NOVOS v1.0.3 */}
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

      {currentView === 'game_voice_recorder' && (
        <VoiceRecorderGame onBackToHub={handleReturnToHub} />
      )}

      {currentView === 'game_calm_zone' && (
        <SensoryCalmZone onBackToHub={handleReturnToHub} />
      )}

      {currentView === 'game_sticker_album' && (
        <StickerAlbumView onBackToHub={handleReturnToHub} />
      )}

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
