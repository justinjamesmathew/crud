# React/Next.js Vulnerability Demonstration

## 🚨 CVE-2025-55182 (React2Shell) Educational Demo

**⚠️ WARNING: This repository contains intentional security vulnerabilities for educational purposes. DO NOT deploy to production!**

This project demonstrates critical security vulnerabilities in React and Next.js applications, with a primary focus on **CVE-2025-55182** (React2Shell), a CVSS 10.0 critical remote code execution vulnerability.

## Quick Start

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Visit http://localhost:3000
```

## Vulnerabilities Demonstrated

### 🔴 CRITICAL: CVE-2025-55182 - React2Shell RCE

- **Severity**: CVSS 10.0 (Critical)
- **Type**: Remote Code Execution via RSC Flight Protocol
- **Status**: Actively exploited in the wild
- **Demo**: `/vulnerabilities/react2shell`

**Immediate Action**: If you're running React 19.x or Next.js 15.x/16.x with React Server Components, update immediately!

**Patched Versions**:
- React: 19.0.1, 19.1.2, 19.2.1
- Next.js: 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, 16.0.7

### Other Demonstrations

1. **Cross-Site Scripting (XSS)** - `/vulnerabilities/xss`
   - Demonstrates `dangerouslySetInnerHTML` vulnerability
   - Shows how attackers can inject malicious scripts

2. **Server-Side Request Forgery (SSRF)** - `/vulnerabilities/ssrf`
   - Unvalidated URL fetching in API routes
   - Access to internal services and cloud metadata

3. **Insecure Direct Object References (IDOR)** - `/vulnerabilities/idor`
   - Missing authorization checks on API endpoints
   - Unauthorized access to user data

## Educational Purpose

This project helps developers understand:
- How these vulnerabilities work
- Real-world exploitation scenarios
- Impact on applications and users
- Proper mitigation techniques
- Secure coding practices

## Documentation

For detailed information about CVE-2025-55182, including:
- Technical analysis
- Exploitation examples
- Detection methods
- Mitigation strategies
- Incident response procedures

See: [VULNERABILITY_REPORT.md](./VULNERABILITY_REPORT.md)

## Project Structure

```
├── pages/
│   ├── index.js                      # Main landing page
│   ├── api/
│   │   ├── rsc-vulnerable.js         # CVE-2025-55182 simulation
│   │   ├── fetch-url.js              # SSRF endpoint
│   │   └── user/[id].js              # IDOR endpoint
│   └── vulnerabilities/
│       ├── react2shell.js            # React2Shell demo
│       ├── xss.js                    # XSS demo
│       ├── ssrf.js                   # SSRF demo
│       └── idor.js                   # IDOR demo
├── VULNERABILITY_REPORT.md           # Detailed CVE analysis
└── README.md                         # This file
```

## Safety Notes

### This Demo Does NOT:
- Actually execute malicious code
- Contain real exploits that can harm systems
- Connect to external attacker infrastructure

### This Demo DOES:
- Simulate vulnerability behavior
- Explain security concepts
- Show what would happen in vulnerable systems
- Provide educational value for security awareness

## Security Resources

- [React Security Advisory](https://react.dev/blog/2025/12/03/react-server-components-security-advisory)
- [Next.js Security Advisory](https://nextjs.org/blog/CVE-2025-66478)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Wiz Blog: React2Shell Analysis](https://www.wiz.io/blog/critical-vulnerability-in-react-cve-2025-55182)

## Check Your Applications

To check if your applications are vulnerable:

```bash
# Check installed versions
npm list react react-dom next

# Run security audit
npm audit

# Update to patched versions
npm install react@19.0.1 react-dom@19.0.1 next@15.1.9
```

## Contributing

This is an educational project. If you find issues or want to add more vulnerability demonstrations, please open an issue or pull request.

## Disclaimer

This code is for **educational purposes only**.

- Use only in authorized, controlled environments
- Do not use for unauthorized access or malicious purposes
- Always practice responsible disclosure
- Follow ethical hacking guidelines

## License

Educational use only. See LICENSE file for details.

---

**Remember**: Understanding vulnerabilities is the first step to building secure applications. Stay informed, keep dependencies updated, and always follow security best practices.
