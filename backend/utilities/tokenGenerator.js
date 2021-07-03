const jwt = require('jsonwebtoken')

const tokenGenerator = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}

module.exports = tokenGenerator
