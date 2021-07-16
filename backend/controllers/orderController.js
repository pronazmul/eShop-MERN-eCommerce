// External Modules:
const asyncHandler = require('express-async-handler')
const createHttpError = require('http-errors')

// Internal Modules:
const Order = require('../models/orderModel')

/**
 * @desc   Place an order
 * @Route  POST api/orders
 * @access private
 */
const addNewOrder = asyncHandler(async (req, res, next) => {
  if (req.body.orderItems.length > 0) {
    const order = new Order({ ...req.body, user: req.user.id })
    const createOrder = await order.save()
    res.status(201).json(createOrder)
  } else {
    next(createHttpError(400, 'No Order Items Found'))
  }
})

/**
 * @desc   GET Order By ID
 * @Route  GET api/orders
 * @access private
 */
const getOrderByID = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email avatar'
  )
  if (order) {
    res.status(200).json(order)
  } else {
    next(createHttpError(404, 'No Order Found'))
  }
})

// Module Export:
module.exports = { addNewOrder, getOrderByID }
