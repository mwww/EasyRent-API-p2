const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const apiRoute = require('./routes/apiRoute')

const db = require('./db/connection')
const app = express()

const migrate_json_to_db = require('./migrate_json_to_db')
// migrate_json_to_db()

// console.log(carJsonData())

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('db syncronized!')
    migrate_json_to_db()
  })
  .catch((err) => console.log('cannot syncronize db', err))

// create data

app.use(cors())
app.use(morgan('tiny'))

// app.get("/user", (req, res) => {});
app.use('/api', apiRoute)

app.listen(3000, () => {
  console.log('Running in 3000')
})
