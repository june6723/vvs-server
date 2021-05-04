import express from 'express';
import { findUser, getJoinedCommunities } from '../controllers/User.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id/communities', auth, getJoinedCommunities);
router.get('/find', findUser);

export default router;