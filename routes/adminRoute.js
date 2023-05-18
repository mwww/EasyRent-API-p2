const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/cars', adminController.getCars)
// router.get('/car/:id', adminController.getCar)

module.exports = router
