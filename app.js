const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const apiRoute = require('./routes/apiRoute')

const db = require('./db/connection')
const app = express()

db.sequelize
  .sync({ force: true })
  .then(() => console.log('db syncronized!'))
  .catch((err) => console.log('cannot syncronize db', err))

app.use(cors())
app.use(morgan('tiny'))

// app.get("/user", (req, res) => {});
app.use('/api', apiRoute)

app.listen(3001, () => {
  console.log('Running in 3001')
})
