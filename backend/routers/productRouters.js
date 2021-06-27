// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const {
  singleProduct,
  allProducts,
} = require('../controllers/productController')

/**
 * @desc   Fetch All Product
 * @Route  GET api/products
 * @access public
 */
router.get('/', allProducts)

/**
 * @desc   Fetch Single Product
 * @Route  GET api/products/:id
 * @access public
 */
router.get('/:id', singleProduct)

// Export Module:
module.exports = router
