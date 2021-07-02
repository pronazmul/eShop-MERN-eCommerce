// External Modules:
const express = require('express')

const router = express.Router()

// Internal Modules:
const { addUser } = require('../controllers/userController')

// Internal Modules:

router.route('/registration').post(addUser)

// Export Module:
module.exports = router
