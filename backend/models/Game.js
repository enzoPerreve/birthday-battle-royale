const { db } = require('../config/firebase');

class Game {
  constructor(data) {
    this.id = data.id;
    this.type = data.type; // 'quiz', 'lyrics', 'music'
    this.title = data.title;
    this.description = data.description;
    this.participants = data.participants || []; // Array of user IDs
    this.status = data.status || 'waiting'; // waiting, active, completed
    this.questions = data.questions || []; // For quiz games
    this.content = data.content || {}; // For lyrics/music games
    this.answers = data.answers || {}; // userId -> answer mapping
    this.scores = data.scores || {}; // userId -> score mapping
    this.winner = data.winner || null;
    this.startedAt = data.startedAt || null;
    this.completedAt = data.completedAt || null;
    this.createdAt = data.createdAt || new Date();
    this.maxParticipants = data.maxParticipants || 10;
    this.timeLimit = data.timeLimit || 30; // seconds per question
  }

  // Save game to Firestore
  async save() {
    try {
      const gameRef = db.collection('games').doc(this.id);
      await gameRef.set({
        type: this.type,
        title: this.title,
        description: this.description,
        participants: this.participants,
        status: this.status,
        questions: this.questions,
        content: this.content,
        answers: this.answers,
        scores: this.scores,
        winner: this.winner,
        startedAt: this.startedAt,
        completedAt: this.completedAt,
        createdAt: this.createdAt,
        maxParticipants: this.maxParticipants,
        timeLimit: this.timeLimit
      });
      return this;
    } catch (error) {
      throw new Error(`Error saving game: ${error.message}`);
    }
  }

  // Get game by ID
  static async findById(id) {
    try {
      const doc = await db.collection('games').doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return new Game({ id: doc.id, ...doc.data() });
    } catch (error) {
      throw new Error(`Error finding game: ${error.message}`);
    }
  }

  // Get active games
  static async getActiveGames() {
    try {
      const snapshot = await db.collection('games')
        .where('status', 'in', ['waiting', 'active'])
        .orderBy('createdAt', 'desc')
        .get();
      return snapshot.docs.map(doc => new Game({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error finding active games: ${error.message}`);
    }
  }

  // Join game
  async joinGame(userId) {
    try {
      if (this.participants.includes(userId)) {
        throw new Error('User already in game');
      }
      
      if (this.participants.length >= this.maxParticipants) {
        throw new Error('Game is full');
      }
      
      if (this.status !== 'waiting') {
        throw new Error('Game already started');
      }

      this.participants.push(userId);
      await this.update({ participants: this.participants });
      return this;
    } catch (error) {
      throw new Error(`Error joining game: ${error.message}`);
    }
  }

  // Start game
  async startGame() {
    try {
      if (this.status !== 'waiting') {
        throw new Error('Game already started');
      }
      
      if (this.participants.length < 2) {
        throw new Error('Need at least 2 participants');
      }

      await this.update({ 
        status: 'active', 
        startedAt: new Date() 
      });
      return this;
    } catch (error) {
      throw new Error(`Error starting game: ${error.message}`);
    }
  }

  // Submit answer
  async submitAnswer(userId, answer) {
    try {
      if (this.status !== 'active') {
        throw new Error('Game not active');
      }
      
      if (!this.participants.includes(userId)) {
        throw new Error('User not in game');
      }

      this.answers[userId] = answer;
      await this.update({ answers: this.answers });
      return this;
    } catch (error) {
      throw new Error(`Error submitting answer: ${error.message}`);
    }
  }

  // Calculate scores and end game
  async endGame() {
    try {
      const scores = {};
      let maxScore = 0;
      let winner = null;

      // Calculate scores based on game type
      if (this.type === 'quiz') {
        for (const userId of this.participants) {
          let score = 0;
          if (this.answers[userId]) {
            for (let i = 0; i < this.questions.length; i++) {
              const userAnswer = this.answers[userId][i];
              const correctAnswer = this.questions[i].correctAnswer;
              if (userAnswer === correctAnswer) {
                score += this.questions[i].points || 10;
              }
            }
          }
          scores[userId] = score;
          
          if (score > maxScore) {
            maxScore = score;
            winner = userId;
          }
        }
      }

      await this.update({ 
        status: 'completed',
        completedAt: new Date(),
        scores: scores,
        winner: winner
      });

      return this;
    } catch (error) {
      throw new Error(`Error ending game: ${error.message}`);
    }
  }

  // Update game
  async update(data) {
    try {
      const updateData = {};
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
          updateData[key] = data[key];
        }
      });

      await db.collection('games').doc(this.id).update(updateData);
      Object.assign(this, updateData);
      return this;
    } catch (error) {
      throw new Error(`Error updating game: ${error.message}`);
    }
  }
}

module.exports = Game;
