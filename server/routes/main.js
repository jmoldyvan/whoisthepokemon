const express =  require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const profilePostController = require('../controllers/profilepost')
const { ensureAuth } = require('../middleware/auth')

router.get('/hotspringdbinfo', hotSpringController.getHSDBInfo)

// ****************************
router.put('/hotspringdbinfo/like/:id', hotSpringController.addLike)
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