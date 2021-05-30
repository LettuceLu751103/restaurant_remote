const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const other = require('./modules/other')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleare/auth')  // 掛載 middleware


router.use('/restaurants', authenticator, other)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
module.exports = router