module.exports = async (req, res) => {
  const targetUrl = 'https://api.kucoin.com' + req.url;

  // Extract only the essential KuCoin headers from Google Apps Script
  const forwardHeaders = {};
  for (const key in req.headers) {
    if (key.startsWith('kc-') || key === 'content-type') {
      forwardHeaders[key] = req.headers[key];
    }
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
