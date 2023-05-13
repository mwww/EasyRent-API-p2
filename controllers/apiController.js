// const GetCarsData = require('../features/getCarsData')
// const Sortby = require('../features/sortby')
const db = require('../db/connection')

const getCars = async (req, res) => {
  const car = await db.cars.findAll();
  return res.json({
      status: 200,
      message: "Success get all data",
      data: car
  });
}

const getCarsSortBy = async (req, res) => {
  const sortby = req.query.sortby
  const direction = req.query.direction
  
  let carsData = await db.cars.findAll({
    order: [
      [sortby, direction]
    ]
  });

  return res.json({
    status: 200,
    message: "Success get all data",
    data: carsData
  });

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
