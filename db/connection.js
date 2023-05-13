const Sequelize = require('sequelize')
require('dotenv').config()

const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

const connection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
  logging: false,
})

const db = {}

db.sequelize = connection
db.Sequelize = Sequelize

// db.user = require('../models/user')(connection, Sequelize)
db.cars = require('../models/cars')(connection, Sequelize)
db.transmissions = require('../models/transmissions')(connection, Sequelize)
db.images = require('../models/images')(connection, Sequelize)
db.users = require('../models/users')(connection, Sequelize)
db.orders = require('../models/orders')(connection, Sequelize)

module.exports = db
