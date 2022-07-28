const db = require('../db/index')

// get station related router handlers
exports.getStations = (req, res) => {
  let { pageNumber, pageSize, stationId } = req.query

  pageNumber = !pageNumber ? 1 : Number(pageNumber)
  pageSize = !pageSize ? 100 : Number(pageSize)
  let data = {}
  let startRow = (pageNumber - 1) * pageSize

  console.log(pageNumber, pageSize, stationId)
  if (!stationId) {
    const getTotal = `select count(*) as totalCount from stations`
    db.query(getTotal, (err, results) => {
      if (err) return res.cc(err, 500)
      data.totalCount = results[0].totalCount
      const allStations = `select * from stations order by id asc limit ${startRow}, ${pageSize}`
      db.query(allStations, (err, results) => {
        if (err) return res.cc(err, 500)
        data.pageNumber = pageNumber
        data.pageSize = pageSize
        data.list = results
        res.status(200).send(data)
      })
    })
  } else {
    const getTotalById = `select count(*) as totalCount from stations where id = ${stationId}`
    db.query(getTotalById, (err, results) => {
      if (err) return res.cc(err, 500)
      data.totalCount = results[0].totalCount
      const getStationsById = `select * from stations where id = ${stationId} limit ${startRow}, ${pageSize}`
      db.query(getStationsById, (err, results) => {
        if (err) return res.cc(err, 500)
        data.pageNumber = pageNumber
        data.pageSize = pageSize
        data.list = results
        res.status(200).send(data)
      })
    })
  }
}

exports.getStationList = (req, res) => {
  const stationList =
    'select id, nimi from solita_db.stations order by nimi asc'
  db.query(stationList, (err, results) => {
    if (err) return res.cc(err, 500)
    res.status(200).send(results)
  })
}

exports.getSingleStation = (req, res) => {
  let data = {}

  const { stationId } = req.params
  const sqlStr = `select * from stations where id = ${stationId}`
  const sqlStr1 = `select count(*) as startCount from journeys where departure_station_id = ${stationId}`
  const sqlStr2 = `select count(*) as endCount from journeys where return_station_id = ${stationId}`
  const sqlStr3 = `select AVG(covered_distance) as startAvg from journeys where departure_station_id = ${stationId}`
  const sqlStr4 = `select AVG(covered_distance) as endAvg from journeys where return_station_id = ${stationId}`
  const sqlStr5 = `select return_station_name, count(1) as times from journeys where departure_station_id = ${stationId} group by return_station_name order by times desc limit 5`
  const sqlStr6 = `select departure_station_name, count(1) as times from journeys where return_station_id = ${stationId}  group by departure_station_name order by times desc limit 5`

  // const sqlStr = `select * from stations where id = ${stationId}`
  // const sqlStr1 = `select count(*) as startCount, AVG(covered_distance) as startAvg from journeys where departure_station_id = ${stationId}`
  // const sqlStr2 = `select count(*) as endCount, select AVG(covered_distance) as endAvg from journeys where return_station_id = ${stationId}`
  // const sqlStr5 = `select return_station_name, count(1) as times from journeys where departure_station_id = ${stationId} group by return_station_name order by times desc limit 5`
  // const sqlStr6 = `select departure_station_name, count(1) as times from journeys where return_station_id = ${stationId}  group by departure_station_name order by times desc limit 5`

  db.query(
    `${sqlStr};${sqlStr1};${sqlStr2};${sqlStr3};${sqlStr4};${sqlStr5};${sqlStr6}`,
    function (err, results, fields) {
      if (err) return res.cc(err, 500)
      data = results[0][0]
      data.startCount = results[1][0].startCount
      data.endCount = results[2][0].endCount
      data.startAvg = results[3][0].startAvg
      data.endAvg = results[4][0].endAvg
      data.topReturn = results[5]
      data.topDeparture = results[6]
      res.status(200).send(data)
    }
  )
}
