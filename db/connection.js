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
})

const db = {}

db.sequelize = connection
db.Sequelize = Sequelize

// db.user = require('../models/user')(connection, Sequelize)

module.exports = db
