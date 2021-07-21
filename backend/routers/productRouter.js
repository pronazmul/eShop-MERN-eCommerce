// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const authGuard = require('../middlewares/common/authMiddleware')
const checkRole = require('../middlewares/common/checkRole')
const {
  singleProduct,
  allProducts,
  deleteProduct,
} = require('../controllers/productController')

router.route('/').get(allProducts)
router.route('/:id').get(singleProduct)
router.route('/:id').delete(authGuard, checkRole('admin'), deleteProduct)

// Export Module:
module.exports = router
