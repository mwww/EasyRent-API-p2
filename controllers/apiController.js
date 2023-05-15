const GetCarsData = require('../features/getCarsData')
const Sortby = require('../features/sortby')
const db = require('../db/connection')

const getCars = async (req, res) => {
  let msg
  const sortby = ['id', 'popularity', 'release', 'price', 'hp', 'trq'].includes(
    req.query.sortby
  )
    ? req.query.sortby
    : ''
  const order = req.query.order

  let carsData = await GetCarsData()

  if (sortby) {
    carsData = Sortby(sortby, order, carsData)
    msg =
      ['id', 'popularity', 'release', 'price', 'hp', 'trq'].includes(sortby) &&
      ['asc', 'desc'].includes(order)
        ? 'Success get and sort all data'
        : `Success get all data but get invalid sorting param(s). sortby=${sortby} order=${order}`
  }
  sorbyProps = ['id', 'popularity', 'release', 'price', 'hp', 'trq']

  return res.json({
    status: 200,
    message: msg,
    data: carsData,
  })
}

const getCarsSortBy = async (req, res) => {
  const sortby = req.query.sortby
  const direction = req.query.direction

  let carsData = await db.cars.findAll({
    order: [[sortby, direction]],
  })

  return res.json({
    status: 200,
    message: 'Success get all data',
    data: carsData,
  })

  // res.send({
  //   'sortby': sortby,
  //   'direction': direction
  // });

  // carsData = Sortby(sortby, carsData)
  // res.json(carsData)
}

module.exports = {
  getCars,
  getCarsSortBy,
}
