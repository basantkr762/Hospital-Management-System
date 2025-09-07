// Doctor login endpoint
const doctors = [
  {
    _id: "doc1",
    email: "richard@hospital.com", 
    password: "ZG9jdG9yMTIz", // base64 encoded "doctor123"
    name: "Dr. Richard James",
    speciality: "General physician"
  },
  {
    _id: "doc2",
    email: "emily@hospital.com",
    password: "ZG9jdG9yMTIz", // base64 encoded "doctor123" 
    name: "Dr. Emily Larson",
    speciality: "Gynecologist"
  },
  {
    _id: "doc3", 
    email: "sarah@hospital.com",
    password: "ZG9jdG9yMTIz", // base64 encoded "doctor123"
    name: "Dr. Sarah Patel", 
    speciality: "Dermatologist"
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
    console.log('Doctor login - Raw request body:', req.body);
    console.log('Doctor login - Request headers:', req.headers);
    
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

    console.log('Doctor login attempt:', { email, passwordLength: password?.length });

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required',
        receivedData: { email: !!email, password: !!password }
      });
    }

    // Find doctor by email
    const doctor = doctors.find(d => d.email === email);
    if (!doctor) {
      console.log('Doctor not found:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password (base64 decoded)
    const storedPassword = Buffer.from(doctor.password, 'base64').toString('utf8');
    console.log('Doctor password check:', { provided: password, stored: storedPassword });
    
    if (storedPassword !== password) {
      console.log('Doctor password mismatch');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Create token (base64 encoded doctor id with role)
    const tokenData = { id: doctor._id, role: 'doctor' };
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
    console.log('Doctor login successful for:', email);

    res.status(200).json({
      success: true,
      message: 'Doctor login successful',
      token
    });

  } catch (error) {
    console.error('Doctor login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
}
