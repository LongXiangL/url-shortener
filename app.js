const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 連接錯誤：'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});


// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
