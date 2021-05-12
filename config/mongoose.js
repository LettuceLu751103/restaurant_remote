// 引入 mongoose db
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb connection error!')
})

db.once('open', () => {
  console.log('app mongodb connection success...')
})


module.exports = db