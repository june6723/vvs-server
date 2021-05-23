import express from 'express';
import { findUser, followOtherUser, getJoinedCommunities, setProfileImg, } from '../controllers/User.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id/communities', auth, getJoinedCommunities);
router.get('/find', findUser);
router.patch('/follow/:followId', auth, followOtherUser)
router.post('/profile-image', auth, setProfileImg)

export default router;