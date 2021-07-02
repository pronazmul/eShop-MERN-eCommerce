// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const { addUser } = require('../controllers/userController')
const {
  userValidator,
  userValidationHandler,
} = require('../middlewares/dataValidation/userResistration')
const avatarUpload = require('../middlewares/uploadValidation/avatarUpload')

router
  .route('/registration')
  .post(avatarUpload, userValidator, userValidationHandler, addUser)

// Export Module:
module.exports = router
