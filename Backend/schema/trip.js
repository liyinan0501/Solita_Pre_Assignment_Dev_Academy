// validating trip module
const Joi = require('joi')

const pageNumber = Joi.number().min(1)
const pageSize = Joi.number()
const departureStationId = Joi.number()
const departureDate = Joi.string()
const returnDate = Joi.string()

exports.get_trips_schema = {
  query: {
    pageNumber,
    pageSize,
    departureStationId,
    departureDate,
    returnDate,
  },
}
