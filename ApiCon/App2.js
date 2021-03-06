// Cargar modulos y crear nueva aplicacion
const express = require("express"); 
var cors = require('cors')
const app = express();
app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//-----------------------------Mongo Pr------------------------//

var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost:27017/mqttJS', function (err){
    if (err){
        throw err
    }
    console.log('Conectado')
});


//--------------------Schema----------------------//
var mqttJS = moongoose.Schema({
    Info: String,
    Num: Number
});

var Tabla = moongoose.model('mqttj', mqttJS);


app.get("/mqttjs", function(req, res){
    Tabla.find({Num:1}, function(err, result){
        if (err){
            console.log(err);
        } else{
            res.json(result);
        }
    });

});


//---------------POST-----------------------------------//
app.post('/item', function(req, res, next) {
   console.log(req.body["Nombre"]);
   var insert = new Tabla({Info:req.body["Nombre"],Num:1});
   insert.save(function(err){
       if (err) {
           throw err;
       }
       console.log('Guardado con exito')
   });
   res.json({"hola":req.body["Nombre"]});
});
  

var server = app.listen(8080, function () {
    console.log('Server is running..'); 
});