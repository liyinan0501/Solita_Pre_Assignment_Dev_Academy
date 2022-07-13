const db = require('../db/index')

exports.getStations = (req, res) => {
  let pageNumber
  pageNumber = !req.query.page ? 1 : Number(req.query.page)
  let startRow = (pageNumber - 1) * 100
  const sqlStr = `select count(*) as totalCount from stations`
  let data = {}
  db.query(sqlStr, (err, results) => {
    if (err) return res.cc(err, 507)
    data.totalCount = results[0].totalCount
    const sqlStr2 = `select * from stations limit ${startRow}, 100`
    db.query(sqlStr2, (err, results) => {
      if (err) return res.cc(err, 507)
      data.pageNumber = pageNumber
      data.pageSize = 100
      data.list = results
      res.status(200).send(data)
    })
  })
}

exports.getSingleStation = (req, res) => {
  const { id } = req.params
  const sqlStr = 'select * from stations where id = ?'
  db.query(sqlStr, [id], (err, results) => {
    if (err) return res.cc(err, 507)
    if (results.length !== 1) return res.cc(`There is no No. ${id} station.`)
    res.status(200).send(results[0])
  })
}
