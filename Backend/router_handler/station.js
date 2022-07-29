const db = require('../db/index')

// get station related router handlers
exports.getStations = (req, res) => {
  let { pageNumber, pageSize, stationId } = req.query

  pageNumber = !pageNumber ? 1 : Number(pageNumber)
  pageSize = !pageSize ? 100 : Number(pageSize)
  let data = { pageNumber, pageSize }
  let startRow = (pageNumber - 1) * pageSize

  if (!stationId) {
    const getAllStations = `select *, count(*) over() as totalCount from stations order by id asc limit ${startRow}, ${pageSize}`
    db.query(getAllStations, (err, results) => {
      if (err) return res.cc(err, 500)
      if (results.length < 1) return res.cc('Not found searched records', 204)
      data = { ...data, totalCount: results[0].totalCount, list: results }
      res.status(200).send(data)
    })
  } else {
    const getStationById = `select *, count(*) over() as totalCount from stations where id = ${stationId} limit ${startRow}, ${pageSize}`
    db.query(getStationById, (err, results) => {
      if (err) return res.cc(err, 500)
      if (results.length < 1) return res.cc('Not found searched records', 204)
      data = { ...data, totalCount: results[0].totalCount, list: results }
      res.status(200).send(data)
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

  const getStationById = `select * from stations where id = ${stationId}`
  const getStartCountAndAvg = `select count(*) as startCount, AVG(covered_distance) as startAvg from journeys where departure_station_id = ${stationId}`
  const getEndCountAndAvg = `select count(*) as endCount, AVG(covered_distance) as endAvg from journeys where return_station_id = ${stationId}`
  const getReturnTop5 = `select return_station_name, count(1) as times from journeys where departure_station_id = ${stationId} group by return_station_name order by times desc limit 5`
  const getDepartureTop5 = `select departure_station_name, count(1) as times from journeys where return_station_id = ${stationId}  group by departure_station_name order by times desc limit 5`

  db.query(
    `${getStationById};${getStartCountAndAvg};${getEndCountAndAvg};${getReturnTop5};${getDepartureTop5}`,
    function (err, results, fields) {
      if (err) return res.cc(err, 500)
      data = {
        ...results[0][0],
        ...results[1][0],
        ...results[2][0],
        topReturn: results[3],
        topDeparture: results[4],
      }
      res.status(200).send(data)
    }
  )
}
