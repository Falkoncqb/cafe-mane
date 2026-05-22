import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const RELATED_PRODUCTS_PRESETS = [
  {
    id: 'cafecopacabana250gr',
    name: 'Café Copacabana Molido 250g',
    price: 4500,
    image: './cafecopacabana250gr.png'
  },
  {
    id: 'copabanaentero250gr',
    name: 'Café Copacabana Grano Entero 250g',
    price: 8000,
    image: './copabanaentero250gr.png'
  },
  {
    id: 'cafe4',
    name: 'Café de Especialidad 4',
    price: 8000,
    image: './cafe4.png'
  }
];

const CartDrawer = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    addToCart
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [step, setStep] = useState('cart'); // 'cart' or 'checkout'
  const [formData, setFormData] = useState({
    email: 'cliente.prueba@gmail.com',
    nombre: '',
    apellido: '',
    rut: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    if (isCartOpen) {
      setStep('cart');
      setErrorMsg('');
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  // Filter out products already in cart, unique list of 2
  const relatedProducts = RELATED_PRODUCTS_PRESETS.filter(
    (item) => !cartItems.some((cartItem) => cartItem.id === item.id)
  );
  const displayRelated = [...relatedProducts, ...RELATED_PRODUCTS_PRESETS]
    .filter((item, index, self) => self.findIndex(t => t.id === item.id) === index)
    .slice(0, 2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckoutRealFlow = async () => {
    const { email, nombre, apellido, rut, telefono, direccion } = formData;

    if (!email || !email.includes('@')) {
      setErrorMsg('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (!nombre.trim() || !apellido.trim() || !rut.trim() || !telefono.trim() || !direccion.trim()) {
      setErrorMsg('Por favor, completa todos los datos del cliente antes de pagar.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const shippingCost = 2000;
      const grandTotal = totalPrice + shippingCost;

      // Setup payload for the backend payment creator
      const payload = {
        amount: grandTotal,
        email: email,
        subject: `Compra de Café de ${nombre} ${apellido} (${cartItems.length} items)`,
        commerceOrder: `ORDER-${Date.now()}`
      };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      // Call our secure backend server
      const response = await fetch(`${API_URL}/api/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Check if we received a valid JSON response
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error('El servidor de pagos no devolvió una respuesta válida.');
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Error al iniciar transacción real con Flow.');
      }

      // If successful, redirect the browser directly to Flow's official production payment gateway!
      console.log('[Flow Real] Redirigiendo a pasarela oficial:', data.url);
      window.location.href = data.url;

    } catch (err) {
      console.error(err);
      
      // If it is a network error (failed to fetch), show the connection help message
      if (err instanceof TypeError) {
        setErrorMsg(
          'No se pudo conectar al servidor de pagos real. Recuerda iniciar tu servidor backend ejecutando "npm run server" en tu consola.'
        );
      } else {
        // Otherwise show the specific error returned by the backend or the API
        setErrorMsg(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3 className="cart-title">Tu Carrito</h3>
          <button 
            id="close-cart-btn"
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito de compras"
          >
            &times;
          </button>
        </div>

        {loading ? (
          <div className="cart-empty">
            <div className="flow-spinner"></div>
            <h3>Generando Orden Real en Flow...</h3>
            <p className="loading-desc">Redirigiendo de forma segura al portal de Flow Chile...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">☕</span>
            <p className="cart-empty-text">Tu carrito está esperando por el mejor café de especialidad.</p>
            <button 
              className="btn-primary"
              onClick={() => setIsCartOpen(false)}
            >
              Explorar Carta
            </button>
          </div>
        ) : (
          <>
            {step === 'cart' ? (
              <>
                <div className="cart-items-container">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <div className="cart-item-pricing">
                          <span className="cart-item-price">
                            ${item.price.toLocaleString('es-CL')}
                          </span>
                        </div>
                        <div className="cart-item-controls">
                          <div className="quantity-selector">
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button 
                            className="cart-item-remove"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* RELATED PRODUCTS "Te puede interesar" */}
                  <div className="cart-related-section">
                    <h4 className="cart-related-title">Te puede interesar</h4>
                    <div className="cart-related-grid">
                      {displayRelated.map((product) => (
                        <div key={product.id} className="cart-related-item">
                          <img src={product.image} alt={product.name} className="cart-related-image" />
                          <div className="cart-related-info">
                            <h5 className="cart-related-name">{product.name}</h5>
                            <span className="cart-related-price">${product.price.toLocaleString('es-CL')}</span>
                          </div>
                          <button 
                            className="cart-related-add-btn"
                            onClick={() => addToCart(product)}
                          >
                            + Agregar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row highlight">
                    <span>Subtotal Productos:</span>
                    <span>${totalPrice.toLocaleString('es-CL')}</span>
                  </div>
                  
                  <div className="cart-summary-actions">
                    <button 
                      className="btn-gold checkout-btn"
                      onClick={() => setStep('checkout')}
                    >
                      Ir a Pagar ➔
                    </button>
                    <button 
                      className="clear-cart-btn"
                      onClick={clearCart}
                    >
                      Vaciar Todo
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="checkout-step-container">
                  <button 
                    className="back-to-cart-btn"
                    onClick={() => setStep('cart')}
                    disabled={loading}
                  >
                    ← Volver al Carrito
                  </button>

                  <div className="checkout-customer-section">
                    <h4 className="checkout-section-title">👤 Datos del Cliente</h4>
                    <div className="checkout-form-grid">
                      <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Juan"
                          disabled={loading}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                          type="text"
                          id="apellido"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          placeholder="Pérez"
                          disabled={loading}
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="juan.perez@gmail.com"
                          disabled={loading}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="rut">RUT</label>
                        <input
                          type="text"
                          id="rut"
                          name="rut"
                          value={formData.rut}
                          onChange={handleInputChange}
                          placeholder="12.345.678-9"
                          disabled={loading}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="+56 9 1234 5678"
                          disabled={loading}
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label htmlFor="direccion">Dirección de Despacho</label>
                        <input
                          type="text"
                          id="direccion"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          placeholder="Av. Providencia 1234, Depto 402"
                          disabled={loading}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-summary">
                  {errorMsg && (
                    <div className="flow-error-alert">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <div className="cart-summary-row">
                    <span>Subtotal Productos:</span>
                    <span>${totalPrice.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Costo de Envío:</span>
                    <span>$2.000</span>
                  </div>
                  <div className="cart-summary-row highlight">
                    <span>Total General:</span>
                    <span>${(totalPrice + 2000).toLocaleString('es-CL')}</span>
                  </div>
                  
                  <div className="cart-summary-actions">
                    <button 
                      className="btn-gold checkout-btn"
                      onClick={handleCheckoutRealFlow}
                      disabled={loading}
                    >
                      {loading ? 'Procesando Pago...' : 'Ir a Pagar'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
