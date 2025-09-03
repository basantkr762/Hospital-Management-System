export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      status: "healthy",
      message: "Hospital Management System API is working!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      database: process.env.MONGODB_URI ? "configured" : "not configured"
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
