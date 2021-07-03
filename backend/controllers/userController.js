// External Modules:
// const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// Internal Modules:
const User = require('../models/peopleModel')
/**
 * @desc   Store Resistered Users
 * @Route  POST /api/user/registration
 * @access public
 */
const addUser = async (req, res, next) => {
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
  try {
    await newUser.save()
    res.status(200).json({ message: 'User Registration Successfull' })
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Unknown Error Occored',
        },
      },
    })
  }
}

// Module Export:
module.exports = { addUser }
