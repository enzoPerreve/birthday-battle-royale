const randomizer = {
  // Select random participants for different battle types
  selectParticipants(users, battleType) {
    if (!users || users.length === 0) {
      return [];
    }

    const activeUsers = users.filter(user => user.isActive);
    const shuffled = [...activeUsers].sort(() => 0.5 - Math.random());

    switch (battleType) {
      case '1v1':
        return shuffled.slice(0, 2);
      case '2v2':
        return shuffled.slice(0, 4);
      case '3v3':
        return shuffled.slice(0, 6);
      case '4v4':
        return shuffled.slice(0, 8);
      case 'team':
        // For team battles, select between 6-10 participants
        const teamSize = Math.min(shuffled.length, Math.max(6, Math.floor(Math.random() * 5) + 6));
        return shuffled.slice(0, teamSize);
      case 'free-for-all':
        // Free for all with 3-8 participants
        const freeForAllSize = Math.min(shuffled.length, Math.max(3, Math.floor(Math.random() * 6) + 3));
        return shuffled.slice(0, freeForAllSize);
      default:
        return shuffled.slice(0, 2);
    }
  },

  // Select random participants with preferences matching
  selectParticipantsWithPreferences(users, battleType, preferences = {}) {
    if (!users || users.length === 0) {
      return [];
    }

    let filteredUsers = users.filter(user => user.isActive);

    // Filter by alcohol preference if specified
    if (preferences.alcohol !== undefined) {
      filteredUsers = filteredUsers.filter(user => 
        user.preferences.alcohol === preferences.alcohol
      );
    }

    // Filter by spicy preference if specified
    if (preferences.spicy !== undefined) {
      filteredUsers = filteredUsers.filter(user => 
        user.preferences.spicy === preferences.spicy
      );
    }

    // If not enough users with preferences, fall back to all users
    if (filteredUsers.length < 2) {
      filteredUsers = users.filter(user => user.isActive);
    }

    return this.selectParticipants(filteredUsers, battleType);
  },

  // Generate random battle type
  getRandomBattleType() {
    const battleTypes = ['1v1', '2v2', '3v3', 'free-for-all'];
    const weights = [40, 25, 20, 15]; // Percentage weights
    
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (let i = 0; i < battleTypes.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return battleTypes[i];
      }
    }
    
    return '1v1'; // Fallback
  },

  // Create balanced teams for team battles
  createBalancedTeams(participants) {
    const shuffled = [...participants].sort(() => 0.5 - Math.random());
    const teamSize = Math.floor(shuffled.length / 2);
    
    return {
      team1: shuffled.slice(0, teamSize),
      team2: shuffled.slice(teamSize, teamSize * 2)
    };
  },

  // Fisher-Yates shuffle algorithm for better randomization
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
};

module.exports = randomizer;