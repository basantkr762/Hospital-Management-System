export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, token');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log("Simple register endpoint called");
    console.log("Method:", req.method);
    console.log("Body:", req.body);

    if (req.method !== 'POST') {
      return res.status(405).json({ 
        success: false, 
        message: 'Method not allowed',
        method: req.method 
      });
    }

    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing Details",
        received: { name: !!name, email: !!email, password: !!password }
      });
    }

    // For now, just return success without database operations
    res.status(200).json({
      success: true,
      message: "Registration endpoint working",
      data: { name, email },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Simple register error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
