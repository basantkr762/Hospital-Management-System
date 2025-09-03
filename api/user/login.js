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

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log("Login endpoint called");
    console.log("Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    console.log("Looking for user with email:", email);

    // Find user in memory storage
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    console.log("User found:", user.name);

    // Check password (decode from base64)
    const storedPassword = Buffer.from(user.password, 'base64').toString();
    console.log("Password check for:", email);
    
    if (storedPassword !== password) {
      console.log("Password mismatch");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create simple JWT token (base64 encoded user data)
    const tokenData = { id: user._id, email: user.email };
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    console.log("Login successful for:", email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      details: "Check server logs for more information"
    });
  }
}
