const GetCarsData = require('../features/getCarsData')
const Sortby = require('../features/sortby')

const getCars = (req, res) => {
  // TODO: integrate DB and request data from DB.
  const carsData = GetCarsData()
  // const queryParams = req.query

  // console.log(queryParams)

  res.json(carsData)
}

const getCarsSortBy = (req, res) => {
  const sortby = req.params.sortby
  let carsData = GetCarsData()

  carsData = Sortby(sortby, carsData)

  res.json(carsData)
}

module.exports = {
  getCars,
  getCarsSortBy,
}
