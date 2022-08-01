const db = require('../db/index')
const dbInfo = require('../db/dbInfo')
const path = require('path')

module.exports = importTrip = (dataFiles) => {
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

  let dataArray = []
  let keyItems

  sequelize.sync({ alter: true }).then(async () => {
    for (let fileName of dataFiles) {
      try {
        dataArray = await readTrips(fileName)
        console.log(`Reading ${fileName} completed, start to insert...`)
        keyItems = Object.keys(dataArray)
        let totalRows = await importTrips()
        console.log(
          `All journeys in ${fileName} import completed, imported ${totalRows} rows.`
        )
        dataArray = []
      } catch (e) {
        console.log(e)
      }
    }
  })

  function importTrips() {
    console.log('Inserting...')
    const insertTrip = `insert into ${dbInfo.tableJourney} set ?`
    let counter = 0
    return new Promise((resolve) => {
      keyItems.forEach((item) => {
        item = JSON.parse(item)
        db.query(insertTrip, item, (err, results) => {
          if (err) return console.log('Insert error:', err)
          if (results.affectedRows === 1) counter++
          if (counter === keyItems.length) {
            resolve(counter)
          }
        })
      })
    })
  }

  function readTrips(fileName) {
    return new Promise((resolve) => {
      const csv = require('csv-parser')
      const fs = require('fs')
      fs.createReadStream(path.join(__dirname, `./asset/${fileName}`))
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
          // validating records and removing duplicate records
          if (data.duration > 10 && data.covered_distance > 10) {
            dataArray[JSON.stringify(data)] = true
          }
        })
        .on('error', (error) => {
          console.log('ReadStream error:', error.message)
        })
        .on('end', function () {
          resolve(dataArray)
        })
    })
  }
}
