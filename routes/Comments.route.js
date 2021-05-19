import express from 'express'
import { createComment, createReply, getComments, likeComment } from '../controllers/Comment.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, createComment)
router.get('/post/:postId', getComments)
router.post('/reply', auth, createReply)
router.patch('/:commentId', auth, likeComment)


export default router