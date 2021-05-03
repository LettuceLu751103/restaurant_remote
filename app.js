// 引入express 模塊
const express = require('express')
const app = express()
// 服務器監聽端口
const port = 3000
// 引入網頁模板 handlebars
const exphbs = require('express-handlebars')
// 引入網頁所需資料文件
const restaurant = require('./restaurant.json')

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

// 引入 restaurantSchema
const restaurantSchema = require('./models/restaurantModel')

// 引入 seed.js 文件
const seed = require('./seed.json')

// 引入 body-parser
const bodyParser = require('body-parser')

// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 配置靜態文件目錄
app.use(express.static('public'))

// 配置網頁模板區域
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')







// HTTP Request 請求區域
// 跟目錄請求區域, 若請求 / 成功, 則進行 index.handlebars 渲染, 並將 { restaurants: restaurant.results } 物件傳入
app.get('/', (req, res) => {
  // res.render('index', { restaurants: restaurant.results })
  restaurantSchema.find()
    .lean()
    .then(data => {
      res.render('index', { data: data })
    })
    .catch('error', () => {
      console.log(error)
    })
})

app.post('/', (req, res) => {
  console.log(req.body)
  const data = req.body
  restaurantSchema.create(data).
    then(result => {
      console.log(result)
      res.redirect('/')
    })
    .catch('error', () => {
      console.log(error)
    })

})

// /restaurants/:id 請求區域, 若請求成功, 則進行 show.handlebars 渲染, 並將 { restaurantOne: restaurantOne[0] } 物件傳入
// 並且使用 params 參數, 動態獲得參數
app.get('/restaurants/:id', (req, res) => {

  const reqRestaurantId = req.params.id
  // console.log('reqRestaurantId', reqRestaurantId)
  restaurantSchema.findById(reqRestaurantId)
    .lean()
    .then((result) => {
      console.log(result)
      res.render('show', { restaurantOne: result })
    })
    .catch('error', () => {
      console.log(error)
    })


})


// 搜尋輸入框區域, 若請求 /search 成功, 則進行 index.handlebars 渲染, 並將 { restaurants: newData, keyword: reqData } 物件傳入
app.get('/search', (req, res) => {

  // 客戶端搜尋的字串並且轉換成小寫
  const reqData = req.query.keyword.toLowerCase()
  // 比對客戶端傳入的字串, 在原先的餐廳清單內是否有符合的字串
  const searchData = restaurant.results.filter(restaurantItem => {
    return restaurantItem.name.toLowerCase().includes(reqData) || restaurantItem.name_en.toLowerCase().includes(reqData)
  })
  res.render('index', { restaurants: searchData, keyword: reqData })
})

// 新增餐廳表單
app.get('/new', (req, res) => {

  res.render('new')
})

// 新增編輯 edit 頁面 get 請求
app.get('/edit/:id', (req, res) => {
  const id = req.params.id

  restaurantSchema.findById(id)
    .lean()
    .then(data => {
      console.log(data)
      res.render('edit', { restaurantOneData: data })
    })
    .catch(error => {
      console.log(error)
    })
})

// 新增編輯 edit 頁面 post 請求
app.post('/edit/:id', (req, res) => {
  const id = req.params.id
  const updateData = req.body
  // console.log('updateData', updateData)
  restaurantSchema.findById(id)
    .then(data => {
      data.name = updateData.name
      data.name_en = updateData.name_en
      data.category = updateData.category
      data.image = updateData.image
      data.location = updateData.location
      data.phone = updateData.phone
      data.google_map = updateData.google_map
      data.rating = updateData.rating
      data.description = updateData.description
      // console.log('updateData', updateData)
      // console.log('data', data)
      data.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})


// 服務器啟動監聽區域
app.listen(port, () => {
  console.log(`The Server is running at: http://localhost:${port}`)



  // 確認是否有初始資料, 如果有初始資料, 不添加, 如果沒有, 添加...
  console.log(restaurantSchema.find()
    .lean()
    .then(data => {
      if (data.length !== 0) {
        console.log(`已有初始資料 ${data.length} 筆`)
        // console.log(data)
      } else {
        for (let i = 0; i < seed.results.length; i++) {
          restaurantSchema.create(seed.results[i])
          // console.log('新增一筆資料成功: ', seed.results[i])
        }
        console.log(`成功將 seed ${seed.results.length} 資料新增成功`)
      }
    })
    .catch('error', () => {
      console.log(error)
    })
  )



})