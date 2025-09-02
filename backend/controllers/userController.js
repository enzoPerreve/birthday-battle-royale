const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { storage } = require('../config/firebase');

const userController = {
  // Create new user
  async createUser(req, res) {
    try {
      const { name, contact, phrase } = req.body;
      let preferences = req.body.preferences;
      
      // Debug log to see what we receive
      console.log('Received preferences:', preferences, 'Type:', typeof preferences);
      
      // Parse preferences if it's a string
      if (typeof preferences === 'string') {
        try {
          preferences = JSON.parse(preferences);
          console.log('Parsed preferences:', preferences);
        } catch (e) {
          console.log('Failed to parse preferences, using defaults');
          preferences = { alcohol: false, spicy: false };
        }
      }
      
      // Ensure preferences has default structure if undefined
      if (!preferences || typeof preferences !== 'object') {
        preferences = { alcohol: false, spicy: false };
      }
      
      // Validation
      if (!name || !contact) {
        return res.status(400).json({
          success: false,
          message: 'Name and contact are required'
        });
      }

      // Handle photo upload if present
      let photoUrl = null;
      if (req.file) {
        const fileName = `profiles/${uuidv4()}-${req.file.originalname}`;
        const file = storage.bucket().file(fileName);
        
        await file.save(req.file.buffer, {
          metadata: {
            contentType: req.file.mimetype
          }
        });

        // Make the file publicly readable
        await file.makePublic();
        photoUrl = `https://storage.googleapis.com/${storage.bucket().name}/${fileName}`;
      }

      const userId = uuidv4();
      const user = new User({
        id: userId,
        name,
        photo: photoUrl,
        preferences: preferences || { alcohol: false, spicy: false },
        contact,
        phrase: phrase || "Ready to rumble!"
      });

      await user.save();

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: error.message
      });
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message
      });
    }
  },

  // Get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user',
        error: error.message
      });
    }
  },

  // Update user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Handle photo upload if present
      if (req.file) {
        const fileName = `profiles/${uuidv4()}-${req.file.originalname}`;
        const file = storage.bucket().file(fileName);
        
        await file.save(req.file.buffer, {
          metadata: {
            contentType: req.file.mimetype
          }
        });

        await file.makePublic();
        updateData.photo = `https://storage.googleapis.com/${storage.bucket().name}/${fileName}`;
      }

      const updatedUser = await user.update(updateData);

      res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: error.message
      });
    }
  },

  // Delete user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await user.delete();

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: error.message
      });
    }
  }
};

module.exports = userController;
