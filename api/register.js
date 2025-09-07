// User registration endpoint
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
      message: 'Method not allowed',
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  // Quick test response to verify the endpoint is reachable
  if (req.body === undefined || req.body === null) {
    return res.status(400).json({ 
      success: false, 
      message: 'No request body received',
      debug: {
        bodyType: typeof req.body,
        body: req.body,
        headers: req.headers['content-type']
      }
    });
  }

  try {
    console.log('Registration attempt started');
    console.log('Request method:', req.method);
    console.log('Request body type:', typeof req.body);
    console.log('Request body:', req.body);
    console.log('Content-Type header:', req.headers['content-type']);

    // Handle different body parsing scenarios
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
        console.log('Parsed JSON body:', body);
      } catch (e) {
        console.log('Failed to parse JSON body:', e);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid JSON in request body',
          receivedBody: req.body
        });
      }
    }

    // Basic field extraction
    const name = body?.name || '';
    const email = body?.email || '';
    const password = body?.password || '';
    
    console.log('Extracted fields:', { 
      name: name ? 'present' : 'missing', 
      email: email ? 'present' : 'missing', 
      password: password ? `${password.length} chars` : 'missing' 
    });

    // Basic validation
    if (!name || !email || !password) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields (name, email, password)',
        received: { 
          hasName: !!name, 
          hasEmail: !!email, 
          hasPassword: !!password 
        }
      });
    }

    // Create token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    console.log('Registration successful for:', email);

    return res.status(200).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        name,
        email,
        id: Date.now().toString()
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}