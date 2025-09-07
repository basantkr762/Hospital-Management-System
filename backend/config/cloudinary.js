import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    // Only configure Cloudinary if environment variables are provided
    if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      console.log("Cloudinary configured successfully");
    } else {
      console.log("Cloudinary environment variables not found - file upload will be disabled");
    }
  } catch (error) {
    console.error("Cloudinary configuration failed:", error);
    // Don't throw error - let app continue without Cloudinary
  }
};

export default connectCloudinary;
