import connectDB from "../backend/config/mongodb.js";

// Set environment variables for Vercel
process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://basan:DLTqybe83hWOXqdk@cluster0.68b6a78f7e42b06580894849.mongodb.net";
process.env.JWT_SECRET = process.env.JWT_SECRET || "hospital_management_system_jwt_secret_2025_secure_key";
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hospital.com";
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
process.env.NODE_ENV = "production";

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
    await connectDB();
    
    res.status(200).json({
      message: "Hospital Management System API",
      status: "connected",
      timestamp: new Date().toISOString(),
      database: "MongoDB Atlas Connected",
      endpoints: [
        "/api/admin",
        "/api/doctor", 
        "/api/user"
      ]
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      error: "Database connection failed",
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
