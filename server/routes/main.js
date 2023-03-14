import express from 'express'
const router = express.Router();
import { createUser, getUserScore, deleteUser, updateScore, updateHighScore} from '../controllers/user.js'

// const authController = require('../controllers/auth') 

// router.post('/login/:id', createUser)
router.get('/getUserScore', getUserScore)
router.post('/signup', createUser)
router.put('/updateScore', updateScore)
router.put('/updateHighScore', updateHighScore)

export default router