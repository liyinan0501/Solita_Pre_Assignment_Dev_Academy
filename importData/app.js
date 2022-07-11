const db = require('./db/index')

// Testing the data connection
db.query('select 1', (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
  // [ RowDataPacket { '1': 1 } ]
})

// Importing the trip and station
const importHandler = require('./import_handler/index')
importHandler.importTrip()
importHandler.importStation()
