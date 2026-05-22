import './CoffeeMockup3D.css';

const CoffeeMockup3D = () => {
  return (
    <section className="mockup-3d-section">
      <div className="mockup-3d-container">
        
        {/* Header Block */}
        <div className="mockup-header">
          <span className="mockup-subtitle">Fidelidad Visual Premium</span>
          <h2 className="mockup-title">El Arte de la Crema y el Vertido</h2>
          <div className="mockup-divider"></div>
          <p className="mockup-intro">
            Explora la física detrás del vertido barista. Una infusión óptima se corona con una crema densa y persistente, capturando la esencia aromática del grano colombiano.
          </p>
        </div>

        {/* Dynamic Realistic Workspace */}
        <div className="mockup-workspace">
          
          {/* Information Spec Sheet (Left side) */}
          <div className="mockup-info-panel">
            <h3 className="panel-heading">La Ciencia de la Espuma</h3>
            
            <div className="foam-science-list">
              <div className="science-item">
                <div className="science-icon">☕</div>
                <div className="science-details">
                  <h4>Emulsión de Aceites (Crema)</h4>
                  <p>La combinación de agua caliente a alta presión extrae los aceites esenciales del café, creando una capa cremosa de microburbujas doradas que sellan el calor y el aroma.</p>
                </div>
              </div>

              <div className="science-item">
                <div className="science-icon">🌡️</div>
                <div className="science-details">
                  <h4>Temperatura de Vertido Óptima</h4>
                  <p>Un vertido entre 90°C y 94°C garantiza la disolución de los compuestos dulces y ácidos del café sin quemar la espuma arábica, manteniendo su dulzura natural.</p>
                </div>
              </div>

              <div className="science-item">
                <div className="science-icon">✨</div>
                <div className="science-details">
                  <h4>Textura Terciopelo (Microespuma)</h4>
                  <p>Burbujas microscópicas de menos de 0.1 mm de diámetro que le otorgan al café una sensación táctil sedosa y un cuerpo denso e inconfundible.</p>
                </div>
              </div>
            </div>

            {/* Technical Specs Summary */}
            <div className="foam-specs-table">
              <div className="spec-row">
                <span>Espesor de Crema Recomendado</span>
                <span>3 - 4 mm</span>
              </div>
              <div className="spec-row">
                <span>Persistencia del Aroma</span>
                <span>Hasta 15 min</span>
              </div>
              <div className="spec-row">
                <span>Tensión Superficial</span>
                <span>Excelente (Soporta Latte Art)</span>
              </div>
            </div>
          </div>

          {/* Realistic Coffee Cup Mockup Box (Right side) */}
          <div className="mockup-viewer-box">
            
            {/* The Cup Frame */}
            <div className="cup-frame-realistic">
              
              {/* Overlay Steam Particles */}
              <div className="steam-overlay-container">
                <span className="steam-wave steam-wave-1"></span>
                <span className="steam-wave steam-wave-2"></span>
                <span className="steam-wave steam-wave-3"></span>
              </div>

              {/* Photorealistic Image Mockup */}
              <img 
                src="/coffee_mockup_3d.png" 
                alt="Mockup de Taza de Café Realista" 
                className="realistic-cup-image"
              />

              {/* Light reflection sweep */}
              <div className="glass-reflection-shine"></div>

              {/* Highlight callouts pointing to the foam */}
              <div className="foam-callout callout-foam-surface">
                <div className="callout-dot"></div>
                <div className="callout-line"></div>
                <div className="callout-text">
                  <h5>Crema Dorada Aterciopelada</h5>
                  <p>Microburbujas densas 100% Arábica</p>
                </div>
              </div>

              <div className="foam-callout callout-pour-impact">
                <div className="callout-dot"></div>
                <div className="callout-line"></div>
                <div className="callout-text">
                  <h5>Punto de Vertido</h5>
                  <p>Infusión continua a 92°C</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CoffeeMockup3D;
