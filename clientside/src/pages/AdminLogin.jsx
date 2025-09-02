import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const AdminLogin = () => {
  const navigate = useNavigate();
  
  const [mode, setMode] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (mode === "Admin") {
        // Admin authentication
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          toast.success("Admin logged in successfully!");
          // Redirect to deployed admin panel or show admin interface
          window.location.href = "/admin-panel"; // You can change this to your admin panel URL
        } else {
          toast.error(data.message);
        }
      } else if (mode === "Doctor") {
        // Doctor authentication
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          toast.success("Doctor logged in successfully!");
          // Redirect to deployed admin panel or show doctor interface
          window.location.href = "/admin-panel"; // You can change this to your admin panel URL
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        {/* Header */}
        <div className="w-full text-center mb-4">
          <img 
            className="w-52 mx-auto mb-4" 
            src={assets.logoWithText} 
            alt="Hospital Management System" 
          />
          <p className="text-2xl font-semibold">
            <span className="text-primary">{mode}</span> Access
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Please sign in to access your dashboard
          </p>
        </div>

        {/* Mode Selector */}
        <div className="w-full mb-4">
          <div className="flex border rounded-lg p-1 bg-gray-50">
            <button
              type="button"
              onClick={() => setMode("Admin")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === "Admin"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setMode("Doctor")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === "Doctor"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Doctor
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="w-full">
          <p className="mb-2">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        {/* Submit Button */}
        <button className="bg-primary text-white w-full px-4 py-2 rounded-md text-base hover:bg-primary/90 transition-colors mt-4">
          Sign In
        </button>

        {/* Back to Home */}
        <div className="w-full text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-primary hover:underline text-sm"
          >
            ← Back to Home
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="w-full text-center mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-2">Demo Credentials:</p>
          <div className="text-xs text-gray-500">
            <p><strong>Admin:</strong> admin@hospital.com / admin123</p>
            <p><strong>Doctor:</strong> doctor@hospital.com / doctor123</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
