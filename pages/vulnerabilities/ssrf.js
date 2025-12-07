import { useState } from 'react';
import Link from 'next/link';

export default function SSRFDemo() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      // VULNERABILITY: Sending user-controlled URL to backend without validation
      const res = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <Link href="/">← Back to Home</Link>

      <h1>Server-Side Request Forgery (SSRF) Vulnerability</h1>

      <div style={{ backgroundColor: '#ffebee', padding: '20px', marginBottom: '20px', border: '1px solid #f44336' }}>
        <h2>⚠️ Vulnerability: Unvalidated URL Fetching</h2>
        <p>
          This API endpoint fetches any URL provided by the user without validation,
          allowing attackers to access internal resources or scan internal networks.
        </p>
      </div>

      <h2>Try It:</h2>
      <form onSubmit={handleFetch}>
        <div>
          <label>Enter URL to fetch:</label><br />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ marginTop: '10px', padding: '10px', width: '500px' }}
            placeholder="https://example.com or http://localhost:3000"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Fetching...' : 'Fetch URL'}
        </button>
      </form>

      <h2>Response:</h2>
      <pre
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          marginTop: '20px',
          minHeight: '100px',
          backgroundColor: '#f5f5f5',
          overflow: 'auto',
          maxHeight: '400px'
        }}
      >
        {response || 'No response yet'}
      </pre>

      <div style={{ marginTop: '30px', backgroundColor: '#e3f2fd', padding: '20px', border: '1px solid #2196f3' }}>
        <h3>Example Exploits:</h3>
        <ul>
          <li><code>http://localhost:3000</code> - Access internal services</li>
          <li><code>http://169.254.169.254/latest/meta-data/</code> - AWS metadata (in cloud environments)</li>
          <li><code>http://localhost:5432</code> - Scan internal ports/services</li>
          <li><code>file:///etc/passwd</code> - Read local files (if supported by fetch library)</li>
          <li><code>http://internal-admin-panel.local</code> - Access internal admin interfaces</li>
        </ul>

        <h3>Why This Is Dangerous:</h3>
        <ul>
          <li>Attackers can access internal services not exposed to the internet</li>
          <li>Can retrieve sensitive metadata from cloud providers (AWS, Azure, GCP)</li>
          <li>Enables port scanning of internal network</li>
          <li>Can bypass firewall restrictions</li>
          <li>May expose internal API keys and credentials</li>
        </ul>

        <h3>How to Fix:</h3>
        <ul>
          <li>Implement URL whitelist for allowed domains</li>
          <li>Block access to private IP ranges (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)</li>
          <li>Block cloud metadata endpoints (169.254.169.254)</li>
          <li>Use DNS resolution validation to prevent DNS rebinding attacks</li>
          <li>Set timeout limits on requests</li>
          <li>Don't return full response body to the client</li>
          <li>Implement rate limiting</li>
        </ul>
      </div>
    </div>
  );
}
