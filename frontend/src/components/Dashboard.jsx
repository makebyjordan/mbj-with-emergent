import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Plus, Trash2, Edit2, X, Check,
  Briefcase, Code2, FileText, Users, User, MessageSquare,
  RefreshCw, Eye, EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  getServices, createService, updateService, deleteService,
  getProjects, createProject, updateProject, deleteProject,
  getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getAbout, updateAbout,
  getContacts, deleteContact
} from '../services/api';
import BlogEditor from './BlogEditor';

// Componente para editar un item
const EditableCard = ({ item, onSave, onCancel, onDelete, type }) => {
  const [localItem, setLocalItem] = useState(item);
  // Para campos de array que se editan como texto
  const [techText, setTechText] = useState(Array.isArray(item.technologies) ? item.technologies.join(', ') : '');
  const [featuresText, setFeaturesText] = useState(Array.isArray(item.features) ? item.features.join('\n') : '');

  const renderForm = () => {
    switch (type) {
      case 'services':
        return (
          <>
            <div className="dash-form-group">
              <label>Título</label>
              <input value={localItem.title || ''} onChange={(e) => setLocalItem({...localItem, title: e.target.value})} />
            </div>
            <div className="dash-form-group">
              <label>Descripción</label>
              <textarea value={localItem.description || ''} onChange={(e) => setLocalItem({...localItem, description: e.target.value})} />
            </div>
            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>Precio</label>
                <input value={localItem.price || ''} onChange={(e) => setLocalItem({...localItem, price: e.target.value})} />
              </div>
              <div className="dash-form-group">
                <label>Icono (Code2, Brain, Zap)</label>
                <input value={localItem.icon || ''} onChange={(e) => setLocalItem({...localItem, icon: e.target.value})} />
              </div>
            </div>
            <div className="dash-form-group">
              <label>Características (una por línea)</label>
              <textarea 
                value={featuresText} 
                onChange={(e) => setFeaturesText(e.target.value)}
                rows={5}
              />
            </div>
            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>Texto del Botón</label>
                <input value={localItem.ctaText || 'Solicitar Cotización'} onChange={(e) => setLocalItem({...localItem, ctaText: e.target.value})} placeholder="Solicitar Cotización" />
              </div>
              <div className="dash-form-group">
                <label>URL del Botón (opcional)</label>
                <input value={localItem.ctaUrl || ''} onChange={(e) => setLocalItem({...localItem, ctaUrl: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          </>
        );
      case 'projects':
        return (
          <>
            <div className="dash-form-group">
              <label>Título</label>
              <input value={localItem.title || ''} onChange={(e) => setLocalItem({...localItem, title: e.target.value})} />
            </div>
            <div className="dash-form-group">
              <label>Descripción</label>
              <textarea value={localItem.description || ''} onChange={(e) => setLocalItem({...localItem, description: e.target.value})} />
            </div>
            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>Categoría</label>
                <select value={localItem.category || ''} onChange={(e) => setLocalItem({...localItem, category: e.target.value})}>
                  <option value="">Seleccionar...</option>
                  <option value="Desarrollo Web">Desarrollo Web</option>
                  <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                  <option value="Automatización">Automatización</option>
                </select>
              </div>
              <div className="dash-form-group">
                <label>Link</label>
                <input value={localItem.link || ''} onChange={(e) => setLocalItem({...localItem, link: e.target.value})} />
              </div>
            </div>
            <div className="dash-form-group">
              <label>URL de Imagen</label>
              <input value={localItem.image || ''} onChange={(e) => setLocalItem({...localItem, image: e.target.value})} />
            </div>
            <div className="dash-form-group">
              <label>Tecnologías (separadas por coma)</label>
              <input 
                value={techText} 
                onChange={(e) => setTechText(e.target.value)}
              />
            </div>
            {localItem.image && (
              <div className="dash-image-preview">
                <img src={localItem.image} alt="Preview" />
              </div>
            )}
          </>
        );
      case 'blog':
        return (
          <>
            <div className="dash-form-group">
              <label>Título</label>
              <input value={localItem.title || ''} onChange={(e) => setLocalItem({...localItem, title: e.target.value})} />
            </div>
            <div className="dash-form-group">
              <label>Extracto</label>
              <textarea value={localItem.excerpt || ''} onChange={(e) => setLocalItem({...localItem, excerpt: e.target.value})} />
            </div>
            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>Autor</label>
                <input value={localItem.author || ''} onChange={(e) => setLocalItem({...localItem, author: e.target.value})} />
              </div>
              <div className="dash-form-group">
                <label>Categoría</label>
                <select value={localItem.category || ''} onChange={(e) => setLocalItem({...localItem, category: e.target.value})}>
                  <option value="">Seleccionar...</option>
                  <option value="Desarrollo Web">Desarrollo Web</option>
                  <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                  <option value="Automatización">Automatización</option>
                </select>
              </div>
            </div>
            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>URL de Imagen</label>
                <input value={localItem.image || ''} onChange={(e) => setLocalItem({...localItem, image: e.target.value})} />
              </div>
              <div className="dash-form-group">
                <label>Tiempo de lectura</label>
                <input value={localItem.readTime || ''} onChange={(e) => setLocalItem({...localItem, readTime: e.target.value})} />
              </div>
            </div>
          </>
        );
      case 'testimonials':
        return (
          <>
            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>Nombre</label>
                <input value={localItem.name || ''} onChange={(e) => setLocalItem({...localItem, name: e.target.value})} />
              </div>
              <div className="dash-form-group">
                <label>Rol / Empresa</label>
                <input value={localItem.role || ''} onChange={(e) => setLocalItem({...localItem, role: e.target.value})} />
              </div>
            </div>
            <div className="dash-form-group">
              <label>Testimonio</label>
              <textarea value={localItem.content || ''} onChange={(e) => setLocalItem({...localItem, content: e.target.value})} rows={4} />
            </div>
            <div className="dash-form-row">
              <div className="dash-form-group">
                <label>Rating (1-5)</label>
                <input type="number" min="1" max="5" value={localItem.rating || 5} onChange={(e) => setLocalItem({...localItem, rating: parseInt(e.target.value)})} />
              </div>
              <div className="dash-form-group">
                <label>URL Avatar</label>
                <input value={localItem.avatar || ''} onChange={(e) => setLocalItem({...localItem, avatar: e.target.value})} />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dash-card dash-card-editing">
      <div className="dash-form">
        {renderForm()}
      </div>
      <div className="dash-card-actions">
        <button className="dash-btn dash-btn-primary" onClick={() => {
          let itemToSave;
          switch (type) {
            case 'services':
              itemToSave = {
                id: localItem.id,
                title: localItem.title,
                description: localItem.description,
                price: localItem.price,
                icon: localItem.icon,
                features: featuresText.split('\n').filter(f => f.trim()),
                ctaText: localItem.ctaText || 'Solicitar Cotización',
                ctaUrl: localItem.ctaUrl || null
              };
              break;
            case 'projects':
              itemToSave = {
                id: localItem.id,
                title: localItem.title,
                description: localItem.description,
                category: localItem.category,
                image: localItem.image,
                link: localItem.link,
                technologies: techText.split(',').map(t => t.trim()).filter(t => t)
              };
              break;
            case 'testimonials':
              itemToSave = {
                id: localItem.id,
                name: localItem.name,
                role: localItem.role,
                content: localItem.content,
                rating: localItem.rating,
                avatar: localItem.avatar
              };
              break;
            default:
              itemToSave = localItem;
          }
          onSave(itemToSave);
        }}>
          <Check size={16} /> Guardar
        </button>
        <button className="dash-btn dash-btn-secondary" onClick={onCancel}>
          <X size={16} /> Cancelar
        </button>
      </div>
    </div>
  );
};

// Componente para crear nuevo item
const NewItemCard = ({ type, onSave, onCancel }) => {
  const getEmptyItem = () => {
    switch (type) {
      case 'services':
        return { title: '', description: '', price: '', features: [], icon: 'Code2' };
      case 'projects':
        return { title: '', description: '', category: '', image: '', technologies: [], link: '' };
      case 'blog':
        return { title: '', excerpt: '', author: 'Jordan', category: '', image: '', readTime: '5 min' };
      case 'testimonials':
        return { name: '', role: '', content: '', rating: 5, avatar: '' };
      default:
        return {};
    }
  };

  return (
    <EditableCard 
      item={getEmptyItem()} 
      onSave={onSave} 
      onCancel={onCancel}
      type={type}
    />
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');
  const [loading, setLoading] = useState(false);
  
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [about, setAbout] = useState(null);
  const [contacts, setContacts] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [skillsText, setSkillsText] = useState('');

  const tabs = [
    { id: 'services', label: 'Servicios', icon: Code2 },
    { id: 'projects', label: 'Proyectos', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'testimonials', label: 'Testimonios', icon: Users },
    { id: 'about', label: 'Sobre Mí', icon: User },
    { id: 'contacts', label: 'Mensajes', icon: MessageSquare },
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'services':
          const servicesRes = await getServices();
          setServices(servicesRes.data || []);
          break;
        case 'projects':
          const projectsRes = await getProjects();
          setProjects(projectsRes.data || []);
          break;
        case 'blog':
          const blogRes = await getBlogPosts();
          setBlogPosts(blogRes.data || []);
          break;
        case 'testimonials':
          const testimonialsRes = await getTestimonials();
          setTestimonials(testimonialsRes.data || []);
          break;
        case 'about':
          const aboutRes = await getAbout();
          setAbout(aboutRes.data);
          setSkillsText(Array.isArray(aboutRes.data?.skills) ? aboutRes.data.skills.join('\n') : '');
          break;
        case 'contacts':
          const contactsRes = await getContacts();
          setContacts(contactsRes.data || []);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item, isNew = false) => {
    try {
      switch (activeTab) {
        case 'services':
          if (isNew) await createService(item);
          else await updateService(item.id, item);
          break;
        case 'projects':
          if (isNew) await createProject(item);
          else await updateProject(item.id, item);
          break;
        case 'blog':
          if (isNew) await createBlogPost(item);
          else await updateBlogPost(item.id, item);
          break;
        case 'testimonials':
          if (isNew) await createTestimonial(item);
          else await updateTestimonial(item.id, item);
          break;
        case 'about':
          await updateAbout(item.id, item);
          break;
        default:
          break;
      }
      toast.success('Guardado correctamente');
      setEditingId(null);
      setIsCreating(false);
      fetchData();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este elemento?')) return;
    try {
      switch (activeTab) {
        case 'services':
          await deleteService(id);
          break;
        case 'projects':
          await deleteProject(id);
          break;
        case 'blog':
          await deleteBlogPost(id);
          break;
        case 'testimonials':
          await deleteTestimonial(id);
          break;
        case 'contacts':
          await deleteContact(id);
          break;
        default:
          break;
      }
      toast.success('Eliminado correctamente');
      fetchData();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const renderAboutForm = () => {
    if (!about) return <p className="dash-empty">Cargando información...</p>;
    return (
      <div className="dash-form">
        <div className="dash-form-row">
          <div className="dash-form-group">
            <label>Nombre</label>
            <input value={about.name || ''} onChange={(e) => setAbout({...about, name: e.target.value})} />
          </div>
          <div className="dash-form-group">
            <label>Título</label>
            <input value={about.title || ''} onChange={(e) => setAbout({...about, title: e.target.value})} />
          </div>
        </div>
        <div className="dash-form-group">
          <label>Biografía</label>
          <textarea value={about.bio || ''} onChange={(e) => setAbout({...about, bio: e.target.value})} rows={5} />
        </div>
        <div className="dash-form-row">
          <div className="dash-form-group">
            <label>Experiencia</label>
            <input value={about.experience || ''} onChange={(e) => setAbout({...about, experience: e.target.value})} />
          </div>
          <div className="dash-form-group">
            <label>Proyectos</label>
            <input value={about.projects || ''} onChange={(e) => setAbout({...about, projects: e.target.value})} />
          </div>
          <div className="dash-form-group">
            <label>Clientes</label>
            <input value={about.clients || ''} onChange={(e) => setAbout({...about, clients: e.target.value})} />
          </div>
        </div>
        <div className="dash-form-group">
          <label>Skills (una por línea)</label>
          <textarea 
            value={skillsText} 
            onChange={(e) => setSkillsText(e.target.value)}
            rows={6}
          />
        </div>
        <button className="dash-btn dash-btn-primary" onClick={() => {
          const aboutToSave = {
            ...about,
            skills: skillsText.split('\n').filter(s => s.trim())
          };
          handleSave(aboutToSave);
        }}>
          <Save size={16} /> Guardar Cambios
        </button>
      </div>
    );
  };

  const renderContactsList = () => (
    <div className="dash-contacts-list">
      {contacts.length === 0 ? (
        <p className="dash-empty">No hay mensajes</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="dash-contact-card">
            <div className="dash-contact-header">
              <div>
                <h4>{contact.name}</h4>
                <p className="dash-contact-email">{contact.email}</p>
              </div>
              <button className="dash-btn-icon dash-btn-danger" onClick={() => handleDelete(contact.id)}>
                <Trash2 size={16} />
              </button>
            </div>
            <p className="dash-contact-subject"><strong>Asunto:</strong> {contact.subject}</p>
            <p className="dash-contact-message">{contact.message}</p>
            <p className="dash-contact-date">{new Date(contact.createdAt).toLocaleDateString('es-ES')}</p>
          </div>
        ))
      )}
    </div>
  );

  const getData = () => {
    switch (activeTab) {
      case 'services': return services;
      case 'projects': return projects;
      case 'blog': return blogPosts;
      case 'testimonials': return testimonials;
      default: return [];
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="dash-loading"><RefreshCw className="spin" size={24} /> Cargando...</div>;
    }

    if (activeTab === 'about') return renderAboutForm();
    if (activeTab === 'contacts') return renderContactsList();
    
    // Blog uses special editor
    if (activeTab === 'blog') {
      if (isCreatingBlog) {
        return (
          <BlogEditor 
            isNew={true}
            onSave={async (data, isNew) => {
              await handleSave(data, isNew);
              setIsCreatingBlog(false);
            }}
            onCancel={() => setIsCreatingBlog(false)}
          />
        );
      }
      if (editingBlogPost) {
        return (
          <BlogEditor 
            post={editingBlogPost}
            onSave={async (data) => {
              await handleSave(data, false);
              setEditingBlogPost(null);
            }}
            onCancel={() => setEditingBlogPost(null)}
          />
        );
      }
      return renderBlogList();
    }

    const data = getData();
    
    return (
      <>
        {!isCreating && (
          <button className="dash-btn dash-btn-primary dash-btn-add" onClick={() => setIsCreating(true)}>
            <Plus size={16} /> Añadir Nuevo
          </button>
        )}
        
        {isCreating && (
          <NewItemCard 
            type={activeTab}
            onSave={(item) => handleSave(item, true)}
            onCancel={() => setIsCreating(false)}
          />
        )}
        
        <div className="dash-cards-grid">
          {data.map((item) => (
            editingId === item.id ? (
              <EditableCard 
                key={item.id}
                item={item}
                type={activeTab}
                onSave={(updatedItem) => handleSave(updatedItem)}
                onCancel={() => setEditingId(null)}
                onDelete={() => handleDelete(item.id)}
              />
            ) : (
              <div key={item.id} className="dash-card">
                <div className="dash-card-content">
                  <h3>{item.title || item.name}</h3>
                  <p>{item.description || item.excerpt || item.content || item.role}</p>
                </div>
                <div className="dash-card-actions">
                  <button className="dash-btn-icon" onClick={() => setEditingId(item.id)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="dash-btn-icon dash-btn-danger" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
        
        {data.length === 0 && !isCreating && (
          <p className="dash-empty">No hay elementos. ¡Crea el primero!</p>
        )}
      </>
    );
  };

  const renderBlogList = () => {
    return (
      <>
        <button className="dash-btn dash-btn-primary dash-btn-add" onClick={() => setIsCreatingBlog(true)}>
          <Plus size={16} /> Nuevo Artículo
        </button>
        
        <div className="dash-cards-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="dash-card blog-card">
              <div className="dash-card-content">
                <div className="blog-card-header">
                  <h3>{post.title}</h3>
                  <span className={`publish-badge ${post.published ? 'published' : 'draft'}`}>
                    {post.published ? <><Eye size={12} /> Publicado</> : <><EyeOff size={12} /> Borrador</>}
                  </span>
                </div>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{post.category}</span>
                  <span>{post.phases?.length || 0} fases</span>
                  <span>{post.videos?.length || 0} videos</span>
                </div>
              </div>
              <div className="dash-card-actions">
                <button className="dash-btn-icon" onClick={() => setEditingBlogPost(post)}>
                  <Edit2 size={16} />
                </button>
                <button className="dash-btn-icon dash-btn-danger" onClick={() => handleDelete(post.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {blogPosts.length === 0 && (
          <p className="dash-empty">No hay artículos. ¡Crea el primero!</p>
        )}
      </>
    );
  };

  return (
    <div className="dashboard">
      <div className="dash-sidebar">
        <div className="dash-sidebar-header">
          <button className="dash-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h1>Dashboard</h1>
        </div>
        
        <nav className="dash-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`dash-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingId(null);
                  setIsCreating(false);
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="dash-main">
        <header className="dash-header">
          <h2>{tabs.find(t => t.id === activeTab)?.label}</h2>
          <button className="dash-btn dash-btn-secondary" onClick={fetchData}>
            <RefreshCw size={16} /> Actualizar
          </button>
        </header>

        <div className="dash-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
