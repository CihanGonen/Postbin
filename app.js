const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine','pug');
app.set('views','./views');

const mongoConnect = require('./utility/database').mongoConnect;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routers/post.js');
app.use(routes);

mongoConnect(()=>{
  app.listen(process.env.PORT || 3000);
});
