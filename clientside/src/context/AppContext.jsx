import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  // Use the same domain for API calls when deployed, localhost for development
  const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? "http://localhost:4000" : "");

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      console.log("Attempting to fetch doctors from:", backendUrl + "/api/doctor/list");
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      console.log("Doctors API response:", data);
      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors loaded successfully:", data.doctors.length);
      } else {
        console.error("Doctors API failed:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Doctors API error:", error);
      console.error("Error details:", error.response?.data || error.message);
      // Don't show toast error for API failures to prevent UI issues
      // toast.error(error.message);
      
      // Set empty doctors array as fallback
      setDoctors([]);
    }
  };

  const loadUserProfileData = async () => {
    try {
      console.log("Attempting to load user profile with token:", token ? "present" : "missing");
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      console.log("Profile API response:", data);
      if (data.success) {
        setUserData(data.user);
        console.log("User profile loaded successfully");
      } else {
        console.error("Profile API failed:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Profile API error:", error);
      console.error("Error details:", error.response?.data || error.message);
      // Don't show toast error for profile failures to prevent UI issues
      // toast.error(error.message);
      
      // Set userData to false as fallback
      setUserData(false);
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
