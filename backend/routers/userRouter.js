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
  updateUserProfile,
  getAllUser,
  deleteUser,
  getUserById,
  updateUserByAdmin,
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
router.route('/login').post(userLogin)
router.route('/profile').get(authGuard, getUser)
router
  .route('/profile')
  .put(
    authGuard,
    avatarUpload,
    updateValidator,
    validationHandler,
    updateUserProfile
  )
// Admin Routes
router.route('/').get(authGuard, checkRole('admin'), getAllUser)
router.route('/:id').delete(authGuard, checkRole('admin'), deleteUser)
router.route('/:id').get(authGuard, checkRole('admin'), getUserById)
router.route('/:id').put(authGuard, checkRole('admin'), updateUserByAdmin)

// Export Module:
module.exports = router
