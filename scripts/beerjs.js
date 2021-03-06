// Description:
//  BeerJS Santiago Hubot Script
//
// Dependencies:
//  needle
//
// Configuration:
//   None
//
// Commands:
//   @pudu beerjs info|todo
//   @pudu beerjs fecha|cuando
//   @pudu beerjs donde|lugar
//   @pudu beerjs tema
//
// Author:
//   jorgeepunan ©2015 beerjssantiago
//	 https://github.com/beerjs/santiago/	

var needle = require('needle');
var file = 'https://raw.githubusercontent.com/beerjs/santiago/master/beerjs.json';

module.exports = function(robot) {

  robot.respond(/beerjs (\w+)/i, function(res) {

  	var suffix = res.match[1];

  	needle.get(file, function(error, response) {
		  if (!error && response.statusCode == 200) {

		  	var obj = JSON.parse(response.body);

	  	 	if ( suffix === "fecha" || suffix === "cuando" ) {
			  	res.send("`" + obj.evento + ": " + obj.fecha + "`");
			 	} 
			 	else if ( suffix === "donde" || suffix === "lugar" ) {
			 		res.send("`" + obj.evento + ": " + obj.donde + " (" + obj.direccion + ")`");
// 				res.send("map " + obj.direccion); // TODO
			 	} 
			 	else if ( suffix === "tema" ) {
			 		res.send("`" + obj.evento + ": " + obj.tema + "`");
			 	}
			 	else if ( suffix === "info" || suffix === "todo" ) {
			 		var keys = Object.keys( obj );
					for( var i = 0,length = keys.length; i < length; i++ ) {
				  	res.send("`" + obj[ keys[ i ] ] + "`");
				  }
				} 
				else {
					res.send("¿Ayuda? Comandos: @pudu beerjs [fecha|cuando, donde|lugar, tema]");
				}

			}
		  	
		});
  	
    
  });

};

