import express from 'express';
import { createPost, createPostInCommunity, getMyPosts } from '../controllers/postController.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/myposts', auth, getMyPosts);
router.post('/community/:id', auth, createPostInCommunity);
router.post('/', auth, createPost);

export default router;


