// 引入express 模塊
const express = require('express')
const app = express()
// 服務器監聽端口
const port = 3000
// 引入網頁模板 handlebars
const exphbs = require('express-handlebars')
// 引入網頁所需資料文件
const restaurant = require('./restaurant.json')

// 引入 mongoose 設定文件
require('./config/mongoose')


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


// 配置 method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// 引入路由文件
const routes = require('./routes')
app.use(routes)


// HTTP Request 請求區域
// 跟目錄請求區域, 若請求 / 成功, 則進行 index.handlebars 渲染, 並將 { restaurants: restaurant.results } 物件傳入




// 服務器啟動監聽區域
app.listen(port, () => {
  console.log(`The Server is running at: http://localhost:${port}`)
})