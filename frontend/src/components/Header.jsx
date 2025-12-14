import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`dark-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo-container" onClick={() => scrollToSection('home')}>
          <span className="logo-text">MAKE</span>
          <span className="logo-accent">BY</span>
          <span className="logo-text">JORDAN</span>
        </div>

        <nav className="dark-nav desktop-nav">
          <a onClick={() => scrollToSection('services')} className="dark-nav-link">Servicios</a>
          <a onClick={() => scrollToSection('portfolio')} className="dark-nav-link">Portfolio</a>
          <a onClick={() => scrollToSection('blog')} className="dark-nav-link">Blog</a>
          <a onClick={() => scrollToSection('about')} className="dark-nav-link">Sobre Mí</a>
          <button className="btn-primary-small" onClick={() => scrollToSection('contact')}>
            Contacto
          </button>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <a onClick={() => scrollToSection('services')} className="mobile-nav-link">Servicios</a>
            <a onClick={() => scrollToSection('portfolio')} className="mobile-nav-link">Portfolio</a>
            <a onClick={() => scrollToSection('blog')} className="mobile-nav-link">Blog</a>
            <a onClick={() => scrollToSection('about')} className="mobile-nav-link">Sobre Mí</a>
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>
              Contacto
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;