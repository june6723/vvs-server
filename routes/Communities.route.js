import express from 'express';
import auth from '../middleware/auth.js';
import { 
  createNewCommunity,
  findCommunity,
  getCommunityPosts,
  handleJoinRequest,
  latestCommunities,
  requestToJoinCommunity
} from '../controllers/Community.controller.js';

const router = express.Router();

router.post('/', auth, createNewCommunity);
router.get('/find', findCommunity);
router.get('/:id/posts', getCommunityPosts);
router.get('/latest', latestCommunities);
router.patch('/:id/join', auth, requestToJoinCommunity);
router.patch('/:communityId/join/:userId', auth, handleJoinRequest);

export default router;