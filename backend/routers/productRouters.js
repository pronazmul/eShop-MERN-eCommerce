// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const {
  singleProduct,
  allProducts,
} = require('../controllers/productController')

router.route('/').get(allProducts)
router.route('/:id').get(singleProduct)

// Export Module:
module.exports = router
