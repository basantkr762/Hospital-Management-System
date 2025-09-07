import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const SmartLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine login mode based on current route
  const isAdminRoute = location.pathname.includes('/admin');
  
  const [mode, setMode] = useState(
    isAdminRoute ? "Admin" : "User"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const { setToken, backendUrl } = useContext(AppContext);
  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (mode === "User") {
        // User authentication
        if (isSignUp) {
          // User registration
          const { data } = await axios.post(`${backendUrl}/api/register`, {
            name,
            email,
            password,
          });
          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success("Account created successfully!");
            navigate("/");
          } else {
            toast.error(data.message);
          }
        } else {
          // User login
          const { data } = await axios.post(`${backendUrl}/api/login`, {
            email,
            password,
          });
          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success("Logged in successfully!");
            navigate("/");
          } else {
            toast.error(data.message);
          }
        }
      } else if (mode === "Admin") {
        // Admin authentication
        const { data } = await axios.post(`${backendUrl}/api/admin-login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin logged in successfully!");
          navigate("/admin/dashboard");
        } else {
          toast.error(data.message);
        }
      } else if (mode === "Doctor") {
        // Doctor authentication
        const { data } = await axios.post(`${backendUrl}/api/doctor-login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor logged in successfully!");
          navigate("/doctor/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setIsSignUp(false);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
    
    // Update URL based on mode
    if (newMode === "User") {
      navigate("/login");
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        {/* Header */}
        <div className="w-full text-center">
          <p className="text-2xl font-semibold">
            <span className="text-primary">{mode}</span>{" "}
            {isSignUp && mode === "User" ? "Sign Up" : "Login"}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {isSignUp && mode === "User" 
              ? "Create your account to book appointments"
              : mode === "User" 
                ? "Please sign in to your account"
                : "Access your dashboard"
            }
          </p>
        </div>

        {/* Mode Selector */}
        <div className="w-full">
          <div className="flex border rounded-lg p-1 bg-gray-50">
            <button
              type="button"
              onClick={() => switchMode("User")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === "User"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => switchMode("Admin")}
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
              onClick={() => switchMode("Doctor")}
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
        {isSignUp && mode === "User" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        {/* Submit Button */}
        <button className="bg-primary text-white w-full px-4 py-2 rounded-md text-base hover:bg-primary/90 transition-colors">
          {isSignUp && mode === "User" ? "Create Account" : "Login"}
        </button>

        {/* Toggle Sign Up/Login for Users */}
        {mode === "User" && (
          <div className="w-full text-center">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setIsSignUp(true)}
                >
                  Create account
                </span>
              </p>
            )}
          </div>
        )}

        {/* Admin Credentials Helper */}
        {mode !== "User" && (
          <div className="w-full text-center">
            <p className="text-xs text-gray-500">
              {mode === "Admin" 
                ? "Use your admin credentials to access the dashboard"
                : "Use your doctor credentials to access your panel"
              }
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default SmartLogin;
