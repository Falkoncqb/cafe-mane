import './Footer.css';
import GradualBlur from './GradualBlur';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-banner">
        <img src="./footer_coffee.png" alt="Café de Especialidad" className="footer-banner-image" />
        <GradualBlur
          target="parent"
          position="bottom"
          height="120px"
          strength={4}
          divCount={8}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={5}
        />
        <GradualBlur
          target="parent"
          position="top"
          height="120px"
          strength={4}
          divCount={8}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={5}
        />
      </div>

      <div className="footer-container">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img src="./logocafe.png" alt="Mane Cafe Logo" className="footer-logo-img" />
            <span className="logo-text">Mane Cafe</span>
          </div>
          <p className="footer-tagline">El sabor del grano tostado a la perfección en cada taza.</p>
        </div>
        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#menu">Menú</a>
          <a href="#contacto">Contacto</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mane Cafe. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
