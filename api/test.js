module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log("Test endpoint called:", req.method, req.url);

  res.status(200).json({
    success: true,
    message: "Hospital Management System API is working!",
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: {
      'user-agent': req.headers['user-agent'],
      'origin': req.headers['origin'],
      'referer': req.headers['referer']
    },
    endpoints: {
      'POST /api/user/register': 'User registration',
      'POST /api/user/login': 'User login',
      'GET /api/user/get-profile': 'Get user profile (requires Authorization or token header)',
      'GET /api/doctor/list': 'Get doctors list',
      'POST /api/admin/login': 'Admin login'
    },
    testCredentials: {
      user: 'test@test.com / password123',
      admin: 'admin@hospital.com / admin123'
    },
    deploymentInfo: {
      environment: 'production',
      platform: 'vercel',
      apiFormat: 'serverless functions'
    }
  });
};
