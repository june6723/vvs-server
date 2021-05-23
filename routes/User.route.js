import express from 'express';
import { findUser, followOtherUser, getJoinedCommunities } from '../controllers/User.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id/communities', auth, getJoinedCommunities);
router.get('/find', findUser);
router.patch('/follow/:followId', auth, followOtherUser)

export default router;