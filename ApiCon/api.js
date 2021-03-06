//---------------------------------------------------------------------------------------------------------------------//
// Cargar modulos y crear nueva aplicacion
const express = require("express"); 
const asyncHandler = require('express-async-handler');
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
    temperatura: String,
    Num: Number
});

var Tabla = moongoose.model('mqttjs', mqttJS);

//---------------POST-----------------------------------//
app.post('/item',asyncHandler( async (req, res, next) => {
    console.log(JSON.stringify(req.body["temperatura"]));
    
    var insert = new Tabla({temperatura:req.body['temperatura'],Num:1});
    insert.save(function(err){
        if(err) {
            throw err;
        }
        console.log('Guardado con exito')
    });
    res.json({"hola":req.body["temperatura"]});
}));

//-----------GET-----------------------------------------------//
app.get('/mqttjs',asyncHandler( async (req, res, next) => {
	Tabla.find({Num:1}, function(err, result){
        if (err){
            console.log(err);
        } else{
            res.json(result);
        }
    });
}));



var server = app.listen(9090, function () {
    console.log('Server is running..'); 
});