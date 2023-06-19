const express = require('express');
const {
  loginController,
  registerController,
  protectedController,
  getUserDetailsByEmail,
} = require('../controller/authController');
const authenticateToken = require('../middlewares/authenticateToken ');

const router = express.Router();

// Public routes
router.post('/login', loginController);
router.post('/register', registerController);
router.get('/logdetails/:authEmail', getUserDetailsByEmail);

// Protected routes
router.get('/protected', authenticateToken, protectedController);

module.exports = router;
