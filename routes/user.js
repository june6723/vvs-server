import express from 'express';
import { findUser, getJoinedCommunities, login, signup } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/:id/communities', auth, getJoinedCommunities);
router.get('/find', findUser);

export default router;