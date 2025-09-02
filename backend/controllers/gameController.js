const Game = require('../models/Game');
const Question = require('../models/Question');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const gameController = {
  // Create new game
  async createGame(req, res) {
    try {
      const { type, title, description, maxParticipants = 10, timeLimit = 30 } = req.body;
      
      if (!type || !title) {
        return res.status(400).json({
          success: false,
          message: 'Type and title are required'
        });
      }

      const gameId = uuidv4();
      let gameData = {
        id: gameId,
        type,
        title,
        description: description || '',
        maxParticipants,
        timeLimit
      };

      // For quiz games, get random questions
      if (type === 'quiz') {
        const questions = await Question.getRandomQuestions(5);
        gameData.questions = questions.map(q => ({
          id: q.id,
          question: q.question,
          answers: q.answers,
          correctAnswer: q.correctAnswer,
          points: q.points
        }));
      }

      const game = new Game(gameData);
      await game.save();

      res.status(201).json({
        success: true,
        message: 'Game created successfully',
        data: game
      });
    } catch (error) {
      console.error('Error creating game:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating game',
        error: error.message
      });
    }
  },

  // Get active games
  async getActiveGames(req, res) {
    try {
      // En mode mock, retourner des jeux d'exemple
      if (!global.db || !global.db.collection) {
        console.log('🔧 Mock mode: returning sample games');
        const mockGames = [
          {
            id: 'quiz-1',
            title: 'Quiz sur Enzo',
            description: 'Testez vos connaissances sur Enzo !',
            type: 'quiz',
            status: 'waiting',
            participants: [],
            maxParticipants: 8,
            timeLimit: 30,
            createdAt: new Date(),
            createdBy: 'admin'
          },
          {
            id: 'music-1', 
            title: 'Devine la Musique',
            description: 'Reconnaissez les musiques préférées !',
            type: 'music',
            status: 'waiting',
            participants: [],
            maxParticipants: 6,
            timeLimit: 45,
            createdAt: new Date(),
            createdBy: 'admin'
          }
        ];
        
        return res.json({
          success: true,
          data: mockGames,
          total: mockGames.length
        });
      }
      
      const games = await Game.getActiveGames();
      res.json({
        success: true,
        data: games
      });
    } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching games',
        error: error.message
      });
    }
  },

  // Get game by ID
  async getGameById(req, res) {
    try {
      const { id } = req.params;
      const game = await Game.findById(id);
      
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      res.json({
        success: true,
        data: game
      });
    } catch (error) {
      console.error('Error fetching game:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching game',
        error: error.message
      });
    }
  },

  // Join game
  async joinGame(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }

      const game = await Game.findById(id);
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      await game.joinGame(userId);

      res.json({
        success: true,
        message: 'Joined game successfully',
        data: game
      });
    } catch (error) {
      console.error('Error joining game:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Start game
  async startGame(req, res) {
    try {
      const { id } = req.params;
      
      const game = await Game.findById(id);
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      await game.startGame();

      res.json({
        success: true,
        message: 'Game started successfully',
        data: game
      });
    } catch (error) {
      console.error('Error starting game:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Submit answer
  async submitAnswer(req, res) {
    try {
      const { id } = req.params;
      const { userId, answer } = req.body;
      
      if (!userId || answer === undefined) {
        return res.status(400).json({
          success: false,
          message: 'User ID and answer are required'
        });
      }

      const game = await Game.findById(id);
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      await game.submitAnswer(userId, answer);

      res.json({
        success: true,
        message: 'Answer submitted successfully',
        data: game
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // End game and calculate scores
  async endGame(req, res) {
    try {
      const { id } = req.params;
      
      const game = await Game.findById(id);
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      await game.endGame();

      // Update user points
      for (const [userId, score] of Object.entries(game.scores)) {
        try {
          const user = await User.findById(userId);
          if (user) {
            await user.addPoints(score, game.type);
          }
        } catch (userError) {
          console.error(`Error updating points for user ${userId}:`, userError);
        }
      }

      res.json({
        success: true,
        message: 'Game ended successfully',
        data: game
      });
    } catch (error) {
      console.error('Error ending game:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get leaderboard
  async getLeaderboard(req, res) {
    try {
      // En mode mock, retourner des utilisateurs d'exemple avec points
      if (!global.db || !global.db.collection) {
        console.log('🔧 Mock mode: returning sample leaderboard');
        const mockUsers = [
          {
            id: 'enzo-1',
            name: 'ENZO',
            email: 'perreve.enzo@gmail.com',
            points: 150,
            gamesPlayed: 5,
            wins: 3,
            phrase: 'EEE',
            preferences: { alcohol: true, spicy: false },
            createdAt: new Date()
          },
          {
            id: 'user-2',
            name: 'Alice',
            email: 'alice@test.com',
            points: 120,
            gamesPlayed: 4,
            wins: 2,
            phrase: 'Toujours partante !',
            preferences: { alcohol: false, spicy: true },
            createdAt: new Date()
          },
          {
            id: 'user-3',
            name: 'Bob',
            email: 'bob@test.com',
            points: 90,
            gamesPlayed: 3,
            wins: 1,
            phrase: 'Let\'s go !',
            preferences: { alcohol: true, spicy: true },
            createdAt: new Date()
          }
        ];
        
        return res.json({
          success: true,
          data: mockUsers
        });
      }
      
      const users = await User.getLeaderboard();
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching leaderboard',
        error: error.message
      });
    }
  }
};

module.exports = gameController;
