// validating login module
const Joi = require('joi')

const username = Joi.string().alphanum().min(3).max(10).required()
const password = Joi.string()
  .pattern(/^[\S]{6,12}$/)
  .required()

exports.login_schema = {
  body: {
    username,
    password,
  },
}
