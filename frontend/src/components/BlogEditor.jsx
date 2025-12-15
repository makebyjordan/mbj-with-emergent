import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Plus, Trash2, GripVertical, Eye, EyeOff,
  Youtube, Video, FileText, ListOrdered, Image, X, Check
} from 'lucide-react';
import { toast } from 'sonner';

const BlogEditor = ({ post, onSave, onCancel, isNew = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Jordan',
    category: '',
    image: '',
    readTime: '5 min',
    published: false,
    phases: [],
    videos: []
  });

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        phases: post.phases || [],
        videos: post.videos || []
      });
    }
  }, [post]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Phase management
  const addPhase = () => {
    setFormData(prev => ({
      ...prev,
      phases: [...prev.phases, { title: '', description: '' }]
    }));
  };

  const updatePhase = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      phases: prev.phases.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }));
  };

  const removePhase = (index) => {
    setFormData(prev => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index)
    }));
  };

  // Video management
  const addVideo = () => {
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, { title: '', url: '', type: 'youtube' }]
    }));
  };

  const updateVideo = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.map((v, i) => i === index ? { ...v, [field]: value } : v)
    }));
  };

  const removeVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // Handle YouTube Shorts
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    
    // Handle regular YouTube URLs
    const videoMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (videoMatch) return `https://www.youtube.com/embed/${videoMatch[1]}`;
    
    return null;
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error('El título es obligatorio');
      return;
    }
    if (!formData.excerpt.trim()) {
      toast.error('El extracto es obligatorio');
      return;
    }
    onSave(formData, isNew);
  };

  return (
    <div className="blog-editor">
      <div className="blog-editor-header">
        <button className="dash-btn dash-btn-secondary" onClick={onCancel}>
          <ArrowLeft size={16} /> Volver
        </button>
        <h2>{isNew ? 'Nuevo Artículo' : 'Editar Artículo'}</h2>
        <div className="blog-editor-actions">
          <button 
            className={`dash-btn ${formData.published ? 'dash-btn-success' : 'dash-btn-secondary'}`}
            onClick={() => handleChange('published', !formData.published)}
          >
            {formData.published ? <Eye size={16} /> : <EyeOff size={16} />}
            {formData.published ? 'Publicado' : 'Borrador'}
          </button>
          <button className="dash-btn dash-btn-primary" onClick={handleSubmit}>
            <Save size={16} /> Guardar
          </button>
        </div>
      </div>

      <div className="blog-editor-content">
        <div className="blog-editor-main">
          {/* Basic Info */}
          <section className="editor-section">
            <h3><FileText size={18} /> Información Básica</h3>
            
            <div className="dash-form-group">
              <label>Título del Artículo *</label>
              <input 
                value={formData.title} 
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Ej: Cómo implementar IA en tu negocio"
                className="editor-title-input"
              />
            </div>

            <div className="dash-form-group">
              <label>Extracto / Descripción corta *</label>
              <textarea 
                value={formData.excerpt} 
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Breve descripción que aparecerá en la lista de artículos..."
                rows={3}
              />
            </div>

            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>Categoría</label>
                <select value={formData.category} onChange={(e) => handleChange('category', e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="Desarrollo Web">Desarrollo Web</option>
                  <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                  <option value="Automatización">Automatización</option>
                  <option value="Tutoriales">Tutoriales</option>
                  <option value="Noticias">Noticias</option>
                </select>
              </div>
              <div className="dash-form-group">
                <label>Tiempo de lectura</label>
                <input 
                  value={formData.readTime} 
                  onChange={(e) => handleChange('readTime', e.target.value)}
                  placeholder="5 min"
                />
              </div>
              <div className="dash-form-group">
                <label>Autor</label>
                <input 
                  value={formData.author} 
                  onChange={(e) => handleChange('author', e.target.value)}
                />
              </div>
            </div>

            <div className="dash-form-group">
              <label><Image size={14} /> URL de Imagen de Portada</label>
              <input 
                value={formData.image} 
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://..."
              />
              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="Preview" />
                </div>
              )}
            </div>
          </section>

          {/* Content */}
          <section className="editor-section">
            <h3><FileText size={18} /> Contenido Principal</h3>
            <div className="dash-form-group">
              <label>Contenido del Artículo (Markdown soportado)</label>
              <textarea 
                value={formData.content || ''} 
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Escribe el contenido principal de tu artículo aquí..."
                rows={12}
                className="editor-content-textarea"
              />
            </div>
          </section>

          {/* Phases */}
          <section className="editor-section">
            <div className="section-header">
              <h3><ListOrdered size={18} /> Fases / Protocolo</h3>
              <button className="dash-btn dash-btn-secondary" onClick={addPhase}>
                <Plus size={14} /> Añadir Fase
              </button>
            </div>
            
            {formData.phases.length === 0 ? (
              <p className="editor-empty">No hay fases. Añade fases para crear un protocolo paso a paso.</p>
            ) : (
              <div className="phases-list">
                {formData.phases.map((phase, index) => (
                  <div key={index} className="phase-item">
                    <div className="phase-header">
                      <span className="phase-number">Fase {index + 1}</span>
                      <button className="dash-btn-icon dash-btn-danger" onClick={() => removePhase(index)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="dash-form-group">
                      <label>Título de la Fase</label>
                      <input 
                        value={phase.title} 
                        onChange={(e) => updatePhase(index, 'title', e.target.value)}
                        placeholder="Ej: Preparación inicial"
                      />
                    </div>
                    <div className="dash-form-group">
                      <label>Descripción</label>
                      <textarea 
                        value={phase.description} 
                        onChange={(e) => updatePhase(index, 'description', e.target.value)}
                        placeholder="Describe los pasos de esta fase..."
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Videos */}
          <section className="editor-section">
            <div className="section-header">
              <h3><Youtube size={18} /> Videos de YouTube</h3>
              <button className="dash-btn dash-btn-secondary" onClick={addVideo}>
                <Plus size={14} /> Añadir Video
              </button>
            </div>
            
            {formData.videos.length === 0 ? (
              <p className="editor-empty">No hay videos. Añade videos de YouTube o Shorts para enriquecer tu artículo.</p>
            ) : (
              <div className="videos-list">
                {formData.videos.map((video, index) => (
                  <div key={index} className="video-item">
                    <div className="video-form">
                      <div className="dash-form-row">
                        <div className="dash-form-group" style={{flex: 2}}>
                          <label>Título del Video</label>
                          <input 
                            value={video.title} 
                            onChange={(e) => updateVideo(index, 'title', e.target.value)}
                            placeholder="Ej: Tutorial paso a paso"
                          />
                        </div>
                        <div className="dash-form-group">
                          <label>Tipo</label>
                          <select value={video.type} onChange={(e) => updateVideo(index, 'type', e.target.value)}>
                            <option value="youtube">YouTube</option>
                            <option value="short">Short</option>
                          </select>
                        </div>
                        <button className="dash-btn-icon dash-btn-danger" onClick={() => removeVideo(index)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="dash-form-group">
                        <label>URL del Video</label>
                        <input 
                          value={video.url} 
                          onChange={(e) => updateVideo(index, 'url', e.target.value)}
                          placeholder="https://youtube.com/watch?v=... o https://youtube.com/shorts/..."
                        />
                      </div>
                    </div>
                    {video.url && getYouTubeEmbedUrl(video.url) && (
                      <div className={`video-preview ${video.type === 'short' ? 'video-preview-short' : ''}`}>
                        <iframe
                          src={getYouTubeEmbedUrl(video.url)}
                          title={video.title || 'Video preview'}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
