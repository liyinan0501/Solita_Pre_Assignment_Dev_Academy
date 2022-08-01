const db = require('./db/index')

// Testing the data connection
db.query('select 1', (err, results) => {
  if (err) return console.log(err.message)
  // console.log(results)
  // [ RowDataPacket { '1': 1 } ]
})

// Importing the trip and station
const dataFiles = ['2021-05.csv']
const importHandler = require('./import_handler/index')

const readline = require('readline')
let r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

r1.setPrompt(
  'Do you want to import all journeys and stations to database? (yes/no)> '
)
r1.prompt()
r1.on('line', (line) => {
  switch (line.trim()) {
    case 'yes':
      console.log('Starting...')
      importHandler.importStation()
      importHandler.importTrip(dataFiles)
      break
    case 'no':
      break
    default:
      console.log('Incorrect answer, closing.')
      r1.close
      break
  }
})

r1.on('close', function () {
  process.exit(0)
})
