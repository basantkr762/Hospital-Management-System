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
    console.log("Register endpoint called");
    console.log("Request body:", req.body);

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    console.log("Checking if user exists:", email);

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Simple password hashing (base64 encoding)
    const hashedPassword = Buffer.from(password).toString('base64');

    // Create new user
    const newUser = {
      _id: "user" + (users.length + 1),
      name,
      email,
      password: hashedPassword,
      image: "https://via.placeholder.com/150?text=" + name.charAt(0),
      address: { line1: "", line2: "" },
      gender: "Not Selected",
      dob: "Not Selected",
      phone: "0000000000"
    };

    // Add to users array
    users.push(newUser);

    // Create simple JWT token (base64 encoded user data)
    const tokenData = { id: newUser._id, email: newUser.email };
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    console.log("User registered successfully:", newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      details: "Check server logs for more information"
    });
  }
}
