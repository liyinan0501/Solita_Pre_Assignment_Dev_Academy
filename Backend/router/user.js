const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { login_schema } = require('../schema/user')

router.post('/login', expressJoi(login_schema), user_handler.login)

module.exports = router
