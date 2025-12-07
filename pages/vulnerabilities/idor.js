import { useState } from 'react';
import Link from 'next/link';

export default function IDORDemo() {
  const [userId, setUserId] = useState('1');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserData(null);

    try {
      // VULNERABILITY: Directly using user-supplied ID without authorization check
      const res = await fetch(`/api/user/${userId}`);
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      setUserData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <Link href="/">← Back to Home</Link>

      <h1>Insecure Direct Object References (IDOR) Vulnerability</h1>

      <div style={{ backgroundColor: '#ffebee', padding: '20px', marginBottom: '20px', border: '1px solid #f44336' }}>
        <h2>⚠️ Vulnerability: Missing Authorization Checks</h2>
        <p>
          This API endpoint returns user data based solely on the user ID without verifying
          if the requesting user has permission to access that data.
        </p>
      </div>

      <div style={{ backgroundColor: '#fff3cd', padding: '15px', marginBottom: '20px', border: '1px solid #ffc107' }}>
        <strong>Scenario:</strong> You are logged in as User ID: 1<br />
        <strong>Your email:</strong> user1@example.com
      </div>

      <h2>Try It:</h2>
      <form onSubmit={fetchUser}>
        <div>
          <label>Enter User ID to fetch:</label><br />
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ marginTop: '10px', padding: '10px', width: '200px' }}
            placeholder="1, 2, 3, etc."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Fetching...' : 'Fetch User Data'}
        </button>
      </form>

      <h2>User Data:</h2>
      <pre
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          marginTop: '20px',
          minHeight: '100px',
          backgroundColor: '#f5f5f5',
          overflow: 'auto'
        }}
      >
        {userData ? JSON.stringify(userData, null, 2) : 'No data fetched yet'}
      </pre>

      <div style={{ marginTop: '30px', backgroundColor: '#e3f2fd', padding: '20px', border: '1px solid '#2196f3' }}>
        <h3>Example Exploits:</h3>
        <ul>
          <li>Try User ID <code>2</code> - Access another user's private information</li>
          <li>Try User ID <code>3</code> - See admin user data</li>
          <li>Enumerate all users by trying IDs 1-1000</li>
          <li>Access sensitive data like email, phone, address of other users</li>
        </ul>

        <h3>Why This Is Dangerous:</h3>
        <ul>
          <li>Unauthorized access to other users' personal information</li>
          <li>Violation of privacy regulations (GDPR, CCPA, etc.)</li>
          <li>Can be used to build user databases for phishing attacks</li>
          <li>Attackers can modify other users' data if combined with update endpoints</li>
          <li>Can lead to account takeover if sensitive data is exposed</li>
        </ul>

        <h3>How to Fix:</h3>
        <ul>
          <li>Implement proper authentication and session management</li>
          <li>Verify the requesting user has permission to access the requested resource</li>
          <li>Use UUIDs instead of sequential IDs to make enumeration harder</li>
          <li>Implement access control lists (ACL) or role-based access control (RBAC)</li>
          <li>Log all access attempts for security monitoring</li>
          <li>Return 404 instead of 403 to avoid leaking resource existence</li>
          <li>Never trust client-supplied identifiers without validation</li>
        </ul>
      </div>
    </div>
  );
}
