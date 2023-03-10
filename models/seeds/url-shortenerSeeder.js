const mongoose = require('mongoose')
const ShortUrl = require('../url-shortener') // 載入 model



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  ShortUrl.create({ full: `https://www.google.com/` })
  console.log('done')
})
