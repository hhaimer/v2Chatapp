(function($){

	/* Côté Client */

	var socket = io.connect('http://localhost:8080'); //Etablie la connection avec le serveur
	var msgtpl = $('#msgtpl').html() 
	var lastusr = false //Separer entre les messages des utilisateurs
	$('#msgtpl').remove()

	/**
	 * Identification (Login/Mail)
	 */
	 $('#loginform').submit(function(event){

	 	event.preventDefault(); //Ne pas echaper le login

	 	socket.emit('login',{
	 		username : $('#username').val()
	
	 	})
	 });

	 //Echaper le login lorque vous remplissez les champs
	 socket.on('logged',function(){

	 	if( $('#username').val() !== ""){
	 		$('.body').fadeOut()
	 		$('.grad').fadeOut()
	 		$('.header').fadeOut()
	 		$('.login').fadeOut()
	 		$('#login').fadeOut()
	 		$('#message').focus('')
	 	}else{
	 		alert("Champ non rempli. Ressayez")
	 	}

	 })

	/**
	 * Gestion des connectés
	 */
	 socket.on('newusr', function(user){
		//$('#users').append('<img src="' + user.avatar + '" id="' + user.id + '">')
				$('#users').append('<img src="img/user.png" id="' + user.username + '">')
				$('#users').append('<h6 style="color:white; text-align:center" id="' + user.username + '">'+ user.username.toUpperCase() +'</h6>')	 // Nouvelle Connexion 
			})
	socket.on('alerte',function(user){
		alert("Nom d utilisateur deja utilise")
	})
	/**
	 * Envoi de message
	 */
	 $('#form').submit(function(event){
	 	event.preventDefault() 
	 	socket.emit('newmsg', {
	 		message : $('#message').val() 
	 	})
		$('#message').val('') // ne pas spamer
		$('#message').focus()
	})
	 //Insertion d'un nouveau message
	 socket.on('newmsg', function(message){

		$('#messages').append('<div class="sep"></div>') //Insertion de la div séparatrice
		$('#messages').append('<div class="message">'+ Mustache.render(msgtpl,message) + '</div>') //Insertion du message à l'aide du module Mustache
		$('.chat-window').scrollTop($('#messages').height()); //Suivre le dernier message
		
	})
	 //Deconnexion d'un utilisateur
	 socket.on('disusr',function(user){
	 	$('#'+user.username).remove()
		$('#'+user.username).remove() 
	})
	 
	})(jQuery);