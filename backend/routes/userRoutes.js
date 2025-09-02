const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserInput } = require('../middleware/validateInput');
const { upload, handleUploadError } = require('../middleware/upload');
const authAdmin = require('../middleware/authAdmin');
const notificationService = require('../services/notificationService');

// Public routes
router.post('/register', 
  upload.single('photo'), 
  handleUploadError,
  validateUserInput, 
  async (req, res) => {
    try {
      // Create user
      await userController.createUser(req, res);
      
      // Send welcome notification if user creation was successful
      if (res.statusCode === 201 && req.body.contact) {
        try {
          const userData = {
            name: req.body.name,
            contact: req.body.contact,
            phrase: req.body.phrase || "Ready to rumble!"
          };
          await notificationService.sendWelcomeNotification(userData);
        } catch (notifError) {
          console.error('Failed to send welcome notification:', notifError.message);
          // Don't fail the registration if notification fails
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Registration failed',
          error: error.message
        });
      }
    }
  }
);

router.get('/participants', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Admin routes
router.put('/:id', authAdmin, upload.single('photo'), handleUploadError, userController.updateUser);
router.delete('/:id', authAdmin, userController.deleteUser);

// Notification route
router.post('/notify', authAdmin, notificationService.sendNotification.bind(notificationService));

module.exports = router;