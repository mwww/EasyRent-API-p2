const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

const apiRoute = require('./routes/apiRoute')

const db = require('./db/connection')
const app = express()
dotenv.config()

// const migrate_json_to_db = require('./features/bulkCreate/migrate_json_to_db')
// migrate_json_to_db()

// console.log(carJsonData())

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('db syncronized!')
    require('./features/bulkCreate/migrate_json_to_db')(db)
  })
  .catch((err) => console.log('cannot syncronize db', err))

// app.use(cors())
// app.use(cors({ credentials: true }));
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(express.json())

// app.get("/user", (req, res) => {});
app.use('/api', apiRoute)

app.listen(process.env.PORT, () => {
  console.log(`Running in ${process.env.PORT}`)
})
