const db = require('../db/connection')
const { Sequelize, DataTypes } = require('sequelize')

const getCars = async (req, res) => {
  const carsData = await db.cars.findAll()
  const msg = 'success get and return all data.'
  return res.json({
    status: 200,
    message: msg,
    data: carsData,
  })
}

const getCar = async (req, res) => {
  const carId = req.params.id
  const carsData = await db.cars.findAll({ where: { id_mobil: carId } })
  const partialMsg = ' get and return all data.'
  return res.json(
    carsData.length === 1
      ? {
          status: 200,
          message: 'success' + partialMsg,
          data: carsData[0],
        }
      : { status: 404, message: 'failed' + partialMsg, data: {} }
  )
}

// const editCar = async (req, res) => {}
const editCar = async (req, res) => {
  try {
    const carId = req.params.id
    const { car, transmissions, images } = req.body

    // Update the car entry
    await db.cars.update(car, {
      where: { id_mobil: carId },
    })

    // Update the transmissions associated with the car
    await db.transmissions.destroy({ where: { id_mobil: carId } }) // Remove existing transmissions
    await db.transmissions.bulkCreate(
      transmissions.map((transmission) => ({
        ...transmission,
        id_mobil: carId,
      }))
    ) // Create new transmissions

    // Update the images associated with the car
    await db.images.destroy({ where: { id_mobil: carId } }) // Remove existing images
    await db.images.bulkCreate(
      images.map((image) => ({
        ...image,
        id_mobil: carId,
      }))
    ) // Create new images

    res.json({ message: 'Car updated successfully' })
  } catch (error) {
    console.error('Error editing car:', error)
    res.status(500).json({ error: 'Failed to edit car' })
  }
}

// const addCar = async (req, res) => {
//   // console.log(req.body)
//   const { car, transmissions, images } = req.body
//   // console.log(car, transmissions, images)
//   const latestCarId = await db.cars
//     .max('id_mobil', {
//       plain: true,
//       raw: true,
//       where: {},
//       attributes: [
//         [db.Sequelize.fn('max', db.Sequelize.col('id_mobil')), 'max_id_mobil'],
//       ],
//     })
//     .catch((e) => console.error(e))
//     .then((r) => r.max_id_mobil)
//   const t = await db.connection.transaction() // Start a transaction
//   try {
//     // Create the main record
//     const dbCar = await db.cars.create({ ...car }, { transaction: t })
//     // Create associated records
//     const dbTransmissions = transmissions.map(async (transmission) => {
//       const createdTransmission = await db.transmissions.create(
//         { id_mobil: latestCarId + 1, ...transmission },
//         { transaction: t }
//       )
//       return createdTransmission
//     })
//     // Add multiple associated records
//     await Promise.all(
//       dbTransmissions.map((transmission) =>
//         dbCar.addTransmissions(transmission, { transaction: t })
//       )
//     )
//     // Add multiple associated records
//     await dbCar.addTransmissions(dbTransmissions, { transaction: t })
//     // Commit the transaction if everything succeeds
//     await t.commit()
//     console.log('New data added successfully!')
//   } catch (error) {
//     // Rollback the transaction if there's an error
//     // await t.rollback()
//     console.error('Error adding new data:', error)
//   }
//   res.sendStatus(201)
// }

const addCar = async (req, res) => {
  try {
    const { car, transmissions, images } = req.body

    const newCar = await db.cars.create(car)

    const newTransmissions = await Promise.all(
      transmissions.map((transmission) =>
        db.transmissions.create({
          ...transmission,
          id_mobil: newCar.id_mobil,
        })
      )
    )

    const newImages = await Promise.all(
      images.map((image) =>
        db.images.create({
          ...image,
          id_mobil: newCar.id_mobil,
        })
      )
    )

    // Return the created car, transmissions, and images
    res.json({
      car: newCar,
      transmissions: newTransmissions,
      images: newImages,
    })
  } catch (error) {
    console.error('Error adding car:', error)
    res.status(500).json({ error: 'Failed to add car' })
  }
}

const deleteCar = async (req, res) => {
  const carId = parseInt(req.params.id)
  db.cars
    .destroy({
      where: { id_mobil: carId },
    })
    .then(() => {
      console.log('Parent and associated Child records deleted successfully.')
    })
    .catch((error) => {
      console.error('Error deleting Parent:', error)
    })
  res.sendStatus(204)
}
const getCarsCompiled = async (req, res) => {}
const getCarCompiled = async (req, res) => {}

module.exports = {
  getCars,
  getCar,
  editCar,
  addCar,
  deleteCar,
  getCarsCompiled,
  getCarCompiled,
}
