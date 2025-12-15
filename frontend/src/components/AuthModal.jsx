import React, { useState } from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === 'j1j1j1') {
      setError('');
      onSuccess();
    } else {
      setError('Código incorrecto');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div 
        className={`auth-modal ${isShaking ? 'shake' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="auth-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="auth-modal-header">
          <div className="auth-modal-icon">
            <Lock size={32} />
          </div>
          <h2>Acceso al Dashboard</h2>
          <p>Introduce el código de acceso</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal-form">
          <div className="auth-input-wrapper">
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="Código de acceso"
              className={`auth-input ${error ? 'auth-input-error' : ''}`}
              autoFocus
            />
            {error && (
              <div className="auth-error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <button type="submit" className="auth-submit-btn">
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
