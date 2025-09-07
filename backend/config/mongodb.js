import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Don't reconnect if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Database already connected");
      return;
    }

    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.log("Database Error:", err));
    mongoose.connection.on("disconnected", () => console.log("Database Disconnected"));

    // Validate MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    // Connect with serverless-optimized options
    let connectionString = process.env.MONGODB_URI;
    
    // Clean and validate connection string
    connectionString = connectionString.trim();
    
    // Add database name if not present in URI
    if (!connectionString.includes('/HospitalManagement')) {
      connectionString = connectionString.includes('?') 
        ? connectionString.replace('?', '/HospitalManagement?')
        : `${connectionString}/HospitalManagement`;
    }
    
    console.log("MongoDB URI validation:");
    console.log("- URI starts with mongodb+srv:", connectionString.startsWith('mongodb+srv://'));
    console.log("- Connection string length:", connectionString.length);
    console.log("- Sanitized URI:", connectionString.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 15000, // 15 seconds for serverless
      socketTimeoutMS: 30000, // 30 seconds for serverless
      // Allow buffering for serverless environments
      bufferCommands: true,
      maxPoolSize: 1, // Maintain up to 1 socket connection for serverless
      minPoolSize: 0, // Maintain 0 minimum connections
    });
    
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // In serverless, don't exit the process
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
