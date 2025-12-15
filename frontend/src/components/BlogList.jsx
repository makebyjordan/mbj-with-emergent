import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import api from '../services/api';

const BlogList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/blog/published');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const categories = ['all', ...new Set(posts.map(p => p.category).filter(Boolean))];
  const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="blog-list-page">
        <div className="blog-list-loading">
          <div className="loading-spinner"></div>
          <p>Cargando artículos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-page">
      {/* Header */}
      <header className="blog-list-header">
        <div className="blog-list-header-content">
          <button className="blog-home-btn" onClick={() => navigate('/')}>
            ← Volver al inicio
          </button>
          <h1>Blog</h1>
          <p>Artículos sobre desarrollo, IA y automatización</p>
        </div>
      </header>

      {/* Filters */}
      {categories.length > 1 && (
        <div className="blog-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <div className="blog-posts-grid">
        {filteredPosts.length === 0 ? (
          <div className="blog-empty">
            <p>No hay artículos publicados todavía.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <article 
              key={post.id} 
              className="blog-post-card"
              onClick={() => navigate(`/blog/${post.slug || post.id}`)}
            >
              {post.image && (
                <div className="post-card-image">
                  <img src={post.image} alt={post.title} />
                  {post.category && (
                    <span className="post-category">{post.category}</span>
                  )}
                </div>
              )}
              <div className="post-card-content">
                <h2>{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span><User size={14} /> {post.author}</span>
                  <span><Calendar size={14} /> {formatDate(post.date)}</span>
                  <span><Clock size={14} /> {post.readTime}</span>
                </div>
                {post.phases && post.phases.length > 0 && (
                  <div className="post-features">
                    <span className="feature-badge">{post.phases.length} Fases</span>
                  </div>
                )}
                {post.videos && post.videos.length > 0 && (
                  <div className="post-features">
                    <span className="feature-badge video">{post.videos.length} Videos</span>
                  </div>
                )}
                <div className="post-read-more">
                  Leer más <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
