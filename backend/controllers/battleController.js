const Battle = require('../models/Battle');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const randomizer = require('../services/randomizer');

const battleController = {
  // Create new battle
  async createBattle(req, res) {
    try {
      const { type, participants, description } = req.body;
      
      // Validation
      if (!type || !participants || !Array.isArray(participants)) {
        return res.status(400).json({
          success: false,
          message: 'Type and participants array are required'
        });
      }

      // Validate participants exist
      const users = await Promise.all(
        participants.map(id => User.findById(id))
      );
      
      const invalidUsers = users.filter(user => !user);
      if (invalidUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Some participants do not exist'
        });
      }

      const battleId = uuidv4();
      const battle = new Battle({
        id: battleId,
        type,
        participants,
        description: description || `${type} Battle`
      });

      await battle.save();

      res.status(201).json({
        success: true,
        message: 'Battle created successfully',
        data: battle
      });
    } catch (error) {
      console.error('Error creating battle:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating battle',
        error: error.message
      });
    }
  },

  // Generate random battle
  async generateRandomBattle(req, res) {
    try {
      const { type } = req.body;
      
      if (!type) {
        return res.status(400).json({
          success: false,
          message: 'Battle type is required'
        });
      }

      // Get all active users
      const users = await User.findAll();
      
      if (users.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Not enough participants for a battle'
        });
      }

      // Generate random participants based on battle type
      const participants = randomizer.selectParticipants(users, type);
      
      if (!participants || participants.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Could not generate valid participants for this battle type'
        });
      }

      const battleId = uuidv4();
      const battle = new Battle({
        id: battleId,
        type,
        participants: participants.map(p => p.id),
        description: `Random ${type} Battle`
      });

      await battle.save();

      // Return battle with participant details
      const battleWithDetails = {
        ...battle,
        participantDetails: participants
      };

      res.status(201).json({
        success: true,
        message: 'Random battle generated successfully',
        data: battleWithDetails
      });
    } catch (error) {
      console.error('Error generating random battle:', error);
      res.status(500).json({
        success: false,
        message: 'Error generating random battle',
        error: error.message
      });
    }
  },

  // Get all battles
  async getAllBattles(req, res) {
    try {
      const battles = await Battle.findAll();
      res.json({
        success: true,
        data: battles
      });
    } catch (error) {
      console.error('Error fetching battles:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching battles',
        error: error.message
      });
    }
  },

  // Get active battles
  async getActiveBattles(req, res) {
    try {
      const battles = await Battle.findActive();
      res.json({
        success: true,
        data: battles
      });
    } catch (error) {
      console.error('Error fetching active battles:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching active battles',
        error: error.message
      });
    }
  },

  // Get battle by ID
  async getBattleById(req, res) {
    try {
      const { id } = req.params;
      const battle = await Battle.findById(id);
      
      if (!battle) {
        return res.status(404).json({
          success: false,
          message: 'Battle not found'
        });
      }

      // Get participant details
      const participants = await Promise.all(
        battle.participants.map(id => User.findById(id))
      );

      const battleWithDetails = {
        ...battle,
        participantDetails: participants.filter(p => p !== null)
      };

      res.json({
        success: true,
        data: battleWithDetails
      });
    } catch (error) {
      console.error('Error fetching battle:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching battle',
        error: error.message
      });
    }
  },

  // Update battle status
  async updateBattleStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'active', 'completed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be pending, active, or completed'
        });
      }

      const battle = await Battle.findById(id);
      if (!battle) {
        return res.status(404).json({
          success: false,
          message: 'Battle not found'
        });
      }

      const updatedBattle = await battle.updateStatus(status);

      res.json({
        success: true,
        message: 'Battle status updated successfully',
        data: updatedBattle
      });
    } catch (error) {
      console.error('Error updating battle status:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating battle status',
        error: error.message
      });
    }
  },

  // Set battle winner
  async setBattleWinner(req, res) {
    try {
      const { id } = req.params;
      const { winnerId } = req.body;

      if (!winnerId) {
        return res.status(400).json({
          success: false,
          message: 'Winner ID is required'
        });
      }

      const battle = await Battle.findById(id);
      if (!battle) {
        return res.status(404).json({
          success: false,
          message: 'Battle not found'
        });
      }

      // Verify winner is a participant
      if (!battle.participants.includes(winnerId)) {
        return res.status(400).json({
          success: false,
          message: 'Winner must be a participant in the battle'
        });
      }

      const updatedBattle = await battle.setWinner(winnerId);

      res.json({
        success: true,
        message: 'Battle winner set successfully',
        data: updatedBattle
      });
    } catch (error) {
      console.error('Error setting battle winner:', error);
      res.status(500).json({
        success: false,
        message: 'Error setting battle winner',
        error: error.message
      });
    }
  }
};

module.exports = battleController;
