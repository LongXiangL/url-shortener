const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originalUrl: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  shortId: {
    type: String, // 資料型別是字串
  },
});

module.exports = mongoose.model('Url', urlSchema);