import React, { useState } from 'react';
import { useSensory } from '../../context/SensoryContext';
import { ArrowRight, Shield, Sparkles, AlertCircle } from 'lucide-react';
import { sensoryAudio } from '../../audio/SensoryAudioEngine';

export function LoginView({ onLoginSuccess, onGuestChildAccess }) {
  const { loginUser } = useSensory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    sensoryAudio.playClickSound();

    const result = loginUser(email, password);

    if (result.success) {
      sensoryAudio.playSuccessSound();
      setErrorMsg('');
      onLoginSuccess();
    } else {
      sensoryAudio.playRetrySound();
      setErrorMsg(result.error);
    }
  };

  const handleChildDirect = () => {
    sensoryAudio.playSuccessSound();
    // Login automático convidado para a criança
    loginUser('crianca@tagarela.com', '1234');
    onGuestChildAccess();
  };

  return (
    <div className="login-screen-wrap">
      {/* NUVENS DE FUNDO ANIMADAS SUAVEMENTE */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />

      <div className="login-card-box">
        {/* TÍTULO ESTILIZADO DOURADO TAGARELA */}
        <h1 className="tagarela-title-3d">TAGARELA</h1>

        {/* CONTAINER AMARELO DOURADO DA TELA */}
        <div className="yellow-container-card">
          <div className="auth-header">
            <Shield size={24} color="#7C4A03" />
            <span>Login de Acesso dos Pais / Fonoaudiólogos</span>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-field">
              <label htmlFor="email-input">Email:</label>
              <input
                id="email-input"
                type="email"
                className="pill-input"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password-input">Senha:</label>
              <input
                id="password-input"
                type="password"
                className="pill-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
              />
            </div>

            {errorMsg && (
              <div className="login-error-badge">
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button type="submit" className="btn-login-yellow">
              <span>Entrar no Tagarela</span>
              <ArrowRight size={22} />
            </button>
          </form>
        </div>

        {/* BOTÃO ATALHO DIRETO PARA ACESSO AOS JOGOS */}
        <div className="direct-child-access">
          <button className="btn-child-direct" onClick={handleChildDirect}>
            <Sparkles size={24} color="#F7A619" />
            <span>Entrar Direto como Criança (Jogos)</span>
          </button>
        </div>
      </div>

      <style>{`
        .login-screen-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 100%);
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 100px;
          filter: blur(4px);
          pointer-events: none;
        }

        .cloud-1 {
          width: 300px;
          height: 100px;
          top: 10%;
          left: -50px;
          animation: floatCloud 25s linear infinite;
        }

        .cloud-2 {
          width: 400px;
          height: 120px;
          top: 60%;
          right: -80px;
          animation: floatCloudSlow 35s linear infinite;
        }

        .cloud-3 {
          width: 250px;
          height: 80px;
          top: 80%;
          left: 15%;
          opacity: 0.5;
        }

        .login-card-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 480px;
          z-index: 10;
        }

        .tagarela-title-3d {
          font-size: 3.8rem;
          font-weight: 900;
          color: #F7A619;
          letter-spacing: 0.08em;
          text-shadow: 
            0 4px 0 #D97706,
            0 8px 16px rgba(247, 166, 25, 0.3);
          margin-bottom: 8px;
        }

        .yellow-container-card {
          width: 100%;
          background: #FCB827;
          border-radius: 36px;
          padding: 36px 32px;
          box-shadow: 
            0 16px 40px rgba(247, 166, 25, 0.35),
            inset 0 2px 4px rgba(255, 255, 255, 0.4);
          border: 4px solid #F59E0B;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .auth-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          color: #7C4A03;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-field {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .form-field label {
          font-size: 1.15rem;
          font-weight: 700;
          color: #451A03;
          width: 80px;
          text-align: right;
        }

        .pill-input {
          flex: 1;
          height: 52px;
          border-radius: 30px;
          border: 2px solid transparent;
          padding: 0 24px;
          font-size: 1.05rem;
          font-family: inherit;
          outline: none;
          background: #FFFFFF;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          transition: all 0.2s ease;
        }

        .pill-input:focus {
          border-color: #D97706;
          box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.25);
        }

        .login-error-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #FEE2E2;
          border: 1px solid #FCA5A5;
          color: #991B1B;
          padding: 10px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
        }

        .btn-login-yellow {
          margin-top: 8px;
          height: 56px;
          background: #FFFFFF;
          color: #B45309;
          font-size: 1.15rem;
          font-weight: 800;
          border: 3px solid #F59E0B;
          border-radius: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .btn-login-yellow:hover {
          transform: translateY(-2px);
          background: #FFFBEB;
        }

        .direct-child-access {
          width: 100%;
        }

        .btn-child-direct {
          width: 100%;
          height: 60px;
          background: #FFFFFF;
          border: 3px solid #F7A619;
          border-radius: 30px;
          font-size: 1.15rem;
          font-weight: 800;
          color: #D97706;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .btn-child-direct:hover {
          transform: translateY(-2px);
          background: #FEF3C7;
        }

        @keyframes floatCloud {
          0% { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }

        @keyframes floatCloudSlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100vw); }
        }
      `}</style>
    </div>
  );
}
