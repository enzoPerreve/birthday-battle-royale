export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check if participants data is requested
  if (req.query.participants === 'true') {
    const participants = [
      {
        id: 1,
        username: "Alice Wonder",
        email: "alice@example.com",
        birthday: "1995-06-15",
        status: "alive",
        lives: 3,
        battlesWon: 5,
        battlesLost: 2,
        totalBattles: 7,
        winRate: 71.4,
        lastActive: "2024-01-20T10:30:00Z",
        joinedAt: "2024-01-15T08:00:00Z"
      },
      {
        id: 2,
        username: "Bob Fighter",
        email: "bob@example.com",
        birthday: "1992-03-22",
        status: "alive", 
        lives: 2,
        battlesWon: 3,
        battlesLost: 4,
        totalBattles: 7,
        winRate: 42.9,
        lastActive: "2024-01-20T09:15:00Z",
        joinedAt: "2024-01-16T14:30:00Z"
      },
      {
        id: 3,
        username: "Charlie Storm",
        email: "charlie@example.com", 
        birthday: "1998-11-08",
        status: "eliminated",
        lives: 0,
        battlesWon: 2,
        battlesLost: 5,
        totalBattles: 7,
        winRate: 28.6,
        lastActive: "2024-01-19T16:45:00Z",
        joinedAt: "2024-01-17T11:20:00Z",
        eliminatedAt: "2024-01-19T16:45:00Z"
      },
      {
        id: 4,
        username: "Sophie Lightning",
        email: "sophie@example.com",
        birthday: "1997-09-12", 
        status: "alive",
        lives: 3,
        battlesWon: 6,
        battlesLost: 1,
        totalBattles: 7,
        winRate: 85.7,
        lastActive: "2024-01-20T11:00:00Z",
        joinedAt: "2024-01-18T16:45:00Z"
      },
      {
        id: 5,
        username: "Lucas Thunder",
        email: "lucas@example.com",
        birthday: "1994-12-03",
        status: "alive",
        lives: 1, 
        battlesWon: 4,
        battlesLost: 3,
        totalBattles: 7,
        winRate: 57.1,
        lastActive: "2024-01-20T08:30:00Z",
        joinedAt: "2024-01-19T09:15:00Z"
      }
    ];

    return res.status(200).json({
      success: true,
      data: participants,
      count: participants.length,
      timestamp: new Date().toISOString()
    });
  }

  // Simple health check
  return res.status(200).json({
    success: true,
    message: 'Health check OK!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
