// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const Products = require('../data/Products')

// Get All Products
router.get('/', (req, res) => res.status(200).json(Products))

// Get Single Product
router.get('/:id', (req, res) => {
  const product = Products.find((item) => item._id === req.params.id)
  res.status(200).json(product)
})

// Export Module:
module.exports = router
