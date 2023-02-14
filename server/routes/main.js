import express from 'express'
const router = express.Router();
import { createUser, getUserHighScore, deleteUser, updateScore, updateHighScore} from '../controllers/user.js'

// const authController = require('../controllers/auth') 

// router.post('/login/:id', createUser)
router.get('/getUserHighScore', getUserHighScore)
router.post('/signup', createUser)
router.put('/updateScore', updateScore)
router.put('/updateHighScore', updateHighScore)

export default router