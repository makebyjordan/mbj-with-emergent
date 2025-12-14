import React, { useState } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - will be replaced with API call
    setTimeout(() => {
      toast.success('¡Mensaje enviado! Te contactaré pronto.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section-container">
      <div className="section-content">
        <div className="section-header">
          <span className="section-badge">Contacto</span>
          <h2 className="section-title">Hablemos de Tu Proyecto</h2>
          <p className="section-description">
            Completa el formulario y te responderé en menos de 24 horas
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-info-card">
              <Mail className="contact-icon" size={28} />
              <h3>Email</h3>
              <p>hola@makebyjordan.com</p>
            </div>
            
            <div className="contact-info-card">
              <MessageSquare className="contact-icon" size={28} />
              <h3>Respuesta Rápida</h3>
              <p>Menos de 24 horas</p>
            </div>
            
            <div className="contact-info-card">
              <CheckCircle className="contact-icon" size={28} />
              <h3>Disponibilidad</h3>
              <p>Lun - Vie, 9:00 - 18:00</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <User size={16} />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <Mail size={16} />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                <MessageSquare size={16} />
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                placeholder="¿En qué puedo ayudarte?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                <MessageSquare size={16} />
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Cuéntame sobre tu proyecto..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <span>Enviar Mensaje</span>
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;