const express = require('express')



const router = express.Router()

const home = require('./modules/home')
const other = require('./modules/other')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurants', other)
router.use('/users', users)
module.exports = router