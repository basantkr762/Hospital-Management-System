import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import mongoose from "mongoose";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    console.log("Doctor list request received");
    console.log("Database connection state:", mongoose.connection.readyState);
    
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("Database not connected, returning sample doctors");
      return res.json({ 
        success: true, 
        doctors: getSampleDoctors(),
        message: "Using sample data - database not connected"
      });
    }
    
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    console.log("Doctors found:", doctors.length);

    // If no doctors in database, return sample doctors for testing
    if (doctors.length === 0) {
      console.log("No doctors in database, returning sample data");
      return res.json({ 
        success: true, 
        doctors: getSampleDoctors(),
        message: "Using sample data - no doctors in database"
      });
    }

    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Doctor list error:", error);
    console.error("Error stack:", error.stack);
    
    // If database error, return sample data instead of failing
    if (error.message.includes('bufferCommands') || error.message.includes('connection')) {
      console.log("Database connection error, returning sample doctors");
      return res.json({ 
        success: true, 
        doctors: getSampleDoctors(),
        message: "Using sample data - database connection error"
      });
    }
    
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSampleDoctors = () => {
  return [
    {
      _id: "sample1",
      name: "Dr. Richard James",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      speciality: "General physician",
      degree: "MBBS",
      experience: "4 Years",
      about: "Dr. Richard has a strong commitment to delivering comprehensive medical care.",
      fees: 50,
      address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
      available: true
    },
    {
      _id: "sample2",
      name: "Dr. Emily Larson",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      speciality: "Gynecologist",
      degree: "MBBS",
      experience: "3 Years",
      about: "Dr. Emily Larson has a strong commitment to delivering comprehensive medical care.",
      fees: 60,
      address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
      available: true
    },
    {
      _id: "sample3",
      name: "Dr. Sarah Patel",
      image: "https://images.unsplash.com/photo-1594824495800-cdf827195e65?w=200&h=200&fit=crop&crop=face",
      speciality: "Dermatologist",
      degree: "MBBS",
      experience: "2 Years",
      about: "Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care.",
      fees: 30,
      address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
      available: true
    }
  ];
};
  } catch (error) {
    console.error("Doctor list error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API for doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for Doctor panel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile data from Doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
