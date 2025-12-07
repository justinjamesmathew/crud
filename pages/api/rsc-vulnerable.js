// SIMULATED CVE-2025-55182 VULNERABILITY - FOR EDUCATIONAL PURPOSES ONLY
// This endpoint simulates the React Server Components Flight protocol deserialization vulnerability
// WARNING: This is intentionally vulnerable code for demonstration purposes

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // In real RSC, this would be Content-Type: text/x-component
  const contentType = req.headers['content-type'];

  try {
    const payload = req.body;

    // Educational note about the vulnerability
    const vulnerabilityInfo = {
      cve: 'CVE-2025-55182',
      also_known_as: 'React2Shell',
      severity: 'CRITICAL - CVSS 10.0',
      description: 'Remote Code Execution via RSC Flight Protocol Deserialization',
      affected_versions: {
        react: ['19.0.0', '19.1.0', '19.1.1', '19.2.0'],
        nextjs: ['15.x (before patches)', '16.x (before 16.0.7)']
      },
      patched_versions: {
        react: ['19.0.1', '19.1.2', '19.2.1'],
        nextjs: ['15.1.9', '15.2.6', '15.3.6', '15.4.8', '15.5.7', '16.0.7']
      },
      disclosure_date: '2025-12-03',
      discovered_by: 'Lachlan Davidson'
    };

    // SIMULATION: In the real vulnerability, malformed Flight protocol payloads
    // would be deserialized without proper validation, allowing code execution

    // We're NOT actually executing the payload for safety reasons
    // but showing what would happen in a vulnerable system

    let simulatedResult = {
      warning: '⚠️ SIMULATION ONLY - Code NOT actually executed for safety',
      vulnerabilityInfo,
      receivedPayload: payload,
      explanation: 'In a real vulnerable system, this payload would be deserialized and executed',
      whatWouldHappen: null
    };

    // Parse and analyze the payload to show what WOULD happen
    try {
      const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;

      if (parsed && parsed['1'] && parsed['1'].type === 'Function') {
        simulatedResult.whatWouldHappen = {
          action: 'REMOTE CODE EXECUTION',
          executedCode: parsed['1'].value,
          impact: 'The server would execute this arbitrary JavaScript code with full Node.js privileges',
          possibleConsequences: [
            'Read sensitive files from filesystem',
            'Access environment variables and secrets',
            'Execute system commands',
            'Establish reverse shell connections',
            'Modify or delete data',
            'Pivot to internal network',
            'Install backdoors for persistent access'
          ]
        };

        // For demonstration, we can safely show what the code would try to do
        // but we DO NOT actually execute it
        simulatedResult.staticAnalysis = analyzePayload(parsed['1'].value);
      }
    } catch (e) {
      simulatedResult.parseError = e.message;
    }

    return res.status(200).json(simulatedResult);

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      note: 'This is a simulated vulnerability endpoint for educational purposes'
    });
  }
}

// Helper function to analyze what the malicious code would do (without executing it)
function analyzePayload(code) {
  const analysis = {
    codeToExecute: code,
    detectedPatterns: [],
    riskLevel: 'CRITICAL'
  };

  // Detect dangerous patterns
  if (code.includes('child_process') || code.includes('exec')) {
    analysis.detectedPatterns.push('System command execution detected');
  }
  if (code.includes('fs.read') || code.includes('readFile')) {
    analysis.detectedPatterns.push('File system read operation detected');
  }
  if (code.includes('fs.write') || code.includes('writeFile')) {
    analysis.detectedPatterns.push('File system write operation detected');
  }
  if (code.includes('process.env')) {
    analysis.detectedPatterns.push('Environment variable access detected');
  }
  if (code.includes('require(')) {
    analysis.detectedPatterns.push('Module loading detected');
  }
  if (code.includes('eval(') || code.includes('Function(')) {
    analysis.detectedPatterns.push('Dynamic code evaluation detected');
  }
  if (code.includes('net.') || code.includes('http.')) {
    analysis.detectedPatterns.push('Network operation detected');
  }

  if (analysis.detectedPatterns.length === 0) {
    analysis.detectedPatterns.push('Code would execute with full Node.js privileges');
  }

  return analysis;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
