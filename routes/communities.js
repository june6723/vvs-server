import express from 'express';
import auth from '../middleware/auth.js';
import { createNewCommunity, findCommunity } from '../controllers/communityController.js';

const router = express.Router();

router.post('/', auth, createNewCommunity);
router.get('/find', findCommunity);

export default router;