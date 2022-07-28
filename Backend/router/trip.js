const express = require('express')
const router = express.Router()
const trip_handler = require('../router_handler/trip')
const expressJoi = require('@escook/express-joi')
const { get_trips_schema } = require('../schema/trip')

router.get('/trips', expressJoi(get_trips_schema), trip_handler.getTrips)

router.post('/addTrip', trip_handler.addTrip)

module.exports = router
