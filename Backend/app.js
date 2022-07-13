const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))

// registers a middleware for handling the errors
app.use((req, res, next) => {
  // the default value of status = 1 means failure
  res.cc = function (err, status = 1) {
    res.status(status).send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// parser token
const { expressjwt } = require('express-jwt')
const config = require('./config')
app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//],
  })
)

const userRouter = require('./router/user')
app.use('/api', userRouter)
const tripRouter = require('./router/trip')
app.use('/solita', tripRouter)
const stationRouter = require('./router/station')
app.use('/solita', stationRouter)

const Joi = require('joi')
// registers a middleware for handling Joi and Token errors.
app.use((err, req, res, next) => {
  // handling error from Joi
  if (err instanceof Joi.ValidationError) return res.cc(err, 400)
  // handling error from parsed token
  if (err.name === 'UnauthorizedError') return res.cc('Login failed', 401)
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
