import express from 'express'
const router = express.Router();
import { createUser, getUserHighScore, deleteUser, updateScore, updateHighScore, getAllHighScore} from '../controllers/user.js'

// const authController = require('../controllers/auth') 
// router.get('/checkUserName', checkUserName)
// router.post('/login/:id', createUser)
router.get('/getAllHighScore', getAllHighScore)
router.get('/getUserHighScore', getUserHighScore)
router.post('/signup', createUser)
router.put('/updateScore', updateScore)
router.put('/updateHighScore', updateHighScore)

export default router