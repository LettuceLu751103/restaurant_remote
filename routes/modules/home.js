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

module.exports = router