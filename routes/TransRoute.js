const express = require('express')
const router = express.Router()
const transController = require('../controllers/transController')


router.post('/', transController.createTransmision)


module.exports = router