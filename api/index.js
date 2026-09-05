export default async function handler(req, res) {
  const targetUrl = 'https://api.kucoin.com' + req.url;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'kc-api-sign': req.headers['kc-api-sign'] || '',
        'kc-api-key': req.headers['kc-api-key'] || '',
        'kc-api-timestamp': req.headers['kc-api-timestamp'] || '',
        'kc-api-passphrase': req.headers['kc-api-passphrase'] || '',
        'kc-api-key-version': req.headers['kc-api-key-version'] || '2',
        'content-type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
