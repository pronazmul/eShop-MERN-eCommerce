// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:
const authGuard = require('../middlewares/common/authMiddleware')

router.get('/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Export Module:
module.exports = router
