// Sample doctors data
const sampleDoctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    email: "richard@hospital.com",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about: "Dr. Richard has a strong commitment to delivering comprehensive medical care.",
    fees: 50,
    address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true,
    slots_booked: {}
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    email: "emily@hospital.com",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about: "Dr. Emily Larson has a strong commitment to delivering comprehensive medical care.",
    fees: 60,
    address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true,
    slots_booked: {}
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    email: "sarah@hospital.com",
    image: "https://images.unsplash.com/photo-1594824694863-3ceaac4c21e3?w=200&h=200&fit=crop&crop=face",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "2 Years",
    about: "Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care.",
    fees: 30,
    address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true,
    slots_booked: {}
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    res.status(200).json({
      success: true,
      message: 'Doctors list retrieved successfully',
      doctors: sampleDoctors
    });
  } catch (error) {
    console.error('Doctors API error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
}
