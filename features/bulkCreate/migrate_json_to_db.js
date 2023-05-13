// async function main(db) {
//   const rawJsonData = require('./sample_data.json')
//   const carJsonData = () => {
//     var r = []
//     rawJsonData.forEach((el) => {
//       r.push({
//         id_mobil: el.id_mobil,
//         popularity_idx: el.popularity_idx,
//         model: el.model,
//         brand: el.brand,
//         release_year: el.release_year,
//         price: el.price,
//         engine: el.engine,
//         HP: el.HP,
//         TRQ: el.TRQ,
//       })
//     })
//     return r
//   }

//   // console.log(carJsonData())

//   db.cars
//     .bulkCreate(carJsonData())
//     .then(() => {
//       console.log('Data migrated successfully!')
//     })
//     .catch((err) => {
//       console.error('Error while migrating data:', err)
//     })
//   return
// }

// module.exports = main

const rawJsonData = require('./sample_data.json')

// function getCarsData() {
//   // return rawJsonData.map((data) => ({
//   //   ...data,
//   // }))
//   return rawJsonData.map(({ transmission, ...data }) => data)
// }

// console.log(getCarsData())

const carsData = rawJsonData.map(({ transmissions, ...car }) => car)

// console.log(carsData)

let counter = 1
const transmissionsData = rawJsonData.flatMap(({ id_mobil, transmissions }) =>
  transmissions.map((transmission, index) => ({
    transmission_id: counter++,
    id_mobil,
    ...transmission,
  }))
)

// console.log(carsData)
console.log(transmissionsData)

async function main(db) {
  try {
    await db.cars.bulkCreate(carsData)
    await db.transmissions.bulkCreate(transmissionsData)
    console.log('Data migrated successfully!')
  } catch (err) {
    console.error('Error while migrating data:', err)
  }
}

module.exports = main
