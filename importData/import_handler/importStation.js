const db = require('../db/index')
const dbInfo = require('../db/dbInfo')

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

  sequelize.sync({ alter: true }).then(() => {
    console.log('Table is created')
    // Importing data from CSV file
    const csv = require('csv-parser')
    const fs = require('fs')
    const sqlStr = `insert into ${dbInfo.tableStation} set ?`
    fs.createReadStream('./asset/station.csv')
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
        // Inserting valid records to database
        db.query(sqlStr, data, (err, results) => {
          if (err) {
            return console.log(err)
          }
          if (results.affectedRows !== 1) {
            return console.log('import failed')
          }
        })
      })
  })
}
