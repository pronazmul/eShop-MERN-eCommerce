// External Modules:
const express = require('express')
const {
  addNewOrder,
  getOrderByID,
  paymentUpdate,
  getMyOrders,
} = require('../controllers/orderController')
const router = express.Router()

// Internal Modules:
const authGuard = require('../middlewares/common/authMiddleware')

router.route('/').post(authGuard, addNewOrder)
router.route('/myorders').get(authGuard, getMyOrders)
router.route('/:id').get(authGuard, getOrderByID)
router.route('/:id/pay').put(authGuard, paymentUpdate)
// Export Module:
module.exports = router
