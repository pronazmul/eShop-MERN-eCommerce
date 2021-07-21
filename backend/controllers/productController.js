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
 * @desc   Create Single Product
 * @Route  POST api/products/
 * @access public/Admin
 */
const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user.id,
    image: '/images/phone.jpg',
    brand: 'Apple',
    category: 'Laptop',
    countInStock: 0,
    numReviews: 0,
    description: 'Simple Product Description..',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

/**
 * @desc   Update Single Product
 * @Route  PUT api/products/:id
 * @access public/Admin
 */
const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image
    product.brand = req.body.brand || product.brand
    product.category = req.body.category || product.category
    product.countInStock = req.body.countInStock || product.countInStock
    product.description = req.body.description || product.description
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404).json({
      errors: {
        common: {
          msg: 'Products Not Exists',
        },
      },
    })
  }
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
module.exports = {
  allProducts,
  singleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
}
