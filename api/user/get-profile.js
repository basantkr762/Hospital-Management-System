// Simple in-memory storage for development (will be replaced with MongoDB)
let users = [
  {
    _id: "user1",
    name: "Test User",
    email: "test@test.com",
    password: "cGFzc3dvcmQxMjM=", // base64 encoded "password123"
    image: "https://via.placeholder.com/150?text=User",
    address: { line1: "123 Main St", line2: "City Center" },
    gender: "Not Selected",
    dob: "Not Selected",
    phone: "0000000000"
  }
];

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

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log("Get profile endpoint called");

    // Get token from headers
    const token = req.headers.token;
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    console.log("Token received:", token);

    // Decode token (from base64)
    let decoded;
    try {
      const decodedStr = Buffer.from(token, 'base64').toString();
      decoded = JSON.parse(decodedStr);
      console.log("Decoded token:", decoded);
    } catch (error) {
      console.log("Token decode error:", error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Find user by ID
    const user = users.find(u => u._id === decoded.id);
    if (!user) {
      console.log("User not found for ID:", decoded.id);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Profile retrieved for:", user.email);

    // Return user data without password
    const userProfile = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      address: user.address,
      gender: user.gender,
      dob: user.dob,
      phone: user.phone
    };

    res.status(200).json({
      success: true,
      user: userProfile
    });

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      details: "Check server logs for more information"
    });
  }
}
