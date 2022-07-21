// validating station module
const Joi = require('joi')

const pageNumber = Joi.number().min(1)
const pageSize = Joi.number()
const stationId = Joi.number().min(1).max(902)

exports.get_stations_schema = {
  query: {
    pageNumber,
    pageSize,
    stationId,
  },
}

exports.get_singleStation_schema = {
  params: {
    stationId,
  },
}
