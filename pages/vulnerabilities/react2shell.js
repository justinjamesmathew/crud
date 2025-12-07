import { useState } from 'react';
import Link from 'next/link';

export default function React2ShellDemo() {
  const [payload, setPayload] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPayload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/rsc-vulnerable', {
        method: 'POST',
        headers: { 'Content-Type': 'text/x-component' },
        body: payload
      });

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const examplePayloads = [
    {
      name: 'Basic Command Execution',
      payload: '{"0":"$","1":{"type":"Function","value":"return process.version"}}'
    },
    {
      name: 'File System Access',
      payload: '{"0":"$","1":{"type":"Function","value":"const fs = require(\'fs\'); return fs.readdirSync(\'/\').join(\', \')"}}'
    }
  ];

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px' }}>
      <Link href="/">← Back to Home</Link>

      <h1>CVE-2025-55182: React2Shell RCE Vulnerability</h1>

      <div style={{ backgroundColor: '#dc3545', color: 'white', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>🚨 CRITICAL: CVSS 10.0</h2>
        <p style={{ margin: 0 }}>
          <strong>CVE-2025-55182</strong> - Remote Code Execution in React Server Components<br />
          <strong>Also tracked as:</strong> CVE-2025-66478 (Next.js)
        </p>
      </div>

      <div style={{ backgroundColor: '#fff3cd', padding: '20px', marginBottom: '20px', border: '1px solid #ffc107', borderRadius: '5px' }}>
        <h3 style={{ marginTop: 0 }}>⚠️ About This Vulnerability</h3>
        <p>
          <strong>Discovered:</strong> November 29, 2025 by Lachlan Davidson<br />
          <strong>Disclosed:</strong> December 3, 2025<br />
          <strong>Severity:</strong> 10.0 Critical (CVSS v3.1)<br />
          <strong>Type:</strong> Unauthenticated Remote Code Execution (RCE)
        </p>
        <p>
          This vulnerability affects the React Server Components Flight protocol through a deserialization flaw.
          When a server receives a specially crafted malformed payload, it fails to validate the structure correctly,
          allowing attacker-controlled data to execute arbitrary JavaScript code on the server.
        </p>
      </div>

      <h2>Affected Versions:</h2>
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', marginBottom: '20px', borderLeft: '4px solid #dc3545' }}>
        <strong>React:</strong>
        <ul>
          <li>react-server-dom-webpack: 19.0.0, 19.1.0, 19.1.1, 19.2.0</li>
          <li>react-server-dom-turbopack: 19.0.0, 19.1.0, 19.1.1, 19.2.0</li>
          <li>react-server-dom-parcel: 19.0.0, 19.1.0, 19.1.1, 19.2.0</li>
        </ul>
        <strong>Next.js:</strong>
        <ul>
          <li>All versions using App Router with React Server Components:</li>
          <li>15.x (before 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7)</li>
          <li>16.x (before 16.0.7)</li>
          <li>14.3.0-canary.77 and later canary releases</li>
        </ul>
      </div>

      <h2>Exploitation Demonstration:</h2>
      <div style={{ backgroundColor: '#ffebee', padding: '15px', marginBottom: '20px', border: '1px solid #f44336', borderRadius: '5px' }}>
        <strong>⚠️ WARNING:</strong> This is a simulated demonstration for educational purposes.
        The actual vulnerability requires React Server Components with the vulnerable versions.
      </div>

      <form onSubmit={sendPayload}>
        <div>
          <label><strong>Enter RSC Flight Protocol Payload:</strong></label><br />
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows="6"
            style={{
              marginTop: '10px',
              padding: '10px',
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '12px'
            }}
            placeholder='{"0":"$","1":{"type":"Function","value":"return process.version"}}'
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '3px'
          }}
        >
          {loading ? 'Executing...' : 'Send Payload'}
        </button>
      </form>

      <h3>Example Payloads:</h3>
      <div style={{ marginBottom: '20px' }}>
        {examplePayloads.map((example, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => setPayload(example.payload)}
              style={{
                padding: '8px 15px',
                marginRight: '10px',
                cursor: 'pointer',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '3px'
              }}
            >
              {example.name}
            </button>
          </div>
        ))}
      </div>

      <h2>Server Response:</h2>
      <pre
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          minHeight: '100px',
          backgroundColor: '#f5f5f5',
          overflow: 'auto',
          borderRadius: '5px'
        }}
      >
        {result || 'No response yet'}
      </pre>

      <div style={{ marginTop: '30px', backgroundColor: '#e3f2fd', padding: '20px', border: '1px solid #2196f3', borderRadius: '5px' }}>
        <h3>Attack Vectors:</h3>
        <ul>
          <li>Execute arbitrary system commands (e.g., <code>child_process.exec</code>)</li>
          <li>Read sensitive files from the server filesystem</li>
          <li>Access environment variables containing secrets and API keys</li>
          <li>Establish reverse shells for persistent access</li>
          <li>Pivot to internal network resources</li>
          <li>Exfiltrate database credentials and data</li>
        </ul>

        <h3>Real-World Impact:</h3>
        <ul>
          <li><strong>Active Exploitation:</strong> Exploited in the wild within hours of disclosure</li>
          <li><strong>Threat Actors:</strong> China state-nexus groups (Earth Lamia, Jackpot Panda)</li>
          <li><strong>Targets:</strong> Internet-facing Next.js applications and Kubernetes containers</li>
          <li><strong>First Victims:</strong> December 5, 2025 at 6:00 AM UTC</li>
        </ul>

        <h3>Technical Details:</h3>
        <p>
          The vulnerability stems from improper validation in the RSC Flight protocol deserialization logic.
          The Flight protocol is used to serialize and deserialize React components between server and client.
          When processing incoming Flight payloads, the vulnerable code fails to properly validate the structure,
          allowing attackers to inject malicious JavaScript that gets executed in the server context.
        </p>
        <pre style={{ backgroundColor: 'white', padding: '15px', overflow: 'auto' }}>
{`// Vulnerable code pattern (simplified)
function deserializeFlight(payload) {
  const parsed = JSON.parse(payload);
  // VULNERABILITY: No validation of parsed structure
  if (parsed.type === 'Function') {
    // Executing attacker-controlled code
    return eval(parsed.value);
  }
  return parsed;
}`}
        </pre>

        <h3>Mitigation Steps:</h3>
        <ol>
          <li>
            <strong>Update Immediately:</strong>
            <ul>
              <li>React: Update to 19.0.1, 19.1.2, or 19.2.1</li>
              <li>Next.js: Update to 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, or 16.0.7</li>
            </ul>
          </li>
          <li><strong>WAF Rules:</strong> Implement web application firewall rules to detect malicious payloads</li>
          <li><strong>Network Segmentation:</strong> Limit server access to internal resources</li>
          <li><strong>Monitoring:</strong> Monitor for suspicious RSC Flight protocol requests</li>
          <li><strong>Input Validation:</strong> Validate all incoming requests at the edge</li>
        </ol>

        <h3>Detection:</h3>
        <p>Look for the following indicators of compromise:</p>
        <ul>
          <li>HTTP requests with <code>Content-Type: text/x-component</code></li>
          <li>POST requests to RSC endpoints with unusual payloads</li>
          <li>Unexpected process executions or network connections from Node.js processes</li>
          <li>File system access patterns inconsistent with normal application behavior</li>
        </ul>

        <h3>Update Commands:</h3>
        <pre style={{ backgroundColor: 'white', padding: '15px', overflow: 'auto' }}>
{`# For npm
npm install react@19.0.1 react-dom@19.0.1
npm install next@15.1.9

# For yarn
yarn add react@19.0.1 react-dom@19.0.1
yarn add next@15.1.9

# For pnpm
pnpm update react@19.0.1 react-dom@19.0.1
pnpm update next@15.1.9`}
        </pre>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '5px' }}>
        <h3 style={{ marginTop: 0, color: '#155724' }}>✅ Additional Security Recommendations:</h3>
        <ul style={{ color: '#155724' }}>
          <li>Run security scans to detect vulnerable React/Next.js versions</li>
          <li>Review server logs for exploitation attempts since December 3, 2025</li>
          <li>Implement least-privilege principles for Node.js processes</li>
          <li>Use container security tools to detect compromised containers</li>
          <li>Enable security headers (CSP, X-Frame-Options, etc.)</li>
          <li>Subscribe to security advisories from React and Next.js teams</li>
        </ul>
      </div>
    </div>
  );
}
