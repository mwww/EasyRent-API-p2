const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminCarController')
const carController = require('../controllers/admin/car')
const transmissionController = require('../controllers/admin/transmission')

router.get('/cars', carController.getCars)
router.get('/car/:id', carController.getCar)
router.put('/car/:id', carController.editCar)
router.post('/car/', carController.addCar)
router.delete('/car/:id', carController.deleteCar)

router.get('/transmissions', transmissionController.getTransmissions)
router.get('/transmission/:id', transmissionController.getTransmission)

module.exports = router
