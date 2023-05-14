const rawJsonData = require('./sample_data.json')

const carsData = rawJsonData.map(({ transmissions, ...car }) => car)

let counter
counter = 1
const transmissionsData = rawJsonData.flatMap(({ id_mobil, transmissions }) =>
  transmissions.map((transmission) => ({
    id_transmission: counter++,
    id_mobil,
    ...transmission,
  }))
)

counter = 1
const gambarData = rawJsonData.flatMap(({ id_mobil, images }) =>
  images.map((gambar) => ({
    id_gambar: counter++,
    id_mobil,
    ...gambar,
  }))
)

// console.log(carsData)
// console.log(transmissionsData)
// console.log(gambarData)

async function main(db) {
  try {
    await db.cars.bulkCreate(carsData)
    await db.transmissions.bulkCreate(transmissionsData)
    await db.images.bulkCreate(gambarData)
    console.log('Data migrated successfully!')
  } catch (err) {
    console.error('Error while migrating data:', err)
  }
}

module.exports = main
