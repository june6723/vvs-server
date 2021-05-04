import express from 'express'
import { logIn, logOut, signNewToken, signUp } from '../controllers/Auth.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/login', logIn)
router.post('/signup', signUp)
router.post('/refresh-token', auth, signNewToken)
router.delete('/logout', auth, logOut)

export default router;