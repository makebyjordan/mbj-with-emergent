import React, { useState, useEffect } from 'react';
import { Award, Users, Briefcase, Code } from 'lucide-react';
import { getAbout } from '../services/api';
import { mockAbout } from '../mock';

const About = () => {
  const [about, setAbout] = useState(mockAbout);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await getAbout();
        if (response.data) {
          setAbout(response.data);
        }
      } catch (error) {
        console.log('Using mock data:', error.message);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="about" className="section-container section-dark">
      <div className="section-content">
        <div className="about-layout">
          <div className="about-left">
            <span className="section-badge">Sobre Mí</span>
            <h2 className="section-title">Desarrollador Apasionado por la Innovación</h2>
            <p className="about-bio">{about.bio}</p>
            
            <div className="about-stats-grid">
              <div className="about-stat">
                <Award className="stat-icon" size={24} />
                <div>
                  <div className="stat-value">{about.experience}</div>
                  <div className="stat-label">Experiencia</div>
                </div>
              </div>
              
              <div className="about-stat">
                <Briefcase className="stat-icon" size={24} />
                <div>
                  <div className="stat-value">{about.projects}</div>
                  <div className="stat-label">Completados</div>
                </div>
              </div>
              
              <div className="about-stat">
                <Users className="stat-icon" size={24} />
                <div>
                  <div className="stat-value">{about.clients}</div>
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
                {about.skills?.map((skill, index) => (
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