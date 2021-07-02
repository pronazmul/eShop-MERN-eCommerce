// External Modules:
const asyncHandler = require('express-async-handler')
const { Error } = require('mongoose')

// Internal Modules:

/**
 * @desc   Store Resistered Users
 * @Route  POST /api/user/registration
 * @access public
 */
const addUser = asyncHandler(async (req, res) => {
  res.json({ ...req.body })
})

// Module Export:
module.exports = { addUser }
