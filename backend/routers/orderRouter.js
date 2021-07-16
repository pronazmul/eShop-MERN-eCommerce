// External Modules:
const express = require('express')
const { addNewOrder } = require('../controllers/orderController')
const router = express.Router()

// Internal Modules:
const authGuard = require('../middlewares/common/authMiddleware')

router.route('/').post(authGuard, addNewOrder)

// Export Module:
module.exports = router
