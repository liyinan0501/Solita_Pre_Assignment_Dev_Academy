const db = require('../db/index')

// get journey router handlers
exports.getTrips = (req, res) => {
  let { pageNumber, pageSize, departureStationId, departureDate, returnDate } =
    req.query

  pageNumber = !pageNumber ? 1 : Number(pageNumber)
  pageSize = !pageSize ? 50 : Number(pageSize)
  let data = { pageNumber, pageSize }
  let startRow = (pageNumber - 1) * pageSize

  if (!departureStationId) {
    const getAllTrips = `select id, departure_station_name, return_station_name, covered_distance, duration, count(id) over() as totalCount from journeys order by id limit ${startRow}, ${pageSize}`
    db.query(getAllTrips, (err, results) => {
      if (err) return res.cc(err, 500)
      if (results.length < 1) return res.cc('Not found searched records', 204)
      data = { ...data, totalCount: results[0].totalCount, list: results }
      res.status(200).send(data)
    })
  } else {
    const searchTrips = `select id, departure_station_name, return_station_name, covered_distance, duration, count(id) over() as totalCount from journeys where departure_station_id = ${departureStationId} and departure >= '${departureDate}' and \`return\` <= '${returnDate}' order by id asc limit ${startRow}, ${pageSize}`
    db.query(searchTrips, (err, results) => {
      if (err) return res.cc(err, 500)
      if (results.length < 1) return res.cc('Not found searched records', 204)
      data = { ...data, totalCount: results[0].totalCount, list: results }
      res.status(200).send(data)
    })
  }
}

// add a trip router handler
exports.addTrip = (req, res) => {
  const insertTrip = `insert journeys set ?, departure_station_name = (select nimi from stations where id = ${req.body.departure_station_id}), return_station_name = (select nimi from stations where id = ${req.body.return_station_id})`
  const data = { ...req.body }

  db.query(insertTrip, { ...req.body }, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('Adding fails', 507)
    return res.cc('adding journey succeeds!', 201)
  })
}
