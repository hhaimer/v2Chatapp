# Projet application web : Chat Room

 Le sujet de notre projet consiste sur le développement d’une salle de ‘chat’ qui permettra de relier plusieurs utilisateurs avec des surnoms uniques et qui fournira aux utilisateurs la possibilité de discuter entre eux tous en temps réel.
Pour cela nous avons choisi comme moyen de développement les outils suivant :
*	Le Framework JS coté serveur : NodeJs (La bibliothèque : Socket.io)
*	Le Framework des applications web basées sur nodejs : ExpressJs
*	Le Framework JS coté client : un mélange entre jQuery et JavaScript standard

# Pourquoi le choix du Socket.io ?
 Socket.io permet la communication entre le serveur et le client d’une manière bilatéral synchrone en temps réel. C’est-à-dire que le serveur peut aussi envoyer des requêtes au client.
# Installation :
Tout a d’abord, il faut vérifier que node.js et npm (node package manager) sont bien installés.
1.	Installer les ressources du projet sur Git :

$ git clone https://github.com/hhaimer/v2AppChat.git

2.	Sur l’invite de commande, vous vous déplacez dans le dossier ‘appweb’ et vous installez les dépendances mentionner sur le fichier Package.json

$ npm install

3.	Lancer le serveur sur l’invite de commande 

$ node server.js

4.	Se connecter à l’application sur l’adresse : http://localhost:8080
