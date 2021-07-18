const createHttpError = require('http-errors')

const checkRole = (role) => (req, res, next) => {
  if (req.user.role && role.includes(req.user.role)) {
    next()
  } else {
    next(createHttpError(401, 'Only Admin can access this route!'))
  }
}

module.exports = checkRole
