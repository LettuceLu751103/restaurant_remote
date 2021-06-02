// 引入express 模塊
const express = require('express')
const app = express()
// 服務器監聽端口
const PORT = process.env.PORT || 3000
// 引入網頁模板 handlebars
const exphbs = require('express-handlebars')
// 引入網頁所需資料文件
const restaurant = require('./restaurant.json')

// 引入 mongoose 設定文件
require('./config/mongoose')


// // 引入 seed.js 文件
// const seed = require('./seed.json')

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
const session = require('express-session')
const flash = require('connect-flash')   // 引用套件
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

// 引入路由文件
const routes = require('./routes')
app.use(routes)


// HTTP Request 請求區域
// 跟目錄請求區域, 若請求 / 成功, 則進行 index.handlebars 渲染, 並將 { restaurants: restaurant.results } 物件傳入




// 服務器啟動監聽區域
app.listen(PORT, () => {
  console.log(`The Server is running at: http://localhost:${PORT}`)
})