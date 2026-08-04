import React, { useState } from 'react';
import { SensoryButton } from '../Shared/SensoryButton';
import { Target, Plus, CheckCircle, Clock, Trash2 } from 'lucide-react';

export function TherapyGoalsManager() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Articulação do Fonema /B/ e /P/', target: '90% de acertos', status: 'em_progresso', progress: 75 },
    { id: 2, title: 'Manutenção de Atenção Visual (Turn-Taking)', target: '15 minutos seguidos', status: 'concluido', progress: 100 },
    { id: 3, title: 'Discriminação Auditiva de Sons Agudos x Graves', target: '80% de acertos', status: 'em_progresso', progress: 60 },
  ]);

  const [newGoalTitle, setNewGoalTitle] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    setGoals(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newGoalTitle,
        target: 'Meta Personalizada',
        status: 'em_progresso',
        progress: 0
      }
    ]);
    setNewGoalTitle('');
  };

  const handleDeleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="goals-manager">
      <div className="goals-header sensory-card">
        <div className="goals-title">
          <Target size={28} color="#6B90A7" />
          <div>
            <h3>Gerenciador de Metas Terapêuticas</h3>
            <p>Cadastre os objetivos definidos pela fonoaudióloga para acompanhar a evolução clínica.</p>
          </div>
        </div>

        <form onSubmit={handleAddGoal} className="add-goal-form">
          <input
            type="text"
            className="goal-input"
            placeholder="Digite um novo objetivo (ex: Fonema /S/)..."
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
          />
          <SensoryButton type="submit" variant="primary">
            <Plus size={20} />
            <span>Adicionar Meta</span>
          </SensoryButton>
        </form>
      </div>

      <div className="goals-list">
        {goals.map((goal) => (
          <div key={goal.id} className="goal-card sensory-card">
            <div className="goal-status-icon">
              {goal.status === 'concluido' ? (
                <CheckCircle size={28} color="#7BA88B" />
              ) : (
                <Clock size={28} color="#6B90A7" />
              )}
            </div>

            <div className="goal-info">
              <h4>{goal.title}</h4>
              <span className="goal-target">Objetivo: {goal.target}</span>
              
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            <div className="goal-actions">
              <span className="progress-num">{goal.progress}%</span>
              <button
                className="btn-delete"
                onClick={() => handleDeleteGoal(goal.id)}
                title="Excluir meta"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .goals-manager {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .goals-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .goals-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .goals-title h3 {
          font-size: 1.3rem;
          color: var(--text-main);
        }

        .goals-title p {
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .add-goal-form {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .goal-input {
          flex: 1;
          padding: 14px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          transition: var(--transition-smooth);
        }

        .goal-input:focus {
          border-color: var(--accent-sky);
          box-shadow: 0 0 0 3px var(--accent-sky-light);
        }

        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .goal-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
        }

        .goal-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .goal-info h4 {
          font-size: 1.1rem;
          color: var(--text-main);
        }

        .goal-target {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .progress-bar-wrap {
          width: 100%;
          height: 10px;
          background: var(--bg-primary);
          border-radius: 10px;
          overflow: hidden;
          margin-top: 6px;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--accent-mint);
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        .goal-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .progress-num {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .btn-delete {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: var(--transition-smooth);
        }

        .btn-delete:hover {
          background: #FEE2E2;
          color: #DC2626;
        }
      `}</style>
    </div>
  );
}
