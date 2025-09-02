const { db } = require('../config/firebase');

class Question {
  constructor(data) {
    this.id = data.id;
    this.question = data.question;
    this.answers = data.answers; // Array of 4 possible answers
    this.correctAnswer = data.correctAnswer; // Index of correct answer (0-3)
    this.category = data.category || 'general';
    this.difficulty = data.difficulty || 'easy'; // easy, medium, hard
    this.points = data.points || 10;
    this.createdAt = data.createdAt || new Date();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  // Save question to Firestore
  async save() {
    try {
      const questionRef = db.collection('questions').doc(this.id);
      await questionRef.set({
        question: this.question,
        answers: this.answers,
        correctAnswer: this.correctAnswer,
        category: this.category,
        difficulty: this.difficulty,
        points: this.points,
        createdAt: this.createdAt,
        isActive: this.isActive
      });
      return this;
    } catch (error) {
      throw new Error(`Error saving question: ${error.message}`);
    }
  }

  // Get question by ID
  static async findById(id) {
    try {
      const doc = await db.collection('questions').doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return new Question({ id: doc.id, ...doc.data() });
    } catch (error) {
      throw new Error(`Error finding question: ${error.message}`);
    }
  }

  // Get all active questions
  static async findAll() {
    try {
      const snapshot = await db.collection('questions').where('isActive', '==', true).get();
      return snapshot.docs.map(doc => new Question({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error finding questions: ${error.message}`);
    }
  }

  // Get random questions for quiz
  static async getRandomQuestions(count = 5, category = null) {
    try {
      let query = db.collection('questions').where('isActive', '==', true);
      
      if (category) {
        query = query.where('category', '==', category);
      }
      
      const snapshot = await query.get();
      const questions = snapshot.docs.map(doc => new Question({ id: doc.id, ...doc.data() }));
      
      // Shuffle and return requested count
      const shuffled = questions.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    } catch (error) {
      throw new Error(`Error getting random questions: ${error.message}`);
    }
  }

  // Update question
  async update(data) {
    try {
      const updateData = {};
      if (data.question !== undefined) updateData.question = data.question;
      if (data.answers !== undefined) updateData.answers = data.answers;
      if (data.correctAnswer !== undefined) updateData.correctAnswer = data.correctAnswer;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
      if (data.points !== undefined) updateData.points = data.points;
      if (data.isActive !== undefined) updateData.isActive = data.isActive;

      await db.collection('questions').doc(this.id).update(updateData);
      Object.assign(this, updateData);
      return this;
    } catch (error) {
      throw new Error(`Error updating question: ${error.message}`);
    }
  }

  // Delete question (soft delete)
  async delete() {
    try {
      await this.update({ isActive: false });
      return true;
    } catch (error) {
      throw new Error(`Error deleting question: ${error.message}`);
    }
  }
}

module.exports = Question;
