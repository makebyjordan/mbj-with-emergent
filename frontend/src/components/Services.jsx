import React from 'react';
import { Code2, Brain, Zap, Check } from 'lucide-react';
import { mockServices } from '../mock';

const iconMap = {
  Code2: Code2,
  Brain: Brain,
  Zap: Zap
};

const Services = () => {
  return (
    <section id="services" className="section-container">
      <div className="section-content">
        <div className="section-header">
          <span className="section-badge">Servicios</span>
          <h2 className="section-title">¿Qué Puedo Hacer Por Ti?</h2>
          <p className="section-description">
            Soluciones tecnológicas de vanguardia adaptadas a las necesidades de tu negocio
          </p>
        </div>

        <div className="services-grid">
          {mockServices.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  <IconComponent className="service-icon" size={32} />
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-price">{service.price}</div>
                
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index} className="service-feature">
                      <Check size={16} className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Solicitar Cotización
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;