
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

const initData = require('../../seed.json')
console.log('init', initData)
const restaurantSchema = require('../restaurantModel')
db.on('error', () => {
  console.log('connect to mongodb error!')
})

db.once('open', () => {
  console.log('connect to mongodb success!')
})

restaurantSchema.find()
  .lean()
  .then(data => {
    if (data.length !== 0) {
      console.log(`已有初始資料 ${data.length} 筆`)
    } else {
      console.log(`準備新增資料`)
      for (let i = 0; i < initData.results.length; i++) {
        restaurantSchema.create(initData.results[i])
      }

    }
  })
  .catch(error => {
    console.log(error)
  })
