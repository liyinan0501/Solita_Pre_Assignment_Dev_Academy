const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))

// registers a middleware for handling the errors
app.use((req, res, next) => {
  // the default value of status = 1 means failure
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

const userRouter = require('./router/user')
app.use('/api', userRouter)

const Joi = require('joi')
// registers a middleware for handling Joi and Token errors.
app.use((err, req, res, next) => {
  // handling error from Joi
  if (err instanceof Joi.ValidationError) return res.cc(err)
  // handling error from parsing token
  if (err.name === 'UnauthorizedError') return res.cc('Login failed')
  // unknown error
  res.cc(err)
  next()
})

// Testing the data connection
const db = require('./db/index')
db.query('select 1', (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
  // [ RowDataPacket { '1': 1 } ]
})

// points listen port of the server
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007')
})
