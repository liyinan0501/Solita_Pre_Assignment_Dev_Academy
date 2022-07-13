const express = require('express')
const router = express.Router()
const station_handler = require('../router_handler/station')
const expressJoi = require('@escook/express-joi')
const {
  get_stations_schema,
  get_singleStation_schema,
} = require('../schema/station')

router.get(
  '/stations',
  expressJoi(get_stations_schema),
  station_handler.getStations
)

router.get(
  '/singlestation/:id',
  expressJoi(get_singleStation_schema),
  station_handler.getSingleStation
)

module.exports = router
