exports.action = function(data, callback){

	let client = setClient(data);
	info("PrenomDuJour from:", data.client, "To:", client);
	prenomJour (data, client);
	callback();
 
}

async function prenomJour(data, client) {
    try {
        const response = await fetch('https://nameday.abalin.net/api/V1/today');

        if (!response.ok) {
            throw new Error(`Erreur lors de la requête : ${response.statusText}`);
        }

        const reponse2 = await response.json();
        await new Promise((resolve) => {
            Avatar.speak(`Aujourd'hui, nous fêtons le prénom de ${reponse2.nameday.fr}`, data.client, () => {
                Avatar.Speech.end(data.client);
                resolve();
            });
        });

    } catch (error) {
        console.error(`Erreur dans la fonction prenomJour : ${error.message}`);
    }
}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}
