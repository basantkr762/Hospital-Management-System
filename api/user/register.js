import mongoose from "mongoose";

// MongoDB connection
const connectDB = async () => {
  if (mongoose.connections[0].readyState === 1) {
    return;
  }
  
  try {
    const mongoUri = "mongodb+srv://basan:DLTqybe83hWOXqdk@cluster0.68b6a78f7e42b06580894849.mongodb.net";
    await mongoose.connect(`${mongoUri}/Hospital-Management-System`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "https://via.placeholder.com/150?text=User" },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "0000000000" }
}, { timestamps: true });

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
    // Connect to database
    await connectDB();

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

    // Get User model
    const User = mongoose.models.User || mongoose.model("User", userSchema);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Simple password hashing (for now, we'll use base64 - not secure for production)
    const hashedPassword = Buffer.from(password).toString('base64');

    // Create new user
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();

    // Create simple JWT token (base64 encoded user ID)
    const token = Buffer.from(JSON.stringify({ id: user._id, email: user.email })).toString('base64');

    console.log("User registered successfully:", user._id);

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
      error: error.message
    });
  }
}
