// zawsze musimy wymagać naszego modułu by z niego skorzystać
const request = require('request');
// zainstalujemy nową bibliotekę 'axios' za pomocą npm: npm install axios@0.13.1 --save
const axios = require('axios');

// Za pomocą yargs wpiszemy normlanie adres i otrzymamy konkretne dane. Adres zostanei sam sformatowany w odpowiedni sposób i prześłany do API
// Najpeirw zaisntalujemy yargs "npm install yargs@4.8.1 --save"
const yargs = require('yargs');

// tu będziemy mieli obiekt z finalnym sparsowanym outputem
const argv = yargs
	.options({
		// a - adres, można tu było ustawic alias'a i dać najpeirw adress, a pozniej aliasa jako "a"  my mamy na odwrót)
		a: {
			demand: true,
			alias: 'address',
			describe: 'Adress to fetch weatcher for',
			// to parsuje "a" na stringa
			string: true
		}
	})	
	.help()
	// tutaj dodajemy też skrót to "help"
	.alias('help', 'h')
	.argv;

var encodeAdress = encodeURIComponent(argv.address);
var geocodeUrl =  'http://www.mapquestapi.com/geocoding/v1/address?key=c5nydwgWVpU2BnpU37bgC5uYwNkWkatG&location='+encodeAdress;

// Wykonamy requesta za pomocą axios
// metoda get, zwróci nam promise, co oznacza, ze mozemy użyć then
axios.get(geocodeUrl).then((response) => {
	if (response.data.status === "ZERO_RESULTS") {
		throw new Error('Unable to find that address.');
	}

	var lat = response.data.results[0].locations[0].latLng.lat;
	var lng = response.data.results[0].locations[0].latLng.lng;
	var weatherURL = 'https://api.darksky.net/forecast/4a7dc38b23cc6683d050d31b52da818a/'+lat+','+lng;
	// console.log(response.data);

	return axios.get(weatherURL);
}).then((response)=> {
	// Pamiętaj, ze tu zwróci inny repsosne.data niż powyzej, bo tu już jesteśmy w udanym promise
    // console.log(response.data);
	var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`Temperature: ${temperature} but it feels like: ${apparentTemperature}`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API');
	} else {
		console.log(e.message);
	}
});