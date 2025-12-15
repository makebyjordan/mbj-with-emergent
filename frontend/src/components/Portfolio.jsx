import React, { useState, useEffect } from 'react';
import { ExternalLink, Filter } from 'lucide-react';
import { getProjects } from '../services/api';
import { mockProjects } from '../mock';

const Portfolio = () => {
  const [filter, setFilter] = useState('Todos');
  const [projects, setProjects] = useState(mockProjects);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.log('Using mock data:', error.message);
      }
    };
    fetchProjects();
  }, []);
  
  const categories = ['Todos', 'Desarrollo Web', 'Inteligencia Artificial', 'Automatización'];
  
  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="section-container section-dark">
      <div className="section-content">
        <div className="section-header">
          <span className="section-badge">Portfolio</span>
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-description">
            Algunos de los proyectos que he desarrollado para clientes satisfechos
          </p>
        </div>

        <div className="filter-container">
          <Filter size={18} className="filter-icon" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image-wrapper">
                <img src={project.image} alt={project.title} className="portfolio-image" />
                <div className="portfolio-overlay">
                  <a 
                    href={project.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="portfolio-link"
                    onClick={(e) => !project.link && e.preventDefault()}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <div className="portfolio-content">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                
                <div className="portfolio-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;