import express from 'express';
import { createPost, getMyPosts } from '../controllers/postController.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, (req, res) => {
  res.send('THIS WORK!');
});
router.get('/myposts', auth, getMyPosts);
router.post('/', auth, createPost);

export default router;


