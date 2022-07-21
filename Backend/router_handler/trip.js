const db = require('../db/index')

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
    const sqlStr1 = 'select count(*) as totalCount from journeys'
    db.query(sqlStr1, (err, results) => {
      if (err) return res.cc(err, 500)
      data.totalCount = results[0].totalCount
      const sqlStr2 = `select * from journeys limit ${startRow}, ${pageSize}`
      db.query(sqlStr2, (err, results) => {
        if (err) return res.cc(err, 500)
        data.pageNumber = pageNumber
        data.pageSize = pageSize
        data.list = results
        res.status(200).send(data)
      })
    })
  } else {
    const sqlStr1 = `select count(*) as totalCount from journeys where departure_station_id = ${departureStationId} and departure >= '${departureDate}' and \`return\` <= '${returnDate}'`
    db.query(sqlStr1, (err, results) => {
      if (err) return res.cc(err, 500)
      data.totalCount = results[0].totalCount
      const sqlStr2 = `select * from journeys where departure_station_id = ${departureStationId} and departure >= '${departureDate}' and \`return\` <= '${returnDate}' order by departure asc limit ${startRow}, ${pageSize}`
      db.query(sqlStr2, (err, results) => {
        if (err) return res.cc(err, 500)
        data.pageNumber = pageNumber
        data.pageSize = pageSize
        data.list = results
        res.status(200).send(data)
      })
    })
  }
}
