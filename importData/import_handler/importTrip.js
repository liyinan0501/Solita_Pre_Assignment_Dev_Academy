const db = require('../db/index')
const dbInfo = require('../db/dbInfo')

module.exports = importTrip = () => {
  // Creating the table attributes
  const { Sequelize, DataTypes } = require('sequelize')
  const sequelize = new Sequelize(
    dbInfo.database,
    dbInfo.user,
    dbInfo.password,
    {
      logging: false,
      pool: {
        max: 30,
        min: 0,
        acquire: 60000,
        idle: 60000,
      },
      dialect: dbInfo.dialect,
      host: dbInfo.host,
    }
  )

  sequelize.define(
    'journey',
    {
      departure: { type: DataTypes.DATE, allowNull: false },
      return: { type: DataTypes.DATE, allowNull: false },
      departure_station_id: { type: DataTypes.INTEGER, allowNull: false },
      departure_station_name: { type: DataTypes.STRING, allowNull: false },
      return_station_id: { type: DataTypes.INTEGER, allowNull: false },
      return_station_name: { type: DataTypes.STRING, allowNull: false },
      covered_distance: { type: DataTypes.INTEGER, allowNull: false },
      duration: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  )

  sequelize.sync({ alter: true }).then(() => {
    console.log('Table is created')
    // Importing data from CSV file
    const csv = require('csv-parser')
    const fs = require('fs')
    const sqlStr = `insert into ${dbInfo.tableJourney} set ?`
    fs.createReadStream('./asset/2021-05.csv')
      .pipe(
        csv({
          skipLines: 1,
          headers: [
            'departure',
            'return',
            'departure_station_id',
            'departure_station_name',
            'return_station_id',
            'return_station_name',
            'covered_distance',
            'duration',
          ],
        })
      )
      .on('data', (data) => {
        // Inserting valid records to database
        if (data.duration > 10 && data.covered_distance > 10) {
          db.query(sqlStr, data, (err, results) => {
            if (err) {
              return console.log(err)
            }
            if (results.affectedRows !== 1) {
              return console.log('import failed')
            }
          })
        }
      })
  })
}
