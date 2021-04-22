import express from 'express';
import auth from '../middleware/auth.js';
import { createNewCommunity } from '../controllers/communityController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This works!');
})

router.post('/', auth, createNewCommunity)

export default router;