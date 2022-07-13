const db = require('../db/index')

exports.getTrips = (req, res) => {
  let pageNumber
  pageNumber = !req.query.page ? 1 : Number(req.query.page)
  let startRow = (pageNumber - 1) * 100
  const sqlStr1 = 'select count(*) as totalCount from journeys'
  let data = {}
  db.query(sqlStr1, (err, results) => {
    if (err) return res.cc(err, 507)
    data.totalCount = results[0].totalCount
    const sqlStr2 = `select * from journeys limit ${startRow}, 100`
    db.query(sqlStr2, (err, results) => {
      if (err) return res.cc(err, 507)
      data.pageNumber = pageNumber
      data.pageSize = 100
      data.list = results
      res.status(200).send(data)
    })
  })
}
