const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const routes = require('./routes')
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.use(express.urlencoded({ extended: true }));
app.use(routes)
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs')



app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
