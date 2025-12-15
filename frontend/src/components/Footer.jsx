import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate('/dashboard');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">MAKE</span>
              <span className="logo-accent">BY</span>
              <span className="logo-text">JORDAN</span>
            </div>
            <p className="footer-description">
              Desarrollador freelance especializado en software, IA y automatizaciones. 
              Transformando ideas en realidad digital.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Servicios</h4>
            <ul className="footer-links">
              <li><a href="#services">Desarrollo de Software</a></li>
              <li><a href="#services">Asistentes con IA</a></li>
              <li><a href="#services">Automatizaciones</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Enlaces</h4>
            <ul className="footer-links">
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#about">Sobre Mí</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-links">
              <li>hola@makebyjordan.com</li>
              <li>+34 600 000 000</li>
              <li>Barcelona, España</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} MakeByJordan. Todos los derechos reservados.
          </p>
          <p className="footer-made-with">
            Hecho con <Heart size={14} className="heart-icon" /> y tecnología de vanguardia
          </p>
          <button className="dash-footer-btn" onClick={() => setShowAuthModal(true)}>
            <Settings size={14} />
            DASH
          </button>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </footer>
  );
};

export default Footer;