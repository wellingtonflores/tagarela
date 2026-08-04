import React, { useState } from 'react';
import { SensoryProvider, useSensory } from './context/SensoryContext';
import { Header } from './components/Navigation/Header';
import { ChildTherapyView } from './components/ChildMode/ChildTherapyView';
import { AdultDashboard } from './components/AdultMode/AdultDashboard';
import { PinModal } from './components/ChildMode/PinModal';

function AppContent() {
  const { settings, switchMode } = useSensory();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'goals', 'sensory'
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

  const handleRequestUnlock = () => {
    if (settings.activeMode === 'child') {
      // Exigir PIN para ir para o modo adulto
      setIsPinModalOpen(true);
    } else {
      // Ir diretamente para o modo criança (iniciar sessão kiosk)
      switchMode('child');
    }
  };

  const handlePinSuccess = () => {
    setIsPinModalOpen(false);
    switchMode('adult');
  };

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRequestUnlock={handleRequestUnlock}
      />

      {settings.activeMode === 'child' ? (
        <ChildTherapyView onRecordMetrics={handleRecordMetrics} />
      ) : (
        <AdultDashboard activeTab={activeTab} stats={stats} />
      )}

      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handlePinSuccess}
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
