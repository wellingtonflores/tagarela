import React from 'react';
import { MetricsChart } from './MetricsChart';
import { TherapyGoalsManager } from './TherapyGoalsManager';
import { SensorySettingsPanel } from './SensorySettingsPanel';
import { CustomWordsManager } from './CustomWordsManager';

export function AdultDashboard({ activeTab, stats }) {
  return (
    <div className="adult-dashboard-container">
      <main className="dashboard-content">
        {activeTab === 'dashboard' && (
          <>
            <MetricsChart stats={stats} />
            <CustomWordsManager />
          </>
        )}
        {activeTab === 'goals' && (
          <>
            <TherapyGoalsManager />
            <CustomWordsManager />
          </>
        )}
        {activeTab === 'sensory' && <SensorySettingsPanel />}
      </main>

      <style>{`
        .adult-dashboard-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 80px);
          width: 100%;
          background: var(--bg-primary);
          overflow-y: auto;
          padding: 32px;
        }

        .dashboard-content {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          padding-bottom: 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
      `}</style>
    </div>
  );
}
