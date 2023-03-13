import express from 'express'
const router = express.Router();
import { createUser, getUserScore, deleteUser, updateScore, updateHighScore} from '../controllers/user.js'

// const authController = require('../controllers/auth') 


// router.post("/createuser/:id", userController.createUser);
// router.get('/userInfo', userController.getUsers)

// router.delete("/deleteuser/:id", userController.deleteUser);
// router.put("/likeuser/:id", userController.addLike)
// ****************************
// router.put('/user/like/:id', hotSpringController.addLike)
// ****************************

// router.post('/login/:id', createUser)
router.get('/getUserScore', getUserScore)
router.post('/signup', createUser)
router.put('/updateScore', updateScore)
router.put('/updateHighScore', updateHighScore)

export default router