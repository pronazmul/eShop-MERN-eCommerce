// External Modules:
const asyncHandler = require('express-async-handler')
const { unlink } = require('fs')
const path = require('path')

// Internal Modules:
const Product = require('../models/productModel')

/**
 * @desc   Fetch All Product
 * @Route  GET api/products?keyword=abc&itemShow=2&currentPage=1
 * @access public
 */
const allProducts = asyncHandler(async (req, res) => {
  const itemShow = Number(req.query.itemShow) || 10
  const currentPage = Number(req.query.currentPage) || 1
  const searchQuery = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { brand: { $regex: req.query.keyword, $options: 'i' } },
          { category: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {}

  const count = await Product.countDocuments({ ...searchQuery })
  // const result = await Product.find({ ...searchQuery }, 'name')
  const products = await Product.find({ ...searchQuery })
    .limit(itemShow)
    .skip(itemShow * (currentPage - 1))

  res
    .status(200)
    .json({ products, currentPage, pages: Math.ceil(count / itemShow) })
})

/**
 * @desc   Get Products Filtering By Regex
 * @Route  GET api/products/search?keyword=abc
 * @access public
 */
const getAllSearchedProducts = asyncHandler(async (req, res) => {
  const searchQuery = {
    $regex: req.query.keyword,
    $options: 'i',
  }
  const products = await Product.find({
    $or: [
      { name: searchQuery },
      { brand: searchQuery },
      { category: searchQuery },
    ],
  })

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(404).json({ message: 'No Products Found' })
  }
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
    image: 'demoproduct.jpg',
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
    product.brand = req.body.brand || product.brand
    product.category = req.body.category || product.category
    product.countInStock = req.body.countInStock || product.countInStock
    product.description = req.body.description || product.description
    if (req.files && req.files.length > 0) {
      if (product.image !== 'demoproduct.png') {
        unlink(
          path.join(__dirname, `/../public/uploads/products/${product.image}`),
          (err) => {
            if (err) console.log(err)
          }
        )
        product.image = req.files[0].filename
      } else {
        product.image = req.files[0].filename
      }
    }
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

const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    )
    if (!alreadyReviewed) {
      const review = {
        rating: Number(rating),
        comment,
        user: req.user.id,
        name: req.user.name,
      }
      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      await product.save()
      res.status(201).json({ message: 'Review Created' })
    } else {
      res.status(400).json({ message: 'You already Added a review!' })
    }
  } else {
    res.status(404).json({ errors: 'Product Not Exists' })
  }
})

// Module Export:
module.exports = {
  allProducts,
  singleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getAllSearchedProducts,
}
