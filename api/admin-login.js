// Admin login endpoint
const admins = [
  {
    _id: "admin1", 
    email: "admin@hospital.com",
    password: "YWRtaW4xMjM=", // base64 encoded "admin123"
    name: "Hospital Admin"
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Admin login - Raw request body:', req.body);
    console.log('Admin login - Request headers:', req.headers);
    
    // Handle different body parsing scenarios
    let body = req.body;
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch (e) {
        console.log('Failed to parse body as JSON:', e);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid JSON format' 
        });
      }
    }

    const { email, password } = body;

    console.log('Admin login attempt:', { email, passwordLength: password?.length });

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required',
        receivedData: { email: !!email, password: !!password }
      });
    }

    // Find admin by email
    const admin = admins.find(a => a.email === email);
    if (!admin) {
      console.log('Admin not found:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password (base64 decoded)
    const storedPassword = Buffer.from(admin.password, 'base64').toString('utf8');
    console.log('Admin password check:', { provided: password, stored: storedPassword });
    
    if (storedPassword !== password) {
      console.log('Admin password mismatch');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Create token (base64 encoded admin id with role)
    const tokenData = { id: admin._id, role: 'admin' };
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
    console.log('Admin login successful for:', email);

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
}
