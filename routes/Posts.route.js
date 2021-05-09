import express from 'express';
import { createPost, getMyPosts } from '../controllers/Post.controller.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/myposts', auth, getMyPosts);
router.post('/', auth, createPost);

export default router;


