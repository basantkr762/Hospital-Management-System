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

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await connectDB();

    // Get token from headers
    const token = req.headers.token;
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    // Decode token (from base64)
    let decoded;
    try {
      const decodedStr = Buffer.from(token, 'base64').toString();
      decoded = JSON.parse(decodedStr);
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Get User model
    const User = mongoose.models.User || mongoose.model("User", userSchema);

    // Find user by ID
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Profile retrieved for:", user.email);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        address: user.address,
        gender: user.gender,
        dob: user.dob,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}
