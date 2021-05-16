import express from 'express'
import { createComment, createReply, getComments } from '../controllers/Comment.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, createComment)
router.get('/post/:postId', getComments)
router.post('/:commentId/reply', auth, createReply)


export default router