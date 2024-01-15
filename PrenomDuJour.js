exports.action = function(data, callback){

	let client = setClient(data);
	info("PrenomDuJour from:", data.client, "To:", client);
	prenomJour (data, client);
	callback();
 
}

function prenomJour (data, client) {
	
	fetch('https://nameday.abalin.net/api/V1/today')
    .then(response => response.json())
    .then(reponse2 =>  {
    Avatar.speak(`Aujoud'hui nous fétons le prénom de ${reponse2.nameday.fr}`, data.client, function(){
	Avatar.Speech.end(data.client);
	});
})
	
}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}