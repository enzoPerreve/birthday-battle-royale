const { db } = require('../config/firebase');

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.photo = data.photo || null;
    this.preferences = {
      alcohol: data.preferences?.alcohol || false,
      spicy: data.preferences?.spicy || false
    };
    this.contact = data.contact;
    this.createdAt = data.createdAt || new Date();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.phrase = data.phrase || "Ready to rumble!";
    this.points = data.points || 0;
    this.gamesPlayed = data.gamesPlayed || 0;
    this.wins = data.wins || 0;
  }

  // Save user to Firestore
  async save() {
    try {
      const userRef = db.collection('users').doc(this.id);
      await userRef.set({
        name: this.name,
        photo: this.photo,
        preferences: this.preferences,
        contact: this.contact,
        createdAt: this.createdAt,
        isActive: this.isActive,
        phrase: this.phrase,
        points: this.points,
        gamesPlayed: this.gamesPlayed,
        wins: this.wins
      });
      return this;
    } catch (error) {
      throw new Error(`Error saving user: ${error.message}`);
    }
  }

  // Get user by ID
  static async findById(id) {
    try {
      const doc = await db.collection('users').doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return new User({ id: doc.id, ...doc.data() });
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  // Get all active users
  static async findAll() {
    try {
      const snapshot = await db.collection('users').where('isActive', '==', true).get();
      return snapshot.docs.map(doc => new User({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error finding users: ${error.message}`);
    }
  }

  // Update user
  async update(data) {
    try {
      const updateData = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.photo !== undefined) updateData.photo = data.photo;
      if (data.preferences !== undefined) updateData.preferences = data.preferences;
      if (data.contact !== undefined) updateData.contact = data.contact;
      if (data.phrase !== undefined) updateData.phrase = data.phrase;
      if (data.isActive !== undefined) updateData.isActive = data.isActive;
      if (data.points !== undefined) updateData.points = data.points;
      if (data.gamesPlayed !== undefined) updateData.gamesPlayed = data.gamesPlayed;
      if (data.wins !== undefined) updateData.wins = data.wins;

      await db.collection('users').doc(this.id).update(updateData);
      Object.assign(this, updateData);
      return this;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Delete user (soft delete)
  async delete() {
    try {
      await this.update({ isActive: false });
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  // Get leaderboard (users sorted by points)
  static async getLeaderboard() {
    try {
      const snapshot = await db.collection('users')
        .where('isActive', '==', true)
        .orderBy('points', 'desc')
        .orderBy('wins', 'desc')
        .get();
      return snapshot.docs.map(doc => new User({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error getting leaderboard: ${error.message}`);
    }
  }

  // Add points to user
  async addPoints(points, gameType) {
    try {
      const newPoints = this.points + points;
      const newGamesPlayed = this.gamesPlayed + 1;
      const newWins = points > 0 ? this.wins + 1 : this.wins;
      
      await this.update({ 
        points: newPoints, 
        gamesPlayed: newGamesPlayed,
        wins: newWins 
      });
      
      return this;
    } catch (error) {
      throw new Error(`Error adding points: ${error.message}`);
    }
  }
}

module.exports = User;
