const express = require('express')

const router = express.Router()

const restaurantSchema = require('../../models/restaurantModel')


// 新增餐廳表單
router.get('/new', (req, res) => {
  console.log('進入新增資料葉面')
  res.render('new')
})

// /restaurants/:id 請求區域, 若請求成功, 則進行 show.handlebars 渲染, 並將 { restaurantOne: restaurantOne[0] } 物件傳入
// 並且使用 params 參數, 動態獲得參數
router.get('/:id', (req, res) => {

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






// 新增編輯 edit 頁面 get 請求
router.get('/edit/:id', (req, res) => {
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
router.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const updateData = req.body
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
      data.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

// 新增 delete page get request method
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  restaurantSchema.findById(id)
    .then(data => {

      data.remove()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router