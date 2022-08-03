// validating trip module
const Joi = require('joi')

const pageNumber = Joi.number().min(1)
const pageSize = Joi.number()
const departureStationId = Joi.number()
const departureDate = Joi.string()
const returnDate = Joi.string()

const departure_station_id = Joi.number().integer().required()
const return_station_id = Joi.number().integer().required()
const covered_distance = Joi.number().integer().required()
const departureTime = Joi.string().required()
const returnTime = Joi.string().required()
const duration = Joi.number().integer().required()

exports.get_trips_schema = {
  query: {
    pageNumber,
    pageSize,
    departureStationId,
    departureDate,
    returnDate,
  },
}

exports.add_trip_schema = {
  body: {
    departure_station_id,
    return_station_id,
    covered_distance,
    departure: departureTime,
    return: returnTime,
    duration,
  },
}
