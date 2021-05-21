import express from 'express'
import { createComment, createReply, getComments, getReplies, likeComment } from '../controllers/Comment.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, createComment)
router.get('/post/:postId', getComments)
router.post('/reply', auth, createReply)
router.patch('/:commentId', auth, likeComment)
router.get('/:commentId', getReplies)


export default router