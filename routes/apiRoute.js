const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')

router.get('/cars', apiController.getCars)
// router.get('/cars/sortby/:sortby', apiController.getCarsSortBy)

module.exports = router
