import { useState, useEffect } from 'react';
import './FlowSimulator.css';

const FlowSimulator = ({ isOpen, onClose, amount, orderItems, onPaymentSuccess }) => {
  const [step, setStep] = useState(1); // 1: Flow Portal, 2: Webpay Simulator, 3: Processing, 4: Receipt
  const [selectedMethod, setSelectedMethod] = useState('webpay');
  const [cardNumber, setCardNumber] = useState('5970 2000 0540 1234');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [paymentStatus, setPaymentStatus] = useState('success'); // 'success' or 'failure'
  const [flowOrderNumber, setFlowOrderNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      // Generate a random Flow Order ID (e.g., FL-849204)
      setFlowOrderNumber(`FL-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handleStartPayment = () => {
    if (selectedMethod === 'webpay') {
      setStep(2); // Go to Webpay Simulator
    } else {
      // Direct processing for other methods
      setStep(3);
      setTimeout(() => {
        setStep(4);
      }, 2500);
    }
  };

  const handleWebpaySubmit = (e) => {
    e.preventDefault();
    setStep(3); // Show processing loader
    setTimeout(() => {
      setStep(4); // Show final receipt
    }, 2500);
  };

  const handleFinish = () => {
    if (paymentStatus === 'success') {
      onPaymentSuccess();
    }
    onClose();
  };

  return (
    <div className="flow-backdrop">
      <div className="flow-window">
        
        {/* Step 1: Flow Portal Selection */}
        {step === 1 && (
          <div className="flow-step-1">
            <div className="flow-header">
              <div className="flow-logo-container">
                <span className="flow-logo-icon">⚡</span>
                <span className="flow-logo-text">flow</span>
                <span className="flow-sandbox-badge">SANDBOX</span>
              </div>
              <div className="flow-order-info">
                <span className="flow-order-label">Orden: {flowOrderNumber}</span>
                <span className="flow-order-amount">${amount.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            <div className="flow-body">
              <h3 className="flow-body-title">Selecciona tu medio de pago</h3>
              
              <div className="flow-methods-grid">
                <div 
                  className={`flow-method-card ${selectedMethod === 'webpay' ? 'active' : ''}`}
                  onClick={() => handleSelectMethod('webpay')}
                >
                  <div className="method-logo-placeholder webpay-logo">
                    <span>Webpay Plus</span>
                  </div>
                  <p className="method-desc">Débito, Crédito, Prepago</p>
                  <div className="method-radio"></div>
                </div>

                <div 
                  className={`flow-method-card ${selectedMethod === 'onepay' ? 'active' : ''}`}
                  onClick={() => handleSelectMethod('onepay')}
                >
                  <div className="method-logo-placeholder onepay-logo">
                    <span>OnePay</span>
                  </div>
                  <p className="method-desc">Billetera digital Transbank</p>
                  <div className="method-radio"></div>
                </div>

                <div 
                  className={`flow-method-card ${selectedMethod === 'mach' ? 'active' : ''}`}
                  onClick={() => handleSelectMethod('mach')}
                >
                  <div className="method-logo-placeholder mach-logo">
                    <span>MACH</span>
                  </div>
                  <p className="method-desc">Pago rápido con tu cuenta MACH</p>
                  <div className="method-radio"></div>
                </div>

                <div 
                  className={`flow-method-card ${selectedMethod === 'servipag' ? 'active' : ''}`}
                  onClick={() => handleSelectMethod('servipag')}
                >
                  <div className="method-logo-placeholder servipag-logo">
                    <span>Servipag</span>
                  </div>
                  <p className="method-desc">Cupón de pago presencial o en línea</p>
                  <div className="method-radio"></div>
                </div>
              </div>

              <div className="flow-simulation-options">
                <label className="simulation-toggle-label">
                  <span>Simular resultado de transacción:</span>
                  <select 
                    value={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="flow-select"
                  >
                    <option value="success">Aprobada (Éxito)</option>
                    <option value="failure">Rechazada (Fallo)</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flow-footer">
              <button className="flow-cancel-btn" onClick={onClose}>Cancelar pago</button>
              <button className="flow-pay-btn" onClick={handleStartPayment}>
                Pagar ${amount.toLocaleString('es-CL')}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Webpay Transbank Simulator */}
        {step === 2 && (
          <div className="flow-step-2">
            <div className="transbank-header">
              <div className="transbank-logo">Webpay Plus</div>
              <div className="transbank-merchant">Comercio: Mane Cafe</div>
            </div>

            <div className="transbank-body">
              <div className="transbank-payment-box">
                <h3 className="transbank-title">Ingresa los datos de tu tarjeta</h3>
                <p className="transbank-subtitle">Simulador de Transbank Sandbox</p>
                
                <form onSubmit={handleWebpaySubmit} className="transbank-form">
                  <div className="t-group">
                    <label>Número de Tarjeta (Prueba)</label>
                    <input 
                      type="text" 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="t-row">
                    <div className="t-group">
                      <label>Vencimiento</label>
                      <input 
                        type="text" 
                        value={cardExpiry} 
                        onChange={(e) => setCardExpiry(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="t-group">
                      <label>CVV / CVC</label>
                      <input 
                        type="password" 
                        value={cardCvv} 
                        onChange={(e) => setCardCvv(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="transbank-info-alert">
                    Estás en el <strong>Ambiente de Pruebas (Sandbox)</strong> de Flow y Transbank. Puedes usar cualquier dato ficticio para simular.
                  </div>

                  <div className="transbank-actions">
                    <button type="button" className="t-btn-cancel" onClick={() => setStep(1)}>Volver</button>
                    <button type="submit" className="t-btn-pay">Pagar Ahora</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Processing payment loader */}
        {step === 3 && (
          <div className="flow-step-3">
            <div className="flow-loader-container">
              <div className="flow-spinner"></div>
              <h3>Procesando transacción con Flow</h3>
              <p>Conectando de forma segura con la entidad bancaria...</p>
              <div className="flow-progress-bar">
                <div className="flow-progress-fill"></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Final receipt screen */}
        {step === 4 && (
          <div className="flow-step-4">
            <div className="receipt-container">
              {paymentStatus === 'success' ? (
                <>
                  <div className="receipt-icon success">✓</div>
                  <h2 className="receipt-title text-success">¡Pago Exitoso!</h2>
                  <p className="receipt-subtitle">Comprobante de Pago Electrónico por Flow</p>
                </>
              ) : (
                <>
                  <div className="receipt-icon failure">✗</div>
                  <h2 className="receipt-title text-failure">Transacción Rechazada</h2>
                  <p className="receipt-subtitle">Flow no pudo procesar tu pago</p>
                </>
              )}

              <div className="receipt-details-box">
                <div className="receipt-row">
                  <span>Orden de Compra:</span>
                  <strong>{flowOrderNumber}</strong>
                </div>
                <div className="receipt-row">
                  <span>Comercio:</span>
                  <strong>Mane Cafe</strong>
                </div>
                <div className="receipt-row">
                  <span>Medio de Pago:</span>
                  <strong>{selectedMethod.toUpperCase()}</strong>
                </div>
                <div className="receipt-row">
                  <span>Monto Total:</span>
                  <strong>${amount.toLocaleString('es-CL')} CLP</strong>
                </div>
                <div className="receipt-row">
                  <span>Estado:</span>
                  <span className={paymentStatus === 'success' ? 'badge-success' : 'badge-failure'}>
                    {paymentStatus === 'success' ? 'ACEPTADA' : 'RECHAZADA'}
                  </span>
                </div>
              </div>

              <button className="btn-primary receipt-btn" onClick={handleFinish}>
                {paymentStatus === 'success' ? 'Volver a la Tienda' : 'Intentar de Nuevo'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FlowSimulator;
