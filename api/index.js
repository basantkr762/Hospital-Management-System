// Simple in-memory storage for development
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

// Sample doctors data
const sampleDoctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    email: "richard@hospital.com",
    image: "https://via.placeholder.com/200x200?text=Dr.+Richard",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about: "Dr. Richard has a strong commitment to delivering comprehensive medical care.",
    fees: 50,
    address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    email: "emily@hospital.com", 
    image: "https://via.placeholder.com/200x200?text=Dr.+Emily",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about: "Dr. Emily specializes in women's health and reproductive medicine.",
    fees: 60,
    address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    email: "sarah@hospital.com",
    image: "https://via.placeholder.com/200x200?text=Dr.+Sarah",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "2 Years",
    about: "Dr. Sarah is a dedicated dermatologist specializing in skin conditions.",
    fees: 30,
    address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
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

  try {
    const { url, method } = req;
    console.log(`${method} ${url}`);

    // Parse the URL to get the endpoint
    const urlParts = url.split('/').filter(part => part); // Remove empty parts
    const endpoint = urlParts.slice(1).join('/'); // Remove 'api' from the path

    console.log("Endpoint:", endpoint);
    console.log("Method:", method);

    // Route based on endpoint
    if (endpoint === 'user/register' && method === 'POST') {
      return await handleUserRegister(req, res);
    } else if (endpoint === 'user/login' && method === 'POST') {
      return await handleUserLogin(req, res);
    } else if (endpoint === 'user/get-profile' && method === 'GET') {
      return await handleGetProfile(req, res);
    } else if (endpoint === 'doctor/list' && method === 'GET') {
      return await handleDoctorList(req, res);
    } else if (endpoint === 'admin/login' && method === 'POST') {
      return await handleAdminLogin(req, res);
    } else if (endpoint === '' || endpoint === 'api') {
      // API root
      return res.status(200).json({
        message: "Hospital Management System API",
        status: "working",
        timestamp: new Date().toISOString(),
        endpoints: [
          "POST /api/user/register",
          "POST /api/user/login",
          "GET /api/user/get-profile",
          "GET /api/doctor/list",
          "POST /api/admin/login"
        ]
      });
    } else {
      console.log("Unknown endpoint:", endpoint);
      return res.status(404).json({
        success: false,
        message: `Endpoint not found: ${endpoint}`,
        method: method
      });
    }

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

// User Registration Handler
async function handleUserRegister(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Please enter a strong password" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const hashedPassword = Buffer.from(password).toString('base64');
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

  users.push(newUser);

  const tokenData = { id: newUser._id, email: newUser.email };
  const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

  console.log("User registered:", newUser.email);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    token
  });
}

// User Login Handler
async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ success: false, message: "User does not exist" });
  }

  const storedPassword = Buffer.from(user.password, 'base64').toString();
  if (storedPassword !== password) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  const tokenData = { id: user._id, email: user.email };
  const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

  console.log("User logged in:", user.email);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token
  });
}

// Get Profile Handler
async function handleGetProfile(req, res) {
  const token = req.headers.token;
  
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }

  let decoded;
  try {
    const decodedStr = Buffer.from(token, 'base64').toString();
    decoded = JSON.parse(decodedStr);
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const user = users.find(u => u._id === decoded.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

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

  return res.status(200).json({
    success: true,
    user: userProfile
  });
}

// Doctor List Handler
async function handleDoctorList(req, res) {
  const availableDoctors = sampleDoctors.filter(doctor => doctor.available);
  
  return res.status(200).json({
    success: true,
    doctors: availableDoctors
  });
}

// Admin Login Handler
async function handleAdminLogin(req, res) {
  const { email, password } = req.body;

  // Simple admin credentials
  const adminEmail = "admin@hospital.com";
  const adminPassword = "admin123";

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  const tokenData = { id: "admin1", email: adminEmail, role: "admin" };
  const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

  console.log("Admin logged in:", email);

  return res.status(200).json({
    success: true,
    message: "Admin login successful",
    token
  });
}
