// zawsze musimy wymagać naszego modułu by z niego skorzystać
const request = require('request');

// Za pomocą yargs wpiszemy normlanie adres i otrzymamy konkretne dane. Adres zostanei sam sformatowany w odpowiedni sposób i prześłany do API
// Najpeirw zaisntalujemy yargs "npm install yargs@4.8.1 --save"
const yargs = require('yargs');

// Ponieważ wymagamy lokalnego pliku musimy podać relatwyną ścieżkę, więc będzie './'
// poniważ używamy 'require', nie musimy dawać na końcu '.js' z samym geocode też sobie poradzi
// u nas jednak zostwimy .js, zeby bylo w 100% wiadomo o co chodzi
// const geocode = require('./geocode/geocode');
const geocode = require('./geocode/geocode.js');
// kolejny nasz plik (możemy pominąć .js)
const weather = require('./weather/weather');

// tu będziemy mieli obiket z finalnym sparsowanym outputem
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
	// tutaj dodjaemy też skrót to "help"
	.alias('help', 'h')
	.argv;

// wywołamy naszą funkcję z geocode.js, pamietaj, ze tutaj 'address', to alias, a nie address, z pliku geocode.js
// w pliku geocode.js parametr 'address' mógł sie nazwac jakkolwiek
// drugi parametr to callback function
geocode.geocodeAdress(argv.address, (errorMessage, results)=> {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		// console.log(JSON.stringify(results, undefined, 2));
		console.log(results.address);
		// wywołąmy getWeather, tylko w przypadku sukcesu (tzn. dostaliśmy coś z geocode.js)
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults)=>{
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(JSON.stringify(weatherResults, undefined, 2));
			}	
		});
	}
});


// ------------------------------------------------------ //
// Wywołamy naszą funkcję getWeather, do pobrania pogody
// Normalnie to wywołanie będzie w geocode (powyżej), ponieważ tylko tam mamy dostęp do lat i lng
// weather.getWeather(50.349128,23.32594, (errorMessage, weatherResults)=>{
// 	if (errorMessage) {
// 		console.log(errorMessage);
// 	} else {
// 		console.log(JSON.stringify(weatherResults, undefined, 2));
// 	}	
// });
// ------------------------------------------------------ //

// ------------------------------------------------------ //
// Ponizej mamy osobny przykład z pobraniem pogody z API, który powyżej zastąpimy czymś podobnym tylko działającym dla naszej aplikacji
// W poniższym przykłądzie z funkcją weatherRequest(), podajemy statycznie geolokalizację konkretnego miejsca w url'u
// // Tha dark sky API key
// // 4a7dc38b23cc6683d050d31b52da818a

// // Przykładowy request dla dark sky
// const request = require('request');

// function weatherRequest() {
// 	request({
// 		// tu damy uniknale rzeczy np. url
// 		// url: 'http://www.mapquestapi.com/geocoding/v1/address?key=c5nydwgWVpU2BnpU37bgC5uYwNkWkatG&location=1301%20lombard%20street%20philadelphia',
// 		url: 'https://api.darksky.net/forecast/4a7dc38b23cc6683d050d31b52da818a/50.349128,23.32594',
// 		// dodatkowo dodamy json: true - tu dajmey znać, ze informacja będzie podane jako JSON i to zrobi konwerta do obiketu za nas,
// 		// więc jest tot aka przydatna opcja, nie musimy dodatkowo formatować tego JSON'a do obiektu
// 		json: true
// 	}, (error, response, body) => {
// 		if (!error && response.statusCode === 200) {
// 			console.log(body.currently.temperature);
// 		} else {
// 			console.log('Unable to fetch weather');
// 		}
		
// 	});
// }
// weatherRequest();
// // sprawdź wpisując node app.js
// ------------------------------------------------------ //