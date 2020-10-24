var express = require('express');
var todoController = require('./controllers/todoController');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine' , 'ejs');

app.use(express.static('./public'));

todoController(app);
app.listen(port , () => {

  console.log(`You are listening to port ${port}.`);
});
