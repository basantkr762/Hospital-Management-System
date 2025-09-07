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
connectDB();
connectCloudinary();

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

app.get("/", (req, res) => {
  res.send("Hospital Management System API is working!");
});

app.get("/api", (req, res) => {
  res.json({ 
    message: "Hospital Management System API", 
    status: "connected",
    endpoints: [
      "/api/admin",
      "/api/doctor", 
      "/api/user"
    ]
  });
});

// Only start the server if not in a serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
