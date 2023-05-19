const GetCarsData = require('../features/getCarsData')
const Sortby = require('../features/sortby')
const carsModel = require('../models/cars')

const createCars = async (req, res) => {
 try{
   // TODO: integrate DB and request data from DB.
      const {id_mobil, model ,brand, releaseYear, price, engine, HP, TRQ} = req.query 
      const dataCars = await carsModel.create({
        id_mobil,
        model,
        brand,
        releaseYear,
        price,
        engine,
        HP,
        TRQ
      })
      // const queryParams = req.query
      res.status(200).json({
        data:dataCars,
        metadata:"data create"
      })
      // console.log(queryParams)
    }catch(error){
        console.log("error")
      }
}
const getCarsSortBy = (req, res) => {
  const sortby = req.params.sortby
  let carsData = GetCarsData()

  carsData = Sortby(sortby, carsData)

  res.json(carsData)
}

module.exports = {
  createCars,
  getCarsSortBy,
}
