import express from 'express';
import auth from '../middleware/auth.js';
import { createNewCommunity, findCommunity, getCommunityPosts } from '../controllers/communityController.js';

const router = express.Router();

router.post('/', auth, createNewCommunity);
router.get('/find', findCommunity);
router.get('/:id/posts', getCommunityPosts);

export default router;