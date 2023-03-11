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

module.exports = generateShortUrl