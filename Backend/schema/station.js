// validating station module
const Joi = require('joi')

const page = Joi.number().min(1)

const id = Joi.number().min(1).max(902).required()

exports.get_stations_schema = {
  query: {
    page,
  },
}

exports.get_singleStation_schema = {
  params: {
    id,
  },
}
