import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Retrieve credentials from .env
const FLOW_API_KEY = process.env.FLOW_API_KEY || 'TU_FLOW_API_KEY_REAL';
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY || 'TU_FLOW_SECRET_KEY_REAL';
const FLOW_API_URL = 'https://www.flow.cl/api'; // Production Flow API URL

/**
 * Helper to generate Flow API Signature (s)
 * 1. Sort parameters alphabetically by key.
 * 2. Concatenate key + value.
 * 3. Generate HMAC-SHA256 signature using Secret Key.
 */
function generateSignature(params, secretKey) {
  const sortedKeys = Object.keys(params).sort();
  let signString = '';
  
  for (const key of sortedKeys) {
    signString += key + params[key];
  }
  
  return crypto
    .createHmac('sha256', secretKey)
    .update(signString)
    .digest('hex');
}

// Endpoint to create a payment request to the real Flow production server
app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, email, subject, commerceOrder } = req.body;

    if (!amount || !email) {
      return res.status(400).json({ error: 'Falta el monto o correo electrónico.' });
    }

    // Prepare parameters for Flow payment creation
    const params = {
      apiKey: FLOW_API_KEY,
      amount: amount.toString(),
      currency: 'CLP',
      subject: subject || 'Compra en Mane Cafe',
      email: email,
      commerceOrder: commerceOrder || `ORDER-${Date.now()}`,
      urlConfirmation: process.env.URL_CONFIRMATION || 'https://tu-dominio.com/api/flow-webhook',
      urlReturn: process.env.URL_RETURN || 'http://localhost:5173/#inicio?status=success',
    };

    // Generate Flow HMAC-SHA256 signature
    params.s = generateSignature(params, FLOW_SECRET_KEY);

    // Convert parameters to URL-encoded form data (Flow requires application/x-www-form-urlencoded)
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, value);
    }

    console.log(`[Flow] Iniciando pago real por $${amount} para ${email}...`);

    // Call real Flow Production API
    const response = await fetch(`${FLOW_API_URL}/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (!response.ok || data.code) {
      console.error('[Flow Error]', data);
      return res.status(400).json({ 
        error: 'Error al contactar a Flow', 
        message: data.message || 'Credenciales inválidas o error de API.' 
      });
    }

    // Flow returns: { url: "https://www.flow.cl/app/pay.php?token=...", token: "...", flowOrder: 12345 }
    res.json({
      url: `${data.url}?token=${data.token}`,
      token: data.token,
      flowOrder: data.flowOrder
    });

  } catch (error) {
    console.error('[Server Error]', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar el pago.' });
  }
});

// Start backend server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`☕ Servidor de pagos de Café en modo REAL (Flow) corriendo en http://localhost:${PORT}`);
});
