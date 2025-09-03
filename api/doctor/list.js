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

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Number, required: true },
  slots_booked: { type: Object, default: {} },
  available: { type: Boolean, default: true }
}, { timestamps: true });

// Create some sample doctors if none exist
const createSampleDoctors = async (Doctor) => {
  const count = await Doctor.countDocuments();
  if (count === 0) {
    const sampleDoctors = [
      {
        name: "Dr. Richard James",
        email: "richard@hospital.com",
        password: Buffer.from("password123").toString('base64'),
        image: "https://via.placeholder.com/200x200?text=Dr.+Richard",
        speciality: "General physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Davis has a strong commitment to delivering comprehensive medical care",
        fees: 50,
        address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
        date: Date.now(),
        available: true
      },
      {
        name: "Dr. Emily Larson",
        email: "emily@hospital.com", 
        password: Buffer.from("password123").toString('base64'),
        image: "https://via.placeholder.com/200x200?text=Dr.+Emily",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        about: "Dr. Davis has a strong commitment to delivering comprehensive medical care",
        fees: 60,
        address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
        date: Date.now(),
        available: true
      },
      {
        name: "Dr. Sarah Patel",
        email: "sarah@hospital.com",
        password: Buffer.from("password123").toString('base64'),
        image: "https://via.placeholder.com/200x200?text=Dr.+Sarah",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "2 Years",
        about: "Dr. Davis has a strong commitment to delivering comprehensive medical care",
        fees: 30,
        address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
        date: Date.now(),
        available: true
      }
    ];

    await Doctor.insertMany(sampleDoctors);
    console.log("Sample doctors created");
  }
};

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

    // Get Doctor model
    const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

    // Create sample doctors if none exist
    await createSampleDoctors(Doctor);

    // Get all available doctors
    const doctors = await Doctor.find({ available: true }).select('-password');

    console.log("Retrieved", doctors.length, "doctors");

    res.status(200).json({
      success: true,
      doctors
    });

  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}
