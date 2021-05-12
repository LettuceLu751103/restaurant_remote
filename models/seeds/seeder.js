


const db = require('../../config/mongoose')

const initData = require('../../seed.json')
const restaurantSchema = require('../restaurantModel')


db.once('open', () => {
  restaurantSchema.find()
    .lean()
    .then(async data => {
      if (data.length !== 0) {
        console.log(`已有初始資料 ${data.length} 筆`)

      } else {
        console.log(`準備新增資料`)
        for (let i = 0; i < initData.results.length; i++) {
          await restaurantSchema.create(initData.results[i])
        }
        console.log(`資料新增完成`)
      }
      db.close()
    })
    // .then(() => {
    //   console.log('資料處理完畢, 關閉數據庫連接...')
    //   db.close();
    // })
    .catch(error => {
      console.log(error)
    })

})

