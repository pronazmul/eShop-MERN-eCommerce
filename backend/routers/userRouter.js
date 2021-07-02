// External Modules:
const express = require('express')

const router = express.Router()

// Internal Modules:
const { addUser } = require('../controllers/userController')
const avatarUpload = require('../middlewares/uploadValidation/avatarUpload')

// Internal Modules:

router.route('/registration').post(avatarUpload, addUser)

// Export Module:
module.exports = router
