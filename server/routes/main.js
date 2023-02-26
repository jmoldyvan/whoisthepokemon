const express =  require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const scoreController = require('../controllers/score')
const profilePostController = require('../controllers/profilepost')
const { ensureAuth } = require('../middleware/auth')


router.post("/createscore/:id", scoreController.createScore);
router.get('/scoreInfo', scoreController.getScores)
// router.put("/likescore/:id", scoreController.addLike)
router.delete("/deletescore/:id", scoreController.deleteScore);

// ****************************
// router.put('/hotspringdbinfo/like/:id', hotSpringController.addLike)
// ****************************

router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.post('/signup', authController.postSignup)

// ****************************
// router.get('/getprofilepic/:id', profilePostController.getProfilePost)
// router.post('/updateprofilepic/:id', upload.single("data"), profilePostController.updateProfilePost)
// router.delete('/deleteprofile/:id', profilePostController.deleteProfilePost)
// ****************************


module.exports = router