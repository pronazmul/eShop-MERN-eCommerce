// External Modules:
const asyncHandler = require('express-async-handler')
const createHttpError = require('http-errors')
const Order = require('../models/orderModel')

// Internal Modules:

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

// Module Export:
module.exports = { addNewOrder }
