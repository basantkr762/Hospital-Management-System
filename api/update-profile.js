// Update profile endpoint
export default async function handler(req, res) {
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
    const { name, phone, address, gender, dob } = req.body;
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    // For now, just return success (in a real app, you'd update database)
    console.log('Updating profile:', { name, phone, address, gender, dob });

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        name,
        phone,
        address: JSON.parse(address || '{}'),
        gender,
        dob
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
