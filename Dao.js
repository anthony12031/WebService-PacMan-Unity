var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pacman');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongoDB");
});


var puntajeSchema = mongoose.Schema({
  valor: Number
});

var puntajeModelo = mongoose.model('puntaje', puntajeSchema);

//almacenar puntaje
almacenarPuntaje = async puntaje=>{
	var nuevoPuntaje = new puntajeModelo({ valor: puntaje });
	nuevoPuntaje.save((err,doc)=>{	
	})
}

//consultar ultimos 10 puntajes mas altos
getPuntajes =  (callback) =>{
	puntajeModelo.find()
	.sort({valor:-1})
	.limit(5)
	.exec((err,puntajes)=>{
		let resp = {};
		resp.puntajes = puntajes;
		callback (resp);
	})
}


module.exports = {
	almacenarPuntaje :almacenarPuntaje,
	getPuntajes:getPuntajes
}