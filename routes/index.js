const express = require('express')



const router = express.Router()

const home = require('./modules/home')
const other = require('./modules/other')

router.use('/', home)
router.use('/restaurants', other)

module.exports = router