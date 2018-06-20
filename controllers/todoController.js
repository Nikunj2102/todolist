var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:NIKUNJ127@ds163330.mlab.com:63330/nikunj');
//crate a schema- this is like a blue print
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo' ,todoSchema);

//var data = [{item:'get milk'},{item: 'walk dog'}, {item:'code'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

  app.get('/todo' , function(req,res){
    //get data from mongodb and pass it through the view
    Todo.find({} , function(err,data){
      if(err) throw err;
        res.render('todo' , {todos:data});
    });

  });

  app.post('/todo' ,urlencodedParser, function(req,res){
    //get data from the view and pass it through mongodb
    var newTodo = Todo(req.body).save(function(err , data){
      if(err) throw err;
      res.json(data);
    });

  });

  app.delete('/todo/:item' , function(req,res){
    //delete the requested item from mongodb
    Todo.find({item : req.params.item.replace(/\-/g , ' ')}).remove(function(err, data){
      if(err) throw err;
      res.json(data);

    });

  });

};
