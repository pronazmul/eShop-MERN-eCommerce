// External Modules:
const express = require('express')
const router = express.Router()

// Internal Modules:

// Get Products info
router.get('/', (req, res) => res.send('Product Collected Successfully !'))

// Export Module:
module.exports = router
