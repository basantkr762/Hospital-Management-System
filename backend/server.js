import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// Initialize services - but don't block the app startup in serverless
let isInitialized = false;

const initializeServices = async () => {
  if (!isInitialized) {
    try {
      await connectDB();
      await connectCloudinary();
      isInitialized = true;
      console.log("All services initialized successfully");
    } catch (error) {
      console.error("Failed to initialize services:", error);
      // Don't exit in serverless environment
      if (!process.env.VERCEL) {
        process.exit(1);
      }
    }
  }
};

// Initialize services
initializeServices();

// middlewares
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost')) return callback(null, true);
    
    // Allow any vercel.app domain
    if (origin.includes('.vercel.app')) return callback(null, true);
    
    // Allow specific domains
    const allowedOrigins = [
      "https://hospital-8y3b4et0f-basantkr762s-projects.vercel.app",
      "https://hospital-3ilhy3e1d-basantkr762s-projects.vercel.app",
      "https://hospital-vert-iota.vercel.app"
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server Error Details:");
  console.error("Error Message:", error.message);
  console.error("Error Stack:", error.stack);
  console.error("Request URL:", req.url);
  console.error("Request Method:", req.method);
  console.error("Request Headers:", req.headers);
  
  res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    error: process.env.NODE_ENV === "development" ? {
      message: error.message,
      stack: error.stack
    } : "Server Error"
  });
});

app.get("/", (req, res) => {
  res.send("Hospital Management System API is working!");
});

app.get("/api", (req, res) => {
  res.json({ 
    message: "Hospital Management System API", 
    status: "connected",
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? "serverless" : "local",
    endpoints: [
      "/api/admin",
      "/api/doctor", 
      "/api/user"
    ]
  });
});

// Test endpoint that doesn't require database
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? "vercel-serverless" : "local"
  });
});

// Database status endpoint
app.get("/api/status", async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const dbStatus = mongoose.default.connection.readyState;
    const statusMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      success: true,
      database: statusMap[dbStatus] || 'unknown',
      services_initialized: isInitialized,
      environment: process.env.VERCEL ? "vercel-serverless" : "local",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status check failed",
      error: error.message
    });
  }
});

// Only start the server if not in a serverless environment (like Vercel)
if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// For Vercel serverless deployment
export default app;
