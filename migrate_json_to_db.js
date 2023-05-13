const fs = require('fs')
const db = require('./db/connection')

const rawJsonData = JSON.parse(fs.readFileSync('sample_data.json'))
const carJsonData = () => {
  var r = []
  rawJsonData.forEach((el) => {
    r.push({
      id_mobil: el.id_mobil,
      popularity_idx: popularity_idx,
      model: el.model,
      brand: el.brand,
      release_year: el.release_year,
      price: el.price,
      engine: el.engine,
      HP: el.HP,
      TRQ: el.TRQ,
    })
  })
  return r
}

// console.log(carJsonData())

db.cars
  .bulkCreate(carJsonData)
  .then(() => {
    console.log('Data migrated successfully!')
  })
  .catch((err) => {
    console.error('Error while migrating data:', err)
  })

function main() {
  return
}

module.exports = main
