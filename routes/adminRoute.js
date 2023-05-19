const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminCarController')

router.get('/cars', adminController.getCars)
router.get('/car/:id', adminController.getCar)
router.put('/car/:id', adminController.editCar)
router.post('/car/', adminController.addCar)
router.delete('/car/:id', adminController.deleteCar)
router.get('/cars/compiled', adminController.getCarsCompiled)
router.get('/car/compiled/:id', adminController.getCarCompiled)

module.exports = router
