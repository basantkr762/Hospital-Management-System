// Get user profile endpoint
const users = [
  {
    _id: "user1",
    name: "Test User",
    email: "test@test.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    address: { line1: "123 Main St", line2: "City Center" },
    gender: "Not Selected",
    dob: "Not Selected",
    phone: "0000000000"
  }
];

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    // Decode token to get user ID (in production, use proper JWT verification)
    let userId;
    try {
      userId = Buffer.from(token, 'base64').toString('utf8');
    } catch (e) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    // Find user by ID
    const user = users.find(u => u._id === userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Return user profile (without password)
    const { password, ...userProfile } = user;

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      user: userProfile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}