var express = require("express");
var bodyParser = require('body-parser');


var port = process.env.PORT || 8181; 

var app = express();

app.use('/',express.static('game'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//instanciar DAO para persistencia
var Dao = require("./Dao");

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/game/index.html');
})

//almacenar puntaje
app.post('/puntaje',  (req, res) => {
  Dao.almacenarPuntaje(req.body.puntaje);
  res.send("puntaje almacenado");
});


//obtener  5 maximos puntajes
app.get('/puntaje', (req,res)=>{
	Dao.getPuntajes( puntajes =>{
		res.send(puntajes);
	});
})

app.listen(port, function () {
  console.log('pacman server escuchando en puerto '+port);
});
