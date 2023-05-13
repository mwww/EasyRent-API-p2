const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const apiRoute = require('./routes/apiRoute')

const db = require('./db/connection')
const app = express()

// const migrate_json_to_db = require('./migrate_json_to_db')
// migrate_json_to_db()

// console.log(carJsonData())

const fs = require('fs')

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

const carsModel = require('./models/cars')
carsModel.cars
  .bulkCreate(carJsonData)
  .then(() => {
    console.log('Data migrated successfully!')
  })
  .catch((err) => {
    console.error('Error while migrating data:', err)
  })

db.sequelize
  .sync({ force: true })
  .then(() => console.log('db syncronized!'))
  .catch((err) => console.log('cannot syncronize db', err))

app.use(cors())
app.use(morgan('tiny'))

// app.get("/user", (req, res) => {});
app.use('/api', apiRoute)

app.listen(3000, () => {
  console.log('Running in 3000')
})
