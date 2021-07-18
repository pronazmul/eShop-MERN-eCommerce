// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const {
  registrationValidator,
  validationHandler,
  updateValidator,
} = require('../middlewares/dataValidation/dataValidation')
const {
  userResisgration,
  userLogin,
  getUser,
  updateUser,
  getAllUser,
} = require('../controllers/userController')
const avatarUpload = require('../middlewares/uploadValidation/avatarUpload')
const authGuard = require('../middlewares/common/authMiddleware')
const checkRole = require('../middlewares/common/checkRole')

router
  .route('/')
  .post(
    avatarUpload,
    registrationValidator,
    validationHandler,
    userResisgration
  )

router.get('/', authGuard, checkRole('admin'), getAllUser)

router.post('/login', userLogin)

router
  .route('/profile')
  .get(authGuard, getUser)
  .put(authGuard, avatarUpload, updateValidator, validationHandler, updateUser)

// Export Module:
module.exports = router
