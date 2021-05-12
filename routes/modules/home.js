const express = require('express')

// 引入 restaurantSchema
const restaurantSchema = require('../../models/restaurantModel')
const router = express.Router()

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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

// 搜尋輸入框區域, 若請求 /search 成功, 則進行 index.handlebars 渲染, 並將 { restaurants: newData, keyword: reqData } 物件傳入
router.get('/search', (req, res) => {

  // 客戶端搜尋的字串並且轉換成小寫
  const reqData = req.query.keyword.toLowerCase()
  // 比對客戶端傳入的字串, 在資料庫內的餐廳清單內是否有符合的字串
  let searchData = []
  restaurantSchema.find()
    .lean()
    .then(dbData => {
      searchData = dbData.filter(restaurantItem => {
        return restaurantItem.name.toLowerCase().includes(reqData) || restaurantItem.name_en.toLowerCase().includes(reqData)
      })
    })
    .then(() => {

      res.render('index', { data: searchData, keyword: reqData })
    })
    .catch(error => {
      console.log(error)
    })


})


router.get('/sortData/:requestFormat', (req, res) => {
  const reqOptions = req.params.requestFormat
  switch (reqOptions) {
    case '1':
      console.log('升序排列')
      sorting({ name: 'asc' })
      break
    case '2':
      console.log('降序排列')
      sorting({ name: 'desc' })
      break
    case '3':
      console.log('category 排序')
      sorting('category')
      break
    case '4':
      console.log('location 排序')
      sorting('location')
      break
    default:
      console.log('一般查詢')
      sorting('')
      break
  }
  function sorting(sortObj) {
    restaurantSchema.find()
      .sort(sortObj)
      .lean()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

})

module.exports = router