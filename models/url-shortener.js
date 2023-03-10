const mongoose = require('mongoose')
const Schema = mongoose.Schema
function generateShortUrl() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let shortUrl = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    shortUrl += chars[randomIndex];
  }
  return shortUrl;
}
const shortUrlSchema = new Schema({
  shortURL: { type: String, required: true },
  originalURL: { type: String, required: true },
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema);