// External module:
const createError = require('http-errors')

// Not Found Handler:
const notFoundHandler = (req, res, next) => {
  next(createError(404, `Not Found - ${req.originalUrl}`))
}
// Error Handler:
const errorHandler = (error, req, res, next) => {
  const errorMessage =
    process.env.NODE_ENV === 'production'
      ? { message: error.message }
      : { message: error.message, stack: error.stack }

  res.status(error.status || 500).json(errorMessage)
}

// Module Exports:
module.exports = { notFoundHandler, errorHandler }
