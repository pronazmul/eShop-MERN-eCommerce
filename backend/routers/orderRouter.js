// External Modules:
const express = require('express')
const { addNewOrder, getOrderByID } = require('../controllers/orderController')
const router = express.Router()

// Internal Modules:
const authGuard = require('../middlewares/common/authMiddleware')

router.route('/').post(authGuard, addNewOrder)
router.route('/:id').get(authGuard, getOrderByID)

// Export Module:
module.exports = router
