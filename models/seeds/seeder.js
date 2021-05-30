


const db = require('../../config/mongoose')

const initData = require('../../seed.json')
const restaurantSchema = require('../restaurantModel')
const User = require('../user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const userArray = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  }
  ,
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }

]
db.once('open', async () => {
  for (let i = 0; i < userArray.length; i++) {
    console.log(userArray[i].email)
    let email = userArray[i].email
    let password = userArray[i].password
    let name = userArray[i].name
    User.findOne({ email })
      .lean()
      .then(async user => {
        console.log(user)
        if (user) {
          console.log('有使用者')
        } else {
          console.log('準備創建使用者')
          await bcrypt
            .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
            .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
            .then(hash =>
              User.create({
                name,
                email,
                password: hash // 用雜湊值取代原本的使用者密碼
              })
            )
            .then(async user => {
              console.log('create succeed')
              if (i === 0) {
                for (let j = 0; j < 3; j++) {
                  initData.results[j].userId = user._id
                  await restaurantSchema.create(initData.results[j])
                    .then(() => {
                      console.log('創建資料成功')
                    })
                    .catch(err => {
                      console.log(err)
                    })
                }
              } else {
                for (let j = 3; j < 6; j++) {
                  initData.results[j].userId = user._id
                  await restaurantSchema.create(initData.results[j])
                    .then(() => {
                      console.log('創建資料成功')
                    })
                    .catch(err => {
                      console.log(err)
                    })
                }
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
      .catch(err => {
        console.log(err)
      })


  }

})
