import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Heart, Sparkles, BookOpen } from 'lucide-react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

const STORAGE_CUSTOM_WORDS = 'tagarela_custom_words_v1';

const DEFAULT_FAMILY_WORDS = [
  { id: 1, word: 'NEXO', category: 'Pet da Família', emoji: '🐶' },
  { id: 2, word: 'CARRINHO', category: 'Brinquedo Favorito', emoji: '🚗' },
  { id: 3, word: 'BANANA', category: 'Comida Favorita', emoji: '🍌' },
];

export function CustomWordsManager() {
  const [words, setWords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_WORDS);
      return saved ? JSON.parse(saved) : DEFAULT_FAMILY_WORDS;
    } catch (e) {
      return DEFAULT_FAMILY_WORDS;
    }
  });

  const [newWord, setNewWord] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newEmoji, setNewEmoji] = useState('⭐');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_WORDS, JSON.stringify(words));
    } catch (e) {
      console.warn('Erro ao salvar palavras personalizadas:', e);
    }
  }, [words]);

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    sensoryAudio.playSuccessSound();
    const item = {
      id: Date.now(),
      word: newWord.trim().toUpperCase(),
      category: newCategory.trim() || 'Geral',
      emoji: newEmoji || '⭐'
    };

    setWords(prev => [item, ...prev]);
    setNewWord('');
    setNewCategory('');
  };

  const handleDeleteWord = (id) => {
    sensoryAudio.playClickSound();
    setWords(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="custom-words-container sensory-card">
      <div className="manager-header">
        <Heart size={28} color="#E11D48" />
        <h2>Banco de Palavras Afetivas da Família</h2>
      </div>
      <p className="manager-subtitle">
        Cadastre nomes de familiares, pets e objetos favoritos da criança para tornar a terapia fonoaudiológica personalizada e afetiva.
      </p>

      {/* FORMULÁRIO DE CADASTRO DE PALAVRA */}
      <form onSubmit={handleAddWord} className="word-add-form">
        <div className="input-group">
          <input
            type="text"
            className="sensory-input"
            placeholder="Nome / Palavra (ex: NEXO)"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
          <input
            type="text"
            className="sensory-input"
            placeholder="Categoria (ex: Pet)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <select
            className="sensory-select"
            value={newEmoji}
            onChange={(e) => setNewEmoji(e.target.value)}
          >
            <option value="🐶">🐶 Pet</option>
            <option value="🚗">🚗 Brinquedo</option>
            <option value="🍌">🍌 Comida</option>
            <option value="❤️">❤️ Família</option>
            <option value="⭐">⭐ Favorito</option>
          </select>
          <button type="submit" className="btn-add-word">
            <Plus size={20} />
            <span>Adicionar</span>
          </button>
        </div>
      </form>

      {/* LISTA DE PALAVRAS CADASTRADAS */}
      <div className="words-list-grid">
        {words.map((item) => (
          <div key={item.id} className="word-card-item">
            <span className="item-emoji">{item.emoji}</span>
            <div className="item-details">
              <span className="item-word">{item.word}</span>
              <span className="item-category">{item.category}</span>
            </div>
            <button className="btn-delete" onClick={() => handleDeleteWord(item.id)}>
              <Trash2 size={18} color="#E11D48" />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .custom-words-container {
          background: #FFFFFF;
          border-radius: 28px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 24px;
          border: 1px solid var(--border-color);
        }

        .manager-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .manager-header h2 {
          font-size: 1.6rem;
          font-weight: 800;
          color: #2D3748;
        }

        .manager-subtitle {
          font-size: 1rem;
          color: #5A6A85;
          font-weight: 600;
        }

        .word-add-form {
          margin-top: 8px;
        }

        .input-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .sensory-input, .sensory-select {
          flex: 1;
          min-width: 160px;
          height: 48px;
          border-radius: 24px;
          border: 2px solid #E2E8F0;
          padding: 0 18px;
          font-size: 1rem;
          font-family: inherit;
          outline: none;
        }

        .btn-add-word {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1E6091;
          color: #FFFFFF;
          border: none;
          padding: 0 24px;
          border-radius: 24px;
          font-weight: 800;
          cursor: pointer;
        }

        .words-list-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        .word-card-item {
          background: #F8FAFC;
          border: 2px solid #E2E8F0;
          border-radius: 20px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-emoji { font-size: 2rem; }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-word {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1E293B;
        }

        .item-category {
          font-size: 0.85rem;
          color: #64748B;
          font-weight: 600;
        }

        .btn-delete {
          background: #FFE4E6;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
