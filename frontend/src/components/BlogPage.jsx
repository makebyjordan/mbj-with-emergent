import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, Calendar, Clock, User, Tag, 
  Youtube, ListOrdered, Share2, ChevronRight
} from 'lucide-react';
import api from '../services/api';

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      // Intentar primero por slug, luego por ID
      let response;
      try {
        response = await api.get(`/blog/slug/${slug}`);
      } catch {
        // Si falla por slug, intentar por ID
        response = await api.get(`/blog/${slug}`);
      }
      setPost(response.data);
    } catch (err) {
      setError('Artículo no encontrado');
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    const videoMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (videoMatch) return `https://www.youtube.com/embed/${videoMatch[1]}`;
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-page-loading">
          <div className="loading-spinner"></div>
          <p>Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-page">
        <div className="blog-page-error">
          <h2>Artículo no encontrado</h2>
          <p>El artículo que buscas no existe o ha sido eliminado.</p>
          <button className="dash-btn dash-btn-primary" onClick={() => navigate('/blog')}>
            <ArrowLeft size={16} /> Volver al Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Header */}
      <header className="blog-page-header">
        <div className="blog-page-nav">
          <button className="blog-back-btn" onClick={() => navigate('/blog')}>
            <ArrowLeft size={20} />
            <span>Blog</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="blog-hero">
        {post.image && (
          <div className="blog-hero-image">
            <img src={post.image} alt={post.title} />
            <div className="blog-hero-overlay"></div>
          </div>
        )}
        <div className="blog-hero-content">
          {post.category && (
            <span className="blog-category-badge">{post.category}</span>
          )}
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span><User size={14} /> {post.author}</span>
            <span><Calendar size={14} /> {formatDate(post.date)}</span>
            <span><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="blog-article">
        {/* Excerpt */}
        <div className="blog-excerpt">
          <p>{post.excerpt}</p>
        </div>

        {/* Main Content */}
        {post.content && (
          <div className="blog-content markdown-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        )}

        {/* Phases / Protocol */}
        {post.phases && post.phases.length > 0 && (
          <section className="blog-phases">
            <h2><ListOrdered size={24} /> Fases del Protocolo</h2>
            <div className="phases-timeline">
              {post.phases.map((phase, index) => (
                <div key={phase.id || index} className="phase-card">
                  <div className="phase-indicator">
                    <span className="phase-num">{index + 1}</span>
                    {index < post.phases.length - 1 && <div className="phase-line"></div>}
                  </div>
                  <div className="phase-content">
                    <h3>{phase.title}</h3>
                    <div className="phase-description">
                      {phase.description.split('\n').map((p, idx) => (
                        p.trim() ? <p key={idx}>{p}</p> : null
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos */}
        {post.videos && post.videos.length > 0 && (
          <section className="blog-videos">
            <h2><Youtube size={24} /> Videos Relacionados</h2>
            <div className="videos-grid">
              {post.videos.map((video, index) => {
                const embedUrl = getYouTubeEmbedUrl(video.url);
                if (!embedUrl) return null;
                
                return (
                  <div key={video.id || index} className={`video-card ${video.type === 'short' ? 'video-short' : ''}`}>
                    <div className="video-wrapper">
                      <iframe
                        src={embedUrl}
                        title={video.title || `Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {video.title && (
                      <div className="video-info">
                        <h4>{video.title}</h4>
                        <span className="video-type-badge">{video.type === 'short' ? 'Short' : 'Video'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Share */}
        <div className="blog-share">
          <span>Compartir:</span>
          <div className="share-buttons">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              Twitter
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </article>

      {/* Footer navigation */}
      <div className="blog-page-footer">
        <button className="dash-btn dash-btn-secondary" onClick={() => navigate('/blog')}>
          <ArrowLeft size={16} /> Ver más artículos
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
