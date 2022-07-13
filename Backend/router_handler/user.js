const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')

// login handling function
exports.login = (req, res) => {
  const userInfo = req.body
  const sqlStr = 'select * from users where username = ?'
  db.query(sqlStr, [userInfo.username], (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('Username does not exist')
    if (userInfo.password !== results[0].password) {
      return res.cc('Password is not correct')
    }
    // For security, taking out password from token.
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
