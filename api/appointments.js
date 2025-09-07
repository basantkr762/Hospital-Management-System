// Get user appointments endpoint
const appointments = [
  {
    _id: "apt1",
    userId: "user1",
    docId: "doc1",
    slotDate: "2024-01-15",
    slotTime: "10:00 am",
    userData: { name: "Test User", email: "test@test.com" },
    docData: { name: "Dr. Richard James", speciality: "General physician", fees: 50, image: "/doc1.png" },
    amount: 50,
    date: Date.now(),
    cancelled: false,
    payment: true,
    isCompleted: false
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log("Appointments API called with method:", req.method);
  console.log("Headers:", req.headers);

  try {
    if (req.method === 'GET') {
      const token = req.headers.token || req.headers.authorization;
      console.log("Token received:", token ? "present" : "missing");

      if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
      }

      // Decode token (simple base64 for demo)
      try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        console.log("Decoded token:", decoded);

        // Filter appointments for this user
        const userAppointments = appointments.filter(apt => apt.userId === decoded.id);
        console.log("User appointments found:", userAppointments.length);

        return res.status(200).json({
          success: true,
          appointments: userAppointments
        });
      } catch (tokenError) {
        console.log("Token decode error:", tokenError);
        return res.status(401).json({ success: false, message: "Invalid Token" });
      }
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("Appointments API error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
