import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

// Client-side components
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminSidebar from "./components/admin/AdminSidebar";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import DoctorDashboard from "./pages/admin/DoctorDashboard";
import DoctorAppointments from "./pages/admin/DoctorAppointments";
import DoctorProfile from "./pages/admin/DoctorProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppContext";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

const App = () => {
  const { token } = useContext(AppContext); // User token
  const { aToken } = useContext(AdminContext); // Admin token
  const { dToken } = useContext(DoctorContext); // Doctor token
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDoctorRoute = location.pathname.startsWith('/doctor');
  
  // Determine if user should see admin interface
  const showAdminInterface = (aToken || dToken) && (isAdminRoute || isDoctorRoute);

  useEffect(() => {
    // Handle initial routing based on tokens and current path
    if (location.pathname === '/admin' && !aToken && !dToken) {
      // Redirect to admin login if accessing admin without token
      navigate('/admin/login');
    } else if (location.pathname === '/admin' && aToken) {
      // Redirect admin to dashboard
      navigate('/admin/dashboard');
    } else if (location.pathname === '/admin' && dToken) {
      // Redirect doctor to dashboard
      navigate('/doctor/dashboard');
    }
  }, [aToken, dToken, location.pathname, navigate]);

  return (
    <div className={showAdminInterface ? "bg-[#F8F9FD]" : "mx-4 sm:mx-[10%]"}>
      <ToastContainer />
      
      {/* Conditional Navbar */}
      {showAdminInterface ? <AdminNavbar /> : <Navbar />}
      
      {/* Conditional Layout */}
      {showAdminInterface ? (
        <div className="flex items-start">
          <AdminSidebar />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/appointments" element={<AllAppointments />} />
            <Route path="/admin/add-doctor" element={<AddDoctor />} />
            <Route path="/admin/doctors" element={<DoctorsList />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      ) : (
        <>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected User Routes */}
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
            
            {/* Admin Entry Point */}
            <Route path="/admin/*" element={<AdminLogin />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
