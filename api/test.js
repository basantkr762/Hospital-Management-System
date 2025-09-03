export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log("Test endpoint called:", req.method, req.url);

  res.status(200).json({
    message: "Test endpoint working!",
    status: "success",
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers
  });
}
