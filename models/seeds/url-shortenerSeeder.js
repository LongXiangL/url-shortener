const mongoose = require('mongoose')
const ShortUrl = require('../url-shortener') // 載入 model
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  ShortUrl.create({ full: `https://www.google.com/` })
  console.log('done')
})
