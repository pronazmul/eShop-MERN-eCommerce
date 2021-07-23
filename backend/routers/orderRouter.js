// External Modules:
const express = require('express')
const {
  addNewOrder,
  getOrderByID,
  paymentUpdate,
  getMyOrders,
  getAllOrder,
} = require('../controllers/orderController')
const router = express.Router()

// Internal Modules:
const authGuard = require('../middlewares/common/authMiddleware')
const checkRole = require('../middlewares/common/checkRole')

// @Logged in user only
router.route('/').post(authGuard, addNewOrder)
router.route('/myorders').get(authGuard, getMyOrders)
router.route('/:id').get(authGuard, getOrderByID)
router.route('/:id/pay').put(authGuard, paymentUpdate)

// @Admin Only
router.route('/').get(authGuard, checkRole('admin'), getAllOrder)

// Export Module:
module.exports = router
