import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Menu.css';

const Menu = () => {
  const { addToCart } = useCart();
  const [expandedSpecs, setExpandedSpecs] = useState({});

  const toggleSpecs = (productId) => {
    setExpandedSpecs((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const products = [
    {
      id: 'cafecopacabana250gr',
      name: 'Café Copacabana Molido 250g',
      price: 4500,
      description: 'Café molido tradicional de Copacabana, con cuerpo medio, aroma intenso y notas de cacao equilibradas, ideal para comenzar tu mañana con energía.',
      image: '/cafecopacabana250gr.png',
      tag: 'Nuevo',
      containImage: true,
      specs: [
        '⚖️ Peso: 250 g',
        '🌱 Grano: Blend de Arábica y Robusta seleccionados',
        '☕ Formato: Molido tradicional',
        '🔥 Tueste: Medio-oscuro con cuerpo denso'
      ]
    },
    {
      id: 'copabanaentero250gr',
      name: 'Café Copacabana Grano Entero 250g',
      price: 8000,
      description: 'Granos enteros premium de Copacabana. Su tueste artesanal preserva los aceites esenciales, liberando notas frutales y un aroma inigualable al momento de moler.',
      image: '/copabanaentero250gr.png',
      tag: 'Premium',
      containImage: true,
      specs: [
        '⚖️ Peso: 250 g',
        '🌱 Grano: 100% Arábica de altura',
        '☕ Formato: Grano entero',
        '🔥 Tueste: Medio artesanal para notas dulces'
      ]
    },
    {
      id: 'cafe4',
      name: 'Café de Especialidad 4',
      price: 8000,
      description: 'Un café suave y aromático, perfecto para quienes buscan una experiencia de sabor balanceada y reconfortante.',
      image: '/cafe4.png',
      tag: 'Nuevo'
    }
  ];

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        <div className="menu-header">
          <span className="menu-subtitle">Nuestra Selección</span>
          <h2 className="menu-title">Carta de Cafés de Especialidad</h2>
          <div className="menu-divider"></div>
          <p className="menu-intro">
            Cada taza es preparada minuciosamente por nuestros baristas certificados, utilizando agua filtrada y granos recién tostados.
          </p>
        </div>

        <div className="menu-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <span className="product-tag">{product.tag}</span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`product-image ${product.containImage ? 'product-image-contain' : ''}`}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                {product.specs && (
                  <div className="product-specs-toggle">
                    <button 
                      onClick={() => toggleSpecs(product.id)}
                      className="btn-specs-toggle"
                      aria-expanded={!!expandedSpecs[product.id]}
                    >
                      {expandedSpecs[product.id] ? 'Ocultar características ▲' : 'Ver características ▼'}
                    </button>
                    {expandedSpecs[product.id] && (
                      <ul className="product-specs-list">
                        {product.specs.map((spec, i) => (
                          <li key={i}>{spec}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="product-footer">
                  <span className="product-price">
                    ${product.price.toLocaleString('es-CL')}
                  </span>
                  <button 
                    className="btn-primary product-btn"
                    onClick={() => addToCart(product)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
