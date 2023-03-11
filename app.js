const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const ShortUrl = require('./models/url-shortener') // 載入 model
const PORT = process.env.PORT || 3000
require('./config/mongoose')


app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }));


// 設定首頁路由

app.get('/', (req, res) => {
  res.render('index', { indexActive: true });
});

// 設定縮址路由
app.post("/", (req, res) => {
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

app.get("/:shortURL", (req, res) => {
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


// 產生短網址的函式
function generateShortUrl() {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shortUrlLength = 5;
  let shortUrl = '';

  for (let i = 0; i < shortUrlLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortUrl += characters[randomIndex];
  }

  return shortUrl;
}
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
