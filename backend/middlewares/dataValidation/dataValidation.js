// External Modules:
const { check, validationResult } = require('express-validator')
const createError = require('http-errors')
const path = require('path')
const { unlink } = require('fs')

// Internal Module
const User = require('../../models/peopleModel')

// Validate User Data while Creating
const registrationValidator = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is Required !')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other than alphabet !')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email Address !')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          throw createError('Email already used!')
        }
      } catch (error) {
        throw createError(error.message)
      }
    }),
  check('mobile')
    .optional()
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Mobile number must be a bangladeshi mobile number')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value })
        if (user) {
          throw createError('Mobile number already exist')
        }
      } catch (error) {
        throw createError(error.message)
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'password must be 8 character long and should contain 1 uppercase, 1 lowercase, 1 number and 1 symble '
    ),
]

// Validate user data while updating:
const updateValidator = [
  check('name')
    .optional()
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other than alphabet !')
    .trim(),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email Address !')
    .trim(),
  check('mobile')
    .optional()
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Mobile number must be a bangladeshi mobile number'),
  check('password')
    .optional()
    .isStrongPassword()
    .withMessage(
      'password must be 8 character long and should contain 1 uppercase, 1 lowercase, 1 number and 1 symble '
    ),
]

// Handle User input Validation Errors
const validationHandler = (req, res, next) => {
  const errors = validationResult(req)
  const formattedError = errors.mapped()

  if (Object.keys(formattedError).length === 0) {
    next()
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0]
      unlink(
        path.join(__dirname, `/../../public/uploads/avatars/${filename}`),
        (error) => console.log(error)
      )
    }
    res.status(500).json({
      errors: formattedError,
    })
  }
}

module.exports = { registrationValidator, validationHandler, updateValidator }
