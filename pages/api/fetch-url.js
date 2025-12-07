// VULNERABLE API ENDPOINT - FOR EDUCATIONAL PURPOSES ONLY
// This endpoint demonstrates Server-Side Request Forgery (SSRF) vulnerability

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // VULNERABILITY: No validation of the URL
    // Attacker can access internal services, cloud metadata, or scan ports
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'VulnerableNextJsApp/1.0'
      },
      // This could expose the server to attacks
      redirect: 'follow'
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // VULNERABILITY: Returning full response to client
    // This could leak sensitive internal information
    return res.status(200).json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: data,
      vulnerabilityNote: 'This endpoint is intentionally vulnerable to SSRF attacks'
    });

  } catch (error) {
    // VULNERABILITY: Detailed error messages can reveal internal network structure
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      vulnerabilityNote: 'Even error messages can leak information'
    });
  }
}
