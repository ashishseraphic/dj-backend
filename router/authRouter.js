const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const mobileUserController=require('../controller/mobileUserController')




router.post('/login',userController.login)
router.post('/mobilelogin',mobileUserController.login)


// router.post('/verifyotp',adminController.verificationSignup)

// router.route('/signup').post(tenantController.signup)
// router.route('/demo').get(tenantController.demo)






module.exports = router;