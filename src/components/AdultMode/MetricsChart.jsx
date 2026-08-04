import React from 'react';
import { TrendingUp, Clock, CheckCircle2, Award } from 'lucide-react';

export function MetricsChart({ stats }) {
  // Dados simulados de sessões dos últimos 7 dias
  const weeklyData = [
    { day: 'Seg', minutes: 15, accuracy: 80 },
    { day: 'Ter', minutes: 20, accuracy: 85 },
    { day: 'Qua', minutes: 12, accuracy: 75 },
    { day: 'Qui', minutes: 25, accuracy: 90 },
    { day: 'Sex', minutes: 18, accuracy: 88 },
    { day: 'Sáb', minutes: 30, accuracy: 95 },
    { day: 'Dom', minutes: 22, accuracy: 92 },
  ];

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes));

  return (
    <div className="metrics-dashboard">
      {/* SUMMARY CARDS */}
      <div className="summary-cards-grid">
        <div className="summary-card sensory-card">
          <div className="summary-icon sky">
            <Clock size={28} color="#6B90A7" />
          </div>
          <div className="summary-data">
            <span className="summary-label">Tempo Total na Semana</span>
            <span className="summary-value">142 min</span>
          </div>
        </div>

        <div className="summary-card sensory-card">
          <div className="summary-icon mint">
            <CheckCircle2 size={28} color="#7BA88B" />
          </div>
          <div className="summary-data">
            <span className="summary-label">Taxa Média de Acerto</span>
            <span className="summary-value">86.4%</span>
          </div>
        </div>

        <div className="summary-card sensory-card">
          <div className="summary-icon lavender">
            <Award size={28} color="#9385B1" />
          </div>
          <div className="summary-data">
            <span className="summary-label">Exercícios Concluídos</span>
            <span className="summary-value">{stats.totalAttempts || 48}</span>
          </div>
        </div>
      </div>

      {/* CHARTS CONTAINER */}
      <div className="charts-grid">
        {/* GRÁFICO 1: FREQUÊNCIA DE USO (MINUTOS) */}
        <div className="chart-card sensory-card">
          <div className="chart-header">
            <h3>Frequência Diária de Uso (Minutos)</h3>
            <span className="chart-badge">Últimos 7 Dias</span>
          </div>
          <div className="bar-chart-container">
            {weeklyData.map((d) => {
              const heightPercent = (d.minutes / maxMinutes) * 100;
              return (
                <div key={d.day} className="bar-col">
                  <div className="bar-val">{d.minutes}m</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <div className="bar-label">{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GRÁFICO 2: EVOLUÇÃO DA TAXA DE ACERTO */}
        <div className="chart-card sensory-card">
          <div className="chart-header">
            <h3>Evolução da Taxa de Acertos (%)</h3>
            <span className="chart-badge">Progresso Clínico</span>
          </div>
          <div className="line-chart-container">
            <svg viewBox="0 0 500 160" className="svg-line-chart">
              <path
                d="M 20 120 Q 80 100 150 90 T 300 40 T 480 30"
                fill="none"
                stroke="#7BA88B"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Pontos de dados */}
              <circle cx="20" cy="120" r="6" fill="#7BA88B" />
              <circle cx="100" cy="100" r="6" fill="#7BA88B" />
              <circle cx="180" cy="90" r="6" fill="#7BA88B" />
              <circle cx="260" cy="60" r="6" fill="#7BA88B" />
              <circle cx="340" cy="50" r="6" fill="#7BA88B" />
              <circle cx="420" cy="35" r="6" fill="#7BA88B" />
              <circle cx="480" cy="30" r="6" fill="#7BA88B" />
            </svg>
            <div className="chart-footer-trend">
              <TrendingUp size={20} color="#7BA88B" />
              <span>Evolução contínua demonstrando ganho fonético positivo</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .metrics-dashboard {
          display: flex;
          flex-direction: column;
          gap: 28px;
          width: 100%;
        }

        .summary-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .summary-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
        }

        .summary-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .summary-icon.sky { background: var(--accent-sky-light); }
        .summary-icon.mint { background: var(--accent-mint-light); }
        .summary-icon.lavender { background: var(--accent-lavender-light); }

        .summary-data {
          display: flex;
          flex-direction: column;
        }

        .summary-label {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .summary-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .chart-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chart-header h3 {
          font-size: 1.15rem;
          color: var(--text-main);
        }

        .chart-badge {
          font-size: 0.8rem;
          font-weight: 600;
          background: var(--bg-primary);
          padding: 4px 12px;
          border-radius: 12px;
          color: var(--text-muted);
        }

        .bar-chart-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 180px;
          padding-top: 20px;
        }

        .bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          height: 100%;
          flex: 1;
        }

        .bar-val {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .bar-track {
          flex: 1;
          width: 24px;
          background: var(--bg-primary);
          border-radius: 12px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .bar-fill {
          width: 100%;
          background: var(--accent-sky);
          border-radius: 12px;
          transition: height 0.6s ease;
        }

        .bar-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .line-chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .svg-line-chart {
          width: 100%;
          height: 160px;
          background: var(--bg-primary);
          border-radius: var(--radius-md);
          padding: 10px;
        }

        .chart-footer-trend {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
