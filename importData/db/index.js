const mysql = require('mysql2')
const dbInfo = require('./dbInfo')

const db = mysql.createPool({
  host: dbInfo.host,
  user: dbInfo.user,
  password: dbInfo.password,
  database: dbInfo.database,
})

module.exports = db
