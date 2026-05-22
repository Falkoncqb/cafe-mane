import { useState, useEffect } from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '+56966274175';
  const rawMessage = 'quiero consultar por el cafe !';
  const encodedMessage = encodeURIComponent(rawMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

  useEffect(() => {
    // Show a subtle tooltip inviting interaction after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="whatsapp-float-container">
      {showTooltip && (
        <div className="whatsapp-tooltip">
          <span>¡Escríbenos! ☕</span>
          <button 
            className="whatsapp-tooltip-close" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
          >
            &times;
          </button>
        </div>
      )}
      
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-btn-link"
        aria-label="Contactar por WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        {/* Animated outer ring for pulsing effect */}
        <div className="whatsapp-pulse-ring"></div>
        
        {/* Main WhatsApp Icon Button */}
        <div className="whatsapp-icon-wrapper">
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="whatsapp-svg-icon"
          >
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.016L2 22l5.13-1.346a9.92 9.92 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22.007 6.478 17.521 2 12.012 2zm0 18.29h-.003a8.27 8.27 0 01-4.224-1.163l-.303-.18-3.14.823.838-3.059-.197-.314a8.27 8.27 0 01-1.267-4.437c.001-4.57 3.722-8.287 8.298-8.287 4.566 0 8.282 3.716 8.283 8.288 0 4.57-3.72 8.289-8.282 8.289zm4.542-6.19c-.249-.125-1.472-.725-1.7-.807-.227-.083-.393-.125-.558.125-.165.25-.638.807-.783.974-.145.166-.29.187-.539.062a6.78 6.78 0 01-1.997-1.233 7.48 7.48 0 01-1.382-1.722c-.145-.25-.016-.385.109-.509.112-.112.249-.292.373-.438.124-.145.165-.25.249-.416.083-.166.041-.312-.02-.437-.063-.125-.558-1.347-.763-1.844-.2-.486-.401-.42-.558-.428-.145-.008-.31-.01-.476-.01a.91.91 0 00-.663.312c-.227.25-.87.854-.87 2.083 0 1.23.89 2.417.99 2.55.1.135 1.75 2.673 4.24 3.748.59.256 1.05.408 1.41.523.59.189 1.13.162 1.56.098.48-.072 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.166-.48-.29z" />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
