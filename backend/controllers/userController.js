// External Modules:
const bcrypt = require('bcrypt')
const createHttpError = require('http-errors')
const { unlink } = require('fs')
const path = require('path')

// Internal Modules:
const User = require('../models/peopleModel')
const tokenGenerator = require('../utilities/tokenGenerator')
const expressAsyncHandler = require('express-async-handler')

/**
 * @desc   Resister New User & Logged in auth token
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
 * @desc   Login a user with auth token
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
const getUser = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json({ ...req.user })
})

/**
 * @desc   Update User with auth token
 * @Route  PUT /api/user/profile
 * @access protected
 */
const updateUserProfile = async (req, res, next) => {
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

/**
 * @desc   Get All users Admin Only
 * @Route  GET /api/user
 * @access protected/Admin
 */
const getAllUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.find({})
  res.status(200).json(user)
})

/**
 * @desc   Delete A user Admin Only
 * @Route  DELETE /api/user/:id
 * @access protected/Admin
 */
const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.remove()
    res.status(200).json({ msg: 'User Removed Successfully!' })
  } else {
    res.status(404).json({
      errors: {
        common: {
          msg: 'User Not Exists',
        },
      },
    })
  }
})

/**
 * @desc   Get User By ID
 * @Route  GET /api/user/:id
 * @access protected/Admin
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: 'User Not Found!',
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

/**
 * @desc   Get User By ID
 * @Route  PUT /api/user/:id/
 * @access protected/Admin
 */
const updateUserByAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.role = req.body.role || user.role
      const updatedUser = await user.save()
      const userData = {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      }
      res.status(200).json(userData)
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
module.exports = {
  userResisgration,
  userLogin,
  getUser,
  updateUserProfile,
  getAllUser,
  deleteUser,
  getUserById,
  updateUserByAdmin,
}
