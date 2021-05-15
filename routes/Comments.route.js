import express from 'express'
import { createComment, getComments } from '../controllers/Comment.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/post/:postId', auth, createComment)
router.get('/post/:postId', getComments)


export default router