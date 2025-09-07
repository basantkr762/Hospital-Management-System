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

    // Connect with minimal options for serverless
    const connectionString = `${process.env.MONGODB_URI}/HospitalManagement`;
    console.log("Attempting to connect to:", connectionString.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 20000, // 20 seconds
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
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
