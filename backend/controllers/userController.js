// External Modules:
const bcrypt = require('bcrypt')

// Internal Modules:
const User = require('../models/peopleModel')
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

const userLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
  } catch (error) {
    next(error)
  }
}

// Module Export:
module.exports = { userResisgration, userLogin }
