const express = require('express')
const router = express.Router()
const ShortUrl = require('../../models/url-shortener') // 引用 url model
const generateShortUrl = require('../../utils/shortenURL')




// 設定首頁路由

router.get('/', (req, res) => {
  res.render('index', { indexActive: true });
});


// 設定縮址路由
router.post('/', (req, res) => {
  console.log(req.body); // 添加这一行来检查req.body对象的值

  
  if (!req.body.url) return res.redirect("/")
  const shortURL = generateShortUrl()

  ShortUrl.findOne({ originalURL: req.body.url })
    .then(data =>
      data ? data : ShortUrl.create({ shortURL, originalURL: req.body.url })
    )
    .then(data =>
      res.render("index", {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(error => console.error(error))
})

// 設定短網址轉址路由

router.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params

  ShortUrl.findOne({ shortURL })
    .then(data => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        })
      }

      res.redirect(data.originalURL)
    })
    .catch(error => {
      console.error(error)
      res.render("error", {
        errorMsg: "Error retrieving URL",
        errorURL: req.headers.host + "/" + shortURL,
      })
    })
})




// 匯出路由模組
module.exports = router