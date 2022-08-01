const db = require('../db/index')
const dbInfo = require('../db/dbInfo')
const path = require('path')

module.exports = importStation = () => {
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
    'station',
    {
      fid: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      id: { type: DataTypes.INTEGER, allowNull: false },
      nimi: { type: DataTypes.STRING, allowNull: false },
      namn: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      osoite: { type: DataTypes.STRING, allowNull: false },
      adress: { type: DataTypes.STRING, allowNull: false },
      kaupunki: { type: DataTypes.STRING, allowNull: false },
      stad: { type: DataTypes.STRING, allowNull: false },
      operaattor: { type: DataTypes.STRING, allowNull: false },
      kapasiteet: { type: DataTypes.INTEGER, allowNull: false },
      x: { type: DataTypes.DOUBLE, allowNull: false },
      y: { type: DataTypes.DOUBLE, allowNull: false },
    },
    { timestamps: false }
  )

  let dataArray = []

  sequelize.sync({ alter: true }).then(async () => {
    try {
      dataArray = await readStations()
      console.log(`Reading Station file completed, start to insert...`)
      let totalRows = await importStations()
      console.log(`All stations import completed, imported ${totalRows} rows.`)
      dataArray = []
    } catch (e) {
      console.log(e)
    }
  })

  function importStations() {
    console.log('Inserting...')
    const insertStation = `insert into ${dbInfo.tableStation} set ?`
    let counter = 0
    return new Promise((resolve) => {
      dataArray.forEach((item) => {
        db.query(insertStation, item, (err, results) => {
          if (err) return console.log('Insert error:', err)
          if (results.affectedRows === 1) counter++
          if (counter === dataArray.length) {
            resolve(counter)
          }
        })
      })
    })
  }

  function readStations() {
    return new Promise((resolve) => {
      const csv = require('csv-parser')
      const fs = require('fs')
      fs.createReadStream(path.join(__dirname, './asset/station.csv'))
        .pipe(
          csv({
            skipLines: 1,
            headers: [
              'fid',
              'id',
              'nimi',
              'namn',
              'name',
              'osoite',
              'adress',
              'kaupunki',
              'stad',
              'operaattor',
              'kapasiteet',
              'x',
              'y',
            ],
          })
        )
        .on('data', (data) => {
          dataArray.push(data)
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
