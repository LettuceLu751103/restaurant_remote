// 引入express 模塊
const express = require('express')
const app = express()
// 服務器監聽端口
const port = 3000
// 引入網頁模板 handlebars
const exphbs = require('express-handlebars')
// 引入網頁所需資料文件
const restaurant = require('./restaurant.json')




// 配置靜態文件目錄
app.use(express.static('public'))

// 配置網頁模板區域
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')







// HTTP Request 請求區域
// 跟目錄請求區域, 若請求 / 成功, 則進行 index.handlebars 渲染, 並將 { restaurants: restaurant.results } 物件傳入
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurant.results })
})

// /restaurants/:id 請求區域, 若請求成功, 則進行 show.handlebars 渲染, 並將 { restaurantOne: restaurantOne[0] } 物件傳入
// 並且使用 params 參數, 動態獲得參數
app.get('/restaurants/:id', (req, res) => {

  const reqRestaurantId = req.params.id
  // 比對所有餐廳清餐, 若客戶端請求id號相同, 則返回該資料
  const restaurantOne = restaurant.results.filter(restaurantItem => {
    return Number(reqRestaurantId) === restaurantItem.id
  })

  res.render('show', { restaurantOne: restaurantOne[0] })
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





// 服務器啟動監聽區域
app.listen(port, () => {
  console.log(`The Server is running at: http://localhost:${port}`)
})