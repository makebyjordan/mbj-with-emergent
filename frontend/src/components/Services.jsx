import React, { useState, useEffect } from 'react';
import { 
  Code2, Brain, Zap, Check, Handshake, Rocket, Shield, 
  Globe, Smartphone, Database, Cloud, Cpu, Lock, 
  BarChart, Users, Settings, Mail, Phone, Star,
  Briefcase, Target, TrendingUp, Award, Heart
} from 'lucide-react';
import { getServices } from '../services/api';
import { mockServices } from '../mock';

const iconMap = {
  Code2, Brain, Zap, Handshake, Rocket, Shield,
  Globe, Smartphone, Database, Cloud, Cpu, Lock,
  BarChart, Users, Settings, Mail, Phone, Star,
  Briefcase, Target, TrendingUp, Award, Heart
};

const Services = () => {
  const [services, setServices] = useState(mockServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        }
      } catch (error) {
        console.log('Using mock data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
          {services.map((service) => {
            // Normalizar nombre del icono (primera letra mayúscula)
            const iconName = service.icon ? service.icon.charAt(0).toUpperCase() + service.icon.slice(1).toLowerCase() : 'Code2';
            const IconComponent = iconMap[iconName] || iconMap[service.icon] || Code2;
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
                
                {service.ctaUrl ? (
                  <a 
                    href={service.ctaUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary"
                  >
                    {service.ctaText || 'Solicitar Cotización'}
                  </a>
                ) : (
                  <button 
                    className="btn-secondary" 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {service.ctaText || 'Solicitar Cotización'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;