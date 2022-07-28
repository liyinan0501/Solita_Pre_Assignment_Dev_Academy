const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')

// login handling function
exports.login = (req, res) => {
  const userInfo = req.body
  const loginCheck = 'select * from users where username = ?'
  db.query(loginCheck, [userInfo.username], (err, results) => {
    if (err) return res.cc(err, 500)
    if (results.length !== 1) return res.cc('Username does not exist', 401)
    if (userInfo.password !== results[0].password) {
      return res.cc('Password is not correct', 401)
    }
    // for security, taking out password from token.
    const user = { ...results[0], password: '' }
    const token = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    })
    res.status(200).send({
      message: 'Login Succeeds!',
      token: 'Bearer ' + token,
    })
  })
}
