
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))



const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const restaurant = require('./restaurant.json')
app.get('/', (req, res) => {


  console.log(restaurant.results)
  res.render('index', { restaurants: restaurant.results })
})

app.get('/restaurants/:id', (req, res) => {

  const restaurant_id = req.params.id
  const restaurantOne = restaurant.results.filter(item => {
    return Number(restaurant_id) === item.id
  })

  res.render('show', { restaurantOne: restaurantOne[0] })
})

app.get('/search', (req, res) => {


  const reqData = req.query.keyword.toLowerCase()
  const newData = restaurant.results.filter(item => {

    return item.name.toLowerCase().includes(reqData) || item.name_en.toLowerCase().includes(reqData)
  })
  res.render('index', { restaurants: newData, keyword: reqData })
})


app.listen(port, () => {
  console.log(`The Server is running at: http://localhost:${port}`)
})