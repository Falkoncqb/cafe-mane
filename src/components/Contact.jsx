import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          
          <div className="contact-info-panel">
            <span className="contact-subtitle">Contacto</span>
            <h2 className="contact-title">Visítanos o Escríbenos</h2>
            <p className="contact-text">
              ¿Tienes dudas sobre nuestros orígenes de granos de especialidad o quieres cotizar para eventos especiales? Completa el formulario y te responderemos en minutos.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Nuestra Cafetería</h4>
                  <p>Av. Providencia 1240, Santiago, Chile</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon">⏰</div>
                <div>
                  <h4>Horario de Atención</h4>
                  <p>Lunes a Sábado: 08:00 a 20:00 hrs</p>
                  <p>Domingo: 09:00 a 18:00 hrs</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Teléfono & WhatsApp</h4>
                  <p>+56 9 8765 4321</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-success">
                <span className="success-icon">✉️</span>
                <h3>¡Mensaje Enviado con Éxito!</h3>
                <p>Agradecemos tu interés. Uno de nuestros baristas o asesores se pondrá en contacto contigo a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Juan Pérez"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ej. juan@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tu Mensaje o Consulta</label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe tu consulta sobre café, compras o eventos..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-gold contact-submit-btn">
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
