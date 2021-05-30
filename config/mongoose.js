// 引入 mongoose db
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restaurant'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb connection error!')
})

db.once('open', () => {
  console.log('app mongodb connection success...')
})


module.exports = db