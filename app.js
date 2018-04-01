var express = require("express");
var bodyParser = require('body-parser');
var port = process.env.PORT || 8181; 
var app = express();
const uuidv1 = require('uuid/v1');

app.use('/',express.static('game'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));


var bodyParser = require('body-parser');
var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));

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

app.get('/uniqueId',(req,res)=>{
  res.send(uuidv1().substring(0,10));
})


app.get('/:playerId/puntaje',(req,res)=>{
  Dao.getPuntaje(req.params.playerId,puntaje=>{
    console.log(puntaje);
    res.send(puntaje+"");
   
  })
})

app.post('/:playerId/puntaje',(req,res)=>{
  Dao.postPuntaje(req.params.playerId,req.body.puntaje);
})

app.put('/:playerId/puntaje',(req,res)=>{
  Dao.putPuntaje(req.params.playerId,req.rawBody);
})

app.delete('/:playerId/puntaje',(req,res)=>{
  console.log('delete')
  Dao.deletePuntaje(req.params.playerId);
  res.send('sucess');
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
