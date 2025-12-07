// VULNERABLE API ENDPOINT - FOR EDUCATIONAL PURPOSES ONLY
// This endpoint demonstrates Insecure Direct Object References (IDOR) vulnerability

// Mock database of users
const users = {
  1: {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    role: 'user',
    ssn: '123-45-6789',
    creditCard: '**** **** **** 1234',
    address: '123 Main St, City, State 12345',
    phone: '555-0001'
  },
  2: {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    role: 'user',
    ssn: '987-65-4321',
    creditCard: '**** **** **** 5678',
    address: '456 Oak Ave, City, State 67890',
    phone: '555-0002'
  },
  3: {
    id: 3,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    ssn: '111-22-3333',
    creditCard: '**** **** **** 9999',
    address: '789 Admin Blvd, City, State 11111',
    phone: '555-0003',
    apiKey: 'sk_live_super_secret_key_12345',
    internalNotes: 'Has access to all systems'
  }
};

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  // VULNERABILITY: No authentication check
  // In a secure implementation, we would check if the user is logged in
  // const session = getSession(req);
  // if (!session) return res.status(401).json({ error: 'Unauthorized' });

  // VULNERABILITY: No authorization check
  // In a secure implementation, we would verify the requesting user
  // has permission to access this user's data
  // if (session.userId !== parseInt(id) && session.role !== 'admin') {
  //   return res.status(403).json({ error: 'Forbidden' });
  // }

  const user = users[id];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // VULNERABILITY: Returning all sensitive data without filtering
  // Even if the user should have access, we shouldn't return sensitive fields
  return res.status(200).json({
    ...user,
    vulnerabilityNote: 'This endpoint has no authorization checks - anyone can access any user\'s data!'
  });
}
