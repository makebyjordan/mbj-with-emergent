import React from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { mockBlogPosts } from '../mock';

const Blog = () => {
  return (
    <section id="blog" className="section-container">
      <div className="section-content">
        <div className="section-header">
          <span className="section-badge">Blog</span>
          <h2 className="section-title">Últimos Artículos</h2>
          <p className="section-description">
            Comparto conocimientos, tutoriales y tendencias sobre tecnología e IA
          </p>
        </div>

        <div className="blog-grid">
          {mockBlogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image-wrapper">
                <img src={post.image} alt={post.title} className="blog-image" />
                <span className="blog-category-badge">{post.category}</span>
              </div>
              
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="meta-item">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="meta-item">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                
                <div className="blog-footer">
                  <div className="blog-author">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <button className="blog-read-more">
                    Leer más
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;