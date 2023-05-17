const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')

router.get('/cars', carController.getCars)
router.get('/car/:id', carController.getCar)

module.exports = router
