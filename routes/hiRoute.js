const express = require('express')
const router = express.Router()
const hiController = require('../controllers/hiController')

router.get('/', hiController.getHi)

module.exports = router
