// validating trip module
const Joi = require('joi')

const page = Joi.number().min(1)

exports.get_trips_schema = {
  query: {
    page,
  },
}
