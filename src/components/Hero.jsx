import { useCart } from '../context/CartContext';
import './Hero.css';
import GradualBlur from './GradualBlur';

const Hero = () => {
  const { addToCart } = useCart();

  const principalProduct = {
    id: 'latte-premium',
    name: 'Latte Brisa Marina - Blend Lobos',
    price: 20000,
    image: './cafe5.png',
    description: 'Nuestra mezcla exclusiva inspirada en las olas y la brisa de Punta de Lobos. Tostado artesanalmente frente a las costas de Pichilemu, este café combina granos de especialidad con la energía del océano. Una experiencia cálida y sedosa, perfecta para después de una sesión de surf o para contemplar el atardecer marino, con sutiles notas de caramelo salado y nueces.'
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-tag">Producto Estrella</span>
          <h1 className="hero-title">Café con Alma de Mar</h1>
          <p className="hero-description">{principalProduct.description}</p>
          <div className="hero-pricing">
            <span className="price-label">Precio Exclusivo</span>
            <span className="price-value">${principalProduct.price.toLocaleString('es-CL')}</span>
          </div>
          <div className="hero-actions">
            <button 
              className="btn-gold hero-btn"
              onClick={() => addToCart(principalProduct)}
            >
              Agregar al Carrito
            </button>
            <a href="#menu" className="btn-secondary hero-btn-secondary">
              Ver Carta Completa
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>
          <div className="hero-image-container">
            <img 
              src={principalProduct.image} 
              alt={principalProduct.name} 
              className="hero-image"
            />
            <GradualBlur
              target="parent"
              position="bottom"
              height="6rem"
              strength={2.5}
              divCount={6}
              curve="bezier"
              exponential={true}
              opacity={1}
              zIndex={5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
