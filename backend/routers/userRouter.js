// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const {
  userValidator,
  userValidationHandler,
} = require('../middlewares/dataValidation/userResistration')
const { userResisgration, userLogin } = require('../controllers/userController')
const avatarUpload = require('../middlewares/uploadValidation/avatarUpload')

router.post(
  '/registration',
  avatarUpload,
  userValidator,
  userValidationHandler,
  userResisgration
)

router.post('/login', userLogin)

// Export Module:
module.exports = router
