// External Modules:
const asyncHandler = require('express-async-handler')

// Internal Modules:
const Product = require('../models/productModel')

/**
 * @desc   Fetch All Product
 * @Route  GET api/products
 * @access public
 */
const allProducts = asyncHandler(async (req, res) => {
  const result = await Product.find()
  res.status(200).json(result)
})

/**
 * @desc   Fetch Single Product
 * @Route  GET api/products/:id
 * @access public
 */
const singleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json(product)
})

/**
 * @desc   Delete Single Product
 * @Route  DELETE api/products/:id
 * @access public/Admin
 */
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.remove()
    res.status(200).json({ msg: 'Product Removed Successfully!' })
  } else {
    res.status(404).json({
      errors: {
        common: {
          msg: 'Product Not Exists',
        },
      },
    })
  }
})

// Module Export:
module.exports = { allProducts, singleProduct, deleteProduct }
