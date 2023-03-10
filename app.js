const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const Url = require('./models/url-shortener') // 載入 model
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// 設定首頁路由

app.get('/', (req, res) => {
  Url.find() // 取出  model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(urls => res.render('index', { urls })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})    



app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
