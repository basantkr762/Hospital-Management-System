import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../backend/config/mongodb.js";
import connectCloudinary from "../backend/config/cloudinary.js";
import adminRouter from "../backend/routes/adminRoute.js";
import doctorRouter from "../backend/routes/doctorRoute.js";
import userRouter from "../backend/routes/userRoute.js";

// Initialize Express app
const app = express();

// Connect to database and cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    "https://hospital-vert-iota.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true
}));

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Root API endpoint
app.get("/api", (req, res) => {
  res.json({ 
    message: "Hospital Management System API", 
    status: "connected",
    timestamp: new Date().toISOString(),
    endpoints: [
      "/api/admin",
      "/api/doctor", 
      "/api/user"
    ]
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "healthy",
    database: "connected",
    timestamp: new Date().toISOString()
  });
});

export default app;
