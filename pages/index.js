import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React/Next.js Vulnerability Demonstration</h1>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        ⚠️ WARNING: This application contains intentional security vulnerabilities for educational purposes only.
        DO NOT deploy to production!
      </p>

      <div style={{ backgroundColor: '#ffebee', padding: '20px', marginBottom: '20px', border: '2px solid #dc3545', borderRadius: '5px' }}>
        <h2 style={{ marginTop: 0, color: '#dc3545' }}>🚨 CRITICAL VULNERABILITY - CVE-2025-55182</h2>
        <Link href="/vulnerabilities/react2shell">
          <a style={{ color: '#dc3545', textDecoration: 'underline', fontSize: '18px', fontWeight: 'bold' }}>
            → React2Shell: Remote Code Execution in React Server Components (CVSS 10.0)
          </a>
        </Link>
        <p style={{ marginBottom: 0, marginTop: '10px' }}>
          Actively exploited in the wild. Update immediately!
        </p>
      </div>

      <h2>Other Vulnerability Demonstrations:</h2>
      <ul style={{ lineHeight: '2' }}>
        <li>
          <Link href="/vulnerabilities/xss">
            <a style={{ color: 'blue', textDecoration: 'underline' }}>
              1. Cross-Site Scripting (XSS) - dangerouslySetInnerHTML
            </a>
          </Link>
        </li>
        <li>
          <Link href="/vulnerabilities/ssrf">
            <a style={{ color: 'blue', textDecoration: 'underline' }}>
              2. Server-Side Request Forgery (SSRF)
            </a>
          </Link>
        </li>
        <li>
          <Link href="/vulnerabilities/idor">
            <a style={{ color: 'blue', textDecoration: 'underline' }}>
              3. Insecure Direct Object References (IDOR)
            </a>
          </Link>
        </li>
      </ul>

      <h2>About This Demo:</h2>
      <p>
        This application demonstrates common security vulnerabilities found in React and Next.js applications.
        Each demonstration includes:
      </p>
      <ul>
        <li>A working example of the vulnerability</li>
        <li>Explanation of the security risk</li>
        <li>Example exploit scenarios</li>
        <li>Recommendations for mitigation</li>
      </ul>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
        <h3>Educational Purpose Only</h3>
        <p>
          These vulnerabilities are intentionally created for educational and security awareness purposes.
          Understanding these vulnerabilities helps developers write more secure code.
        </p>
      </div>
    </div>
  );
}
