// External Modules:
const bcrypt = require('bcrypt')
const createHttpError = require('http-errors')

// Internal Modules:
const User = require('../models/peopleModel')
const tokenGenerator = require('../utilities/tokenGenerator')

/**
 * @desc   Store Resistered Users
 * @Route  POST /api/user/registration
 * @access public
 */
const userResisgration = async (req, res, next) => {
  try {
    let newUser
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      })
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
      })
    }
    newUser.save()
    res.status(200).json({
      message: 'User Resistration Successfull!',
    })
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Unknown error occured!',
        },
      },
    })
  }
}

/**
 * @desc   User Logged id with jwt token
 * @Route  POST /api/user/login
 * @access public
 */
const userLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    const matchedPassword = await user.matchedPassword(password)
    if (user && matchedPassword) {
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      }
      // Generate Token
      const token = tokenGenerator(userData)

      // Set Cookie:
      res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
      })

      res.status(200).json({ ...userData, token })
    } else {
      throw createHttpError(401, 'Authentication Failed !')
    }
  } catch (error) {
    res.status(401).json({
      errors: {
        common: {
          msg: 'Authentication Failed!',
        },
      },
    })
  }
}

/**
 * @desc   Get User Profile
 * @Route  GET /api/user/profile
 * @access protected
 */
const getUser = (req, res, next) => {
  res.send(req.user)
}

// Module Export
module.exports = { userResisgration, userLogin, getUser }
