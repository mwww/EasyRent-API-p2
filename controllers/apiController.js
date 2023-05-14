// const GetCarsData = require('../features/getCarsData')
// const Sortby = require('../features/sortby')
const db = require('../db/connection')

const getCars = async (req, res) => {
  const carsData = await db.cars.findAll()
  let transmissionsData = await db.transmissions.findAll()
  const imagesData = await db.images.findAll()

  const finalData = carsData.map((car) => {
    let transmissions = transmissionsData
      .filter((t) => t.id_mobil === car.id_mobil)
      .flatMap((transmission) => ({
        // [transmission.transmission_type]: transmission.speed,
        transmission_type: transmission.transmission_type,
        speed: transmission.speed,
      }))
    let images = imagesData
      .filter((t) => t.id_mobil === car.id_mobil)
      .flatMap((img) => `${img.img_name}.${img.img_ext}`)
    return {
      ...car.toJSON(),
      transmissions,
      images,
    }
  })
  return res.json({
    status: 200,
    message: 'Success get all data',
    data: finalData,
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
