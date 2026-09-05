module.exports = async (req, res) => {
  const targetUrl = 'https://api.kucoin.com' + req.url;

  // Extract only the essential KuCoin headers from Google Apps Script
  const forwardHeaders = {};
  for (const key in req.headers) {
    if (key.startsWith('kc-') || key === 'content-type') {
      forwardHeaders[key] = req.headers[key];
    }
  }

  const fetchOptions = {
    method: req.method,
    headers: forwardHeaders
  };

  // FIX: Properly forward the JSON body for POST/PUT requests (like sellbot and buybot)
  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
    // Vercel parses JSON automatically, so we stringify it back to match the Google Apps Script signature
    fetchOptions.body = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
