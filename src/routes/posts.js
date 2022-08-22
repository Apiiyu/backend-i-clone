const { body } = require('express-validator');
const upload = require('../utils/fileUpload');
const express = require('express');
const router = express.Router();
const { create, getAllPosts } = require('../controllers/PostsController');
const { authenticate } = require('../middlewares/authentication');

router.get('/', authenticate, getAllPosts)

router.post(
  '/create', 
  authenticate,
  body('description').isLength({ min: 5}),
  upload.fields([{ name: 'images', maxCount: 10 }]),
  create
)

module.exports = router;