import express from 'express';
import { createPost, dislikePost, getMyPosts, likePost } from '../controllers/Post.controller.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/myposts', auth, getMyPosts);
router.post('/', auth, createPost);
router.patch('/:id/likes', auth, likePost)
router.patch('/:id/dislikes', auth, dislikePost)

export default router;


