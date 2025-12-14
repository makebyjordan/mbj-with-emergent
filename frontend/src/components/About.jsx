import React from 'react';
import { Award, Users, Briefcase, Code } from 'lucide-react';
import { mockAbout } from '../mock';

const About = () => {
  return (
    <section id="about" className="section-container section-dark">
      <div className="section-content">
        <div className="about-layout">
          <div className="about-left">
            <span className="section-badge">Sobre Mí</span>
            <h2 className="section-title">Desarrollador Apasionado por la Innovación</h2>
            <p className="about-bio">{mockAbout.bio}</p>
            
            <div className="about-stats-grid">
              <div className="about-stat">
                <Award className="stat-icon" size={24} />
                <div>
                  <div className="stat-value">{mockAbout.experience}</div>
                  <div className="stat-label">Experiencia</div>
                </div>
              </div>
              
              <div className="about-stat">
                <Briefcase className="stat-icon" size={24} />
                <div>
                  <div className="stat-value">{mockAbout.projects}</div>
                  <div className="stat-label">Completados</div>
                </div>
              </div>
              
              <div className="about-stat">
                <Users className="stat-icon" size={24} />
                <div>
                  <div className="stat-value">{mockAbout.clients}</div>
                  <div className="stat-label">Satisfechos</div>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Trabajemos Juntos</span>
              <Code size={20} />
            </button>
          </div>

          <div className="about-right">
            <div className="skills-container">
              <h3 className="skills-title">Tecnologías & Herramientas</h3>
              <div className="skills-grid">
                {mockAbout.skills.map((skill, index) => (
                  <div key={index} className="skill-badge">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;