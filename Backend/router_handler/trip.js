const db = require('../db/index')

// get journey router handlers
exports.getTrips = (req, res) => {
  let { pageNumber, pageSize, departureStationId, departureDate, returnDate } =
    req.query

  pageNumber = !pageNumber ? 1 : Number(pageNumber)
  pageSize = !pageSize ? 100 : Number(pageSize)
  let data = {}
  let startRow = (pageNumber - 1) * pageSize

  console.log(
    pageNumber,
    pageSize,
    departureStationId,
    departureDate,
    returnDate
  )

  if (!departureStationId) {
    const getTotal = 'select count(*) as totalCount from journeys'
    db.query(getTotal, (err, results) => {
      if (err) return res.cc(err, 500)
      data.totalCount = results[0].totalCount
      const getJourneys = `select * from journeys limit ${startRow}, ${pageSize}`
      db.query(getJourneys, (err, results) => {
        if (err) return res.cc(err, 500)
        data.pageNumber = pageNumber
        data.pageSize = pageSize
        data.list = results
        res.status(200).send(data)
      })
    })
  } else {
    const getTotal = `select count(*) as totalCount from journeys where departure_station_id = ${departureStationId} and departure >= '${departureDate}' and \`return\` <= '${returnDate}'`
    db.query(getTotal, (err, results) => {
      if (err) return res.cc(err, 500)
      data.totalCount = results[0].totalCount
      const getJourneysByIdDate = `select * from journeys where departure_station_id = ${departureStationId} and departure >= '${departureDate}' and \`return\` <= '${returnDate}' order by departure asc limit ${startRow}, ${pageSize}`
      db.query(getJourneysByIdDate, (err, results) => {
        if (err) return res.cc(err, 500)
        data.pageNumber = pageNumber
        data.pageSize = pageSize
        data.list = results
        res.status(200).send(data)
      })
    })
  }
}

// add a trip router handler
exports.addTrip = (req, res) => {
  console.log(req.body)
  // const insertTrip = `insert journeys set ?, departure_station_name = (select nimi from stations where id = ${req.body.departure_station_id}), return_station_name = (select nimi from stations where id = ${req.body.return_station_id})`
  // const data = { ...req.body }
  // console.log(data)
  // db.query(insertTrip, { ...req.body }, (err, results) => {
  //   if (err) return res.cc(err)
  //   if (results.affectedRows !== 1) return res.cc('Adding fails', 507)
  //   return res.cc('adding journey succeeds!', 201)
  // })
}
