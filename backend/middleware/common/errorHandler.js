// External module:
const createError = require('http-errors')

// Not Found Handler:
const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Requested Adress Not Found!'))
}
// Error Handler:
const errorHandler = (error, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === 'development' ? error : { message: error.message }

  res.status(error.status || 500).json(res.locals.error)
}

// Module Exports:
module.exports = { notFoundHandler, errorHandler }
