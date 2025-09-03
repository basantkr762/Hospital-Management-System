export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, token');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log("Register endpoint called with method:", req.method);
    console.log("Request body:", req.body);

    if (req.method !== 'POST') {
      return res.status(405).json({ 
        success: false, 
        message: 'Method not allowed. Use POST.',
        method: req.method 
      });
    }

    // Parse request body
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in request body"
        });
      }
    }

    const { name, email, password } = body || {};

    console.log("Parsed data:", { name, email, password: password ? '***' : 'missing' });

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: name, email, password",
        received: { 
          name: !!name, 
          email: !!email, 
          password: !!password 
        }
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter a valid email address" 
      });
    }

    // Password length validation
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 8 characters long" 
      });
    }

    // For now, simulate successful registration
    // TODO: Add MongoDB integration once basic endpoint works
    const mockToken = "mock_jwt_token_" + Date.now();

    console.log("Registration successful for:", email);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: mockToken,
      user: {
        name,
        email
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
