const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

const authGuard = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } else {
    throw createHttpError(401, 'Authentication Failed !')
  }
}

module.exports = authGuard
