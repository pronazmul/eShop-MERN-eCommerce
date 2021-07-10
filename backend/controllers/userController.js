// External Modules:
const bcrypt = require('bcrypt')
const createHttpError = require('http-errors')
const { unlink } = require('fs')
const path = require('path')

// Internal Modules:
const User = require('../models/peopleModel')
const tokenGenerator = require('../utilities/tokenGenerator')

/**
 * @desc   Store Resistered Users
 * @Route  POST /api/user/
 * @access public
 */
const userResisgration = async (req, res, next) => {
  try {
    let newUser
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
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
    const result = await newUser.save()
    const userData = {
      id: result._id,
      name: result.name,
      email: result.email,
      avatar: result.avatar,
      role: result.role,
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
const getUser = async (req, res, next) => {
  res.status(200).json({ ...req.user })
}

/**
 * @desc   Update User
 * @Route  PUT /api/user/profile
 * @access protected
 */
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (user) {
      user.name = req.body.name || req.user.name
      user.email = req.body.email || req.user.email
      if (req.files && req.files.length > 0) {
        unlink(
          path.join(__dirname, `/../public/uploads/avatars/${req.user.avatar}`),
          (err) => {
            if (err) console.log(err)
          }
        )
        user.avatar = req.files[0].filename
      }
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10)
      }
      const result = await user.save()
      res
        .status(200)
        .json({ message: 'User Updated Successfully', user: { ...result } })
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: 'Unknown User',
          },
        },
      })
    }
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

// Module Export
module.exports = { userResisgration, userLogin, getUser, updateUser }
