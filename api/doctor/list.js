// Sample doctors data
const sampleDoctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    email: "richard@hospital.com",
    image: "https://via.placeholder.com/200x200?text=Dr.+Richard",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about: "Dr. Richard has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine and patient education. With 4 years of experience in general practice, he provides thorough consultations and personalized treatment plans.",
    fees: 50,
    address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    email: "emily@hospital.com", 
    image: "https://via.placeholder.com/200x200?text=Dr.+Emily",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about: "Dr. Emily specializes in women's health and reproductive medicine. She provides comprehensive gynecological care including routine check-ups, family planning, and treatment of gynecological conditions with a compassionate approach.",
    fees: 60,
    address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    email: "sarah@hospital.com",
    image: "https://via.placeholder.com/200x200?text=Dr.+Sarah",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "2 Years",
    about: "Dr. Sarah is a dedicated dermatologist specializing in skin, hair, and nail conditions. She offers both medical and cosmetic dermatology services, helping patients achieve healthy skin through evidence-based treatments.",
    fees: 30,
    address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    email: "christopher@hospital.com",
    image: "https://via.placeholder.com/200x200?text=Dr.+Christopher",
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "5 Years",
    about: "Dr. Christopher is a pediatrician with 5 years of experience caring for children from infancy through adolescence. He provides comprehensive pediatric care including vaccinations, developmental assessments, and treatment of childhood illnesses.",
    fees: 40,
    address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Wilson",
    email: "jennifer@hospital.com",
    image: "https://via.placeholder.com/200x200?text=Dr.+Jennifer",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "6 Years",
    about: "Dr. Jennifer is a neurologist specializing in disorders of the nervous system. She has extensive experience in treating conditions such as epilepsy, migraines, stroke, and neurodegenerative diseases.",
    fees: 80,
    address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  },
  {
    _id: "doc6",
    name: "Dr. Michael Brown",
    email: "michael@hospital.com",
    image: "https://via.placeholder.com/200x200?text=Dr.+Michael",
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "7 Years",
    about: "Dr. Michael is a gastroenterologist with expertise in digestive system disorders. He specializes in treating conditions affecting the stomach, intestines, liver, and related organs, providing both diagnostic and therapeutic services.",
    fees: 70,
    address: { line1: "67th Cross, Richmond", line2: "Circle, Ring Road, London" },
    available: true
  }
];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, token');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log("Doctor list endpoint called");

    // Return all available doctors
    const availableDoctors = sampleDoctors.filter(doctor => doctor.available);

    console.log("Retrieved", availableDoctors.length, "doctors");

    res.status(200).json({
      success: true,
      doctors: availableDoctors
    });

  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      details: "Check server logs for more information"
    });
  }
}
