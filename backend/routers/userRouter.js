// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const {
  userValidator,
  userValidationHandler,
} = require('../middlewares/dataValidation/userResistration')
const {
  userResisgration,
  userLogin,
  getUser,
} = require('../controllers/userController')
const avatarUpload = require('../middlewares/uploadValidation/avatarUpload')
const authGuard = require('../middlewares/common/authMiddleware')

router
  .route('/')
  .post(avatarUpload, userValidator, userValidationHandler, userResisgration)

router.post('/login', userLogin)

router.route('/profile').get(authGuard, getUser)

// Export Module:
module.exports = router
