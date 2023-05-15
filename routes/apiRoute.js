const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')

router.get('/cars', carController.getCars)
router.get('/cars/:id', carController.getCar)

module.exports = router
