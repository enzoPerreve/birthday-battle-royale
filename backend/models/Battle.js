const { db } = require('../config/firebase');

class Battle {
  constructor(data) {
    this.id = data.id;
    this.type = data.type; // '1v1', '3v3', etc.
    this.participants = data.participants || []; // Array of user IDs
    this.status = data.status || 'pending'; // 'pending', 'active', 'completed'
    this.createdAt = data.createdAt || new Date();
    this.startedAt = data.startedAt || null;
    this.completedAt = data.completedAt || null;
    this.winner = data.winner || null; // User ID of winner (optional)
    this.description = data.description || '';
  }

  // Save battle to Firestore
  async save() {
    try {
      const battleRef = db.collection('battles').doc(this.id);
      await battleRef.set({
        type: this.type,
        participants: this.participants,
        status: this.status,
        createdAt: this.createdAt,
        startedAt: this.startedAt,
        completedAt: this.completedAt,
        winner: this.winner,
        description: this.description
      });
      return this;
    } catch (error) {
      throw new Error(`Error saving battle: ${error.message}`);
    }
  }

  // Get battle by ID
  static async findById(id) {
    try {
      const doc = await db.collection('battles').doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return new Battle({ id: doc.id, ...doc.data() });
    } catch (error) {
      throw new Error(`Error finding battle: ${error.message}`);
    }
  }

  // Get all battles
  static async findAll() {
    try {
      const snapshot = await db.collection('battles').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => new Battle({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error finding battles: ${error.message}`);
    }
  }

  // Get active battles
  static async findActive() {
    try {
      const snapshot = await db.collection('battles')
        .where('status', 'in', ['pending', 'active'])
        .orderBy('createdAt', 'desc')
        .get();
      return snapshot.docs.map(doc => new Battle({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error finding active battles: ${error.message}`);
    }
  }

  // Update battle status
  async updateStatus(status) {
    try {
      const updateData = { status };
      
      if (status === 'active') {
        updateData.startedAt = new Date();
      } else if (status === 'completed') {
        updateData.completedAt = new Date();
      }

      await db.collection('battles').doc(this.id).update(updateData);
      Object.assign(this, updateData);
      return this;
    } catch (error) {
      throw new Error(`Error updating battle status: ${error.message}`);
    }
  }

  // Set winner
  async setWinner(winnerId) {
    try {
      await db.collection('battles').doc(this.id).update({
        winner: winnerId,
        status: 'completed',
        completedAt: new Date()
      });
      this.winner = winnerId;
      this.status = 'completed';
      this.completedAt = new Date();
      return this;
    } catch (error) {
      throw new Error(`Error setting battle winner: ${error.message}`);
    }
  }
}

module.exports = Battle;
