const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const ShortUrl = require('./models/url-shortener') // 載入 model
const PORT = process.env.PORT || 3000
const shortId = require('shortid');

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: false }));

// 創建路由器
const router = express.Router();

// 設定首頁路由

app.get('/', async (req, res) => {
  res.render('index', { indexActive: true });
});

// 設定縮址路由
app.post('/shortUrls', async (req, res) => {
  const { fullUrl } = req.body;

  // 檢查是否已有相同的 fullUrl 資料存在
  const existingUrl = await ShortUrl.findOne({ full: fullUrl });

  if (existingUrl) {
    // 若已有相同的 fullUrl 資料，直接回傳該筆資料的縮址
    res.render('result', { shortUrl: existingUrl.short, resultActive: true });
  } else {
    // 若無相同的 fullUrl 資料，新增一筆並產生縮址
    const shortUrl = generateShortUrl();

    const newUrl = new ShortUrl({
      full: fullUrl,
      short: shortUrl
    });

    await newUrl.save();

    res.render('result', { shortUrl: shortUrl, resultActive: true });
  }
});

// 設定短網址轉址路由
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  const url = await ShortUrl.findOne({ short: shortUrl });

  if (url == null) return res.sendStatus(404);

  url.clicks++;
  url.save();

  res.redirect(url.full);
});

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
