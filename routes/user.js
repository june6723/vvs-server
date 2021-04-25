import express from 'express';
import { getJoinedCommunities, login, signup } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/communities', auth, getJoinedCommunities);

export default router;