var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pacman');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongoDB");
});


var puntajeSchema = mongoose.Schema({
  valor: Number,
  playerId:String
});

var puntajeModelo = mongoose.model('puntaje', puntajeSchema);

//almacenar puntaje
almacenarPuntaje = async puntaje=>{
	var nuevoPuntaje = new puntajeModelo({ valor: puntaje });
	nuevoPuntaje.save((err,doc)=>{	
	})
}

getPuntaje = async (playerId,callback)=>{
 puntajeModelo.find({playerId:playerId})
 .exec((err,puntaje)=>{
 	if(puntaje.length>0)
 		return callback(puntaje[0].valor);
 	callback("-");
 })
}

postPuntaje = async (playerId,valor) =>{
	var nuevoPuntaje = new puntajeModelo({ valor: valor,playerId:playerId });
	nuevoPuntaje.save((err,doc)=>{	
		if(err)
			console.log(err);
		console.log(doc);
	})
}

putPuntaje = async(playerId,valor) =>{
	var query = {'playerId':playerId};
	puntajeModelo.findOneAndUpdate(query, {valor:valor}, {upsert:true}, function(err, doc){
		if(err)
			console.log(err);
	});
}

deletePuntaje = async(playerId) =>{
	puntajeModelo.findOneAndRemove({playerId:playerId},function(err,doc){
		if(err)
			console.log(err);
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
	getPuntaje:getPuntaje,
	postPuntaje:postPuntaje,
	putPuntaje:putPuntaje,
	deletePuntaje:deletePuntaje,
	almacenarPuntaje :almacenarPuntaje,
	getPuntajes:getPuntajes
}