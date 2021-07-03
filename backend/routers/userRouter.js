// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const {
  userValidator,
  userValidationHandler,
} = require('../middlewares/dataValidation/userResistration')
const { addUser } = require('../controllers/userController')
const avatarUpload = require('../middlewares/uploadValidation/avatarUpload')

router.post(
  '/registration',
  avatarUpload,
  userValidator,
  userValidationHandler,
  addUser
)

// Export Module:
module.exports = router
