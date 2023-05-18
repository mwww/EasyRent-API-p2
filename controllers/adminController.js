const db = require('../db/connection')

const getCars = async (req, res) => {
  const carsData = await db.cars.findAll()
  const msg = 'success get and return all data.'
  return res.json({
    status: 200,
    message: msg,
    data: carsData,
  })
}

const getCar = async (req, res) => {}

module.exports = {
  getCars,
  getCar,
}
