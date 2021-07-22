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
  createProduct,
  updateProduct,
} = require('../controllers/productController')
const productUpload = require('../middlewares/uploadValidation/productUpload')

router.route('/').get(allProducts)
router.route('/:id').get(singleProduct)
router.route('/:id').delete(authGuard, checkRole('admin'), deleteProduct)
router.route('/').post(authGuard, checkRole('admin'), createProduct)
router
  .route('/:id')
  .put(authGuard, productUpload, checkRole('admin'), updateProduct)

// Export Module:
module.exports = router
