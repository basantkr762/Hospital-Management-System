// Simple registration test endpoint
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    console.log('Register endpoint hit');
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);

    // For now, just return success regardless of input
    const token = Buffer.from(`test:${Date.now()}`).toString('base64');

    return res.status(200).json({
      success: true,
      message: 'Test registration successful',
      token,
      debug: {
        receivedBody: req.body,
        bodyType: typeof req.body
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
}
