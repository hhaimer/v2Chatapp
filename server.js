
/* Les variables en dessous sont des variables globaux sur le js */
var express = require('express');
var app = express();
httpServer = require('http').createServer(app).listen(8080),
io = require('socket.io').listen(httpServer),
fs = require('fs');

// Chargement de la page index.html

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

var io = require('socket.io').listen(httpServer);

//
var users = {}
var messages = []
var limite = 10
/* io.sockets connection est une variable relative à chaque utilisateur */

/* Côté Serveur */
io.sockets.on('connection', function(socket){ 

	console.log("Nouveau utilisateur")

	var me = false;
	for(var k in users){
		console.log(users[k])
		socket.emit('newusr',users[k])
	}
	for(var k in messages){
		socket.emit('newmsg',messages[k])
	}
		/**
		 * Je me connecte
		 */
		socket.on('login',function(user){
				me = user;
				me.id = user.username;
				if(me.id === ''){
					socket.emit('alerte2',user)
				}else{
					var test = 0
					for(var k in users){
						if(me.username === users[k].username){
							test = 1 
						}
					}
					if(test === 1){
						socket.emit('alerte',user)
					}else{
						socket.emit('logged')
						users[me.id]= me;
						io.sockets.emit('newusr',me)
					}
				}
				
				
		})
		/**
		 * On a reçu un msg
		 */

			socket.on('newmsg', function(message){

					message.user = me
					date = new Date()
					message.h = date.getHours()
					message.m = date.getMinutes()
					if(message.message === ''){
						console.log('message vide')
					}
					else{
						messages.push(message)
						io.sockets.emit('newmsg',message)
					}
					
					if(messages.length > limite){
						messages.shift() //Supression des vieux messages lorsqu'on depasse la limite
					}
					
			})
		/**
		 * Je quitte le chat
		 */
			socket.on('disconnect',function(){
					if(!me){
						return false
					}
					delete users[me.id]
					io.sockets.emit('disusr',me)

					console.log('Apres une deconnexion')
					for(var k in users){
						console.log(users[k])
					}
			})
});

