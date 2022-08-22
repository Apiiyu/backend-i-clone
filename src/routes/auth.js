const { body } = require('express-validator');
const upload = require('../utils/fileUpload');
const express = require('express');
const router = express.Router();
const { register, login, getLoggedUser } = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/authentication');

router.get('/me', authenticate, getLoggedUser)
router.post('/register', 
  body('username').isLength({ min: 5}),
  body('email').isEmail(),
  body('password').isLength({ min: 8}),
  upload.single('profile_picture'),
  register
) 
router.post('/login', 
  body('email').isEmail(),
  body('password').isLength({ min: 8}),
  login
)

module.exports = router
